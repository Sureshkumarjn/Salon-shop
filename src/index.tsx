import ReactDOM from 'react-dom/client';
import App from 'App';
import reportWebVitals from 'reportWebVitals';
import { BrowserRouter, useLocation } from 'react-router-dom';
import store, { persistor } from './state/RootReducer';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'localization/i18n';
import { ReactElement, useEffect } from 'react';

const ScrollToTop = ({ children }: any): ReactElement => {
    const location = useLocation();
    useEffect(() => {
        const element = document.getElementById('dashboard-content');
        if (element) {
            element.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    }, [location.pathname]);
    return children;
};

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <ScrollToTop>
                    <App />
                </ScrollToTop>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
