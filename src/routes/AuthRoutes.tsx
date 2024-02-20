import { lazy } from 'react';

const LoginPage = lazy(() => import('modules/authentication/LoginPage'));
const ForgotPasswordPage = lazy(
    () => import('modules/authentication/ForgotPasswordPage')
);

const AuthRoutes = (): any => [
    {
        path: 'login',
        element: <LoginPage />,
    },
    {
        path: 'forgot-password',
        element: <ForgotPasswordPage />,
    },
];

export default AuthRoutes;
