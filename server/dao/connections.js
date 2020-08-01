const sql = require("mysql2");

const connection = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "vacations",
});

connection.connect(err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("We're connected to mySql.");
});

function execute(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            // console.log(result);
            resolve(result);
        });
    });
}

function executeWithParams(sql, params) {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            // console.log(result);
            resolve(result);
        });
    });
}

module.exports = {
    execute,
    executeWithParams,
}