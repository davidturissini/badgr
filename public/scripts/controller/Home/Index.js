define(
	'controller/Home/Index',

	[
		'jQuery',
		'cookies',
		'models/User',
		'controller/User/Show'
	],

	function (jQuery, cookies, User, ControllerUserShow) {
		var IndexController;


		IndexController = function () {};


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

								var controllerUserShow = new ControllerUserShow(user);
								indexController.deactivate();
								controllerUserShow.activate();

							});

						});

					} else {
						user = new User({id:userId});

						user.fetch()

						.then(function () {
							var controllerUserShow = new ControllerUserShow(user);
							indexController.deactivate();
							controllerUserShow.activate();
						});

						

					}

				});
			}


		};


		return IndexController;


	}
);