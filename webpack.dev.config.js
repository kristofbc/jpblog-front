// This config is extented from webpack.config.js. We use it for development with webpack-dev-server and autoreload/refresh

var webpack = require('webpack');
var { Config } = require('webpack-config');
var path = require("path");

var mainConfig = new Config().extend("webpack.config");
mainConfig.module.rules = [];

var devConfigExtension = {
  entry: {
      app: [
        // We are using next two entries for hot-reload
        'webpack-dev-server/client?http://localhost:3333',
        'webpack/hot/only-dev-server',
      ]
  },

  output: {
    filename: '[name].js',
    publicPath: "http://localhost:3333/"
  },

  // more options here: http://webpack.github.io/docs/configuration.html#devtool
  devtool: 'eval-source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: { emitErrors: true },
        include: path.join(__dirname, "App")
      },
      {
        test: /\.tsx?$/,
        loaders: ["react-hot-loader", "babel-loader?cacheDirectory", "awesome-typescript-loader?tsconfig=tsconfig.webpack.json&useCache=true"]
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        loaders: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.module\.less$/,
        loaders: ["style-loader", "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]", "less-loader"]
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
            { search: '${ENV_API_URL}', replace: process.env.ENV_API_URL || 'http://api.jpblog.dev' },
            { search: '${ENV_API_VERSION}', replace: process.env.ENV_API_VERSION || 'v1' }
          ]
        }
      }
    ]
  },

   plugins: [
    // Used for hot-reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      DEBUG: true
    })
  ]
};

module.exports = mainConfig.merge(devConfigExtension);