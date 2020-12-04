import pkg from './package.json'

export default {
  input: './index.js',
  output: [
    { format: 'cjs', file: pkg.exports.require },
    { format: 'esm', file: pkg.exports.import }
  ]
}
