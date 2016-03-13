module.exports = function (config) {
    config.set({
        // Base path, that will be used to resolve files and exclude
        basePath: '../../',

        // Testing framework
        frameworks: ['jasmine'],

        // Files to load by tests
        files: [
            'node_modules/angular/angular.min.js',
            'node_modules/angular-route/angular-route.min.js',
            'node_modules/angular-resource/angular-resource.min.js',
            'node_modules/angular-animate/angular-animate.min.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/angular-strap/dist/angular-strap.min.js',
            'node_modules/angular-strap/dist/angular-strap.tpl.min.js',

            'scripts/**/*.js',
            'scripts/**/*.html',

            'tests/unit/**/*.js'
        ],

        // Web server port
        port: 8080,

        // Possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // Colors default true
        colors: true,

        // Enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // Karma plugins loaded
        plugins: [
            'karma-jasmine',
            'karma-coverage',
            'karma-phantomjs-launcher',
            'karma-ng-html2js-preprocessor'
        ],

        // Coverage reporter generates the coverage
        reporters: ['dots', 'coverage'],

        // Source files that you wanna generate coverage for.
        // Do not include tests or libraries (these files will be instrumented by Istanbul)
        preprocessors: {
            'scripts/**/*.js': ['coverage'],
            'scripts/**/*.html': ['ng-html2js']
        },

        // Add templates to a module called 'app-templates'
        ngHtml2JsPreprocessor: {
            moduleName: 'templates'
        },

        coverageReporter: {
            reporters:[
                {type: 'html', subdir: '.', dir:'coverage/'}
            ]
        },

        // If true, it capture browsers, run tests and exit
        singleRun: false
    });
};
