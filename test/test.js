const c = require('..')
const test = require('ava')

const complexNestedCheck = () => c.bold(`BOLD ${c.red(`RED ${c.dim("DIM")} RED`)} BOLD`)
const complexNestedResult = `\x1b[1mBOLD \x1b[31mRED \x1b[2mDIM\x1b[22m\x1b[1m RED\x1b[39m BOLD\x1b[22m`

test('complex nested', t => {
  t.is(complexNestedCheck(), complexNestedResult)
})

test('numbers and dates', t => {
  [new Date(), -1e10, -1, -0.1, 0, 0.1, 1, 1e10].forEach(n => t.is(c.red(n), `\x1b[31m${n}\x1b[39m`))
})

test('options to enable/disable color', t => {
  c.options.enabled = false
  t.is(c.options.enabled, false)
  t.not(complexNestedCheck(), complexNestedResult)
  t.is(complexNestedCheck(), 'BOLD RED DIM RED BOLD')
  c.options.enabled = true
  t.is(complexNestedCheck(), complexNestedResult)
})

test('pre-generated colors', t => {
  ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray', 'bgBlack', 'bgRed', 'bgGreen', 'bgYellow', 'bgBlue', 'bgMagenta', 'bgCyan', 'bgWhite', 'blackBright', 'redBright', 'greenBright', 'yellowBright', 'blueBright', 'magentaBright', 'cyanBright', 'whiteBright', 'bgBlackBright', 'bgRedBright', 'bgGreenBright', 'bgYellowBright', 'bgBlueBright', 'bgMagentaBright', 'bgCyanBright', 'bgWhiteBright'].forEach(color => {
    t.snapshot({ color, generated: c[color]('_') })
  })
})
