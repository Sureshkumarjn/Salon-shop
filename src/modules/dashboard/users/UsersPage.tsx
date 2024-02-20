import { ReactElement } from 'react';
import { HeadTag } from 'shared/components';
import { UserList } from './components';

const UserPage = (): ReactElement => (
    <>
        <HeadTag title="User List" />
        <UserList />
    </>
);

export default UserPage;
