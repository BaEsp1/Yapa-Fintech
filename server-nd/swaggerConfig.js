const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const URL_BACK = "https://yapa-fintech-back.vercel.app" || 'http://localhost:4000';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Yapa Documentación',
      version: '1.0.0',
      description: 'Documentación de Yapa - Inversiones en Node.js',
    },
    servers: [
      {
        url: `${URL_BACK}/api`,
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    }
  },
  apis: ["./routes/**/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
