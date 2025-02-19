const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Operation', {
    idOperation: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idUser: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idInstrument: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    subTotal: {
      type: DataTypes.FLOAT, 
      allowNull: false,
    },
    pricePerUnit: {
      type: DataTypes.FLOAT, 
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
  
};
