const userVacationsLogic = require('../logic/user_vacations-logic');
const express = require('express');
const router = express.Router();

// add vacation
router.post("/", async (request, response) => {
    try {
        const userVacation = request.body;
        const newUserVacation = await userVacationsLogic.addUserVacation(userVacation);
        response.status(200).json(newUserVacation);
    } catch (error) {
        response.status(400).send("cannot create user vacation");
    }
});

// delete vacation
router.delete("/:id", async (request, response) => {
    try {
        const userVacationId = request.params.id;
        let newId = userVacationId.slice(1);
        await userVacationsLogic.deleteUserVacation(newId);
        response.status(200).json('deleted!');
    } catch (error) {
        response.status(404).send('cannot delete user vacation');
    }
});

// get all vacations
router.get("/:id", async (request, response) => {
    try {
        const userId = request.params.id;
        const allUserVacations = await userVacationsLogic.getAllUserVacations(userId);
        response.status(200).json(allUserVacations);
    } catch (error) {
        response.status(500).send("user vacations not found");
    }
});

module.exports = router;