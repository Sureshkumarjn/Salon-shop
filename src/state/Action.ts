export enum AppConfigReduxActions {
    SET_LANG = 'SET_LANG',
    SET_APPCONFIG = 'SET_APPCONFIG',
}

const setLang = (payload: any): any => ({
    type: AppConfigReduxActions.SET_LANG,
    payload,
});

const setAppConfig = (payload: any): any => ({
    type: AppConfigReduxActions.SET_APPCONFIG,
    payload,
});

export const AppConfigActions = {
    setLang,
    setAppConfig,
};
