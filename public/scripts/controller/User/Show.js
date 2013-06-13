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
				model:this._user
			});
		}


		UserShowController.prototype = {

			activate: function () {
				jQuery(document.body).addClass('user-show');
				this._viewUserDetail.render();
			}

		}


		return UserShowController;


	}

);