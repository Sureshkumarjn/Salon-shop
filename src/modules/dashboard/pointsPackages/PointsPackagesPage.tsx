import { Box, Grid, Typography, Menu, MenuItem, Divider } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AppPrimaryButton } from 'shared/components/AppComponents';
import { PackageDeleteDialog, PackageForm } from './components';
import { PointsPackagesService } from 'services';
import { Utils } from 'shared/helpers';
import { EmptyList } from 'shared/components';
import { useTranslation } from 'react-i18next';
import { CURRENCY } from 'shared/Constants';

export interface PackageListProps {
    pointsPackageId: string;
    packageReference: string;
    quantity: number;
    amount: number;
    isDeleted: number;
    createdAt: Date;
    updatedAt: Date;
    createdBy: any;
}

const PointsPackagesPage = (): ReactElement => {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [loader, setLoader] = useState(true);
    const [packageList, setPackageList] = useState<any[]>([]);
    const [selectedValue, setSelectedValue] = useState({});
    const [selectedPackageId, setSelectedPackageId] = useState('');
    const [showPackageModal, setShowPackageModal] = useState(false);
    const [showPackageDeleteModal, setShowPackageDeleteModal] = useState(false);
    const [formType, setFormType] = useState('');
    const menuList = [t('Common.Edit'), t('Common.Delete')];

    // API Calls
    const loadPackages = (): void => {
        setLoader(true);
        PointsPackagesService.packageList(1, 10000)

            .then((response: any) => {
                const { results } = response.data.data;
                if (results) {
                    setPackageList(results);
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
        loadPackages();
    }, []);

    // UI Actions
    const onCloseForm = (): void => {
        setShowPackageModal(false);
        setShowPackageDeleteModal(false);
        setFormType('');
        loadPackages();
        setAnchorEl(null);
    };

    const actionOnAdd = (): void => {
        setShowPackageModal(true);
        setFormType('add');
    };

    const actionOnCloseMenu = (): void => {
        setAnchorEl(null);
    };

    const actionOnMenu = (event: any, packageItem: any): void => {
        setAnchorEl(event.currentTarget);
        setSelectedValue(packageItem);
        setSelectedPackageId(packageItem.pointsPackageId);
    };

    const actionOnMenuSelect = (menu: string): void => {
        if (menu === 'Edit') {
            setShowPackageModal(true);
            setFormType('edit');
        }

        if (menu === 'Delete') {
            setShowPackageDeleteModal(true);
        }
    };

    // UI Elements
    return (
        <>
            <Box className="app-card">
                <Box className="justify-space-between p-4 align-center">
                    <Box className="card-header p-0">
                        <Typography className="title fw-6">
                            {t('PackageFormPage.Title')}
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

            {packageList.length > 0 && !loader && (
                <Grid container spacing={5} className="mt-2">
                    {packageList.map((packageItem: PackageListProps) => (
                        <Grid item xs={3}>
                            <Box className="app-card p-6">
                                <Box className="pacakage-card">
                                    <Box className="flex-column">
                                        <Typography
                                            variant="body1"
                                            className="title f40 fw-6"
                                        >
                                            {packageItem.quantity}
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
                                                actionOnMenu(event, packageItem)
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
                                        {packageItem.amount}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        className="subtitle fw-5 "
                                    >
                                        {CURRENCY}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )}

            {packageList.length === 0 && (
                <EmptyList
                    showEmpty={packageList.length === 0}
                    showLoader={loader}
                    title="No records found"
                    subTitle=""
                />
            )}

            {showPackageModal && (
                <PackageForm
                    isAdd={formType === 'add' || false}
                    showForm={showPackageModal}
                    onCloseForm={onCloseForm}
                    packageToEdit={formType === 'add' ? {} : selectedValue}
                />
            )}

            {showPackageDeleteModal && (
                <PackageDeleteDialog
                    showForm={showPackageDeleteModal}
                    onCloseForm={onCloseForm}
                    packageId={selectedPackageId}
                />
            )}
        </>
    );
};

export default PointsPackagesPage;
