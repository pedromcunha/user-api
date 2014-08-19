//Get the packages and dependency files
var mongoose = require('mongoose'),
	express = require('express'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
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
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done){
	done(null, user);
});
passport.deserializeUser(function(user, done){
	done(null, user);
});
passport.use(new LocalStrategy(function(name, password, done){
	process.nextTick( function() {
		User.findOne({
				'name': name,
			}, function(err, user){
					if(err) { return done(err); }
					if(!user) { return done(null, false); }
					if(user.password != password) { return done(null, false); }

					return done(null, user);
			});
	});
	}
));
//Additional Routes
router.post('/login',
	passport.authenticate('local', {
		successRedirect:'/api/loginSuccess',
		failureRedirect: '/api/loginFailure'
	})
);
router.get('/loginFailure', function (req, res, next){
	res.send('Failed to authenticate');
});
router.get('/loginSuccess', function(req, res, next){
	res.send('Successfully authenticated');
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
//Register the base route
app.use('/api', router);

//Boot up Sever
app.listen(port);
console.log('Great stuff happening on port ' + port);