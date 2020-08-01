const vacationsDao = require('../dao/vacations-dao');

async function getAllVacations() {
  const vacations = await vacationsDao.getAllVacations();
  await lengthCheck(vacations);
  return vacations;
}

async function addVacation(vacation) {
  await vacationValidation(vacation);
  const newVacation = await vacationsDao.addVacation(vacation);
  if (newVacation.length == 0) {
    throw new error('can not add vacation');
  }
  return newVacation;
}

async function updateVacation(vacation) {
  await vacationValidation(vacation);
  const updatedVacation = await vacationsDao.updateVacation(vacation);
  if (updatedVacation.length == 0) {
    throw new error('can not update vacation');
  }
  return updatedVacation;
}

async function deleteVacation(id) {
  vacation = await vacationsDao.deleteVacation(id);
  await lengthCheck(vacation);
  console.log("deleted!");
}

module.exports = {
  getAllVacations,
  addVacation,
  updateVacation,
  deleteVacation,
}

// ----------------------------------validations------------------------------------

async function vacationValidation(vacation) {
  if (vacation.destination === "" && vacation.description === "" && vacation.start_date === "" && vacation.end_date === "" && vacation.price === 0 && vacation.v_image === "") {
    throw new Error(`vacation details invalid!`);
  }
}

async function lengthCheck(index) {
  if (index.length === 0) {
      throw new Error(`${index} not found!`);
  }
}