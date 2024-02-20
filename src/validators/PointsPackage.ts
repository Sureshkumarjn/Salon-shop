import * as Yup from 'yup';

const PointsPackageSchema = (t: any): any =>
    Yup.object().shape({
        quantity: Yup.number()
            .positive()
            .required(t('PackageFormPage.Validation.Quantity')),
        amount: Yup.number()
            .positive()
            .required(t('PackageFormPage.Validation.Amount')),
    });

const SubscriptionSchema = (t: any): any =>
    Yup.object().shape({
        coins: Yup.number()
            .positive()
            .required(t('Subscription.Validation.Coins')),
        days: Yup.number()
            .positive()
            .required(t('Subscription.Validation.days')),
    });

export { PointsPackageSchema, SubscriptionSchema };
