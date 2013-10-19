
/*
 * GET users listing.
 */

var login;

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.login = function(req, res){
	if (req.query.username === 'hieunh3') {
		req.session.user = req.query.username;
		res.send("ok");
	} else {
		res.render('login', {title:"login screen"});
	}
};