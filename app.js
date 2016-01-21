;(function(window) {
	angular.module("app", [])
		.directive('tab', function() {
			return {
				restrict: 'E', 
				transclude: true,
				template: '<div role="tabpanel" ng-show="active" ng-transclude></div>',
				require: '^tabset',
				scope: {
					heading: '@'
				},
				link: function(scope, elem, attr, tabsetCtrl) {
					scope.active = false;
					tabsetCtrl.addTab(scope);
				}
			}
		})
		.directive('tabset', function() {
			return {
				restrict: 'E',
				transclude: true,
				scope: {},
				templateUrl: "tabset.html",
				bindToController: true,
				controllerAs: 'tabset',
				controller: function() {
					var vm = this;
					vm.tabs = [];
					vm.addTab = function addTab(tab) {
						vm.tabs.push(tab);

						if(vm.tabs.length === 1) {
							tab.active = "true"
						}
					}
					vm.select = function(selectedTab) {
						angular.forEach(vm.tabs, function(tab) {
							if(tab.active && tab!==selectedTab){
								tab.active = false;
							}
						})
						selectedTab.active=true;
					}
				}
			}
		})
})(window);