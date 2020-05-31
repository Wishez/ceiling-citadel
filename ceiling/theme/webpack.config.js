var path = require("path");
var webpack = require("webpack");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const babelConfig = require('./config/babel')

const TARGET = process.env.npm_lifecycle_event;
const isProduction = TARGET === "prod";
const withHash = isProduction ? "-[hash]" : "";

const PATHS = {
  build: path.join(__dirname, "../theme_static"),
  app: path.join(__dirname, "src/index.js")
};

const basePath = path.resolve(__dirname, "src");

const common = {
  context: basePath,
  entry: {
    app: require.resolve('./src/index.js'),
    tests: require.resolve('./src/tests/index.js'),
    fonts: require.resolve('./src/fonts.js'),
  },
  output: {
    path: PATHS.build,
    filename: `[name]${withHash}.js`,
    publicPath: "/static" // Tell django to use this URL to load packages and not use STATIC_URL + bundle_name
  },

  devtool: isProduction ? "source-map" : "inline-cheap-source-map",
  plugins: [
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, "src/sw.js"),
      excludes: ["**/*.map", "*.html", "*.json"]
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: TARGET === "dev" ? '"development"' : '"production"'
      },
      __DEVELOPMENT__: TARGET === "dev"
    }),
    // new webpack.LoaderOptionsPlugin({
    //   options: {
    //     eslint: {
    //       formatter: require("eslint-formatter-pretty")
    //     }
    //   }
    // }),

    // new webpack.NoEmitOnErrorsPlugin(),

    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      analyzerPort: 4000,
      openAnalyzer: false
    }),
    new CleanWebpackPlugin({
      dry: false,
      verbose: true,
      dangerouslyAllowCleanPatternsOutsideProject: true,
    }),
    new ImageminPlugin({
      disable: !isProduction, // Disable during development
      pngquant: {
        quality: "95-100",
        optimizationLevel: 9
      }
    }),
  ],

  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "eslint-loader",
        options: {
          fix: false,
          cache: true,
          failOnError: true,
          failOnWarning: true,
          ignorePattern: __dirname + "/src/js/lib/"
        }
      },
      {
        test: /\.js?$/,
        exclude: path.resolve(__dirname, "node_modules"),
        use: {
          loader: "babel-loader",
          options: babelConfig,
        },
      },
      {
        test: /\.woff(\?.*)?$/,
        loader:
          "url-loader?name=/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.woff2(\?.*)?$/,
        loader:
          "url-loader?name=/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff2"
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader:
          "url-loader?name=/fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.eot(\?.*)?$/,
        loader: "file-loader?name=/fonts/[name].[ext]"
      },
      {
        test: /\.otf(\?.*)?$/,
        loader:
          "file-loader?name=/fonts/[name].[ext]&mimetype=application/font-otf"
      },
      {
        test: /\.svg(\?.*)?$/,
        exclude: path.resolve(__dirname, "src", "images"),
        loader:
          "url-loader?name=/fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml"
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        exclude: path.resolve(__dirname, "src", "fonts"),
        use: [
          "file-loader?name=/images/[name].[ext]"
        ]
      }
    ]
  },
  resolveLoader: {
    modules: [path.join(__dirname, "node_modules")]
  },
  resolve: {
    extensions: [".js", ".json", ".scss", ".css"],
    modules: [path.join(__dirname, "node_modules")],
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  }
};

switch (TARGET) {
  case "dev":
    process.env.NODE_ENV = "development";
    module.exports = merge(require("./dev.config"), common);
    break;
  case "watch":
    process.env.NODE_ENV = "development";
    module.exports = merge(require("./dev.config"), common);
    break;
  case "prod":
    process.env.NODE_ENV = "production";
    module.exports = merge(require("./prod.config"), common);
    break;
  default:
    console.log(
      'Target configuration not found. Valid targets: "dev" or "prod".'
    );
}
