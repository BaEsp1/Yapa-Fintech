const { Operation, Portfoil, Balance, Instrument } = require('../../dataBase/dataBase');

exports.buyInstrument = async (req, res) => {
  const { instrument, currency, subTotal, totalPrice } = req.body;
  const userId = req.user.idUser;

  try {
      // 1. Buscar el portafolio del usuario
      console.log("Buscando el portafolio del usuario...");
      const portfoil = await Portfoil.findOne({
          where: { idUser: userId },
          include: [{
              model: Instrument,
              as: 'instruments',
          }],
          raw: false,
      });

      if (!portfoil) {
          console.log("Portafolio no encontrado");
          return res.status(404).json({ message: 'Portafolio no encontrado' });
      }
      console.log("Portafolio encontrado:", portfoil);

      const { name, symbol, price, quantity, type } = instrument;
      console.log("Instrumento a comprar:", instrument);

      // 2. Verificar si el instrumento ya existe
      let existingInstrument = await Instrument.findOne({ where: { symbol } });

      if (!existingInstrument) {
          console.log("Instrumento no encontrado en la base de datos, creando uno nuevo...");
          existingInstrument = await Instrument.create({
              name,
              symbol,
              type,
              price,
              quantity,
              idPortfoil: portfoil.idPortfoil, // Aseguramos que el instrumento se asocie con el portafolio
          });
          console.log("Nuevo instrumento creado:", existingInstrument);
      } else {
          console.log("Instrumento encontrado, actualizando cantidad...");
          // Aquí corregimos para asegurarnos de que se está sumando solo la cantidad comprada.
          existingInstrument.quantity = existingInstrument.quantity + quantity;  // Incrementamos la cantidad correctamente
          existingInstrument.idPortfoil = portfoil.idPortfoil; // Aseguramos que el instrumento se asocie con el portafolio
          await existingInstrument.save();
          console.log("Instrumento actualizado:", existingInstrument);
      }

      const idInstrument = existingInstrument.idInstrument;
      console.log("ID del instrumento:", idInstrument);

      // 3. Crear la operación de compra
      await Operation.create({
          idUser: userId,
          type: 'buy',
          idInstrument,
          quantity,
          subTotal,
          pricePerUnit: price,
          currency,
          totalPrice,
      });
      console.log("Operación de compra creada");

      // 4. Actualizar el portafolio
      portfoil.totalPrice += totalPrice;
      console.log("Actualizando el totalPrice del portafolio:", portfoil.totalPrice);
      await portfoil.save();

      // 5. Actualizar el balance del usuario
      const balance = await Balance.findOne({ where: { idUser: userId } });
      balance.deposited -= totalPrice;
      balance.invested += totalPrice;
      balance.totalBalance = balance.deposited + balance.saved + balance.invested;
      console.log("Actualizando el balance del usuario:", balance);
      await balance.save();

      // 6. Buscar el portafolio actualizado
      const updatedPortfoil = await Portfoil.findOne({
          where: { idUser: userId },
          include: [{
              model: Instrument,
              as: 'instruments',
          }],
          raw: false,
      });

      console.log("Portafolio actualizado:", updatedPortfoil);

      res.status(200).json({ message: 'Compra procesada exitosamente', portfoil: updatedPortfoil });

  } catch (error) {
      console.error("Error al procesar la compra:", error);
      res.status(500).json({ message: 'Error al procesar la compra', error });
  }
};


exports.sellInstrument = async (req, res) => {
  const { instrument, currency, subTotal, totalPrice } = req.body;
  const userId = req.user.idUser;

  try {
      const portfoil = await Portfoil.findOne({
          where: { idUser: userId },
          include: [{
              model: Instrument,
              as: 'instruments',
          }],
          raw: false,
      });

      if (!portfoil) {
          return res.status(404).json({ message: 'Portafolio no encontrado' });
      }

      const { symbol, quantity, price } = instrument;
      const existingInstrumentInPortfoil = portfoil.instruments.find(i => i.symbol === symbol);

      if (existingInstrumentInPortfoil && existingInstrumentInPortfoil.quantity >= quantity) {
          // Disminuimos la cantidad
          existingInstrumentInPortfoil.quantity -= quantity;

          // Si la cantidad llega a cero, eliminamos el instrumento del portafolio
          if (existingInstrumentInPortfoil.quantity === 0) {
            existingInstrumentInPortfoil.quantity = 0; 
            await existingInstrumentInPortfoil.save(); 
            await portfoil.removeInstrument(existingInstrumentInPortfoil);         
           } else {
              await existingInstrumentInPortfoil.save();
          }

          console.log("1", portfoil)
          portfoil.totalPrice -= totalPrice;
          await portfoil.save(); // Aseguramos que el portafolio se guarda con los cambios

          // Actualizamos el balance del usuario
          const balance = await Balance.findOne({ where: { idUser: userId } });
          balance.deposited += totalPrice;
          balance.invested -= totalPrice;
          balance.totalBalance = balance.deposited + balance.saved + balance.invested;
          await balance.save();

          // Registramos la operación de venta
          await Operation.create({
              idUser: userId,
              type: 'sell',
              idInstrument: existingInstrumentInPortfoil.idInstrument,
              quantity,
              subTotal,
              pricePerUnit: price,
              currency,
              totalPrice,
          });

          // Devolvemos el portafolio actualizado
          const updatedPortfoil = await Portfoil.findOne({
              where: { idUser: userId },
              include: [{
                  model: Instrument,
                  as: 'instruments',
              }],
              raw: false,
          });
          console.log("2", portfoil)
          console.log("2", updatedPortfoil)
          res.status(200).json({ message: 'Venta procesada exitosamente', portfoil: updatedPortfoil });
      } else {
          return res.status(400).json({ message: 'No tienes suficiente cantidad de instrumentos para vender.' });
      }

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al procesar la venta', error });
  }
};




exports.getAllOperations = async (req, res) => {
    const userId = req.user.idUser; 

    try {
        // Obtener todas las operaciones del usuario autenticado
        const operations = await Operation.findAll({
            where: { idUser: userId }, 
            include: [
                { model: Instrument, as: 'instrument' }  
            ]
        });

        if (operations.length === 0) {
            return res.status(404).json({ message: 'No se encontraron operaciones para este usuario.' });
        }

        res.status(200).json(operations);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las operaciones', error });
    }
};

exports.getOperationById = async (req, res) => {
    const { id } = req.params;  // ID de la operación que se desea obtener
    const userId = req.user.idUser;  // ID del usuario autenticado

    try {
        // Buscar la operación por su ID y verificar si el usuario es el propietario
        const operation = await Operation.findOne({
            where: { idOperation: id, idUser: userId },
            include: [
                { model: Instrument, as: 'instrument' }  
            ]
        });

        if (!operation) {
            return res.status(404).json({ message: 'Operación no encontrada o no autorizada.' });
        }

        res.status(200).json(operation);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la operación', error });
    }
};
