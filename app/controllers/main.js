'use strict';

vms.controller('MainCtrl', function ($scope, $uibModal) {

    
    $scope.open = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'app/views/myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: '90'
        });
        return false;
    };
    
});