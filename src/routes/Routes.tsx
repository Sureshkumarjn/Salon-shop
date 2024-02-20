import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import DesignBook from '../shared/components/DesignBook';
import AuthRoutes from './AuthRoutes';
import { CheckAuth } from './RouteGuard';

const DashboardWrapper = lazy(
    () => import('modules/dashboard/DashboardWrapper')
);
const DashboardPage = lazy(() => import('modules/dashboard/DashboardPage'));
const UsersPage = lazy(() => import('modules/dashboard/users/UsersPage'));
const GroupPage = lazy(
    () => import('modules/dashboard/spotLight/SpotLightVideoPage')
);
const SpotLightVideoPage = lazy(
    () => import('modules/dashboard/group/GroupPage')
);
const ReportVideoPage = lazy(
    () => import('modules/dashboard/reportVideo/ReportVideoPage')
);
const AppConfigPage = lazy(
    () => import('modules/dashboard/appConfig/AppConfig')
);
const SubscriptionsPage = lazy(
    () => import('modules/dashboard/subscriptions/SubscriptionsPage')
);
const VirtualGiftsPage = lazy(
    () => import('modules/dashboard/virtualGifts/VirtualGiftsPage')
);
const PointsPackages = lazy(
    () => import('modules/dashboard/pointsPackages/PointsPackagesPage')
);
const WithdrawRequestPage = lazy(
    () => import('modules/dashboard/withdrawRequest/WithdrawRequestPage')
);

const routes = (isUserLoggedIn: boolean): any => [
    ...AuthRoutes(),
    {
        path: '',
        element: CheckAuth(isUserLoggedIn, <DashboardWrapper />),
        children: [
            { path: 'dashboard', element: <DashboardPage /> },
            { path: 'users', element: <UsersPage /> },
            { path: 'communities', element: <UsersPage /> },
            { path: 'config', element: <AppConfigPage /> },
            { path: 'report', element: <ReportVideoPage /> },
            { path: 'spot-light', element: <SpotLightVideoPage /> },
            { path: 'group', element: <GroupPage /> },
            { path: 'points-packages', element: <PointsPackages /> },
            { path: 'virtual-gifts', element: <VirtualGiftsPage /> },
            { path: 'subscription', element: <SubscriptionsPage /> },
            { path: 'withdraw-request', element: <WithdrawRequestPage /> },
            { path: '', element: <Navigate to="users" /> },
        ],
    },
    { path: '', element: <Navigate to="/login" /> },
    { path: '*', element: <Navigate to="/404" /> },
    { path: '/style', element: <DesignBook /> },
];

export default routes;
