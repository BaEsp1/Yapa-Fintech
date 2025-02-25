const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Portfoil', {
    idPortfoil: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idUser: {
      type: DataTypes.INTEGER,  
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,  
      allowNull: false,
    },
  });

};

