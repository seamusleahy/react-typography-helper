/**
 * A collection of function to wrap text with an element for styling purposes
 */
import React from 'react';
export declare const enum TOKEN_TYPE {
    text = 0,
    element = 1
}
export declare type TextToken = {
    type: TOKEN_TYPE.text;
    text: string;
};
export declare type ElementToken = {
    type: TOKEN_TYPE.element;
    children: TokenList;
    refElement: React.ReactElement;
};
export declare type Token = TextToken | ElementToken;
export declare type TokenList = Token[];
export declare function newTextToken(text: string): TextToken;
export declare function newElementToken(refElement: React.ReactElement, children: TokenList): ElementToken;
export declare function newElementTokenWithText(refElement: React.ReactElement, text: string): ElementToken;
export declare function createTokenListFromString(text: string): TokenList;
export declare function createReactFragmentFromTokenList(tokens: TokenList): React.ReactFragment;
/**
 * Wrap a word of all capital letters
 *
 * @param tokens
 * @param wrapElement
 * @param minLength - The minimun length of an all-caps word
 */
export declare function applyWrapMultipleCaps(tokens: TokenList, wrapElement: React.ReactElement, minLength: number): TokenList;
/**
 * Wrap all `&` characters
 */
export declare function applyWrapAmpsersand(tokens: TokenList, wrapElement: React.ReactElement): TokenList;
/**
 * Wrap orginal indicators: `1st`
 */
export declare function applyWrapOrdinalIndicator(tokens: TokenList, wrapElement: React.ReactElement): TokenList;
export interface WrapQuoteElements {
    leftDouble: React.ReactElement;
    rightDouble: React.ReactElement;
    apostrophe: React.ReactElement;
    leftSingle: React.ReactElement;
    rightSingle: React.ReactElement;
    double: React.ReactElement;
    single: React.ReactElement;
}
/**
 * Wrap the various quote mark characters
 */
export declare function applyWrapQuotes(tokens: TokenList, wrapElements: WrapQuoteElements): TokenList;
export interface WrapParanthesisElements {
    leftParanthesis: React.ReactElement;
    rightParanthesis: React.ReactElement;
    leftSquareParanthesis: React.ReactElement;
    rightSquareParanthesis: React.ReactElement;
}
export declare function applyWrapParanthesis(tokens: TokenList, wrapElements: WrapParanthesisElements): TokenList;
