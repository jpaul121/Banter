const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = {
  entry: [
    'babel-polyfill',
    './frontend/src/index.tsx',
    './frontend/src/index.css',
  ],
  output: {
    path: path.resolve(__dirname, 'frontend/static/frontend'),
    filename: 'index.bundle.js',
  },
  devtool: "source-map",
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    fallback: {
      fs: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env'],
              ['@babel/preset-react'],
              ['@babel/preset-typescript'],
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
            ],
          },
        },
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
        // include: ['./frontend/src/stylesheets/pages/Splash.css'],
        // exclude: /node_modules/,
        sideEffects: true,
      },
      {
        test: /\.(svg|eot|woff|ttf|svg|woff2)$/,
        use: [
          'url-loader?limit=100000',
          'file-loader',
        ],
      },
      {
        test: /\.(png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  // optimization: {
  //   minimizer: [
  //     '...',
  //     new CssMinimizerPlugin(),
  //   ],
  // },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'frontend/templates/index.html',
      // favicon: 'frontend/src/assets/favicon.ico'
    }),
    // new MiniCssExtractPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    }),
  ],
}