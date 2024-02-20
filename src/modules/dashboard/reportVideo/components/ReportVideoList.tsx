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
import ReportVideoModal from './ReportedVideoModal';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { ReportedVideoService } from 'services/ReportedVideoService';
import { DefaultPagination, RowsOption } from 'services';
import { Utils } from 'shared/helpers';
import AppTablePagination from 'shared/components/AppTablePagination';
import { useDebouncedEffect } from 'shared/hooks/useDebounce';
import { AppSelect } from 'shared/components/AppComponents';

const ReportVideoList = (): ReactElement => {
    const [showReportVideoModal, setShowReportVideoModal] = useState(false);
    const [pagination, setPagination] = useState({ ...DefaultPagination(25) });
    const [loader, setLoader] = useState(true);
    const [reportList, setReportList] = useState<any[]>([]);
    const [activeReportedVideo, setActiveReportedVideo] = useState<any[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedValue, setSelectedValue] = useState('');

    const Status = [
        { titleKey: 'Open', valueKey: 'open' },
        { titleKey: 'Ignored', valueKey: 'ignored' },
        { titleKey: 'Resolved', valueKey: 'resolved' },
        { titleKey: 'All', valueKey: '' },
    ];

    const columns = [
        {
            title: 'SI.No',
            columnName: '',
            hasFilter: false,
        },
        {
            title: 'Reported By',
            placeholder: 'reportedBy',
            columnName: 'reportedBy',
            hasFilter: false,
            type: 'text',
            value: '',
        },
        {
            title: 'Video',
            columnName: 'video',
            hasFilter: false,
            type: 'number',
            value: '',
        },
        {
            title: 'Video Owner',
            placeholder: 'videoOwner',
            columnName: 'email',
            hasFilter: false,
            type: 'text',
            value: '',
        },
        {
            title: 'Reason',
            columnName: 'reason',
            hasFilter: false,
            type: 'text',
            value: '',
        },
        {
            title: 'Status',
            columnName: 'status',
            hasFilter: false,
            type: 'text',
            value: '',
        },
        {
            title: 'Actioned By',
            columnName: 'actionedBy',
            hasFilter: false,
            type: 'text',
            value: '',
        },
    ];

    // API Calls
    const loadReportList = (
        searchValue: string,
        selectedValue: string
    ): void => {
        setLoader(true);
        ReportedVideoService.Report(
            pagination.pageNo,
            pagination.pageOffset,
            searchValue,
            selectedValue
        )
            .then((response: any) => {
                const { results, pagination } = response.data.data;
                if (results) {
                    setReportList(results);
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
        loadReportList(searchValue, selectedValue);
    };

    const actionHandlePageChange = (newPage: number): void => {
        pagination.pageNo = newPage;
        loadReportList(searchValue, searchValue);
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

    const reloadList = (): void => {
        pagination.pageNo = 1;
        loadReportList(searchValue, selectedValue);
    };

    const getStatus = (status: string): any => {
        switch (status) {
            case 'open':
                return 'Open';
            case 'ignored':
                return 'Ignored';
            case 'resolved':
                return 'Resolved';
            default:
                break;
        }
        return '';
    };

    useDebouncedEffect(
        () => {
            loadReportList(searchValue, selectedValue);
        },
        [searchValue, selectedValue],
        1000
    );

    return (
        <Box className="app-card">
            <Box className="card-header">
                <Typography className="title fw-6">Report Videos</Typography>
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
                    {!loader && reportList.length > 0 && (
                        <TableBody>
                            {reportList.map((report: any, index) => (
                                <TableRow hover key={index}>
                                    <TableCell>
                                        <Typography>{index + 1}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            {report.user.name} <br />
                                            {report.user.phoneNumber}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            onClick={() => {
                                                setActiveReportedVideo(report);
                                                setShowReportVideoModal(true);
                                            }}
                                            className="report-video-link"
                                        >
                                            View Video
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {report.actionedUser ? (
                                            <Typography>
                                                {report.actionedUser.name}
                                                <br />
                                                {
                                                    report.actionedUser
                                                        .phoneNumber
                                                }
                                            </Typography>
                                        ) : (
                                            <Typography>-</Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{report.reason}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            {getStatus(report.status)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            {report.actionedUser
                                                ? report.actionedUser.name
                                                : '-'}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    )}
                </Table>
                {reportList.length === 0 && (
                    <EmptyList
                        showEmpty={reportList.length === 0}
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
            {showReportVideoModal && activeReportedVideo && (
                <ReportVideoModal
                    open={showReportVideoModal}
                    onClose={(reload: boolean) => {
                        setShowReportVideoModal(false);
                        if (reload) reloadList();
                    }}
                    activeReportedVideo={activeReportedVideo}
                />
            )}
        </Box>
    );
};

export default ReportVideoList;
