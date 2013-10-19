/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({
	secret : 'IIS'
}));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

// use session to check validation of request
app.get('/', function(req, res) {
	// check if the user's credentials are saved in a cookie //
	if (req.session.user === undefined) {
		res.render('login', {
			title : 'Login'
		});
	} else {
		res.redirect('/home');
	}/* else {
		// attempt automatic login //
		AM.autoLogin(req.cookies.user, req.cookies.pass, function(o) {
			if (o != null) {
				req.session.user = o;
				res.redirect('/home');
			} else {
				res.render('login', {
					title : 'Hello - Please Login To Your Account'
				});
			}
		});
	}*/
});
app.get('/home', routes.index);
app.get('/users', user.list);
app.get('/login', user.login);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
