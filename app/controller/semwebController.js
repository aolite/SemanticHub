"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rdf = require("rdflib");
var jsonld = require("jsonld");
var Rx = require("rx");
var RDF = rdf.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
var RDFS = rdf.Namespace("http://www.w3.org/2000/01/rdf-schema#");
var FOAF = rdf.Namespace("http://xmlns.com/foaf/0.1/");
var SSN = rdf.Namespace("http://purl.oclc.org/NET/ssnx/ssn#");
var XSD = rdf.Namespace("http://www.w3.org/2001/XMLSchema#");
function getSemWeb(req, res) {
    console.info('Getting the semantic streams from the defined URLs...');
    var store = rdf.graph();
    var promises = jsonld.promises;
    var contentType = 'application/nquads';
    var baseUrl = "http://IoTTriples.com";
    var sensor = rdf.sym(baseUrl + '#HumiditySensor');
    var strStream = "";
    var semStream = Rx.Observable
        .interval(500 /* ms */)
        .timeInterval()
        .map(function (x) {
        store = rdf.graph();
        store.add(sensor, SSN('hasDate'), rdf.lit('2017-02-25T' + x.value + ':00:00+00:00', '', XSD('dateTime')));
        store.add(sensor, SSN('hasValue'), rdf.lit((Math.random() * 10) + 50, '', XSD('double')));
        return store.toString().replace(/{/g, '').replace(/}/g, '');
    })
        .take(1000)
        .subscribe(function (x) {
        jsonld.fromRDF(x, { format: 'application/nquads' }, function (err, doc) {
            // doc is JSON-LD
            //console.log (JSON.stringify(doc));
            strStream = JSON.stringify(doc);
        });
        console.info("Semantic Stream: " + strStream + '\n');
        res.write(strStream);
    }, function (err) {
        console.log('Service Error caused by: \n' + err + '\n');
        res.write(JSON.stringify(err));
    });
    //var nquads = store.toString().replace(/{/g,'').replace(/}/g,'');
    //var promise = promises.fromRDF(nquads, {format:'application/nquads'});
    /*Rx.Observable.fromPromise(promise).subscribe(
        function(doc) {
            console.log('doc');
            console.log(JSON.stringify(doc));
            res.write(JSON.stringify(doc));
        },
        function(err) {
            console.log(err);
            res.write(JSON.stringify(err));
        },
        function (){
            console.log('Completed Streams');
            res.end();
        }
    );


    // deserialize N-Quads (RDF) to JSON-LD
  /*jsonld.fromRDF(nquads, {format: 'application/nquads'}, function(err, doc) {
    // doc is JSON-LD
    res.json(JSON.stringify(doc));
  });*/
}
exports.getSemWeb = getSemWeb;
//# sourceMappingURL=semwebController.js.map