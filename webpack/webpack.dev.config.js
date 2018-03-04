var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');

var parentDir = path.join(__dirname, '../');

module.exports = {
    entry: [
        path.join(parentDir, 'index.js')
    ],
    resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
    devtool: 'inline-source-map',
      plugins: [
    new CleanWebpackPlugin(['client/dist']),
    new HtmlWebpackPlugin({
      template: path.join(parentDir, 'index.html'),
      inject: 'body',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin({
      //     multiStep: true,
    }),
  ],
    module: {
        rules: [
          {
             test: /\.less$/,
                loaders: ["style-loader", "css-loder", "less-loader"]
          },
          {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
              'style-loader',
              'css-loader',
            ],
          },
          {
            test: /\.(png|jpg|gif)$/,
            exclude: /node_modules/,
            use: [
              'file-loader',
            ],
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            exclude: /node_modules/,
            use: [
              'file-loader',
            ],
          },
          {
            test: /\.svg$/,
            loader: 'raw-loader',
          },
          {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: [/node_modules/, 'test'],
            query: {
              cacheDirectory: true,
              presets: ['react', 'es2015'],
              plugins: [[
                'transform-class-properties',
                {
                  spec: true
                }
              ]]
            },
          },
          },
        ],
    },
    output: {
        path: parentDir + '/dist',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: parentDir,
        historyApiFallback: true,
          hot: true,
    inline: true,
    }
}
