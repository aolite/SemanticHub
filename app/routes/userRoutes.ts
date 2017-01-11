import * as express from "express"
import * as userCtr from "../controller/userController"

// ROUTES FOR OUR API
// =============================================================================

export var router = express.Router();

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
//router.get('/user', userCtr.readUsers);

router.route("/user").post(userCtr.createUser);
router.route("/user").get(userCtr.readUsers);
router.route("/user/:name").get(userCtr.readUserByName);
router.route("/user/:name").delete(userCtr.removeUserByName);
