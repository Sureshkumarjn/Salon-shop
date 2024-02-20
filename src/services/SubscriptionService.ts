import APIManager from 'shared/managers/APIManager';
import { RestEnds } from 'shared/Constants';

const createSubscription = async (data: any): Promise<any> =>
    APIManager.sendPost(RestEnds.SUBSCRIPTION, data, true);

const updateSubscription = async (data: any): Promise<any> =>
    APIManager.sendPost(RestEnds.SUBSCRIPTION_UPDATE, data, true);

const subscriptionList = async (pageNo: any, pageSize: any): Promise<any> => {
    const url = `${RestEnds.SUBSCRIPTION}?pageNo=${pageNo}&pageSize=${pageSize}`;
    return APIManager.sendGet(url, true);
};

const deleteSubscription = async (subscriptionId: string): Promise<any> =>
    APIManager.sendDelete(`${RestEnds.SUBSCRIPTION}/${subscriptionId}`, true);

export const SubscriptionService = {
    createSubscription,
    updateSubscription,
    subscriptionList,
    deleteSubscription,
};
