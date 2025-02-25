const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración de Swagger
const options = {
  definition: {
    openapi: '3.0.0', 
    info: {
      title: 'InvertiFast Documentacion', 
      version: '1.0.0', 
      description: 'Documentación de InvertiDast - Node.js',
    },
    servers: [
      {
        url: 'http://localhost:4000/api', 
      }],
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
