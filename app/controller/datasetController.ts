import * as Dataset from "../datamodel/dataset"
import User = require("../datamodel/user");
import * as Rx from "rx";
import {RxHttpRequest} from 'rx-http-request';
import * as rdf from "rdflib"
import * as jsonld from "jsonld"

var RDF = rdf.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#")
var RDFS = rdf.Namespace("http://www.w3.org/2000/01/rdf-schema#")
var SSN = rdf.Namespace("http://purl.oclc.org/NET/ssnx/ssn#")
var QUDT = rdf.Namespace("http://qudt.org/schema/qudt#")
var XSD = rdf.Namespace("http://www.w3.org/2001/XMLSchema#")

export function createDataset (req, res){
    var newDataset= new Dataset (req.body);
    var query={username: req.params.username};

    console.log("saving the dataset");
    newDataset.save((err)=>{
        if (err){
            res.json({info: 'error during Data Source create', error: err});
        }
          res.json({info: 'Data Source saved successfully', data: newDataset});
    });

    console.log("binding user"+ query["username"]);

    User.findOne(query,function (err,user){
        if (err) {
            console.log("Error loading user:"+ err);
        };
        if (user) {
            console.log("The user is:"+ user);
            user["datasets"].push(newDataset._id);
            user.save((err)=>{
                if (err){
                    console.log("Errorsaving the user:"+ err);
                }
            });
            console.log("User loaded: "+ user);
        }
    });
}

export function getDatasets (req,res){
    Dataset.find((err, datasets) => {
        if (err) {
            res.json({info: 'error during find dataset', error: err});
        };
        res.json({info: 'Dataset found successfully', data: datasets});
    });
}

export function getDatasetByUser (req,res){
    var query={username: req.params.username};

    User.findOne(query)
        .populate("datasets")
        .exec(function (err, person) {
            if (err) {
                res.json({info: 'error during find User', error: err});
            };
            if (person) {
                res.json({info: 'dataset by user found successfully', data: person["datasets"]});
            } else {
                res.json({info: 'dataset by user not found with name:'+ req.params.name});
            }
            console.log(person);
        })
}

