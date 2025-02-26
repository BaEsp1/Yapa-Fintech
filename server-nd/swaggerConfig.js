const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const NEXT_PUBLIC_URL_BACK = process.env.NEXT_PUBLIC_URL_BACK || 'http://localhost:4000';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'InvertiFast Documentación',
      version: '1.0.0',
      description: 'Documentación de InvertiFast - Node.js',
    },
    servers: [
      {
        url: `${NEXT_PUBLIC_URL_BACK}/api`,
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

module.exports = { 
  swaggerUi, 
  swaggerSpec, 
  swaggerSetup: (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  }
};
