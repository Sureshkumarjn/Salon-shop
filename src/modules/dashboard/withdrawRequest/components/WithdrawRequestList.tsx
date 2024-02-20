import {
    Box,
    Typography,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Avatar,
    TableContainer,
    IconButton,
} from '@mui/material';
import { useState, useEffect, ReactElement } from 'react';
import {
    DefaultPagination,
    RowsOption,
    WithdrawRequestService,
} from 'services';
import { AppTableHeader, EmptyList } from 'shared/components';
import { Utils } from 'shared/helpers';
import AppTablePagination from 'shared/components/AppTablePagination';
import { useTranslation } from 'react-i18next';
import { AppState } from 'state/RootReducer';
import { connect } from 'react-redux';
import { IUserBase } from 'modules/dashboard/users/components/UserList';
import moment from 'moment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import WithdrawRequestForm from './WithdrawRequestForm';
import { IAdminUser } from 'interface/Interface';

export interface ISettings {
    settingId: string;
    autoScrollingFeedEnabled: number;
    autoPlayMusicPlayerEnabled: number;
    mirrorFrontCameraEnabled: number;
    videoResolution: string;
    language: string;
    subscription: any;
    isDeleted: number;
    createdAt: string;
    updatedAt: string;
    commissionType: string;
    standardCommission: string;
    coinWithdrawCommission: string;
    diamondWithdrawCommission: string;
    sarDiamondValue: string;
    sarCoinValue: string;
}

export interface IWithdrawRequest {
    withdrawRequestId: string;
    withdrawType: string;
    noOfItem: number;
    itemValue: string;
    totalValue: string;
    commission: string;
    commissionValue: string;
    payableAmount: string;
    accountName: string;
    accountNo: string;
    ibanNo: string;
    status: string;
    notes: null;
    createdAt: Date;
    updatedAt: Date;
    user: IUserBase;
    actionedBy: IAdminUser;
}

const enum IWithdrawStatus {
    PENDING = 'pending',
    REJECTED = 'rejected',
    APPROVED = 'approved',
}

interface FilterProps {
    status: string;
}

