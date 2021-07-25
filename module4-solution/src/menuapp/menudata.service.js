(function(){
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
  var service = this;

  var items = [];

  service.getAllCategories() = function () {
    console.log("getAllCategories");
    return $http({
    	method: "GET",
    	url: (ApiBasePath + "/categories.json")
    });
  };


  service.getItemsForCategory(categoryShortName) = function () {
    return $http({
    	method: "GET",
    	url: (ApiBasePath + "/menu_items.json?category={categoryShortName}")
    });
  };

};

})();