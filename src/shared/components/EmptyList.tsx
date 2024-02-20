import { Box, CircularProgress, Typography } from '@mui/material';
import { ReactElement } from 'react';

const EmptyList = (props: any): ReactElement => {
    const { showEmpty, showLoader, title, subTitle } = props;

    // UI Elements
    return (
        <Box className="empty-list">
            {showEmpty && !showLoader && (
                <>
                    <Typography className="f20 title">{title}</Typography>
                    <Typography className="f18 description">
                        {subTitle}
                    </Typography>
                </>
            )}
            {showLoader && <CircularProgress />}
        </Box>
    );
};

export default EmptyList;
