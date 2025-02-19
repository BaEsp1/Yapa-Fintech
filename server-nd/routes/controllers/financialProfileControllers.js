const { FinancialProfile, User } = require('../models');

// Ver el perfil financiero de un usuario (usuario autenticado)
exports.getFinancialProfile = async (req, res) => {
  const userId = req.user.idUser; 

  try {
    const profile = await FinancialProfile.findOne({
      where: { idUser: userId },
    });

    if (!profile) {
      return res.status(404).json({ message: 'Perfil financiero no encontrado' });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil financiero', error });
  }
};

// Ver todos los perfiles financieros (solo para admins)
exports.getAllFinancialProfiles = async (req, res) => {
  try {
    const profiles = await FinancialProfile.findAll({
      include: [{ model: User, as: 'user' }],  // Incluir información del usuario
    });

    if (profiles.length === 0) {
      return res.status(404).json({ message: 'No se encontraron perfiles financieros' });
    }

    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los perfiles financieros', error });
  }
};

// Modificar el perfil financiero de un usuario
exports.updateFinancialProfile = async (req, res) => {
  const userId = req.user.idUser;  // ID del usuario autenticado
  const { knowledgeLevel, riskProfile, incomeMonthly, expensesMonthly, percentageSave, totalDebt } = req.body;

  try {
    const profile = await FinancialProfile.findOne({
      where: { idUser: userId },
    });

    if (!profile) {
      return res.status(404).json({ message: 'Perfil financiero no encontrado' });
    }

    // Actualizar el perfil financiero con los nuevos valores
    profile.knowledgeLevel = knowledgeLevel || profile.knowledgeLevel;
    profile.riskProfile = riskProfile || profile.riskProfile;
    profile.incomeMonthly = incomeMonthly || profile.incomeMonthly;
    profile.expensesMonthly = expensesMonthly || profile.expensesMonthly;
    profile.percentageSave = percentageSave || profile.percentageSave;
    profile.totalDebt = totalDebt || profile.totalDebt;

    await profile.save();

    res.status(200).json({ message: 'Perfil financiero actualizado', profile });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el perfil financiero', error });
  }
};
