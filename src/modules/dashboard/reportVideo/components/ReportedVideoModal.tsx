import {
    Dialog,
    Box,
    DialogContent,
    Typography,
    IconButton,
    DialogActions,
} from '@mui/material';
import { ReactElement, useState } from 'react';
import { ReportedVideoService } from 'services/ReportedVideoService';
import {
    AppPrimaryButton,
    AppSecondaryButton,
    ConfirmDialogWithTextField,
} from 'shared/components/AppComponents';
import { Utils } from 'shared/helpers';

const ReportVideoModal = (props: any): ReactElement => {
    const { open, onClose, activeReportedVideo } = props;
    const [showConfirm, setShowConfirm] = useState(false);
    const [isIgnore, setIsIgnore] = useState(false);
    const [textValue, setTextValue] = useState(false);

    const onActionPost = (): any => {
        ReportedVideoService.ReportAction({
            reportId: activeReportedVideo.reportId,
            status: isIgnore ? 'ignored' : 'resolved',
            notes: textValue,
        })
            .then((response) => Utils.handleSuccessResponse(response))
            .catch((error: any) => {
                Utils.handleErrorResponse(error);
            })
            .finally(() => {
                onClose(true);
            });
    };
    return (
        <>
            <Dialog id="confirm-dialog" fullWidth maxWidth="sm" open={open}>
                <Box padding={2}>
                    <DialogContent className="dialog-content-container">
                        <Box className="justify-space-between align-center">
                            <Typography className="report-modal-title">
                                Reported Video
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
                        {activeReportedVideo.post.mediaType === 'image' ? (
                            <img
                                src={activeReportedVideo.post.mediaUrl}
                                width="100%"
                            />
                        ) : (
                            <video
                                width="100%"
                                controls
                                src={activeReportedVideo.post.mediaUrl}
                                className=" py-3"
                            />
                        )}
                        <Typography className="report-modal-title my-2">
                            Reason
                        </Typography>
                        <Typography className="">
                            {activeReportedVideo.reason}
                        </Typography>
                        {activeReportedVideo.closingComment && (
                            <>
                                <Typography className="report-modal-title my-2">
                                    Resolve Comment
                                </Typography>
                                <Typography className="">
                                    {activeReportedVideo.closingComment}
                                </Typography>
                            </>
                        )}
                    </DialogContent>
                    {activeReportedVideo.status === 'open' && (
                        <DialogActions>
                            <AppPrimaryButton
                                className="btn-large"
                                title="Ignore"
                                onClick={() => {
                                    setIsIgnore(true);
                                    setShowConfirm(true);
                                }}
                            />
                            <AppSecondaryButton
                                className="btn-large"
                                title="Delete"
                                onClick={() => {
                                    setIsIgnore(false);
                                    setShowConfirm(true);
                                }}
                            />
                        </DialogActions>
                    )}
                </Box>
            </Dialog>
            <ConfirmDialogWithTextField
                showConfirm={showConfirm}
                title="Reported Video"
                subTitle={`Are you sure, you want to  ${
                    isIgnore ? 'Ignore' : 'Delete'
                } this Video?`}
                onCancel={() => {
                    setShowConfirm(false);
                    onClose();
                }}
                onSuccess={() => {
                    setShowConfirm(false);
                    onActionPost();
                }}
                successTitle="Yes"
                cancelTitle="No"
                setTextValue={setTextValue}
            />
        </>
    );
};

export default ReportVideoModal;
