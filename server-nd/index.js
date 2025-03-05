require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { conn } = require("./dataBase/dataBase");
const routes = require("./routes/index");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const PORT = process.env.PORT || 4000;
const URL_BACK = "https://yapa-fintech-back.vercel.app" 
const CSS_URL ="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui.min.css";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Yapa Documentación",
      version: "1.0.0",
      description: "Documentación de Yapa - Inversiones en Node.js",
    },
    servers: [
      {
        url: `${URL_BACK}/api`,
        description: 'deploy', 
      },
      { url: `http://localhost:4000/api`,
        description: 'local'
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [`${__dirname}/routes/*.js`, `${__dirname}/routes/**/*.js`],
};


const swaggerSpec = swaggerJsDoc(options);

app.use(
  "/api/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, {
    customCss:
      '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
    customCssUrl: CSS_URL,
  }),
);

app.use("/api", routes);

(async () => {
  try {
    await conn.sync({ force: false });
    console.log("Base de datos sincronizada");
  } catch (error) {
    console.log("Error sincronizando la base de datos:", error);
  }
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
})();
