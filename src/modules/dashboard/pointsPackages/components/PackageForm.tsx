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
import { APICallBack, PointsPackagesService } from 'services';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PaymentIcon from '@mui/icons-material/Payment';
import { useTranslation } from 'react-i18next';
import {
    AppFormikTextField,
    AppPrimaryButton,
    AppSecondaryButton,
} from 'shared/components/AppComponents';
import CloseIcon from '@mui/icons-material/Close';
import { Utils } from 'shared/helpers';
import { PointsPackageSchema } from 'validators/PointsPackage';

export interface PackageFormProps {
    quantity: number;
    amount: number;
}

const PackageForm = (props: any): ReactElement => {
    const { t } = useTranslation();
    const { packageToEdit, isAdd, onCloseForm, showForm } = props;
    const [packageFormData, setPackageFormData] = useState(
        {} as PackageFormProps
    );

    // API Calls
    const savePackage = (packageData: any, callBack: APICallBack): void => {
        const promise = isAdd
            ? PointsPackagesService.addPackage(packageData)
            : PointsPackagesService.editPackage({
                  ...packageData,
                  pointsPackageId: packageToEdit.pointsPackageId,
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
        if (packageToEdit) {
            setPackageFormData({
                quantity: packageToEdit.quantity,
                amount: packageToEdit.amount,
            });
        } else {
            setPackageFormData({
                quantity: 0,
                amount: 0,
            });
        }
    }, [packageToEdit, isAdd]);

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
                initialValues={packageFormData}
                validateOnMount
                validationSchema={PointsPackageSchema(t)}
                onSubmit={(formValues, formik) => {
                    actionOnFormSubmit(formValues, formik);
                }}
            >
                {({ handleSubmit, isSubmitting, isValid }) => (
                    <form autoComplete="off">
                        <Grid container spacing={5} className="p-4 form">
                            <Grid item xs={12}>
                                <AppFormikTextField
                                    type="number"
                                    size="medium"
                                    placeholder={t(
                                        'PackageFormPage.Input.Quantity'
                                    )}
                                    name="quantity"
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
                                    placeholder={t(
                                        'PackageFormPage.Input.Amount'
                                    )}
                                    name="amount"
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
                                title={t('PackageFormPage.Btn.Cancel')}
                                onClick={onCloseForm}
                            />

                            <AppPrimaryButton
                                title={
                                    isAdd
                                        ? `${t('PackageFormPage.Btn.Add')}`
                                        : `${t('PackageFormPage.Btn.Save')}`
                                }
                                disabled={!isValid || isSubmitting}
                                isLoading={isSubmitting}
                                loadingText={isAdd ? 'ADDING' : 'SAVING'}
                                onClick={handleSubmit}
                            />
                        </DialogActions>
                    </form>
                )}
            </Formik>
        </Dialog>
    );
};

export default PackageForm;
