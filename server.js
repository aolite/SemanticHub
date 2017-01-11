"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var User = require("./app/datamodel/user");
var app = express();
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:32774/minervahub");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
/* Create */
app.post('/api/user', function (req, res) {
    var newUser = new User(req.body);
    newUser.save(function (err) {
        if (err) {
            res.json({ info: 'error during User create', error: err });
        }
        res.json({ info: 'User saved successfully', data: newUser });
    });
});
/* Read all */
app.get('/api/user', function (req, res) {
    User.find(function (err, Users) {
        if (err) {
            res.json({ info: 'error during find Users', error: err });
        }
        ;
        res.json({ info: 'Users found successfully', data: Users });
    });
});
/* Find one */
app.get('/api/user/:name', function (req, res) {
    var query = { name: req.params.name };
    User.findOne(query, function (err, User) {
        if (err) {
            res.json({ info: 'error during find User', error: err });
        }
        ;
        if (User) {
            res.json({ info: 'User found successfully', data: User });
        }
        else {
            res.json({ info: 'User not found with name:' + req.params.name });
        }
    });
});
var server = app.listen(3000, function () {
    console.log('Server listening on port 3000');
});
//# sourceMappingURL=server.js.map