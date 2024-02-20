import ApiManager from 'shared/managers/APIManager';
import { RestEnds } from 'shared/Constants';

const emailLogList = async (
    limit: any,
    offset: any,
    template: string,
    fromDate: string,
    toDate: string
): Promise<any> =>
    ApiManager.sendGet(
        RestEnds.EMAIL_LOG_LIST(offset, limit, template, fromDate, toDate),
        true
    );

const appCurrentLog = async (): Promise<any> =>
    ApiManager.sendGet(RestEnds.CURRENT_LOG(), true);

const appLogList = async (
    limit: any,
    offset: any,
    fromDate: string,
    toDate: string
): Promise<any> =>
    ApiManager.sendGet(
        RestEnds.LOG_LIST(offset, limit, fromDate, toDate),
        true
    );

export const LogService = {
    emailLogList,
    appLogList,
    appCurrentLog,
};
