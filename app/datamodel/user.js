"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new mongoose.Schema({
    _username: String,
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    dataSources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DataSource' }]
});
var User = mongoose.model("User", userSchema);
module.exports = User;
//# sourceMappingURL=user.js.map