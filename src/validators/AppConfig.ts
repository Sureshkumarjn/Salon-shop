import * as Yup from 'yup';

const CommissionConfigs = (t: any): any => ({
    standardCommission: Yup.number()
        .required(t('VersionConfigValidation.standardCommissionRequired'))
        .max(99, t('VersionConfigValidation.maxmimum99')),
    coinWithdrawCommission: Yup.number()
        .required(t('VersionConfigValidation.coinWithdrawCommission'))
        .max(99, t('VersionConfigValidation.maxmimum99')),
    diamondWithdrawCommission: Yup.number()
        .required(t('VersionConfigValidation.diamondWithdrawCommission'))
        .max(99, t('VersionConfigValidation.maxmimum99')),
    sarDiamondValue: Yup.number().required(
        t('VersionConfigValidation.sarDiamondValueRequired')
    ),
    sarCoinValue: Yup.number().required(
        t('VersionConfigValidation.sarCoinValueRequired')
    ),
});

const AppConfigSchema = (t: any): any =>
    Yup.object().shape({
        iosCurrentVersion: Yup.string()
            .trim()
            .required(t('VersionConfigValidation.iosCurrentVRequired')),
        iosMinimumVersion: Yup.string().required(
            t('VersionConfigValidation.iosMinimumVRequired')
        ),
        iosUpdateMessage: Yup.string()
            .trim()
            .required(t('VersionConfigValidation.iosUpdateMsgRequired')),
        androidCurrentVersion: Yup.string().required(
            t('VersionConfigValidation.androidCurrentVRequired')
        ),
        androidMinimumVersion: Yup.string()
            .trim()
            .required(t('VersionConfigValidation.androidMinimumVRequired')),
        androidUpdateMessage: Yup.string().required(
            t('VersionConfigValidation.androidUpdateMsgRequired')
        ),
        ...CommissionConfigs(t),
    });

const CommissionConfigSchema = (t: any): any =>
    Yup.object().shape({ ...CommissionConfigs(t) });

export { AppConfigSchema, CommissionConfigSchema };
