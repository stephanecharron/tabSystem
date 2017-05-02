// Karma configuration
// Generated on Sun Apr 30 2017 23:23:48 GMT-0400 (EDT)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        preprocessors: {
            '**/*.html': ['ng-html2js']
        },


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'bower_components/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/jquery/dist/jquery.min.js',
            'tabs/*.html',
            'tabs/tabSystem.module.js',
            'tabs/tab.directive.js',
            'tabs/tabs.directive.js',
            'tabs/test/mainTestDirective.js',
            'tabs/test/*.spec.js'
        ],

        ngHtml2JsPreprocessor: {
            // strip this from the file path
            //stripPrefix: 'public/',
            //stripSuffix: '.ext',
            // prepend this to the
            //prependPrefix: 'served/',

            // or define a custom transform function
            // - cacheId returned is used to load template
            //   module(cacheId) will return template at filepath
            cacheIdFromPath: function(filepath) {
                console.log(filepath);
                // example strips 'public/' from anywhere in the path
                // module(app/templates/template.html) => app/public/templates/template.html
                var cacheId = filepath;
                return cacheId;
            },

            // - setting this option will create only a single module that contains templates
            //   from all the files, so you can load them all with module('foo')
            // - you may provide a function(htmlPath, originalPath) instead of a string
            //   if you'd like to generate modules dynamically
            //   htmlPath is a originalPath stripped and/or prepended
            //   with all provided suffixes and prefixes
            moduleName: 'foo'
        },


        // list of files to exclude
        exclude: [],


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        //browsers: ['Chrome', 'PhantomJS'],
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
};
