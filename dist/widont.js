import { newTextToken, newElementTokenWithText, } from './wrap';
export function shouldApplyWidontBasedOnLength(secondToLastWord, lastWord, maxLastWordLength, maxLastTwoWordsLength) {
    return (lastWord.length > maxLastWordLength
        || secondToLastWord.length + lastWord.length + 1 > maxLastTwoWordsLength);
}
const WIDONT_REGEX = /(.*\s)?(\S+)\s+(\S+)(\s*)$/;
export function applyWidont(text, maxLastWordLength, maxLastTwoWordsLength) {
    const m = text.match(WIDONT_REGEX);
    if (m === null) {
        return text;
    }
    const beforeText = m[1] || '';
    const aWord = m[2];
    const bWord = m[3];
    const extraSpaces = m[4];
    if (shouldApplyWidontBasedOnLength(aWord, bWord, maxLastWordLength, maxLastTwoWordsLength)) {
        return text;
    }
    return `${beforeText}${aWord}${"\u00A0" /* nonBreakingSpace */}${bWord}${extraSpaces}`;
}
const WIDONT_WRAP_REGEX = new RegExp(`(.*\\s)?((\\S+)[\\s${"\u00A0" /* nonBreakingSpace */}]+(\\S+))(\\s*)$`);
export function applyWrapWidont(tokens, wrapElement, maxLastWordLength, maxLastTwoWordsLength) {
    if (tokens.length === 0) {
        return [];
    }
    const [...results] = tokens;
    const lastText = results.pop();
    if (lastText && lastText.type === 1 /* element */) {
        results.concat(applyWrapWidont([lastText], wrapElement, maxLastWordLength, maxLastTwoWordsLength));
    }
    else if (lastText && lastText.type === 0 /* text */) {
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
        if (shouldApplyWidontBasedOnLength(aWord, bWord, maxLastWordLength, maxLastTwoWordsLength)) {
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
