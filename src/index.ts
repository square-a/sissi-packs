const { execFile } = require('child_process');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const {
  choosePort,
  createCompiler,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');

export default async function run() {
  process.env.BABEL_ENV = 'development';
  process.env.NODE_ENV = 'development';

  const paths = require('../config/paths');
  const config = require('../config/webpack.config.dev');
  const createDevServerConfig = require('../config/webpackDevServer.config');

  const protocol = 'http';
  const host = '0.0.0.0';
  const defaultPort = 3000;

  require('../config/env');
  try {
    const port = await choosePort(host, defaultPort);
    const urls = prepareUrls(protocol, host, port);

    const compiler = webpack(config);
    const serverConfig = createDevServerConfig(host);
    const devServer = new WebpackDevServer(compiler, serverConfig);

    devServer.listen(port, host, (err: any) => {
      if (err) {
        return console.log(err);
      }
      openBrowser(urls.localUrlForBrowser);
    });

    ['SIGINT', 'SIGTERM'].forEach((sig: any) => {
      process.on(sig, () => {
        devServer.close();
        process.exit();
      });
    });

  } catch(err) {
    if (err && err.message) {
      console.log(err);
      console.log(err.message);
    }
    process.exit(1);
  }
}
