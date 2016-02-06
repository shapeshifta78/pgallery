module.exports = {
    unit: {
        configFile: 'karma.conf.js',
        background: true,
        singleRun: false,
        browsers: ['PhantomJS', 'Firefox']
    },
    //continuous integration mode: run tests once in PhantomJS browser.
    travis: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
    }
};