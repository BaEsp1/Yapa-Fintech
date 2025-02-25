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
  swaggerSetup: swaggerUi.setup(swaggerSpec, {
    explorer: true,
    swaggerOptions: {
      url: `${NEXT_PUBLIC_URL_BACK}/api-docs/swagger.json`, 
    },
    customCssUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
  }),
};
