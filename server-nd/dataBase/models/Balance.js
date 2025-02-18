const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Balance', {
    idBalance: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idUser: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    deposited: {
      type: DataTypes.FLOAT,  
      allowNull: false,
      defaultValue: 0, 
    },
    saved: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    invested: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    totalBalance: {
      type: DataTypes.FLOAT,  
      allowNull: false,
      defaultValue: 0,
    },
  });

  sequelize.models.Balance.belongsTo(sequelize.models.User, {
    foreignKey: 'idUser',
    as: 'user',
  });
};
