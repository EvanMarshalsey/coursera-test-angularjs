(function () {
'use strict';

angular.module('Data')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['$stateParams', 'items'];
function ItemsController($stateParams, items) {
  var itemDetail = this;
  var item = items[$stateParams.itemId];
  itemDetail.id = item.id;
  itemDetail.shortName = item.short_name;
  itemDetail.name = item.name;
}

})();
