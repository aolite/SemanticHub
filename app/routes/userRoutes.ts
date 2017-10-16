import * as express from "express"
import * as userCtr from "../controller/userController"
import * as datasourceCtr from "../controller/datasourceController"
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

/** SERVICES FOR DATA SURCES */
router.route("/datasource/:username").post(datasourceCtr.createDataModel);


/**  SERVICE STREAM**/
router.route("/stream").get(streamCtr.getReactiveStream);


/** SEMANTIC STREAM */
router.route("/semweb").get(semWeb.getSemWeb);