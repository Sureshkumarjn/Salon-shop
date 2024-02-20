import {
    Box,
    Typography,
    InputAdornment,
    IconButton,
    Button,
} from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import { ReactElement, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppFormikPasswordField,
    AppFormikTextField,
    AppPrimaryButton,
} from 'shared/components/AppComponents';
import {
    ForgotPasswordSchema,
    ResetPasswordSchema,
} from 'validators/Authentication';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import OtpInput from 'react-otp-input';
import { PasswordRuleIndicator } from 'shared/components';
import { APICallBack, AuthenticationService } from 'services';
import { Utils, Toast } from 'shared/helpers';
import Countdown from 'react-countdown';
import { useTranslation } from 'react-i18next';
import { IconLock } from 'shared/components/Icons';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';

interface IForgotForm {
    phoneNumber: string;
    countryCode: string;
}
interface IResetForm {
    password: string;
    confirmPassword: string;
}

const OTP_DURATION = 1;
const ForgotPassword = (): ReactElement => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isExpired, setIsExpired] = useState(false);
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState('');
    const [verifyingOTP, setVerifyingOTP] = useState(false);
    const [resending, setResending] = useState(false);
    const [forgotForm, setForgotForm] = useState<IForgotForm>({
        phoneNumber: '',
        countryCode: '+91',
    });

    const resetForm: IResetForm = {
        password: '',
        confirmPassword: '',
    };

    const phoneNumber = useMemo(() => forgotForm.phoneNumber, [forgotForm]);

    // API Calls
    const forgotPassword = (forgotData: any, callBack: APICallBack): void => {
        AuthenticationService.forgotPassword({ ...forgotData })
            .then((response) => {
                Utils.handleSuccessResponse(response);
                callBack(true, response);
            })
            .catch((error) => {
                Utils.handleErrorResponse(error);
                callBack(false, error);
            });
    };
    const verifyOTP = (otpData: any, callBack: APICallBack): void => {
        AuthenticationService.verifyOTP(otpData)
            .then((response) => {
                callBack(true, response);
            })
            .catch((error) => {
                Utils.handleErrorResponse(error);
                callBack(false, error);
            });
    };
    const resetPassword = (resetData: any, callBack: APICallBack): void => {
        AuthenticationService.resetPassword(resetData)
            .then((response) => {
                Utils.handleSuccessResponse(response);
                callBack(true, response);
            })
            .catch((error) => {
                Utils.handleErrorResponse(error);
                callBack(false, error);
            });
    };

    // UI Actions
    const actionNavigateToLogin = (): void => {
        navigate(-1);
    };
    const actionGoBack = (): void => {
        setStep(step - 1);
    };
    const actionGoToBegin = (): void => {
        setStep(1);
    };
    const actionVerifyOTP = (): void => {
        setVerifyingOTP(true);
        verifyOTP(
            { verificationCode: otp, ...forgotForm },
            (status, response): void => {
                if (status) {
                    const { valid } = response.data.data;
                    if (valid) {
                        setStep(3);
                    } else {
                        Toast.showErrorMessage(response.data.message);
                    }
                }
                setVerifyingOTP(false);
            }
        );
    };
    const actionOnForgotFormSubmit = (
        formValues: IForgotForm,
        formik: FormikHelpers<IForgotForm>
    ): void => {
        forgotPassword(formValues, (status, response): void => {
            if (status) {
                const { verificationCode } = response.data.data;
                if (verificationCode) {
                    setOtp(verificationCode);
                }
                setStep(2);
                setForgotForm(formValues);
            }
            setIsExpired(false);
            formik.setSubmitting(false);
        });
    };
    const actionResendCode = (): void => {
        setResending(true);
        forgotPassword(forgotForm, (status, response): void => {
            if (status) {
                const { verificationCode } = response.data.data;
                if (verificationCode) {
                    setOtp(verificationCode);
                }
                setIsExpired(false);
            }
            setResending(false);
        });
    };
    const actionOnRestFormSubmit = (
        formValues: IResetForm,
        formik: FormikHelpers<IResetForm>
    ): void => {
        resetPassword(
            {
                ...formValues,
                verificationCode: otp,
                ...forgotForm,
            },
            (status): void => {
                if (status) {
                    navigate('/login', { replace: true });
                }
                formik.setSubmitting(false);
            }
        );
    };

    // UI Elements
    return (
        <Box className="auth-wrapper">
            <Box className="auth-box-wrapper">
                <Box className="auth-box">
                    <Box className="form-container mb-0">
                        <Box className="logo-style mb-9">
                            <img width={60} src="/images/logo.svg" />
                        </Box>

                        {step === 1 && (
                            <>
                                <Box className="align-center">
                                    <IconButton
                                        title="Go back"
                                        className=""
                                        onClick={actionNavigateToLogin}
                                    >
                                        <ArrowBackIcon color="primary" />
                                    </IconButton>
                                    <Typography
                                        variant="h5"
                                        className="text-primary"
                                    >
                                        {t('ForgotPasswordPage.Title')}
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="body2"
                                    className="my-4"
                                    align="center"
                                >
                                    {t('ForgotPasswordPage.Intro')}
                                </Typography>
                                <Formik
                                    enableReinitialize
                                    initialValues={forgotForm}
                                    validateOnMount
                                    validationSchema={ForgotPasswordSchema(t)}
                                    onSubmit={(formValues, formik) => {
                                        actionOnForgotFormSubmit(
                                            formValues,
                                            formik
                                        );
                                    }}
                                >
                                    {({
                                        handleSubmit,
                                        isSubmitting,
                                        isValid,
                                    }) => (
                                        <Box className="mb-12">
                                            <AppFormikTextField
                                                type="text"
                                                size="medium"
                                                placeholder={t(
                                                    'LoginPage.Input.Phone'
                                                )}
                                                name="phoneNumber"
                                                inputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <CallOutlinedIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />

                                            <AppPrimaryButton
                                                fullWidth
                                                title={t(
                                                    'ForgotPasswordPage.Btn.Continue'
                                                )}
                                                disabled={
                                                    !isValid || isSubmitting
                                                }
                                                isLoading={isSubmitting}
                                                loadingText=""
                                                onClick={handleSubmit}
                                            />
                                        </Box>
                                    )}
                                </Formik>
                                {/* <Typography className="mt-21" variant="body2">
                                    {t('ForgotPasswordPage.ForgotEmailAddress')}
                                </Typography> */}

                                {/* <Typography
                                    className="text-black mb-6"
                                    variant="h6"
                                    title="Contact Dev Support"
                                    aria-label="Contact Dev Support"
                                >
                                    {t('ForgotPasswordPage.Contact')}
                                    <b>
                                        {' '}
                                        "{t('ForgotPasswordPage.DevSupport')}"
                                    </b>
                                </Typography> */}
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <Box className="align-center">
                                    <IconButton
                                        title="Go back"
                                        className=""
                                        onClick={actionGoBack}
                                    >
                                        <ArrowBackIcon color="primary" />
                                    </IconButton>
                                    <Typography
                                        variant="h5"
                                        className="text-primary"
                                    >
                                        {t(
                                            'ForgotPasswordPage.VerificationTitle'
                                        )}
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="body2"
                                    className="my-3"
                                    align="center"
                                >
                                    Enter the verification code sent to your
                                    phone number <b>"{phoneNumber}"</b> to
                                    verify this account recovery
                                </Typography>
                                <OtpInput
                                    containerStyle="otp-container"
                                    inputStyle="otp-input"
                                    value={otp}
                                    onChange={(code: string) => {
                                        setOtp(code);
                                    }}
                                    numInputs={4}
                                />
                                <AppPrimaryButton
                                    fullWidth
                                    className="mt-5"
                                    title={t('ForgotPasswordPage.Btn.Verify')}
                                    loadingText=""
                                    disabled={
                                        verifyingOTP ||
                                        otp === '' ||
                                        otp.length !== 4
                                    }
                                    onClick={actionVerifyOTP}
                                />

                                {!isExpired && (
                                    <Box className="my-5 align-center">
                                        <AvTimerIcon
                                            sx={{ fontSize: 16 }}
                                            className="text-gray mr-1"
                                        />
                                        <Typography variant="body2">
                                            <Countdown
                                                onComplete={() =>
                                                    setIsExpired(true)
                                                }
                                                renderer={(cdProps: any) =>
                                                    `${cdProps.formatted.minutes}:${cdProps.formatted.seconds}`
                                                }
                                                date={
                                                    Date.now() +
                                                    OTP_DURATION * 60 * 1000
                                                }
                                            />
                                        </Typography>
                                    </Box>
                                )}

                                {isExpired && (
                                    <>
                                        <Typography
                                            className="mt-5"
                                            variant="body2"
                                        >
                                            {t(
                                                'ForgotPasswordPage.CodeNotRecevied'
                                            )}
                                        </Typography>

                                        <Button
                                            title="Send again"
                                            aria-label="Send again"
                                            className="text-href f12 mb-5 btn-small"
                                            onClick={actionResendCode}
                                            disabled={resending}
                                        >
                                            <Typography>
                                                {resending
                                                    ? t(
                                                          'ForgotPasswordPage.Sending'
                                                      )
                                                    : t(
                                                          'ForgotPasswordPage.SendAgain'
                                                      )}
                                            </Typography>
                                        </Button>
                                    </>
                                )}
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <Box className="mb-6 align-center">
                                    <IconButton
                                        title="Go back"
                                        className=""
                                        onClick={actionGoToBegin}
                                    >
                                        <ArrowBackIcon color="primary" />
                                    </IconButton>
                                    <Typography
                                        variant="h5"
                                        className="text-primary"
                                    >
                                        {t(
                                            'ForgotPasswordPage.SetPasswordTitle'
                                        )}
                                    </Typography>
                                </Box>
                                <Formik
                                    enableReinitialize
                                    initialValues={resetForm}
                                    validateOnMount
                                    validationSchema={ResetPasswordSchema(t)}
                                    onSubmit={(formValues, formik) => {
                                        actionOnRestFormSubmit(
                                            formValues,
                                            formik
                                        );
                                    }}
                                >
                                    {({
                                        values,
                                        handleSubmit,
                                        isSubmitting,
                                        isValid,
                                    }) => (
                                        <>
                                            <AppFormikPasswordField
                                                size="medium"
                                                placeholder={t(
                                                    'ForgotPasswordPage.Input.NewPassword'
                                                )}
                                                name="password"
                                                inputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <IconLock />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />

                                            <AppFormikPasswordField
                                                size="medium"
                                                placeholder={t(
                                                    'ForgotPasswordPage.Input.RetypePassword'
                                                )}
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
                                                password={values.password}
                                            />

                                            <AppPrimaryButton
                                                fullWidth
                                                className="mt-5 mb-10"
                                                title={t(
                                                    'ForgotPasswordPage.Btn.UpdateAndLogin'
                                                )}
                                                disabled={
                                                    !isValid || isSubmitting
                                                }
                                                isLoading={isSubmitting}
                                                loadingText=""
                                                onClick={handleSubmit}
                                            />
                                        </>
                                    )}
                                </Formik>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
export default ForgotPassword;
