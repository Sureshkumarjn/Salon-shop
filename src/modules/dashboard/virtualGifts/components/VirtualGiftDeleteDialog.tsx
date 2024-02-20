import {
    Dialog,
    Box,
    Typography,
    IconButton,
    DialogActions,
} from '@mui/material';
import { ReactElement, useState } from 'react';
import { VirtualGiftService } from 'services';
import { useTranslation } from 'react-i18next';
import {
    AppPrimaryButton,
    AppSecondaryButton,
} from 'shared/components/AppComponents';
import CloseIcon from '@mui/icons-material/Close';
import { Utils } from 'shared/helpers';

const VirtualGiftDeleteDialog = (props: any): ReactElement => {
    const { t } = useTranslation();
    const { virtualId, onCloseForm, showForm } = props;
    const [isDeleting, setDeleting] = useState(false);

    // API Calls
    const onDeleteVirtualGift = (): void => {
        setDeleting(true);
        VirtualGiftService.deleteVirtualGift(virtualId)
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
                    {t('VirtualDeleteDialogPage.Title')}
                </Typography>

                <IconButton onClick={onCloseForm}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <Typography variant="body1" className="px-5 mt-1">
                {t('VirtualDeleteDialogPage.Text.Description')}
            </Typography>

            <DialogActions className="actions mt-3">
                <AppSecondaryButton
                    className="mr-2"
                    title={t('VirtualDeleteDialogPage.Btn.Cancel')}
                    onClick={onCloseForm}
                />

                <AppPrimaryButton
                    title={t('VirtualDeleteDialogPage.Btn.Delete')}
                    disabled={isDeleting}
                    isLoading={isDeleting}
                    loadingText="DELETING"
                    onClick={onDeleteVirtualGift}
                />
            </DialogActions>
        </Dialog>
    );
};

export default VirtualGiftDeleteDialog;
