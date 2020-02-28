import {
  applySmartDashes,
  applySmartEllipsis,
  applySmartQuotes,
} from './replace';

describe('applySmartDashes()', () => {
  it('converts two hyphen-minuses into an en-dash', () => {
    expect(applySmartDashes("March 17th--St. Patrick's Day--is tomorrow")).toBe(
      "March 17th\u2013St. Patrick's Day\u2013is tomorrow"
    );
  });

  it('converts three hyphen-minuses into an em-dash', () => {
    expect(
      applySmartDashes("March 17th---St. Patrick's Day---is tomorrow")
    ).toBe("March 17th\u2014St. Patrick's Day\u2014is tomorrow");
  });

  it('ignores four or more hyphen-minuses', () => {
    expect(
      applySmartDashes("March 17th----St. Patrick's Day------is tomorrow")
    ).toBe("March 17th----St. Patrick's Day------is tomorrow");
  });
});

describe('applySmartEllipsis()', () => {
  it('converts three periods into an ellipsis', () => {
    expect(applySmartEllipsis('To be continued... ...or is it?')).toBe(
      'To be continued\u2026 \u2026or is it?'
    );
  });

  it('ignore four or more periods', () => {
    expect(applySmartEllipsis('To be continued.... ......or is it?')).toBe(
      'To be continued.... ......or is it?'
    );
  });
});

describe('applySmartQuotes', () => {
  it("replaces (') with (’) used in common contractions", () => {
    expect(applySmartQuotes("You can't believe it is not butter")).toBe(
      'You can\u2019t believe it is not butter'
    );
  });

  it("replaces (') with (’) used in contractions that start with an apostrophe", () => {
    expect(applySmartQuotes("'Twas the night before")).toBe(
      '\u2019Twas the night before'
    );
    expect(applySmartQuotes("'Where 'twas you'")).toBe(
      '\u2018Where \u2019twas you\u2019'
    );
    expect(applySmartQuotes("'til we meet again")).toBe(
      '\u2019til we meet again'
    );
  });

  it("replace (') with (‘) and (’) in quotes", () => {
    expect(applySmartQuotes("She said: 'where are the bees?'")).toBe(
      'She said: \u2018where are the bees?\u2019'
    );
    expect(applySmartQuotes("'The haves' and 'the haven'ts'")).toBe(
      '\u2018The haves\u2019 and \u2018the haven\u2019ts\u2019'
    );
  });

  it('replaces (") with (“) and (”) in quotes', () => {
    expect(applySmartQuotes('She said: "where are the bees?"')).toBe(
      'She said: \u201Cwhere are the bees?\u201D'
    );
    expect(applySmartQuotes('"The haves" and "the haven\'ts"')).toBe(
      '\u201CThe haves\u201D and \u201Cthe haven\u2019ts\u201D'
    );
  });
});
