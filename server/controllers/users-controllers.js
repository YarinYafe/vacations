const usersLogic = require('../logic/users-logic');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require("../config.json");
const mapUser = require("../middleware/map");

// addUser
router.post("/register", async (request, response) => {
    try {
        const user = request.body;
        const newUser = await usersLogic.addUser(user)
        response.status(200).json(newUser);
    } catch (error) {
        response.status(400).send("cannot create user");
    }
});

// // login
// router.post("/login", async (request, response) => {
//     try {
//         let user = request.body;
//         let token = "token-eiurhyrnwoqfiqhywi";
//         let userLoginResult = await usersLogic.login(user);
//         let loginResponse = {
//             token: token,
//             type: userLoginResult.type,
//             id: userLoginResult.id,
//         }
//         response.status(200).json(loginResponse);
//     } catch (error) {
//         response.status(401).send("user not found");
//     }
// });

// login
router.post("/login", async (request, response) => {
    try {
        let user = request.body;
        let token = jwt.sign({
            sub: user
        }, config.secret);
        let userLoginResult = await usersLogic.login(user);
        let loginResponse = {
            token: token,
            type: userLoginResult.type,
            id: userLoginResult.id,
        }
        response.status(200).json(loginResponse);
        mapUser.saveUserInfo(token, userLoginResult);
    } catch (error) {
        response.status(401).send("user not found");
    }
});

// getAllUsers
router.get("/", async (request, response) => {
    try {
        const allusers = await usersLogic.getAllUsers();
        response.status(200).json(allusers);
    } catch (error) {
        response.status(500).send("users not found");
    }
});

module.exports = router;