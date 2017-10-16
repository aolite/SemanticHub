"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var userCtr = require("../controller/userController");
var datasetCtr = require("../controller/datasetController");
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
exports.router.route("/user").delete(userCtr.removeAllUsers);
/** SERVICES FOR DATASETS **/
exports.router.route("/dataset/:username").post(datasetCtr.createDataset);
exports.router.route("/dataset").get(datasetCtr.getDatasets);
exports.router.route("/dataset/:username").get(datasetCtr.getDatasetByUser);
exports.router.route("/dataset/:dataset").put(datasetCtr.updateDataset);
exports.router.route("/dataset").delete(datasetCtr.removeAllDatasets);
exports.router.route("/dataset/:dataset").delete(datasetCtr.removedatasetByname);
exports.router.route("/dataset/user/:username").delete(datasetCtr.removeDatasetByUser);
/** SERVICES FOR DATA SOURCES */
//router.route("/dataset/:username").post(datasourceCtr.createDataModel);
/**  SERVICE STREAM**/
exports.router.route("/stream").get(streamCtr.getReactiveStream);
/** SEMANTIC STREAM */
exports.router.route("/semweb").get(semWeb.getSemWeb);
//# sourceMappingURL=userRoutes.js.map