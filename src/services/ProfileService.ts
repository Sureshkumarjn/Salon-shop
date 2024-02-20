import APIManager from 'shared/managers/APIManager';
import { RestEnds } from 'shared/Constants';
import store from 'state/RootReducer';
import { ProfileActions } from 'state/profile/Action';

const getProfile = async (): Promise<any> =>
    APIManager.sendGet(RestEnds.PROFILE, true);

const loadProfile = (): void => {
    getProfile().then((response) => {
        const { data } = response.data;
        store.dispatch(ProfileActions.setProfileData(data));
    });
};

const changePassword = async (passwordData: any): Promise<any> =>
    APIManager.sendPost(RestEnds.CHANGE_PASSWORD, passwordData, true);

const logout = async (): Promise<any> =>
    APIManager.sendDelete(RestEnds.LOGOUT, true);

const updateProfileImage = async (imageData: any): Promise<any> =>
    APIManager.sendPost(RestEnds.PROFILE_IMAGE, imageData, true);

const getNotifications = async (
    resourceId: string,
    pageSize: number
): Promise<any> =>
    APIManager.sendGet(RestEnds.NOTIFICATIONS(resourceId, pageSize), true);

const markNotificationAsRead = async (data: any): Promise<any> =>
    APIManager.sendPost(RestEnds.NOTIFICATION_READ, data, true);

const loadNotifictionAndSave = (
    resourceId: string,
    pageSize: number
): Promise<void> =>
    new Promise((resolve) => {
        getNotifications(resourceId, pageSize).then((response) => {
            const { results, unreadCount } = response.data.data;
            const hasMoreRecord = pageSize === results.length;
            store.dispatch(ProfileActions.setNotificationCount(unreadCount));
            store.dispatch(
                ProfileActions.setNotification({
                    notifications: results,
                    hasMoreRecord,
                })
            );
            resolve();
        });
    });

export const ProfileService = {
    logout,
    loadProfile,
    changePassword,
    updateProfileImage,
    getNotifications,
    markNotificationAsRead,
    loadNotifictionAndSave,
};
