module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: ["<%= pkg.dist %>*"]
        },
        concat: {
            options: {
                banner: '/*! By <%= pkg.author %> <%= grunt.template.today("yyyy-mm-dd") %> */\n;(function(window){\n',
                footer: '\n})(window);'
            },
            build: {
                src: ['mods/*.js', '!mods/main.js', 'mods/main.js'],
                dest: '<%= pkg.dist %><%= pkg.scriptName %>.js',
            }
        },
        uglify: {
            options: {
                banner: '/*! By <%= pkg.author %> <%= grunt.template.today("yyyy-mm-dd") %> */\n;'
            },
            build: {
                src: "<%= pkg.dist %><%= pkg.scriptName %>.js",
                dest: "<%= pkg.dist %><%= pkg.scriptName %>.min.js"
            }
        }
    });

    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['clean', 'concat', 'uglify']);

};
