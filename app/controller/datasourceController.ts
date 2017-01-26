import * as DataSouce from "../datamodel/datasource"
import * as User from '../datamodel/user'

export function createDataModel (req,res){
    var newDataSource= new DataSouce(req.body);
    newDataSource.save((err)=>{
        if (err){
            res.json({info: 'error during User create', error: err});
        }
            res.json({info: 'User saved successfully', data: newDataSource}); 
    });

    var query = {username: req.params.username};

    User.findOne(query,function(error, user) {
        if (error) {
            return error;
        }
        user["dataSources"].push(newDataSource);
        console.log(user); // prints "Aaron"
        });
}