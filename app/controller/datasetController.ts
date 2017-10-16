import * as Dataset from "../datamodel/dataset"
import User = require("../datamodel/user");

export function createDataset (req, res){
    var newDataset= new Dataset (req.body);
    var query={username: req.params.username};

    console.log("saving the dataset");
    newDataset.save((err)=>{
        if (err){
            res.json({info: 'error during Data Source create', error: err});
        }
          res.json({info: 'Data Source saved successfully', data: newDataset});
    });

    console.log("binding user"+ query["username"]);

    User.findOne(query,function (err,user){
        if (err) {
            console.log("Error loading user:"+ err);
        };
        if (user) {
            console.log("The user is:"+ user);
            user["datasets"].push(newDataset._id);
            user.save((err)=>{
                if (err){
                    console.log("Errorsaving the user:"+ err);
                }
            });
            console.log("User loaded: "+ user);
        }
    });
}