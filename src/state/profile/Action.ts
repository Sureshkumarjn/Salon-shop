export enum ProfileReduxActions {
    SET_PROFILE_DATA = 'SET_PROFILE_DATA',
    SET_NOTIFICATION = 'SET_NOTIFICATION',
    SET_NOTIFICATION_COUNT = 'SET_NOTIFICATION_COUNT',
    RESET_NOTIFICATION = 'RESET_NOTIFICATION',
}

const setProfileData = (payload: any): any => ({
    type: ProfileReduxActions.SET_PROFILE_DATA,
    payload,
});

const setNotification = (payload: any): any => ({
    type: ProfileReduxActions.SET_NOTIFICATION,
    payload,
});

const resetNotifiction = (payload: any): any => ({
    type: ProfileReduxActions.RESET_NOTIFICATION,
    payload,
});

const setNotificationCount = (payload: any): any => ({
    type: ProfileReduxActions.SET_NOTIFICATION_COUNT,
    payload,
});

export const ProfileActions = {
    setProfileData,
    setNotification,
    resetNotifiction,
    setNotificationCount,
};
