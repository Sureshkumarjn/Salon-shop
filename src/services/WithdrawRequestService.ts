import APIManager from 'shared/managers/APIManager';
import { RestEnds } from 'shared/Constants';

const withdrawRequestList = async (queryParams: any): Promise<any> => {
    const url = `${RestEnds.WITHDRAW_REQUEST_LIST}?${queryParams}`;
    return APIManager.sendGet(url, true);
};

const updateRequest = async (requestData: any): Promise<any> =>
    APIManager.sendPost(RestEnds.UPDATE_WITHDRAW_REQUEST, requestData, true);

export const WithdrawRequestService = {
    withdrawRequestList,
    updateRequest,
};
