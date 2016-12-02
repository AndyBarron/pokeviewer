const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

const INCLUDE_PATHS = [path.resolve(__dirname, 'src')];

const config = {
  entry: ['core-js/shim', './src/node_modules/main.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // vue-loader options go here
          loaders: {
            css: ExtractTextPlugin.extract({
              loader: 'css-loader',
              fallbackLoader: 'vue-style-loader', // included as dep of vue-loader
            }),
          },
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
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
  },
  devtool: '#eval-source-map',
};

if (process.env.NODE_ENV === 'production') {
  config.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  config.plugins = (config.plugins || []).concat([
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
    })
  ])
} else {
  config.plugins.push(new webpack.LoaderOptionsPlugin({
    options: {
      eslint: {
        fix: true,
      },
    }
  }));
  config.module.rules.unshift({
    test: /\.(vue|js)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: INCLUDE_PATHS,
  });
}

module.exports = config;
