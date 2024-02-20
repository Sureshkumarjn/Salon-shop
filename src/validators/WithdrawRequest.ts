import * as Yup from 'yup';

const WithdrawRequestSchema = (t: any): any =>
    Yup.object().shape({
        transactionRef: Yup.string()
            .min(8, t('WidthdrawRequestForm.Validation.TransactionRefMin'))
            .max(16, t('WidthdrawRequestForm.Validation.TransactionRefMax'))
            .required(
                t('WidthdrawRequestForm.Validation.TransactionRefRequired')
            ),
    });

export { WithdrawRequestSchema };
