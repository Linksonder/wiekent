
var swaggerJSDoc = require('swagger-jsdoc');

// swagger definition
var swaggerDefinition = {
    info: {
      title: 'Wiekent API == EPIC',
      version: '1.0.1',
      description: 'Demonstrating how to desribe a RESTful API with Swagger',
    },
    host:  process.env.PORT  ? 'https://wiekent.herokuapp.com' : 'localhost:3000',
    basePath: '/',
  };
  
  // options for the swagger docs
  var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/*.js'],
  };
  
  // initialize swagger-jsdoc - Di moete we hebben!
  var swaggerSpec = swaggerJSDoc(options);
  

module.exports = swaggerSpec;