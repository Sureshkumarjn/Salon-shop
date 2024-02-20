import ApiManager from 'shared/managers/APIManager';
import { RestEnds } from 'shared/Constants';

const addCommunity = async (userData: any): Promise<any> =>
    ApiManager.sendPost(RestEnds.ADD_COMMUNITY, userData, true);

const editCommunity = async (userData: any): Promise<any> =>
    ApiManager.sendPost(RestEnds.COMMUNITY_UPDATE, userData, true);

// Users list to add as manage
const managersList = async (queryParams: string): Promise<any> =>
    ApiManager.sendGet(`${RestEnds.COMMUNITY_MANAGERS}?${queryParams}`, true);

export const CommunityService = {
    addCommunity,
    editCommunity,
    managersList,
};
