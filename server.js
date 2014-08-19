//Get the packages
var mongoose = require('mongoose'),
	express = require('express'),
	bodyParser = require('body-parser'),
	app = express();

//Pull in Schemas
var User = require('./app/models/users.js');

//Configure the app
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var port = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost/restful');

//instantiate the router from express.
var router = express.Router(); 

//Middleware to use for all req
router.use(function(req, res, next){
	//do logging stuffs
	console.log('Something is going on!!');
	next();//continue the route
});
router.get('/', function(req, res){
	res.json({ message: "horray, welcome to our api!"});
});
//User routes
var Users = router.route('/users');
//Create a user
	Users.post(function(req, res){
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
	});
//Get all the users
	Users.get(function(req, res){
		User.find(function(err, users){
			if(err)
				res.send(err);
			else
				res.json(users);
		});
	});
//Make a new route to handle a single user
var SingleUser = router.route('/users/:user_id');
	SingleUser.get(function(req,res){
		User.findById(req.params.user_id, function(err, user){
			if(err)
				res.send(err);
			else
				res.json(user);
		});
	});
	SingleUser.put(function(req, res) {
		
	});
//Register the routes
app.use('/api', router);

//Boot up Sever
app.listen(port);
console.log('Great stuff happening on port ' + port);