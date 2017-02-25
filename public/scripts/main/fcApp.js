(function () {
	'use strict';

	angular
		.module('fct.api', []);
})();

(function () {
	'use strict';

	angular
		.module('fct_app', [
			'fct.api',
			'fct.core'
		]);
})();

(function () {
	'use strict';

	angular
		.module('fct.core', [
			'ngAnimate',
			'ngMessages',
			'ngMaterial',
			'ui.router',
			'underscore',
			'ngFileUpload',
			'validation.match',
			'ngMdIcons',
			'angularMoment'
		]);

	// angular
	// 	.module('fct.core')
	// 	.constant('TweenMax', TweenMax)
	// 	.constant('TimelineMax', TimelineMax);
	//
	// angular
	// 	.module('fct.core')
	// 	.run(initializeCore);
	//
	// initializeCore.$inject = ['$rootScope', '$interval'];
	//
	// function initializeCore($rootScope, $interval) {
	// 	active();
	//
	// 	function active() {
	// 		preloader();
	// 	}
	//
	// 	function preloader() {
	// 		$rootScope.$on('$viewContentLoading', startPreloader);
	// 		$rootScope.$on('$viewContentLoaded', stopPreloader);
	// 	}
	//
	// 	function startPreloader() {
	// 		$rootScope.pageTransition = true;
	// 	}
	//
	//
	// 	function stopPreloader() {
	// 		$interval(function () {
	// 			$rootScope.pageTransition = false;
	// 		}, 2000);
	// 	}
	// }
})();

(function () {
	'use strict';

	angular
		.module('fct.core')
		.config(configName);

	configName.$inject = ['$mdThemingProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider'];

	function configName($mdThemingProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
		var themePalette = {
			primary: "blue",
			accent: "amber",
			warn: "red"
		};

		activate();

		function activate() {
			setTheme();
			setRoutes();
			// addInterceptors();
		}

		function setTheme() {
			$mdThemingProvider.theme('default')
				.primaryPalette(themePalette.primary)
				.accentPalette(themePalette.accent)
				.warnPalette(themePalette.warn);
		}

		function setRoutes() {
			$locationProvider.html5Mode(true);
			$urlRouterProvider.when('/', '/login');
			$urlRouterProvider.otherwise('/login');
			$stateProvider
				.state('out', {
					templateUrl: '/templates/layouts/out.html'
				})
				.state('in_fc', {
					templateUrl: '/templates/layouts/in_fc.html'
				})
				.state('in_tc', {
					templateUrl: '/templates/layouts/in_tc.html'
				})
				.state('out.login', {
					url: '/login',
					templateUrl: '/templates/pages/out/login.html'
					// controller: 'LoginController',
					// controllerAs: 'lc'
				})
				.state('out.register', {
					url: '/register',
					templateUrl: '/templates/pages/out/register.html',
					controller: 'FacultyRegistrationController',
					controllerAs: 'frc'
				})
				.state('in_tc.verifyFaculty', {
					url: '/team/login',
					templateUrl: '/templates/pages/out/login.html'
				})
				.state('in_tc.verifyCoordinator', {
					url: '/verifyCoordinator',
					templateUrl: '/templates/pages/in/verifyCoordinator.html',
					controller: 'VerifyCoordinatorController'
				})
				.state('in_tc.addEvent', {
					url: '/team/addEvent',
					templateUrl: '/templates/pages/in/addEvent.html'
				});
		}
	}
})();


