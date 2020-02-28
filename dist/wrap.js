/**
 * A collection of function to wrap text with an element for styling purposes
 */
import React from 'react';
export function newTextToken(text) {
    return {
        type: 0 /* text */,
        text,
    };
}
export function newElementToken(refElement, children) {
    return {
        type: 1 /* element */,
        children,
        refElement,
    };
}
export function newElementTokenWithText(refElement, text) {
    return newElementToken(refElement, [newTextToken(text)]);
}
export function createTokenListFromString(text) {
    return [newTextToken(text)];
}
function hydrateReactChildrenFromTokenList(tokens) {
    const hydrated = tokens.map(child => {
        if (child.type === 0 /* text */) {
            return child.text;
        }
        if (child.type === 1 /* element */) {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            return hydrateReactElementFromElementToken(child);
        }
        // Unreachable
        return '';
    });
    return hydrated;
}
function hydrateReactElementFromElementToken(token) {
    const hydratedChildren = hydrateReactChildrenFromTokenList(token.children);
    return React.cloneElement(token.refElement, {}, ...hydratedChildren);
}
export function createReactFragmentFromTokenList(tokens) {
    const hydrated = hydrateReactChildrenFromTokenList(tokens);
    return React.createElement(React.Fragment, {}, ...hydrated);
}
function defaultMatchParts(matches) {
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
function wrapText(tokens, needle, wrapper, getMatchParts = defaultMatchParts) {
    const results = [];
    tokens.forEach(token => {
        if (token.type === 0 /* text */) {
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
        }
        else if (token.type === 1 /* element */) {
            results.push(newElementToken(token.refElement, wrapText(token.children, needle, wrapper, getMatchParts)));
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
export function applyWrapMultipleCaps(tokens, wrapElement, minLength) {
    if (minLength <= 1) {
        return wrapText(tokens, /\b[A-Z]\b/, wrapElement);
    }
    const needle = new RegExp(`\\b(\\d[A-Z][A-Z\\d]{${minLength - 2},}|[A-Z][A-Z\\d]{${minLength -
        1},})\\b`);
    return wrapText(tokens, needle, wrapElement);
}
const AMPERSAND_REGEX = new RegExp("&" /* ampersand */);
/**
 * Wrap all `&` characters
 */
export function applyWrapAmpsersand(tokens, wrapElement) {
    return wrapText(tokens, AMPERSAND_REGEX, wrapElement);
}
/**
 * Support the lookahead in the RegExp that ensures a number prefixes the ordinal
 */
function ordinalMatchParts(matches) {
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
export function applyWrapOrdinalIndicator(tokens, wrapElement) {
    return wrapText(tokens, ORDINAL_REGEX, wrapElement, ordinalMatchParts);
}
const LEFT_SINGLE_QUOTE_REGEX = new RegExp("\u2018" /* leftSingleQuotes */);
const RIGHT_SINGLE_QUOTE_REGEX = new RegExp(`${"\u2019" /* rightSingleQuotes */}\\B`);
const APOSTROPHE_REGEX = new RegExp(`${"\u2019" /* rightSingleQuotes */}\\b`);
const LEFT_DOBULE_QUOTE_REGEX = new RegExp("\u201C" /* leftDoubleQuotes */);
const RIGHT_DOUBLE_QUOTE_REGEX = new RegExp("\u201D" /* rightDoubleQuotes */);
const SINGLE_QUOTE_REGEX = new RegExp("'" /* singleQuotes */);
const DOUBLE_QUOTE_REGEX = new RegExp("\"" /* doubleQuotes */);
/**
 * Wrap the various quote mark characters
 */
export function applyWrapQuotes(tokens, wrapElements) {
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
const LEFT_PARAN_REGEX = new RegExp(`\\${"(" /* leftParanthesis */}`);
const RIGHT_PARAN_REGEX = new RegExp(`\\${")" /* rightParanthesis */}`);
const LEFT_SQUARE_PARAN_REGEX = new RegExp(`\\${"[" /* leftSquareParanthesis */}`);
const RIGHT_SQUARE_PARAN_REGEX = new RegExp(`\\${"]" /* rightSquareParanthesis */}`);
export function applyWrapParanthesis(tokens, wrapElements) {
    let t = tokens;
    t = wrapText(t, LEFT_PARAN_REGEX, wrapElements.leftParanthesis);
    t = wrapText(t, RIGHT_PARAN_REGEX, wrapElements.rightParanthesis);
    t = wrapText(t, LEFT_SQUARE_PARAN_REGEX, wrapElements.leftSquareParanthesis);
    t = wrapText(t, RIGHT_SQUARE_PARAN_REGEX, wrapElements.rightSquareParanthesis);
    return t;
}
