//Pull in Schemas
var User = require('../models/users.js');
exports.registerUser = function(req, res){
		var user = new User(); //new instance of the user model defined in schemas
		user.name = req.body.name; //name comes from the req
		user.password = req.body.password;

		//Save
		user.save(function(err){
			if(err)
				res.send(err);
			else
				res.json({message: 'User Created!'});
		});
	};
exports.getAllUsers = function(req, res){
		User.find(function(err, users){
			if(err)
				res.send(err);
			else
				res.json(users);
		});
	};
exports.getSingleUser = function(req,res){
		User.findById(req.params.user_id, function(err, user){
			if(err)
				res.send(err);
			else
				res.json(user);
		});
	};
exports.updateUser = function(req, res) {
		//Find user by using the user model/schema
		User.findById(req.params.user_id, function(err, user){
			if (err)
				res.send(err);
				if (req.body.name != '')
					user.name = req.body.name;
				if(req.body.password != '')
					user.password = req.body.password;
			user.save(function(err){
				if (err)
					res.send(err);
				else 
					res.json({message: "User Updated!"})
			});
		});
	};
exports.deleteUser = function(req, res){
		User.remove({
			_id: req.params.user_id
		}, function(err, user){
			if (err)
				res.send(err);
			else
				res.json({message: "Account has been deleted"});
		});
	};