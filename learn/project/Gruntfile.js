module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                banner: '/*! By da宗熊 <%= grunt.template.today("yyyy-mm-dd") %> */\n;(function(window){\n',
                footer: '\n})(window);'
            },
            build: {
                src: 'mods/*.js',
                dest: 'dist/project.js',
            }
        }
    });

    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['concat']);

};
