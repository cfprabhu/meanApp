'use strict';

(function(){
	var myProductApp = angular.module('myProductApp');

	var DepartmentCtrl = function ($scope, $http){
		$scope.working = 'Angular is Working';
		$scope.showAddForm = 0;
		$scope.editForm = 0;

		$scope.addForm = function(val){
			console.log(val);
			$scope.showAddForm = val;
		}

		//common error function
    	var onError = function (error) {
            $scope.error = error.data;
        };

        //get all persone
    	var onDepartmentGetCompleted = function(response){
    		$scope.departments = response.data;
            console.log($scope.departments);
    	}

    	var refresh = function(){
        	$http.get('/departments')
        		.then(onDepartmentGetCompleted, onError);
        	console.log('Response received...');
        }

        refresh();
    	//end get all Department

    	//add new Department
        var onAddDepartmentCompleted = function(response){
            $scope.department = response.data;
            console.log(response.data);
            refresh();
            
        };
        $scope.addDepartment = function(department){
        	var addAlert = confirm('Are you sure to save');
        	if(addAlert){
        		$http.post('/addDepartment', department)
                    .then(onAddDepartmentCompleted, onError);
            	console.log(department);
            	$scope.showAddForm = 0;
        	}
        };
        //end add new person

        //get persons by Id
        var onGetByIdCompleted = function(response){
            $scope.department = response.data;
            console.log(response.data);
            $scope.showAddForm = 1;
        };

        $scope.searchDepartment = function(id){
            $http.get('/department/' + id)
                    .then(onGetByIdCompleted, onError);
            console.log(id);
            $scope.editForm = 1;
        };
        //end get person by Id

        //delete person
        $scope.deleteDepartment = function(id){
        	var deleteUser = confirm('Are you sure you want to delete this data?');
        	if(deleteUser){
        		$http.delete('/deleteDepartment/' + id)
                .then(onPersonDeleteCompleted,  onError);
            	console.log(id);
        	}
        };

        var onPersonDeleteCompleted = function(response){
            $scope.department = response.data;
            console.log(response.data);
            refresh();
        };
        //end delete Department

        //update Department
        $scope.updateDepartment = function(department){
        	var updateAlert = confirm('Are you sure to save');
        	if(updateAlert){
        		$http.put("/updateDepartment", department)
                .then(onUpdateDepartmentCompleted, onError);
                    console.log(department);
                $scope.editForm = 0;
                $scope.showAddForm = 0;
        	}
        };

        var onUpdateDepartmentCompleted = function(response){
            $scope.department = null;//response.data;
            console.log(response.data);
            refresh();
        };
        //end update Department
	}
	myProductApp.controller('DepartmentCtrl', DepartmentCtrl);
}())