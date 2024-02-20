import {
    Grid,
    Typography,
    Box,
    Autocomplete,
    TextField,
    CircularProgress,
    FormHelperText,
} from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { APICallBack, CommunityService } from 'services';
import {
    AppFormikTextField,
    AppFormikSelect,
    AppPrimaryButton,
    AppSecondaryButton,
} from 'shared/components/AppComponents';
import { Utils } from 'shared/helpers';
import { CommunitySchema } from 'validators/User';
import Countries from 'shared/Countries.json';
import { useDebouncedEffect } from 'shared/hooks/useDebounce';
import { IUser } from './UserList';

const UserForm = (props: any): ReactElement => {
    const { userToEdit, onCloseForm }: { userToEdit: IUser; onCloseForm: any } =
        props;
    const [addForm, setAddForm] = useState(true);
    const pictureRef = useRef(null);
    const [userFormData, setUserFormData] = useState({
        userId: '',
        name: '',
        username: '',
        phoneNumber: '',
        countryCode: '',
        city: '',
        country: '',
        managers: [],
    });
    const { t } = useTranslation();
    const [users, setUsers] = useState<any[]>([]);
    const [loader, setLoader] = useState(true);
    const [managerSearchWord, setManagerSearchWord] = useState('');

    const [profilePicture, setProfilePicture] = useState<any>();
    const [pictureUrl, setPictureUrl] = useState('');

    const prepareQueryParams = (value: string): string => {
        const params: any = {
            pageNo: 1,
            pageSize: 100,
            search: value,
        };
        return new URLSearchParams(params).toString();
    };

    // API Calls
    const saveUser = (userData: any, callBack: APICallBack): void => {
        const promise = addForm
            ? CommunityService.addCommunity(userData)
            : CommunityService.editCommunity(userData);
        promise
            .then((response) => {
                Utils.handleSuccessResponse(response);
                callBack(true, response);
            })
            .catch((error) => {
                Utils.handleErrorResponse(error);
                callBack(false, error);
            });
    };

    const loadUsersList = (search: string): void => {
        setLoader(true);
        CommunityService.managersList(prepareQueryParams(search))
            .then((response: any) => {
                const { data } = response.data;
                if (data) {
                    setUsers(data);
                }
                setLoader(false);
            })
            .catch((error: any) => {
                setLoader(false);
                Utils.handleErrorResponse(error);
            });
    };

    // UI Actions
    const actionCloseForm = (): void => {
        onCloseForm(0); // 0 - no reload
    };

    const actionOnFormSubmit = (
        formValues: any,
        formik: FormikHelpers<any>
    ): void => {
        const formData = new FormData();
        if (!addForm) {
            formData.append('communityId', formValues.userId);
        }
        if (profilePicture) {
            formData.append('profileImage', profilePicture);
        }
        formData.append('username', formValues.username);
        formData.append('name', formValues.name);
        formData.append('city', formValues.city);
        formData.append('country', formValues.country);
        formData.append('countryCode', `+${formValues.countryCode}`);
        formData.append('phoneNumber', formValues.phoneNumber);
        formData.append(
            'communityAdmin',
            formValues.managers.map((m: any) => m.userId).toString()
        );

        saveUser(formData, (status: boolean) => {
            if (status) {
                onCloseForm(addForm ? 1 : 2);
                formik.resetForm();
            }
            formik.setSubmitting(false);
        });
    };

    // Hooks
    useDebouncedEffect(
        () => {
            loadUsersList(managerSearchWord);
        },
        [managerSearchWord],
        1000
    );

    // Hooks
    useEffect(() => {
        if (userToEdit) {
            setUserFormData({
                userId: userToEdit.userId,
                name: userToEdit.name,
                username: userToEdit.username,
                city: userToEdit.city,
                country: userToEdit.country,
                countryCode: userToEdit.countryCode.replace('+', ''),
                phoneNumber: userToEdit.phoneNumber,
                managers: userToEdit.managers.map(
                    (u) => u.communityAdmin
                ) as any,
            });
            setAddForm(false);
            setPictureUrl(userToEdit.profileImage);
        }
    }, [userToEdit]);

    // UI Elements
    return (
        <Box className="">
            <Box className="card-header mb-5">
                <Typography className="title fw-6">
                    {addForm
                        ? t('UsersPage.AddCommunity')
                        : t('UsersPage.EditCommunity')}
                </Typography>
            </Box>
            <Formik
                enableReinitialize
                initialValues={userFormData}
                validateOnMount
                validationSchema={CommunitySchema(t)}
                onSubmit={(formValues, formik) => {
                    actionOnFormSubmit(formValues, formik);
                }}
            >
                {({
                    handleSubmit,
                    values,
                    isSubmitting,
                    isValid,
                    setFieldValue,
                    errors,
                    setFieldTouched,
                }) => (
                    <Grid container lg={12} columnSpacing={5}>
                        <Grid item md={6}>
                            <AppFormikTextField
                                className="black-border"
                                placeholder={t('UsersPage.Input.CommunityName')}
                                name="name"
                                type="text"
                            />
                        </Grid>
                        <Grid item md={6}>
                            <AppFormikTextField
                                className="black-border"
                                placeholder={t(
                                    'UsersPage.Input.CommunityUserName'
                                )}
                                name="username"
                                type="text"
                            />
                        </Grid>
                        <Grid item md={6}>
                            <AppFormikSelect
                                className="black-border"
                                name="country"
                                placeholder={t('UsersPage.Input.Country')}
                                label={t('UsersPage.Input.Country')}
                                titleKey="name"
                                valueKey="name"
                                items={Countries}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <AppFormikTextField
                                className="black-border"
                                placeholder={t('UsersPage.Input.City')}
                                name="city"
                                type="text"
                            />
                        </Grid>
                        <Grid item md={6}>
                            <AppFormikTextField
                                className="black-border"
                                placeholder={t('UsersPage.Input.CountryCode')}
                                name="countryCode"
                                type="number"
                            />
                        </Grid>
                        <Grid item md={6}>
                            <AppFormikTextField
                                className="black-border"
                                placeholder={t('UsersPage.Input.PhoneNumber')}
                                name="phoneNumber"
                                type="number"
                            />
                        </Grid>
                        <Grid item md={12}>
                            <Autocomplete
                                multiple
                                value={values.managers}
                                options={users}
                                getOptionLabel={(option: any) =>
                                    `${option.name} - ${option.phoneNumber}`
                                }
                                defaultValue={values.managers}
                                filterSelectedOptions
                                onChange={(_: any, newValue: any) => {
                                    setFieldValue('managers', newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        onChange={(e) => {
                                            setManagerSearchWord(
                                                e.target.value
                                            );
                                            setFieldTouched('managers', true);
                                        }}
                                        label={t('UsersPage.Input.Managers')}
                                        placeholder={t(
                                            'UsersPage.Input.Managers'
                                        )}
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <>
                                                    {loader ? (
                                                        <CircularProgress
                                                            color="inherit"
                                                            size={20}
                                                        />
                                                    ) : null}
                                                    {
                                                        params.InputProps
                                                            .endAdornment
                                                    }
                                                </>
                                            ),
                                        }}
                                    />
                                )}
                            />
                            {errors.managers && (
                                <FormHelperText error>
                                    {errors.managers}
                                </FormHelperText>
                            )}
                        </Grid>
                        <Grid item md={12}>
                            <Typography>
                                {t('UsersPage.ProfilePicture')}
                            </Typography>
                            <input
                                accept="image/*"
                                type="file"
                                ref={pictureRef}
                                onChange={(event) => {
                                    const file = event.target.files;
                                    if (file && file?.length > 0) {
                                        setPictureUrl(
                                            URL.createObjectURL(file[0])
                                        );
                                        setProfilePicture(file[0]);
                                    } else {
                                        setPictureUrl('');
                                        setProfilePicture(null);
                                    }
                                }}
                                hidden
                            />
                            <Box className="flex flex-column align-start">
                                <img width="150" src={pictureUrl} />
                                <AppPrimaryButton
                                    onClick={() => {
                                        const { current }: any = pictureRef;
                                        if (current) {
                                            current.click();
                                        }
                                    }}
                                    className="btn-small mt-2"
                                    title={
                                        pictureUrl === ''
                                            ? t('Common.Choose')
                                            : t('Common.Change')
                                    }
                                />
                            </Box>
                        </Grid>

                        <Grid container item md={12} justifyContent="flex-end">
                            <AppSecondaryButton
                                className="mr-2"
                                title={t('UsersPage.Button.Close')}
                                onClick={() => actionCloseForm()}
                            />

                            <AppPrimaryButton
                                title={t('UsersPage.Button.Save')}
                                isLoading={isSubmitting}
                                disabled={isSubmitting || !isValid}
                                onClick={handleSubmit}
                            />
                        </Grid>
                    </Grid>
                )}
            </Formik>
        </Box>
    );
};

export default UserForm;
