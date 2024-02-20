import {
    Box,
    Typography,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Avatar,
    Switch,
    ThemeProvider,
    createTheme,
    IconButton,
    Dialog,
    DialogContent,
    Grid,
    InputAdornment,
} from '@mui/material';
import { useState, useEffect, ReactElement, useMemo } from 'react';
import { DefaultPagination, RowsOption, UserService } from 'services';
import { AppTableHeader, EmptyList } from 'shared/components';
import {
    AppFormikSelect,
    AppFormikTextField,
    AppPrimaryButton,
    AppSecondaryButton,
    AppTextField,
    ConfirmDialog,
} from 'shared/components/AppComponents';
import { Utils } from 'shared/helpers';
import AppTablePagination from 'shared/components/AppTablePagination';
import { useTranslation } from 'react-i18next';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import moment from 'moment';
import { Formik } from 'formik';
import { CommissionConfigSchema } from 'validators/AppConfig';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { AppState } from 'state/RootReducer';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import UserForm from './UserForm';

export enum USER_MODE {
    USER = 'user',
    COMMUNITY = 'community',
}
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

export interface IUserBase {
    userId: string;
    name: string;
    username: string;
    phoneNumber: string;
    countryCode: string;
    city: string;
    country: string;
    sex: string;
    dateOfBirth: string;
    email: any;
    profileImage: any;
    universalLink: string;
    otpVerificationCode: string;
    otpVerificationExpiredAt: string;
    otpVerificationAttempt: number;
    isVerified: number;
    forgotPasswordVerificationCode: any;
    forgotPasswordVerificationExpiredAt: any;
    forgotPasswordVerificationAttempt: number;
    isBlocked: number;
    isDeleted: number;
    createdAt: string;
    updatedAt: string;
    settings: ISettings;
    userMode: USER_MODE;
}
export interface IManagers {
    communityAdmin: IUserBase;
}
export interface IUser extends IUserBase {
    managers: IManagers[];
}

