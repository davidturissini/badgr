(function () {
	var express = require('express'), q = require('q');


	function launchServer() {
		'use_strict';

		var app = express();

		app.configure(function () {
		  	app.use(express.static(__dirname + '/public'));
		  	app.use(express.bodyParser());
		});

		app.get('/', function (req, res) {
			var config = {
				soundcloud: {
					client_id: Levels.config.soundcloud.client_id
				}
			};

			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.write(JSON.stringify(config));
			res.end();

		});


		var port = process.env.PORT || 3000;


		app.listen(port);
		console.log('Listening on port 3000');

	};

	launchServer();
}());
