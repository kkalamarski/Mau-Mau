/* Loading Libs */
var angular = require('angular');
jQuery = $ = require('jquery');
var bootstrap = require('bootstrap');
require('angular-ui-router');

/* Loading Modules */
require('./src/js/Application');

/* Init App */
var app = angular.module('app', [
    'ui.router',
    'Application'
]);

app.config(function($urlRouterProvider){
    $urlRouterProvider.otherwise('home');
});