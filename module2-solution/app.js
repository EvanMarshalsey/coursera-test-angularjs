(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyController = this;

  toBuyController.items = ShoppingListCheckOffService.getItemsToBuy();

  toBuyController.itemName = "";
  toBuyController.itemQuantity = "";

  toBuyController.addItem = function (itemIndex) {
    try {
      ShoppingListCheckOffService.addItem(itemIndex);
    } catch (error) {
      toBuyController.errorMessage = error.message;
    }
  };

  toBuyController.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };

  toBuyController.moveItem = function (itemIndex) {
    toBuyController.addItem(itemIndex);
    toBuyController.removeItem(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBoughtController = this;

  alreadyBoughtController.items = ShoppingListCheckOffService.getItemsAlreadyBought();
};

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var itemsToBuy = [
    {
      name: "Cookies",
      quantity: 10
    },
    {
      name: "Pain au chocolats",
      quantity: 5
    },
    {
      name: "Bags of sweets",
      quantity: 3
    },
    {
      name: "Sugary Drinks",
      quantity: 2
    },
    {
      name: "Burritos",
      quantity: 4
    }
  ];

  var itemsAlreadyBought = [];

  service.addItem = function (itemIndex) {
    console.log(itemsToBuy[itemIndex])
    itemsAlreadyBought.push(itemsToBuy[itemIndex]);
  };

  service.removeItem = function (itemIndex) {
    itemsToBuy.splice(itemIndex, 1);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.getItemsAlreadyBought = function () {
    return itemsAlreadyBought;
  };
};
})();
