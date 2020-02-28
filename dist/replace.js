/**
 * Collections of gunctions for replacing text with other text.
 *
 * This does not include the widont replacement text function.
 */
const APOSTROPHE_REGEX = /(\w)'(\w)/g;
const LEADING_APOSTROPHE_REGEX = /(^|\W)'(til|tis|tude|twas|twere|em)\b/gi;
const DOUBLE_QUOTES_REGEX = /"([^"]*)"/g;
const LEFT_SINGLE_QUOTE_REGEX = /(^|\W)'(\w)/g;
const RIGHT_SINGLE_QUOTE_REGEX = /([\w\?\.!"'”])'($|\W)/g;
export function applySmartQuotes(text) {
    // This does not support the special case with `rock 'n' roll`.
    // Although it can be supported, the maintaince of that code is not worth such a
    // super special case
    let t = text;
    // 1. Simple apostrophes: don't
    t = t.replace(APOSTROPHE_REGEX, (_, a, b) => `${a}${"\u2019" /* rightSingleQuotes */}${b}`);
    // 2. Leading apostrophes: 'Twas
    t = t.replace(LEADING_APOSTROPHE_REGEX, (_, prefix, w) => `${prefix}${"\u2019" /* rightSingleQuotes */}${w}`);
    // 3. Double quotes: "Hello World"
    t = t.replace(DOUBLE_QUOTES_REGEX, (_, s) => `${"\u201C" /* leftDoubleQuotes */}${s}${"\u201D" /* rightDoubleQuotes */}`);
    // 4. Single quotes: 'Hello World'
    // This also matches trailing apostrophes: James' bicycle
    t = t.replace(LEFT_SINGLE_QUOTE_REGEX, (_, pre, post) => `${pre}${"\u2018" /* leftSingleQuotes */}${post}`);
    t = t.replace(RIGHT_SINGLE_QUOTE_REGEX, (_, pre, post) => `${pre}${"\u2019" /* rightSingleQuotes */}${post}`);
    return t;
}
const THREE_DOTS_REGEX = /\.{3,}/g;
export function applySmartEllipsis(text) {
    return text.replace(THREE_DOTS_REGEX, dots => {
        if (dots.length === 3) {
            return "\u2026" /* ellipsis */;
        }
        return dots;
    });
}
const DASH_REGEX = /-{2,}/g;
export function applySmartDashes(text) {
    return text.replace(DASH_REGEX, dashes => {
        if (dashes.length === 3) {
            // em dash
            return "\u2014" /* emDash */;
        }
        if (dashes.length === 2) {
            // en dash
            return "\u2013" /* enDash */;
        }
        return dashes;
    });
}
