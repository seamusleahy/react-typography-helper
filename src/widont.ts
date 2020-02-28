/**
 * Widon't: prevent a widow (a single word on the last line).
 *
 * These are in a separate file from the other replace and wrap functions to ensure
 * that when a change is made to one of the functions it is obvious to change the
 * other file.
 */
import React from 'react';
import CHARACTERS from './characters';
import {
  TokenList,
  TOKEN_TYPE,
  newTextToken,
  newElementTokenWithText,
} from './wrap';

export function shouldApplyWidontBasedOnLength(
  secondToLastWord: string,
  lastWord: string,
  maxLastWordLength: number,
  maxLastTwoWordsLength: number
): boolean {
  return (
    lastWord.length > maxLastWordLength ||
    secondToLastWord.length + lastWord.length + 1 > maxLastTwoWordsLength
  );
}

const WIDONT_REGEX = /(.*\s)?(\S+)\s+(\S+)(\s*)$/;
export function applyWidont(
  text: string,
  maxLastWordLength: number,
  maxLastTwoWordsLength: number // Includes the space between the two words
) {
  const m = text.match(WIDONT_REGEX);

  if (m === null) {
    return text;
  }

  const beforeText = m[1] || '';
  const aWord = m[2];
  const bWord = m[3];
  const extraSpaces = m[4];

  if (
    shouldApplyWidontBasedOnLength(
      aWord,
      bWord,
      maxLastWordLength,
      maxLastTwoWordsLength
    )
  ) {
    return text;
  }

  return `${beforeText}${aWord}${CHARACTERS.nonBreakingSpace}${bWord}${extraSpaces}`;
}

const WIDONT_WRAP_REGEX = new RegExp(
  `(.*\\s)?((\\S+)[\\s${CHARACTERS.nonBreakingSpace}]+(\\S+))(\\s*)$`
);

export function applyWrapWidont(
  tokens: TokenList,
  wrapElement: React.ReactElement,
  maxLastWordLength: number,
  maxLastTwoWordsLength: number // Includes the space between the two words
): TokenList {
  if (tokens.length === 0) {
    return [];
  }

  const [...results] = tokens;
  const lastText = results.pop();

  if (lastText && lastText.type === TOKEN_TYPE.element) {
    results.concat(
      applyWrapWidont(
        [lastText],
        wrapElement,
        maxLastWordLength,
        maxLastTwoWordsLength
      )
    );
  } else if (lastText && lastText.type === TOKEN_TYPE.text) {
    const m = lastText.text.match(WIDONT_WRAP_REGEX);

    if (m === null) {
      results.push(lastText);
      return results;
    }

    const beforeText = m[1] || '';
    const lastTwoWords = m[2];
    const aWord = m[3];
    const bWord = m[4];
    const extraSpaces = m[5];

    if (
      shouldApplyWidontBasedOnLength(
        aWord,
        bWord,
        maxLastWordLength,
        maxLastTwoWordsLength
      )
    ) {
      results.push(lastText);
      return results;
    }

    if (beforeText) {
      results.push(newTextToken(beforeText));
    }

    results.push(newElementTokenWithText(wrapElement, lastTwoWords));

    if (extraSpaces) {
      results.push(newTextToken(extraSpaces));
    }
  }
  return results;
}
