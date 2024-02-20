import APIManager from 'shared/managers/APIManager';
import { RestEnds } from 'shared/Constants';

const virtualList = async (pageNo: any, pageSize: any): Promise<any> => {
    const url = `${RestEnds.VIRTUAL_LIST}?pageNo=${pageNo}&pageSize=${pageSize}`;
    return APIManager.sendGet(url, true);
};

const deleteVirtualGift = async (virtualId: any): Promise<any> => {
    const url = `${RestEnds.DELETE_VIRTUAL}/${virtualId}`;
    return APIManager.sendDelete(url, true);
};

const addVirtualGift = async (virtualData: any): Promise<any> =>
    APIManager.sendPost(RestEnds.ADD_VIRTUAL, virtualData, true);

const editVirtualGift = async (virtualData: any): Promise<any> =>
    APIManager.sendPost(RestEnds.EDIT_VIRTUAL, virtualData, true);

export const VirtualGiftService = {
    virtualList,
    addVirtualGift,
    editVirtualGift,
    deleteVirtualGift,
};
