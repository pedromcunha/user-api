//Get the packages and dependency files
var mongoose = require('mongoose'),
	express = require('express'),
	bodyParser = require('body-parser'),
	middleWares = require('./app/middlewares.js'),
	userRoutes = require('./app/routes/userRoute.js'),
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
router.use(middleWares.middleWare);
router.get('/', function(req, res){
	res.json({ message: "horray, welcome to our api!"});
});
//User routes
var Users = router.route('/users');
	Users.post(userRoutes.registerUser);
	Users.get(userRoutes.getAllUsers);
//Make a new route to handle a single user
var SingleUser = router.route('/users/:user_id');
	SingleUser.get(userRoutes.getSingleUser);
	SingleUser.put(userRoutes.updateUser);
	SingleUser.delete(userRoutes.deleteUser);
//Register the routes
app.use('/api', router);

//Boot up Sever
app.listen(port);
console.log('Great stuff happening on port ' + port);