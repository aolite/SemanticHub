"use strict";
var express = require("express");
var userCtr = require("../controller/userController");
// ROUTES FOR OUR API
// =============================================================================
exports.router = express.Router();
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
//router.get('/user', userCtr.readUsers);
exports.router.route("/user").post(userCtr.createUser);
exports.router.route("/user").get(userCtr.readUsers);
exports.router.route("/user/:name").get(userCtr.readUserByName);
exports.router.route("/user/:name").delete(userCtr.removeUserByName);
//# sourceMappingURL=userRoutes.js.map