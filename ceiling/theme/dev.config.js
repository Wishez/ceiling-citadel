const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// importLoader:1 from https://blog.madewithenvy.com/webpack-2-postcss-cssnext-fdcd2fd7d0bd
const extractSass = new ExtractTextPlugin("styles/app.css");
const extractFonts = new ExtractTextPlugin("styles/fonts.css");

module.exports = {
  watch: true,
  devtool: "source-map", // 'cheap-module-eval-source-map'
  module: {
    rules: [
      {
        test: /index\.css$/,
        exclude: [
          path.resolve(__dirname, "images")
          // path.resolve(__dirname, 'fonts.sass'),
        ],
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        }) // end extract
      },
      {
        test: /index\.(scss|sass)$/,
        exclude: [
          path.resolve(__dirname, "images")
          // path.resolve(__dirname, 'fonts.sass'),
        ],
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
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
      },
      {
        test: /fonts\.(scss|sass)$/,
        use: extractFonts.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
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
  plugins: [extractSass, extractFonts]
};
