define(
	'controller/Home/Index',

	[
		'jQuery',
		'cookies',
		'backbone',
		'models/User',
		'router/User'
	],

	function (jQuery, cookies, Backbone, User, RouterUser) {
		var IndexController;
		var routerUser = new RouterUser();
		
		Backbone.history.start({
			pushState:true
		});


		IndexController = function () {};


		function goToUserShow(user, indexController) {
			indexController.deactivate();
			routerUser.navigate('users/' + user.id, {trigger:true});
		}


		IndexController.prototype = {


			deactivate: function () {
				var formEl = document.getElementById('user-register-form');
				formEl.parentNode.removeChild(formEl);
			},


			activate: function () {
				var indexController = this;
				


				jQuery(document).ready(function () {
					var formEl = document.getElementById('user-register-form');
					var userNameFieldEl = document.getElementById('user-register-form-name');
					var userId = cookies.get('user_id');
					var user;
					

					if (!userId) {
						jQuery(formEl).on('submit', function (e) {
							e.preventDefault();

							var user = User.create({
								name:userNameFieldEl.value
							});
							
							user.save()

							.then(function () {
								cookies.set('user_id', user.id);

								goToUserShow(user, indexController);

							});

						});

					} else {
						user = new User({id:userId});

						user.fetch()

						.then(function () {
							goToUserShow(user, indexController);
						});

						

					}

				});
			}


		};


		return IndexController;


	}
);