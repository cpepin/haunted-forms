const resolve = require('rollup-plugin-node-resolve');

module.exports = {
  input: 'lib/index.js',
  plugins: [resolve()],
};
