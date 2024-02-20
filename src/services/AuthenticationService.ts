import APIManager from 'shared/managers/APIManager';
import { RestEnds } from 'shared/Constants';

const register = async (data: any): Promise<any> =>
    APIManager.sendPost(RestEnds.REGISTER, data, false);

const login = async (data: any): Promise<any> =>
    APIManager.sendPost(RestEnds.LOGIN, data, false);

const forgotPassword = async (data: any): Promise<any> =>
    APIManager.sendPost(RestEnds.FORGOT_PASSWORD, data, false);

const verifyOTP = async (data: any): Promise<any> =>
    APIManager.sendPost(RestEnds.VERIFY_CODE, data, false);

const resetPassword = async (data: any): Promise<any> =>
    APIManager.sendPost(RestEnds.RESET_PASSWORD, data, false);

const logout = async (): Promise<any> =>
    APIManager.sendPost(RestEnds.LOGOUT, {}, true);

export const AuthenticationService = {
    register,
    login,
    forgotPassword,
    verifyOTP,
    resetPassword,
    logout,
};
