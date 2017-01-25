
import * as rdf from "rdflib"
import * as jsonld from "jsonld"

var RDF = rdf.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#")
var RDFS = rdf.Namespace("http://www.w3.org/2000/01/rdf-schema#")
var FOAF = rdf.Namespace("http://xmlns.com/foaf/0.1/")
var XSD = rdf.Namespace("http://www.w3.org/2001/XMLSchema#")

export function getSemWeb(req,res){

    var store = rdf.graph(); 
    var promises = jsonld.promises;
    var contentType='application/nquads';
    var baseUrl="http://IoFTriples.com";

    var me = rdf.sym('https://www.w3.org/People/Berners-Lee/card#i');
    var knows = FOAF('knows')
    
    store.add(me, FOAF('knows'), rdf.sym('https://fred.me/profile#me'))
    store.add(me, FOAF('name'), "Albert Bloggs")

    var nquads = store.toString().replace(/{/g,'').replace(/}/g,'');



    /*var promise = promises.fromRDF(nquads, {format:'application/nquads'});
    promise.then(function(doc) {
        console.log (doc)
        res.write(doc);
    }, function(err) {
        res.end("End"+err);
    });*/

    // deserialize N-Quads (RDF) to JSON-LD
  jsonld.fromRDF(nquads, {format: 'application/nquads'}, function(err, doc) {
    // doc is JSON-LD
    res.json(JSON.stringify(doc));
  });
    
}