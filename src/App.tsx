import { ThemeProvider } from "styled-components";

import { BrowserRouter } from "react-router-dom";
import { CyclesProvider } from "./hooks/cycles";
import { Router } from "./Router";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesProvider>
          <Router />
        </CyclesProvider>
      </BrowserRouter>

      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