(function () {
	'use strict';

	angular
		.module('fct.api')
		.factory('authService', authService);

	authService.$inject = ['$http'];

	function authService($http) {
		var service = {
			facultyLogin: facultyLogin,
			facultyRegister: facultyRegister
		};

		return service;

		function facultyLogin(user) {
			return $http.post('/api/auth/faculty/login', user)
				.then(resolveFunc)
				.catch(rejectFunc);
		}

		function facultyRegister(user) {
			return $http.post('/api/auth/faculty/register', user)
				.then(resolveFunc)
				.catch(rejectFunc);
		}

		function resolveFunc(response) {
			return response;
		}

		function rejectFunc(error) {
			return error;
		}

		function saveToken(token) {
			$window.localStorage['auth-token'] = token;
		}

		function getToken() {
			return $window.localStorage['auth-token'];
		}

		function removeToken() {
			$window.localStorage.removeItem('auth-token');
		}

		function checkLoggedIn() {
			var token = getToken();
			var payload;
			if (token) {
				payload = token.split('.')[1];
				payload = $window.atob(payload);
				payload = JSON.parse(payload);
				$rootScope.user = {};
				$rootScope.user.email = payload.email;
				$rootScope.user.mobileno = payload.mobileno;
				$rootScope.user.name = payload.name;
				$rootScope.user.id = payload._id;
				return (payload.exp > Date.now() / 1000);
			} else {
				return false;
			}
		}
	}
})();

(function () {
	'use strict';

	angular
		.module('fct.core')
		.factory('fctToast', fctToast);

	fctToast.$inject = ['$mdToast'];

	function fctToast($mdToast) {
		var service = {
			showToast: showToast
		};

		return service;

		function showToast(data, success) {
			var toasterClass = 'md-toast-warn';

			if (success) {
				toasterClass = 'md-toast-success';
			}

			var toaster = $mdToast.simple()
				.textContent(data)
				.position('bottom right')
				.hideDelay(3000)
				.toastClass(toasterClass);
			$mdToast.show(toaster);
		}
	}
})();


(function () {
	'use strict';

	angular
		.module('fct.core')
		.controller('VerifyCoordinatorController', VerifyCoordinatorController);

    VerifyCoordinatorController.$inject = [ '$scope'];

    function VerifyCoordinatorController($scope){


  $scope.details=[{name:'ABC',mobileno:'1234567890',city:'Ahmedabad',collegename:'ldce',email:'abc@gmail.com',verified:'yes'},
  {name:'ABC',mobileno:'1234567890',city:'Ahmedabad',collegename:'ldce',email:'abc@gmail.com',verified:'no'},
  {name:'ABC',mobileno:'1234567890',city:'Ahmedabad',collegename:'ldce',email:'abc@gmail.com',verified:'no'}];
}
})();


(function () {
	'use strict';

	angular
		.module('fct.core')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['authService'];

	function LoginController(authService) {
		var vm = this;
		vm.user = {};

		angular.extend(vm, {
			login: login
		});

		activate();

		function activate() {

		}

		function login() {
			if (vm.user !== null) {
				return authService.login(vm.user);
			}
		}
	}
})();

(function () {
	'use strict';

	angular
		.module('fct.core')
		.controller('FacultyRegistrationController', FacultyRegistrationController);

	FacultyRegistrationController.$inject = ['authService', '$scope', 'asToast', '$rootScope', '$state'];

	function FacultyRegistrationController(authService, $scope, asToast, $rootScope, $state) {
		var vm = this;
		vm.user = {};
		vm.registerButtonClicked = false;

		angular.extend(vm, {
			register: register
		});

		activate();

		function activate() {

		}

		function register() {
			if (vm.registerButtonClicked) {
				event.preventDefault();
			} else {
				vm.registerButtonClicked = true;
			}
			var newUser = angular.copy(vm.user);
			authService.register(newUser);
		}

		$rootScope.$on('SuccessRegister', registerSuccess);
		$rootScope.$on('ErrorRegister', registerFailure);

		function registerSuccess(event) {
			asToast.showToast("Succefully Registered", true);
			vm.registerButtonClicked = false;
			resetForm();
			$state.go('inapp.orders');
		}

		function registerFailure(event, error) {
			var msg = error.data.errMsg.toString();
			vm.registerButtonClicked = false;
			asToast.showToast(msg);
			resetForm();
		}

		function resetForm() {
			vm.user = {};
			$scope.registerForm.$setPristine();
			$scope.registerForm.$setUntouched();
		}
	}
})();
