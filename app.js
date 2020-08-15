// Module
var app = angular.module('myApp', []);
//json data
app.factory('JSONdata', function($http) {
    return $http.get('content.json');
});
// Controller
app.controller('myController', function($scope, JSONdata) {

    // Object
    $scope.FileData = [];

    $scope.search = '';
    $scope.is_checked_all = false;
    $scope.pageactive = 1;

    //get data from json file
    JSONdata.success(function(data) {
        $scope.FileData = data;
    });

    // column to sort
    $scope.column = 'sno';

    // sort ordering (Ascending or Descending). Set true for desending
    $scope.reverse = false;

    // called on header click
    $scope.sortColumn = function(col) {
        $scope.column = col;
        if ($scope.reverse) {
            $scope.reverse = false;
            $scope.reverseclass = 'arrow-up';
        } else {
            $scope.reverse = true;
            $scope.reverseclass = 'arrow-down';
        }
    };

    // remove and change class
    $scope.sortClass = function(col) {
        if ($scope.column == col) {
            if ($scope.reverse) {
                return 'arrow-down';
            } else {
                return 'arrow-up';
            }
        } else {
            return '';
        }
    }

    // Tabs
    $scope.tabs = [{
            'name': 'Immunization Alerts',
            'tab': 1
        },
        {
            'name': 'Lab Alerts',
            'tab': 2
        },
        {
            'name': 'DI Alerts',
            'tab': 3
        },
        {
            'name': 'Procedure Alerts',
            'tab': 4
        },
        {
            'name': 'RX Specific Alerts',
            'tab': 5
        },
        {
            'name': 'DX Specific Alerts',
            'tab': 6
        },
        {
            'name': 'Patient Specific Alerts',
            'tab': 7
        }

    ]

    // default tab
    $scope.tabActive = {
        'name': 'RX Specific Alerts',
        'tab': 5
    };

    // Switch tab

    $scope.switchTab = function(tab) {
        $scope.tabActive = tab;
    }

    // Modal
    $scope.modalActive = false;

    $scope.openModal = function() {
        $scope.modalActive = true;
    }
    $scope.closeModal = function() {
        $scope.modalActive = false;
    }

    $scope.check_all = function(status) {
        angular.forEach($scope.FileData, function(data, key) {
            data.is_checked = status;
        });
    }

    $scope.delete = function() {
        $scope.is_checked_all = false;

        angular.forEach($scope.FileData, function(data, key) {
            if (data.is_checked) {
                data.is_active = false;
            }
        });
    }

    $scope.FileDataNew = [];
    $scope.newData = {};
    $scope.newData.name = '';
    $scope.newData.description = '';
    $scope.newData.web_refrence = '';

    $scope.add_new = function() {
        if ($scope.newData.name && $scope.newData.description && $scope.newData.web_refrence)
            $scope.FileDataNew.push({
                "name": $scope.newData.name,
                "description": $scope.newData.description,
                "web_refrence": $scope.newData.web_refrence
            })
        $scope.newData.name = '';
        $scope.newData.description = '';
        $scope.newData.web_refrence = '';
    }

    $scope.add_main = function() {
        angular.forEach($scope.FileDataNew, function(data, key) {
            if (data.name && data.description && data.web_refrence)
                $scope.FileData.push(data);
        });
        var objDiv = document.getElementsByClassName("table-cont")[0];
        objDiv.scrollTop = objDiv.scrollHeight;
    }


});