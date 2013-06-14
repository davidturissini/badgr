define(
	'models/User',


	[
		'jQuery',
		'backbone'
	],


	function (jQuery, Backbone) {
		var User;


		User = Backbone.Model.extend({

			url: function () {
				var baseResourcePath = '/users';


				if (this.isNew()) {
					return baseResourcePath;

				} else {
					return baseResourcePath + '/' + this.id;

				}
			},

			login: function (password) {

				return jQuery.ajax({
					type:'post',
					url:'/users/' + this.get('username') + '/login',
					data: {
						password:password
					}

				})

					.then(function (tokenObj) {

						this.set({
							token:tokenObj.token
						});


						return this;

					}.bind(this));


			},


			logout: function () {

			}


		});


		User.register = function (params) {
			var user = new User(params || {});
				

			return user.save()

				.then(function (a) {
					return user;
				});


		}


		return User;

	}
);