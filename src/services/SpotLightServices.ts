import APIManager from 'shared/managers/APIManager';
import { RestEnds } from 'shared/Constants';

// const spotLight = async (pageNo: any, pageSize: any): Promise<any> => {
//     const url = `${RestEnds.SPOTLIGHT_LIST}?pageNo=${pageNo}&pageSize=${pageSize}&blockStatus=2`;
//     return APIManager.sendGet(url, true);
// };
const spotLight = async (
    pageNo: any,
    pageSize: any,
    search: any,
    status: any
): Promise<any> => {
    const url = `${RestEnds.SPOTLIGHT_LIST}?pageNo=${pageNo}&pageSize=${pageSize}&search=${search}&status=${status}`;
    return APIManager.sendGet(url, true);
};

// const comments = async (postId: string): Promise<any> =>
//     APIManager.sendGet(RestEnds.COMMENTS(postId), true);

const comments = async (
    postId: string,
    pageNo: any,
    pageSize: any
): Promise<any> => {
    const url = `${RestEnds.COMMENTS(
        postId
    )}?pageNo=${pageNo}&pageSize=${pageSize}`;
    return APIManager.sendGet(url, true);
};

const deleteComment = async (commentId: string): Promise<any> => {
    const url = `${RestEnds.DELETE_COMMENT(commentId)}`;
    return APIManager.sendDelete(url, true);
};

const blockPost = async (data: any): Promise<any> =>
    APIManager.sendPost(RestEnds.BLOCK_POST, data, true);

export const SpotLightService = {
    spotLight,
    comments,
    deleteComment,
    blockPost,
};
