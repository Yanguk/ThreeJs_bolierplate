const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';
const isDevelopment = mode === 'development';

module.exports = {
  mode,
  entry: './src/app.js',
  output: {
    path: path.resolve('build'),
    filename: 'index.js',
    clean: true,
  },
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: '/',
    },
    client: {
      overlay: true,
      logging: 'error',
    },
    port: 8080,
    open: {
      app: {
        name: 'Google Chrome',
      },
    },
  },
  module: {
    rules: [
      {
        // css 압축 로더
        test: /\.css$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      templateParameters: {
        env: mode === 'development' ? '(개발용)' : '',
      },
      minify:
      mode === 'production'
        ? {
          collapseWhitespace: true,
          removeComments: true,
        }
        : false,
    }),
    new MiniCssExtractPlugin(),
  ],
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000,
  },
  stats: 'errors-only',
};
