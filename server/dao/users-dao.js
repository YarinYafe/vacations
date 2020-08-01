const connection = require ('./connections');

async function addUser(user) {
  const sql = "INSERT INTO users (first_name, last_name, user_name, password) VALUES (?,?,?,?)";
  const params = [user.first_name, user.last_name, user.user_name, user.password];
  const newUser = await connection.executeWithParams(sql, params);
  return newUser;
}

async function login(user) {
  const sql = "SELECT * from users where user_name=? and password=?";
  const params = [user.user_name, user.password];
  const userLoginResult = await connection.executeWithParams(sql, params);
  return userLoginResult[0];
}

async function getAllUsers() {
  const sql = "select * from users";
  const users = await connection.execute(sql);
  return users;
}

module.exports = {
  addUser,
  login,
  getAllUsers,
}
