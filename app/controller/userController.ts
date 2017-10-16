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
    User.findOne(query)
        .populate("dataSources")
        .exec(function (err, person) {
            if (err) {
                res.json({info: 'error during find User', error: err});
            };
            if (person) {
                 res.json({info: 'User found successfully', data: person});
            } else {
                res.json({info: 'User not found with name:'+ req.params.name});
            }
            console.log(person);
        })
}

export function updateUser (req,res){
    var query={first_name: req.params.name};
    User.findOne(query)
        .populate("dataSources")
        .exec(function (err, person) {
            if (person) {
                var modifiedUser = new User(req.body);
                modifiedUser._id = person._id;
                person.update(modifiedUser,(err)=>{
                    if (err){
                        res.json({info: 'error during User update', error: err});
                    }
                    res.json({info: 'User modified successfully', data: modifiedUser});
                });
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

export function removeAllUsers (req, res){
    User.remove ({},  (err) =>{
        if (err) {
            res.json({info: 'error during User removal', error: err});
        }else{
            res.json({info: 'successfully removed all users'});
        }
    });
}
