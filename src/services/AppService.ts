import APIManager from 'shared/managers/APIManager';
import { RestEnds } from 'shared/Constants';

const roles = async (): Promise<any> =>
    APIManager.sendGet(RestEnds.ROLES, true);

const updateRole = async (roleData: any): Promise<any> =>
    APIManager.sendPost(RestEnds.ROLES, roleData, true);

const saveConfig = async (configData: any): Promise<any> =>
    APIManager.sendPost(RestEnds.CONFIG, configData, true);

const loadConfig = async (): Promise<any> =>
    APIManager.sendGet(RestEnds.CONFIG, true);

export const AppService = {
    roles,
    updateRole,
    saveConfig,
    loadConfig,
};
