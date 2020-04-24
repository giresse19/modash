const express = require('express');
const app = express();
const morgan = require('morgan');
const connectDB = require('./config/db');
const config = require('./config/config');
const authUser = require('./app/services/authService');

// connect to DB
connectDB(); 

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));


app.get('/', function (request, response) {
	response.sendfile('./public/index.html')
});

app.get('/auth', function (request, response) {
	response.send(request.query.code);
})

app.use('/login', require('./app/routes/api/analyzedUser'));

// Defined routes:
// app.use('/api/analyze', require('./app/routes/api/analyzedUser'));

app.listen(config.port, ()=> console.log(`Server started on port ${config.port}`));