export function getStreamsByDataset(req,res){
    var query={name: req.params.dataset};

    Dataset.findOne(query)
        .populate("datasources")
        .exec(function (err, ds) {
            if (err) {
                res.json({info: 'error during find User', error: err});
            };
            if (ds) {
                var store = rdf.graph();
                var baseUrl="http://rancho_nieves.com";

                var sensorTemp = rdf.sym(baseUrl+'#TempSensor_1');
                var sensorHum = rdf.sym(baseUrl+'#HumiditySensor_1');

                var strStream="";


                return Rx.Observable
                    .interval(500 /* ms */)
                    .timeInterval()
                    .map (function (x){
                        store= rdf.graph();
                        store.add(sensorTemp, RDF("type"),rdf.sym(baseUrl+'#Temperature'));
                        store.add(sensorTemp,SSN('hasDate'), rdf.lit('2017-10-25T'+(x.value %24)+':00:00+00:00', '', XSD('dateTime')));
                        store.add(sensorTemp,SSN('hasValue'), rdf.lit((Math.random() *25) + 12, '', XSD('double')));
                        store.add(sensorTemp,QUDT('hasUnit'), rdf.lit("ºC", '', XSD('string')));

                        store.add(sensorHum, RDF("type"),rdf.sym(baseUrl+'#Humidity'));
                        store.add(sensorHum,SSN('hasDate'), rdf.lit('2017-10-25T'+(x.value %24)+':00:00+00:00', '', XSD('dateTime')));
                        store.add(sensorHum,SSN('hasValue'), rdf.lit((Math.random() *55) + 45, '', XSD('double')));
                        store.add(sensorHum,QUDT('hasUnit'), rdf.lit("%", '', XSD('string')));

                        return store;
                        //return store.toString().replace(/{/g,'').replace(/}/g,'');
                    })
                    .take(30)
                    .subscribe (
                        function (x) {

                            var sparqlQuery = 'PREFIX ssn: <http://purl.oclc.org/NET/ssnx/ssn#> \
                       PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                       PREFIX base: <http://rancho_nieves.com#>\
                       SELECT ?sensor ?type ?date ?value \
                       WHERE { \
                         ?sensor a ?type .\
                         ?sensor a base:Temperature .\
                         ?sensor ssn:hasDate ?date .\
                         ?sensor ssn:hasValue ?value . \
                         filter ((xsd:int(?value) > 16.0) && (xsd:int(?value) < 22.0)) \
                       }';

                            var query = rdf.SPARQLToQuery(sparqlQuery, true, x);

                            x.fetcher = null; /* disables resource fetching */
                            // NOTE: rdflib.js will fetch all resources by default it seems
                            // which will issue errors when a resource cannot be parsed


                            // - execute SPARQL query and obtain result set
                            x.query(query, function(result) {
                                var sensor = result['?sensor'].value ;
                                var type = result ['?type'].value;
                                var date = result['?date'].value;
                                var value = result['?value'].value;

                                console.log(value)

                                var query_store = rdf.graph();

                                if (value >16 && value<22 ) {
                                    query_store.add(rdf.sym(sensor), RDF('type'), rdf.sym(type));
                                    query_store.add(rdf.sym(sensor), SSN('hasDate'), rdf.lit(date, '', XSD('dateTime')));
                                    query_store.add(rdf.sym(sensor), SSN('hasValue'), rdf.lit(value, '', XSD('double')));


                                    jsonld.fromRDF(query_store.toString().replace(/{/g, '').replace(/}/g, ''),
                                        {}, function (err, doc) {
                                            // doc is JSON-LD
                                            //console.log (JSON.stringify(doc));
                                            strStream = JSON.stringify(doc);

                                        });
                                    //console.info("Semantic Stream: "+ strStream+'\n');
                                    res.write(strStream);
                                }
                            });

                        },
                        function (err) {
                            //console.log('Service Error caused by: \n'+err+'\n');
                            res.write(JSON.stringify(err));
                        });

            }
        })
}

export function updateDataset (req,res){
    var query={name: req.params.dataset};

    Dataset.findOne(query)
        .populate("datasources")
        .exec ((error, ds) =>{
            if (ds){
                console.log(ds)
                console.log(modifiedDataset);
                var modifiedDataset = new Dataset(req.body);
                modifiedDataset._id = ds._id;
                ds.update(modifiedDataset, (err)=>{
                    if (err){
                        res.json({info: 'error during dataset update', error: err});
                    }
                    res.json({info: 'dataset modified successfully', data: modifiedDataset});
                });
            }
        });
}

export function removeAllDatasets (req, res){
    Dataset.remove ({},  (err) =>{
        if (err) {
            res.json({info: 'error during dataset removal', error: err});
        }else{
            res.json({info: 'successfully removed all dataset'});
        }
    });
}

export function removedatasetByname (req,res){
    var query={name: req.params.dataset};
    Dataset.findOneAndRemove(query, (err,ds) =>{
        if (err) {
            res.json({info: 'error during dataset removal', error: err});
        };
        if (User) {
            res.json({info: 'Dataset removed successfully', data: ds});
        } else {
            res.json({info: 'Dataset not found with name:'+ req.params.name});
        }
    })
}

export function removeDatasetByUser(req,res){
    var query={username: req.params.username};

    User.findOne(query)
        .populate("datasets")
        .exec((err,user) =>{
            if (user){
                user["datasets"] =[];
                user.save((err, user)=>{
                    if (err){
                        res.json({info: 'User save empty datasets error'});
                    }
                    if (user){
                        res.json({info: 'User deleted datasets successfully'+ user});
                    }
                })

            }else{
                res.json({info: 'User deleted datasets not found'});
            }
        })

}