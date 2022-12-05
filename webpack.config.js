const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './build/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[chunkhash].bundle.js',
  },
  mode: 'development',
  plugins: [new HtmlWebpackPlugin({ template: './build/index.html' })],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset/resource',
      },
    ],
  },
};
