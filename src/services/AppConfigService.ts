import APIManager from 'shared/managers/APIManager';
import { RestEnds } from 'shared/Constants';
import { AppConfigActions } from 'state/Action';
import store from 'state/RootReducer';

const appConfig = async (): Promise<any> =>
    APIManager.sendGet(RestEnds.APP_CONFIG, true);

const saveAppConfig = async (data: any): Promise<any> =>
    APIManager.sendPatch(RestEnds.APP_CONFIG, data, true);

const loadAppConfigAndSave = (): void => {
    appConfig().then((response) => {
        const { data } = response.data;
        store.dispatch(AppConfigActions.setAppConfig(data));
    });
};

export const AppConfigSerivce = {
    appConfig,
    saveAppConfig,
    loadAppConfigAndSave,
};
