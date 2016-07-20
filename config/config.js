'use strict';

var _ = require('lodash');

var initGlobalConfig = function () {
    var config =
    {
        server: {},
        client: {}
    };

    var defaultConfig = require('./env/default'),
        envConfig = require('./env/' + (process.env.NODE_ENV || 'development'));
    config = _.extend(defaultConfig, envConfig);

    return config;
};

module.exports = initGlobalConfig();