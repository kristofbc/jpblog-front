var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

var nodeModulesPath = path.join(__dirname, 'node_modules');
var isProduction = process.env.NODE_ENV == "production";

var config = {
  entry: {
    vendors: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'redux-thunk',
      'redux-logger',
      'babel-polyfill',
       path.join(__dirname, 'babel', 'babelhelpers.js')
    ],
    app: [
      // fetch polyfill
      'whatwg-fetch',
      path.join(__dirname, 'App', 'Index.tsx')
    ]
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.less', '.css'],
    modules: ["node_modules", "resources"],
  },

  output: {
      path: path.join(__dirname, 'build'),
      filename: '[name]_[chunkhash].js',
      publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: { emitErrors: true }
      },
      {
        test: /\.tsx?$/,
        loaders: ["babel-loader?cacheDirectory", "awesome-typescript-loader?tsconfig=tsconfig.webpack.json&useCache=true"]
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader?minimize"]
      },
      {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        loaders: ["style-loader", "css-loader?minimize", "less-loader?compress"]
      },
      {
        test: /\.module\.less$/,
        loaders: ["style-loader", "css-loader?minimize&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]", "less-loader?-compress"]
      },
      {
        test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: "file-loader?name=[name].[ext]"
      },
      {
        test: /\.ts$/,
        loader: 'string-replace-loader',
        query: {
          multiple: [
            { search: '${ENV_API_URL}', replace: process.env.ENV_API_URL || 'http://api.krstf.io' },
            { search: '${ENV_API_VERSION}', replace: process.env.ENV_API_VERSION || 'v1' }
          ]
        }
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'vendors_[hash].js' }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.DefinePlugin({
      DEBUG: true
    }),
    new CopyWebpackPlugin(
      [{
        from: '.htaccess',
        to: '.'
      }]
    )
  ]
};

if (isProduction) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
     compress: {
        warnings: false
    }
  }));
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {NODE_ENV: '"production"'},
    DEBUG: false
  }));
}

module.exports = config;
