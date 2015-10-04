// Load required packages
var User = require('../models/user');

//GET - Return all users in the DB
exports.getAllUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};

//GET - Return a User with specified ID
exports.findUserById = function(req, res) {
  User.findById(req.params.userId, function (err, user) {
            if (err) return res.send(404, err.user);
            //console.log('GET /user/' + req.params.userId);
            res.status(200).jsonp(user);
  });
};

//GET - Return a User with specified username
exports.findUserByUsername = function(req, res) {
  User.findOne({username:req.params.username}, function (err, user) {
            if (err) { 
                return res.status(500).jsonp(user);
            }
            if (user) {
                return res.status(200).jsonp(user);
            } else {
                return res.status(404).jsonp(user);
              } 
  });

}

//POST - Insert a new User in the DB
exports.addUser = function(req, res) {
  //console.log('POST /user/');
        //console.log(req.body);

        User.findOne({username:req.body.username}, function (err, user) {
            if (err) { 
                return res.status(500).jsonp(user);
            }
            if (user) {
                return res.status(409).jsonp(user);
            } else {
                var user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    created_at: req.body.created_at,
                    blocked: false,
                });

                user.save(function (err, user) {
                    if (err) return res.send(500, err.user);
                    res.status(201).jsonp(user);
                });
            } 
        });
};

//PUT - Update a User already exists
exports.updateUser = function(req, res) {

//console.log('PUT /user/' + req.params.userId);
  User.findById(req.params.userId, function (err, user) {
    user.username = req.body.username,
    user.email = req.body.email,
      user.password = req.body.password,
      user.created_at = req.body.created_at,
      user.blocked = false

      user.save(function (err) {
          if (err) return res.send(500, err.user);
          res.status(200).jsonp(user);
      });
  });
};

//DELETE - Delete a User with specified ID
exports.deleteUser = function(req, res){
  //console.log('DELETE /user/' + req.params.userId);

        User.findById(req.params.userId, function (err, user) {
            if(err) return res.send(404, err.user);
            user.remove(function (err) {
                if (err) return res.send(500, err.user);
                res.status(200).end();
            })
        });
};





