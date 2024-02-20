import { ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import SystemUpdateIcon from '@mui/icons-material/SystemUpdate';
import { useTranslation } from 'react-i18next';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import GroupsIcon from '@mui/icons-material/Groups';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import RequestPageIcon from '@mui/icons-material/RequestPage';

const AppSidebar = (): ReactElement => {
    const { t } = useTranslation();

    return (
        <Box className="app-sidebar">
            <Box className="py-5">
                <NavLink title="App Logo" to="/users">
                    <Box className="logo-style">
                        <img width={50} src="/images/logo.svg" />
                        <Typography className="logo-text ml-2">
                            Tk Takh
                        </Typography>
                        {/* <img width={200} src="/images/LockPhone.svg" /> */}
                    </Box>
                </NavLink>
            </Box>

            <Box className="menus">
                <Box
                    title={t('SideBar.Menu.Users')}
                    className="menu"
                    component={NavLink}
                    to="/users"
                >
                    <img
                        src="/images/icons/sidemenu/icon_users.svg"
                        className="mr-2"
                    />
                    <Typography>{t('SideBar.Menu.Users')}</Typography>
                </Box>
                <Box
                    title={t('SideBar.Menu.Communities')}
                    className="menu"
                    component={NavLink}
                    to="/communities"
                >
                    <SupervisorAccountIcon className="mr-2" />
                    <Typography>{t('SideBar.Menu.Communities')}</Typography>
                </Box>
                <Box
                    title={t('SideBar.Menu.Report')}
                    className="menu"
                    component={NavLink}
                    to="/report"
                >
                    <OndemandVideoIcon className="mr-2" />
                    <Typography>{t('SideBar.Menu.Report')}</Typography>
                </Box>
                <Box
                    title={t('SideBar.Menu.SpotLight')}
                    className="menu"
                    component={NavLink}
                    to="/spot-light"
                >
                    <SmartDisplayIcon className="mr-2" />
                    <Typography>{t('SideBar.Menu.SpotLight')}</Typography>
                </Box>
                <Box
                    title={t('SideBar.Menu.Group')}
                    className="menu"
                    component={NavLink}
                    to="/group"
                >
                    <GroupsIcon className="mr-2" />
                    <Typography>{t('SideBar.Menu.Group')}</Typography>
                </Box>
                <Box
                    title={t('SideBar.Menu.PointsPackages')}
                    className="menu"
                    component={NavLink}
                    to="/points-packages"
                >
                    <LoyaltyIcon className="mr-2" />
                    <Typography>{t('SideBar.Menu.PointsPackages')}</Typography>
                </Box>
                <Box
                    title={t('SideBar.Menu.VirtualGifts')}
                    className="menu"
                    component={NavLink}
                    to="/virtual-gifts"
                >
                    <CardGiftcardIcon className="mr-2" />
                    <Typography>{t('SideBar.Menu.VirtualGifts')}</Typography>
                </Box>
                <Box
                    title={t('SideBar.Menu.Subscription')}
                    className="menu"
                    component={NavLink}
                    to="/subscription"
                >
                    <SubscriptionsIcon className="mr-2" />
                    <Typography>{t('SideBar.Menu.Subscription')}</Typography>
                </Box>
                <Box
                    title={t('SideBar.Menu.WithdrawRequest')}
                    className="menu"
                    component={NavLink}
                    to="/withdraw-request"
                >
                    <RequestPageIcon className="mr-2" />
                    <Typography>{t('SideBar.Menu.WithdrawRequest')}</Typography>
                </Box>
                <Box
                    title={t('SideBar.Menu.VersionConfig')}
                    className="menu"
                    component={NavLink}
                    to="/config"
                >
                    <SystemUpdateIcon className="mr-2" />
                    <Typography>{t('SideBar.Menu.VersionConfig')}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default AppSidebar;
