import {
    Typography,
    Box,
    Dialog,
    IconButton,
    DialogActions,
    InputAdornment,
} from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { APICallBack, WithdrawRequestService } from 'services';
import { WithdrawRequestSchema } from 'validators/WithdrawRequest';
import CloseIcon from '@mui/icons-material/Close';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

import {
    AppFormikTextField,
    AppPrimaryButton,
    AppSecondaryButton,
} from 'shared/components/AppComponents';
import { Utils } from 'shared/helpers';

const WithdrawRequestForm = (props: any): ReactElement => {
    const {
        withdrawRequestId,
        onCloseForm,
        showForm,
        actionType,
    }: {
        withdrawRequestId: string;
        onCloseForm: () => void;
        showForm: boolean;
        actionType: string;
    } = props;

    const { t } = useTranslation();

    const withdrawRequestFormData = {
        transactionRef: '',
    };

    // API Calls
    const onWithdrawRequest = (
        withdrawRequestData: any,
        callBack: APICallBack
    ): void => {
        WithdrawRequestService.updateRequest(withdrawRequestData)
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
        const { transactionRef } = formValues;
        onWithdrawRequest(
            { notes: transactionRef, withdrawRequestId, status: actionType },
            (status: boolean) => {
                if (status) {
                    onCloseForm();
                    formik.resetForm();
                }
                formik.setSubmitting(false);
            }
        );
    };

    // UI Elements
    return (
        <Dialog
            maxWidth="sm"
            fullWidth
            open={showForm}
            className="form-dialog-wrapper"
        >
            <Box className="header mb-3">
                <Typography className="title">
                    {actionType === 'approved'
                        ? t('WidthdrawRequestForm.TextTitle.Approve')
                        : t('WidthdrawRequestForm.TextTitle.Reject')}
                </Typography>

                <IconButton onClick={onCloseForm}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Formik
                enableReinitialize
                initialValues={withdrawRequestFormData}
                validateOnMount
                validationSchema={WithdrawRequestSchema(t)}
                onSubmit={(formValues, formik) => {
                    actionOnFormSubmit(formValues, formik);
                }}
            >
                {({ handleSubmit, isSubmitting, isValid }) => (
                    <Box className="px-5">
                        <AppFormikTextField
                            type="text"
                            size="medium"
                            placeholder={t(
                                'WidthdrawRequestForm.Input.TransactionRef'
                            )}
                            name="transactionRef"
                            inputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ReceiptLongIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <DialogActions className="pt-3 pb-6 pr-0">
                            <AppSecondaryButton
                                className="mr-2"
                                title={t('WidthdrawRequestForm.Btn.Cancel')}
                                onClick={onCloseForm}
                            />

                            <AppPrimaryButton
                                title={
                                    actionType === 'approved'
                                        ? `${t(
                                              'WidthdrawRequestForm.Btn.Approve'
                                          )}`
                                        : `${t(
                                              'WidthdrawRequestForm.Btn.Reject'
                                          )}`
                                }
                                isLoading={isSubmitting}
                                disabled={isSubmitting || !isValid}
                                onClick={handleSubmit}
                            />
                        </DialogActions>
                    </Box>
                )}
            </Formik>
        </Dialog>
    );
};

export default WithdrawRequestForm;
