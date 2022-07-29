const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '/dist'),
    filename: 'index_bundle.js'
  },
  module: {
   rules: [
    {
      test: /\.js$/,
      exclude:/node_module/,
      use: {
        loader :'babel-loader'
      }
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
   ]

  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: './src/index.html',
      }
    )
  ]
}

{
    'production'; // | 'development' | 'none'
  }