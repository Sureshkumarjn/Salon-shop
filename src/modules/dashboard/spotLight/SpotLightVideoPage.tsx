import { ReactElement } from 'react';
import { HeadTag } from 'shared/components';
import SpotLightVideoList from './components/SpotLightVideoList';

const SpotLightVideoPage = (): ReactElement => (
    <>
        <HeadTag title="User List" />
        <SpotLightVideoList />
    </>
);

export default SpotLightVideoPage;
