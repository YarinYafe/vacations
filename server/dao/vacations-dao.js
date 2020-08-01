const connection = require('./connections');

async function getAllVacations() {
  const sql = 'select * from vacations';
  const vacations = await connection.execute(sql);
  return vacations;
}

async function addVacation(vacation) {
  const sql = "INSERT INTO vacations (destination, description, start_date, end_date, price, v_image) VALUES (?,?,?,?,?,?)";
  const params = [vacation.destination, vacation.description, vacation.start_date, vacation.end_date, vacation.price, vacation.v_image];
  const newVacation = await connection.executeWithParams(sql, params);
  return newVacation;
}

async function updateVacation(vacation) {
  const sql = "UPDATE vacations SET destination=?, description=?, start_date=?, end_date=?, price=?, followers=?, v_image=? WHERE id=?";
  const params = [vacation.destination, vacation.description, vacation.start_date, vacation.end_date, vacation.price, vacation.followers, vacation.v_image, vacation.id];
  const updatedVacation = await connection.executeWithParams(sql, params);
  return updatedVacation;
}

async function deleteVacation(id) {
  const params = [id];

  const sql = "DELETE FROM vacations WHERE id=?";
  await connection.executeWithParams(sql, params);
  
  const userVacationsSql = "DELETE FROM user_vacations WHERE id=?";
  await connection.executeWithParams(userVacationsSql, params);
}

module.exports = {
  getAllVacations,
  addVacation,
  updateVacation,
  deleteVacation,
}