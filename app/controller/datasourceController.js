"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataSouce = require("../datamodel/datasource");
var User = require("../datamodel/user");
function createDataModel(req, res) {
    var newDataSource = new DataSouce(req.body);
    var query = { username: req.params.username };
    console.log(query);
    newDataSource.save(function (err) {
        if (err) {
            res.json({ info: 'error during Data Source create', error: err });
        }
        res.json({ info: 'Data Source saved successfully', data: newDataSource });
    });
    User.findOne(query, function (err, user) {
        if (err) {
            console.log(err);
        }
        ;
        if (user) {
            console.log(user);
            user["dataSources"].push(newDataSource._id);
            user.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
            console.log(user);
        }
    });
}
exports.createDataModel = createDataModel;
//# sourceMappingURL=datasourceController.js.map