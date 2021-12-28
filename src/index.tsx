import React from "react";
import ReactDOM from "react-dom";

import { Main } from "./scenes/Main/Main";

import { GlobalStyle } from "./styles/main";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />

    <Main />
  </React.StrictMode>,
  document.getElementById("root")
);
