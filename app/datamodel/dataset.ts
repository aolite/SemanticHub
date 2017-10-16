import * as mongoose from "mongoose";


var datasetSchema = new mongoose.Schema({
    name: String,
    description:String,
    datasource:[{ type: mongoose.Schema.Types.ObjectId, ref: 'DataSource' }]
});

var Dataset = mongoose.model("Dataset", datasetSchema);

export = Dataset;


/*var datasetSchema = new mongoose.Schema({
    name: String,
    description: String,
    datasource:[{ type: mongoose.Schema.Types.ObjectId, ref: 'DataSource' }]
});

var Dataset = mongoose.model("dataset", datasetSchema);

export =Dataset;*/