const { Operation, Portfoil, Balance, PortfoilInstrument, Instrument } = require('../../dataBase/dataBase');

exports.createOperation = async (req, res) => {
const { instrument, operationType, currency, subTotal, totalPrice } = req.body; // Ahora recibimos 'subTotal' y 'totalPrice' desde el frontend
const userId = req.user.idUser;

  try {
      // Verificamos si el portafolio existe
      const portfoil = await Portfoil.findOne({ where: {  idUser: userId } });
      if (!portfoil) {
          return res.status(404).json({ message: 'Portafolio no encontrado' });
      }

      const { name, symbol, price, quantity , type} = instrument;

      // Verificamos si el instrumento ya existe en la base de datos
      let existingInstrument = await Instrument.findOne({ where: { symbol } });

      if (!existingInstrument) {
          // Si el instrumento no existe, lo creamos
          existingInstrument = await Instrument.create({
              name,
              symbol,
              type,
              price,
              quantity
          });
      }

      const idInstrument = existingInstrument.idInstrument; // El ID del instrumento, ya sea existente o recién creado

      // Creamos la operación
      await Operation.create({
          idUser: userId,
          type: operationType, // 'buy' o 'sell'
          idInstrument,
          quantity,
          subTotal,  // Usamos el subTotal recibido
          pricePerUnit: price,
          currency,
          totalPrice,  // Usamos el totalPrice recibido
      });

      const balance = await Balance.findOne({ where: { idUser: userId } });

      if (operationType === 'buy') {
          // Verificamos si el instrumento ya existe en el portafolio
          const portfoilInstrument = await PortfoilInstrument.findOne({
              where: { idPortfoil: portfoil.idPortfoil, idInstrument },
          });

          if (portfoilInstrument) {
              // Si ya existe, aumentamos la cantidad
              portfoilInstrument.quantity += quantity;
              await portfoilInstrument.save();
          } else {
              // Si no existe, lo agregamos
              await PortfoilInstrument.create({
                  idPortfoil: portfoil.idPortfoil,
                  idInstrument,
                  quantity,
                  pricePerUnit: price,
              });
          }

          // Actualizamos el total del portafolio
          portfoil.totalPrice += totalPrice

          balance.deposited -= totalPrice;  
          balance.invested += totalPrice;   

          // Actualizar balance total
          balance.totalBalance = balance.deposited + balance.saved + balance.invested;
          await balance.save();

      } else if (operationType === 'sell') {
          // Verificamos si el instrumento existe en el portafolio
          const portfoilInstrument = await PortfoilInstrument.findOne({
              where: { idPortfoil: portfoil.idPortfoil, idInstrument },
          });

          if (portfoilInstrument && portfoilInstrument.quantity >= quantity) {
              // Si existe y hay suficiente cantidad para vender
              portfoilInstrument.quantity -= quantity;
              await portfoilInstrument.save();

              // Si la cantidad es 0 después de la venta, eliminamos el instrumento
              if (portfoilInstrument.quantity === 0) {
                  await PortfoilInstrument.destroy({
                      where: { idPortfoil: portfoil.idPortfoil, idInstrument },
                  });
              }

              // Actualizamos el total del portafolio con la venta
              portfoil.totalPrice -= totalPrice;

              balance.deposited += totalPrice;  // Incrementar depositado con el total de la venta
              balance.invested -= totalPrice;   // Restar de lo invertido

              // Actualizar balance total
              balance.totalBalance = balance.deposited + balance.saved + balance.invested;
              await balance.save();
          } else {
              return res.status(400).json({ message: 'No tienes suficiente cantidad de instrumentos para vender.' });
          }
      }

      // Guardamos los cambios del portafolio
      await portfoil.save();
      res.status(200).json({ message: 'Transacción procesada exitosamente', portfoil });
  } catch (error) {
      res.status(500).json({ message: 'Error al procesar la transacción', error });
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
