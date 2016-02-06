module.exports = function (grunt) {
    var path = require('path'),
        _ = grunt.util._;

    // Loads task options from `tasks/options/`
    var config = _.extend({

            // Import package manifest
            pkg: grunt.file.readJSON('package.json')

        },
        require('load-grunt-config')(grunt, {
            configPath: path.join(__dirname, 'tasks/options'),
            loadGruntTasks: false,
            init: false
        })
    );

    // loads tasks in `tasks/` folder
    grunt.loadTasks('tasks');

    // load grunt tasks
    require('load-grunt-tasks')(grunt);

    // init config
    grunt.initConfig(config);

    grunt.registerTask('travis', ['jshint', 'karma:travis']);
    grunt.registerTask('build', ['concat', 'uglify', 'sass']);
    grunt.registerTask('default', ['jshint', 'build', 'karma:unit:run']);
};
