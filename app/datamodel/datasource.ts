import * as mongoose from "mongoose";

interface IDataSource{
    endpoint:string;
    name:string;
    description:string;
}
interface IDataSourceModel extends IDataSource, mongoose.Document{};
var dataSourceSchema = new mongoose.Schema({
    endpoint: String,
    name: String,
    description:String,
});

var DataSource = mongoose.model<IDataSourceModel>("DataSource", dataSourceSchema);

export = DataSource;

