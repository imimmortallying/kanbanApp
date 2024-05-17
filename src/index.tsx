import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
//translation
import App from "app/App";
//RT
import { store } from "./app/ReduxStore/store";
import { HashRouter } from "react-router-dom";
import "./shared/config/i18n/i18n";
import ThemeProvider from "shared/lib/ThemeProvider/ThemeProvider";

const root = createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </HashRouter>
);

