import * as User from '../datamodel/user'

export function createUser (req,res){
    var newUser = new User(req.body);
    newUser.save((err)=>{
        if (err){
            res.json({info: 'error during User create', error: err});
        }
        res.json({info: 'User saved successfully', data: newUser}); 
    });
}

export function readUsers(req,res){
    User.find((err, Users) => {
        if (err) {
            res.json({info: 'error during find Users', error: err});
        };
          res.json({info: 'Users found successfully', data: Users});
    });
}

export function readUserByName (req,res){
    var query = {first_name: req.params.name};
    User.findOne(query, function(err, User) {
        if (err) {
            res.json({info: 'error during find User', error: err});
        };
        if (User) {
            res.json({info: 'User found successfully', data: User});
        } else {
            res.json({info: 'User not found with name:'+ req.params.name});
        }
    });
}

export function removeUserByName (req,res){
    var query={first_name: req.params.name};
    User.findOneAndRemove(req.params.name, function (err,User){
        if (err) {
            res.json({info: 'error during User removal', error: err});
        };
        if (User) {
            res.json({info: 'User removed successfully', data: User});
        } else {
            res.json({info: 'User not found with name:'+ req.params.name});
        }
    });
}
