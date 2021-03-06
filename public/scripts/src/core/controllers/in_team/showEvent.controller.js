(function () {
    'use strict';

    angular
      .module('fct.core')
      .controller('ShowEventController', ShowEventController);

    ShowEventController.$inject = ['eventService'];

    function ShowEventController(eventService) {
        var vm = this;

        angular.extend(vm, {
            getEvents: getEvents,
        });

        activate();

        function activate() {
          getEvents();
        }

        function getEvents() {
            return eventService.getEvent()
              .then(getEventSuccess)
              .catch(getEventFailure);
        }

        function getEventSuccess(response) {
          console.log(response);
          vm.dummyEvents = response.data;
        }

        function getEventFailure(error) {
          console.log(error);
        }
    }
})();
