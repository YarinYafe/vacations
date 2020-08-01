const connection = require('./connections');

async function getAllUserVacations(userId) {
    const sql = 'SELECT * FROM vacations join user_vacations where vacations.id = user_vacations.vacation_id and user_vacations.user_id = ?';
    const params = [userId];
    const userVacations = await connection.executeWithParams(sql, params);
    return userVacations;
}

async function addUserVacation(userVacation) {
    const params = [userVacation.userId, userVacation.vacationId];

    const sql = "INSERT INTO user_vacations (user_id, vacation_id) Values(?,?)";
    const newUserVacation = await connection.executeWithParams(sql, params);

    const vacationSql = "UPDATE vacations SET followers=(followers+1) WHERE id=?";
    await connection.executeWithParams(vacationSql, userVacation.vacationId);
    return newUserVacation;
}

async function deleteUserVacation(userVacationId) {
    const params = [userVacationId];
    
    const sqlVacationId = "SELECT vacation_id FROM user_vacations where id = ?"
    const vacationId = await connection.executeWithParams(sqlVacationId, params);

    const vacationSql = "UPDATE vacations SET followers=(followers-1) WHERE id=?";
    await connection.executeWithParams(vacationSql, vacationId[0].vacation_id);

    const sql = "DELETE FROM user_vacations WHERE id=?";
    await connection.executeWithParams(sql, params);
}

module.exports = {
    getAllUserVacations,
    addUserVacation,
    deleteUserVacation,
}