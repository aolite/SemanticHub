
//IMPORTS 
//=============================================================================

import * as express from "express";
import * as bodyParser from "body-parser" 

import * as users from "./app/routes/userRoutes"
import * as userCtr from "./app/controller/userController"
import {Config} from "./app/config"

console.log ('***********************************');
console.log ('**    WELCOME TO SEMANTIC HUB    **');
console.log ('**     NODE.js MICROSERVICES     **');
console.log ('***********************************\n')

// BASE SETUP
// =============================================================================

// call the packages we need
var app        = express();                 // define our app using express
var mongoose = require('mongoose');
let config: Config = require('./appConfig.json'); //Configurration file for the applicaiton

mongoose.Promise = require('bluebird');

try{
    mongoose.connect("mongodb://"+config.bbddSettings.bdUriPath+":"+config.bbddSettings.port+"/"+config.bbddSettings.bdName+"\n");
}
catch (exceptionDB){
    console.error('Mongo DB cannot be initialized.\n');
    console.error ('The error is caused by:\n'+ exceptionDB+'\n');
    process.exit(-1);
}

console.info('MongoDB has been initialized succesfully\n');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || config.appPort;        // set our port

console.info('Setting up the server configuration...\n');

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use('/api', users.router);


// START THE SERVER
// =============================================================================
app.listen(port,config.hostname);
console.info('Semantic Hub is avaliable in the following route:\n');
console.info('\t http://'+config.hostname+':'+port+'/ \n');