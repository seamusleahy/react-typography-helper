import React from 'react';

import {
  applyWrapAmpsersand,
  applyWrapMultipleCaps,
  applyWrapOrdinalIndicator,
  applyWrapParanthesis,
  applyWrapQuotes,
  createTokenListFromString,
  createReactFragmentFromTokenList,
  TOKEN_TYPE,
  newElementToken,
  newElementTokenWithText,
  newTextToken,
  TextToken,
  ElementToken,
} from './wrap';

describe('The token utils', () => {
  it('create a TextToken with newTextToken()', () => {
    expect(newTextToken('Burrito & Tacos')).toEqual({
      type: TOKEN_TYPE.text,
      text: 'Burrito & Tacos',
    } as TextToken);
  });

  it('create a ElementToken with newElementToken()', () => {
    const refEl = <mark className="marky" />;
    expect(newElementToken(refEl, [newTextToken('Pizza pie')])).toEqual({
      type: TOKEN_TYPE.element,
      refElement: refEl,
      children: [
        {
          type: TOKEN_TYPE.text,
          text: 'Pizza pie',
        },
      ],
    } as ElementToken);
  });

  it('create a TokenList with createTokenListFromString()', () => {
    expect(createTokenListFromString('Hello World')).toEqual([
      newTextToken('Hello World'),
    ]);
  });

  it('creates a Fragment with createReactFragmentFromTokenList()', () => {
    expect(
      createReactFragmentFromTokenList([
        newElementTokenWithText(<i />, '"'),
        newElementToken(<mark className="t" />, [
          newTextToken('Hi '),
          newElementTokenWithText(<span className="n" />, 'BOB'),
        ]),
        newElementTokenWithText(<i />, '"'),
      ])
    ).toEqual(
      <>
        <i>"</i>
        <mark className="t">
          {'Hi '}
          <span className="n">BOB</span>
        </mark>
        <i>"</i>
      </>
    );
  });
});

describe('applyWrapAmpsersand()', () => {
  it('wraps an (&) in a top level string', () => {
    expect(
      applyWrapAmpsersand(createTokenListFromString('Short & Long'), <mark />)
    ).toEqual([
      newTextToken('Short '),
      newElementTokenWithText(<mark />, '&'),
      newTextToken(' Long'),
    ]);
  });

  it('wraps an (&) nested in another element', () => {
    expect(
      applyWrapAmpsersand(
        [
          newTextToken('Short '),
          newElementToken(<span />, [newTextToken('& Long')]),
        ],
        <mark />
      )
    ).toEqual([
      newTextToken('Short '),
      newElementToken(<span />, [
        newElementTokenWithText(<mark />, '&'),
        newTextToken(' Long'),
      ]),
    ]);
  });
});

describe('applyWrapMultipleCaps()', () => {
  it('wraps caps in a top level string', () => {
    expect(
      applyWrapMultipleCaps(
        createTokenListFromString('Meet us at NEGDR'),
        <mark />,
        2
      )
    ).toEqual([
      newTextToken('Meet us at '),
      newElementTokenWithText(<mark />, 'NEGDR'),
    ]);
  });

  it('wraps single capital words', () => {
    expect(
      applyWrapMultipleCaps(
        createTokenListFromString('What is J about'),
        <mark />,
        1
      )
    ).toEqual([
      newTextToken('What is '),
      newElementTokenWithText(<mark />, 'J'),
      newTextToken(' about'),
    ]);
  });

  it('does not wrap caps in a top level string under the min length', () => {
    expect(
      applyWrapMultipleCaps(
        createTokenListFromString('Meet us at KN'),
        <mark />,
        3
      )
    ).toEqual([newTextToken('Meet us at KN')]);
  });

  it('wraps caps in a nested in another element', () => {
    expect(
      applyWrapMultipleCaps(
        [
          newTextToken('When '),
          newElementToken(<span />, [newTextToken('at OOO')]),
        ],
        <mark />,
        2
      )
    ).toEqual([
      newTextToken('When '),
      newElementToken(<span />, [
        newTextToken('at '),
        newElementTokenWithText(<mark />, 'OOO'),
      ]),
    ]);
  });
});

