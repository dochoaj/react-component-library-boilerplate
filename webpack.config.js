var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'donut.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /(node_modules|bower_components)/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  }
}