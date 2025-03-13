const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Portfoil = sequelize.define('Portfoil', {
    idPortfoil: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idUser: {
      type: DataTypes.INTEGER, 
      references: { model: 'Users', key: 'idUser' },
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,  
      allowNull: false,
    },
  });
  
  return Portfoil;
};
