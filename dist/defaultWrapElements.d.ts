/**
 * Default elements for wrapping text
 */
import React from 'react';
import { WrapQuoteElements, WrapParanthesisElements } from './wrap';
export declare const defaultAmpersandElement: JSX.Element;
export declare function wrapAmpersandElement(wrapAmpersand: boolean | React.ReactElement): JSX.Element;
export declare const defaultMultipleCapsElement: JSX.Element;
export declare function wrapMultipleCapsElement(wrapMultipileCapitals: boolean | React.ReactElement): JSX.Element;
export declare const defaultOrdinalIndicatorElement: JSX.Element;
export declare function wrapOrdinalIndicatorElement(wrapOrdinalIndicatordinal: boolean | React.ReactElement): JSX.Element;
export declare const defaultWidontElement: JSX.Element;
export declare function wrapWidontElement(wrapWidont: boolean | React.ReactElement): JSX.Element;
export declare const defaultQuoteElements: WrapQuoteElements;
export declare function wrapQuoteElements(wrapQuotes: boolean | React.ReactElement | WrapQuoteElements): WrapQuoteElements;
export declare const defaultParanthesisElements: WrapParanthesisElements;
export declare function wrapParanthesisElements(wrapParanthesis: boolean | React.ReactElement | WrapParanthesisElements): WrapParanthesisElements;
