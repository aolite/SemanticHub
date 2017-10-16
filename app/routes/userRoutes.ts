import * as express from "express"
import * as userCtr from "../controller/userController"
import * as datasetCtr from "../controller/datasetController"
import * as streamCtr from "../controller/streamController"
import * as semWeb from "../controller/semwebController"

// ROUTES FOR OUR API
// =============================================================================

export var router = express.Router();

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
//router.get('/user', userCtr.readUsers);

/** SERVICES FOR THE USERS **/
router.route("/user").post(userCtr.createUser);
router.route("/user").get(userCtr.readUsers);
router.route("/user/:name").get(userCtr.readUserByName);
router.route("/user/:name").put(userCtr.updateUser);
router.route("/user/:name").delete(userCtr.removeUserByName);
router.route("/user").delete(userCtr.removeAllUsers);

/** SERVICES FOR DATASETS **/
router.route ("/dataset/:username").post(datasetCtr.createDataset);
router.route ("/dataset").get(datasetCtr.getDatasets);
router.route ("/dataset/:username").get(datasetCtr.getDatasetByUser);

/** SERVICES FOR DATA SOURCES */
//router.route("/dataset/:username").post(datasourceCtr.createDataModel);


/**  SERVICE STREAM**/
router.route("/stream").get(streamCtr.getReactiveStream);


/** SEMANTIC STREAM */
router.route("/semweb").get(semWeb.getSemWeb);