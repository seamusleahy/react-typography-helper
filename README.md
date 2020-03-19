# React Typography Helper

A React component to help with typography by replacing characters and inserting elements to attach custom styling to.

* **Widon't (Widow Control):** Prevent the last word from appearing alone on the last line with either a non-breaking space or CSS.
* **Smart Text Replacement:** Replace the easy to type characters with the typographically correct characters for quotes, ellipsis and dashes.
* **Text Wrapping:** Some typefaces could use extra help with special characters or they deserve special treatment. Wrap various characters in elements to add custom styles. It can wrap ordinal indicator, all-capital words, quotes, parenthesis and ampersands.


All the TypeScript definitions are included.

## Installation
```
npm install @seamusleahy/react-typography-helper"
// or
yarn add @seamusleahy/react-typography-helper"
```
## How-to use
```javascript
import React from 'react';
import TypographyHelper from 'react-typography-helper';

export const MyArticle = ({title, body}) => (
  <article>
    <h1><TypographyHelper text={title} widontNonBreakingSpace /></h1>
    <div dangerouslySetInnerHTML={{__html: body}} />
  </article>
);
```


### `text: string` (required)
The text to display and transform with the type helper.

```javascript
<TypographyHelper text="The text to transform" />
// Output: The text to transform
```

### `widontNonBreakingSpace: boolean`
Default value: `false`

Replaces the space between the last two words with a non-breaking space to prevent widowing of the last word.

```javascript
<TypographyHelper text="The text to transform" widontNonBreakingSpace />
// Output: The text to&nbsp;transform
```

### `wrapWidont: boolean | ReactElement`
Default value: `false`

- `false`: disabled
- `true`: will wrap in a `<span class="widont">`
- A `ReactElement` (aka, component), will wrap in a clone of the `ReactElement`

Wraps the last two-words in an element for you to add CSS styles to prevent wrapping. This is useful when wanting to use Media Queries to conditionally prevent wrapping.

```javascript
<TypographyHelper text="The text to transform" wrapWidont />
// Output: The text <span class="widont">to transform</span>
```

```css
@media (min-width: 400px) {
  .widont {
    white-space: nowrap;
  }
}
```

If you use a CSS-in-JS library:

```javascript
const Widont = styled.span`
@media (min-width: 400px)  {
    white-space: nowrap;
}`;

<TypographyHelper text="The text to transform" wrapWidont={Widont} />
// Output: The text <span class="css-1pybesw">to transform</span> 
```

### `widontMaxLastWordLength: number`
Default value: `Infinity`

This allows you to set a length for when the last word is long enough that it doesn’t require widow control. This setting is for both `wrapWidont` and `widontNonBreakingSpace`. 

### `widontMaxLastTwoWordsLength: number`
Default value: `Infinity`

This allows you to set a length when for when the last **two words** are long enough that it doesn’t require widow control. This setting is for both `wrapWidont` and `widontNonBreakingSpace`. 

### `smartQuotes: boolean`
Default value: `false`

This replaces `'` and `"` with right and left quo=te marks.

```javascript
<TypographyHelper text={`"'Em shouted, 'free the flour!'"`} smartQuotes />
// Output: “’Em shouted, ‘free the flour!’”
```

| Cases                                                         | Input                                              | Output                                    |
| ------------------------------------------------------------- | -------------------------------------------------- | ----------------------------------------- |
| Double Quotes                                                 | Andrew said, <mark>"</mark>I am tired<mark>"</mark>             | Andrew said, <mark>“</mark>I am tired<mark>”</mark>              |
| Single Quotes                                                 | Tawny said, <mark>'</mark>just trying my best<mark>'</mark> | Tawny said, <mark>‘</mark>just trying my best<mark>’</mark> |
| Apostrophe                                                    | I shouldn<mark>'</mark>t have more                 | I shouldn<mark>’</mark>t have more                 |
| Leading Apostrophe<br>(’til, ’tis, ’tude, ’twas, ’twere, ’em) | <mark>'</mark>Twas the night before                | <mark>’</mark>Twas the night before                |

