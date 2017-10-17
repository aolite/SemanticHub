import * as Dataset from '../datamodel/dataset'
import DataSource = require("../datamodel/datasource");

export function createDataModel (req,res){
    var newDataSource= new DataSource(req.body);
    var query={username: req.params.username};

    console.log(query);

    newDataSource.save((err)=>{
        if (err){
            res.json({info: 'error during Data Source create', error: err});
        }
            res.json({info: 'Data Source saved successfully', data: newDataSource}); 
    });

    Dataset.findOne(query,function (err,dataset){
        if (err) {
            console.log(err);
        };
        if (dataset) {
           console.log(dataset);

            dataset["datasources"].push(newDataSource._id);
            dataset.save((err)=>{
                if (err){
                    console.log(err);
                }
            });
           console.log(dataset);
        } 
    });
}

export function getDataModels (req,res){
    DataSource.find((err, datasources) => {
        if (err) {
            res.json({info: 'error during find dataset', error: err});
        };
        res.json({info: 'Dataset found successfully', data: datasources});
    });
}

export function getDatasourceByDataset (req, res){
    var query={name: req.params.dataset};

    Dataset.findOne(query)
        .populate("datasources")
        .exec(function (err, ds) {
            if (err) {
                res.json({info: 'error during find User', error: err});
            };
            if (ds) {
                res.json({info: 'datasource by user found successfully', data: ds["datasources"]});
            } else {
                res.json({info: 'datasource by user not found with name:'+ req.params.dataset});
            }
            console.log(ds);
        })
}