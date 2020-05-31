
const plugins = [
  [require.resolve('fast-async'), { "spec": true }],
  require.resolve('@babel/plugin-proposal-class-properties'),
  require.resolve('@babel/plugin-transform-react-constant-elements'),
  require.resolve('@babel/plugin-proposal-object-rest-spread'),
  require.resolve('@babel/plugin-syntax-dynamic-import'),
  require.resolve('@babel/plugin-syntax-function-bind'),
  [require.resolve('@babel/plugin-proposal-decorators'), { "decoratorsBeforeExport": true}],
  [require.resolve('@babel/plugin-transform-regenerator'), {
    // Async functions are converted to generators by @babel/preset-env
    async: false,
  }],
  [require.resolve('@babel/plugin-transform-runtime'), {
    "helpers": false,
    "regenerator": true
  }]
]

const presets = [
  [require.resolve('@babel/preset-env'), {
    exclude: ['@babel/plugin-transform-regenerator'],
    loose: true,
  }],
  require.resolve('@babel/preset-react'),
]

module.exports = {
  cacheDirectory: true,
  babelrc: false,
  plugins,
  presets,
}
