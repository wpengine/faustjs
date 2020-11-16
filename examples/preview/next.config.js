const withTM = require('next-transpile-modules')(['@wpengine/headless']);
const path = require('path');

module.exports = withTM({
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: {
                test: /\.(js|ts)x?$/,
            },
            use: ['@svgr/webpack'],
        });

        return config;
    },
});
