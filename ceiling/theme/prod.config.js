const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// importLoader:1 from https://blog.madewithenvy.com/webpack-2-postcss-cssnext-fdcd2fd7d0bd
const extractSass = new ExtractTextPlugin('styles/[name].[contenthash].css');

module.exports = {
    // devtool: 'source-map', // No need for dev tool in production

    module: {
        rules: [{
            test: /\.css$/,
            use: extractSass.extract({
                use: [{
                    loader: 'css-loader',
                    options: { importLoaders: 1, sourceMap: 'inline' },
                },
                'postcss-loader']
            })
        }, {
            test: /\.(scss|sass)$/,
            use: extractSass.extract({
                use: [{
                        loader: 'css-loader',
                        options: { importLoaders: 1 },
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader'
                }],
                fallback: "style-loader"
            }) // end use
        }],
    },

    plugins: [
        extractSass,
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};