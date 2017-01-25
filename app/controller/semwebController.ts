
import * as rdf from "rdflib"
import * as jsonld from "jsonld"
import * as Rx from "rx";

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
  
    var promise; 
    var strStream="";
    var semStream = Rx.Observable
    .interval(500 /* ms */)
    .timeInterval()
    .map (function (x){
        store= rdf.graph();
        store.add(me, FOAF('knows'), rdf.sym('https://fred.me/profile#me'))
        store.add(me, FOAF('name'), "Albert Bloggs"+x.value)    
        return store.toString().replace(/{/g,'').replace(/}/g,'');
    })
    .take(30)
    .subscribe (
        function (x) {
            
           jsonld.fromRDF(x, {format: 'application/nquads'}, function(err, doc) {
                // doc is JSON-LD
                //console.log (JSON.stringify(doc));
                strStream= JSON.stringify(doc);
                });
            console.log("ND:"+ strStream)
            res.write(strStream);
            
        },
        function (err) {
             console.log('Error:'+err);
             res.write(JSON.stringify(err));
        },
        function () {
            console.log('Completed');
            res.end();
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