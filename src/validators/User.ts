import * as Yup from 'yup';

const AddUserSchema = Yup.object().shape({
    firstName: Yup.string()
        .trim()
        .min(2, 'Firstname should have minimum 2 characters')
        .max(64, 'Firstname can have maximum of 64 characters at maximum')
        .required('Firstname is required'),
    lastName: Yup.string()
        .trim()
        .max(64, 'Lastname can have maximum of 64 characters at maximum')
        .required('Lastname is required'),
    email: Yup.string()
        .trim()
        .email('Enter valid email')
        .required('Email is required')
        .max(64, 'Email can have maximum of 64 characters at maximum'),
    password: Yup.string()
        .trim()
        .min(8, 'Password must be 8 characters at minimum!')
        .max(16, 'Password must be 15 characters at maximum!')
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}/,
            'Password must contain uppercase, lowercase, number, special character and ranging from 8-16 characters'
        )
        .required('Password is required'),
    role: Yup.string().required('Role is required'),
});

const UpdateUserSchema = Yup.object().shape({
    firstName: Yup.string()
        .max(64, 'Firstname can have maximum of 64 characters at maximum')
        .required('Firstname is required'),
    lastName: Yup.string()
        .max(64, 'Lastname can have maximum of 64 characters at maximum')
        .required('Lastname is required'),
    email: Yup.string()
        .email('Enter valid email')
        .required('Email is required')
        .max(64, 'Email can have maximum of 64 characters at maximum'),
    role: Yup.string().required('Role is required'),
    password: Yup.string()
        .notRequired()
        .min(8, 'Password must be 8 characters at minimum!')
        .max(16, 'Password must be 15 characters at maximum!')
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}/,
            'Password must contain uppercase, lowercase, number, special character and ranging from 8-16 characters'
        ),
});

const CommunitySchema = (t: any): any =>
    Yup.object().shape({
        name: Yup.string()
            .trim()
            .min(2, t('UsersPage.Validation.Name'))
            .max(64, t('UsersPage.Validation.Name'))
            .required(t('UsersPage.Validation.Name')),
        username: Yup.string()
            .trim()
            .min(2, t('UsersPage.Validation.UserName'))
            .max(64, t('UsersPage.Validation.UserName'))
            .required(t('UsersPage.Validation.UserName')),
        city: Yup.string()
            .trim()
            .max(255, t('UsersPage.Validation.City'))
            .required(t('UsersPage.Validation.City')),
        country: Yup.string()
            .trim()
            .max(255, t('UsersPage.Validation.Country'))
            .required(t('UsersPage.Validation.Country')),
        countryCode: Yup.string()
            .trim()
            .matches(/[0-9]/, t('UsersPage.Validation.CountryCode'))
            .required(t('UsersPage.Validation.CountryCode')),
        phoneNumber: Yup.string()
            .trim()
            .matches(/[0-9]/, t('UsersPage.Validation.PhoneNumber'))
            .required(t('UsersPage.Validation.PhoneNumber')),
        managers: Yup.array().min(1, t('UsersPage.Validation.Manager')),
    });

export { AddUserSchema, UpdateUserSchema, CommunitySchema };
