const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const config = require('./webpack.config.dev');
const paths = require('./paths');

module.exports = function(allowedHost) {
  return {
    compress: true,
    clientLogLevel: 'none',
    contentBase: paths.appPublic,
    watchContentBase: true,
    hot: true,
    publicPath: config.output.publicPath,
    quiet: true,
    watchOptions: {
      ignored: ignoredFiles(paths.appSrc),
    },
    host: '0.0.0.0',
    overlay: false,
    public: allowedHost,
    before(app) {
      app.use(errorOverlayMiddleware());
    },
  };
};
