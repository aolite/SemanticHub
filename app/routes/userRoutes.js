"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var userCtr = require("../controller/userController");
var datasourceCtr = require("../controller/datasourceController");
var streamCtr = require("../controller/streamController");
var semWeb = require("../controller/semwebController");
// ROUTES FOR OUR API
// =============================================================================
exports.router = express.Router();
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
//router.get('/user', userCtr.readUsers);
/** SERVICES FOR THE USERS **/
exports.router.route("/user").post(userCtr.createUser);
exports.router.route("/user").get(userCtr.readUsers);
exports.router.route("/user/:name").get(userCtr.readUserByName);
exports.router.route("/user/:name").put(userCtr.updateUser);
exports.router.route("/user/:name").delete(userCtr.removeUserByName);
/** SERVICES FOR DATA SURCES */
exports.router.route("/datasource/:username").post(datasourceCtr.createDataModel);
/**  SERVICE STREAM**/
exports.router.route("/stream").get(streamCtr.getReactiveStream);
/** SEMANTIC STREAM */
exports.router.route("/semweb").get(semWeb.getSemWeb);
//# sourceMappingURL=userRoutes.js.map