import * as tty from 'tty'

const env = process.env || {}
const argv = process.argv || []

const isDisabled = "NO_COLOR" in env || argv.includes("--no-color")
const isForced = "FORCE_COLOR" in env || argv.includes("--color")
const isTTY = tty.isatty && tty.isatty(1)
const isSaneTerm = (process.stdout != null && isTTY && process.env.TERM && process.env.TERM !== "dumb")
const isCI = "CI" in env && ("GITHUB_ACTIONS" in env || "GITLAB_CI" in env || "CIRCLECI" in env)

let enabled = !isDisabled && (isForced || isSaneTerm || isCI)

const raw = (open, close, searchRegex, replaceValue) => (s) => enabled
  ? open +
    (~(s += "").indexOf(close, 4) // skip opening \x1b[
      ? s.replace(searchRegex, replaceValue)
      : s)
    + close
  : s

const ansi = (open, close, offset = 0, seq) => raw(
  `\x1b[${open + offset}${seq || ''}m`,
  `\x1b[${close + offset}m`,
  new RegExp(`\\x1b\\[${close + offset}m`, "g"),
  `\x1b[${open + offset}m`
)

export const options = Object.defineProperty({}, "enabled", {
  get: () => enabled,
  set: (value) => (enabled = value),
})

  // custom generators
export const rgb = (r, g, b, isBg) => ansi(38, 39, isBg && 10, `;2;${r};${g};${b}`)
export const ansi256 = (n, isBg) => ansi(38, 39, isBg && 10, `;5;${n}`)
export const ansi16 = (n, isBg) => ansi(n, 39, isBg && 10)

  // effects
export const reset = ansi(0, 0)
  // special search needed because these are nestable-effects with the same terminating sequence
export const bold = raw("\x1b[1m", "\x1b[22m", /\x1b\[22m/g, "\x1b[22m\x1b[1m")
export const dim = raw("\x1b[2m", "\x1b[22m", /\x1b\[22m/g, "\x1b[22m\x1b[2m")
export const italic = ansi(3, 23)
export const underline = ansi(4, 24)
export const inverse = ansi(7, 27)
export const hidden = ansi(8, 28)
export const strikethrough = ansi(9, 29)

  // fg colors
export const black = ansi(30, 39)
export const red = ansi(31, 39)
export const green = ansi(32, 39)
export const yellow = ansi(33, 39)
export const blue = ansi(34, 39)
export const magenta = ansi(35, 39)
export const cyan = ansi(36, 39)
export const white = ansi(37, 39)
export const gray = ansi(90, 39)

  // bg colors
export const bgBlack = ansi(40, 49)
export const bgRed = ansi(41, 49)
export const bgGreen = ansi(42, 49)
export const bgYellow = ansi(43, 49)
export const bgBlue = ansi(44, 49)
export const bgMagenta = ansi(45, 49)
export const bgCyan = ansi(46, 49)
export const bgWhite = ansi(47, 49)

  // bright fg colors
export const blackBright = ansi(90, 39)
export const redBright = ansi(91, 39)
export const greenBright = ansi(92, 39)
export const yellowBright = ansi(93, 39)
export const blueBright = ansi(94, 39)
export const magentaBright = ansi(95, 39)
export const cyanBright = ansi(96, 39)
export const whiteBright = ansi(97, 39)

  // bright bg colors
export const bgBlackBright = ansi(100, 49)
export const bgRedBright = ansi(101, 49)
export const bgGreenBright = ansi(102, 49)
export const bgYellowBright = ansi(103, 49)
export const bgBlueBright = ansi(104, 49)
export const bgMagentaBright = ansi(105, 49)
export const bgCyanBright = ansi(106, 49)
export const bgWhiteBright = ansi(107, 49)
