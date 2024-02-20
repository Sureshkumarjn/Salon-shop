import { ReactElement } from 'react';
import { HeadTag } from 'shared/components';
import { WithdrawRequestList } from './components';

const WithdrawRequestPage = (): ReactElement => (
    <>
        <HeadTag title="Withdraw Request" />
        <WithdrawRequestList />
    </>
);

export default WithdrawRequestPage;
