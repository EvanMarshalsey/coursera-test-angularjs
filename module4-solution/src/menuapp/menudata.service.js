(function(){
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
  var service = this;

  var items = [];

  service.getAllCategories = function () {
    return $http({
    	method: "GET",
    	url: (ApiBasePath + "/categories.json")
    }).then(function (response) {
            var categories = [];
            var data = response.data;
            for(var i = 0; i < data.length; ++i) {
                categories.push(data[i]); 
        }

            return categories;
            
         }).catch(function (error) {
            console.log("Something went wrong");
            });
    };


  service.getItemsForCategory = function (categoryShortName) {
    console.log("getItemsForCategory");    
    return $http({
    	method: "GET",
    	url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)
    }).then(function (response) {
        console.log(response);    
            var items = [];
            var data = response.data.menu_items;
            for(var i = 0; i < data.length; ++i) {
             
                items.push(data[i]);
              
            }
            console.log("Items:" + items[0].name);
            return items;
            
        }).catch(function (error) {
            console.log("Something went wrong");
            });

    };

}

})();