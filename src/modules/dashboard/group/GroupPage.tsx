import {
    Box,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { ReactElement, useState } from 'react';
import { AppTableHeader, EmptyList } from 'shared/components';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { DefaultPagination, RowsOption } from 'services';
import { Utils } from 'shared/helpers';
import AppTablePagination from 'shared/components/AppTablePagination';
import { useDebouncedEffect } from 'shared/hooks/useDebounce';
import { AppPrimaryButton, AppSelect } from 'shared/components/AppComponents';
import { GroupServices } from 'services/GroupServices';
import GroupMemberModal from './GroupMemberModal';

const GroupPage = (): ReactElement => {
    const [pagination, setPagination] = useState({ ...DefaultPagination(25) });
    const [loader, setLoader] = useState(true);
    const [groupList, setGroupList] = useState<any[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [showMemberModal, setShowMemberModal] = useState(false);
    const [activeMemId, setActiveMemId] = useState(0);

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
            title: 'Group Title',
            placeholder: 'reportedBy',
            columnName: 'reportedBy',
            hasFilter: false,
            type: 'text',
            value: '',
        },
        {
            title: 'Created By',
            columnName: 'video',
            hasFilter: false,
            type: 'number',
            value: '',
        },
        {
            title: 'Status',
            placeholder: 'videoOwner',
            columnName: 'email',
            hasFilter: false,
            type: 'text',
            value: '',
        },
        {
            title: 'Description',
            columnName: 'status',
            hasFilter: false,
            type: 'text',
            value: '',
        },
        {
            title: 'Member',
            columnName: 'Member',
            hasFilter: false,
            type: 'text',
            value: '',
        },
    ];

    // API Calls
    const loadgroupList = (
        searchValue: string,
        selectedValue: string
    ): void => {
        setLoader(true);
        GroupServices.group(
            pagination.pageNo,
            pagination.pageOffset,
            searchValue,
            selectedValue
        )
            .then((response: any) => {
                const { results, pagination } = response.data.data;
                if (results) {
                    setGroupList(results);
                    setPagination(pagination);
                }
                setLoader(false);
            })
            .catch((error: any) => {
                setLoader(false);
                Utils.handleErrorResponse(error);
            });
    };

    const actionHandleLimitChange = (pageNumber: number): void => {
        pagination.pageOffset = pageNumber;
        pagination.pageNo = 1;
        loadgroupList(searchValue, selectedValue);
    };

    const actionHandlePageChange = (newPage: number): void => {
        pagination.pageNo = newPage;
        loadgroupList(searchValue, searchValue);
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

    const getStatus = (status: string): any => {
        switch (status) {
            case 'all':
                return 'All';
            case 'active':
                return 'Active';
            case 'blocked':
                return 'Blocked';

            default:
                break;
        }
        return '';
    };
    useDebouncedEffect(
        () => {
            loadgroupList(searchValue, selectedValue);
        },
        [searchValue, selectedValue],
        1000
    );

    return (
        <Box className="app-card">
            <Box className="card-header">
                <Typography className="title fw-6">Group</Typography>
            </Box>
            <Box className="comment-box px-5 mt-3">
                <TextField
                    className="search-box "
                    variant="outlined"
                    size="small"
                    placeholder="Search"
                    value={searchValue}
                    onChange={(e) => onMemberSearch(e)}
                    InputProps={{
                        startAdornment: <SearchIcon className="mr-2" />,
                        endAdornment: (
                            <IconButton
                                type="button"
                                onClick={actionOnClearSearch}
                            >
                                <ClearIcon
                                    className={searchValue ? 'grey' : 'white'}
                                />
                            </IconButton>
                        ),
                    }}
                />
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
            </Box>
            <Box className="">
                <Table>
                    <AppTableHeader tableColumns={columns} onFilterChange="" />
                    {!loader && groupList.length > 0 && (
                        <TableBody>
                            {groupList.map((group: any, index) => (
                                <TableRow hover key={index}>
                                    <TableCell>
                                        <Typography>{index + 1}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{group.title}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            {group.createdBy.name} <br />
                                            {group.createdBy.phoneNumber}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            {getStatus(group.status)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            {group.description}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {/* <Typography
                                            onClick={() => {
                                                // setActiveReportedVideo(report);
                                                // setShowReportVideoModal(true);
                                                console.log('');
                                            }}
                                            className="report-video-link"
                                        >
                                            View Member
                                        </Typography> */}
                                        <AppPrimaryButton
                                            title="View"
                                            className="btn-small"
                                            onClick={() => {
                                                setActiveMemId(group.groupId);
                                                setShowMemberModal(true);
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    )}
                </Table>
                {groupList.length === 0 && (
                    <EmptyList
                        showEmpty={groupList.length === 0}
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
            </Box>

            {showMemberModal && activeMemId && (
                <GroupMemberModal
                    open={showMemberModal}
                    onClose={() => setShowMemberModal(false)}
                    activeMemId={activeMemId}
                />
            )}
        </Box>
    );
};

export default GroupPage;
