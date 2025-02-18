const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Instrument', {
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

  sequelize.models.Instrument.belongsToMany(sequelize.models.Portfoil, {
    through: 'PortfoilInstruments',
    as: 'portfoils',
    foreignKey: 'idInstrument',
  });

  sequelize.models.Instrument.hasMany(sequelize.models.Operation, {
    foreignKey: 'idInstrument',  
    as: 'operations',
  });
};
