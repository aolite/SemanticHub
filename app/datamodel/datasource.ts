import * as mongoose from "mongoose";

var dataSourceSchema = new mongoose.Schema({
    _id:Number,
    endpoint: String,
    name: String,
    description:String,
});

var DataSource = mongoose.model("DataSource", dataSourceSchema);

export = DataSource;

