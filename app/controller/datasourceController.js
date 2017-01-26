"use strict";
var DataSouce = require("../datamodel/datasource");
var User = require("../datamodel/user");
function createDataModel(req, res) {
    var newDataSource = new DataSouce(req.body);
    newDataSource.save(function (err) {
        if (err) {
            res.json({ info: 'error during User create', error: err });
        }
        res.json({ info: 'User saved successfully', data: newDataSource });
    });
    var query = { username: req.params.username };
    User.findOne(query, function (error, user) {
        if (error) {
            return error;
        }
        user["dataSources"].push(newDataSource);
        console.log(user); // prints "Aaron"
    });
}
exports.createDataModel = createDataModel;
//# sourceMappingURL=datasourceController.js.map