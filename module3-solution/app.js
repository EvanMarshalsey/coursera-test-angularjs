(function(){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      myTitle: '@title',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
};

function FoundItemsDirectiveController() {
  var list = this;

  list.foundItemsInList = function () {
    for (var i = 0; i < list.items.length; i++) {
      var name = list.items[i].name;
      if (name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }

    return false;
  };
};

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;  

  list.items = MenuSearchService.getItems();
  list.searchTerm = "";
  list.title = "";
  list.lastRemoved = "";

  list.removeItem = function (itemIndex) {
    console.log("'this' is: ", this);
    this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
    MenuSearchService.removeItem(itemIndex);
    this.title = "Found:  (" + list.items.length + " items)";
  };

  list.narrowItDown = function () {
  	list.items = "";
  	if (list.searchTerm == "")
  	{
  		list.title = "Nothing found";
  		return;
  	}
  	list.lastRemoved = "";
  	list.title = "";

  	console.log(list.searchTerm);
  	var promise = MenuSearchService.addMatchedMenuItems(list.searchTerm);

    promise.then(function (response) {
    	list.items = response;
    	if (list.items.length > 0) {
			list.title = "Found (" + list.items.length + " items)";
		}
		else {
			list.title = "Nothing found";
		}
	})
	.catch(function (error) {
	    console.log("Something went terribly wrong.");
	    list.title = "Nothing found";
	});

	
	// else {
	// 	this.title = " (0 items)";
	// }
  };
};

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  // service.getMenuCategories = function () {
  //   var response = $http({
  //     method: "GET",
  //     url: (ApiBasePath + "/categories.json")
  //   });

  //   return response;
  // };

  var items = {};

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };

  service.addMatchedMenuItems = function(searchTerm) {
  	return $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
    }).then(function (result) {

    var foundItems = result.data.menu_items;
    var filteredItems = [];

    var count = 0;
    angular.forEach(foundItems, function(value, key) {
    	count++;
    	if (value.description.toLowerCase().includes(searchTerm) == true) {    		
    		filteredItems.push(value);
    	}
    });

   	angular.forEach(filteredItems, function(value, key) {
       		console.log(key + ': ' + value.name + ', ' + value.short_name +', ' + value.description);
    });


    // return processed items
    items = filteredItems;
    return items;
	})
	.catch(function (error) {
    console.log("Something went terribly wrong.");
  	});
  };


};

})();