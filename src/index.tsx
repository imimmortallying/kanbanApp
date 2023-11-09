import { render } from "react-dom";
// import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
//translation
import App from "app/App";
//RT
import {store} from './app/ReduxStore/store'; // дефолтный импорт изменил на именованный, когда поменял расширение стора с js на ts, чтобы сделать кастомные хуки
// работающие с TS
import { HashRouter } from "react-router-dom";
import ThemeProvider from "app/providers/ThemeProvider/ThemeProvider";
import "./shared/config/i18n/i18n";

// ulbi оборачивате BrowserRoute'м  корневой index.tsx. Хекслет - app.js
// Хекслет затем тут же передает внутрь routes импортированые страницы,
// улби делает это уже в апп, а не в index.tsx, при этом передает 1 компонентом AppRouter


render(
    <HashRouter>
        <Provider store={store}>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </Provider>
    </HashRouter>,

    document.getElementById('root')
)
