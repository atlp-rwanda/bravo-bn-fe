const path = require("path");
const dotenv = require('dotenv');
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const env = dotenv.config().parsed;
const vercelEnv = process.env;
  const envKeys = env ? Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {}) : Object.keys(vercelEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(vercelEnv[next]);
    return prev;
  }, {});


module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_module/,
        resolve: {
          extensions: [".js", ".jsx"],
        },
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        loader: "url-loader",
        options: {
          limit: 25000,
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],

  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: "./src/assets/barefoot_small_logo.png",
      template: "./src/index.html",
    }),
    new webpack.DefinePlugin(envKeys)
  ],
  devServer: {
    historyApiFallback: true,
  }
};

{
  ("production"); // | 'development' | 'none'
}