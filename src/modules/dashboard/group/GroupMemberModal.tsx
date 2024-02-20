import {
    Dialog,
    Box,
    DialogContent,
    Typography,
    IconButton,
    TextField,
    TableCell,
    TableRow,
    TableBody,
    Table,
} from '@mui/material';
import { ReactElement, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { AppSelect } from 'shared/components/AppComponents';
import { useDebouncedEffect } from 'shared/hooks/useDebounce';
import { GroupServices } from 'services/GroupServices';
import { DefaultPagination, RowsOption } from 'services';
import { Utils } from 'shared/helpers';
import { AppTableHeader, EmptyList } from 'shared/components';
import AppTablePagination from 'shared/components/AppTablePagination';

const Status = [
    { titleKey: 'Active', valueKey: 'active' },
    { titleKey: 'Blocked', valueKey: 'blocked' },
    { titleKey: 'All', valueKey: '' },
];

const columns = [
    {
        title: 'SI.No',
        columnName: '',
        hasFilter: false,
    },
    {
        title: 'Name',
        placeholder: 'name',
        columnName: 'name',
        hasFilter: false,
        type: 'text',
        value: '',
    },
];

const GroupMemberModal = (props: any): ReactElement => {
    const { open, onClose, activeMemId } = props;
    const [searchValue, setSearchValue] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [pagination, setPagination] = useState({ ...DefaultPagination(25) });
    const [loader, setLoader] = useState(true);
    const [groupMemberList, setGroupMemberList] = useState<any[]>([]);

    // API Calls
    const loadgroupMember = (searchValue: string, id: number): void => {
        setLoader(true);
        GroupServices.groupMembers(
            pagination.pageNo,
            pagination.pageOffset,
            searchValue,
            id
        )
            .then((response: any) => {
                const { results, pagination } = response.data.data;
                if (results) {
                    setGroupMemberList(results);
                    setPagination(pagination);
                }
                setLoader(false);
            })
            .catch((error: any) => {
                setLoader(false);
                Utils.handleErrorResponse(error);
            });
    };

    const onMemberSearch = (e: any): any => {
        // setloadingUsersList(true);
        const searchTerm = e.target.value;
        setSearchValue(searchTerm);
    };
    const actionOnClearSearch = (): any => {
        if (searchValue !== '') {
            setSearchValue('');
        }
    };
    useDebouncedEffect(
        () => {
            loadgroupMember(searchValue, activeMemId);
        },
        [searchValue, selectedValue],
        1000
    );

    const actionHandleLimitChange = (pageNumber: number): void => {
        pagination.pageOffset = pageNumber;
        pagination.pageNo = 1;
        loadgroupMember(searchValue, activeMemId);
    };

    const actionHandlePageChange = (newPage: number): void => {
        pagination.pageNo = newPage;
        loadgroupMember(searchValue, activeMemId);
    };

    return (
        <Dialog maxWidth="md" fullWidth id="confirm-dialog" open={open}>
            <Box padding={2}>
                <DialogContent className="dialog-content-container">
                    <Box className="justify-space-between align-center">
                        <Typography className="report-modal-title">
                            Group Members
                        </Typography>
                        <Box className="flex align-center">
                            <TextField
                                fullWidth
                                className="search-box "
                                variant="outlined"
                                size="small"
                                placeholder="Search"
                                value={searchValue}
                                onChange={(e) => onMemberSearch(e)}
                                InputProps={{
                                    startAdornment: (
                                        <SearchIcon className="mr-2" />
                                    ),
                                    endAdornment: (
                                        <IconButton
                                            type="button"
                                            onClick={actionOnClearSearch}
                                        >
                                            <ClearIcon
                                                className={
                                                    searchValue
                                                        ? 'grey'
                                                        : 'white'
                                                }
                                            />
                                        </IconButton>
                                    ),
                                }}
                            />
                            <IconButton
                                className="mb-4 ml-4"
                                title="Close"
                                aria-label="Close"
                                onClick={() => onClose()}
                            >
                                <img
                                    src="/images/icons/icon_close.svg"
                                    width={20}
                                    height={20}
                                />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box className="comment-box mt-3">
                        {false && (
                            <Box className="select-box-style">
                                <AppSelect
                                    label="Status "
                                    placeholder="Select Status"
                                    name="country"
                                    items={Status}
                                    valueKey="valueKey"
                                    titleKey="titleKey"
                                    outerLabel
                                    onChange={(e: any) => {
                                        setSelectedValue(e.target.value);
                                    }}
                                />
                            </Box>
                        )}
                    </Box>

                    <Table>
                        <AppTableHeader
                            tableColumns={columns}
                            onFilterChange=""
                        />
                        {!loader && groupMemberList.length > 0 && (
                            <TableBody>
                                {groupMemberList.map((group: any, index) => (
                                    <TableRow hover key={index}>
                                        <TableCell>
                                            <Typography>{index + 1}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                {group.member.name} <br />
                                                {group.member.phoneNumber}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        )}
                    </Table>
                    {groupMemberList.length === 0 && (
                        <EmptyList
                            showEmpty={groupMemberList.length === 0}
                            showLoader={loader}
                            title="No records found"
                            subTitle=""
                        />
                    )}
                    <AppTablePagination
                        totalRecords={pagination.totalRecords}
                        onPageChange={actionHandlePageChange}
                        onRowsPerPageChange={actionHandleLimitChange}
                        rowsPerPageOptions={RowsOption}
                        page={pagination.pageNo}
                    />
                </DialogContent>
            </Box>
        </Dialog>
    );
};

export default GroupMemberModal;
