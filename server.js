var Users = [];

(function () {
	var express = require('express'), q = require('q');


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
			var user = Users[req.params.id - 1];

			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.write(JSON.stringify(user));
			res.end();
		});


		app.post('/users', function (req, res) {
			var userId = Users.length + 1;
			var user = {
				name:req.body.name,
				id:userId
			};

			Users.push(user);

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
