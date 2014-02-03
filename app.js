http = require('http');
fs = require('fs');
sys = require('sys');
express = require('express');
connect = require('connect');
auth = require('connect-auth');
mongoose = require('mongoose');

app = express();

app.configure(function() {
	app.set('views', __dirname+'/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
});

if(!module.parent) {
	app.listen(80);
	console.log("Servidor escuchando en el puerto 80");
}