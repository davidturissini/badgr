define(
	'controller/Home/Index',

	[
		'jQuery',
		'cookies',
		'backbone',
		'router/User',
		'view/User/RegisterForm',
		'models/User'
	],

	function (jQuery, cookies, Backbone, RouterUser, ViewUserRegisterForm, User) {
		var IndexController;
		var routerUser = new RouterUser();
		
		Backbone.history.start({
			pushState:true
		});


		IndexController = function () {};


		function goToUserShow(user, indexController) {
			indexController.deactivate();
			routerUser.navigate('users/' + user.get('username'), {trigger:true});
		}


		IndexController.prototype = {


			deactivate: function () {
				var formEl = jQuery('.user-register-form');
				formEl.remove();
			},


			activate: function () {
				var indexController = this;
				var viewUserRegisterForm = new ViewUserRegisterForm({
					template:'/scripts/template/User/register_form.mustache'
				});


				jQuery(document).ready(function () {
					var userId = cookies.get('user_id');
					var user;

					document.body.id = 'home-index';


					viewUserRegisterForm.render()

						.then(function (element) {
							document.body.appendChild(element);
						});

					viewUserRegisterForm.on('login:submit', function (evt) {
						var userNameFieldEl = jQuery('.user-register-form-name', viewUserRegisterForm.element());
						

						User.register({
							username:userNameFieldEl.val()
						})

						.then(function (user) {
							return user.login();
						})

						.then(function (user) {
							goToUserShow(user, indexController);
						});


					});
					
					

				});

				
			}


		};


		return IndexController;


	}
);