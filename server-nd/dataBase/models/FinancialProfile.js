const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const FinancialProfile = sequelize.define('FinancialProfile', {
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
      defaultValue: 0,  
      allowNull: false,
    },
    expensesMonthly: {
      type: DataTypes.FLOAT,
      defaultValue: 0,  
      allowNull: false,
    },
    percentageSave: {
      type: DataTypes.FLOAT,
      defaultValue: 0,  
      allowNull: false,
    },
    totalDebt: {
      type: DataTypes.FLOAT,
      defaultValue: 0,  
      allowNull: false,
    }
  });

  return FinancialProfile;  
};
