'use strict';
(function(){
	var app = angular.module('myProductApp',['ngRoute', 'angular-loading-bar']);
	app.config(function ($routeProvider) {
		$routeProvider
		.when("/department",{
			templateUrl: 'app/views/department.html',
            controller: "DepartmentCtrl"
		})
		.when("/sales",{
			templateUrl: 'app/views/sales.html',
            controller: "SalesCtrl"
		})
		.otherwise({ redirectTo: "/department" })
	})

}())