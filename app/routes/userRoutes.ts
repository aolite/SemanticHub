import * as express from "express"
import * as userCtr from "../controller/userController"
import * as datasetCtr from "../controller/datasetController"
import * as datasourceCtr  from "../controller/datasourceController";
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
router.route ("/dataset/:dataset/stream").get(datasetCtr.getStreamsByDataset);
router.route ("/dataset/:dataset/stream/:query").get(datasetCtr.getStreamsByDataset);
router.route ("/dataset/:dataset").put(datasetCtr.updateDataset);
router.route ("/dataset").delete(datasetCtr.removeAllDatasets);
router.route ("/dataset/:dataset").delete(datasetCtr.removedatasetByname);
router.route ("/dataset/user/:username").delete(datasetCtr.removeDatasetByUser);


/** SERVICES FOR DATA SOURCES */
router.route("/datasource/:dataset").post(datasourceCtr.createDataModel);
router.route("/datasource").get(datasourceCtr.getDataModels);
router.route("/datasource/:dataset").get(datasourceCtr.getDatasourceByDataset);

/**  SERVICE STREAM**/
router.route("/stream").get(streamCtr.getReactiveStream);


/** SEMANTIC STREAM */
router.route("/semweb").get(semWeb.getSemWeb);