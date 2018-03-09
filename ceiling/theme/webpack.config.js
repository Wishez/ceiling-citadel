var path = require("path")
var webpack = require('webpack')
const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleTracker = require('webpack-bundle-tracker')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin  = require('write-file-webpack-plugin');
let env = process.env.NODE_ENV;

const TARGET = process.env.npm_lifecycle_event;
const isProduction = TARGET === 'prod';
const withHash = isProduction ? '-[hash]' : "";

const indexHtml = path.join(__dirname, "src", "index.html");
const PATHS = {
    build: path.join(__dirname, '../static'),
    app: path.join(__dirname, 'src/index.js'),
};
const VENDOR = [
    'babel-polyfill',
    'whatwg-fetch',
    'react',
    'prop-types',
    'react-dom',
    'react-router-dom',
    'redux',
    'react-redux',
    'redux-thunk',
];


const basePath = path.resolve(__dirname, 'src');

const common = {
  context: basePath,

  entry: {
    app: './index.js',
    vendor: VENDOR,
    // hotUpdateChunkFilename: 'hot/hot-update.js',
    // hotUpdateMainFilename: 'hot/hot-update.json'
  },
  // 'react-hot-loader/patch', 

  output: {
      path: PATHS.build,
      filename: `[name]${withHash}.js`,
      publicPath: '/static', // Tell django to use this URL to load packages and not use STATIC_URL + bundle_name
  },

  devtool: isProduction ?
      '#source-map' :
      '#cheap-module-eval-source-map',
  devServer: {
      contentBase: './static',
      hot: true
  },

  plugins: [
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, 'src/sw.js'),
      excludes: ['**/*.map', '*.html', '*.json'],
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: `[name]${withHash}.js`,
        minChunks: Infinity
    }),

    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: true,
      minChunks: 2
    }),
    new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            hash: true,
            chunks: ['vendor', 'app'],
            chunksSortMode: 'manual',
            filename: 'index.html',
            inject: 'body'
    }),
    new webpack.DefinePlugin({
        'process.env': { NODE_ENV: TARGET === 'dev' ? '"development"' : '"production"' },
        '__DEVELOPMENT__': TARGET === 'dev'
    }),
    new BundleTracker({filename: './webpack-stats.json'}),
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          formatter: require('eslint-formatter-pretty')
        }
      }
    }),

    new webpack.NoEmitOnErrorsPlugin(),

    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      analyzerPort: 4000,
      openAnalyzer: false,
    }),
    new CleanWebpackPlugin(PATHS.build, {
        root: process.cwd(),
        watch: true,
        verbose:  true,
        dry:      false
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new WriteFilePlugin({
          test: /^(?!.*(hot)).*/,
    }),
    new ImageminPlugin({
      disable: !isProduction, // Disable during development
      pngquant: {
        quality: '95-100',
        optimizationLevel: 9
      }
    }),

    // new CopyWebpackPlugin([
    //     'images/'
    // ],
    //{})
  ],

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
        loader: 'eslint-loader',
        options: {
          fix: true,
          cache: true,
          ignorePattern: __dirname + '/src/js/lib/'
        }
      },
      { 
        test: /\.js?$/, 
        exclude: path.resolve(__dirname, 'node_modules'),
        use: {
            loader: 'babel-loader',
            options: {
              plugins: [
                  "transform-class-properties",
                  "transform-decorators-legacy",
                  "transform-object-rest-spread",
                  "transform-react-jsx-source",
              ],
              presets: [
                [
                  "env", 
                  {
                    "loose": true
                  }
                ], 
                "react", 
                "stage-0"
              ]
            }
        }
      },

  
      {
          test: /\.woff(\?.*)?$/,
          loader: 'url-loader?name=/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
      },
      {
          test: /\.woff2(\?.*)?$/,
          loader: 'url-loader?name=/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff2'
      },
      {
          test: /\.ttf(\?.*)?$/,
          loader: 'url-loader?name=/fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream'
      },
      {
          test: /\.eot(\?.*)?$/,
          loader: 'file-loader?name=/fonts/[name].[ext]'
      },
      {
          test: /\.otf(\?.*)?$/,
          loader: 'file-loader?name=/fonts/[name].[ext]&mimetype=application/font-otf'
      },
      {
          test: /\.svg(\?.*)?$/,
          exclude: path.resolve(__dirname, 'src', 'images'),
          loader: 'url-loader?name=/fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml'
      },
      {
          test: /\.json(\?.*)?$/,
          loader: 'file-loader?name=/files/[name].[ext]'
      },
    
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        exclude: path.resolve(__dirname, 'src', 'fonts'),
        use: [
          'file-loader?name=/images/[name].[ext]',
      //     {
      //       loader: 'image-webpack-loader',
      //       options: {
      //         bypassOnDebug: isProduction,
      //         mozjpeg: {
      //           progressive: true,
      //           quality: 65
      //         },
      //         // optipng.enabled: false will disable optipng
      //         optipng: {
      //           enabled: isProduction,
      //         },
      //         pngquant: {
      //           quality: '65-90',
      //           speed: 4
      //         },
      //         gifsicle: {
      //           interlaced: false,
      //         },
      //         // the webp option will enable WEBP
      //         webp: {
      //           quality: 75
      //         }
      //       },

      //     },
        ],
      }
    ],
  },
  resolveLoader: {
    modules: [
      path.join(__dirname, 'node_modules')
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.scss', '.css'],
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
    alias: {
      TweenLite: path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
      TweenMax: path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
      TimelineLite: path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
      TimelineMax: path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
      ScrollMagic: path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
      'animation.gsap': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
      'debug.addIndicators': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'),
    },
  }
}


switch (TARGET) {
    case 'dev':
        process.env.NODE_ENV = 'development';
        module.exports = merge(require('./dev.config'), common);
        break;
    case 'watch':
        process.env.NODE_ENV = 'development';
        module.exports = merge(require('./dev.config'), common);
        break;
    case 'prod':
        process.env.NODE_ENV = 'production';
        module.exports = merge(require('./prod.config'), common);
        break;
    default:
        console.log('Target configuration not found. Valid targets: "dev" or "prod".');
}