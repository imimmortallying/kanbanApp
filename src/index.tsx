import { render } from "react-dom";
import { Provider } from "react-redux";
//translation
import App from "app/App";
//RT
import { store } from "./app/ReduxStore/store";
import { HashRouter } from "react-router-dom";
import ThemeProvider from "app/providers/ThemeProvider/ThemeProvider";
import "./shared/config/i18n/i18n";

render(
  <HashRouter>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </HashRouter>,

  document.getElementById("root")
);
