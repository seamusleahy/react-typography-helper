/**
 * A collection of function to wrap text with an element for styling purposes
 */
import React from 'react';
import CHARACTERS from './characters';

export const enum TOKEN_TYPE {
  text,
  element,
}

export type TextToken = {
  type: TOKEN_TYPE.text;
  text: string;
};

export type ElementToken = {
  type: TOKEN_TYPE.element;
  children: TokenList;
  refElement: React.ReactElement;
};

export type Token = TextToken | ElementToken;

export type TokenList = Token[];

export function newTextToken(text: string): TextToken {
  return {
    type: TOKEN_TYPE.text,
    text,
  };
}

export function newElementToken(
  refElement: React.ReactElement,
  children: TokenList
): ElementToken {
  return {
    type: TOKEN_TYPE.element,
    children,
    refElement,
  };
}

export function newElementTokenWithText(
  refElement: React.ReactElement,
  text: string
): ElementToken {
  return newElementToken(refElement, [newTextToken(text)]);
}

export function createTokenListFromString(text: string): TokenList {
  return [newTextToken(text)];
}

function hydrateReactChildrenFromTokenList(
  tokens: TokenList
): (string | React.ReactElement)[] {
  const hydrated = tokens.map(child => {
    if (child.type === TOKEN_TYPE.text) {
      return child.text;
    }
    if (child.type === TOKEN_TYPE.element) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return hydrateReactElementFromElementToken(child);
    }
    // Unreachable
    return '';
  });

  return hydrated;
}

function hydrateReactElementFromElementToken(
  token: ElementToken
): React.ReactElement {
  const hydratedChildren = hydrateReactChildrenFromTokenList(token.children);
  return React.cloneElement(token.refElement, {}, ...hydratedChildren);
}

export function createReactFragmentFromTokenList(
  tokens: TokenList
): React.ReactFragment {
  const hydrated = hydrateReactChildrenFromTokenList(tokens);
  return React.createElement(React.Fragment, {}, ...hydrated);
}

/**
 * Since we don't have wide support for regex lookbehind and lookahead, this allows
 * for the RegExp needle in wrapText to match more than what it wants to wrap by
 * passing in a custom `getMatchParts` parameter.
 */
interface MatchParts {
  /**
   * The matched part of the string before the text to be wrapped - aka the lookbehind
   */
  prefix: string;

  /**
   * The text to be wrapped in the element
   */
  wrapped: string;

  /**
   * The matched part of the string after the text to be wrapped - aka the lookahead
   */
  postfix: string;

  /**
   * The full string that was matched: prefix + wrapped + postfix
   */
  fullMatch: string;
}

function defaultMatchParts(matches: string[]): MatchParts {
  return {
    prefix: '',
    wrapped: matches[0],
    postfix: '',
    fullMatch: matches[0],
  };
}

/**
 * Utilty to walkthrough an array of strings and React elements previously generated
 * from this function in order to wrap text matched by `needle` with a clone of the
 * `wrapper` element.
 *
 * @param tokens
 * @param needle - a string or RegExp to search for
 * @param wrapper - the React element to clone and wrap other elements with
 * @param getMatchParts - Optional when needing to do lookbehind or lookaheads with RegExp
 */
function wrapText(
  tokens: TokenList,
  needle: RegExp,
  wrapper: React.ReactElement,
  getMatchParts = defaultMatchParts
): TokenList {
  const results: TokenList = [];
  tokens.forEach(token => {
    if (token.type === TOKEN_TYPE.text) {
      let remaining = token.text;
      while (remaining.length > 0) {
        const m = remaining.match(needle);
        if (m === null) {
          results.push(newTextToken(remaining));
          return;
        }
        const mp = getMatchParts(m);
        const offset = remaining.indexOf(mp.fullMatch);
        const preOffset = offset + mp.prefix.length;
        if (preOffset > 0) {
          results.push(newTextToken(remaining.substr(0, preOffset)));
        }
        results.push(newElementTokenWithText(wrapper, mp.wrapped));
        if (mp.postfix) {
          results.push(newTextToken(mp.postfix));
        }
        remaining = remaining.substr(offset + mp.fullMatch.length);
      }
    } else if (token.type === TOKEN_TYPE.element) {
      results.push(
        newElementToken(
          token.refElement,
          wrapText(token.children, needle, wrapper, getMatchParts)
        )
      );
    }
  });

  return results;
}

/**
 * Wrap a word of all capital letters
 *
 * @param tokens
 * @param wrapElement
 * @param minLength - The minimun length of an all-caps word
 */
