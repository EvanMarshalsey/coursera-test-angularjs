(function () {
'use strict'

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {

	// Text and input box colour code
	//$scope.alertColour = "red";
	// $scope.customStyle = {};
	// $scope.turnGreen = function () {
	//     $scope.customStyle.textColorClass = "textGreen";
	//     $scope.customStyle.borderColorClass = "borderGreen";
	// }

	// $scope.turnRed = function() {
	//     $scope.customStyle.textColorClass = "textRed";
	//     $scope.customStyle.borderColorClass = "borderRed";
	// }
	// // end of text and input box colour code

	$scope.inputString = "list comma separated dishes you usually have for lunch";
	$scope.message = "";

	$scope.clearInput = function () {
		if ($scope.inputString == "list comma separated dishes you usually have for lunch")
			$scope.inputString = "";
	};

	$scope.enterKeyPressed = function(keyEvent) {
  		if (keyEvent.which === 13)
    		$scope.checkIfTooManyDishes();	
	};

	$scope.checkIfTooManyDishes = function () {

		if ($scope.inputString == "list comma separated dishes you usually have for lunch")
			$scope.inputString = "";

		console.log("Input String:" + $scope.inputString);

		var inputStringWhitespaceRemoved = "";	

		// Remove whitespace from inputString
		angular.forEach($scope.inputString, function (character, key) {
			if (/\s/.test(character)) 
    			 return;
				
			inputStringWhitespaceRemoved += character;
		});

		console.log("Input String (whitespace removed):" + inputStringWhitespaceRemoved);

		var inputStringArray = inputStringWhitespaceRemoved.split(',');

		console.log("Number of Inputs: " + inputStringArray.length);

		var numberOfDishes = 0;
		inputStringArray.forEach(dish => { 
			if (dish.length > 0) {
				numberOfDishes++;
			}
		});

		console.log("Number of Valid Dishes (Not whitespace and length > 0): " + numberOfDishes);

		if (numberOfDishes == 0) {		
			$scope.alertColour = "red";		
			$scope.message = "Please enter data first";
		}
		else if (numberOfDishes <= 3) {		
			$scope.alertColour = "green";		
			$scope.message = "Enjoy!";
		}
		else {
			$scope.alertColour = "green";
			$scope.message = "Too Much!";
		}
	};
}


})();