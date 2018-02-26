const webpack = require('webpack');
const path = require('path');
const Config = require('webpack-config').default;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
];

module.exports = new Config().merge({
  entry: path.resolve(process.cwd(), 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: 'donut.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap&-autoprefixer',
        }),
      },
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: plugins,
});
