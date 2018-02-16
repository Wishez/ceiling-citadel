const ExtractTextPlugin = require('extract-text-webpack-plugin');

// importLoader:1 from https://blog.madewithenvy.com/webpack-2-postcss-cssnext-fdcd2fd7d0bd

const extractSass = new ExtractTextPlugin('styles/[name].css');

module.exports = {
    watch: true,
    devtool: 'source-map', // 'cheap-module-eval-source-map'
    module: {
        rules: [{
            test: /\.css$/,
            use: extractSass.extract({
                use: [
                    {
                        loader: 'css-loader',
                        options: { 
                            importLoaders: 1,
                            sourceMap: true
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: { 
                            sourceMap: true
                        },  
                    }
                ]
            }) // end extract
        }, {
            test: /\.(scss|sass)$/,
            use: extractSass.extract({
                use: [{
                        loader: 'css-loader',
                        options: { 
                            importLoaders: 1,
                            sourceMap: true
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: { 
                            sourceMap: true,
                            // ident: 'postcss',
                            // plugins: [
                            //     require('postcss-import')(),
                            //     require('stylelint')()
                            // ]   
                        },  
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                }],
                fallback: "style-loader"
            }) // end use 
        }],
    },
    plugins: [
        extractSass
    ]
};