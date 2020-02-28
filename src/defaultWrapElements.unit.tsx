import React from 'react';

import {
  defaultAmpersandElement,
  wrapAmpersandElement,
  wrapOrdinalIndicatorElement,
  defaultOrdinalIndicatorElement,
  wrapMultipleCapsElement,
  defaultMultipleCapsElement,
  wrapWidontElement,
  defaultWidontElement,
  wrapParanthesisElements,
  defaultParanthesisElements,
  wrapQuoteElements,
  defaultQuoteElements,
} from './defaultWrapElements';

import { WrapParanthesisElements, WrapQuoteElements } from './wrap';

/**
 * Create a set of tests for the default wrap element functions
 * that return a single element.
 */
function testSingleElementDefault(
  getWrapElement: (x: boolean | React.ReactElement) => React.ReactElement,
  defaultElement: React.ReactElement
) {
  describe(`${getWrapElement.name}()`, () => {
    it('returns the default element when true is passed in', () => {
      expect(getWrapElement(true)).toBe(defaultElement);
    });

    it('returns the same element passed into it', () => {
      const el = <mark />;
      expect(getWrapElement(el)).toBe(el);
    });
  });
}

testSingleElementDefault(wrapAmpersandElement, defaultAmpersandElement);
testSingleElementDefault(
  wrapOrdinalIndicatorElement,
  defaultOrdinalIndicatorElement
);
testSingleElementDefault(wrapMultipleCapsElement, defaultMultipleCapsElement);
testSingleElementDefault(wrapWidontElement, defaultWidontElement);

describe('wrapParanthesisElements()', () => {
  it('returns the default element when true is passed in', () => {
    expect(wrapParanthesisElements(true)).toBe(defaultParanthesisElements);
  });

  it('returns a WrapParanthesisElements where each is the passed in element', () => {
    const el = <mark />;
    const expectedRet: WrapParanthesisElements = {
      leftParanthesis: el,
      rightParanthesis: el,
      leftSquareParanthesis: el,
      rightSquareParanthesis: el,
    };
    expect(wrapParanthesisElements(el)).toEqual(expectedRet);
  });

  it('return the same WrapParanthesisElements passed in', () => {
    const els: WrapParanthesisElements = {
      leftParanthesis: <mark />,
      rightParanthesis: <b />,
      leftSquareParanthesis: <i />,
      rightSquareParanthesis: <span />,
    };
    expect(wrapParanthesisElements(els)).toEqual(els);
  });
});

describe('wrapQuoteElements()', () => {
  it('returns the default element when true is passed in', () => {
    expect(wrapQuoteElements(true)).toBe(defaultQuoteElements);
  });

  it('returns a WrapQuoteElements where each is the passed in element', () => {
    const el = <mark />;
    const expectedRet: WrapQuoteElements = {
      leftDouble: el,
      leftSingle: el,
      rightDouble: el,
      rightSingle: el,
      single: el,
      double: el,
      apostrophe: el,
    };
    expect(wrapQuoteElements(el)).toEqual(expectedRet);
  });

  it('return the same WrapQuoteElements passed in', () => {
    const els: WrapQuoteElements = {
      leftDouble: <mark />,
      leftSingle: <b />,
      rightDouble: <i />,
      rightSingle: <span />,
      single: <u />,
      double: <del />,
      apostrophe: <ins />,
    };
    expect(wrapQuoteElements(els)).toEqual(els);
  });
});
