const common = require('./rollup.common.config');

export default {
  ...common,
  output: {
    file: 'bundle.esm.js',
    format: 'esm',
  },
};
