import * as Dataset from "../datamodel/dataset"
import User = require("../datamodel/user");

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