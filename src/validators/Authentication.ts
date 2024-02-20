import * as Yup from 'yup';

const LoginSchema = (t: any): any =>
    Yup.object().shape({
        phoneNumber: Yup.string()
            .required(t('LoginValidation.PhoneNoRequired'))
            .matches(
                /^([0-9]{7,20}$)/,
                'Phone number must have minimum of 7 digits and maximum of 20 digits'
            ),

        password: Yup.string().required(t('LoginValidation.PasswordRequired')),
    });

const ForgotPasswordSchema = (t: any): any =>
    Yup.object().shape({
        phoneNumber: Yup.string()
            .required(t('LoginValidation.PhoneNoRequired'))
            .matches(
                /^([0-9]{7,20}$)/,
                'Phone number must have minimum of 7 digits and maximum of 20 digits'
            ),
    });

const ResetPasswordSchema = (t: any): any =>
    Yup.object().shape({
        password: Yup.string()
            .min(8, t('ResetPasswordValidation.PasswordMin'))
            .max(16, t('ResetPasswordValidation.PasswordMax'))
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}/,
                t('ResetPasswordValidation.PasswordPattern')
            )
            .required(t('ResetPasswordValidation.PasswordRequired')),
        confirmPassword: Yup.string()
            .required(t('ResetPasswordValidation.RetypePasswordRequired'))
            .oneOf(
                [Yup.ref('password'), null],
                t('ResetPasswordValidation.RetypePasswordMatch')
            ),
    });

const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string()
        // .min(8, 'Current Password must be 8 characters at minimum!')
        // .max(16, 'Current Password must be 15 characters at maximum!')
        // .matches(
        //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}/,
        //     'Current Password must contain uppercase, lowercase, number, special character and ranging from 8-16 characters'
        // )
        .required('Current Password is required'),
    newPassword: Yup.string()
        .min(8, 'Password must be 8 characters at minimum!')
        .max(16, 'Password must be 15 characters at maximum!')
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}/,
            'Password must contain uppercase, lowercase, number, special character and ranging from 8-16 characters'
        )
        .required('Password is required'),
    confirmPassword: Yup.string()
        .required('Retype password is required')
        .oneOf(
            [Yup.ref('newPassword'), null],
            'Password and Retype Password should match'
        ),
});

export {
    LoginSchema,
    ForgotPasswordSchema,
    ResetPasswordSchema,
    ChangePasswordSchema,
};
