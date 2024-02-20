import APIManager from 'shared/managers/APIManager';
import { RestEnds } from 'shared/Constants';

const packageList = async (pageNo: any, pageSize: any): Promise<any> => {
    const url = `${RestEnds.PACKAGE_LIST}?pageNo=${pageNo}&pageSize=${pageSize}`;
    return APIManager.sendGet(url, true);
};

const deletePackage = async (packageId: any): Promise<any> => {
    const url = `${RestEnds.DELETE_PACKAGE}/${packageId}`;
    return APIManager.sendDelete(url, true);
};

const addPackage = async (userData: any): Promise<any> =>
    APIManager.sendPost(RestEnds.ADD_PACKAGE, userData, true);

const editPackage = async (userData: any): Promise<any> =>
    APIManager.sendPost(RestEnds.EDIT_PACKAGE, userData, true);

export const PointsPackagesService = {
    packageList,
    addPackage,
    editPackage,
    deletePackage,
};