const UsersPage = (props: any): ReactElement => {
    const { appConfig } = props;
    const { config } = appConfig;
    const { t } = useTranslation();
    const location = useLocation();
    const [users, setUsers] = useState<IUser[]>([]);
    const [pagination, setPagination] = useState({ ...DefaultPagination(25) });
    const [loader, setLoader] = useState(true);
    const [filter, setFilter] = useState({});
    const [showConfirm, setShowConfirm] = useState(false);
    const [activeUser, setActiveUser] = useState<IUser>();
    const [showCommissionDialog, setShowCommissionDialog] = useState(false);
    const [showCommunityForm, setShowCommunityForm] = useState(false);
    const [commissionConfig, setCommissionConfig] = useState({
        standardCommission: 0,
        coinWithdrawCommission: 0,
        diamondWithdrawCommission: 0,
        sarDiamondValue: 0,
        sarCoinValue: 0,
        commissionType: 'default',
    });
    const [columns, setColumns] = useState<any[]>([]);
    const commonColumns = [
        {
            title: 'SI.No',
            columnName: '',
            hasFilter: false,
        },
        {
            title: 'Name',
            placeholder: 'Search Name',
            columnName: 'name',
            hasFilter: true,
            type: 'text',
            value: '',
        },
        {
            title: 'Mobile',
            placeholder: 'Mobile Number',
            columnName: 'phoneNumber',
            hasFilter: true,
            type: 'number',
            value: '',
        },
        {
            title: 'Commission',
            columnName: 'commission',
            type: 'select',
            value: '',
            options: [
                {
                    title: 'Choose Type',
                    value: '',
                },
                {
                    title: 'Default',
                    value: 'default',
                },
                {
                    title: 'Custom',
                    value: 'custom',
                },
            ],
        },
        {
            title: t('UsersPage.Table.Block'),
            columnName: 'blockStatus',
            hasFilter: true,
            type: 'select',
            value: '',
            options: [
                {
                    title: 'Choose Status',
                    value: '',
                },
                {
                    title: 'Yes',
                    value: '1',
                },
                {
                    title: 'No',
                    value: '0',
                },
            ],
        },
    ];

    const getGender = (gender: any): string => {
        switch (gender) {
            case 'female':
                return 'Female';
            case 'male':
                return 'Male';
            case 'other':
                return 'Others';
            default:
                break;
        }
        return '';
    };

    const isCommunity = useMemo(
        () => location.pathname === '/communities',
        [location.pathname]
    );

    const prepareQueryParams = (): string => {
        const params: any = {
            pageNo: pagination.pageNo,
            pageSize: pagination.pageOffset,
            userMode: isCommunity ? USER_MODE.COMMUNITY : USER_MODE.USER,
            ...filter,
        };
        return new URLSearchParams(params).toString();
    };

    // API Calls
    const loadUsersList = (): void => {
        setLoader(true);
        UserService.usersList(prepareQueryParams())
            .then((response: any) => {
                const { results, pagination } = response.data.data;
                if (results) {
                    setUsers(results);
                    setPagination(pagination);
                }
                setLoader(false);
            })
            .catch((error: any) => {
                setLoader(false);
                Utils.handleErrorResponse(error);
            });
    };
    // Block User
    const actionBlockUser = (): void => {
        setLoader(true);
        const payload = {
            userId: activeUser && activeUser.userId,
        };
        UserService.blockUser(payload)
            .then((response) => {
                Utils.handleSuccessResponse(response);
                setLoader(false);
                loadUsersList();
            })
            .catch((error: any) => {
                setLoader(false);
                Utils.handleErrorResponse(error);
            });
    };

    // UI Actions
    const actionShowBlockConfirm = (event: any, user: any): void => {
        setActiveUser(user);
        setShowConfirm(true);
    };

    const actionHandleLimitChange = (pageNumber: number): void => {
        pagination.pageOffset = pageNumber;
        pagination.pageNo = 1;
        loadUsersList();
    };

    const actionHandlePageChange = (newPage: number): void => {
        pagination.pageNo = newPage;
        loadUsersList();
    };

    const reloadUsersList = (): void => {
        pagination.pageNo = 1;
        loadUsersList();
    };

    const onFilterChange = (filterValue: any): void => {
        setFilter(filterValue);
    };

    const actionOnSaveCommission = (formValues: any, formik: any): void => {
        const userId = activeUser?.userId;
        UserService.updateUserCommission(userId, formValues)
            .then((response) => {
                Utils.handleSuccessResponse(response);
                setShowCommissionDialog(false);
                loadUsersList();
            })
            .catch((e) => Utils.handleErrorResponse(e))
            .finally(() => formik.setSubmitting(false));
    };

    // Hooks
    useEffect(() => {
        pagination.pageNo = 1;
        loadUsersList();
    }, [filter]);

    useEffect(() => {
        const tColumns = [
            ...commonColumns,
            {
                title: 'Gender',
                columnName: 'gender',
                hasFilter: true,
                type: 'select',
                value: '',
                options: [
                    {
                        title: 'Choose Gender',
                        value: '',
                    },
                    {
                        title: 'Male',
                        value: 'male',
                    },
                    {
                        title: 'Female',
                        value: 'female',
                    },
                    {
                        title: 'Other',
                        value: 'other',
                    },
                ],
            },
            {
                title: 'Date Of Birth',
                columnName: 'dateOfBirth',
                hasFilter: false,
                type: 'text',
                value: '',
            },
        ];
        const cColumns = [
            ...commonColumns,
            {
                title: 'Managers',
                columnName: 'manager',
                hasFilter: false,
                type: '',
                value: '',
            },
        ];
        if (isCommunity) {
            setColumns(cColumns);
        } else {
            setColumns(tColumns);
        }
        setFilter({});
    }, [isCommunity]);

    // UI Elements
    return (
        <Box
            className="app-card"
            key={isCommunity ? 'communitypage' : 'userspage'}
        >
            <Box className="card-header">
                <Typography className="title fw-6">
                    {isCommunity
                        ? t('UsersPage.Communities')
                        : t('UsersPage.Title')}
                </Typography>
                {isCommunity && (
                    <AppPrimaryButton
                        className="btn-small"
                        title={t('UsersPage.Add')}
                        onClick={() => setShowCommunityForm(true)}
                    />
                )}
            </Box>

            <Box className="mt-5 pt-2">
                <Table>
                    <AppTableHeader
                        tableColumns={columns}
                        onFilterChange={onFilterChange}
                    />
                    {users.length > 0 && (
                        <TableBody>
                            {users.map((user, index) => (
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
                                            <Avatar src={user.profileImage} />

                                            <Typography mx={2}>
                                                {`${user.name}`} <br />
                                                {`${user.username}`}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            {user.countryCode}{' '}
                                            {user.phoneNumber}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography>
                                            {Utils.Capitalize(
                                                user.settings.commissionType
                                            )}
                                            <IconButton
                                                onClick={() => {
                                                    setShowCommissionDialog(
                                                        true
                                                    );
                                                    setActiveUser(user);
                                                    const tConfig: any =
                                                        user.settings;
                                                    if (
                                                        user.settings
                                                            .commissionType ===
                                                        'default'
                                                    ) {
                                                        setCommissionConfig({
                                                            commissionType:
                                                                'default',
                                                            ...config,
                                                        });
                                                    } else {
                                                        setCommissionConfig({
                                                            ...tConfig,
                                                        });
                                                    }
                                                }}
                                            >
                                                <BorderColorIcon color="primary" />
                                            </IconButton>
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <ThemeProvider
                                            theme={createTheme({
                                                palette: {
                                                    primary: {
                                                        main: '#019ade',
                                                    },
                                                },
                                            })}
                                        >
                                            <Switch
                                                title={
                                                    user.isBlocked === 1
                                                        ? 'Unblock'
                                                        : 'Block'
                                                }
                                                checked={user.isBlocked === 1}
                                                onChange={(event) => {
                                                    actionShowBlockConfirm(
                                                        event,
                                                        user
                                                    );
                                                }}
                                            />
                                        </ThemeProvider>
                                    </TableCell>

                                    {isCommunity && (
                                        <TableCell>
                                            <Typography>
                                                Managers (
                                                {user.managers
                                                    ? user.managers.length
                                                    : 0}
                                                )
                                                <IconButton
                                                    onClick={() => {
                                                        setShowCommunityForm(
                                                            true
                                                        );
                                                        setActiveUser(user);
                                                    }}
                                                >
                                                    <BorderColorIcon color="primary" />
                                                </IconButton>
                                            </Typography>
                                        </TableCell>
                                    )}

                                    {!isCommunity && (
                                        <>
                                            <TableCell>
                                                <Typography>
                                                    {user.sex
                                                        ? getGender(user.sex)
                                                        : ' -'}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>
                                                    {user.dateOfBirth
                                                        ? moment(
                                                              user.dateOfBirth
                                                          ).format(
                                                              'DD MMM YYYY'
                                                          )
                                                        : '-'}
                                                </Typography>
                                            </TableCell>
                                        </>
                                    )}

                                    <TableCell style={{ display: 'none' }}>
                                        <AppPrimaryButton
                                            className="btn-small"
                                            title={
                                                user.isBlocked === 1
                                                    ? t('UsersPage.Unblock')
                                                    : t('UsersPage.Block')
                                            }
                                            onClick={(event: any) => {
                                                actionShowBlockConfirm(
                                                    event,
                                                    user
                                                );
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    )}
                </Table>

                {users.length === 0 && (
                    <EmptyList
                        showEmpty={users.length === 0}
                        showLoader={loader}
                        title="No users found"
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

            <ConfirmDialog
                showConfirm={showConfirm}
                title={t('UsersPage.Block')}
                subTitle={
                    activeUser && activeUser.isBlocked
                        ? t('UsersPage.User.UnBlock')
                        : t('UsersPage.User.Block')
                }
                onCancel={() => {
                    setShowConfirm(false);
                }}
                onSuccess={() => {
                    actionBlockUser();
                    setShowConfirm(false);
                }}
                successTitle={t('Common.Yes')}
                cancelTitle={t('Common.No')}
            />

            <Dialog fullWidth maxWidth="sm" open={showCommissionDialog}>
                <DialogContent>
                    <Formik
                        enableReinitialize
                        initialValues={commissionConfig}
                        validationSchema={CommissionConfigSchema(t)}
                        validateOnMount
                        onSubmit={(formValues, formik) => {
                            actionOnSaveCommission(formValues, formik);
                        }}
                    >
                        {({ handleSubmit, values, isSubmitting, isValid }) => (
                            <Box className="p-2">
                                <Typography className="title fw-6 mb-8">
                                    {t('VersionConfig.Title.Commission')}
                                </Typography>
                                {/* Commission Type */}
                                <Grid alignItems="center" container spacing={2}>
                                    <Grid item md={4}>
                                        <Typography>
                                            {t(
                                                'VersionConfig.Input.CommissionType'
                                            )}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <AppFormikSelect
                                            name="commissionType"
                                            items={[
                                                {
                                                    title: 'Default',
                                                    value: 'default',
                                                },
                                                {
                                                    title: 'Custom',
                                                    value: 'custom',
                                                },
                                            ]}
                                            titleKey="title"
                                            valueKey="value"
                                            placeholder={t(
                                                'VersionConfig.Input.CommissionType'
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                {values.commissionType === 'custom' && (
                                    <>
                                        {/* Standard commission */}
                                        <Grid
                                            alignItems="center"
                                            container
                                            spacing={2}
                                        >
                                            <Grid item md={4}>
                                                <Typography>
                                                    {t(
                                                        'VersionConfig.Input.StandardCommission'
                                                    )}
                                                </Typography>
                                            </Grid>
                                            <Grid item md={4}>
                                                <AppFormikTextField
                                                    type="number"
                                                    name="standardCommission"
                                                    label=""
                                                    placeholder={t(
                                                        'VersionConfig.Input.Application'
                                                    )}
                                                    inputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <MonetizationOnIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item md={4}>
                                                <AppTextField
                                                    type="text"
                                                    value={
                                                        100 -
                                                        values.standardCommission
                                                    }
                                                    label=""
                                                    placeholder={t(
                                                        'VersionConfig.Input.User'
                                                    )}
                                                    inputProps={{
                                                        readOnly: true,
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <MonetizationOnIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>

                                        {/* Coin withdraw commission */}
                                        <Grid
                                            alignItems="center"
                                            container
                                            spacing={2}
                                        >
                                            <Grid item md={4}>
                                                <Typography>
                                                    {t(
                                                        'VersionConfig.Input.CoinWithdrawCommission'
                                                    )}
                                                </Typography>
                                            </Grid>
                                            <Grid item md={4}>
                                                <AppFormikTextField
                                                    type="number"
                                                    name="coinWithdrawCommission"
                                                    label=""
                                                    placeholder={t(
                                                        'VersionConfig.Input.Application'
                                                    )}
                                                    inputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <MonetizationOnIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item md={4}>
                                                <AppTextField
                                                    type="text"
                                                    value={
                                                        100 -
                                                        values.coinWithdrawCommission
                                                    }
                                                    label=""
                                                    placeholder={t(
                                                        'VersionConfig.Input.User'
                                                    )}
                                                    inputProps={{
                                                        readOnly: true,
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <MonetizationOnIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>

                                        {/* Diamond withdraw commission */}
                                        <Grid
                                            alignItems="center"
                                            container
                                            spacing={2}
                                        >
                                            <Grid item md={4}>
                                                <Typography>
                                                    {t(
                                                        'VersionConfig.Input.DiamondWithdrawCommission'
                                                    )}
                                                </Typography>
                                            </Grid>
                                            <Grid item md={4}>
                                                <AppFormikTextField
                                                    type="number"
                                                    name="diamondWithdrawCommission"
                                                    label=""
                                                    placeholder={t(
                                                        'VersionConfig.Input.Application'
                                                    )}
                                                    inputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <MonetizationOnIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item md={4}>
                                                <AppTextField
                                                    type="text"
                                                    value={
                                                        100 -
                                                        values.diamondWithdrawCommission
                                                    }
                                                    label=""
                                                    placeholder={t(
                                                        'VersionConfig.Input.User'
                                                    )}
                                                    inputProps={{
                                                        readOnly: true,
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <MonetizationOnIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>

                                        {/* 1 Coin SAR value */}
                                        <Grid
                                            alignItems="center"
                                            container
                                            spacing={2}
                                        >
                                            <Grid item md={4}>
                                                <Typography>
                                                    {t(
                                                        'VersionConfig.Input.1Coin'
                                                    )}
                                                </Typography>
                                            </Grid>
                                            <Grid item md={4}>
                                                <AppFormikTextField
                                                    type="number"
                                                    name="sarCoinValue"
                                                    label=""
                                                    placeholder={t(
                                                        'VersionConfig.Input.SAR'
                                                    )}
                                                    inputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <MonetizationOnIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item md={4}>
                                                <AppTextField
                                                    type="text"
                                                    value="1"
                                                    label=""
                                                    placeholder={t(
                                                        'VersionConfig.Input.1Coin'
                                                    )}
                                                    inputProps={{
                                                        readOnly: true,
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <MonetizationOnIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>

                                        {/* 1 Coin SAR value */}
                                        <Grid
                                            alignItems="center"
                                            container
                                            spacing={2}
                                        >
                                            <Grid item md={4}>
                                                <Typography>
                                                    {t(
                                                        'VersionConfig.Input.1Diamond'
                                                    )}
                                                </Typography>
                                            </Grid>
                                            <Grid item md={4}>
                                                <AppFormikTextField
                                                    type="number"
                                                    name="sarDiamondValue"
                                                    label=""
                                                    placeholder={t(
                                                        'VersionConfig.Input.SAR'
                                                    )}
                                                    inputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <MonetizationOnIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item md={4}>
                                                <AppTextField
                                                    type="text"
                                                    value="1"
                                                    label=""
                                                    placeholder={t(
                                                        'VersionConfig.Input.1Diamond'
                                                    )}
                                                    inputProps={{
                                                        readOnly: true,
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <MonetizationOnIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </>
                                )}
                                <Box className="flex justify-end">
                                    <AppSecondaryButton
                                        title="Close"
                                        className="mr-2"
                                        onClick={() => {
                                            setShowCommissionDialog(false);
                                        }}
                                    />
                                    <AppPrimaryButton
                                        className=""
                                        loadingText=""
                                        title="Save"
                                        onClick={() => {
                                            handleSubmit();
                                        }}
                                        isLoading={isSubmitting}
                                        disabled={isSubmitting || !isValid}
                                    />
                                </Box>
                            </Box>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>

            <Dialog fullWidth maxWidth="sm" open={showCommunityForm}>
                <DialogContent>
                    <UserForm
                        userToEdit={activeUser}
                        onCloseForm={(reload: number) => {
                            setShowCommunityForm(false);
                            setActiveUser(undefined);
                            if (reload === 1) {
                                reloadUsersList();
                            }
                            if (reload === 2) {
                                loadUsersList();
                            }
                        }}
                    />
                </DialogContent>
            </Dialog>
        </Box>
    );
};

const mapStateToProps = (state: AppState): any => ({
    profileState: state.profileState,
    appConfig: state.appConfig,
});

export default connect(mapStateToProps)(UsersPage);
