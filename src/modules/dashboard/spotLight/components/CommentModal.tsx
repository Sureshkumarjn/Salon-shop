import {
    Dialog,
    Box,
    DialogContent,
    Typography,
    IconButton,
    Avatar,
    Divider,
} from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import { ConfirmDialog } from 'shared/components/AppComponents';
import DeleteIcon from '@mui/icons-material/Delete';
import { SpotLightService } from 'services/SpotLightServices';
import { Utils } from 'shared/helpers';
import moment from 'moment';
import { EmptyList } from 'shared/components';

const CommentModal = (props: any): ReactElement => {
    const { open, onClose, activePostID } = props;
    const [showConfirm, setShowConfirm] = useState(false);
    const [comments, setComments] = useState([]);
    const [loader, setLoader] = useState(false);
    const [activeCommentId, setActiveCommentId] = useState('');

    // API Calls
    const loadComments = (activePostID: any): void => {
        setLoader(true);
        SpotLightService.comments(activePostID, 1, 10)
            .then((response: any) => {
                const { results } = response.data.data;
                if (results) {
                    setComments(results);
                }
                setLoader(false);
            })
            .catch((error: any) => {
                setLoader(false);
                Utils.handleErrorResponse(error);
            });
    };

    const actionDeleteComment = (commentId: any): any => {
        setLoader(true);
        SpotLightService.deleteComment(commentId)
            .then((response) => {
                Utils.handleSuccessResponse(response);
                loadComments(activePostID);
            })
            .catch((error: any) => {
                setLoader(false);
                Utils.handleErrorResponse(error);
            });
    };
    useEffect(() => {
        if (activePostID) {
            loadComments(activePostID);
        }
    }, []);

    return (
        <>
            <Dialog id="confirm-dialog" fullWidth maxWidth="sm" open={open}>
                <Box padding={2}>
                    <DialogContent className="dialog-content-container">
                        <Box className="justify-space-between align-center mb-3">
                            <Typography className="report-modal-title">
                                Comment
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
                        {comments.length > 0 && (
                            <Box>
                                {comments.map((cmt: any) => (
                                    <>
                                        <Box className="comment-box">
                                            <Box className="flex">
                                                <Avatar>
                                                    {cmt.username[0]}
                                                </Avatar>
                                                <Box className="ml-3">
                                                    <Typography className="comment-userName">
                                                        {cmt.username}
                                                    </Typography>
                                                    <Typography>
                                                        {moment(
                                                            cmt.createdAt
                                                        ).format(
                                                            'DD MMM YYYY HH:mm A'
                                                        )}
                                                    </Typography>
                                                    <Typography className="comment-txt">
                                                        {cmt.comment}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <IconButton
                                                onClick={() => {
                                                    setActiveCommentId(
                                                        cmt.commentId
                                                    );
                                                    setShowConfirm(true);
                                                }}
                                            >
                                                <DeleteIcon className="icon-delete" />
                                            </IconButton>
                                        </Box>
                                        <Divider
                                            light
                                            className="ml-10 py-2 mb-2"
                                        />
                                    </>
                                ))}
                            </Box>
                        )}
                    </DialogContent>
                </Box>
                {comments.length === 0 && (
                    <EmptyList
                        showEmpty={comments.length === 0}
                        showLoader={loader}
                        title="No comments found"
                        subTitle=""
                    />
                )}
            </Dialog>
            <ConfirmDialog
                showConfirm={showConfirm}
                title="Comment"
                subTitle="Are you sure, you want to Delete this comment?"
                onCancel={() => {
                    setShowConfirm(false);
                }}
                onSuccess={() => {
                    setShowConfirm(false);
                    actionDeleteComment(activeCommentId);
                }}
                successTitle="Yes"
                cancelTitle="No"
            />
        </>
    );
};

export default CommentModal;
