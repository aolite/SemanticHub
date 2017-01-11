"use strict";
var mongoose = require("mongoose");
;
var userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
});
var User = mongoose.model("User", userSchema);
module.exports = User;
//# sourceMappingURL=user.js.map