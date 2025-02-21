const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Instrument = sequelize.define('Instrument', {
    idInstrument: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {  
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return Instrument;
};
