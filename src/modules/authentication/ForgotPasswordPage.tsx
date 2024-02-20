import { ReactElement } from 'react';
import { HeadTag } from 'shared/components';
import { ForgotPassword } from './components';

const ForgotPasswordPage = (): ReactElement => (
    <>
        <HeadTag title="Forgot Password" />
        <ForgotPassword />
    </>
);

export default ForgotPasswordPage;