export function applyWrapMultipleCaps(
  tokens: TokenList,
  wrapElement: React.ReactElement,
  minLength: number
) {
  if (minLength <= 1) {
    return wrapText(tokens, /\b[A-Z]\b/, wrapElement);
  }

  const needle = new RegExp(
    `\\b(\\d[A-Z][A-Z\\d]{${minLength - 2},}|[A-Z][A-Z\\d]{${minLength -
      1},})\\b`
  );
  return wrapText(tokens, needle, wrapElement);
}

const AMPERSAND_REGEX = new RegExp(CHARACTERS.ampersand);

/**
 * Wrap all `&` characters
 */
export function applyWrapAmpsersand(
  tokens: TokenList,
  wrapElement: React.ReactElement
) {
  return wrapText(tokens, AMPERSAND_REGEX, wrapElement);
}

/**
 * Support the lookahead in the RegExp that ensures a number prefixes the ordinal
 */
function ordinalMatchParts(matches: string[]): MatchParts {
  return {
    prefix: matches[1],
    wrapped: matches[2],
    postfix: '',
    fullMatch: matches[0],
  };
}
const ORDINAL_REGEX = /(\d)(st|nd|rd|th)\b/i;

/**
 * Wrap orginal indicators: `1st`
 */
export function applyWrapOrdinalIndicator(
  tokens: TokenList,
  wrapElement: React.ReactElement
) {
  return wrapText(tokens, ORDINAL_REGEX, wrapElement, ordinalMatchParts);
}

export interface WrapQuoteElements {
  leftDouble: React.ReactElement;
  rightDouble: React.ReactElement;
  apostrophe: React.ReactElement;
  leftSingle: React.ReactElement;
  rightSingle: React.ReactElement;
  double: React.ReactElement;
  single: React.ReactElement;
}

const LEFT_SINGLE_QUOTE_REGEX = new RegExp(CHARACTERS.leftSingleQuotes);
const RIGHT_SINGLE_QUOTE_REGEX = new RegExp(
  `${CHARACTERS.rightSingleQuotes}\\B`
);

const APOSTROPHE_REGEX = new RegExp(`${CHARACTERS.rightSingleQuotes}\\b`);

const LEFT_DOBULE_QUOTE_REGEX = new RegExp(CHARACTERS.leftDoubleQuotes);
const RIGHT_DOUBLE_QUOTE_REGEX = new RegExp(CHARACTERS.rightDoubleQuotes);

const SINGLE_QUOTE_REGEX = new RegExp(CHARACTERS.singleQuotes);
const DOUBLE_QUOTE_REGEX = new RegExp(CHARACTERS.doubleQuotes);

/**
 * Wrap the various quote mark characters
 */
export function applyWrapQuotes(
  tokens: TokenList,
  wrapElements: WrapQuoteElements
) {
  let t = tokens;
  // double
  t = wrapText(t, LEFT_DOBULE_QUOTE_REGEX, wrapElements.leftDouble);
  t = wrapText(t, RIGHT_DOUBLE_QUOTE_REGEX, wrapElements.rightDouble);

  // single
  t = wrapText(t, LEFT_SINGLE_QUOTE_REGEX, wrapElements.leftSingle);
  t = wrapText(t, RIGHT_SINGLE_QUOTE_REGEX, wrapElements.rightSingle);
  t = wrapText(t, APOSTROPHE_REGEX, wrapElements.apostrophe);

  // non-curly
  t = wrapText(t, DOUBLE_QUOTE_REGEX, wrapElements.double);
  t = wrapText(t, SINGLE_QUOTE_REGEX, wrapElements.single);
  return t;
}

export interface WrapParanthesisElements {
  leftParanthesis: React.ReactElement;
  rightParanthesis: React.ReactElement;
  leftSquareParanthesis: React.ReactElement;
  rightSquareParanthesis: React.ReactElement;
}

const LEFT_PARAN_REGEX = new RegExp(`\\${CHARACTERS.leftParanthesis}`);
const RIGHT_PARAN_REGEX = new RegExp(`\\${CHARACTERS.rightParanthesis}`);

const LEFT_SQUARE_PARAN_REGEX = new RegExp(
  `\\${CHARACTERS.leftSquareParanthesis}`
);
const RIGHT_SQUARE_PARAN_REGEX = new RegExp(
  `\\${CHARACTERS.rightSquareParanthesis}`
);

export function applyWrapParanthesis(
  tokens: TokenList,
  wrapElements: WrapParanthesisElements
) {
  let t = tokens;

  t = wrapText(t, LEFT_PARAN_REGEX, wrapElements.leftParanthesis);
  t = wrapText(t, RIGHT_PARAN_REGEX, wrapElements.rightParanthesis);

  t = wrapText(t, LEFT_SQUARE_PARAN_REGEX, wrapElements.leftSquareParanthesis);
  t = wrapText(
    t,
    RIGHT_SQUARE_PARAN_REGEX,
    wrapElements.rightSquareParanthesis
  );

  return t;
}
