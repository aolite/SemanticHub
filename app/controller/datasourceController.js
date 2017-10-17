"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dataset = require("../datamodel/dataset");
var DataSource = require("../datamodel/datasource");
function createDataModel(req, res) {
    var newDataSource = new DataSource(req.body);
    var query = { username: req.params.username };
    console.log(query);
    newDataSource.save(function (err) {
        if (err) {
            res.json({ info: 'error during Data Source create', error: err });
        }
        res.json({ info: 'Data Source saved successfully', data: newDataSource });
    });
    Dataset.findOne(query, function (err, dataset) {
        if (err) {
            console.log(err);
        }
        ;
        if (dataset) {
            console.log(dataset);
            dataset["datasources"].push(newDataSource._id);
            dataset.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
            console.log(dataset);
        }
    });
}
exports.createDataModel = createDataModel;
function getDataModels(req, res) {
    DataSource.find(function (err, datasources) {
        if (err) {
            res.json({ info: 'error during find dataset', error: err });
        }
        ;
        res.json({ info: 'Dataset found successfully', data: datasources });
    });
}
exports.getDataModels = getDataModels;
function getDatasourceByDataset(req, res) {
    var query = { name: req.params.dataset };
    Dataset.findOne(query)
        .populate("datasources")
        .exec(function (err, ds) {
        if (err) {
            res.json({ info: 'error during find User', error: err });
        }
        ;
        if (ds) {
            res.json({ info: 'datasource by user found successfully', data: ds["datasources"] });
        }
        else {
            res.json({ info: 'datasource by user not found with name:' + req.params.dataset });
        }
        console.log(ds);
    });
}
exports.getDatasourceByDataset = getDatasourceByDataset;
//# sourceMappingURL=datasourceController.js.map