import ApiManager from 'shared/managers/APIManager';
import { RestEnds } from 'shared/Constants';

const usersList = async (queryParams: any): Promise<any> => {
    const url = `${RestEnds.USERS_LIST}?${queryParams}`;
    return ApiManager.sendGet(url, true);
};

const deleteUser = async (userId: any): Promise<any> => {
    const url = `${RestEnds.USER}/${userId}`;
    return ApiManager.sendDelete(url, true);
};

const userProfile = async (userId: any): Promise<any> => {
    const url = `${RestEnds.USER}/${userId}`;
    return ApiManager.sendGet(url, true);
};

const updateUserCommission = async (userId: any, data: any): Promise<any> =>
    ApiManager.sendPatch(RestEnds.USER_COMMISSION(userId), data, true);

const addUser = async (userData: any): Promise<any> =>
    ApiManager.sendPost(RestEnds.ADD_USER, userData, true);

const editUser = async (userData: any): Promise<any> =>
    ApiManager.sendPost(RestEnds.EDIT_USER, userData, true);

// const changeAccountStatus = async (statusData: any): Promise<any> =>
//     ApiManager.sendPost(RestEnds.USER_STATUS, statusData, true);

const changeArchiveStatus = async (statusData: any): Promise<any> =>
    ApiManager.sendPost(RestEnds.USER_ARCHIVE_STATUS, statusData, true);

const blockUser = async (userData: any): Promise<any> =>
    ApiManager.sendPost(RestEnds.USER_BLOCK, userData, true);

export const UserService = {
    addUser,
    editUser,
    usersList,
    userProfile,
    deleteUser,
    blockUser,
    changeArchiveStatus,
    updateUserCommission,
};
