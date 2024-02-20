import APIManager from 'shared/managers/APIManager';
import { RestEnds } from 'shared/Constants';

const Report = async (
    pageNo: any,
    pageSize: any,
    search: any,
    status: any
): Promise<any> => {
    const url = `${RestEnds.REPORT_LIST}?pageNo=${pageNo}&pageSize=${pageSize}&search=${search}&status=${status}`;
    return APIManager.sendGet(url, true);
};
const ReportAction = async (data: any): Promise<any> =>
    APIManager.sendPost(RestEnds.POST_REPORT_ACTION, data, true);

export const ReportedVideoService = {
    Report,
    ReportAction,
};
