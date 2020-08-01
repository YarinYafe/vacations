const usersDao = require('../dao/users-dao');
const crypto = require('crypto');
const saltRight = 'sdkjfhdskajh';
const saltLeft = '--mnlcfs;@!$ ';

async function addUser(user) {
  if (user.first_name === "" && user.last_name === "" && user.user_name === "" && user.password.length < 4) {
    throw new error('can not add new user');
  }
  user.password = crypto
    .createHash('md5')
    .update(saltLeft + user.password + saltRight)
    .digest('hex');
  const newUser = await usersDao.addUser(user);
  return newUser;
}

async function login(user) {
  user.password = crypto
    .createHash('md5')
    .update(saltLeft + user.password + saltRight)
    .digest('hex');
  const userLoginResult = await usersDao.login(user);
  return userLoginResult;
}

async function getAllUsers () {
  const allUsers = await usersDao.getAllUsers ();
  if (allUsers.length === 0) {
    throw new Error (`users not found!`);
  }
  return allUsers;
}

module.exports = {
  addUser,
  login,
  getAllUsers,
}