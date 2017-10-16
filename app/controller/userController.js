"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = require("../datamodel/user");
function createUser(req, res) {
    var newUser = new User(req.body);
    newUser.save(function (err) {
        if (err) {
            res.json({ info: 'error during User create', error: err });
        }
        res.json({ info: 'User saved successfully', data: newUser });
    });
}
exports.createUser = createUser;
function readUsers(req, res) {
    User.find(function (err, Users) {
        if (err) {
            res.json({ info: 'error during find Users', error: err });
        }
        ;
        res.json({ info: 'Users found successfully', data: Users });
    });
}
exports.readUsers = readUsers;
function readUserByName(req, res) {
    var query = { first_name: req.params.name };
    User.findOne(query)
        .populate("datasets")
        .exec(function (err, person) {
        if (err) {
            res.json({ info: 'error during find User', error: err });
        }
        ;
        if (person) {
            res.json({ info: 'User found successfully', data: person });
        }
        else {
            res.json({ info: 'User not found with name:' + req.params.name });
        }
        console.log(person);
    });
}
exports.readUserByName = readUserByName;
function updateUser(req, res) {
    var query = { first_name: req.params.name };
    User.findOne(query)
        .populate("datasets")
        .exec(function (err, person) {
        if (person) {
            var modifiedUser = new User(req.body);
            modifiedUser._id = person._id;
            person.update(modifiedUser, function (err) {
                if (err) {
                    res.json({ info: 'error during User update', error: err });
                }
                res.json({ info: 'User modified successfully', data: modifiedUser });
            });
        }
        else {
            res.json({ info: 'User not found with name:' + req.params.name });
        }
    });
}
exports.updateUser = updateUser;
function removeUserByName(req, res) {
    var query = { first_name: req.params.name };
    User.findOneAndRemove(req.params.name, function (err, User) {
        if (err) {
            res.json({ info: 'error during User removal', error: err });
        }
        ;
        if (User) {
            res.json({ info: 'User removed successfully', data: User });
        }
        else {
            res.json({ info: 'User not found with name:' + req.params.name });
        }
    });
}
exports.removeUserByName = removeUserByName;
function removeAllUsers(req, res) {
    User.remove({}, function (err) {
        if (err) {
            res.json({ info: 'error during User removal', error: err });
        }
        else {
            res.json({ info: 'successfully removed all users' });
        }
    });
}
exports.removeAllUsers = removeAllUsers;
//# sourceMappingURL=userController.js.map