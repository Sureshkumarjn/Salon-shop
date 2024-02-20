import { Box, IconButton, Avatar, Drawer, Badge } from '@mui/material';
import {
    ChangePassword,
    ProfileDetail,
    Notifications,
    ApplicationContext,
    IApplicationProps,
    ChangeLanguage,
} from 'modules/dashboard';
import { ReactElement, useContext, useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type Anchor = 'profile' | 'notification' | 'changePassword' | 'changeLanguage';

const DrawerStates = {
    notification: false,
    profile: false,
    changePassword: false,
    changeLanguage: false,
};

const AppHeader = (): ReactElement => {
    const location = useLocation();
    const [state, setState] = useState({
        ...DrawerStates,
    });

    const { profileState, appConfig } = useContext(
        ApplicationContext
    ) as IApplicationProps;
    const { language } = appConfig;

    const toggleDrawer = (anchor: Anchor, open: boolean): void =>
        setState({ ...DrawerStates, [anchor]: open });

    // Hooks
    const profileUrl = useMemo(
        () => profileState.profileImage || '/images/icons/profile_icon.svg',
        [profileState.profileImage]
    );

    useEffect(() => {
        setState({ ...DrawerStates });
    }, [location.pathname]);

    // UI Elements
    return (
        // UI Elements
        <Box className="app-header">
            <Box className="flex-grow" />
            <Box className="menus">
                <Avatar
                    title="Profile Menu"
                    className="cursor"
                    src={profileUrl}
                    sx={{ width: 50, height: 50 }}
                    onClick={() => toggleDrawer('profile', true)}
                />

                {false && (
                    <>
                        <IconButton
                            size="large"
                            className="circle-menu"
                            onClick={() => toggleDrawer('notification', true)}
                        >
                            <Badge
                                badgeContent={
                                    profileState.unreadCount > 9
                                        ? '9+'
                                        : profileState.unreadCount
                                }
                                color="secondary"
                            >
                                <img src="/images/icons/icon_notification.svg" />
                            </Badge>
                        </IconButton>

                        <Drawer
                            className="drawer-panel"
                            anchor={
                                language.direction === 'rtl' ? 'left' : 'right'
                            }
                            open={state.notification}
                            onClose={() => toggleDrawer('notification', false)}
                        >
                            <Notifications
                                {...{
                                    onClose: () =>
                                        toggleDrawer('notification', false),
                                }}
                            />
                        </Drawer>
                    </>
                )}

                <Drawer
                    className="drawer-panel"
                    anchor={language.direction === 'rtl' ? 'left' : 'right'}
                    open={state.profile}
                    onClose={() => toggleDrawer('profile', false)}
                >
                    <ProfileDetail
                        {...{
                            onClose: () => toggleDrawer('profile', false),
                            showChangePassword: () =>
                                toggleDrawer('changePassword', true),
                            showChangeLanguage: () =>
                                toggleDrawer('changeLanguage', true),
                        }}
                    />
                </Drawer>

                <Drawer
                    className="drawer-panel"
                    anchor={language.direction === 'rtl' ? 'left' : 'right'}
                    open={state.changePassword}
                    onClose={() => toggleDrawer('changePassword', false)}
                >
                    <ChangePassword
                        {...{
                            onClose: () => toggleDrawer('profile', true),
                        }}
                    />
                </Drawer>

                {/** change Language */}
                <Drawer
                    className="drawer-panel"
                    anchor={language.direction === 'rtl' ? 'left' : 'right'}
                    open={state.changeLanguage}
                    onClose={() => toggleDrawer('changeLanguage', false)}
                >
                    <ChangeLanguage
                        {...{
                            onClose: () => toggleDrawer('profile', true),
                        }}
                    />
                </Drawer>
            </Box>
        </Box>
    );
};
export default AppHeader;
