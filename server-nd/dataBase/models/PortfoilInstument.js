module.exports = (sequelize, DataTypes) => {
    sequelize.define('PortfoilInstrument', {
      idPortfoil: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'PortFoils',
          key: 'idPortfoil',
        },
      },
      idInstrument: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Instruments',
          key: 'idInstrument',
        },
      },
    }, { timestamps: false });
  };
  