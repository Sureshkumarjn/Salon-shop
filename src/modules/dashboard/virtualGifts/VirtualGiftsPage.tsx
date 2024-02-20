import { Box, Grid, Typography, Menu, MenuItem } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AppPrimaryButton } from 'shared/components/AppComponents';
import { VirtualGiftDeleteDialog, VirtualForm } from './components';
import { VirtualGiftService } from 'services';
import { Utils } from 'shared/helpers';
import { EmptyList } from 'shared/components';

const VirtualGiftsPage = (): ReactElement => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [loader, setLoader] = useState(true);
    const [virtualList, setVirtualList] = useState<any[]>([]);
    const [selectedValue, setSelectedValue] = useState({});
    const [selectedVirtualId, setSelectedVirtualId] = useState('');
    const [showVirtualDeleteModal, setShowVirtualDeleteModal] = useState(false);
    const [showVirtualModal, setShowVirtualModal] = useState(false);
    const [formType, setFormType] = useState('');
    const menuList = ['Edit', 'Delete'];

    // API Calls
    const loadVirtualGifts = (): void => {
        setLoader(true);
        VirtualGiftService.virtualList(1, 10000)
            .then((response: any) => {
                const { results } = response.data.data;
                if (results) {
                    setVirtualList(results);
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
        loadVirtualGifts();
    }, []);

    // UI Actions
    const onCloseForm = (): void => {
        setShowVirtualModal(false);
        setShowVirtualDeleteModal(false);
        setFormType('');
        loadVirtualGifts();
        setAnchorEl(null);
    };

    const actionOnAdd = (): void => {
        setShowVirtualModal(true);
        setFormType('add');
    };

    const actionOnCloseMenu = (): void => {
        setAnchorEl(null);
    };

    const actionOnMenu = (event: any, virtualItem: any): void => {
        setAnchorEl(event.currentTarget);
        setSelectedValue(virtualItem);
        setSelectedVirtualId(virtualItem.virtualGiftId);
    };

    const actionOnMenuSelect = (menu: string): void => {
        if (menu === 'Edit') {
            setShowVirtualModal(true);
            setFormType('edit');
        }

        if (menu === 'Delete') {
            setShowVirtualDeleteModal(true);
        }
    };

    // UI Elements
    return (
        <>
            <Box className="app-card">
                <Box className="justify-space-between p-4 align-center">
                    <Box className="card-header p-0">
                        <Typography className="title fw-6">
                            Virtual Gifts
                        </Typography>
                    </Box>

                    <Box className="justify-end">
                        <AppPrimaryButton
                            title="Add new"
                            onClick={actionOnAdd}
                        />
                    </Box>
                </Box>
            </Box>

            {virtualList.length > 0 && !loader && (
                <Grid container spacing={5} className="mt-2">
                    {virtualList.map((data: any) => (
                        <Grid item xs={3}>
                            <Box className="app-card p-6">
                                <Box className="pacakage-card">
                                    <img
                                        className="vg-image"
                                        src={data.imageUrl}
                                        alt=""
                                    />
                                    <Box className="justify-end cursor-pointer">
                                        <MoreVertIcon
                                            onClick={(event: any) =>
                                                actionOnMenu(event, data)
                                            }
                                            id="menu"
                                        />
                                    </Box>
                                </Box>

                                <Menu
                                    id="menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'long-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={actionOnCloseMenu}
                                >
                                    {menuList.map((option) => (
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

                                <Typography className="title fw-6 mt-4">
                                    {data.name}
                                </Typography>

                                <Typography className="subtitle fw-5 mt-2">
                                    {data.coins} coins
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )}

            {virtualList.length === 0 && (
                <EmptyList
                    showEmpty={virtualList.length === 0}
                    showLoader={loader}
                    title="No records found"
                    subTitle=""
                />
            )}

            {showVirtualModal && (
                <VirtualForm
                    isAdd={formType === 'add' || false}
                    showForm={showVirtualModal}
                    onCloseForm={onCloseForm}
                    virtualGiftToEdit={formType === 'add' ? {} : selectedValue}
                />
            )}

            {showVirtualDeleteModal && (
                <VirtualGiftDeleteDialog
                    showForm={showVirtualDeleteModal}
                    onCloseForm={onCloseForm}
                    virtualId={selectedVirtualId}
                />
            )}
        </>
    );
};

export default VirtualGiftsPage;
