const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  module: {
   rules: [
    {
      test: /\.(js|jsx)$/,
      exclude:/node_module/,
      resolve: {
        extensions: [".js", ".jsx"]
      },
      use: {
        loader :'babel-loader'
      }
    },{
      test: /\.(jpe?g|gif|png|svg)$/i,
      loader: 'url-loader',
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
   ]
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        favicon: "./src/assets/barefoot_small_logo.png",
        template: './src/index.html',
      }
    )
  ]
}

{
  'production'; // | 'development' | 'none'
}