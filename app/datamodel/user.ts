import * as mongoose from "mongoose";
import * as Dataset from "./dataset"

var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    username: String,
    password: String, 
    datasets:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Dataset' }]
});

var User = mongoose.model("User", userSchema);

export =User;