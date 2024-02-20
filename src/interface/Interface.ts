export enum EVENT_STATUS {
    DRAFT = 'draft',
    REVIEW = 'review',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}

export enum MEDIA_STATUS {
    REVIEW = 'review',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    ARCHIVED = 'archieved',
    COMMENTED = 'commented',
    REVISED = 'revised',
}

export enum REVIEW_STATUS {
    REVIEW = 'review',
    APPROVED = 'approved',
}

export enum COMMENT_STATUS {
    APPROVED = 'approved',
    REJECTED = 'rejected',
    ARCHIVED = 'archieved',
    COMMENTED = 'commented',
    ANNOTATED = 'annotated',
    REVISED = 'revised',
}

export enum MEDIA_TYPE {
    IMAGE = 'image',
    VIDEO = 'video',
}

export enum ROLES {
    LEAD_PHOTOGRAPHER = 'lead_photo_editor',
    PHOTOGRAPHER = 'photo_editor',
    SUPER_ADMIN = 'super_admin',
}

export enum NOTIFICATION_TYPES {
    INVITED_TO_CONTRIBUTE = 'invited_to_contribute',
    ASSIGNED_FOR_REVIEW = 'assigned_for_review',
    APPROVER_COMMENTS = 'approver_commented',
    EDITOR_REUPLOAD = 'editor_reuploaded',
    FIRST_LEVEL_EDITOR_APPROVED = '1st_level_approved_editor',
    Level_ONE_TO_LEVEL_TWO = '1st_level_approved_2nd_approver',
    SECOND_LEVEL_EDITOR_APPROVED = '2nd_level_approved_editor',
    Level_TWO_TO_LEVEL_THREE = '2nd_level_approved_3rd_approver',
    THIRD_LEVEL_EDITOR_APPROVED = '3rd_level_approved_editor',
    UPLOAD_EXPIRY_NOTIFICATION = 'upload_expiry_notification',
}

export enum IEmailNotificationType {
    'Approver Commented' = 'approver_commented',
    'Invited To Contribute' = 'invited_to_contribute',
    'Media Uploaded' = 'media_uploaded',
    'Assigned For Review' = 'assigned_for_review',
    'First Level Editor Approved' = '1st_level_approved_editor',
    'Second Level Editor Approved' = '2nd_level_approved_editor',
    'Third Level Editor Approved' = '3rd_level_approved_editor',
    'Review Completed' = 'review_completed',
}

export interface IRole {
    roleId: string;
    title: string;
    roleKey: ROLES;
    approverLevel: number;
    createdAt: string;
    updatedAt: string;
}

export interface IAdminUser {
    userId: string;
    name: string;
    username: string;
    phoneNumber: string;
    countryCode: string;
    city: string;
    country: string;
    sex: string;
    dateOfBirth: string;
    email: any;
    profileImage: string;
    otpVerificationCode: string;
    otpVerificationExpiredAt: string;
    otpVerificationAttempt: number;
    isVerified: number;
    forgotPasswordVerificationCode: any;
    forgotPasswordVerificationExpiredAt: any;
    forgotPasswordVerificationAttempt: number;
    isBlocked: number;
    isDeleted: number;
    createdAt: string;
    updatedAt: string;
}

export interface INotification {
    notificationId: string;
    title: string;
    message: string;
    isRead: number;
    metaData: string;
    notificationType: string;
    createdAt: string;
    updatedAt: string;
}

export interface IEvent {
    eventId: string;
    title: string;
    eventDate: string;
    status: string;
    approvedAt: string;
    archievedAt: string;
    location: string;
    caption: string;
    uploadDuration: string;
    isDeleted: number;
    submittedAt: string;
    createdAt: string;
    updatedAt: string;
}

export interface IApplicationLogs {
    logId: string;
    filepath: string;
    filename: string;
    logdate: string;
    isEmpty: number;
    createdAt: string;
    updatedAt: string;
}
export interface IEmailLogs {
    emailNotificationId: string;
    isDelivered: number;
    notificationType: string;
    subject: string;
    createdAt: string;
    updatedAt: string;
    user: IAdminUser;
    event: IEvent;
}

export interface IConfigrmForm {
    smtpHostName: string;
    smtpPort: string;
    smtpUserEmail: string;
    smtpPassword: string;
    otpValidTill: string;
    otpRetryAttempts: string;
    otpTryAgain: string;
    archiveAfter: string;
    imageFileSize: string;
    videoFileSize: string;
    logNotifiers: string;
}

export interface IAppLogForm {
    fromDate: string;
    toDate: string;
}

export interface IEmailLogForm extends IAppLogForm {
    template: string[];
}
