const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');

const env = process.env.APP_DEBUG === 'true' ? 'development' : 'production';
const { ifDevelopment } = getIfUtils(env);

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path:path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
          ],
          plugins: removeEmpty([
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-optional-chaining',
            ifDevelopment('react-hot-loader/babel'),
          ]),
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
  ],
}