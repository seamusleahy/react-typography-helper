/**
 * A collection of named characters as to not to remember all the character codes
 */

const enum CHARACTERS {
  nonBreakingSpace = '\u00a0',
  emDash = '\u2014',
  enDash = '\u2013',
  ellipsis = '\u2026',
  ampersand = '&',
  leftDoubleQuotes = '\u201C',
  rightDoubleQuotes = '\u201D',
  leftSingleQuotes = '\u2018',
  rightSingleQuotes = '\u2019',
  doubleQuotes = '"',
  singleQuotes = "'",
  leftParanthesis = '(',
  rightParanthesis = ')',
  leftSquareParanthesis = '[',
  rightSquareParanthesis = ']',
}

export default CHARACTERS;
