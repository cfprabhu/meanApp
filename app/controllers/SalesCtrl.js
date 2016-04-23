'use strict';

(function(){
	var myProductApp = angular.module('myProductApp');

	var SalesCtrl = function ($scope, $http){
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

        var onDepartmentGetCompleted = function(response){
            $scope.departments = response.data;
            console.log($scope.departments);
        }

        var refresh1 = function(){
            $http.get('/departments')
                .then(onDepartmentGetCompleted, onError);
            console.log('Response received...');
        }


        //get all persone
    	var onSalesGetCompleted = function(response){
    		$scope.sales = response.data;
            console.log($scope.sales);
    	}

    	var refresh = function(){
        	$http.get('/sales')
        		.then(onSalesGetCompleted, onError);
        	console.log('Response received...');
        }

        refresh();
        refresh1();
    	//end get all Department

    	//add new Department
        var onAddSalesCompleted = function(response){
            $scope.sales = response.data;
            console.log(response.data);
            refresh();
            
        };
        $scope.addSales = function(sale){
            console.log(sale)
        	var addAlert = confirm('Are you sure to save');
        	if(addAlert){
        		$http.post('/addSales', sale)
                    .then(onAddSalesCompleted, onError);
            	console.log(sale);
            	$scope.showAddForm = 0;
        	}
        };
        //end add new person

        //get persons by Id
        var onGetByIdCompleted = function(response){
            $scope.sales = response.data;
            console.log(response.data);
            $scope.showAddForm = 1;
        };

        $scope.searchSales = function(id){
            $http.get('/sales/' + id)
                    .then(onGetByIdCompleted, onError);
            console.log(id);
            $scope.editForm = 1;
        };
        //end get person by Id

        //delete person
        $scope.deleteSales = function(id){
        	var deleteUser = confirm('Are you sure you want to delete this data?');
        	if(deleteUser){
        		$http.delete('/deleteSales/' + id)
                .then(onSalesDeleteCompleted,  onError);
            	console.log(id);
        	}
        };

        var onSalesDeleteCompleted = function(response){
            $scope.sales = response.data;
            console.log(response.data);
            refresh();
        };
        //end delete Department

        //update Department
        $scope.updateSales = function(sales){
        	var updateAlert = confirm('Are you sure to save');
        	if(updateAlert){
        		$http.put("/updateSales", department)
                .then(onUpdateSalesCompleted, onError);
                    console.log(department);
                $scope.editForm = 0;
                $scope.showAddForm = 0;
        	}
        };

        var onUpdateSalesCompleted = function(response){
            $scope.sales = null;//response.data;
            console.log(response.data);
            refresh();
        };
        //end update Department
	}
	myProductApp.controller('SalesCtrl', SalesCtrl);
}())