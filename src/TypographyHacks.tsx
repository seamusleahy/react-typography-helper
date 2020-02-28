import React from 'react';

import * as defaultWrapElements from './defaultWrapElements';
import * as replace from './replace';
import * as widont from './widont';
import * as wrap from './wrap';

export interface TypographyHacksProps {
  /**
   * The text to display and apply the type hacks to
   */
  text: string;

  // Widon't
  /**
   * Enable putting a non-breaking space between the last two words.
   * @default false
   */
  widontNonBreakingSpace?: boolean;

  /**
   * Enable wrapping the last two words so that you can apply CSS to
   * prevent widowing of the last word. You can then use media queries to
   * better control when widowing is allowed.
   *
   * If the value is `true`, it will be wrapped in `<span class="widont">`.
   */
  wrapWidont?: boolean | React.ReactElement;

  /**
   * If the last word is longer than the `widontMaxLastWordLength`,
   * then widon't will not be applied to it
   *
   * @default Infinity
   */
  widontMaxLastWordLength?: number;

  /**
   * If the last two words, including the space between, is longer than
   * the `widontMaxLastTwoWordsLength`, then widon't will not be applied to it
   *
   * @default Infinity
   */
  widontMaxLastTwoWordsLength?: number;

  // Smart replace characters with a proper character
  /**
   * Replace `"` and `'` with right and left quote marks.
   * This supports contractions including known words that start
   * with an contraction like 'Twas.
   *
   * @default false
   */
  smartQuotes?: boolean;

  /**
   * Replace three periods `...` with an ellipsis character.
   *
   * This will ignore a run of four or more periods `....`.
   *
   * @default false
   */
  smartEllipsis?: boolean;

  /**
   * Replace two dashes `--` with an en-dash and three dashes `---` with an em-dash.
   *
   * This will ignore a run of four or more dashes `----`
   */
  smartDashes?: boolean;

  // Wrap special-cases of characters

  /**
   * Wrap `&` with an element.
   *
   * If the value is `true`, it will be wrapped in `<span class="amp">`.
   *
   * @default false
   */
  wrapAmpersand?: boolean | React.ReactElement;

  /**
   * Wrap all-capital words in an element.
   *
   * If the value is `true`, it will be wrapped in `<span class="caps">`.
   *
   * @default false
   */
  wrapMultipileCapitals?: boolean | React.ReactElement;

  /**
   * Set a minimum length for an all-caps word for it to apply
   *
   * @default 2
   */
  wrapMultipileCapitalsMinLength?: number;

  /**
   * Wrap the ordinal indicator. Ex: `1st` => `1<span>st</span>`
   *
   * If the value is `true`, it will be wrapped in `<span class="ords">`.
   *
   * @default false
   */
  wrapOrdinalIndicator?: boolean | React.ReactElement;

  /**
   * Wrap the quote mark characters in an elements.
   *
   * If the value is `true`, it will be wrapped in:
   * ‘ -> `<span class="left-single-quote">`
   * ’ -> `<span class="right-single-quote">` OR <span class="apostrophe">
   * “ -> `<span class="left-double-quote">`
   * ” -> `<span class="right-double-quote">`
   * ' -> `<span class="single-quote">`
   * " -> `<span class="double-quote">`
   *
   * @default false
   */
  wrapQuotes?: boolean | React.ReactElement | wrap.WrapQuoteElements;

  /**
   * Wrap paranthesis character in an element.
   *
   * If the value is `true`, it will be wrapped in:
   * '(' -> `<span class="left-paren">`
   * ')' -> `<span class="right-paren">`
   * '[' -> `<span class="left-square-paren">`
   * ']' -> `<span class="right-square-paren">`
   *
   * @default false
   */
  wrapParanthesis?: boolean | React.ReactElement | wrap.WrapParanthesisElements;

  /**
   * Cache the formatting based on the `text` param. This avoids unnessary reparsing
   * of the text for each React render.
   *
   * The side-effect of only checking the `text` is that live changes to the
   * other params will not cause a re-render. Usually this is not an issue as
   * the formatting settings wouldn't change, but it can be an issue during
   * development with hot-reloading.
   *
   * @default true
   */
  updateOnlyWhenTextChanges?: boolean;
}

export default class TypographyHacks extends React.Component<
  TypographyHacksProps
> {
  /* eslint-disable react/destructuring-assignment */
  shouldComponentUpdate(nextProps: TypographyHacksProps) {
    if (
      this.props.updateOnlyWhenTextChanges === false ||
      nextProps.updateOnlyWhenTextChanges === false
    ) {
      return true;
    }

    return this.props.text !== nextProps.text;
  }
  /* eslint-enable */

  render() {
    const {
      widontNonBreakingSpace = false,
      widontMaxLastWordLength = Infinity,
      widontMaxLastTwoWordsLength = Infinity,
      wrapWidont = false,

      smartDashes = false,
      smartEllipsis = false,
      smartQuotes = false,

      wrapAmpersand = false,
      wrapMultipileCapitals = false,
      wrapMultipileCapitalsMinLength = 2,
      wrapOrdinalIndicator = false,
      wrapQuotes = false,
      wrapParanthesis = false,

      text = '',
    } = this.props;

    let t = text;
    if (widontNonBreakingSpace) {
      t = widont.applyWidont(
        t,
        widontMaxLastWordLength,
        widontMaxLastTwoWordsLength
      );
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
      tokens = widont.applyWrapWidont(
        tokens,
        defaultWrapElements.wrapWidontElement(wrapWidont),
        widontMaxLastWordLength,
        widontMaxLastTwoWordsLength
      );
    }

    if (wrapQuotes) {
      tokens = wrap.applyWrapQuotes(
        tokens,
        defaultWrapElements.wrapQuoteElements(wrapQuotes)
      );
    }

    if (wrapOrdinalIndicator) {
      tokens = wrap.applyWrapOrdinalIndicator(
        tokens,
        defaultWrapElements.wrapOrdinalIndicatorElement(wrapOrdinalIndicator)
      );
    }

    if (wrapAmpersand) {
      tokens = wrap.applyWrapAmpsersand(
        tokens,
        defaultWrapElements.wrapAmpersandElement(wrapAmpersand)
      );
    }

    if (wrapMultipileCapitals) {
      tokens = wrap.applyWrapMultipleCaps(
        tokens,
        defaultWrapElements.wrapMultipleCapsElement(wrapMultipileCapitals),
        wrapMultipileCapitalsMinLength
      );
    }

    if (wrapParanthesis) {
      tokens = wrap.applyWrapParanthesis(
        tokens,
        defaultWrapElements.wrapParanthesisElements(wrapParanthesis)
      );
    }

    return wrap.createReactFragmentFromTokenList(tokens);
  }
}
