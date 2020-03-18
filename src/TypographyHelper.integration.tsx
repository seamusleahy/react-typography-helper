/* eslint-disable no-multi-str */
import React from 'react';
import { mount } from 'enzyme';

import TypographyHelper from './TypographyHelper';

describe('TypographyHelper integration tests', () => {
  it('will render the text as is by default', () => {
    const wrapper = mount(
      <TypographyHelper
        text={"\"We said, 'why that?'\" ...but it (duck) couldn't be"}
      />,
    );
    expect(wrapper.html()).toBe(
      "\"We said, 'why that?'\" ...but it (duck) couldn't be",
    );
  });

  it('will apply the widont non-breaking space and wrapper element', () => {
    const wrapper = mount(
      <TypographyHelper
        text={"\"We said, 'why that?'\" ...but it (duck) couldn't be "}
        widontNonBreakingSpace
        wrapWidont
      />,
    );
    expect(wrapper.html()).toBe(
      '"We said, \'why that?\'" ...but it (duck) <span class="widont">couldn\'t&nbsp;be</span> ',
    );
  });

  it('will apply all the smart character replacements', () => {
    const wrapper = mount(
      <TypographyHelper
        text={
          "\"'Twas we said, 'why that--or not?'\" ...but it (duck) couldn't be --- whatever"
        }
        smartDashes
        smartEllipsis
        smartQuotes
      />,
    );
    // Using the unicode for the en- and em-dashes since they are hard to visually
    // differentiate in the code editor
    expect(wrapper.html()).toBe(
      '“’Twas we said, ‘why that\u2013or not?’” …but it (duck) couldn’t be \u2014 whatever',
    );
  });

  it('will wrap all the smart quote character replacements', () => {
    const wrapper = mount(
      <TypographyHelper
        text={"\"'Twas we said, 'why that?'\" ...but it (duck) couldn't be"}
        smartDashes
        smartEllipsis
        smartQuotes
        wrapQuotes
      />,
    );

    expect(wrapper.html()).toBe(
      '<span class="left-double-quote">“</span><span class="apostrophe">’</span>Twas we said, \
<span class="left-single-quote">‘</span>why that?<span class="right-single-quote">’</span>\
<span class="right-double-quote">”</span> …but it (duck) couldn<span class="apostrophe">’</span>t be',
    );
  });

  it('will wrap the other (non-smart) characters', () => {
    const wrapper = mount(
      <TypographyHelper
        text="ABC & 21st, (well ok), [not ok]"
        wrapAmpersand
        wrapOrdinalIndicator
        wrapMultipileCapitals
        wrapParanthesis={{
          leftParanthesis: <i />,
          rightParanthesis: <em />,
          leftSquareParanthesis: <b />,
          rightSquareParanthesis: <strong />,
        }}
      />,
    );

    expect(wrapper.html()).toBe(
      '<span class="caps">ABC</span> <span class="amp">&amp;</span> \
21<span class="ords">st</span>, <i>(</i>well ok<em>)</em>, <b>[</b>not ok<strong>]</strong>',
    );
  });

  it('will do all features: widont, smart-replacement and wrapping', () => {
    const wrapper = mount(
      <TypographyHelper
        text={"'ABC' & \"21st\", (...well--ok), [not ok, can't be]"}
        widontNonBreakingSpace
        smartDashes
        smartEllipsis
        smartQuotes
        wrapAmpersand
        wrapOrdinalIndicator
        wrapMultipileCapitals={<mark />}
        wrapParanthesis
        wrapQuotes={{
          leftDouble: <i />,
          rightDouble: <i />,
          leftSingle: <b />,
          rightSingle: <b />,
          apostrophe: <em />,
          single: <mark />,
          double: <i className="d" />,
        }}
        wrapWidont
      />,
    );

    expect(wrapper.html()).toBe(
      '<b>‘</b><mark>ABC</mark><b>’</b> <span class="amp">&amp;</span> \
<i>“</i>21<span class="ords">st</span><i>”</i>, <span class="left-paren">\
(</span>…well–ok<span class="right-paren">)</span>, <span class="left-square-paren">[</span>\
not ok, <span class="widont">can<em>’</em>t&nbsp;be<span class="right-square-paren">]</span></span>',
    );
  });
});
