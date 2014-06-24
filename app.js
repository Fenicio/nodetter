express = require('express');
partials = require('express-partials');

app = express();

http = require('http');
fs = require('fs');
sys = require('sys');

mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/db');
Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

//Importamos los modelos
require('./models/account.js');
require('./models/tweet.js');

Account = mongoose.model('Account');
Tweet = mongoose.model('Tweet');

connect = require('connect');
auth = require('connect-auth');

require('./fb_creds.js');


app.configure(function() {
	app.use(partials());
	app.set('views', __dirname+'/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({
		secret: 'exmplsecret'
	}));
	app.use(express.logger({ format: ':date :remote-addr :method :status :url'}));
	app.use(auth({strategies: [
			auth.Facebook({ appId: fbId, 
				appSecret: fbSecret, 
				scope: "email", 
				callback: fbCallbackAddress })
		], 
		trace: true}));
	app.use(express.static(__dirname+'/public'));
	app.use(app.router);
});

app.configure('development', function() {
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});

loadFacebookAccount = function(facebook_details, loadCallback) {
	Account.findOne({facebook_id: facebook_details.user.id}, function(err, account) {
		if(account) {
			loadCallback(account);
		} else {
			var n = new Account();
			n.email= facebook_details.user.email;
			n.type= 1;
			n.facebook_id=facebook_details.user.id;
			n.date= new Date();
			n.save(function(err) {
				loadCallback(n);
			});
		}
	});
}

loadAccount = function(req, loadCallback) {
	if(req.isAuthenticated()) {
		if(req.getAuthDetails().user.id) {
			var fbook_details= req.getAuthDetails();
			loadFacebookAccount(fbook_details, loadCallback);
		}
	}	else {
		loadCallback(null);
	}
}

require('./global_funcs.js');

require('./controllers/home.js');
require('./controllers/auth.js');
require('./controllers/edit.js');
require('./controllers/tweet.js');
require('./controllers/user.js');

if(!module.parent) {
	app.listen(80);
	console.log("Servidor escuchando en el puerto 80");
}