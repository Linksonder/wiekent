var express = require('express');
var app = express();
var cookieparser = require('cookie-parser');
var exphbs = require('express-handlebars'); 
var mongoose = require('mongoose');
var passport = require('passport');
var server = require('http').createServer(app);
var io = require('socket.io')(server);  
var swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');


// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.engine('handlebars', exphbs({defaultLayout: 'main'})); 
app.set('view engine', 'handlebars');
app.use(express.static('public'))


//mongodb!
var dbconfig = require('./config/database');
mongoose.connect(dbconfig.url);
require('./models/user');
require('./config/passport')(app, passport);

//swagger!
var swaggerSpec = require('./config/swagger');
// const swaggerDocument = require('./swagger.json');


//passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// //cookie van gekke string naar een gewoon object

//my thingys
require('./config/socket')(io);
require('./routes/routes')(app, passport); //app moet mee!

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

var port = process.env.PORT || 3000;
server.listen(port);
console.log('listening to port ' + port);


//document.findbyid('content').innerHtml = result; 