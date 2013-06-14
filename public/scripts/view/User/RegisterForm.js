define(
	'view/User/RegisterForm',

	[

		'cookies',
		'view/View',
		'models/User'
	],

	function (cookies, View, User) {
		var RegisterForm;


		RegisterForm = View.extend({


			render: function () {
				return View.prototype.render.apply(this, arguments)
					.then(function () {

						jQuery(this.element()).on('submit', function (e) {
							e.preventDefault();

							this.trigger('login:submit', e);


						}.bind(this));

						return this.element();

					}.bind(this))

				
			}

		});


		return RegisterForm;

	}
)