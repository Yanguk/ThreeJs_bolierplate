const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const HOST = 'localhost';
const PORT = 8080;
const isDevelopment = mode === 'development';
const colorize = (colorNum, output) => `\x1B[${colorNum}m${output}\x1B[0m`;
const devSeverMessage = `Dev server running on http://${HOST}:${PORT}`;
const message = colorize(34, devSeverMessage);

module.exports = {
  mode,
  entry: './src/App.js',
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
    port: PORT,
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
    ...(isDevelopment
      ? [
        new CleanTerminalPlugin({
          message,
          onlyInWatchMode: false,
        }),
      ]
      : [
        new MiniCssExtractPlugin(),
      ]),
  ],
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000,
  },
  stats: 'errors-only',
};
