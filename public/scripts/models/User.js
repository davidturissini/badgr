define(
	'models/User',


	[
		'backbone'
	],


	function (Backbone) {
		var User;


		User = Backbone.Model.extend({

			url: function () {
				var baseResourcePath = '/users';


				if (this.isNew()) {
					return baseResourcePath;

				} else {
					return baseResourcePath + '/' + this.id;

				}
			}


		});


		User.create = function (params) {
			var user = new User(params || {});

			return user;
		}


		return User;

	}
);