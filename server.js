//IMPORTS 
//=============================================================================
"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var users = require("./app/routes/userRoutes");
// BASE SETUP
// =============================================================================
// call the packages we need
var app = express(); // define our app using express
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:32768/minervahub");
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080; // set our port
// more routes for our API will happen here
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', users.router);
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
//# sourceMappingURL=server.js.map