import React from 'react';
import { shallow } from 'enzyme';

import * as replace from './replace';
import * as widont from './widont';
import * as wrap from './wrap';

import TypographyHelper from './TypographyHelper';

describe('TypographyHelper', () => {
  describe('widont', () => {
    it('defaults widont to false', () => {
      const mock1 = jest.spyOn(widont, 'applyWidont');
      const mock2 = jest.spyOn(widont, 'applyWrapWidont');

      shallow(<TypographyHelper text="cracker jack" />);

      expect(mock1).not.toBeCalled();
      expect(mock2).not.toBeCalled();

      mock1.mockRestore();
      mock2.mockRestore();
    });

    it('has default settings for widont', () => {
      const mock1 = jest.spyOn(widont, 'applyWidont');
      const mock2 = jest.spyOn(widont, 'applyWrapWidont');

      shallow(
        <TypographyHelper
          text="cracker jack"
          widontNonBreakingSpace
          wrapWidont
        />,
      );

      expect(mock1).toBeCalledWith('cracker jack', Infinity, Infinity);
      expect(mock2).toBeCalledWith(
        expect.any(Array),
        <span className="widont" />,
        Infinity,
        Infinity,
      );

      mock1.mockRestore();
      mock2.mockRestore();
    });

    it('has passes down settings for widont', () => {
      const mock1 = jest.spyOn(widont, 'applyWidont');
      const mock2 = jest.spyOn(widont, 'applyWrapWidont');

      shallow(
        <TypographyHelper
          text="cracker jack"
          widontNonBreakingSpace
          wrapWidont={<mark />}
          widontMaxLastWordLength={47}
          widontMaxLastTwoWordsLength={99}
        />,
      );

      expect(mock1).toBeCalledWith('cracker jack', 47, 99);
      expect(mock2).toBeCalledWith(expect.any(Array), <mark />, 47, 99);

      mock1.mockRestore();
      mock2.mockRestore();
    });
  });

  describe('smart replacement', () => {
    it('defaults the smart replacement props to false', () => {
      const mock1 = jest.spyOn(replace, 'applySmartDashes');
      const mock2 = jest.spyOn(replace, 'applySmartEllipsis');
      const mock3 = jest.spyOn(replace, 'applySmartQuotes');

      shallow(<TypographyHelper text="Signature" />);

      expect(mock1).not.toBeCalled();
      expect(mock2).not.toBeCalled();
      expect(mock3).not.toBeCalled();

      mock1.mockRestore();
      mock2.mockRestore();
      mock3.mockRestore();
    });

    describe('smart dash', () => {
      it('calls applySmartDashes when smartDashes=true', () => {
        const mock = jest.spyOn(replace, 'applySmartDashes');
        shallow(<TypographyHelper text="Boop--n" smartDashes />);
        expect(mock).toBeCalled();
        mock.mockRestore();
      });

      it('does not calls applySmartDashes when smartDashes=false', () => {
        const mock = jest.spyOn(replace, 'applySmartDashes');
        shallow(<TypographyHelper text="Boop--n" smartDashes={false} />);
        expect(mock).not.toBeCalled();
        mock.mockRestore();
      });
    });

    describe('smart ellipsis', () => {
      it('calls applySmartEllipsis when smartEllipsis=true', () => {
        const mock = jest.spyOn(replace, 'applySmartEllipsis');
        shallow(<TypographyHelper text="Boop..." smartEllipsis />);
        expect(mock).toBeCalled();
        mock.mockRestore();
      });

      it('does not calls applySmartEllipsis when smartEllipsis=false', () => {
        const mock = jest.spyOn(replace, 'applySmartEllipsis');
        shallow(<TypographyHelper text="Boop--n" smartEllipsis={false} />);
        expect(mock).not.toBeCalled();
        mock.mockRestore();
      });
    });

    describe('smart quotoes', () => {
      it('calls applySmartQuotes when smartQuotes=true', () => {
        const mock = jest.spyOn(replace, 'applySmartQuotes');
        shallow(<TypographyHelper text="Boop..." smartQuotes />);
        expect(mock).toBeCalled();
        mock.mockRestore();
      });

      it('does not calls applySmartQuotes when smartQuotes=false', () => {
        const mock = jest.spyOn(replace, 'applySmartQuotes');
        shallow(<TypographyHelper text="Boop--n" smartQuotes={false} />);
        expect(mock).not.toBeCalled();
        mock.mockRestore();
      });
    });
  });

  describe('wrap characters', () => {
    describe('ampersand', () => {
      it('does not call applyWrapAmpsersand by default', () => {
        const mock = jest.spyOn(wrap, 'applyWrapAmpsersand');
        shallow(<TypographyHelper text="Lucky & Jane" />);
        expect(mock).not.toBeCalled();
        mock.mockRestore();
      });

      it('calls applyWrapAmpsersand when wrapAmpersand=true', () => {
        const mock = jest.spyOn(wrap, 'applyWrapAmpsersand');
        shallow(<TypographyHelper text="Lucky & Jane" wrapAmpersand />);
        expect(mock).toBeCalled();
        mock.mockRestore();
      });

      it('calls applyWrapAmpsersand with the custom element', () => {
        const mock = jest.spyOn(wrap, 'applyWrapAmpsersand');
        shallow(
          <TypographyHelper text="Lucky & Jane" wrapAmpersand={<mark />} />,
        );
        expect(mock).toBeCalledWith(expect.any(Array), <mark />);
        mock.mockRestore();
      });
    });

    describe('multiple capitals', () => {
      it('does not call applyWrapMultipleCaps by default', () => {
        const mock = jest.spyOn(wrap, 'applyWrapMultipleCaps');
        shallow(<TypographyHelper text="Trip to USA" />);
        expect(mock).not.toBeCalled();
        mock.mockRestore();
      });

      it('calls applyWrapMultipleCaps when wrapMultipileCapitals=true', () => {
        const mock = jest.spyOn(wrap, 'applyWrapMultipleCaps');
        shallow(<TypographyHelper text="Trip to USA" wrapMultipileCapitals />);
        expect(mock).toBeCalledWith(
          expect.any(Array),
          <span className="caps" />,
          2,
        );
        mock.mockRestore();
      });

      it('calls applyWrapMultipleCaps with the custom element and minlength', () => {
        const mock = jest.spyOn(wrap, 'applyWrapMultipleCaps');
        shallow(
          <TypographyHelper
            text="Trip to USA"
            wrapMultipileCapitals={<mark />}
            wrapMultipileCapitalsMinLength={82}
          />,
        );
        expect(mock).toBeCalledWith(expect.any(Array), <mark />, 82);
        mock.mockRestore();
      });
    });

    describe('paranthesis', () => {
      it('does not call applyWrapParanthesis by default', () => {
        const mock = jest.spyOn(wrap, 'applyWrapParanthesis');
        shallow(<TypographyHelper text="Eat (tree) green" />);
        expect(mock).not.toBeCalled();
        mock.mockRestore();
      });

      it('calls applyWrapParanthesis when wrapParanthesis=true', () => {
        const mock = jest.spyOn(wrap, 'applyWrapParanthesis');
        shallow(<TypographyHelper text="Eat (tree) green" wrapParanthesis />);
        expect(mock).toBeCalledWith(expect.any(Array), {
          leftParanthesis: <span className="left-paren" />,
          rightParanthesis: <span className="right-paren" />,
          leftSquareParanthesis: <span className="left-square-paren" />,
          rightSquareParanthesis: <span className="right-square-paren" />,
        });
        mock.mockRestore();
      });

      it('passes the element in to applyWrapParanthesis', () => {
        const mock = jest.spyOn(wrap, 'applyWrapParanthesis');
        shallow(
          <TypographyHelper
            text="Eat (tree) green"
            wrapParanthesis={<mark />}
          />,
        );
        expect(mock).toBeCalledWith(expect.any(Array), {
          leftParanthesis: <mark />,
          rightParanthesis: <mark />,
          leftSquareParanthesis: <mark />,
          rightSquareParanthesis: <mark />,
        });
        mock.mockRestore();
      });

      it('passes the elements in to applyWrapParanthesis', () => {
        const mock = jest.spyOn(wrap, 'applyWrapParanthesis');
        shallow(
          <TypographyHelper
            text="Eat (tree) green"
            wrapParanthesis={{
              leftParanthesis: <mark />,
              rightParanthesis: <i />,
              leftSquareParanthesis: <b />,
              rightSquareParanthesis: <u />,
            }}
          />,
        );
        expect(mock).toBeCalledWith(expect.any(Array), {
          leftParanthesis: <mark />,
          rightParanthesis: <i />,
          leftSquareParanthesis: <b />,
          rightSquareParanthesis: <u />,
        });
        mock.mockRestore();
      });
    });

    describe('quotes', () => {
      it('does not call applyWrapQuotes by default', () => {
        const mock = jest.spyOn(wrap, 'applyWrapQuotes');
        shallow(<TypographyHelper text={'"Hello World"'} />);
        expect(mock).not.toBeCalled();
        mock.mockRestore();
      });

      it('calls applyWrapQuotes when wrapQuotes=true', () => {
        const mock = jest.spyOn(wrap, 'applyWrapQuotes');
        shallow(<TypographyHelper text={'"Hello World"'} wrapQuotes />);
        expect(mock).toBeCalledWith(expect.any(Array), {
          leftDouble: <span className="left-double-quote" />,
          rightDouble: <span className="right-double-quote" />,
          leftSingle: <span className="left-single-quote" />,
          rightSingle: <span className="right-single-quote" />,
          double: <span className="double-quote" />,
          single: <span className="single-quote" />,
          apostrophe: <span className="apostrophe" />,
        });
        mock.mockRestore();
      });

      it('passes the element in to applyWrapQuotes', () => {
        const mock = jest.spyOn(wrap, 'applyWrapQuotes');
        shallow(
          <TypographyHelper text={'"Hello World"'} wrapQuotes={<mark />} />,
        );
        expect(mock).toBeCalledWith(expect.any(Array), {
          leftDouble: <mark />,
          rightDouble: <mark />,
          leftSingle: <mark />,
          rightSingle: <mark />,
          double: <mark />,
          single: <mark />,
          apostrophe: <mark />,
        });
        mock.mockRestore();
      });

      it('passes the elements in to applyWrapQuotes', () => {
        const mock = jest.spyOn(wrap, 'applyWrapQuotes');
        shallow(
          <TypographyHelper
            text={'"Hello World"'}
            wrapQuotes={{
              leftDouble: <mark />,
              rightDouble: <i />,
              leftSingle: <b />,
              rightSingle: <u />,
              double: <p />,
              single: <strong />,
              apostrophe: <big />,
            }}
          />,
        );
        expect(mock).toBeCalledWith(expect.any(Array), {
          leftDouble: <mark />,
          rightDouble: <i />,
          leftSingle: <b />,
          rightSingle: <u />,
          double: <p />,
          single: <strong />,
          apostrophe: <big />,
        });
        mock.mockRestore();
      });
    });

    describe('ordinal indicator', () => {
      it('does not call applyWrapOrdinalIndicator by default', () => {
        const mock = jest.spyOn(wrap, 'applyWrapOrdinalIndicator');
        shallow(<TypographyHelper text="21st Century" />);
        expect(mock).not.toBeCalled();
        mock.mockRestore();
      });

      it('calls applyWrapOrdinalIndicator when wrapOrdinalIndicator=true', () => {
        const mock = jest.spyOn(wrap, 'applyWrapOrdinalIndicator');
        shallow(<TypographyHelper text="21st Century" wrapOrdinalIndicator />);
        expect(mock).toBeCalled();
        mock.mockRestore();
      });

      it('calls applyWrapOrdinalIndicator with the custom element', () => {
        const mock = jest.spyOn(wrap, 'applyWrapOrdinalIndicator');
        shallow(
          <TypographyHelper
            text="21st Century"
            wrapOrdinalIndicator={<mark />}
          />,
        );
        expect(mock).toBeCalledWith(expect.any(Array), <mark />);
        mock.mockRestore();
      });
    });
  });

  describe('updateOnlyWhenTextChanges prop', () => {
    it("doesn't rerender when prop updateOnlyWhenTextChanges=true", () => {
      const wrapper1 = shallow(<TypographyHelper text="Boop'n" />);
      const instance1 = wrapper1.instance() as TypographyHelper;
      const shouldUpdate1 = instance1.shouldComponentUpdate({ text: "Boop'n" });
      expect(shouldUpdate1).toBe(false);

      const wrapper2 = shallow(
        <TypographyHelper text="Boop'n" wrapAmpersand={false} />,
      );
      const instance2 = wrapper2.instance() as TypographyHelper;
      const shouldUpdate2 = instance2.shouldComponentUpdate({
        text: "Boop'n",
        wrapAmpersand: true,
      });
      expect(shouldUpdate2).toBe(false);
    });

    it('does rerender when prop updateOnlyWhenTextChanges=false', () => {
      const wrapper = shallow(
        <TypographyHelper text="Boop'n" updateOnlyWhenTextChanges={false} />,
      );
      const instance = wrapper.instance() as TypographyHelper;
      const shouldUpdate = instance.shouldComponentUpdate({
        text: "Boop'n",
        updateOnlyWhenTextChanges: false,
      });
      expect(shouldUpdate).toBe(true);
    });
  });
});
