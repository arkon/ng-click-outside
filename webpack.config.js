const path = require('path');
const webpack = require('webpack');

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ENV = process.env.npm_lifecycle_event;
const isProd = ENV === 'production';

module.exports = function makeWebpackConfig() {
  var config = {};

  config.devtool = isProd ? 'source-map':  'eval-source-map';

  config.debug = !isProd;

  config.entry = {
    'polyfills': [root('demo/polyfills.ts')],
    'app': [root('demo/bootstrap.ts')]
  };

  if (!isProd) {
    config.entry.app = [
      'webpack-hot-middleware/client?reload=true',
      ...config.entry.app
    ];
  }

  config.output = {
    path: root('dist'),
    publicPath: '/',
    filename: isProd ? 'js/[name].[hash].js' : 'js/[name].js',
    chunkFilename: isProd ? '[id].[hash].chunk.js' : '[id].chunk.js'
  };

  config.resolve = {
    cache: true,
    root: root(),
    extensions: ['', '.ts', '.tsx', '.js', '.json', '.css', '.scss', '.html'],
    alias: {
      'app': 'demo/app'
    }
  };

  config.module = {
    loaders: [
      // TypeScript files
      {
        test: /\.tsx?$/,
        loader: 'ts',
        exclude: [/node_modules\/(?!(ng2-.+))/]
      },

      // copy those assets to output
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=fonts/[name].[hash].[ext]?'
      },

      // Support for *.json files.
      {
        test: /\.json$/,
        loader: 'json'
      },

      // Support for CSS as raw text
      // all css in demo/style will be bundled in an external css file
      {
        test: /\.css$/,
        exclude: root('demo', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
      },
      // all css required in demo/app files will be merged in js files
      {
        test: /\.css$/,
        include: root('demo', 'app'),
        loader: 'raw!postcss'
      },

      // support for .scss files
      // all css in demo/style will be bundled in an external css file
      {
        test: /\.scss$/,
        exclude: root('demo', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass')
      },
      // all css required in demo/app files will be merged in js files
      {
        test: /\.scss$/,
        exclude: root('demo', 'style'),
        loader: 'raw!postcss!sass'
      },

      // support for .html as raw text
      // todo: change the loader to something that adds a hash to images
      {
        test: /\.html$/,
        loader: 'raw'
      }
    ],
    postLoaders: [],
    noParse: [/.+zone\.js\/dist\/.+/]
  };

  config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    new CommonsChunkPlugin({
      name: ['polyfills']
    }),

    new HtmlWebpackPlugin({
      template: root('demo/public/index.html'),
      inject: 'body',
      chunksSortMode: packageSort(['polyfills', 'app'])
    }),

    new ExtractTextPlugin('css/[name].[hash].css', {disable: !isProd})
  ];

  // Add build specific plugins
  if (isProd) {
    config.plugins.push(
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        // Angular 2 is broken again, disabling mangle until beta 6 that should fix the thing
        // Todo: remove this with beta 6
        mangle: false,

        compressor: {
          warnings: false,
          screw_ie8: true
        }
      }),
      new CopyWebpackPlugin([{
        from: root('demo/public')
      }])
    );
  }

  config.postcss = [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ];

  config.sassLoader = {
    //includePaths: [path.resolve(__dirname, "node_modules/foundation-sites/scss")]
  };

  config.devServer = {
    contentBase: './demo/public',
    historyApiFallback: true,
    stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
  };

  return config;
}();

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(...args));
}

function rootNode(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return root.apply(path, ['node_modules'].concat(args));
}

function packageSort(packages) {
  // packages = ['polyfills', 'app']
  const len = packages.length - 1;
  const first = packages[0];
  const last = packages[len];
  return function sort(a, b) {
    // polyfills always first
    if (a.names[0] === first) {
      return -1;
    }
    // main always last
    if (a.names[0] === last) {
      return 1;
    }
  }
}