Note: The double quotes are always paired together when replacing with a left and right double quote marks, whereas, single quotes are determined by the characters before and after it.

### `smartEllipsis: boolean`
Default value: `false`

Replaces three periods (`...`) with an ellipsis (`…`).

```javascript
<TypographyHelper text="Today..." smartEllipsis />
// Output: Today…
```

Note: This will ignore a sequence of four or more periods.

### `smartDashes: boolean`
Default value: `false`

Replaces two-dashes (`--`) with an en-dash (`–`) and three-dashes (`---`) with an em-dash (—).

```javascript
<TypographyHelper text="Where--what---why" smartDashes />
// Output: Where–what—why
```

### `wrapAmpersand: boolean | React.ReactElement`
Default value: `false`

- `false`: disabled
- `true`: will wrap in a `<span class="amp">`
- A `ReactElement`, will wrap in a clone of the `ReactElement`

Wraps ampersands (`&`) in an element for the purpose of custom styling.

```javascript
<TypographyHelper text="Flour & Yeast" wrapAmpersand />
// Output: Flour <span class="amp">&amp;</span> Yeast
```

```css
.amp {
  letter-spacing: -0.1em;
}
```

If you use a CSS-in-JS library:

```javascript
const Amp = styled.span`
  letter-spacing: -0.1em;
`;

<TypographyHelper text="Flour & Yeast" wrapAmpersand={Amp} />
// Output: Flour <span class="css-ork2sq">&amp;</span> Yeast
```

### `wrapMultipileCapitals: boolean | React.ReactElement`
Default value: `false`

- `false`: disabled
- `true`: will wrap in a `<span class="caps">`
- A `ReactElement`, will wrap in a clone of the `ReactElement`

Wrap all capital-letter words in an element for the purpose of custom styling.

```javascript
<TypographyHelper text="Highlights of XYZ" wrapMultipileCapitals />
// Output: Highlights of <span class="caps">XYZ</span>
```

If you use a CSS-in-JS library:

```javascript
const Caps = styled.span`
  letter-spacing: -0.1em;
`;

<TypographyHelper text="Flour & Yeast" wrapAmpersand={Caps} />
// Output: Highlights of <span class="css-ork2sq">XYZ</span>
```

### `wrapMultipileCapitalsMinLength: number`
Default value: `2`

Configure the minimum length an all capital-letter word has to be in order to be wrapped with `wrapMultipileCapitals`.

### `wrapOrdinalIndicator: boolean | React.ReactElement`
Default value: `false`

- `false`: disabled
- `true`: will wrap in a `<span class="ords">`
- A `ReactElement`, will wrap in a clone of the `ReactElement`

