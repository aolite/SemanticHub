
//IMPORTS 
//=============================================================================

import * as express from "express";
import * as bodyParser from "body-parser" 

import * as users from "./app/routes/userRoutes"
import * as userCtr from "./app/controller/userController"

// BASE SETUP
// =============================================================================

// call the packages we need
var app        = express();                 // define our app using express
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:32774/minervahub");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use('/api', users.router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);