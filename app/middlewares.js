exports.middleWare = function(req, res, next){
		//do logging stuffs
		console.log('Something is going on!!');
		next();//continue the route
	};