Wrap the [ordinal indicator](https://en.wikipedia.org/wiki/Ordinal_indicator) (-st, -nd, -rd, -th) in an element for the purpose of custom styling.

```javascript
<TypographyHelper text="The 23rd of May" wrapOrdinalIndicator />
// Output: The 23<span class="ords">rd</span> of May
```

If you use a CSS-in-JS library:

```javascript
const OrdinalIndicator = styled.span`
  letter-spacing: -0.1em;
`;

<TypographyHelpertext="The 23rd of May" wrapOrdinalIndicator={OrdinalIndicator} />
// Output:The 23<span class="css-ork2sq">rd</span> of May
```

### `wrapQuotes: boolean |ReactElement | WrapQuoteElements`
Default value: `false`

- `false`: disabled
- `true`: will wrap in:
  ```javascript
  {
    leftDouble: <span className="left-double-quote" />,
    rightDouble: <span className="right-double-quote" />,
    leftSingle: <span className="left-single-quote" />,
    rightSingle: <span className="right-single-quote" />,
    double: <span className="double-quote" />,
    single: <span className="single-quote" />,
    apostrophe: <span className="apostrophe" />,
  }
  ```
- A `ReactElement` will wrap each quote character in a clone of the `ReactElement`
- A `WrapQuoteElements` will wrap each corresponding quote character in a clone of the corresponding `ReactElement`:
  ```javascript
  {
    leftDouble: ReactElement,
    rightDouble: ReactElement,
    leftSingle: ReactElement,
    rightSingle: ReactElement,
    double: ReactElement,
    single: ReactElement,
    apostrophe: ReactElement,
  }
  ```


```javascript
<TypographyHelper text="“’Em shouted, ‘free the flour!’”" wrapQuotes />
// Output: <span class="left-double-quote">“</span><span class="apostrophe">’</span>Em shouted, <span class="left-single-quote">‘</span>free the flour!<span class="right-single-quote">’</span><span class="right-double-quote">”</span>
```

Using a single element:

```javascript
<TypographyHelper text="“’Em shouted, ‘free the flour!’”" wrapQuotes={<i />} />
// Output: <i>“</i><i>’</i>Em shouted, <i>‘</i>free the flour!<i>’</i><i>”</i>
```

Using a `WrapQuoteElements`:

```javascript
<TypographyHelper 
  text="“’Em shouted, ‘free the flour!’”" 
  wrapQuotes={{
    leftDouble: <span className="ldq" />,
    rightDouble: <span className="rdq" />,
    leftSingle:<span className="lsq" />,
    rightSingle:<span className="rsq" />,
    double: <span className="dq" />,
    single: <span className="sq" />,
    apostrophe: <span className="a" />,
  }} 
/>
// Output: <span class="ldq">“</span><span class="a">’</span>Em shouted, <span class="lsq">‘</span>free the flour!<span class="rsq">’</span><span class="rdq">”</span>
```

Note: `apostrophe` and `rightSingle` both match the same character so the characters around James’ around it are used to inform which of the two it is. It isn’t perfect. Words that end in an apostrophe are matched as `rightSingle`: James’ bicycle.

### `wrapParanthesis: boolean | ReactElement | WrapParanthesisElements`
Default value: `false`

- `false`: disabled
- `true`: will wrap in:
  ```javascript
  {
    leftParanthesis: <span className="left-paren" />,
    rightParanthesis: <span className="right-paren" />,
    leftSquareParanthesis: <span className="left-square-paren" />,
    rightSquareParanthesis: <span className="right-square-paren" />,
  }
  ```
- A `ReactElement` will wrap each quote character in a clone of the `ReactElement`
- A `WrapParanthesisElements` will wrap each corresponding quote character in a clone of the corresponding `ReactElement`:
  ```javascript
  {
    leftParanthesis: ReactElement,
    rightParanthesis: ReactElement,
    leftSquareParanthesis: ReactElement,
    rightSquareParanthesis: ReactElement,
  }
  ```

```javascript
<TypographyHelper text="(Yes) [No]" wrapParanthesis />
// Output: <span class="left-paren">(</span>Yes<span class="right-paren">)</span> <span class="left-square-paren">[</span>No<span class="right-square-paren">]</span>
```

Using a single element:

```javascript
<TypographyHelper text="(Yes) [No]" wrapParanthesis={<b />} />
// Output: <b>(</b>Yes<b>)</b> <b>[</b>No<b>]</b>
```

Using a `WrapParanthesisElements`:

```javascript
<TypographyHelper 
  text="(Yes) [No]" 
  wrapParanthesis={{
    leftParanthesis: <span className="lp" />,
    rightParanthesis: <span className="rp" />,
    leftSquareParanthesis: <span className="lsp" />,
    rightSquareParanthesis: <span className="rsp" />,
  }}
/>
// Output: <span class="lp">(</span>Yes<span class="rp">)</span> <span class="lsp">[</span>No<span class="rsp">]</span>
```

### `updateOnlyWhenTextChanges: boolean`
Default value: `true`

When `true`, the component will only update the output when the `text` has changed - another way to put it is that it caches the results. It is leveraging React’s `shouldComponentUpdate` life cycle hook to accomplish this. 

This assumes the formatting props are not changing during run-time. This potentially could cause issues when formatting props are being changed during development while using a hot-module-reloading; in those cases, the formatting would not change until after a hard refresh.