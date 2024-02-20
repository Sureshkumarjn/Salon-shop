import * as Yup from 'yup';

const VirtualSchema = Yup.object().shape({
    name: Yup.string()
        .max(64, 'Name can have maximum of 64 characters at maximum')
        .required('Name is required'),
    coins: Yup.number().positive().required('Coins is required'),
});

export { VirtualSchema };
