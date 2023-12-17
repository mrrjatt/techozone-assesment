const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Techozone Assesment API Documentation',
    version: '1.0.0',
    description: 'Swagger implementation for API testing',
  },
  host: 'localhost:3000', // Change this to your host without the path
  schemes: ['http'], // Change this to 'https' if your server is using HTTPS
  consumes: ['application/json'],
  produces: ['application/json'],
  servers: [{ url: 'http://localhost:3000/api/auth' }], // Full URL with path
  basePath: "/api/auth",
  securityDefinitions: {
    "BearerAuth": {
      "type": "apiKey",
      "name": "Authorization",
      "in": "header",
      "description": "Enter 'Bearer' followed by a space and your token"
    }
  },
  security: [
    {
      "BearerAuth": []
    }
  ],
  
};

const outputFile = './swagger/swagger-output.json';
const endpointsFiles = ['./src/routes/auth.route.js'];



function generateSwaggerUiFile(){
  swaggerAutogen(outputFile, endpointsFiles, doc);
}
module.exports = generateSwaggerUiFile;
