import {
    Dialog,
    Box,
    Typography,
    IconButton,
    DialogActions,
} from '@mui/material';
import { ReactElement, useState } from 'react';
import { SubscriptionService } from 'services';
import { useTranslation } from 'react-i18next';
import {
    AppPrimaryButton,
    AppSecondaryButton,
} from 'shared/components/AppComponents';
import CloseIcon from '@mui/icons-material/Close';
import { Utils } from 'shared/helpers';

const PackageDeleteDialog = (props: any): ReactElement => {
    const { t } = useTranslation();
    const { planId, onCloseForm, showForm } = props;
    const [isDeleting, setDeleting] = useState(false);

    // API Calls
    const onDeletePackage = (): void => {
        setDeleting(true);
        SubscriptionService.deleteSubscription(planId)
            .then((response: any) => {
                Utils.handleSuccessResponse(response);
                onCloseForm();
            })
            .catch((error: any) => {
                Utils.handleErrorResponse(error);
            })
            .finally(() => {
                setDeleting(false);
            });
    };

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
                    {t('SubscriptionDeleteDialogPage.Title')}
                </Typography>

                <IconButton onClick={onCloseForm}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <Typography variant="body1" className="px-5 mt-1">
                {t('SubscriptionDeleteDialogPage.Text.Description')}
            </Typography>

            <DialogActions className="actions mt-3">
                <AppSecondaryButton
                    className="mr-2"
                    title={t('SubscriptionDeleteDialogPage.Btn.Cancel')}
                    onClick={onCloseForm}
                />

                <AppPrimaryButton
                    title={t('SubscriptionDeleteDialogPage.Btn.Delete')}
                    disabled={isDeleting}
                    isLoading={isDeleting}
                    onClick={onDeletePackage}
                />
            </DialogActions>
        </Dialog>
    );
};

export default PackageDeleteDialog;
