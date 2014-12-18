var app = angular.module('technik',['ngRoute','ngResource']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', 
		{
			templateUrl: 'partials/test.html'
		})
		.otherwise({redirectTo: '/'});
});
