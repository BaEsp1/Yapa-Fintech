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
    instrumentId: {
      type: DataTypes.INTEGER,  
      allowNull: false,
      references: {
        model: 'Instrument',  
        key: 'idInstrument',  
      },
    },
    symbol: {
      type: DataTypes.STRING,
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
    currency: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });


  sequelize.models.Operation.belongsTo(sequelize.models.Instrument, {
    foreignKey: 'instrumentId',
    as: 'instrument',
  });


  sequelize.models.Operation.belongsTo(sequelize.models.User, {
    foreignKey: 'idUser',
    as: 'user',
  });
};
