const common = require('./rollup.common.config');

export default {
  ...common,
  output: {
    file: 'bundle.umd.js',
    format: 'umd',
    name: 'hauntedForms',
  },
};
