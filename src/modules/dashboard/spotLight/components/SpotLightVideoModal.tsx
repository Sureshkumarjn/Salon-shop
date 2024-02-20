import {
    Dialog,
    Box,
    DialogContent,
    Typography,
    IconButton,
} from '@mui/material';
import { ReactElement } from 'react';

const SpotLightVideoModal = (props: any): ReactElement => {
    const { open, onClose, activeSpotLightMedia } = props;

    return (
        <Dialog id="confirm-dialog" fullWidth maxWidth="sm" open={open}>
            <Box padding={2}>
                <DialogContent className="dialog-content-container">
                    <Box className="justify-space-between align-center">
                        <Typography className="report-modal-title">
                            SpotLight{' '}
                            {activeSpotLightMedia.mediaType === 'image'
                                ? 'Image'
                                : 'Video'}
                        </Typography>
                        <IconButton
                            title="Close"
                            aria-label="Close"
                            onClick={() => onClose()}
                        >
                            <img
                                src="/images/icons/icon_close.svg"
                                width={20}
                                height={20}
                            />
                        </IconButton>
                    </Box>
                    <Box className="justify-center">
                        <video
                            autoPlay
                            height="500px"
                            controls
                            src={activeSpotLightMedia.mediaUrl}
                            className="py-3"
                        />
                    </Box>
                </DialogContent>
            </Box>
        </Dialog>
    );
};

export default SpotLightVideoModal;
