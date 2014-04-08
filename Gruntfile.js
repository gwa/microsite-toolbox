module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// tasks
		jscs: grunt.file.readJSON('./grunt/tasks/jscs.json'),
		jshint: grunt.file.readJSON('./grunt/tasks/jshint.json'),
		jasmine: grunt.file.readJSON('./grunt/tasks/jasmine.json')
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jscs-checker');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask(
		'default',
		[
			'jscs',
			'jshint:src',
			'jasmine'
		]
	);

};
