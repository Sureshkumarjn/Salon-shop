import { ReactElement } from 'react';
import { HeadTag } from 'shared/components';
import { LoginForm } from './components';

const LoginPage = (): ReactElement => (
    <>
        <HeadTag title="Login" />
        <LoginForm />
    </>
);

export default LoginPage;
