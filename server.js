const express = require('express');
const app = express();
const db = require('./config/db');
const config = require('./config/config');

const services = require('./app/services/services');
const errorHandler = require('errorhandler');

// connect to DB
db.connectDB(); 

// Init Middleware
app.use(express.json({extended: false}));

// app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));


app.get('/', function (request, response) {
	response.sendfile('./public/index.html')
});

// routes handling Oauth
app.get('/auth', services.authApp);


app.use('/login', require('./app/routes/api/analyzedUser'));

// Defined routes:
app.use('/analyze/username',  require('./app/routes/api/getUsername'));

app.get('/api/v1/profile',  require('./app/routes/api/getUsername'));

app.get('/api/v1/list',  require('./app/routes/api/getUsername'));

app.listen(config.port, ()=> console.log(`Server started on port ${config.port}`));

if ('development' == config.env) {
	app.use(errorHandler({ dumpExceptions: true, showStack: true }));
 }