const { Goal , Balance} = require('../../dataBase/dataBase');

// Obtener todas las goals
exports.getAllGoals = async (req, res) => {
  try {
    const goals = await Goal.findAll();
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las goals', error });
  }
};

// Obtener una goal por ID
exports.getGoalById = async (req, res) => {
  const { id } = req.params;

  try {
    const goal = await Goal.findByPk(id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal no encontrada' });
    }

    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la goal', error });
  }
};

// Crear una nueva goal
exports.createGoal = async (req, res) => {
  try {
    const {  
      description, 
      amountObjective, 
      frequency, 
      startDate,
      targetDate, 
      objectiveType, 
      amount = 0,
      status = 'pending', 
      progress = 0        
    } = req.body;
    
    const userId = req.user.idUser;

    // Validaciones

    if (!description) {
      return res.status(400).json({ message: "Descripción es obligatoria." });
    }
    if (!objectiveType) {
      return res.status(400).json({ message: "Tipo de objetivo es obligatorio." });
    }
    if (!frequency) {
      return res.status(400).json({ message: "Frecuencia es obligatoria." });
    }
    if (amountObjective === undefined || amountObjective <= 0) {
      return res.status(400).json({ message: "Cantidad del objetivo es obligatoria y debe ser mayor a 0." });
    }


    // Crear nueva meta
    const newGoal = await Goal.create({
      description,
      amount,
      objectiveType,
      frequency,
      amountObjective,
      startDate,
      targetDate,
      status,
      progress,
      idUser: userId
    });

    res.status(201).json({
      message: "Meta de ahorro creada exitosamente.",
      goal: newGoal
    });
  } catch (error) {
    console.error("Error al crear la meta:", error);
    res.status(500).json({ message: "Error interno al crear la meta de ahorro." });
  }
};



// Actualizar una goal
exports.updateGoal = async (req, res) => {
  const { id } = req.params;
  const {  
    description, 
    amount,
    amountObjective,
    frequency, 
    startDate, 
    targetDate, 
    objectiveType, 
  } = req.body;

  try {
    const goal = await Goal.findByPk(id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal no encontrada' });
    }

    if (amount !== undefined) {
      const previousAmount = goal.amount; 
      goal.amount = +amount;

      if (goal.amountObjective > 0) {
        goal.progress = (goal.amount / goal.amountObjective) * 100;
      }

      if (goal.amount < previousAmount) {
        goal.progress = (goal.amount / goal.amountObjective) * 100;
      }
    }

    if (amountObjective && amountObjective > 0) {
      
      goal.progress = (goal.amount / amountObjective)*100

      if (goal.amount >= amountObjective){
        goal.progress= 100
        goal.status = "completed"
      }

    }else {
      return res.status(400).json({ message: 'El monto objetivo debe ser mayor a 0 ' });
    }

    goal.description = description || goal.description;
    goal.frequency = frequency || goal.frequency;
    goal.startDate = startDate || goal.startDate;
    goal.targetDate = targetDate || goal.targetDate;
    goal.objectiveType = objectiveType || goal.objectiveType;
    goal.amountObjective = amountObjective || goal.amountObjective

    // Validaciones
    if (amount !== undefined && goal.amount < 0) {
      return res.status(400).json({ message: 'La cantidad invertida debe ser mayor o igual a 0.' });
    }
    if (goal.amountObjective <= 0) {
      return res.status(400).json({ message: 'El objetivo de cantidad (amountObjective) debe ser mayor a 0.' });
    }
    if (goal.progress < 0 || goal.progress > 100) {
      return res.status(400).json({ message: 'El progreso debe estar entre 0 y 100.' });
    }

    await goal.save(); 

    res.status(200).json({ message: 'Meta actualizada', goal });
  } catch (error) {
    console.error("Error al actualizar la goal:", error);
    res.status(500).json({ message: 'Error al actualizar la goal', error });
  }
};



// Eliminar una goal
exports.deleteGoal = async (req, res) => {
  const { id } = req.params;

  try {
    const goal = await Goal.findByPk(id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal no encontrada' });
    }

    if (goal.amount > 0) {

      const userId = req.user.idUser;
      const balance = await Balance.findOne({ where: { idUser: userId } });

      if (!balance) {
        return res.status(404).json({ message: 'Balance no encontrado' });
      }

      balance.deposited += goal.amount;
      balance.saved -= goal.amount;

      await balance.save();

    }

    await goal.destroy();
    res.status(200).json({ message: 'Goal eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la goal', error });
  }
};

// Depositar dinero en una Meta
exports.depositToGoal = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  const amountAux = Number(amount);

  if (isNaN(amountAux) || amountAux <= 0) {
    return res.status(400).json({ message: 'Monto inválido' });
  }

  try {
    const userId = req.user.idUser;
    const balance = await Balance.findOne({ where: { idUser: userId } });

    if (!balance) {
      return res.status(404).json({ message: 'Balance no encontrado' });
    }

    if (balance.deposited < amountAux) {
      return res.status(400).json({ message: 'Saldo insuficiente para depositar en meta' });
    }

    const goal = await Goal.findByPk(id);
    if (!goal) {
      return res.status(404).json({ message: 'Meta no encontrada' });
    }

    goal.amount += amountAux;
    goal.status = 'in-progress'

    if (goal.amountObjective > 0) {
      goal.progress = (goal.amount / goal.amountObjective) * 100;

      if (goal.progress >= 100) {
        goal.progress = 100; 
        goal.status = "completed"; 
      }
    }

    balance.deposited -= amountAux;
    balance.totalBalance = balance.deposited + balance.saved + balance.invested;

    await goal.save();
    await balance.save();

    res.status(200).json({ message: 'Dinero depositado exitosamente en la meta', goal, balance });
  } catch (error) {
    console.error("Error al depositar dinero en la meta:", error);
    res.status(500).json({ message: 'Error al depositar dinero en la meta', error });
  }
};


// Retirar dinero de una Meta
exports.withdrawFromGoal = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body; 
  const amountAux = Number(amount);

  if (isNaN(amountAux) || amountAux <= 0) {
    return res.status(400).json({ message: 'Monto inválido' });
  }

  try {
    const userId = req.user.idUser;
    const balance = await Balance.findOne({ where: { idUser: userId } });

    if (!balance) {
      return res.status(404).json({ message: 'Balance no encontrado' });
    }

    const goal = await Goal.findByPk(id);
    if (!goal) {
      return res.status(404).json({ message: 'Meta no encontrada' });
    }

    if (goal.amount < amountAux) {
      return res.status(400).json({ message: 'Saldo insuficiente en la meta para retirar' });
    }

    goal.amount -= amountAux;

    balance.deposited += amountAux;
    balance.totalBalance = balance.deposited + balance.saved + balance.invested;

    await goal.save();
    await balance.save();


    res.status(200).json({ message: 'Dinero retirado exitosamente de la meta', goal, balance });
  } catch (error) {
    console.error("Error al retirar dinero de la meta:", error);
    res.status(500).json({ message: 'Error al retirar dinero de la meta', error });
  }
};
