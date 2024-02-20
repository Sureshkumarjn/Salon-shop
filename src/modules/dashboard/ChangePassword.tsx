import { Box, IconButton, InputAdornment, Typography } from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import { ReactElement } from 'react';
import { PasswordRuleIndicator } from 'shared/components';
import {
    AppFormikPasswordField,
    AppPrimaryButton,
} from 'shared/components/AppComponents';
import { ChangePasswordSchema } from 'validators/Authentication';
import { ProfileService, APICallBack } from 'services';
import { Toast, Utils } from 'shared/helpers';
import { IconLock } from 'shared/components/Icons';

interface IChangePassword {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}
const ChangePassword = (props: any): ReactElement => {
    const {
        onClose,
    }: {
        onClose: () => void;
    } = props;

    const changePasswordForm = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    };

    // API Calls
    const changePassword = (passwordData: any, callBack: APICallBack): void => {
        ProfileService.changePassword(passwordData)
            .then((response) => {
                Toast.showSuccessMessage('Password changed successfully');
                callBack(true, response);
            })
            .catch((error) => {
                Utils.handleErrorResponse(error);
                callBack(false, error);
            });
    };

    // UI Actions
    const actionOnFormSubmit = (
        formValues: IChangePassword,
        formik: FormikHelpers<IChangePassword>
    ): void => {
        changePassword(formValues, (status): void => {
            if (status) {
                formik.resetForm();
                onClose();
            }
            formik.setSubmitting(false);
        });
    };

    // UI Elements
    return (
        <>
            <Box className="profile-header-container px-6 pt-5">
                <Box className="profile-heading">
                    <Typography variant="h4" className="settings-style">
                        Change Password
                    </Typography>
                    <IconButton
                        title="Close"
                        aria-label="Close"
                        onClick={onClose}
                    >
                        <img
                            src="/images/icons/icon_close.svg"
                            width={20}
                            height={20}
                        />
                    </IconButton>
                </Box>
            </Box>
            <Box className="p-6">
                <Formik
                    enableReinitialize
                    initialValues={changePasswordForm}
                    validateOnMount
                    validationSchema={ChangePasswordSchema}
                    onSubmit={(formValues, formik) => {
                        actionOnFormSubmit(formValues, formik);
                    }}
                >
                    {({ values, handleSubmit, isSubmitting, isValid }) => (
                        <>
                            <AppFormikPasswordField
                                placeholder="CURRENT PASSWORD"
                                name="oldPassword"
                                inputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconLock />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <AppFormikPasswordField
                                placeholder="NEW PASSWORD"
                                name="newPassword"
                                inputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconLock />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <AppFormikPasswordField
                                placeholder="RETYPE PASSWORD"
                                name="confirmPassword"
                                inputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconLock />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <PasswordRuleIndicator
                                password={values.newPassword}
                            />

                            <AppPrimaryButton
                                fullWidth
                                className="mt-5 mb-10"
                                title="UPDATE & LOGIN"
                                disabled={!isValid || isSubmitting}
                                isLoading={isSubmitting}
                                loadingText=""
                                onClick={handleSubmit}
                            />
                        </>
                    )}
                </Formik>
            </Box>
        </>
    );
};
export default ChangePassword;
