// vue.config.js

const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    // options...
    publicPath: './',
    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin([
                {
                    from: "./public/products.json",
                    to: "products.json"
                }])
        ]
    },
    chainWebpack: (config) => {
        const svgRule = config.module.rule('svg');

        svgRule.uses.clear();

        svgRule
            .use('vue-svg-loader')
            .loader('vue-svg-loader');
    }
}
