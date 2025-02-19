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
  const { title, description, targetDate, status, userId } = req.body;

  try {
    const newGoal = await Goal.create({
      title,
      description,
      targetDate,
      status,
      userId
    });

    res.status(201).json({
      message: 'Goal creada exitosamente',
      goal: newGoal
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la goal', error });
  }
};

// Actualizar una goal
exports.updateGoal = async (req, res) => {
  const { id } = req.params;
  const { title, description, targetDate, status } = req.body;

  try {
    const goal = await Goal.findByPk(id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal no encontrada' });
    }

    goal.title = title || goal.title;
    goal.description = description || goal.description;
    goal.targetDate = targetDate || goal.targetDate;
    goal.status = status || goal.status;
    goal.progress = progress !== undefined ? progress : goal.progress; 

    await goal.save();

    res.status(200).json({ message: 'Goal actualizada', goal });
  } catch (error) {
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
