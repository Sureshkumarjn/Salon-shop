import { Box, Typography, InputAdornment } from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import { ReactElement, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    AppFormikPasswordField,
    AppFormikTextField,
    AppPrimaryButton,
    AppSelect,
} from 'shared/components/AppComponents';
import { LoginSchema } from 'validators/Authentication';
import { AuthActions } from 'state/authentication/Action';
import { connect } from 'react-redux';
import { APICallBack, AuthenticationService, ProfileService } from 'services';
import { Utils } from 'shared/helpers';
import AppPreference from 'shared/managers/AppPreference';
import { ProfileActions } from 'state/profile/Action';
import { ProfileState } from 'state/profile/Reducer';
import { useTranslation } from 'react-i18next';
import { AppCheckbox } from 'shared/components';
import { IconLock } from 'shared/components/Icons';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import { AppState } from 'state/RootReducer';
import { AppConfigActions } from 'state/Action';
import { AppConfigState } from 'state/Reducer';
import { LANGUAGES } from 'shared/Constants';

interface ILogin {
    phoneNumber: string;
    password: string;
}

const LoginForm = (props: any): ReactElement => {
    const { t } = useTranslation();
    const {
        setLoginData,
        setProfileData,
        doLogout,
        appConfig,
        setLang,
    }: {
        setLoginData: (data: any) => void;
        setProfileData: (data: ProfileState) => void;
        doLogout: () => void;
        appConfig: AppConfigState;
        setLang: (data: any) => void;
    } = props;
    const { language } = appConfig;
    const [rememberMe, setRememberMe] = useState(false);

    const loginForm: any = {
        phoneNumber: '',
        password: '',
    };
    const navigate = useNavigate();

    // API Calls
    const login = (loginData: any, callBack: APICallBack): void => {
        AuthenticationService.login(loginData)
            .then((loginResponse) => {
                callBack(true, loginResponse);
            })
            .catch((error) => {
                Utils.handleErrorResponse(error);
                callBack(false, error);
            });
    };

    // UI Actions
    const actionOnFormSubmit = (
        formValues: ILogin,
        formik: FormikHelpers<ILogin>
    ): void => {
        const loginData = {
            ...formValues,
            deviceToken: AppPreference.getDeviceToken(),
            fcmToken: AppPreference.getFCMToken(),
            platform: 'Web',
            version: '1.0.0',
            // phoneNumber: '767676767676',
            countryCode: '+91',
        };
        login(loginData, (status, response): void => {
            if (status) {
                const { user, accessToken, refreshToken } = response.data.data;
                setLoginData({
                    isUserLoggedIn: true,
                    accessToken,
                    refreshToken,
                });
                setProfileData(user);
                setTimeout(() => {
                    ProfileService.loadProfile();
                    navigate('/users', { replace: true });
                }, 500);
            }
            formik.setSubmitting(false);
        });
    };

    // Hooks
    useEffect(() => {
        doLogout();
    }, []);

    // UI Elements
    return (
        <Box className="auth-wrapper">
            <Box className="auth-box-wrapper">
                <Box className="auth-box">
                    <Box className="form-container">
                        <Box className="logo-style">
                            <img width={60} src="/images/logo.svg" />
                        </Box>
                        <Typography
                            variant="h5"
                            className="text-primary mt-9 mb-6"
                        >
                            {t('LoginPage.Title')}
                        </Typography>
                        <Formik
                            enableReinitialize
                            initialValues={loginForm}
                            validateOnMount
                            validationSchema={LoginSchema(t)}
                            onSubmit={(formValues, formik) => {
                                actionOnFormSubmit(formValues, formik);
                            }}
                        >
                            {({ handleSubmit, isSubmitting, isValid }) => (
                                <>
                                    <AppFormikTextField
                                        type="text"
                                        size="medium"
                                        placeholder={t('LoginPage.Input.Phone')}
                                        name="phoneNumber"
                                        inputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <CallOutlinedIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />

                                    <AppFormikPasswordField
                                        placeholder={t(
                                            'LoginPage.Input.Password'
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

                                    <Box className="w100 justify-space-between align-center">
                                        <AppCheckbox
                                            labelColor="#767676"
                                            color="#ADADAD"
                                            checked={rememberMe}
                                            onChange={() => {
                                                setRememberMe(!rememberMe);
                                            }}
                                            label={t('LoginPage.RememberMe')}
                                        />

                                        <Typography
                                            to="/forgot-password"
                                            className="text-href"
                                            component={NavLink}
                                            variant="body1"
                                        >
                                            {t('LoginPage.ForgotPassword')}
                                        </Typography>
                                    </Box>
                                    <AppPrimaryButton
                                        fullWidth
                                        className="mt-5 mb-11"
                                        title={t('LoginPage.Btn.Login')}
                                        disabled={!isValid || isSubmitting}
                                        isLoading={isSubmitting}
                                        loadingText=""
                                        onClick={handleSubmit}
                                    />
                                </>
                            )}
                        </Formik>
                    </Box>
                </Box>
            </Box>
            {false && (
                <Box className="language-container">
                    <AppSelect
                        fullWidth
                        titleKey="language"
                        valueKey="languageKey"
                        placeholder="Language"
                        value={language.languageKey}
                        items={LANGUAGES}
                        onChange={(e: any) => {
                            const key = e.target.value;
                            const language = LANGUAGES.find(
                                (l) => l.languageKey === key
                            );
                            setLang(language);
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};

const mapDispatchToProps = (dispatch: any): any => ({
    setLoginData: (data: any) => dispatch(AuthActions.setLoginStatus(data)),
    doLogout: (data: any) => dispatch(AuthActions.doLogout(data)),
    setProfileData: (data: any) =>
        dispatch(ProfileActions.setProfileData(data)),
    setLang: (data: any) => dispatch(AppConfigActions.setLang(data)),
});
const mapStateToProps = (state: AppState): any => ({
    profileState: state.profileState,
    appConfig: state.appConfig,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
