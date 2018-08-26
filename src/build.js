const path = require('path');
const webpack = require('webpack');
const config = require('./config/webpack.config.prod');
const paths = require('./config/paths');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');

export default async function build() {
  if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
    process.exit(1);
  }

  let compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run(err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}
