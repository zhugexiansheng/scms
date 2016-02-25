/**
 * webpack-dev-config
 * @description 开发环境下webpack打包配置
 * @author xiaoming
 * @date 2016/01/29
 */

var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'public');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

var config = {
  //Entry points to the project
  entry: {"app":[     
      path.join(__dirname, '/public/src/app/app.jsx')
    ],
    "lib":['webpack/hot/dev-server','webpack-hot-middleware/client',"reqwest/src/reqwest","react-router",'amazeui-react/dist/amazeui.react']
  },
  //Config options on how to interpret requires imports
  resolve: {
    extensions: ["", ".js", ".jsx"]
    //node_modules: ["web_modules", "node_modules"]  (Default Settings)
  },
  output: {
    path: buildPath,    //Path of output file
    filename: '[name].js',
  },
  devServer: {
      stats: {
          cached: false,
          colors: true
      }
  },
  plugins: [
    //Enables Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),
    //Allows error warnings but does not stop compiling. Will remove when eslint is added
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      "React":"react"
    })
  ],
  module: {
    //Loaders to interpret non-vanilla javascript code as well as most other extensions including images and text.
    preLoaders: [
      {
        //Eslint loader
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, "public/src/app")],
        exclude: [nodeModulesPath]
      },
    ],
    loaders: [
      {
        //React-hot loader and
        test: /\.(js|jsx)$/,  //All .js and .jsx files
        loaders: ['react-hot', 'babel'], //react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath]
      }
    ]
  },
  //eslint config options. Part of the eslint-loader package
  eslint: {
    configFile: '.eslintrc'
  },
};

module.exports = config;
