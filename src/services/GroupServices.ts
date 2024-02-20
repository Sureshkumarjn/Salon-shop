import { RestEnds } from 'shared/Constants';
import APIManager from 'shared/managers/APIManager';

const group = async (
    pageNo: any,
    pageSize: any,
    search: any,
    status: any
): Promise<any> => {
    const url = `${RestEnds.GROUP_LIST}?pageNo=${pageNo}&pageSize=${pageSize}&search=${search}&status=${status}`;
    return APIManager.sendGet(url, true);
};

const groupMembers = async (
    pageNo: any,
    pageSize: any,
    search: any,
    groupId: any
): Promise<any> => {
    const url = `${RestEnds.GROUP_MEMBERS}?pageNo=${pageNo}&pageSize=${pageSize}&search=${search}&groupId=${groupId}`;
    return APIManager.sendGet(url, true);
};

export const GroupServices = {
    group,
    groupMembers,
};
