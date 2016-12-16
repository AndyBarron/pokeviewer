const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const APP_ROOT = __dirname;
const INCLUDE_PATHS = [path.resolve(APP_ROOT, 'src')];
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const IS_DEVELOPMENT = !IS_PRODUCTION;

const vueLoaders = {};

const config = {
  context: APP_ROOT,
  entry: ['babel-polyfill', './src/node_modules/main.js'],
  output: {
    path: path.resolve(APP_ROOT, 'dist'),
    publicPath: '/',
    sourceMapFilename: 'source-maps-[hash]/[file].map',
    filename: 'app.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: APP_ROOT,
      verbose: false,
    }),
    new CopyWebpackPlugin(
      [{ from: 'static' }],
      { ignore: ['.*'] }
    ),
    new FaviconsWebpackPlugin({
      logo: path.resolve(APP_ROOT, 'res/favicon.png'),
      inject: true,
      prefix: 'icons-[hash]/',
      emitStats: false,
      persistentCache: true,
      background: '#fff',
      title: 'PokéViewer',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: true,
        yandex: false,
        windows: true,
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new HtmlWebpackPlugin({
      inject: true,
      title: 'PokéViewer',
      hash: true,
      minify: {
        collapseWhitespace: IS_PRODUCTION,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: vueLoaders,
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: INCLUDE_PATHS,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          context: path.resolve(APP_ROOT, 'src/node_modules'),
          name: '[path][name].[ext]?[hash-5]',
        },
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
  },
  devtool: IS_DEVELOPMENT ? '#eval-source-map' : '#source-map',
};

if (IS_PRODUCTION) {
  const prodPlugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: () => false,
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new ExtractTextPlugin('app.css'),
  ];
  config.plugins = (config.plugins || []).concat(prodPlugins);
  vueLoaders.css = ExtractTextPlugin.extract({
    loader: 'css-loader',
    fallbackLoader: 'vue-style-loader', // included as dep of vue-loader
  });
} else {
  const devPlugins = [
    new webpack.LoaderOptionsPlugin({
      options: {
        // Fixes weird "path must be a string" error w/o CSS extraction
        context: APP_ROOT,
        eslint: {
          fix: true,
        },
      }
    }),
    new webpack.NamedModulesPlugin(),
  ];
  config.plugins = (config.plugins || []).concat(devPlugins);
  config.module.rules.unshift({
    test: /\.(vue|js)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: INCLUDE_PATHS,
  });
}

module.exports = config;
