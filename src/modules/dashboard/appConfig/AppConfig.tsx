import { Box, Grid, Typography, InputAdornment } from '@mui/material';
import { Formik } from 'formik';
import { ReactElement, useEffect, useState } from 'react';
import { AppConfigSerivce } from 'services/AppConfigService';
import {
    AppFormikTextField,
    AppPrimaryButton,
    AppTextField,
} from 'shared/components/AppComponents';
import Toast from 'shared/helpers/Toast';
import { AppConfigSchema } from 'validators/AppConfig';
import NoteIcon from '@mui/icons-material/Note';
import SystemUpdateIcon from '@mui/icons-material/SystemUpdate';
import { useTranslation } from 'react-i18next';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { AppConfigActions } from 'state/Action';
import { connect } from 'react-redux';
import { AppState } from 'state/RootReducer';

const AppConfig = (props: any): ReactElement => {
    const { setAppConfig } = props;
    const { t } = useTranslation();

    const [versionConfigInfo, setVersionConfigInfo] = useState({
        iosCurrentVersion: '',
        iosMinimumVersion: '',
        iosUpdateMessage: '',
        androidCurrentVersion: '',
        androidMinimumVersion: '',
        androidUpdateMessage: '',
        standardCommission: 45,
        coinWithdrawCommission: 30,
        diamondWithdrawCommission: 30,
        sarDiamondValue: 0.45,
        sarCoinValue: 0.45,
    });
    const [activeVerstionId, setActiveVersionId] = useState();

    // Api calls
    const loadVersionConfig = (): void => {
        AppConfigSerivce.appConfig()
            .then((response) => {
                const config = response.data.data;
                setVersionConfigInfo(config);
                setActiveVersionId(config.versionId);
                setAppConfig(config);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const saveVersionConfig = (formValues: any, callBack: any): void => {
        const payload = {
            mobileVersionId: activeVerstionId,
            ...formValues,
        };
        const promise = AppConfigSerivce.saveAppConfig(payload);
        promise
            .then((response: any) => {
                Toast.showSuccessMessage(response.data.message);
                callBack(true, response);
            })
            .catch((error: any) => {
                Toast.showErrorMessage(error);
                callBack(false, error);
            })
            .finally(() => {
                loadVersionConfig();
            });
    };

    const actionOnFormSubmit = (formValues: any, formik: any): void => {
        saveVersionConfig(formValues, (status: boolean) => {
            if (status) {
                formik.resetForm();
            }
            formik.setSubmitting(false);
        });
    };
    // Hooks
    useEffect(() => {
        loadVersionConfig();
    }, []);

    return (
        <Formik
            enableReinitialize
            initialValues={versionConfigInfo}
            validationSchema={AppConfigSchema(t)}
            validateOnMount
            onSubmit={(formValues, formik) => {
                actionOnFormSubmit(formValues, formik);
            }}
        >
            {({ handleSubmit, values, isSubmitting, isValid }) => (
                <Box className="app-card">
                    <Box className="card-header mb-5">
                        <Box className="version-config-header">
                            <AppPrimaryButton
                                className=""
                                loadingText=""
                                title="Save"
                                onClick={() => {
                                    handleSubmit();
                                }}
                                isLoading={isSubmitting}
                                disabled={isSubmitting || !isValid}
                            />
                        </Box>
                    </Box>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6} lg={6} sm={12}>
                            <Box className="p-4">
                                <Typography className="title fw-6 mb-8">
                                    {t('VersionConfig.Title.IOS')}
                                </Typography>
                                <AppFormikTextField
                                    type="text"
                                    placeholder={t(
                                        'VersionConfig.Input.IOS.CurrentVersion'
                                    )}
                                    name="iosCurrentVersion"
                                    label="iOS Current Version *"
                                    fullWidth
                                    inputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SystemUpdateIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <AppFormikTextField
                                    type="text"
                                    placeholder={t(
                                        'VersionConfig.Input.IOS.MinimumVersion'
                                    )}
                                    name="iosMinimumVersion"
                                    label="iOS Minimum Version *"
                                    fullWidth
                                    inputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SystemUpdateIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <AppFormikTextField
                                    type="text"
                                    placeholder={t(
                                        'VersionConfig.Input.IOS.Message'
                                    )}
                                    name="iosUpdateMessage"
                                    label="iOS Update Message *"
                                    fullWidth
                                    inputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <NoteIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} sm={12}>
                            <Box className="p-4">
                                <Typography className="title fw-6 mb-8">
                                    {t('VersionConfig.Title.Android')}
                                </Typography>
                                <AppFormikTextField
                                    type="text"
                                    name="androidCurrentVersion"
                                    label="Android Current Version *"
                                    placeholder={t(
                                        'VersionConfig.Input.Android.CurrentVersion'
                                    )}
                                    fullWidth
                                    inputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SystemUpdateIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <AppFormikTextField
                                    type="text"
                                    placeholder={t(
                                        'VersionConfig.Input.Android.MinimumVersion'
                                    )}
                                    name="androidMinimumVersion"
                                    label="Android Minimum Version *"
                                    fullWidth
                                    inputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SystemUpdateIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <AppFormikTextField
                                    type="text"
                                    placeholder={t(
                                        'VersionConfig.Input.Android.Message'
                                    )}
                                    name="androidUpdateMessage"
                                    label="Android Update Message *"
                                    fullWidth
                                    inputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <NoteIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} sm={12}>
                            <Box className="p-4">
                                <Typography className="title fw-6 mb-8">
                                    {t('VersionConfig.Title.Commission')}
                                </Typography>
                                {/* Standard commission */}
                                <Grid alignItems="center" container spacing={2}>
                                    <Grid item md={4}>
                                        <Typography>
                                            {t(
                                                'VersionConfig.Input.StandardCommission'
                                            )}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={4}>
                                        <AppFormikTextField
                                            type="number"
                                            name="standardCommission"
                                            label=""
                                            placeholder={t(
                                                'VersionConfig.Input.Application'
                                            )}
                                            inputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <MonetizationOnIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item md={4}>
                                        <AppTextField
                                            type="text"
                                            value={
                                                100 - values.standardCommission
                                            }
                                            label=""
                                            placeholder={t(
                                                'VersionConfig.Input.User'
                                            )}
                                            inputProps={{
                                                readOnly: true,
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <MonetizationOnIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                {/* Coin withdraw commission */}
                                <Grid alignItems="center" container spacing={2}>
                                    <Grid item md={4}>
                                        <Typography>
                                            {t(
                                                'VersionConfig.Input.CoinWithdrawCommission'
                                            )}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={4}>
                                        <AppFormikTextField
                                            type="number"
                                            name="coinWithdrawCommission"
                                            label=""
                                            placeholder={t(
                                                'VersionConfig.Input.Application'
                                            )}
                                            inputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <MonetizationOnIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item md={4}>
                                        <AppTextField
                                            type="text"
                                            value={
                                                100 -
                                                values.coinWithdrawCommission
                                            }
                                            label=""
                                            placeholder={t(
                                                'VersionConfig.Input.User'
                                            )}
                                            inputProps={{
                                                readOnly: true,
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <MonetizationOnIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                {/* Diamond withdraw commission */}
                                <Grid alignItems="center" container spacing={2}>
                                    <Grid item md={4}>
                                        <Typography>
                                            {t(
                                                'VersionConfig.Input.DiamondWithdrawCommission'
                                            )}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={4}>
                                        <AppFormikTextField
                                            type="number"
                                            name="diamondWithdrawCommission"
                                            label=""
                                            placeholder={t(
                                                'VersionConfig.Input.Application'
                                            )}
                                            inputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <MonetizationOnIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item md={4}>
                                        <AppTextField
                                            type="text"
                                            value={
                                                100 -
                                                values.diamondWithdrawCommission
                                            }
                                            label=""
                                            placeholder={t(
                                                'VersionConfig.Input.User'
                                            )}
                                            inputProps={{
                                                readOnly: true,
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <MonetizationOnIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                {/* 1 Coin SAR value */}
                                <Grid alignItems="center" container spacing={2}>
                                    <Grid item md={4}>
                                        <Typography>
                                            {t('VersionConfig.Input.1Coin')}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={4}>
                                        <AppFormikTextField
                                            type="number"
                                            name="sarCoinValue"
                                            label=""
                                            placeholder={t(
                                                'VersionConfig.Input.SAR'
                                            )}
                                            inputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <MonetizationOnIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item md={4}>
                                        <AppTextField
                                            type="text"
                                            value="1"
                                            label=""
                                            placeholder={t(
                                                'VersionConfig.Input.1Coin'
                                            )}
                                            inputProps={{
                                                readOnly: true,
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <MonetizationOnIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                {/* 1 Coin SAR value */}
                                <Grid alignItems="center" container spacing={2}>
                                    <Grid item md={4}>
                                        <Typography>
                                            {t('VersionConfig.Input.1Diamond')}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={4}>
                                        <AppFormikTextField
                                            type="number"
                                            name="sarDiamondValue"
                                            label=""
                                            placeholder={t(
                                                'VersionConfig.Input.SAR'
                                            )}
                                            inputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <MonetizationOnIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item md={4}>
                                        <AppTextField
                                            type="text"
                                            value="1"
                                            label=""
                                            placeholder={t(
                                                'VersionConfig.Input.1Diamond'
                                            )}
                                            inputProps={{
                                                readOnly: true,
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <MonetizationOnIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Formik>
    );
};

const mapStateToProps = (state: AppState): any => ({
    appConfig: state.appConfig,
});
const mapDispatchToProps = (dispatch: any): any => ({
    setAppConfig: (data: any) => dispatch(AppConfigActions.setAppConfig(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppConfig);
