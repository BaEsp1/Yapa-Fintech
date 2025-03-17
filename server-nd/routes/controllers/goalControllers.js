const { Goal } = require('../../dataBase/dataBase');

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
    frequency, 
    startDate, 
    targetDate, 
    objectiveType, 
    status, 
    progress 
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

    if (progress !== undefined) {
      if (progress < 0 || progress > 100) {
        return res.status(400).json({ message: 'El progreso debe estar entre 0 y 100.' });
      }
      goal.progress = progress;
    }

    // Actualización de los demás campos solo si los nuevos valores son proporcionados
    goal.description = description || goal.description;
    goal.frequency = frequency || goal.frequency;
    goal.startDate = startDate || goal.startDate;
    goal.targetDate = targetDate || goal.targetDate;
    goal.objectiveType = objectiveType || goal.objectiveType;
    goal.status = status || goal.status;

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

    await goal.destroy();

    res.status(200).json({ message: 'Goal eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la goal', error });
  }
};
