var Users = {};

function NumUsers () {
	var count = 0;

	for(var x in Users) {
		count += 1;
	}

	return count;

}

(function () {
	var express = require('express'), 
	q = require('q'),
	crypto = require('crypto');


	function launchServer() {
		'use_strict';

		var app = express();

		app.configure(function () {
		  	app.use(express.static(__dirname + '/public'));
		  	app.use(express.bodyParser());
		});

		app.get('/users', function (req, res) {
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.write(JSON.stringify(Users));
			res.end();

		});


		app.get('/users/:id', function (req, res) {
			var user = Users[req.params.id];


			if (user) {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.write(JSON.stringify(user));
			} else {
				res.writeHead(404, { 'Content-Type': 'application/json' });
			}


			res.end();

			
		});


		app.post('/users', function (req, res) {
			var user = {
				username:req.body.username,
				id: NumUsers() + 1
			};

			Users[user.username] = user;

			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.write(JSON.stringify(user));
			res.end();
		});


		app.post('/users/:username/login', function (req, res) {
			var userId = req.params.username;

			crypto.randomBytes(48, function(ex, buf) {
				var user = Users[userId];
				var token = buf.toString('hex');

				user.token = token;


				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.write(JSON.stringify({token:token}));
				res.end();


			});

			


		});


		app.post('/users/:username/logout', function (req, res) {
			var userId = req.params.username;
			var user = Users[userId];
			user.token = undefined;


			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.write(JSON.stringify(user));
			res.end()


		});


		var port = process.env.PORT || 3000;


		app.listen(port);
		console.log('Listening on port 3000');

	};

	launchServer();
}());
