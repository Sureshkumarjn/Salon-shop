import { Box, Typography } from '@mui/material';
import { ReactElement } from 'react';

const DashboardPage = (): ReactElement => (
    <Box className="dashboard">
        <Typography
            variant="h1"
            align="center"
            className="m-10 py-20 text-gray"
        >
            Under Development
        </Typography>
    </Box>
);
export default DashboardPage;
