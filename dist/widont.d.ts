/**
 * Widon't: prevent a widow (a single word on the last line).
 *
 * These are in a separate file from the other replace and wrap functions to ensure
 * that when a change is made to one of the functions it is obvious to change the
 * other file.
 */
import React from 'react';
import { TokenList } from './wrap';
export declare function shouldApplyWidontBasedOnLength(secondToLastWord: string, lastWord: string, maxLastWordLength: number, maxLastTwoWordsLength: number): boolean;
export declare function applyWidont(text: string, maxLastWordLength: number, maxLastTwoWordsLength: number): string;
export declare function applyWrapWidont(tokens: TokenList, wrapElement: React.ReactElement, maxLastWordLength: number, maxLastTwoWordsLength: number): TokenList;
