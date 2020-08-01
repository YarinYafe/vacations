const vacationsLogic = require('../logic/vacations-logic');
const express = require('express');
const router = express.Router();

// add vacation
router.post("/", async (request, response) => {
    try {
        const vacation = request.body;
        const newVacation = await vacationsLogic.addVacation(vacation);
        response.status(200).json(newVacation);
    } catch (error) {
        response.status(400).send("cannot create vacation");
    }
});

// update vacation
router.put("/:id", async (request, response) => {
    try {
        const vacationToUpdate = request.body;
        const updatedVacation = await vacationsLogic.updateVacation(vacationToUpdate);
        response.status(200).json(updatedVacation);
    } catch (error) {
        response.status(400).send("cannot update vacation");
    }
});

// delete vacation
router.delete("/:id", async (request, response) => {
    try {
        const id = request.params.id;
        let newId = id.slice(1);
        await vacationsLogic.deleteVacation(newId);
        response.status(200).json('deleted!');
    } catch (error) {
        response.status(404).send('cannot delete vacation');
    }
});

// get all vacations
router.get("/", async (request, response) => {
    try {
        const allVacations = await vacationsLogic.getAllVacations();
        response.status(200).json(allVacations);
    } catch (error) {
        response.status(500).send("vacations not found");
    }
});

module.exports = router;