describe('Unit: Application.ApplicationController', function() {

    var ApplicationController, $scope;

    beforeEach(module('Application'));

    beforeEach(inject(function($controller, $rootScope) {

        $scope = $rootScope.$new();

        ApplicationController = $controller('ApplicationController', {
            $scope: $scope
        });
    }));

    it('Should output correct App Name', function() {
        expect($scope.appName).toEqual('WeatherApp');
        expect($scope.appVersion).toEqual('v0.0.1');
    });

});