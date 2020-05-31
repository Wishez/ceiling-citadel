const path = require("path");
const webpack = require("webpack");
const cssNano = require('cssnano')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");

// importLoader:1 from https://blog.madewithenvy.com/webpack-2-postcss-cssnext-fdcd2fd7d0bd
const extractSass = new ExtractTextPlugin("styles/app.[hash].css");
const extractFonts = new ExtractTextPlugin("styles/fonts.[hash].css");

const postCssLoaderConfig = {
  loader: "postcss-loader",
  options: {
    ident: 'postscss',
    parser: 'postcss-safe-parser',
    syntax: 'postcss-scss',
    plugins: [
      cssNano({
        preset: ['advanced', {
          discardUnused: false,
          discardComments: {
            removeAll: true,
          },
          mergeIdents: false,
          reduceIdents: false,
          zindex: false,
        }],
      }),
    ],
  },
}
module.exports = {
  mode: 'production',
  cache: false,
  bail: true,
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // Must be set to true if using source-maps in production
        terserOptions: { // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
          output: {
            comments: false,
          },
        },
      }),
    ],
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /index\.css$/,
        exclude: [path.resolve(__dirname, "images")],
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader",
              options: { importLoaders: 1, sourceMap: "inline" }
            },
            postCssLoaderConfig,
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
              options: { importLoaders: 1, sourceMap: true }
            },
            postCssLoaderConfig,
            "sass-loader"
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
                sourceMap: false
              }
            },
            postCssLoaderConfig,
            {
              loader: "sass-loader",
              options: {
                sourceMap: false
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
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/index.html"),
      chunksSortMode: 'none',
      filename: "../pages/templates/index.html",
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
      excludeAssets: [/test.*.js/, /fonts.*.js/]
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]
};
