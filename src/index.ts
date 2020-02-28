export { applyWidont, applyWrapWidont } from './widont';
export {
  applySmartDashes,
  applySmartEllipsis,
  applySmartQuotes,
} from './replace';
export {
  applyWrapAmpsersand,
  applyWrapMultipleCaps,
  applyWrapOrdinalIndicator,
  applyWrapParanthesis,
  applyWrapQuotes,
  newElementToken,
  newElementTokenWithText,
  newTextToken,
  createReactFragmentFromTokenList,
  createTokenListFromString,
} from './wrap';
import TypographyHacks from './TypographyHacks';

export default TypographyHacks;
