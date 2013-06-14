define(
	'controller/User/Show', 

	[
		'jQuery',
		'view/User/Detail'
	],

	function (jQuery, ViewUserDetail) {
		var UserShowController;


		UserShowController = function (user) {
			this._user = user;
			this._viewUserDetail = new ViewUserDetail({
				template:'/scripts/template/User/detail.mustache',
				model:this._user
			});
		}


		UserShowController.prototype = {

			activate: function () {
				document.body.id = 'user-show';
				

				return this._viewUserDetail.render()
					.then(function (element) {
						document.body.appendChild(element);
					})
			}

		}


		return UserShowController;


	}

);