describe('applyWrapOrdinalIndicator()', () => {
  it('wraps ordinal indicator in the top level', () => {
    expect(
      applyWrapOrdinalIndicator(
        createTokenListFromString('On the 21st'),
        <mark />
      )
    ).toEqual([
      newTextToken('On the 21'),
      newElementTokenWithText(<mark />, 'st'),
    ]);

    expect(
      applyWrapOrdinalIndicator(
        createTokenListFromString('On the 22ND day'),
        <mark />
      )
    ).toEqual([
      newTextToken('On the 22'),
      newElementTokenWithText(<mark />, 'ND'),
      newTextToken(' day'),
    ]);

    expect(
      applyWrapOrdinalIndicator(createTokenListFromString('3rd week'), <mark />)
    ).toEqual([
      newTextToken('3'),
      newElementTokenWithText(<mark />, 'rd'),
      newTextToken(' week'),
    ]);

    expect(
      applyWrapOrdinalIndicator(
        createTokenListFromString('110,045th'),
        <mark />
      )
    ).toEqual([
      newTextToken('110,045'),
      newElementTokenWithText(<mark />, 'th'),
    ]);
  });

  it('wraps ordinal indicator in a nested in another element', () => {
    expect(
      applyWrapOrdinalIndicator(
        [newElementToken(<span />, [newTextToken('1st')])],
        <mark />
      )
    ).toEqual([
      newElementToken(<span />, [
        newTextToken('1'),
        newElementTokenWithText(<mark />, 'st'),
      ]),
    ]);
  });
});

describe('applyWrapParanthesis()', () => {
  it('wraps paranthesises at the top level', () => {
    expect(
      applyWrapParanthesis([newTextToken('How to (or not) make [trees]')], {
        leftParanthesis: <i />,
        rightParanthesis: <mark />,
        leftSquareParanthesis: <u />,
        rightSquareParanthesis: <b />,
      })
    ).toEqual([
      newTextToken('How to '),
      newElementTokenWithText(<i />, '('),
      newTextToken('or not'),
      newElementTokenWithText(<mark />, ')'),
      newTextToken(' make '),
      newElementTokenWithText(<u />, '['),
      newTextToken('trees'),
      newElementTokenWithText(<b />, ']'),
    ]);
  });

  it('wraps paranthesises nested in another element', () => {
    expect(
      applyWrapParanthesis(
        [
          newTextToken('How to (or not'),
          newElementTokenWithText(<span />, ') make [trees]'),
        ],
        {
          leftParanthesis: <i />,
          rightParanthesis: <mark />,
          leftSquareParanthesis: <u />,
          rightSquareParanthesis: <b />,
        }
      )
    ).toEqual([
      newTextToken('How to '),
      newElementTokenWithText(<i />, '('),
      newTextToken('or not'),
      newElementToken(<span />, [
        newElementTokenWithText(<mark />, ')'),
        newTextToken(' make '),
        newElementTokenWithText(<u />, '['),
        newTextToken('trees'),
        newElementTokenWithText(<b />, ']'),
      ]),
    ]);
  });
});

describe('applyWrapQuotes()', () => {
  it('wraps quotes in the top level', () => {
    expect(
      applyWrapQuotes(
        [newTextToken('’Twas the ‘same world’ “today” can’t \'be\' "anymore"')],
        {
          rightDouble: <i />,
          leftDouble: <b />,
          rightSingle: <p />,
          leftSingle: <u />,
          apostrophe: <li />,
          double: <ol />,
          single: <ul />,
        }
      )
    ).toEqual([
      newElementTokenWithText(<li />, '’'),
      newTextToken('Twas the '),
      newElementTokenWithText(<u />, '‘'),
      newTextToken('same world'),
      newElementTokenWithText(<p />, '’'),
      newTextToken(' '),
      newElementTokenWithText(<b />, '“'),
      newTextToken('today'),
      newElementTokenWithText(<i />, '”'),
      newTextToken(' can'),
      newElementTokenWithText(<li />, '’'),
      newTextToken('t '),
      newElementTokenWithText(<ul />, "'"),
      newTextToken('be'),
      newElementTokenWithText(<ul />, "'"),
      newTextToken(' '),
      newElementTokenWithText(<ol />, '"'),
      newTextToken('anymore'),
      newElementTokenWithText(<ol />, '"'),
    ]);
  });
});
