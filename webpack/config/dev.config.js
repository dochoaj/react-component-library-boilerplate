const path = require('path');
const Config = require('webpack-config').default;

module.exports = new Config().merge({
  devtool: 'source-map',
  entry: {
    path: path.resolve(process.cwd(), 'src', 'index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'donut.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
});
