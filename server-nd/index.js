require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { conn } = require('./dataBase/dataBase');
const routes= require('./routes/index')
const morgan = require('morgan')
const { swaggerUi, swaggerSpec, swaggerSetup } = require('./swaggerConfig');
const PORT = process.env.PORT || 4000;

const app = express();
// app.use(cors({
//   origin: 'http://localhost:5173', 
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], 
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
app.use(morgan("dev"))
app.use(cors())
app.use(express.json());
app.use('/api', routes);
app.use('/api-docs/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api/docs', swaggerUi.serve, swaggerSetup);

(async () => {
  try {
    await conn.sync({ force: false });
    console.log('Base de datos sincronizada');
  } catch (error) {
    console.log('Error sincronizando la base de datos:', error);
  }
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
})();

