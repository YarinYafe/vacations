const vacationsControllers = require('./controllers/vacations-controllers');
const userVacationsControllers = require('./controllers/user_vacations-controllers');
const usersControllers = require('./controllers/users-controllers');
const express = require('express');
const server = express();
const cors = require('cors');
const port = process.env.PORT || 3001;

server.use(express.json());

server.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

server.use('/vacations', vacationsControllers);
server.use('/userVacations', userVacationsControllers);
server.use('/users', usersControllers);

const loginFilter = require("./middleware/loginFilter");
const errorHandler = require("./middleware/errorhandler");
server.use(loginFilter());
server.use(errorHandler);

server.listen(port, () => {
  console.log('listening...');
});