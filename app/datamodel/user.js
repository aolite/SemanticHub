"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema, ObjectId = Schema.Types.ObjectId;
var userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    username: String,
    password: String,
    dataSources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DataSource' }]
});
var User = mongoose.model("User", userSchema);
module.exports = User;
//# sourceMappingURL=user.js.map