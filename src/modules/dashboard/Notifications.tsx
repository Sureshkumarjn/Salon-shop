import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Typography,
} from '@mui/material';
import { ReactElement, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from 'state/RootReducer';
import { ProfileState } from 'state/profile/Reducer';
import moment from 'moment';
import { AppPrimaryButtonOutlined } from 'shared/components/AppComponents';
import { ProfileService } from 'services';
import TimeAgo from 'react-timeago';
import { useNavigate } from 'react-router';
import { INotification } from 'interface/Interface';
import { ProfileActions } from 'state/profile/Action';

const Notifications = (props: any): ReactElement => {
    const {
        profileState,
        onClose,
        setNotification,
        setNotificationCount,
        resetNotifiction,
    }: {
        profileState: ProfileState;
        onClose: () => void;
        setNotification: (data: any) => void;
        setNotificationCount: (count: number) => void;
        resetNotifiction: () => void;
    } = props;
    const { notifications, hasMoreRecord } = profileState;
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const navigate = useNavigate();

    // API Calls
    const markNotificationAsRead = (notification: INotification): void => {
        ProfileService.markNotificationAsRead({
            resourceIds: notification.notificationId,
        }).then((response) => {
            const { unreadCount } = response.data.data;
            setNotificationCount(unreadCount);
        });
    };

    // Instance methods
    const redirect = (notification: INotification): void => {
        try {
            switch (notification.notificationType) {
                default:
                    navigate(`/events`);
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    };

    // UI Actions
    const actionOnClickNotification = (
        notification: INotification,
        index: number
    ): void => {
        redirect(notification);
        if (notification.isRead === 0) {
            markNotificationAsRead(notification);
            notifications[index].isRead = 1;
            resetNotifiction();
            setNotification({
                hasMoreRecord,
                notifications: [...notifications],
            });
        }
    };

    // UI Elements
    return (
        <>
            <Box className="px-5 pt-5">
                <Box className="profile-heading">
                    <Typography variant="h4" className="settings-style">
                        Notification
                    </Typography>
                    <IconButton
                        title="Close"
                        aria-label="Close"
                        onClick={onClose}
                    >
                        <img
                            src="/images/icons/icon_close.svg"
                            width={20}
                            height={20}
                        />
                    </IconButton>
                </Box>
            </Box>

            <List>
                {notifications.map((notification, index) => (
                    <ListItem
                        key={notification.notificationId}
                        disablePadding
                        onClick={() =>
                            actionOnClickNotification(notification, index)
                        }
                    >
                        <ListItemButton>
                            <Box className="notification-container p-3">
                                <Typography className="">
                                    {notification.message}
                                </Typography>
                                <Box className="justify-space-between align-center">
                                    <Box className="align-center">
                                        {notification.isRead === 0 && (
                                            <>
                                                <Typography className="new">
                                                    New
                                                </Typography>
                                                <Typography className="text-secondary ml-1 f12">
                                                    <TimeAgo
                                                        date={
                                                            notification.createdAt
                                                        }
                                                    />
                                                </Typography>
                                            </>
                                        )}
                                    </Box>
                                    <Box className="notification-time mt-1">
                                        <img
                                            width={15}
                                            src="/images/icons/icon_clock.svg"
                                        />
                                        <Typography
                                            variant="body2"
                                            className="ml-1"
                                        >
                                            {moment(
                                                notification.createdAt
                                            ).format('HH:mm')}
                                        </Typography>
                                        <Box className="vertical-line ml-2 mr-2" />
                                        <img
                                            width={15}
                                            src="/images/icons/icon_calender.svg"
                                        />
                                        <Typography
                                            variant="body2"
                                            className="ml-1"
                                        >
                                            {moment(
                                                notification.createdAt
                                            ).format('DD MMM YYYY')}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            {hasMoreRecord && (
                <AppPrimaryButtonOutlined
                    className="m-5"
                    isLoading={isLoadingMore}
                    title="Load More"
                    onClick={() => {
                        setIsLoadingMore(true);
                        const lastNotification =
                            notifications[notifications.length - 1];
                        ProfileService.loadNotifictionAndSave(
                            lastNotification.notificationId,
                            10
                        )
                            .then(() => {})
                            .catch(() => {})
                            .finally(() => {
                                setIsLoadingMore(false);
                            });
                    }}
                />
            )}
        </>
    );
};

const mapStateToProps = (state: AppState): any => ({
    profileState: state.profileState,
});

const mapDispatchToProps = (dispatch: any): any => ({
    setNotification: (data: any) =>
        dispatch(ProfileActions.setNotification(data)),
    setNotificationCount: (data: any) =>
        dispatch(ProfileActions.setNotificationCount(data)),
    resetNotifiction: (data: any) =>
        dispatch(ProfileActions.resetNotifiction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
