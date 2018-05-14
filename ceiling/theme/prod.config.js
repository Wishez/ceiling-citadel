const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");

// importLoader:1 from https://blog.madewithenvy.com/webpack-2-postcss-cssnext-fdcd2fd7d0bd
const extractSass = new ExtractTextPlugin("styles/app.[contenthash].css");
const extractFonts = new ExtractTextPlugin("styles/fonts.[contenthash].css");

module.exports = {
  // devtool: 'source-map', // No need for dev tool in production

  module: {
    rules: [
      {
        test: /index\.css$/,
        exclude: [path.resolve(__dirname, "images")],
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader",
              options: { importLoaders: 1, sourceMap: "inline", minimize: true }
            },
            "postcss-loader"
          ]
        })
      },
      {
        test: /index\.(scss|sass)$/,
        exclude: [path.resolve(__dirname, "images")],
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader",
              options: { importLoaders: 1, minimize: true, sourceMap: true }
            },
            "postcss-loader",
            {
              loader: "sass-loader"
            }
          ],
          fallback: "style-loader"
        }) // end use
      },
      {
        test: /fonts\.(scss|sass)$/,
        use: extractFonts.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                sourceMap: true,
                minimize: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
                ident: "postcss",
                plugins: [
                  // require('postcss-import')(),
                  // require('cc')
                ]
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ],
          fallback: "style-loader"
        }) // end use
      }
    ]
  },

  plugins: [
    extractFonts,
    extractSass,
    // new OptimizeCSSPlugin({
    //   cssProcessorOptions: {
    //     safe: true
    //   }
    // }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    })
  ]
};
