var app = angular.module('technik',['ngRoute','ngResource']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', 
		{
			templateUrl: 'partials/material.html'
		})
		.when('/material', 
		{
			templateUrl: 'partials/material.html'
		})
		.when('/cart', 
		{
			templateUrl: 'partials/cart.html'
		})
		.otherwise({redirectTo: '/'});
});
