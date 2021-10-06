const User = require('../models/userModel');
const userService = require('../services/userService');

// Retrieve and return all users from the database.
function findAll(req, res) {
User.find().then(users => {
  
    res.send(users);

        }).catch(err => {
  
res.status(500).send({
  message: err.message || "Something went wrong while getting list of users."
        });
    });
};

// Create and Save a new User
function createUser(req,res) {
// Validate request
    if(!req.body) {
        return res.status(400).send({
        message: "Please fill all required field"
    });
}
// Create a new User
const user = new User();
    userService.firstname = req.body.firstname;
    userService.lastname = req.body.lastname;
    userService.email = req.body.email;
    userService.password = req.body.password;

// Save user in the database

user.save().then(data => {
    res.status(200).json(data);
    }).catch(err => {
            res.status(500).json({
            message: err.message || "Something went wrong while creating new user."
        });
    });
};



// Find a single User with a id
    function findUser(req, res) {
        User.findById(req.params.id)
            .then(user => {
                          if(!user) {
                                        return res.status(404).send({
                                        message: "User not found with id " + req.params.id
                                    });
                }

                        res.send(user);
            }).catch(err => {
    if(err.kind === 'ObjectId') {
            return res.status(404).send({
            message: "User not found with id " + req.params.id
    });
            }
            return res.status(500).send({
            message: "Error getting user with id " + req.params.id
                });
          });
    };




// Update a User identified by the id in the request
function updateUser(req, res) {
// Validate Request
    if(!req.body) {
        return res.status(400).send({
        message: "Please fill all required field"
    });
}
// Find user and update it with the request body
User.findByIdUser(req.params.id, {
    userService: req.body.firstname,
    userService: req.body.lastname,
    userService: req.body.email,
    userService: req.body.password
}, {new: true}).then(user => {
        if(!user) {
                return res.status(404).send({
                message: "user not found with id " + req.params.id
            });
        }
    res.send(user);
})
    .catch(err => {
    if(err.kind === 'ObjectId') {
            return res.status(404).send({
            message: "user not found with id " + req.params.id
        });
    }
    return res.status(500).send ({
    message: "Error updating user with id " + req.params.id
            });
        });
    };



// Delete a User with the specified id in the request
function deleteUser(req, res) {
    User.findByIdAndRemove(req.params.id)
        .then(user => {
            if(!user) {
            return res.status(404).send({
            message: "user not found with id " + req.params.id
        });
    }
        res.send({message: "user deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
        message: "user not found with id " + req.params.id
            });
        }
    return res.status(500).send({
    message: "Could not delete user with id " + req.params.id
            });
        });
};

module.exports = {
    findAll : findAll,
    createUser : createUser,
    findUser : findUser,
    updateUser : updateUser,
    deleteUser : deleteUser, 
}