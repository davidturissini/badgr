define(
	'view/View',

	[
		'jQuery',
		'backbone',
		'mustache',
		'q'
	],

	function (jQuery, Backbone, Mustache, Q) {
		var View;

		View = Backbone.View.extend({

			element: function () {
				return this.el;
			},


			templateUrl: function () {
				return this.options.template;
			},

			fetchTemplate: function () {
				var templateUrl = this.templateUrl();


				return jQuery.ajax({
					url:templateUrl
				});


			},

			hasTemplate: function () {
				return (typeof this.templateUrl() === 'string');
			},





			render: function () {
				var deferred;
				var element = this.el;
				var model = this.model;
				

				if (this.hasTemplate()) {
					return this.fetchTemplate()

					.then(function (html) {


						if (model !== undefined) {
							html = Mustache.render(html, model.attributes);
						}

						jQuery(element).html(html);

						return element;

					}.bind(this));
				}

				deferred = Q.defer();
				deferred.resolve(element);
				return deferred.promise;

			}


		});


		return View;
	}

)