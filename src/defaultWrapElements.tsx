/**
 * Default elements for wrapping text
 */
import React from 'react';
import { WrapQuoteElements, WrapParanthesisElements } from './wrap';

export const defaultAmpersandElement = <span className="amp" />;
export function wrapAmpersandElement(
  wrapAmpersand: boolean | React.ReactElement
) {
  if (wrapAmpersand === true || wrapAmpersand === false) {
    return defaultAmpersandElement;
  }
  return wrapAmpersand;
}

export const defaultMultipleCapsElement = <span className="caps" />;
export function wrapMultipleCapsElement(
  wrapMultipileCapitals: boolean | React.ReactElement
) {
  if (wrapMultipileCapitals === true || wrapMultipileCapitals === false) {
    return defaultMultipleCapsElement;
  }
  return wrapMultipileCapitals;
}

export const defaultOrdinalIndicatorElement = <span className="ords" />;
export function wrapOrdinalIndicatorElement(
  wrapOrdinalIndicatordinal: boolean | React.ReactElement
) {
  if (
    wrapOrdinalIndicatordinal === true ||
    wrapOrdinalIndicatordinal === false
  ) {
    return defaultOrdinalIndicatorElement;
  }
  return wrapOrdinalIndicatordinal;
}

export const defaultWidontElement = <span className="widont" />;
export function wrapWidontElement(wrapWidont: boolean | React.ReactElement) {
  if (wrapWidont === true || wrapWidont === false) {
    return defaultWidontElement;
  }
  return wrapWidont;
}

export const defaultQuoteElements: WrapQuoteElements = {
  leftDouble: <span className="left-double-quote" />,
  rightDouble: <span className="right-double-quote" />,
  leftSingle: <span className="left-single-quote" />,
  rightSingle: <span className="right-single-quote" />,
  double: <span className="double-quote" />,
  single: <span className="single-quote" />,
  apostrophe: <span className="apostrophe" />,
};
export function wrapQuoteElements(
  wrapQuotes: boolean | React.ReactElement | WrapQuoteElements
): WrapQuoteElements {
  if (wrapQuotes === true || wrapQuotes === false) {
    return defaultQuoteElements;
  }

  if (React.isValidElement(wrapQuotes)) {
    return {
      leftDouble: wrapQuotes as React.ReactElement,
      rightDouble: wrapQuotes as React.ReactElement,
      leftSingle: wrapQuotes as React.ReactElement,
      rightSingle: wrapQuotes as React.ReactElement,
      double: wrapQuotes as React.ReactElement,
      single: wrapQuotes as React.ReactElement,
      apostrophe: wrapQuotes as React.ReactElement,
    };
  }

  return wrapQuotes as WrapQuoteElements;
}

export const defaultParanthesisElements: WrapParanthesisElements = {
  leftParanthesis: <span className="left-paren" />,
  rightParanthesis: <span className="right-paren" />,
  leftSquareParanthesis: <span className="left-square-paren" />,
  rightSquareParanthesis: <span className="right-square-paren" />,
};

export function wrapParanthesisElements(
  wrapParanthesis: boolean | React.ReactElement | WrapParanthesisElements
): WrapParanthesisElements {
  if (wrapParanthesis === true || wrapParanthesis === false) {
    return defaultParanthesisElements;
  }

  if (React.isValidElement(wrapParanthesis)) {
    return {
      leftParanthesis: wrapParanthesis as React.ReactElement,
      rightParanthesis: wrapParanthesis as React.ReactElement,
      leftSquareParanthesis: wrapParanthesis as React.ReactElement,
      rightSquareParanthesis: wrapParanthesis as React.ReactElement,
    };
  }

  return wrapParanthesis as WrapParanthesisElements;
}
