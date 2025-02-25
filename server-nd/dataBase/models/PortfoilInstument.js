const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PortfoilInstrument = sequelize.define('PortfoilInstrument', {
    idPortfoil: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Portfoil', 
        key: 'idPortfoil',
      },
    },
    idInstrument: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Instrument',
        key: 'idInstrument',
      },
    },
  }, { 
    timestamps: false, 
    tableName: 'PortfoilInstrument' 
  });

  return PortfoilInstrument; 
};
