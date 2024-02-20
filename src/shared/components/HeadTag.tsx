import { ReactElement } from 'react';
import { Helmet } from 'react-helmet';

const HeadTag = (props: any): ReactElement => {
    const { title } = props;
    // UI Elements
    return (
        <Helmet>
            <title> Admin | {title}</title>
        </Helmet>
    );
};

export default HeadTag;
