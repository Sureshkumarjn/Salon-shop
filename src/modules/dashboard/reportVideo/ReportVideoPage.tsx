import { ReactElement } from 'react';
import { HeadTag } from 'shared/components';
import ReportVideoList from './components/ReportVideoList';

const ReportVideoPage = (): ReactElement => (
    <>
        <HeadTag title="User List" />
        <ReportVideoList />
    </>
);

export default ReportVideoPage;
