import {
    Dialog,
    Box,
    Typography,
    IconButton,
    DialogActions,
} from '@mui/material';
import { ReactElement, useState } from 'react';
import { PointsPackagesService } from 'services';
import { useTranslation } from 'react-i18next';
import {
    AppPrimaryButton,
    AppSecondaryButton,
} from 'shared/components/AppComponents';
import CloseIcon from '@mui/icons-material/Close';
import { Utils } from 'shared/helpers';

const PackageDeleteDialog = (props: any): ReactElement => {
    const { t } = useTranslation();
    const { packageId, onCloseForm, showForm } = props;
    const [isDeleting, setDeleting] = useState(false);

    // API Calls
    const onDeletePackage = (): void => {
        setDeleting(true);
        PointsPackagesService.deletePackage(packageId)
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
                    {t('PackageDeleteDialogPage.Title')}
                </Typography>

                <IconButton onClick={onCloseForm}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <Typography variant="body1" className="px-5 mt-1">
                {t('PackageDeleteDialogPage.Text.Description')}
            </Typography>

            <DialogActions className="actions mt-3">
                <AppSecondaryButton
                    className="mr-2"
                    title={t('PackageDeleteDialogPage.Btn.Cancel')}
                    onClick={onCloseForm}
                />

                <AppPrimaryButton
                    title={t('PackageDeleteDialogPage.Btn.Delete')}
                    disabled={isDeleting}
                    isLoading={isDeleting}
                    loadingText="DELETING"
                    onClick={onDeletePackage}
                />
            </DialogActions>
        </Dialog>
    );
};

export default PackageDeleteDialog;
