import { Box, Grid, Typography, Menu, MenuItem, Divider } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AppPrimaryButton } from 'shared/components/AppComponents';
import { SubscriptionDeleteDialog, SubscriptionForm } from './components';
import { SubscriptionService } from 'services';
import { Utils } from 'shared/helpers';
import { EmptyList } from 'shared/components';
import { useTranslation } from 'react-i18next';
import {
    SUBSCRIPTION_PLAN_TYPE,
    ACCOUNT_TYPE,
} from './components/SubscriptionForm';

export interface ISubscriptionPlan {
    planId: string;
    planReference: string;
    accountType: ACCOUNT_TYPE;
    subscriptionType: SUBSCRIPTION_PLAN_TYPE;
    days: number;
    coins: number;
    discountCoins: number;
    isDeleted: number;
    createdAt: string;
    updatedAt: string;
}

const SubscriptionsPage = (): ReactElement => {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [loader, setLoader] = useState(true);
    const [subscriptions, setSubscriptions] = useState<ISubscriptionPlan[]>([]);
    const [selectedValue, setSelectedValue] = useState<any>();
    const [selectedSubscriptionId, setSelectedSubscriptionId] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [formType, setFormType] = useState('');
    const menuList = [t('Common.Edit'), t('Common.Delete')];

    // API Calls
    const loadSubscriptions = (): void => {
        setLoader(true);
        SubscriptionService.subscriptionList(1, 10000)
            .then((response: any) => {
                const { results } = response.data.data;
                if (results) {
                    setSubscriptions(results);
                }
            })
            .catch((error: any) => {
                Utils.handleErrorResponse(error);
            })
            .finally(() => {
                setLoader(false);
            });
    };

    // Hooks
    useEffect(() => {
        loadSubscriptions();
    }, []);

    // UI Actions
    const onCloseForm = (): void => {
        setShowAddModal(false);
        setShowDeleteConfirmModal(false);
        setFormType('');
        loadSubscriptions();
        setSelectedValue(null);
        setAnchorEl(null);
    };

    const actionOnAdd = (): void => {
        setShowAddModal(true);
        setFormType('add');
    };

    const actionOnCloseMenu = (): void => {
        setAnchorEl(null);
    };

    const actionOnMenu = (
        event: any,
        subscription: ISubscriptionPlan
    ): void => {
        setAnchorEl(event.currentTarget);
        setSelectedValue(subscription);
        setSelectedSubscriptionId(subscription.planId);
    };

    const actionOnMenuSelect = (menu: string): void => {
        if (menu === 'Edit') {
            setShowAddModal(true);
            setFormType('edit');
        }

        if (menu === 'Delete') {
            setShowDeleteConfirmModal(true);
        }
    };

    // Instance methods
    const getSubscriptionType = (subscription: ISubscriptionPlan): string => {
        if (subscription.subscriptionType === SUBSCRIPTION_PLAN_TYPE.PROFILE) {
            return t('Subscription.SubscriptionType.Profile.Content');
        }
        if (
            subscription.subscriptionType ===
            SUBSCRIPTION_PLAN_TYPE.ACCOUNT_BADGE
        ) {
            return Utils.Capitalize(subscription.accountType);
        }
        return '';
    };

    // UI Elements
    return (
        <>
            <Box className="app-card">
                <Box className="justify-space-between p-4 align-center">
                    <Box className="card-header p-0">
                        <Typography className="title fw-6">
                            {t('Subscription.Title')}
                        </Typography>
                    </Box>

                    <Box className="justify-end">
                        <AppPrimaryButton
                            title={t('Common.Add')}
                            onClick={actionOnAdd}
                        />
                    </Box>
                </Box>
            </Box>

            {subscriptions.length > 0 && !loader && (
                <Grid container spacing={5} className="mt-2">
                    {subscriptions.map((subscription: ISubscriptionPlan) => (
                        <Grid item xs={3}>
                            <Box className="app-card p-6">
                                <Box className="pacakage-card">
                                    <Box className="flex-column">
                                        <Typography
                                            variant="body1"
                                            className="title f40 fw-6"
                                        >
                                            {subscription.coins}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            className="subtitle fw-6 mt-3 ml-1"
                                        >
                                            {t('Common.Coin')}
                                        </Typography>
                                    </Box>
                                    <Box className="justify-end cursor-pointer mb-0">
                                        <MoreVertIcon
                                            onClick={(event: any) =>
                                                actionOnMenu(
                                                    event,
                                                    subscription
                                                )
                                            }
                                            id="menu"
                                        />
                                    </Box>
                                </Box>

                                <Menu
                                    id="menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={actionOnCloseMenu}
                                >
                                    {menuList.map((option: any) => (
                                        <MenuItem
                                            key={option}
                                            onClick={() =>
                                                actionOnMenuSelect(option)
                                            }
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu>

                                <Divider className="my-4" />

                                <Box className="justify-space-between">
                                    <Typography
                                        variant="body1"
                                        className="subtitle fw-5 "
                                    >
                                        {getSubscriptionType(subscription)}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        className="subtitle fw-5 "
                                    >
                                        {subscription.days}
                                        {` ${t('Common.Days')}`}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )}

            {subscriptions.length === 0 && (
                <EmptyList
                    showEmpty={subscriptions.length === 0}
                    showLoader={loader}
                    title={t('Common.NoRecord')}
                    subTitle=""
                />
            )}

            {showAddModal && (
                <SubscriptionForm
                    isAdd={formType === 'add' || false}
                    showForm={showAddModal}
                    onCloseForm={onCloseForm}
                    planToEdit={selectedValue}
                />
            )}

            {showDeleteConfirmModal && (
                <SubscriptionDeleteDialog
                    showForm={showDeleteConfirmModal}
                    onCloseForm={onCloseForm}
                    planId={selectedSubscriptionId}
                />
            )}
        </>
    );
};

export default SubscriptionsPage;
