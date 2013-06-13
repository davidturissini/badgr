define(
	'view/User/Detail',

	[
		'backbone',
		'mustache'
	],

	function (Backbone, Mustache) {
		var ViewUserDetail;
		var template = '<div><h1>Hello, {{name}}</h1>';


		ViewUserDetail = Backbone.View.extend({


			render: function () {
				var div = document.createElement('div');
				
				var renderedTemplate = Mustache.render(template, this.model.attributes);
				div.innerHTML = renderedTemplate;
				document.body.appendChild(div);

			}


		});


		return ViewUserDetail;


	}
)