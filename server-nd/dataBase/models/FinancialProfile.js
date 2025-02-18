const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
sequelize.define('FinancialProfile', {
  idProfile: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
    idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  knowledgeLevel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  riskProfile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  incomeMonthly: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  expensesMonthly: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  percentageSave: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  totalDebt: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }

})

sequelize.models.FinancialProfile.belongsTo(sequelize.models.User, {
    foreignKey: 'idUser',
    as: 'user',
  });
};

