export enum AuthReduxActions {
    AUTH_SET_LOGIN_STATUS = 'AUTH_SET_LOGIN_STATUS',
    LOGOUT = 'LOGOUT',
    SET_LANG = 'SET_LANG',
}

const setLoginStatus = (payload: any): any => ({
    type: AuthReduxActions.AUTH_SET_LOGIN_STATUS,
    payload,
});
const setLang = (payload: any): any => ({
    type: AuthReduxActions.SET_LANG,
    payload,
});

const doLogout = (payload: any): any => ({
    type: AuthReduxActions.LOGOUT,
    payload,
});

export const AuthActions = {
    setLoginStatus,
    doLogout,
    setLang,
};
