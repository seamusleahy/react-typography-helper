/**
 * Default elements for wrapping text
 */
import React from 'react';
export const defaultAmpersandElement = React.createElement("span", { className: "amp" });
export function wrapAmpersandElement(wrapAmpersand) {
    if (wrapAmpersand === true || wrapAmpersand === false) {
        return defaultAmpersandElement;
    }
    return wrapAmpersand;
}
export const defaultMultipleCapsElement = React.createElement("span", { className: "caps" });
export function wrapMultipleCapsElement(wrapMultipileCapitals) {
    if (wrapMultipileCapitals === true || wrapMultipileCapitals === false) {
        return defaultMultipleCapsElement;
    }
    return wrapMultipileCapitals;
}
export const defaultOrdinalIndicatorElement = React.createElement("span", { className: "ords" });
export function wrapOrdinalIndicatorElement(wrapOrdinalIndicatordinal) {
    if (wrapOrdinalIndicatordinal === true
        || wrapOrdinalIndicatordinal === false) {
        return defaultOrdinalIndicatorElement;
    }
    return wrapOrdinalIndicatordinal;
}
export const defaultWidontElement = React.createElement("span", { className: "widont" });
export function wrapWidontElement(wrapWidont) {
    if (wrapWidont === true || wrapWidont === false) {
        return defaultWidontElement;
    }
    return wrapWidont;
}
export const defaultQuoteElements = {
    leftDouble: React.createElement("span", { className: "left-double-quote" }),
    rightDouble: React.createElement("span", { className: "right-double-quote" }),
    leftSingle: React.createElement("span", { className: "left-single-quote" }),
    rightSingle: React.createElement("span", { className: "right-single-quote" }),
    double: React.createElement("span", { className: "double-quote" }),
    single: React.createElement("span", { className: "single-quote" }),
    apostrophe: React.createElement("span", { className: "apostrophe" }),
};
export function wrapQuoteElements(wrapQuotes) {
    if (wrapQuotes === true || wrapQuotes === false) {
        return defaultQuoteElements;
    }
    if (React.isValidElement(wrapQuotes)) {
        return {
            leftDouble: wrapQuotes,
            rightDouble: wrapQuotes,
            leftSingle: wrapQuotes,
            rightSingle: wrapQuotes,
            double: wrapQuotes,
            single: wrapQuotes,
            apostrophe: wrapQuotes,
        };
    }
    return wrapQuotes;
}
export const defaultParanthesisElements = {
    leftParanthesis: React.createElement("span", { className: "left-paren" }),
    rightParanthesis: React.createElement("span", { className: "right-paren" }),
    leftSquareParanthesis: React.createElement("span", { className: "left-square-paren" }),
    rightSquareParanthesis: React.createElement("span", { className: "right-square-paren" }),
};
export function wrapParanthesisElements(wrapParanthesis) {
    if (wrapParanthesis === true || wrapParanthesis === false) {
        return defaultParanthesisElements;
    }
    if (React.isValidElement(wrapParanthesis)) {
        return {
            leftParanthesis: wrapParanthesis,
            rightParanthesis: wrapParanthesis,
            leftSquareParanthesis: wrapParanthesis,
            rightSquareParanthesis: wrapParanthesis,
        };
    }
    return wrapParanthesis;
}
