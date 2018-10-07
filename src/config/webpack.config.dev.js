const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const paths = require('./paths');

const publicPath = '/';
const publicUrl = '';

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    require.resolve('webpack-dev-server/client') + '?/',
    require.resolve('webpack/hot/dev-server'),
    paths.appIndexJs,
  ],
  output: {
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|jsx)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
              presets: [require.resolve('babel-preset-react-app')],
            },
          },
          {
            test: /\.scss$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        'last 2 versions',
                        'IE >= 11',
                        'Firefox ESR',
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
              {
                loader: require.resolve('sass-loader'),
                options: {
                  precision: 8,
                },
              },
            ],
          },
          {
            exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new InterpolateHtmlPlugin({ PUBLIC_URL: publicUrl }),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'development',
      },
    }),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  performance: {
    hints: false,
  },
};
