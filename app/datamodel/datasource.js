"use strict";
var mongoose = require("mongoose");
;
var dataSourceSchema = new mongoose.Schema({
    endpoint: String,
    name: String,
    description: String,
});
var DataSource = mongoose.model("DataSource", dataSourceSchema);
module.exports = DataSource;
//# sourceMappingURL=datasource.js.map