import * as Yup from 'yup';

const RoleSchema = Yup.object().shape({
    title: Yup.string()
        .max(64, 'Role title can have maximum of 64 characters at maximum')
        .required('Role title is required'),
});

const SMPTConfigSchema = Yup.object().shape({
    smtpHostName: Yup.string()
        .max(256, 'Host name can have maximum of 256 characters at maximum')
        .required('Host name is required'),
    smtpPort: Yup.number()
        .min(0, 'Please enter port number above 0')
        .required('Port is required'),
    smtpUserEmail: Yup.string()
        .email('Enter valid SMTP email')
        .required('SMTP Email is required')
        .max(64, 'SMTP Email can have maximum of 64 characters at maximum'),
    smtpPassword: Yup.string()
        .min(6, 'Password must be 6 characters at minimum!')
        .max(24, 'Password must be 24 characters at maximum!')
        .required('Password is required'),
    // otpValidTill: Yup.number()
    //     .min(1, 'Please enter valid duration')
    //     .required('OTP Valid duration is required'),
    // otpRetryAttempts: Yup.number()
    //     .min(1, 'Please enter valid retry attempts')
    //     .required('OTP retry attempts is required'),
    // otpTryAgain: Yup.number()
    //     .min(1, 'Please enter valid try again in hours')
    //     .required('OTP try after is required'),
    // archiveAfter: Yup.number()
    //     .min(1, 'Please enter valid archive after in hours')
    //     .required('Archive after is required'),
});

const LogConfigSchema = Yup.object().shape({
    logNotifiers: Yup.string()
        .email('Enter valid Log receiver email')
        .required('Log receiver email is required')
        .max(
            64,
            'Log receiver email can have maximum of 64 characters at maximum'
        ),
});

const HourConfigSchema = Yup.object().shape({
    hours: Yup.number()
        .typeError('Hours must be a number')
        .required('Hours is required')
        .min(1, 'Hours should be minimum of 1')
        .max(240, 'Hours can be maximum of 240'),
    minutes: Yup.number()
        .typeError('Minutes must be a number')
        .required('Minutes is required')
        .min(0, 'Minutes should be minimum of 0')
        .max(59, 'Minutes can be maximum of 59'),
});

const MinuteConfigSchema = Yup.object().shape({
    minutes: Yup.number()
        .typeError('Minutes must be a number')
        .required('Minutes is required')
        .min(1, 'Minutes should be minimum of 1')
        .max(120, 'Minutes can be maximum of 120'),
});

const RetryAttempsSchema = Yup.object().shape({
    value: Yup.number()
        .typeError('Retry attempts must be a number')
        .required('Retry attempts is required')
        .min(1, 'Retry attempts should be minimum of 1')
        .max(20, 'Retry attempts can be maximum of 20'),
});

const ImageSizeSchema = Yup.object().shape({
    value: Yup.number()
        .typeError('Image size must be a number')
        .required('Image size is required')
        .min(1, 'Image size should be minimum of 1 MB')
        .max(50, 'Image size can be maximum of 50 MB'),
});

const VideoSizeSchema = Yup.object().shape({
    value: Yup.number()
        .typeError('Video size must be a number')
        .required('Video size is required')
        .min(1, 'Video size should be minimum of 1 MB')
        .max(5120, 'Video size can be maximum of 5120 MB'),
});

export {
    RoleSchema,
    SMPTConfigSchema,
    HourConfigSchema,
    MinuteConfigSchema,
    RetryAttempsSchema,
    ImageSizeSchema,
    VideoSizeSchema,
    LogConfigSchema,
};
