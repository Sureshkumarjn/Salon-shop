import { ReactElement, Suspense, useEffect } from 'react';
import 'assets/styles/App.scss';
import { useRoutes } from 'react-router-dom';
import routeElements from 'routes/Routes';
import { useSelector } from 'react-redux';
import { LinearProgress, ThemeProvider } from '@mui/material';
import theme from 'assets/styles/theme';
import { AppState } from './state/RootReducer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { AppConfigState } from 'state/Reducer';

const App = (): ReactElement => {
    const { i18n } = useTranslation();

    const isUserLoggedIn = useSelector(
        (state: AppState) => state.authState.isUserLoggedIn
    );
    const appConfig: AppConfigState = useSelector(
        (state: AppState) => state.appConfig
    );
    const routes = useRoutes(routeElements(isUserLoggedIn));

    useEffect(() => {
        i18n.changeLanguage(appConfig.language.language);
    }, [appConfig]);

    return (
        <div dir={appConfig.language.direction}>
            <ThemeProvider theme={theme}>
                <ToastContainer
                    // position="bottom-left"
                    autoClose={5000}
                    closeOnClick
                />
                <Suspense fallback={<LinearProgress color="primary" />}>
                    {routes}
                </Suspense>
            </ThemeProvider>
        </div>
    );
};
export default App;
