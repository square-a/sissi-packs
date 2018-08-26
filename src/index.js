import build from './build';
import dev from './dev';

process.on('unhandledRejection', err => {
  throw err;
});

module.exports = function run(args, flags) {
  const [ command ] = args;

  switch(command) {
    case 'build':
      process.env.BABEL_ENV = 'production';
      process.env.NODE_ENV = 'production';
      build();
      return;

    case 'dev':
      process.env.BABEL_ENV = 'development';
      process.env.NODE_ENV = 'development';
      dev();
      return;

    default:
      return;
  }
}
