/**
 * Displays the application's options pages
 *
 * @ngdoc directive
 * @restrict E
 */
angular.module('tc').directive('settingsPanel', function(settings, updateChecker) {
	function link(scope, element) {
		element.attr('layout', 'row');
		scope.settings = settings;
		scope.m = {
			// TODO fix for 0.13.x
			//version: nw.App.manifest.version,
			version: nw.require('./package.json').version,
			selected: 'highlights'
		};

		updateChecker.check();

		scope.zoomLabel = function() {
			if (settings.appearance.zoom === 100) return 'Normal';
			return settings.appearance.zoom + '%';
		}
	}

	return {
		restrict: 'E',
		templateUrl: 'ng/settings-panel/settings-panel.html',
		link: link
	}
});