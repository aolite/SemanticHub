import * as DataSouce from "../datamodel/datasource"
import * as User from '../datamodel/user'

export function createDataModel (req,res){
    var newDataSource= new DataSouce(req.body);
    var query={username: req.params.username};

    console.log(query);

    newDataSource.save((err)=>{
        if (err){
            res.json({info: 'error during Data Source create', error: err});
        }
            res.json({info: 'Data Source saved successfully', data: newDataSource}); 
    });

    User.findOne(query,function (err,user){
        if (err) {
            console.log(err);
        };
        if (user) {
           console.log(user);
           
           user["dataSources"].push(newDataSource._id);
           user.save((err)=>{
                if (err){
                    console.log(err);
                }
            });
           console.log(user);
        } 
    });
    
}