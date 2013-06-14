define(
	'router/User',

	[
		'backbone',
		'controller/User/Show',
		'models/User'
	],

	function (Backbone, ControllerUserShow, User) {
		var RouterUser;


		RouterUser = Backbone.Router.extend({

			routes: {
				'users/:user_id': 'show'
			},

			show: function (user_id) {
				var user = new User({id:user_id});

				user.fetch()

					.then(function () {
						var controllerUserShow = new ControllerUserShow(user);
						controllerUserShow.activate();
					});
				
			}

		});



		return RouterUser;


	}

)