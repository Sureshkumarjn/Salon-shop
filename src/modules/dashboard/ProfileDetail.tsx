import {
    Box,
    CircularProgress,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Typography,
} from '@mui/material';
import { ReactElement, useRef, useState, useMemo } from 'react';
import { AuthActions } from 'state/authentication/Action';
import { connect } from 'react-redux';
import { ProfileService } from 'services';
import { Utils } from 'shared/helpers';
import { AppState } from 'state/RootReducer';
import { ProfileState } from 'state/profile/Reducer';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import { useTranslation } from 'react-i18next';
import TranslateIcon from '@mui/icons-material/Translate';

const ProfileDetail = (props: any): ReactElement => {
    const { t } = useTranslation();
    const {
        profileState,
        doLogout,
        onClose,
        showChangePassword,
        showChangeLanguage,
    }: {
        profileState: ProfileState;
        doLogout: () => void;
        onClose: () => void;
        showChangePassword: () => void;
        showChangeLanguage: () => void;
    } = props;
    const hiddenFileInput: any = useRef(null);
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    // API Calls
    const uploadProfileImage = (file: File): void => {
        const formData = new FormData();
        formData.append('profileImage', file);
        setIsUploading(true);
        ProfileService.updateProfileImage(formData)
            .then(() => {
                ProfileService.loadProfile();
            })
            .catch((error) => {
                Utils.handleErrorResponse(error);
            })
            .finally(() => setIsUploading(false));
    };

    // UI Actions
    const actionDoLogout = (): void => {
        ProfileService.logout()
            .then(() => {})
            .catch((error) => {
                Utils.handleErrorResponse(error);
            })
            .finally(() => {
                doLogout();
            });
    };

    const handleChange = (event: any): void => {
        if (event.target.files.length > 0) {
            const selectedFiles = event.target.files;
            const selectedFile = selectedFiles[0];
            const previewUrl = URL.createObjectURL(selectedFile);
            setProfileImageUrl(previewUrl);
            uploadProfileImage(selectedFile);
        }
    };

    // Hooks
    const profileUrl = useMemo(
        () =>
            profileImageUrl ||
            profileState.profileImage ||
            '/images/icons/profile_icon.svg',
        [profileImageUrl, profileState.profileImage]
    );

    // UI Elements
    return (
        <>
            <input
                accept="image/*"
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
            />

            <Box className="profile-header-container px-5 pt-5">
                <Box className="profile-heading">
                    <Typography variant="h4" className="settings-style">
                        {t('Profile.Title')}
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        title="Close"
                        aria-label="Close"
                    >
                        <img
                            src="/images/icons/icon_close.svg"
                            width={20}
                            height={20}
                        />
                    </IconButton>
                </Box>
            </Box>

            <Box className="profile-image" style={{ display: 'none' }}>
                <img src={profileUrl} />
                <IconButton
                    title="Edit profile image"
                    aria-label="Edit profile image"
                    className="edit-icon"
                    onClick={() => {
                        hiddenFileInput.current.click();
                    }}
                >
                    <img src="/images/icons/icon-edit.svg" />
                </IconButton>
                {isUploading && (
                    <Box className="upload-overlay">
                        <CircularProgress />
                    </Box>
                )}
            </Box>

            <Box className="p-6 profile-container">
                <>
                    <Typography className="mt-3 f12">
                        {t('Profile.SubTitle')}
                    </Typography>
                    <List>
                        <ListItem disablePadding>
                            <Box className="profile-detail">
                                <Box className="icon-holder">
                                    <img src="/images/icons/icon_profilename.svg" />
                                </Box>
                                <Typography className="title">
                                    {t('Profile.Name')}
                                </Typography>
                                <Typography className="value">
                                    {profileState.name}
                                    {profileState.lastName}
                                </Typography>
                            </Box>
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding>
                            <Box className="profile-detail ">
                                <Box className="icon-holder">
                                    <CallOutlinedIcon className="mobile-icon-style" />
                                </Box>
                                <Typography className="title ml-3">
                                    {t('Profile.Phone')}
                                </Typography>
                                <Typography className="value">
                                    {profileState.phoneNumber}
                                </Typography>
                            </Box>
                        </ListItem>
                    </List>

                    <Box className="mt-6">
                        <Typography className="mt-3 f12">
                            {t('Settings.Title')}
                        </Typography>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton
                                    title="Change Password"
                                    aria-label="Change Password"
                                    className="profile-detail"
                                    onClick={showChangePassword}
                                >
                                    <Box className="icon-holder">
                                        <img src="/images/icons/icon_password.svg" />
                                    </Box>
                                    <Typography className="setting-title">
                                        {t('Settings.Password')}
                                    </Typography>
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem disablePadding>
                                <ListItemButton
                                    title="Change Language"
                                    aria-label="Change Language"
                                    className="profile-detail"
                                    onClick={showChangeLanguage}
                                >
                                    <Box className="icon-holder mr-1">
                                        <TranslateIcon className="translate-icon" />
                                    </Box>
                                    <Typography className="setting-title">
                                        {t('Settings.Language')}
                                    </Typography>
                                </ListItemButton>
                            </ListItem>

                            <Divider />
                            <ListItem disablePadding>
                                <ListItemButton
                                    className="profile-detail"
                                    onClick={actionDoLogout}
                                    title="Logout"
                                    aria-label="Logout"
                                >
                                    <Box className="icon-holder">
                                        <img src="/images/icons/icon_logout.svg" />
                                    </Box>
                                    <Typography className="setting-title text-error">
                                        {t('LoginPage.Btn.LogOut')}
                                    </Typography>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </>
            </Box>
        </>
    );
};

const mapStateToProps = (state: AppState): any => ({
    profileState: state.profileState,
});

const mapDispatchToProps = (dispatch: any): any => ({
    doLogout: (data: any) => dispatch(AuthActions.doLogout(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetail);