const WithdrawRequestList = (): ReactElement => {
    const { t } = useTranslation();
    const [withdrawRequests, setWithdrawRequests] = useState<
        IWithdrawRequest[]
    >([]);
    const [pagination, setPagination] = useState({ ...DefaultPagination(25) });
    const [loader, setLoader] = useState(true);
    const [filter, setFilter] = useState({} as FilterProps);
    const [showForm, setShowForm] = useState(false);
    const [activeRequest, setActiveRequest] = useState('');
    const [actionType, setActionType] = useState('');
    const [columns] = useState<any[]>([
        {
            title: t('WithdrawRequestPage.Table.SNo'),
            columnName: 'S.No',
            hasFilter: false,
        },
        {
            title: t('WithdrawRequestPage.Table.UserName'),
            hasFilter: true,
            type: 'text',
            value: '',
            columnName: 'name',
        },
        {
            title: t('WithdrawRequestPage.Table.WithdrawSummary'),
            hasFilter: false,
        },
        {
            title: t('WithdrawRequestPage.Table.BankDetails'),
            hasFilter: true,
            type: 'text',
            value: '',
            columnName: 'bank',
        },
        {
            title: t('WithdrawRequestPage.Table.RequestedDate'),
            hasFilter: false,
        },
        {
            title: t('WithdrawRequestPage.Table.Status'),
            columnName: 'status',
            hasFilter: true,
            type: 'select',
            value: '',
            options: [
                {
                    title: 'Choose Status',
                    value: '',
                },
                {
                    title: 'Pending',
                    value: 'pending',
                },
                {
                    title: 'Approved',
                    value: 'approved',
                },
                {
                    title: 'Rejected',
                    value: 'rejected',
                },
            ],
        },
        {
            title: t('WithdrawRequestPage.Table.ActionedDate'),
            hasFilter: false,
        },
        {
            title: t('WithdrawRequestPage.Table.ActionedBy'),
            hasFilter: true,
            type: 'text',
            value: '',
            columnName: 'admin',
        },
        {
            title: t('WithdrawRequestPage.Table.Action'),
        },
    ]);

    const prepareQueryParams = (): string => {
        const params: any = {
            pageNo: pagination.pageNo,
            pageSize: pagination.pageOffset,
            ...filter,
        };
        return new URLSearchParams(params).toString();
    };

    // API Calls
    const loadWithdrawRequestList = (): void => {
        setLoader(true);
        WithdrawRequestService.withdrawRequestList(prepareQueryParams())
            .then((response: any) => {
                const { results, pagination } = response.data.data;
                if (results) {
                    setWithdrawRequests(results);
                    setPagination(pagination);
                }
                setLoader(false);
            })
            .catch((error: any) => {
                setLoader(false);
                Utils.handleErrorResponse(error);
            });
    };

    // UI Actions
    const actionHandleLimitChange = (pageNumber: number): void => {
        pagination.pageOffset = pageNumber;
        pagination.pageNo = 1;
        loadWithdrawRequestList();
    };

    const actionHandlePageChange = (newPage: number): void => {
        pagination.pageNo = newPage;
        loadWithdrawRequestList();
    };

    const onFilterChange = (filterValue: any): void => {
        setFilter(filterValue);
    };

    const onCloseForm = (): void => {
        setShowForm(false);
        loadWithdrawRequestList();
    };

    const actionOnRequest = (
        request: IWithdrawRequest,
        rType: string
    ): void => {
        if (rType === 'approved') {
            setActionType('approved');
        }
        if (rType === 'rejected') {
            setActionType('rejected');
        }
        setActiveRequest(request.withdrawRequestId);
        setShowForm(true);
    };

    // Hooks
    useEffect(() => {
        pagination.pageNo = 1;
        loadWithdrawRequestList();
    }, [filter]);

    // UI Elements
    return (
        <Box className="app-card">
            <Box className="card-header">
                <Typography className="title fw-6">
                    {t('WithdrawRequestPage.Title')}
                </Typography>
            </Box>

            <TableContainer className="app-table mt-5 pt-2 ">
                <Table
                    sx={{
                        minWidth: 1350,
                    }}
                >
                    <AppTableHeader
                        tableColumns={columns}
                        onFilterChange={onFilterChange}
                    />
                    {withdrawRequests.length > 0 && (
                        <TableBody>
                            {withdrawRequests.map((withdrawRequest, index) => (
                                <TableRow hover key={index}>
                                    <TableCell>
                                        <Typography>{index + 1}</Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex',
                                            }}
                                        >
                                            <Avatar
                                                src={
                                                    withdrawRequest.user
                                                        .profileImage
                                                }
                                            />

                                            <Typography mx={2}>
                                                {`${withdrawRequest.user.name}`}{' '}
                                                <br />
                                                {`${withdrawRequest.user.username}`}{' '}
                                                <br />
                                                {
                                                    withdrawRequest.user
                                                        .countryCode
                                                }
                                                {`${withdrawRequest.user.phoneNumber}`}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            <b>
                                                {t(
                                                    `Common.${withdrawRequest.withdrawType}`
                                                )}
                                                :
                                            </b>{' '}
                                            {withdrawRequest.noOfItem} <br />
                                            <b>
                                                {t('WithdrawRequestPage.Fee')}:
                                            </b>{' '}
                                            {withdrawRequest.commissionValue}{' '}
                                            SAR
                                            <br />
                                            <b>
                                                {t(
                                                    'WithdrawRequestPage.Payable'
                                                )}
                                                :
                                            </b>{' '}
                                            {withdrawRequest.payableAmount} SAR
                                            <br />
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            <b>
                                                {t(
                                                    'WithdrawRequestPage.AccountName'
                                                )}
                                            </b>{' '}
                                            {withdrawRequest.accountName}
                                            <br />
                                            <b>
                                                {t(
                                                    'WithdrawRequestPage.AccountNumber'
                                                )}
                                            </b>{' '}
                                            {withdrawRequest.accountNo}
                                            <br />
                                            <b>
                                                {t(
                                                    'WithdrawRequestPage.IBANNumber'
                                                )}
                                            </b>{' '}
                                            {withdrawRequest.ibanNo}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            {withdrawRequest.createdAt
                                                ? moment(
                                                      withdrawRequest.createdAt
                                                  ).format('DD MMM YYYY')
                                                : '-'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            {Utils.Capitalize(
                                                withdrawRequest.status
                                            )}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            {withdrawRequest.updatedAt
                                                ? moment(
                                                      withdrawRequest.updatedAt
                                                  ).format('DD MMM YYYY')
                                                : '-'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {withdrawRequest.actionedBy && (
                                            <Typography>
                                                {`${withdrawRequest.actionedBy.name}`}{' '}
                                                <br />
                                                {`${withdrawRequest.actionedBy.phoneNumber}`}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {withdrawRequest.status ===
                                        IWithdrawStatus.PENDING ? (
                                            <>
                                                <IconButton
                                                    onClick={() =>
                                                        actionOnRequest(
                                                            withdrawRequest,
                                                            'approved'
                                                        )
                                                    }
                                                >
                                                    <CheckCircleIcon className="approve-icon" />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() =>
                                                        actionOnRequest(
                                                            withdrawRequest,
                                                            'rejected'
                                                        )
                                                    }
                                                >
                                                    <CancelIcon className="reject-icon" />
                                                </IconButton>
                                            </>
                                        ) : (
                                            '-'
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    )}
                </Table>
            </TableContainer>

            {withdrawRequests.length === 0 && (
                <EmptyList
                    showEmpty={withdrawRequests.length === 0}
                    showLoader={loader}
                    title="No withdraw requests found"
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

            {showForm && (
                <WithdrawRequestForm
                    showForm={showForm}
                    onCloseForm={onCloseForm}
                    withdrawRequestId={activeRequest}
                    actionType={actionType}
                />
            )}
        </Box>
    );
};

const mapStateToProps = (state: AppState): any => ({
    profileState: state.profileState,
    appConfig: state.appConfig,
});

export default connect(mapStateToProps)(WithdrawRequestList);
