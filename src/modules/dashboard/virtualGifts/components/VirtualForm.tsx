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
import { ReactElement, useEffect, useRef, useState } from 'react';
import { APICallBack, VirtualGiftService } from 'services';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { useTranslation } from 'react-i18next';
import {
    AppFormikTextField,
    AppPrimaryButton,
    AppSecondaryButton,
} from 'shared/components/AppComponents';
import CloseIcon from '@mui/icons-material/Close';
import { Utils } from 'shared/helpers';
import { VirtualSchema } from 'validators/VirtualGift';

interface VirtualFormProps {
    name: string;
    coins: string;
}

const VirtualForm = (props: any): ReactElement => {
    const { t } = useTranslation();
    const { virtualGiftToEdit, isAdd, onCloseForm, showForm } = props;
    const fileRef: any = useRef(null);
    const [virtualFormData, setVirtualFormData] = useState(
        {} as VirtualFormProps
    );
    const [pictureUrl, setPictureUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState<any>();

    // API Calls
    const saveVirtualGift = (virtualData: any, callBack: APICallBack): void => {
        const promise = isAdd
            ? VirtualGiftService.addVirtualGift(virtualData)
            : VirtualGiftService.editVirtualGift(virtualData);

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
        const formData = new FormData();
        formData.append('name', formValues.name);
        formData.append('coins', formValues.coins);
        formData.append('virtualGiftImage', selectedFile);
        if (!isAdd) {
            formData.append('virtualGiftId', virtualGiftToEdit.virtualGiftId);
        }

        saveVirtualGift(formData, (status: boolean) => {
            if (status) {
                onCloseForm(true);
                formik.resetForm();
            }
            formik.setSubmitting(false);
        });
    };

    const actionOnFileSelect = (event: any): void => {
        if (event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            setPictureUrl(URL.createObjectURL(selectedFile));
            setSelectedFile(selectedFile);
        } else {
            setPictureUrl('');
            setSelectedFile(null);
        }
    };

    // Hooks
    useEffect(() => {
        if (Object.keys(virtualGiftToEdit).length > 0) {
            setVirtualFormData({
                name: virtualGiftToEdit.name,
                coins: virtualGiftToEdit.coins,
            });
            setPictureUrl(virtualGiftToEdit.imageUrl);
        } else {
            setVirtualFormData({
                name: '',
                coins: '',
            });
        }
    }, [virtualGiftToEdit, isAdd]);

    // UI Elements
    return (
        <Dialog
            maxWidth="sm"
            fullWidth
            open={showForm}
            className="form-dialog-wrapper"
        >
            <Box className="header">
                <Typography className="title fw-6">
                    {isAdd
                        ? `${t('VirtualFormPage.TextTitle.Add')}`
                        : `${t('VirtualFormPage.TextTitle.Edit')}`}
                </Typography>

                <IconButton onClick={onCloseForm}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Formik
                enableReinitialize
                initialValues={virtualFormData}
                validateOnMount
                validationSchema={VirtualSchema}
                onSubmit={(formValues, formik) => {
                    actionOnFormSubmit(formValues, formik);
                }}
            >
                {({ handleSubmit, isSubmitting, isValid }) => (
                    <form autoComplete="off">
                        <Grid container spacing={5} className="p-4">
                            <Grid item xs={12}>
                                <AppFormikTextField
                                    type="text"
                                    size="medium"
                                    placeholder={t(
                                        'VirtualFormPage.Input.Name'
                                    )}
                                    name="name"
                                    inputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AddReactionIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <AppFormikTextField
                                    type="number"
                                    size="medium"
                                    placeholder={t(
                                        'VirtualFormPage.Input.Coins'
                                    )}
                                    name="coins"
                                    inputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CardGiftcardIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Typography className="mb-2">
                                    {t('VirtualFormPage.Input.Image')}
                                </Typography>

                                <input
                                    type="file"
                                    name="image"
                                    ref={fileRef}
                                    accept="image/png, image/jpeg"
                                    style={{ display: 'none' }}
                                    onChange={(event: any) => {
                                        actionOnFileSelect(event);
                                    }}
                                />
                                <Box className="flex flex-column align-start">
                                    <img width="150" src={pictureUrl} />
                                    <AppPrimaryButton
                                        onClick={() => {
                                            if (fileRef?.current) {
                                                fileRef?.current?.click();
                                            }
                                        }}
                                        className="btn-small mt-2"
                                        title={
                                            pictureUrl === ''
                                                ? t('Common.Choose')
                                                : t('Common.Change')
                                        }
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                        <DialogActions className="actions">
                            <AppSecondaryButton
                                className="mr-2"
                                title={t('VirtualFormPage.Btn.Cancel')}
                                onClick={onCloseForm}
                            />

                            <AppPrimaryButton
                                title={
                                    isAdd
                                        ? `${t('VirtualFormPage.Btn.Add')}`
                                        : `${t('VirtualFormPage.Btn.Save')}`
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

export default VirtualForm;
