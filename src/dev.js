const { execFile } = require('child_process');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const {
  choosePort,
  createCompiler,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');

const paths = require('./config/paths');
const config = require('./config/webpack.config.dev');
const createDevServerConfig = require('./config/webpackDevServer.config');

const protocol = 'http';
const host = '0.0.0.0';
const defaultPort = 3000;

export default async function dev() {

  try {
    const port = await choosePort(host, defaultPort);
    const urls = prepareUrls(protocol, host, port);

    const compiler = webpack(config);
    const serverConfig = createDevServerConfig(host);
    const devServer = new WebpackDevServer(compiler, serverConfig);

    devServer.listen(port, host, (err) => {
      if (err) {
        return console.log(err);
      }
      console.log(`Development server listening on port ${port}...`);
      openBrowser(urls.localUrlForBrowser);
    });

    ['SIGINT', 'SIGTERM'].forEach((sig) => {
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
