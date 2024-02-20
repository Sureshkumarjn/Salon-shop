import {
    Grid,
    Dialog,
    Box,
    Typography,
    IconButton,
    InputAdornment,
    DialogActions,
} from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import { ReactElement, useEffect, useState } from 'react';
import { APICallBack, SubscriptionService } from 'services';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PaymentIcon from '@mui/icons-material/Payment';
import { useTranslation } from 'react-i18next';
import {
    AppFormikSelect,
    AppFormikTextField,
    AppPrimaryButton,
    AppSecondaryButton,
} from 'shared/components/AppComponents';
import CloseIcon from '@mui/icons-material/Close';
import { Utils } from 'shared/helpers';
import { SubscriptionSchema } from 'validators/PointsPackage';

export enum ACCOUNT_TYPE {
    RED = 'red',
    BLUE = 'blue',
    GREEN = 'green',
    BLACK = 'black',
}

export enum SUBSCRIPTION_PLAN_TYPE {
    ACCOUNT_BADGE = 'account_badge_subscription',
    PROFILE = 'profile_subscription',
}

export interface SubscriptionFormProps {
    coins: number;
    days: number;
    accountType: ACCOUNT_TYPE;
    subscriptionType: SUBSCRIPTION_PLAN_TYPE;
    discountCoins: number;
}

const SubscriptionForm = (props: any): ReactElement => {
    const { t } = useTranslation();
    const { planToEdit, isAdd, onCloseForm, showForm } = props;
    const [subscriptionForm, setSubscriptionForm] = useState({
        discountCoins: 0,
        coins: '',
        days: '',
        accountType: ACCOUNT_TYPE.RED,
        subscriptionType: SUBSCRIPTION_PLAN_TYPE.ACCOUNT_BADGE,
    });

    // API Calls
    const savePackage = (packageData: any, callBack: APICallBack): void => {
        const promise = isAdd
            ? SubscriptionService.createSubscription(packageData)
            : SubscriptionService.updateSubscription({
                  ...packageData,
                  planId: planToEdit.planId,
              });

        promise
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
    const actionOnFormSubmit = (
        formValues: any,
        formik: FormikHelpers<any>
    ): void => {
        savePackage(formValues, (status: boolean) => {
            if (status) {
                onCloseForm(true);
                formik.resetForm();
            }
            formik.setSubmitting(false);
        });
    };

    // Hooks
    useEffect(() => {
        if (planToEdit) {
            const data = {
                coins: planToEdit.coins,
                days: planToEdit.days,
                accountType: planToEdit.accountType,
                subscriptionType: planToEdit.subscriptionType,
                discountCoins: planToEdit.discountCoins,
            };
            setSubscriptionForm(data);
        }
    }, [planToEdit, isAdd]);

    // UI Elements
    return (
        <Dialog
            maxWidth="sm"
            fullWidth
            open={showForm}
            className="form-dialog-wrapper"
        >
            <Box className="header">
                <Typography className="title">
                    {isAdd
                        ? `${t('PackageFormPage.TextTitle.Add')}`
                        : `${t('PackageFormPage.TextTitle.Edit')}`}
                </Typography>

                <IconButton onClick={onCloseForm}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Formik
                enableReinitialize
                initialValues={subscriptionForm}
                validateOnMount
                validationSchema={SubscriptionSchema(t)}
                onSubmit={(formValues, formik) => {
                    actionOnFormSubmit(formValues, formik);
                }}
            >
                {({ handleSubmit, isSubmitting, values, isValid }) => (
                    <form autoComplete="off">
                        <Grid container spacing={5} className="p-4 form">
                            <Grid item xs={12}>
                                <AppFormikSelect
                                    name="subscriptionType"
                                    items={[
                                        {
                                            title: t(
                                                'Subscription.SubscriptionType.Account.Badge'
                                            ),
                                            value: SUBSCRIPTION_PLAN_TYPE.ACCOUNT_BADGE.toString(),
                                        },
                                        {
                                            title: t(
                                                'Subscription.SubscriptionType.Profile.Content'
                                            ),
                                            value: SUBSCRIPTION_PLAN_TYPE.PROFILE.toString(),
                                        },
                                    ]}
                                    titleKey="title"
                                    valueKey="value"
                                    placeholder={t(
                                        'Subscription.Input.SubscriptionType'
                                    )}
                                />
                                {values.subscriptionType ===
                                    SUBSCRIPTION_PLAN_TYPE.ACCOUNT_BADGE && (
                                    <AppFormikSelect
                                        name="accountType"
                                        items={[
                                            {
                                                title: 'Red',
                                                value: 'red',
                                            },
                                            {
                                                title: 'Blue',
                                                value: 'blue',
                                            },
                                            {
                                                title: 'Green',
                                                value: 'green',
                                            },
                                        ]}
                                        titleKey="title"
                                        valueKey="value"
                                        placeholder={t(
                                            'Subscription.Input.AccountType'
                                        )}
                                    />
                                )}
                                <AppFormikTextField
                                    type="number"
                                    size="medium"
                                    placeholder={t('Subscription.Input.Coins')}
                                    name="coins"
                                    inputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <ProductionQuantityLimitsIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <AppFormikTextField
                                    type="number"
                                    size="medium"
                                    placeholder={t('Subscription.Input.Days')}
                                    name="days"
                                    inputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PaymentIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <DialogActions className="actions">
                            <AppSecondaryButton
                                className="mr-2"
                                title={t('Subscription.Btn.Cancel')}
                                onClick={onCloseForm}
                            />

                            <AppPrimaryButton
                                title={
                                    isAdd
                                        ? `${t('Subscription.Btn.Add')}`
                                        : `${t('Subscription.Btn.Save')}`
                                }
                                disabled={!isValid || isSubmitting}
                                isLoading={isSubmitting}
                                onClick={handleSubmit}
                            />
                        </DialogActions>
                    </form>
                )}
            </Formik>
        </Dialog>
    );
};

export default SubscriptionForm;
