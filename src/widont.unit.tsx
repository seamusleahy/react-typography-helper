import React from 'react';
import { applyWidont, applyWrapWidont } from './widont';
import {
  newElementTokenWithText,
  newTextToken,
  createTokenListFromString,
} from './wrap';

describe('applyWidont()', () => {
  it('will add a non-breaking space between the last two words', () => {
    expect(applyWidont('Hello World', Infinity, Infinity)).toBe(
      'Hello\u00a0World',
    );
    expect(applyWidont('hello world', Infinity, Infinity)).toBe(
      'hello\u00a0world',
    );
    expect(applyWidont('hello world  ', Infinity, Infinity)).toBe(
      'hello\u00a0world  ',
    );
    expect(applyWidont('Well hello\nworld', Infinity, Infinity)).toBe(
      'Well hello\u00a0world',
    );
    expect(applyWidont('hello\nworld.', Infinity, Infinity)).toBe(
      'hello\u00a0world.',
    );
  });

  it('will not change the string when it is only one word', () => {
    expect(applyWidont('Hello', Infinity, Infinity)).toBe('Hello');
    expect(applyWidont('  Hello ', Infinity, Infinity)).toBe('  Hello ');
  });

  it('will not add a non-breaking space when the last word is longer than maxLastWordLength', () => {
    expect(applyWidont('Hello World', 4, Infinity)).toBe('Hello World');
  });

  it('will not add a non-breaking space when the last two words are longer than maxLastTwoWordsLength', () => {
    expect(applyWidont('Hello World', Infinity, 10)).toBe('Hello World');
  });

  it('will add a non-breaking space when the last word is shorter than maxLastWordLength', () => {
    expect(applyWidont('Hello World ', 5, Infinity)).toBe('Hello\u00a0World ');
  });

  it('will add a non-breaking space when the last two words are shorter than maxLastTwoWordsLength', () => {
    expect(applyWidont('Hello World  ', Infinity, 11)).toBe(
      'Hello\u00a0World  ',
    );
  });
});

describe('applyWrapWidont()', () => {
  it('will wrap the last two words in an element', () => {
    expect(
      applyWrapWidont(
        createTokenListFromString('hElLo WoRlD'),
        <span className="w" />,
        Infinity,
        Infinity,
      ),
    ).toEqual([newElementTokenWithText(<span className="w" />, 'hElLo WoRlD')]);

    expect(
      applyWrapWidont(
        createTokenListFromString('hElLo  WoRlD  '),
        <span className="w" />,
        Infinity,
        Infinity,
      ),
    ).toEqual([
      newElementTokenWithText(<span className="w" />, 'hElLo  WoRlD'),
      newTextToken('  '),
    ]);

    expect(
      applyWrapWidont(
        createTokenListFromString('Where in the world.'),
        <span className="w" />,
        Infinity,
        Infinity,
      ),
    ).toEqual([
      newTextToken('Where in '),
      newElementTokenWithText(<span className="w" />, 'the world.'),
    ]);
  });

  it('will not wrap the last two words when the last word is longer than maxLastWordLength', () => {
    expect(
      applyWrapWidont(
        createTokenListFromString('Hello World'),
        <span className="w" />,
        4,
        Infinity,
      ),
    ).toEqual(createTokenListFromString('Hello World'));
  });

  it('will not wrap the last two words when the last two words are longer than maxLastTwoWordsLength', () => {
    expect(
      applyWrapWidont(
        createTokenListFromString('Hello World'),
        <span className="w" />,
        Infinity,
        10,
      ),
    ).toEqual(createTokenListFromString('Hello World'));
  });

  it('will wrap the last two words when the last two words are shorter than maxLastTwoWordsLength', () => {
    expect(
      applyWrapWidont(
        createTokenListFromString('Hello World  '),
        <span className="w" />,
        Infinity,
        11,
      ),
    ).toEqual([
      newElementTokenWithText(<span className="w" />, 'Hello World'),
      newTextToken('  '),
    ]);
  });
});
