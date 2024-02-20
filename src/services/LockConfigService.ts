import APIManager from 'shared/managers/APIManager';
import { RestEnds } from 'shared/Constants';

const lockConfig = async (): Promise<any> =>
    APIManager.sendGet(RestEnds.LOCK_CONFIG, true);

const addLockConfig = async (data: any): Promise<any> =>
    APIManager.sendPost(RestEnds.ADD_LOCK_CONFIG, data, true);

const UpdateLockConfig = async (data: any): Promise<any> =>
    APIManager.sendPatch(RestEnds.EDIT_LOCK_CONFIG, data, true);

const deleteLockConfig = async (configId: string): Promise<any> =>
    APIManager.sendDelete(RestEnds.DELETE_LOCK_CONFIG(configId), true);

export const LockConfigService = {
    lockConfig,
    addLockConfig,
    UpdateLockConfig,
    deleteLockConfig,
};
