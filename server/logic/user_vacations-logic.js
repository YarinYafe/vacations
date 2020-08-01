const userVacationsDao = require('../dao/user_vacations-dao');

async function getAllUserVacations(userId) {
  const vacations = await userVacationsDao.getAllUserVacations(userId)
  await lengthCheck(vacations);
  return vacations;
}

async function addUserVacation(userVacation) {
  const newUserVacation = await userVacationsDao.addUserVacation(userVacation);
  await lengthCheck(newUserVacation);
  return newUserVacation;
}

async function deleteUserVacation(userVacationId) {
  vacation = await userVacationsDao.deleteUserVacation(userVacationId)
  await lengthCheck(vacation);
  console.log("deleted!");
}

module.exports = {
  getAllUserVacations,
  addUserVacation,
  deleteUserVacation,
}

// ----------------------------------validations------------------------------------

async function lengthCheck(index) {
  if (index.length === 0) {
    throw new Error(`${index} not found!`);
  }
}