import { LanguageConfig } from 'state/Reducer';

export const CURRENCY = 'SAR';
export const RestEnds = {
    // Authentication
    LOGIN: '/v1/auth/login',
    REGISTER: '/v1/auth/register',
    FORGOT_PASSWORD: '/v1/auth/forgot/password',
    VERIFY_CODE: '/v1/auth/verify/verificationcode',
    RESET_PASSWORD: '/v1/auth/reset/password',

    // Profile
    PROFILE: '/v1/profile',
    PROFILE_IMAGE: '/v1/profile/image',
    CHANGE_PASSWORD: '/v1/profile/change/password',
    LOGOUT: '/v1/profile/logout',
    REFRESH_TOKEN: '/v1/auth/token',

    // Notifiction
    NOTIFICATIONS: (resourceId: string, pageSize: number) =>
        `/v1/notification/${resourceId}/${pageSize}`,
    NOTIFICATION_READ: '/v1/notification/read',

    // Users
    USERS_LIST: 'v1/user',
    USER: `/v1/user`,
    ADD_USER: `/v1/user/register`,
    EDIT_USER: `/v1/user/edit`,
    USER_BLOCK: '/v1/user/block',
    USER_ARCHIVE_STATUS: '/v1/user/archieve/access',
    USER_COMMISSION: (userId: string) => `/v1/user/${userId}/commission`,

    // Community
    ADD_COMMUNITY: `/v1/community`,
    COMMUNITY_UPDATE: `/v1/community/update`,
    COMMUNITY_MANAGERS: `/v1/community/find/managers`,

    // Report
    REPORT_LIST: `/v1/post/report`,
    POST_REPORT_ACTION: `/v1/post/report/action`,

    // SpotLight
    SPOTLIGHT_LIST: `/v1/post`,
    COMMENTS: (postId: any) => `/v1/post/${postId}/comments`,
    DELETE_COMMENT: (commentId: any) => `/v1/post/comment/${commentId}`,
    BLOCK_POST: `/v1/post/block/status`,

    // Lock Config
    LOCK_CONFIG: `/v1/config`,
    ADD_LOCK_CONFIG: `/v1/config`,
    EDIT_LOCK_CONFIG: `/v1/config`,
    DELETE_LOCK_CONFIG: (configId: string) => `/v1/config/${configId}`,

    // App  Config
    APP_CONFIG: `/v1/application`,

    // Group
    GROUP_LIST: 'v1/group',
    GROUP_MEMBERS: 'v1/group/members',

    // Application
    ROLES: '/v1/roles',
    CONFIG: '/v1/app/settings',

    // Subscription
    SUBSCRIPTION: '/v1/subscription',
    SUBSCRIPTION_UPDATE: '/v1/subscription/update',

    // Logs
    EMAIL_LOG_LIST: (
        limit: any,
        offset: any,
        template: string,
        fromDate: string,
        toDate: string
    ) =>
        `/v1/logs/email?pageNo=${offset}&pageSize=${limit}&fromDate=${fromDate}&toDate=${toDate}&template=${template}`,
    CURRENT_LOG: () => `/v1/logs/current`,
    LOG_LIST: (limit: any, offset: any, fromDate: string, toDate: string) =>
        `/v1/logs?pageNo=${offset}&pageSize=${limit}&fromDate=${fromDate}&toDate=${toDate}`,

    // Package
    PACKAGE_LIST: 'v1/points-package',
    DELETE_PACKAGE: `v1/points-package`,
    ADD_PACKAGE: 'v1/points-package',
    EDIT_PACKAGE: 'v1/points-package/update',

    // Virtual
    VIRTUAL_LIST: 'v1/virtual-gift',
    DELETE_VIRTUAL: `v1/virtual-gift`,
    ADD_VIRTUAL: 'v1/virtual-gift',
    EDIT_VIRTUAL: 'v1/virtual-gift/update',

    // Withdraw Request
    WITHDRAW_REQUEST_LIST: 'v1/withdraw',
    UPDATE_WITHDRAW_REQUEST: 'v1/withdraw/action',
};

export const EXPORT_PAGE_SIZE = 100;

export const LANGUAGES: LanguageConfig[] = [
    {
        language: 'English',
        languageKey: 'en',
        direction: 'ltr',
    },
    {
        language: 'Arabic',
        languageKey: 'ar',
        direction: 'rtl',
    },
];
