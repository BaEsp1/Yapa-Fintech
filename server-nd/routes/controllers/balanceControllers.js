const { Balance, Portfoil, Goal } = require('../../dataBase/dataBase');

// Obtener el balance del usuario
exports.getBalance = async (req, res) => {
  const userId = req.user.idUser;

  try {
    const balance = await Balance.findOne({ where: { idUser: userId } });

    if (!balance) {
      return res.status(404).json({ message: 'Balance no encontrado' });
    }

    const goals = await Goal.findAll({ where: { idUser: userId } });
    const portfoils = await Portfoil.findAll({ where: { idUser: userId } });

    let saved = 0;
    let invested = 0;

    goals.forEach(goal => saved += goal.amount);
    portfoils.forEach(portfoil => invested += portfoil.totalPrice);

    balance.saved = saved;
    balance.invested = invested;
    balance.totalBalance = balance.deposited + saved + invested;

    await balance.save();

    res.status(200).json(balance);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el balance', error });
  }
};

// Compra de portfoil
exports.transferToInvested = async (req, res) => {
  const userId = req.user.idUser;
  const { amount } = req.body;  

  try {

    const balance = await Balance.findOne({ where: { idUser: userId } });

    if (!balance) {
      return res.status(404).json({ message: 'Balance no encontrado' });
    }

    if (balance.deposited < amount) {
      return res.status(400).json({ message: 'Saldo insuficiente para transferir a inversión' });
    }

    balance.deposited -= amount;
    balance.invested += amount;

    const portfoil = await Portfoil.findOne({ where: { idUser: userId } });

    if (portfoil) {
      portfoil.totalPrice += amount;
      await portfoil.save();
    }

    balance.totalBalance = balance.deposited + balance.saved + balance.invested;

    await balance.save();

    res.status(200).json({ message: 'Dinero transferido exitosamente a inversión', balance });
  } catch (error) {
    res.status(500).json({ message: 'Error al transferir dinero a inversión', error });
  }
};

// ahorro de dinero en Metas
exports.transferToSaved = async (req, res) => {
  const userId = req.user.idUser;
  const { amount } = req.body;
  const amountAux = Number(amount);

  console.log("User ID:", userId);
  console.log("Monto recibido:", amount);
  console.log("Monto convertido a número:", amountAux);

  if (isNaN(amountAux) || amountAux <= 0) {
    console.log("Monto inválido o menor que 0");
    return res.status(400).json({ message: 'Monto inválido' });
  }

  try {
    const balance = await Balance.findOne({ where: { idUser: userId } });

    console.log("Balance encontrado:", balance);

    if (!balance) {
      console.log("No se encontró balance para el usuario:", userId);
      return res.status(404).json({ message: 'Balance no encontrado' });
    }

    // Validar que balance.deposited no sea null
    if (balance.deposited == null) {
      console.log("El campo deposited es null para el usuario:", userId);
      return res.status(400).json({ message: 'Saldo no inicializado correctamente' });
    }

    console.log("Saldo deposited actual:", balance.deposited);

    if (balance.deposited < amountAux) {
      console.log("Saldo insuficiente para transferir. Saldo actual:", balance.deposited, "Monto a transferir:", amountAux);
      return res.status(400).json({ message: 'Saldo insuficiente para transferir a ahorros' });
    }

    console.log("Procediendo con la transferencia...");

    balance.deposited -= amountAux;
    balance.saved += amountAux;
    balance.totalBalance = balance.deposited + balance.saved + balance.invested;

    console.log("Nuevo balance después de la transferencia:", balance);

    await balance.save();

    res.status(200).json({ message: 'Dinero transferido exitosamente a ahorros', balance });
  } catch (error) {
    console.error("Error al procesar la transferencia:", error);
    res.status(500).json({ message: 'Error al transferir dinero a ahorros', error });
  }
};


// Retiro de dinero de la plataforma
exports.withdraw = async (req, res) => {
  const userId = req.user.idUser;
  const { amount } = req.body; 
  const amountAux = Number(amount)

  try {
    const balance = await Balance.findOne({ where: { idUser: userId } });
    if (!balance) {
      return res.status(404).json({ message: 'Balance no encontrado' });
    }

    if (balance.deposited < amountAux) {
      return res.status(400).json({ message: 'Saldo insuficiente para retirar' });
    }

    balance.deposited -= amountAux;
    balance.totalBalance = balance.deposited + balance.saved + balance.invested;

    await balance.save();

    res.status(200).json({ message: 'Dinero retirado exitosamente', balance });
  } catch (error) {
    res.status(500).json({ message: 'Error al retirar dinero', error });
  }
};


//cancelar meta y envio de dinero a deposited
exports.cancelGoal = async (req, res) => {
    const userId = req.user.idUser;
    const { idGoal, amount} = req.body; 
    const amountAux = Number(amount)
  
    try {
      const balance = await Balance.findOne({ where: { idUser: userId } });
  
      if (!balance) {
        return res.status(404).json({ message: 'Balance no encontrado' });
      }
  
      const goal = await Goal.findOne({ where: { idUser: userId, idGoal } });
  
      if (!goal) {
        return res.status(404).json({ message: 'Meta no encontrada' });
      }
  

      if (amountAux > goal.amount) {
        return res.status(400).json({ message: 'No puedes retirar más dinero del que has ahorrado' });
      }
  
      goal.amount -=amountAux
      balance.saved -= amountAux
      balance.deposited += amountAux
  
      await goal.save();  

      balance.totalBalance = balance.deposited + balance.saved + balance.invested;
  
      await balance.save();
  
      res.status(200).json({ message: 'Dinero retirado de la meta de ahorro y retornado al balance depositado', balance });
    } catch (error) {
      res.status(500).json({ message: 'Error al retirar dinero de la meta de ahorro', error });
    }
  };
  
  // Ingreso de dinero de la plataforma
exports.updateDeposited= async (req, res) => {
  const userId = req.user.idUser;
  const { amount } = req.body; 

  try {
    const balance = await Balance.findOne({ where: { idUser: userId } });

    if (!balance) {
      return res.status(404).json({ message: 'Balance no encontrado' });
    }
    balance.deposited = parseFloat(balance.deposited) || 0;
    balance.deposited += parseFloat(amount) ;
    balance.totalBalance = balance.deposited + balance.saved + balance.invested;

    await balance.save();  

    res.status(200).json({ message: 'Dinero retirado exitosamente', balance });
  } catch (error) {
    res.status(400).json({ message: 'Error al ingrear dinero', error });
  }
};
