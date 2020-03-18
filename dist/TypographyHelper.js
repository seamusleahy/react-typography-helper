import React from 'react';
import * as defaultWrapElements from './defaultWrapElements';
import * as replace from './replace';
import * as widont from './widont';
import * as wrap from './wrap';
export default class TypographyHelper extends React.Component {
    /* eslint-disable react/destructuring-assignment */
    shouldComponentUpdate(nextProps) {
        if (this.props.updateOnlyWhenTextChanges === false
            || nextProps.updateOnlyWhenTextChanges === false) {
            return true;
        }
        return this.props.text !== nextProps.text;
    }
    /* eslint-enable */
    render() {
        const { widontNonBreakingSpace = false, widontMaxLastWordLength = Infinity, widontMaxLastTwoWordsLength = Infinity, wrapWidont = false, smartDashes = false, smartEllipsis = false, smartQuotes = false, wrapAmpersand = false, wrapMultipileCapitals = false, wrapMultipileCapitalsMinLength = 2, wrapOrdinalIndicator = false, wrapQuotes = false, wrapParanthesis = false, text = '', } = this.props;
        let t = text;
        if (widontNonBreakingSpace) {
            t = widont.applyWidont(t, widontMaxLastWordLength, widontMaxLastTwoWordsLength);
        }
        if (smartQuotes) {
            t = replace.applySmartQuotes(t);
        }
        if (smartEllipsis) {
            t = replace.applySmartEllipsis(t);
        }
        if (smartDashes) {
            t = replace.applySmartDashes(t);
        }
        let tokens = wrap.createTokenListFromString(t);
        if (wrapWidont) {
            tokens = widont.applyWrapWidont(tokens, defaultWrapElements.wrapWidontElement(wrapWidont), widontMaxLastWordLength, widontMaxLastTwoWordsLength);
        }
        if (wrapQuotes) {
            tokens = wrap.applyWrapQuotes(tokens, defaultWrapElements.wrapQuoteElements(wrapQuotes));
        }
        if (wrapOrdinalIndicator) {
            tokens = wrap.applyWrapOrdinalIndicator(tokens, defaultWrapElements.wrapOrdinalIndicatorElement(wrapOrdinalIndicator));
        }
        if (wrapAmpersand) {
            tokens = wrap.applyWrapAmpsersand(tokens, defaultWrapElements.wrapAmpersandElement(wrapAmpersand));
        }
        if (wrapMultipileCapitals) {
            tokens = wrap.applyWrapMultipleCaps(tokens, defaultWrapElements.wrapMultipleCapsElement(wrapMultipileCapitals), wrapMultipileCapitalsMinLength);
        }
        if (wrapParanthesis) {
            tokens = wrap.applyWrapParanthesis(tokens, defaultWrapElements.wrapParanthesisElements(wrapParanthesis));
        }
        return wrap.createReactFragmentFromTokenList(tokens);
    }
}
