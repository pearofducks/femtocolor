'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

let enabled =
  !("NO_COLOR" in process.env) &&
  ("FORCE_COLOR" in process.env ||
    (process.stdout != null &&
      process.stdout.isTTY &&
      process.env.TERM &&
      process.env.TERM !== "dumb"));

const raw = (open, close, searchRegex, replaceValue) => (s) => enabled
  ? open +
    (~(s += "").indexOf(close, 4) // skip opening \x1b[
      ? s.replace(searchRegex, replaceValue)
      : s)
    + close
  : s;

const ansi = (open, close, offset = 0, seq) => raw(
  `\x1b[${open + offset}${seq || ''}m`,
  `\x1b[${close + offset}m`,
  new RegExp(`\\x1b\\[${close + offset}m`, "g"),
  `\x1b[${open + offset}m`
);

const options = Object.defineProperty({}, "enabled", {
  get: () => enabled,
  set: (value) => (enabled = value),
});

  // custom generators
const rgb = (r, g, b, isBg) => ansi(38, 39, isBg && 10, `;2;${r};${g};${b}`);
const ansi256 = (n, isBg) => ansi(38, 39, isBg && 10, `;5;${n}`);
const ansi16 = (n, isBg) => ansi(n, 39, isBg && 10);

  // effects
const reset = ansi(0, 0);
  // special search needed because these are nestable-effects with the same terminating sequence
const bold = raw("\x1b[1m", "\x1b[22m", /\x1b\[22m/g, "\x1b[22m\x1b[1m");
const dim = raw("\x1b[2m", "\x1b[22m", /\x1b\[22m/g, "\x1b[22m\x1b[2m");
const italic = ansi(3, 23);
const underline = ansi(4, 24);
const inverse = ansi(7, 27);
const hidden = ansi(8, 28);
const strikethrough = ansi(9, 29);

  // fg colors
const black = ansi(30, 39);
const red = ansi(31, 39);
const green = ansi(32, 39);
const yellow = ansi(33, 39);
const blue = ansi(34, 39);
const magenta = ansi(35, 39);
const cyan = ansi(36, 39);
const white = ansi(37, 39);
const gray = ansi(90, 39);

  // bg colors
const bgBlack = ansi(40, 49);
const bgRed = ansi(41, 49);
const bgGreen = ansi(42, 49);
const bgYellow = ansi(43, 49);
const bgBlue = ansi(44, 49);
const bgMagenta = ansi(45, 49);
const bgCyan = ansi(46, 49);
const bgWhite = ansi(47, 49);

  // bright fg colors
const blackBright = ansi(90, 39);
const redBright = ansi(91, 39);
const greenBright = ansi(92, 39);
const yellowBright = ansi(93, 39);
const blueBright = ansi(94, 39);
const magentaBright = ansi(95, 39);
const cyanBright = ansi(96, 39);
const whiteBright = ansi(97, 39);

  // bright bg colors
const bgBlackBright = ansi(100, 49);
const bgRedBright = ansi(101, 49);
const bgGreenBright = ansi(102, 49);
const bgYellowBright = ansi(103, 49);
const bgBlueBright = ansi(104, 49);
const bgMagentaBright = ansi(105, 49);
const bgCyanBright = ansi(106, 49);
const bgWhiteBright = ansi(107, 49);

exports.ansi16 = ansi16;
exports.ansi256 = ansi256;
exports.bgBlack = bgBlack;
exports.bgBlackBright = bgBlackBright;
exports.bgBlue = bgBlue;
exports.bgBlueBright = bgBlueBright;
exports.bgCyan = bgCyan;
exports.bgCyanBright = bgCyanBright;
exports.bgGreen = bgGreen;
exports.bgGreenBright = bgGreenBright;
exports.bgMagenta = bgMagenta;
exports.bgMagentaBright = bgMagentaBright;
exports.bgRed = bgRed;
exports.bgRedBright = bgRedBright;
exports.bgWhite = bgWhite;
exports.bgWhiteBright = bgWhiteBright;
exports.bgYellow = bgYellow;
exports.bgYellowBright = bgYellowBright;
exports.black = black;
exports.blackBright = blackBright;
exports.blue = blue;
exports.blueBright = blueBright;
exports.bold = bold;
exports.cyan = cyan;
exports.cyanBright = cyanBright;
exports.dim = dim;
exports.gray = gray;
exports.green = green;
exports.greenBright = greenBright;
exports.hidden = hidden;
exports.inverse = inverse;
exports.italic = italic;
exports.magenta = magenta;
exports.magentaBright = magentaBright;
exports.options = options;
exports.red = red;
exports.redBright = redBright;
exports.reset = reset;
exports.rgb = rgb;
exports.strikethrough = strikethrough;
exports.underline = underline;
exports.white = white;
exports.whiteBright = whiteBright;
exports.yellow = yellow;
exports.yellowBright = yellowBright;
