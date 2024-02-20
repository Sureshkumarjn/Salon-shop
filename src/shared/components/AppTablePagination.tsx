import { Pagination, Box, MenuItem, Typography } from '@mui/material';
import { ReactElement, useState } from 'react';
import { CustomSelectInput } from './AppComponents';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export interface IAppTablePagination {
    totalRecords: number;
    page: number;
    rowsPerPageOptions: number[];
    onPageChange: (pageNo: number) => void;
    onRowsPerPageChange: (limit: number) => void;
}
const AppTablePagination = (props: IAppTablePagination): ReactElement => {
    const {
        totalRecords,
        page,
        rowsPerPageOptions,
        onPageChange,
        onRowsPerPageChange,
    } = props;
    const [pageLimit, setPageLimit] = useState(rowsPerPageOptions[0]);

    // UI Elements
    return (
        <Box className="table-pagination">
            <Box className="align-center">
                <CustomSelectInput
                    select
                    variant="outlined"
                    className="black-border"
                    value={pageLimit}
                    onChange={(event: any) => {
                        const { value } = event.target;
                        onRowsPerPageChange(value);
                        setPageLimit(value);
                    }}
                    size="small"
                    IconComponent={KeyboardArrowDownIcon}
                >
                    {rowsPerPageOptions.map((item: number, i: number) => (
                        <MenuItem key={`value${i}`} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </CustomSelectInput>
                <Typography className="ml-2">Records per page</Typography>
            </Box>

            <Pagination
                page={page}
                color="primary"
                count={Math.ceil(totalRecords / pageLimit)}
                variant="outlined"
                shape="rounded"
                onChange={(data: any, page: number) => {
                    onPageChange(page);
                }}
            />
        </Box>
    );
};

export default AppTablePagination;
