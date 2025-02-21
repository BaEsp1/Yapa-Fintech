require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const pg = require("pg");
// import pg from "pg";

const POSTGRES_URL = process.env.NEXT_PUBLIC_POSTGRES_URL;

const sequelize = new Sequelize(POSTGRES_URL, {
  dialectModule: pg,
  logging: false,
  native: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
  },
});

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, '/models', file));
    modelDefiners.push(model);
  });

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(([key, value]) => [key.charAt(0).toUpperCase() + key.slice(1), value]);
sequelize.models = Object.fromEntries(capsEntries);


const { User, Balance, Portfoil, Goal, Operation, PortfoilInstrument, FinancialProfile, Instrument } = sequelize.models;

// Relación User - Balance (un usuario tiene solo un balance)
User.hasOne(Balance, { foreignKey: 'idUser' });
// Balance.belongsTo(User, { foreignKey: 'idUser' });
Balance.belongsTo(User, {foreignKey: "idUser", as: "user",
});

// Relación User - FinancialProfile (un usuario tiene solo un perfil financiero)
User.hasOne(FinancialProfile, { foreignKey: 'idUser' });
// FinancialProfile.belongsTo(User, { foreignKey: 'idUser' });
FinancialProfile.belongsTo(User, {
  foreignKey: "idUser",
  as: "user",
});

// Relación User - Goal (un usuario puede tener muchas metas)
User.hasMany(Goal, { foreignKey: 'idUser' });
// Goal.belongsTo(User, { foreignKey: 'idUser' });
Goal.belongsTo(User, {
  foreignKey: "idUser",
  as: "user",
});


// Relación User - Portfoil (un usuario tiene solo un portafolio)
User.hasOne(Portfoil, { foreignKey: 'idUser' });
// Portfoil.belongsTo(User, { foreignKey: 'idUser' });
Portfoil.belongsTo(User, {
  foreignKey: 'idUser',
  as: 'user',
});

// Relación Portfoil - Instrument (un portafolio puede tener muchos instrumentos)
Portfoil.belongsToMany(Instrument, { through: PortfoilInstrument, foreignKey: 'idPortfoil' });
Instrument.belongsToMany(Portfoil, { through: PortfoilInstrument, foreignKey: 'idInstrument' });

// Relación Operation - User (un usuario puede tener muchas operaciones)
User.hasMany(Operation, { foreignKey: 'idUser' });
Operation.belongsTo(User, { foreignKey: 'idUser' });

// Relación Operation - Instrument (una operación está asociada a un instrumento)
Operation.belongsTo(Instrument, { foreignKey: 'idInstrument' , as: 'instrument'});
// Instrument.hasMany(Operation, { foreignKey: 'idInstrument' });
Instrument.hasMany(Operation, {
  foreignKey: 'idInstrument',  
  as: 'operations',
});

// Relación many-to-many
Portfoil.belongsToMany(Instrument, { through: 'PortfoilInstruments', foreignKey: 'idPortfoil' });
// Instrument.belongsToMany(Portfoil, { through: 'PortfoilInstruments', foreignKey: 'idInstrument' });
Instrument.belongsToMany(Portfoil, {
  through: 'PortfoilInstruments',
  as: 'portfoils',
  foreignKey: 'idInstrument',
});



module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
