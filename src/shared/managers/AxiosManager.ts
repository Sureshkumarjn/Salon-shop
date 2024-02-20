import { AuthActions } from 'state/authentication/Action';
import store, { AppState } from 'state/RootReducer';
import { RestEnds } from 'shared/Constants';

const AxiosManager = require('axios');

// Axios global Config
AxiosManager.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const getState = (): AppState => {
    const state: any = store.getState();
    return state as AppState;
};
const getAccessToken = (): string => getState().authState.accessToken;
const getRefereshToken = (): string => getState().authState.refreshToken;

/**
 *  Used to modify the request headers common for all requests
 */
AxiosManager.interceptors.request.use((configInfo: any) => {
    const config = configInfo;
    // Append auth header
    if (
        config.headers['append-auth-header'] === 'true' &&
        getAccessToken() !== ''
    ) {
        config.headers.Authorization = `Bearer ${getAccessToken()}`;
    }
    return config;
});

// To refresh accessToken and retry failed requests
let isAlreadyFetchingAccessToken = false;
let subscribers: any[] = [];
const onAccessTokenFetched = (accessToken: string): void => {
    subscribers = subscribers.filter((callback) => callback(accessToken));
};

const addSubscriber = (callback: any): void => {
    subscribers.push(callback);
};

const logout = (): void => {
    store.dispatch(AuthActions.doLogout({}));
};

// Function that will be called to refresh authorization
const refreshAccessToken = (): any =>
    AxiosManager.post(
        RestEnds.REFRESH_TOKEN,
        {},
        {
            headers: {
                'x-auth-token': `bearer ${getRefereshToken()}`,
            },
        }
    )
        .then((response: any) => {
            const { accessToken, refreshToken } = response.data.data;
            store.dispatch(
                AuthActions.setLoginStatus({ accessToken, refreshToken })
            );
            isAlreadyFetchingAccessToken = false;
            onAccessTokenFetched(accessToken);
        })
        .catch(() => {
            isAlreadyFetchingAccessToken = false;
            subscribers = [];
            logout();
        });

AxiosManager.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
        const {
            config,
            response: { status },
        } = error;
        const originalRequest = config;
        if (status === 401 && config.url !== RestEnds.REFRESH_TOKEN) {
            if (!isAlreadyFetchingAccessToken) {
                isAlreadyFetchingAccessToken = true;
                refreshAccessToken();
            }
            return new Promise((resolve) => {
                addSubscriber((accessToken: string) => {
                    originalRequest.headers[
                        'x-auth-token'
                    ] = `bearer ${accessToken}`;
                    resolve(AxiosManager(originalRequest));
                });
            });
        }
        return Promise.reject(error);
    }
);

export default AxiosManager;
