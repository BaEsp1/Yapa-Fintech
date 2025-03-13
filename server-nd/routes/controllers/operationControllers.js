const { Operation, Portfoil, Balance, Instrument } = require('../../dataBase/dataBase');

exports.createOperation = async (req, res) => {
    const { instrument, operationType, currency, subTotal, totalPrice } = req.body;
    const userId = req.user.idUser;
  
    try {
      // Primero buscamos el portafolio del usuario, incluyendo los instrumentos
      const portfoil = await Portfoil.findOne({
        where: { idUser: userId },
        include: [{
          model: Instrument,
          as: 'instruments',  // Este alias debe coincidir con la relación en tu modelo Portfoil
        }],
        raw: false,  // Aseguramos que sea false para que las relaciones se carguen correctamente
      });
  
      console.log("1", portfoil);  // Ver el portafolio antes de hacer cualquier cambio
  
      if (!portfoil) {
        return res.status(404).json({ message: 'Portafolio no encontrado' });
      }
  
      // Desestructuramos los valores del instrumento
      const { name, symbol, price, quantity, type } = instrument;
  
      // Buscamos si el instrumento ya existe en la base de datos
      let existingInstrument = await Instrument.findOne({ where: { symbol } });
  
      if (!existingInstrument) {
        // Si no existe el instrumento, lo creamos y lo asociamos al portafolio
        existingInstrument = await Instrument.create({
          name,
          symbol,
          type,
          price,
          quantity,
          idPortfoil: portfoil.idPortfoil,  // Lo asociamos al portafolio
        });
        console.log("Nuevo instrumento creado:", existingInstrument);
      } else {
        // Si ya existe el instrumento, actualizamos la cantidad y su precio si es necesario
        existingInstrument.quantity += quantity;  // Sumamos la cantidad
        existingInstrument.idPortfoil = portfoil.idPortfoil;  // Aseguramos que la relación esté establecida correctamente
        await existingInstrument.save();
        console.log("Instrumento existente actualizado:", existingInstrument);
      }
  
      const idInstrument = existingInstrument.idInstrument;
  
      // Ahora creamos la operación (compra o venta)
      await Operation.create({
        idUser: userId,
        type: operationType, // 'buy' o 'sell'
        idInstrument,
        quantity,
        subTotal,
        pricePerUnit: price,
        currency,
        totalPrice,
      });
  
      // Realizamos la lógica de compra
      if (operationType === 'buy') {
        // Actualizamos el portafolio
        portfoil.totalPrice += totalPrice; // Incrementamos el total del portafolio
        await portfoil.save();
  
        console.log("2", portfoil);  // Ver el portafolio después de la compra
  
        // Actualizamos el balance
        const balance = await Balance.findOne({ where: { idUser: userId } });
        balance.deposited -= totalPrice;  // Restamos lo que se ha gastado
        balance.invested += totalPrice;   // Sumamos lo invertido
        balance.totalBalance = balance.deposited + balance.saved + balance.invested;
        await balance.save();
  
      } else if (operationType === 'sell') {
        // Realizamos la venta
        const existingInstrumentInPortfoil = portfoil.instruments.find(i => i.idInstrument === idInstrument);
        if (existingInstrumentInPortfoil && existingInstrumentInPortfoil.quantity >= quantity) {
          existingInstrumentInPortfoil.quantity -= quantity;
  
          if (existingInstrumentInPortfoil.quantity === 0) {
            portfoil.instruments = portfoil.instruments.filter(i => i.idInstrument !== idInstrument);
          }
  
          // Actualizamos el total del portafolio con la venta
          portfoil.totalPrice -= totalPrice;
          await portfoil.save();
  
          // Actualizamos el balance
          balance.deposited += totalPrice;  // Añadimos lo que hemos recibido de la venta
          balance.invested -= totalPrice;   // Restamos lo invertido
          balance.totalBalance = balance.deposited + balance.saved + balance.invested;
          await balance.save();
        } else {
          return res.status(400).json({ message: 'No tienes suficiente cantidad de instrumentos para vender.' });
        }
      }
  
      // Devolvemos el portafolio actualizado en la respuesta, incluyendo la relación con instrumentos
      const updatedPortfoil = await Portfoil.findOne({
        where: { idUser: userId },
        include: [{
          model: Instrument,
          as: 'instruments',  // Asegúrate de que este alias coincida con la relación en el modelo
        }],
        raw: false,  // Asegúrate de que esté en false para que Sequelize maneje las relaciones
      });
  
      res.status(200).json({ message: 'Transacción procesada exitosamente', portfoil: updatedPortfoil });
  
    } catch (error) {
      console.error(error);
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
