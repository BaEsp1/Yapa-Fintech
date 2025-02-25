const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const NEXT_PUBLIC_URL_BACK = process.env.NEXT_PUBLIC_URL_BACK

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
        url: `${NEXT_PUBLIC_URL_BACK}/api`  || 'http://localhost:4000/api', 
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
