import { createGlobalStyle } from "styled-components";
import { METER_TO_PIXEL_FACTOR } from "../constants";

const proportionalFontSize = `${METER_TO_PIXEL_FACTOR * 6.25}%`;

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: ${proportionalFontSize};
    overflow: hidden;
  }
`;
