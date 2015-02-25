(function () {
  'use strict';

  angular
    .module('app.pictures')
    .controller('Pictures', Pictures);

  Pictures.$inject = ['detectionService', 'dataService'];

  function Pictures(detectionService, dataService) {

    var vm = this;
    vm.pictures = [];
    vm.changePage = changePage;
    vm.loadingMorePictures = false;

    // Initialise paging details
    vm.currentPage = 0;
    vm.perPage = 0;
    vm.totalPages = 0;
    vm.lastIndex = 0;
    vm.morePicturesToLoad = false;

    activate();

    function activate() {
      setPerPage();
      return changePage(1).then(function () {
        console.info('Activated Pictures View');
      });
    }

    function changePage(newPage) {
      if (vm.loadingMorePictures) return;
      vm.loadingMorePictures = true;

      return dataService.getPictures(newPage, vm.perPage).then(function (data) {
        setPagingDetails(data.meta.paging);
        addPictures(data.pictures);
        vm.loadingMorePictures = false;

        return vm.pictures;
      })
    }

    function setPerPage() {
      if (detectionService.isMobile()) {
        vm.perPage = 10;
      }
      else vm.perPage = 50;
    }

    function addPictures(pictures) {
      for (var i = 0; i < pictures.length; i++) {
        vm.lastIndex += 1;
        pictures[i].index = vm.lastIndex;
        vm.pictures.push(pictures[i]);
      }
    }

    function setPagingDetails(paging) {
      vm.currentPage = paging.currentPage;
      vm.totalPages = paging.totalPages;
      vm.morePicturesToLoad = vm.currentPage < vm.totalPages;
    }
  }
})();
