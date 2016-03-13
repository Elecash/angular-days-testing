// Reference: https://github.com/angular/protractor/blob/master/docs/referenceConf.js
exports.config = {
    framework: 'jasmine2',
    specs: ['../e2e/**/*.e2e.js'],
    multiCapabilities: [
        {
            'browserName': 'chrome',
            'chromeOptions': {
                // Get rid of --ignore-certificate yellow warning
                // args: ['--no-sandbox', '--test-type=browser'],

                // Set download path and avoid prompting for download even though
                // this is already the default on Chrome but for completeness
                prefs: {
                    'download': {
                        'prompt_for_download': false,
                        'default_directory': '/e2e/downloads/'
                    }
                }
            }
        }
    ],
    jasmineNodeOpts: {
        // If true, print colors to the terminal.
        showColors: true,

        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 30000,

        // Function called to print jasmine results.
        // print: function() {},

        // If set, only execute specs whose names match the pattern, which is
        // internally compiled to a RegExp.
        // grep: 'pattern',

        // Inverts 'grep' matches
        invertGrep: false
    },
    onPrepare: require('../e2e/custom-locators.e2e')
};
