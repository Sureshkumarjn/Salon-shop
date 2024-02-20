import { ReactElement, useMemo, useState } from 'react';
import { useField } from 'formik';
import { NavLink } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
    Button,
    CircularProgress,
    InputLabel,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    Checkbox,
    FormControlLabel,
    Grid,
    Dialog,
    Box,
    DialogContent,
    DialogActions,
    Select,
    MenuItem,
    FormHelperText,
    createTheme,
    ThemeProvider,
    styled,
    TextFieldProps,
    FormControl,
    Chip,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers';
import { IconCalender, IconClock, IconEyeHidden, IconEyeOpen } from './Icons';
import { v4 as uuid } from 'uuid';
import AppCheckbox from './AppCheckbox';

export interface ButtonInterface {
    className?: string;
    title: any;
    disabled?: boolean;
    fullWidth?: boolean;
    isLoading?: boolean;
    loadingText?: string;
    endIcon?: any;
    startIcon?: any;
    onClick?: any;
    variant?: 'text' | 'outlined' | 'contained';
    component?: any;
    to?: any;
}

export const AppButton = ({
    className,
    title,
    disabled,
    fullWidth,
    isLoading,
    loadingText,
    endIcon,
    startIcon,
    onClick,
    variant,
    component,
    to,
}: ButtonInterface): ReactElement => {
    const classNames = ['trans-3d-hover'];
    if (className) {
        classNames.push(className);
    }
    return (
        <Button
            type="button"
            className={classNames.join(' ')}
            disabled={disabled}
            fullWidth={fullWidth !== undefined ? fullWidth : false}
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
            variant={variant || 'text'}
            component={component || Button}
            to={to || ''}
            aria-label={title}
            title={title}
        >
            <>
                {isLoading && (
                    <>
                        <CircularProgress />
                        {loadingText}
                    </>
                )}
                {!isLoading && (
                    <Typography className="btn-label">{title}</Typography>
                )}
            </>
        </Button>
    );
};

export const AppPrimaryButton = (props: ButtonInterface): ReactElement => {
    const { className } = props;
    return <AppButton {...props} className={`btn-primary ${className}`} />;
};

export const AppSecondaryButton = (props: ButtonInterface): ReactElement => {
    const { className } = props;
    return <AppButton {...props} className={`btn-secondary ${className}`} />;
};

export const AppPrimaryButtonOutlined = (
    props: ButtonInterface
): ReactElement => {
    const { className } = props;
    return (
        <AppButton {...props} className={`btn-primary-outlined ${className}`} />
    );
};

export const AppTeritaryButton = (props: ButtonInterface): ReactElement => {
    const { className } = props;
    return <AppButton {...props} className={`btn-teritary ${className}`} />;
};

export const AppDarkButton = (props: ButtonInterface): ReactElement => {
    const { className } = props;
    return <AppButton {...props} className={`btn-dark ${className}`} />;
};

export const CustomInput = styled(TextField)((props: TextFieldProps): any => {
    let isGoldenInput = true;
    if (props.className && props.className!.includes('black-border')) {
        isGoldenInput = false;
    }
    const borderColor = isGoldenInput ? '#019ADE' : 'black';
    const labelLeft = isGoldenInput ? '33px' : '0px';
    const inputLeft = isGoldenInput ? '0px' : '15px';
    const labelColor = isGoldenInput ? '#019ADE' : 'black';
    return {
        '& label': {
            position: 'absolute',
            left: labelLeft,
            top: '15px',
            color: labelColor,
            fontSize: '16px',
        },
        '& fieldset': {
            top: 0,
            '& legend': {
                display: 'none',
            },
        },
        '&.has-value': {
            '& .MuiInputBase-input': {
                padding: `24px 14px 8px ${inputLeft} !important`,
            },
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            height: 50,
            '& .MuiInputBase-root': {},
            '& .MuiInputBase-input': {
                padding: `16px 14px 16px ${inputLeft}`,
            },
            '& fieldset': {
                borderColor: '#bcbcbc',
            },
            '&:hover fieldset': {
                borderColor: 'black',
            },
            '&.Mui-focused svg': {
                color: `${borderColor}`,
            },
            '&.Mui-error svg': {
                color: `#e40521 !important`,
            },
            '&.Mui-focused fieldset': {
                border: `1px solid ${borderColor}`,
            },
        },
    };
});

const CustomTextArea = styled(TextField)((props: TextFieldProps): any => {
    let isGoldenInput = true;
    if (props.className && props.className!.includes('black-border')) {
        isGoldenInput = false;
    }
    const borderColor = isGoldenInput ? '#019ADE' : 'black';

    return {
        '& label': {
            fontSize: '16px',
        },
        '& fieldset': {
            top: 0,
            '& legend': {
                display: 'none',
            },
        },
        '&.has-value': {
            '& .MuiInputBase-input': {
                padding: `10px 0px`,
            },
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            '& fieldset': {
                borderColor: '#bcbcbc',
            },
            '&:hover fieldset': {
                borderColor: 'black',
            },
            '&.Mui-focused fieldset': {
                border: `1px solid ${borderColor}`,
            },
        },
    };
});

export const CustomSelectInput: any = styled(Select)((props: any): any => {
    let isGoldenInput = true;
    if (props.className && props.className!.includes('black-border')) {
        isGoldenInput = false;
    }
    const borderColor = isGoldenInput ? '#019ADE' : 'black';
    const inputLeft = isGoldenInput ? '15px' : '15px';

    return {
        height: 50,
        '& fieldset': {
            borderRadius: 10,
        },
        '& .MuiTypography-root': {
            whiteSpace: 'pre-wrap',
            height: 20,
        },
        '& svg': { right: 5 },

        '&.has-value': {
            '& .MuiInputBase-input': {
                padding: `22px 55px 8px ${inputLeft} !important`,
            },
            '& .MuiTypography-root': {
                overflow: 'hidden',
            },
        },
        '&:hover fieldset': {
            borderColor: 'black',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: `1px solid ${borderColor}`,
        },
    };
});

export const AppTextField = (props: any): ReactElement => {
    const { value, className, placeholder, type, inputProps, onChange } = props;
    return (
        <CustomInput
            className={value ? `${className} has-value` : className}
            fullWidth
            id={uuid()}
            placeholder={placeholder}
            label={value && placeholder}
            type={type}
            value={value}
            variant="outlined"
            onChange={(event: any) => {
                if (onChange) {
                    onChange(event);
                }
            }}
            InputProps={{ ...inputProps, autoComplete: 'off' }}
            autoComplete="off"
        />
    );
};

export const AppFormikTextField = (props: any): ReactElement => {
    const { className, placeholder, type, inputProps, onChange } = props;
    const [field, meta] = useField(props);
    const label = useMemo(() => {
        if (meta.value || meta.value === 0) {
            return placeholder;
        }
        return undefined;
    }, [meta.value]);
    return (
        <CustomInput
            className={meta.value ? `${className} has-value` : className}
            error={Boolean(meta.touched && meta.error)}
            fullWidth
            helperText={meta.touched && meta.error}
            id={uuid()}
            name={field.name}
            placeholder={placeholder}
            label={label}
            type={type}
            value={meta.value}
            variant="outlined"
            onBlur={field.onBlur}
            onChange={(event: any) => {
                field.onChange(event);
                if (onChange) {
                    onChange(event);
                }
            }}
            InputProps={{ ...inputProps, autoComplete: 'off' }}
            autoComplete="off"
        />
    );
};

export const FormikTextField = (props: any): ReactElement => {
    const { className, type, inputProps, onChange, size, label } = props;
    const [field, meta] = useField(props);
    return (
        <>
            <Typography variant="body1" className="formik-text-field-container">
                {label}
            </Typography>

            <TextField
                className={meta.value ? `${className} has-value` : className}
                error={Boolean(meta.touched && meta.error)}
                fullWidth
                helperText={meta.touched && meta.error}
                id={uuid()}
                name={field.name}
                type={type}
                value={meta.value}
                onBlur={field.onBlur}
                onChange={(event: any) => {
                    field.onChange(event);
                    if (onChange) {
                        onChange(event);
                    }
                }}
                size={size || 'medium'}
                InputProps={{ ...inputProps, autoComplete: 'off' }}
                autoComplete="off"
            />
        </>
    );
};

export const AppFormikPasswordField = (props: any): ReactElement => {
    const { size, placeholder, className, inputProps, onChange } = props;
    const [field, meta] = useField(props);
    const [showPassword, setShowPassword] = useState(false);
    return (
        <CustomInput
            className={meta.value ? `${className} has-value` : className}
            error={Boolean(meta.touched && meta.error)}
            fullWidth
            helperText={meta.touched && meta.error}
            margin="none"
            name={field.name}
            placeholder={placeholder}
            label={meta.value && placeholder}
            type={showPassword ? 'text' : 'password'}
            value={meta.value}
            variant="outlined"
            onBlur={field.onBlur}
            onChange={(e) => {
                if (onChange) {
                    onChange(e);
                }
                field.onChange(e);
            }}
            size={size || 'medium'}
            InputProps={{
                ...inputProps,
                autoComplete: 'new-password',
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            title={
                                showPassword ? 'Hide password' : 'Show password'
                            }
                            aria-label={
                                showPassword ? 'Hide password' : 'Show password'
                            }
                            onClick={() => {
                                setShowPassword(!showPassword);
                            }}
                            edge="end"
                            className="text-primary"
                        >
                            {showPassword ? <IconEyeOpen /> : <IconEyeHidden />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export const AppFormikTextArea = (props: any): ReactElement => {
    const { className, placeholder, readOnly, rows } = props;
    const [field, meta] = useField(props);
    return (
        <CustomTextArea
            multiline
            rows={rows}
            error={Boolean(meta.touched && meta.error)}
            fullWidth
            helperText={meta.touched && meta.error}
            margin="none"
            name={field.name}
            label={placeholder}
            value={meta.value}
            variant="outlined"
            onBlur={field.onBlur}
            onChange={field.onChange}
            InputProps={{
                readOnly,
            }}
            id={uuid()}
            className={meta.value ? `${className} has-value` : className}
        />
    );
};

export const AppFormikCheckBox = (props: any): ReactElement => {
    const { label } = props;
    const [field, meta] = useField(props);
    return (
        <>
            <Checkbox
                checked={meta.value}
                name={field.name}
                onChange={field.onChange}
                className="primary-text"
            />
            <Typography className="white">{label}</Typography>
        </>
    );
};

export const AppNavButton = ({
    title,
    to,
    fullWidth,
    endIcon,
}: any): ReactElement => (
    <Button
        fullWidth={fullWidth}
        className="btn-primary btn-small"
        to={to}
        component={NavLink}
        endIcon={endIcon}
    >
        {title}
    </Button>
);

export const AppBigNavButton = ({
    title,
    to,
    fullWidth,
    endIcon,
}: any): ReactElement => (
    <Button
        fullWidth={fullWidth}
        className="btn-primary"
        to={to}
        component={NavLink}
        endIcon={endIcon}
    >
        {title}
    </Button>
);

export const AppThemeRadioInput = (props: any): ReactElement => {
    const { label, name, value, onChange } = props;
    return (
        <Grid
            className="app-checkbox"
            container
            onClick={() => {
                onChange(name);
            }}
        >
            <img
                src={
                    name === value
                        ? '/icons/icon_radio_selected.png'
                        : '/icons/icon_radio.png'
                }
                alt=""
            />
            <Typography variant="body1">{label}</Typography>
        </Grid>
    );
};

export const ConfirmDialog = (props: any): ReactElement => {
    const {
        title,
        subTitle,
        showConfirm,
        cancelTitle,
        successTitle,
        // isPositiveConfirm,
        onSuccess,
        onCancel,
    } = props;

    // Actions
    const actionPositive = (): void => {
        onSuccess();
    };
    const actionNegative = (): void => {
        onCancel();
    };

    // UI Elements
    return (
        <Dialog id="confirm-dialog" fullWidth maxWidth="sm" open={showConfirm}>
            <Box padding={2}>
                <DialogContent className="dialog-content-container">
                    <Typography className="" variant="h5">
                        {title}
                    </Typography>
                    <Typography className="mt-2 f16" variant="body1">
                        {subTitle}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <AppSecondaryButton
                        className="btn-small"
                        title={cancelTitle}
                        onClick={actionNegative}
                    />
                    <AppPrimaryButton
                        className="btn-small"
                        title={successTitle}
                        onClick={actionPositive}
                    />
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export const ConfirmDialogWithTextField = (props: any): ReactElement => {
    const {
        title,
        subTitle,
        showConfirm,
        cancelTitle,
        successTitle,
        setTextValue,
        onSuccess,
        onCancel,
        textValue,
    } = props;

    // Actions
    const actionPositive = (): void => {
        onSuccess();
    };
    const actionNegative = (): void => {
        onCancel();
    };

    // UI Elements
    return (
        <Dialog id="confirm-dialog" fullWidth maxWidth="sm" open={showConfirm}>
            <Box padding={2}>
                <DialogContent className="dialog-content-container">
                    <Typography className="" variant="h5">
                        {title}
                    </Typography>
                    <Typography className="mt-2 f16 mb-4" variant="body1">
                        {subTitle}
                    </Typography>
                    <CustomTextArea
                        label="Reason"
                        rows={4}
                        fullWidth
                        onChange={(e) => setTextValue(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <AppSecondaryButton
                        className="btn-small"
                        title={cancelTitle}
                        onClick={actionNegative}
                    />
                    <AppPrimaryButton
                        className="btn-small"
                        title={successTitle}
                        onClick={actionPositive}
                        disabled={textValue === ''}
                    />
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export const AppSelect = (props: any): ReactElement => {
    const {
        name,
        items,
        titleKey,
        valueKey,
        readOnly,
        onChange,
        placeholder,
        size,
        inputProps,
        className,
        value,
    } = props;
    const fieldId = uuid();
    return (
        <FormControl fullWidth className={value ? `has-value` : ''}>
            <InputLabel color="primary" className="f16" id={fieldId}>
                {placeholder}
            </InputLabel>
            <CustomSelectInput
                MenuProps={{ variant: 'menu', style: { maxHeight: 250 } }}
                IconComponent={KeyboardArrowDownIcon}
                className={value ? `${className} has-value` : className}
                name={name}
                fullWidth
                id={fieldId}
                variant="outlined"
                value={value}
                size={size || 'medium'}
                onChange={(e: any) => {
                    if (onChange) onChange(e);
                }}
                inputProps={{ readOnly, ...inputProps }}
            >
                {items.map((item: any, index: number): any => (
                    <MenuItem
                        key={`${name}_${index}`}
                        value={item[valueKey]}
                        className="black"
                    >
                        <Typography className="f16">
                            {item[titleKey]}
                        </Typography>
                    </MenuItem>
                ))}
            </CustomSelectInput>
        </FormControl>
    );
};

export const AppFormikSelect = (props: any): ReactElement => {
    const {
        name,
        items,
        titleKey,
        valueKey,
        readOnly,
        onChange,
        placeholder,
        size,
        inputProps,
        className,
    } = props;
    const [field, meta] = useField(props);
    const fieldId = uuid();
    return (
        <FormControl fullWidth className={meta.value ? `has-value` : ''}>
            <InputLabel color="primary" className="f16" id={fieldId}>
                {placeholder}
            </InputLabel>
            <CustomSelectInput
                MenuProps={{ variant: 'menu', style: { maxHeight: 250 } }}
                IconComponent={KeyboardArrowDownIcon}
                className={meta.value ? `${className} has-value` : className}
                error={Boolean(meta.touched && meta.error)}
                // label={placeholder}
                // placeholder={placeholder}
                fullWidth
                id={fieldId}
                variant="outlined"
                value={meta.value}
                name={field.name}
                size={size || 'medium'}
                onBlur={(e: any) => {
                    field.onBlur(e);
                    if (onChange) onChange(e);
                }}
                onChange={(e: any) => {
                    field.onChange(e);
                    if (onChange) onChange(e);
                }}
                inputProps={{ readOnly, ...inputProps }}
                // displayEmpty
            >
                {/* {placeholder && (
                    <MenuItem disabled key={`${name}_${placeholder}`} value="">
                        <Typography className="f16 input-placeholder">
                            {placeholder}
                        </Typography>
                    </MenuItem>
                )} */}
                {items.map((item: any, index: number): any => (
                    <MenuItem
                        key={`${name}_${index}`}
                        value={item[valueKey]}
                        className="black"
                    >
                        <Typography className="f16">
                            {item[titleKey]}
                        </Typography>
                    </MenuItem>
                ))}
            </CustomSelectInput>
            {meta.touched && meta.error && (
                <FormHelperText error>{meta.error}</FormHelperText>
            )}
        </FormControl>
    );
};

export const AppFormikMultiSelect = (props: any): ReactElement => {
    const {
        name,
        items,
        titleKey,
        valueKey,
        readOnly,
        onChange,
        placeholder,
        size,
        inputProps,
        className,
    } = props;
    const [field, meta, helpers] = useField(props);
    const fieldId = uuid();
    return (
        <FormControl
            fullWidth
            className={meta.value.length > 0 ? `has-value` : ''}
        >
            <InputLabel color="primary" className="f16" id={fieldId}>
                {placeholder}
            </InputLabel>
            <CustomSelectInput
                MenuProps={{
                    variant: 'menu',
                    style: { maxHeight: 250 },
                }}
                IconComponent={KeyboardArrowDownIcon}
                multiple
                className={
                    meta.value.length > 0 ? `${className} has-value` : className
                }
                error={Boolean(meta.touched && meta.error)}
                // label={outerLabel ? undefined : label}
                // placeholder={placeholder}
                id={fieldId}
                fullWidth
                variant="outlined"
                value={meta.value}
                name={field.name}
                size={size || 'medium'}
                onBlur={(e: any) => {
                    field.onBlur(e);
                    if (onChange) onChange(e);
                }}
                onChange={(e: any) => {
                    field.onChange(e);
                    if (onChange) onChange(e);
                }}
                inputProps={{ readOnly, ...inputProps }}
                native={false}
                // displayEmpty
                renderValue={(selectedValues: any[]): ReactElement => {
                    const selectedItems: any[] = [];
                    selectedValues.forEach((selectedValue) => {
                        const item = items.find(
                            (i: any) => i[valueKey] === selectedValue
                        );
                        if (item) {
                            selectedItems.push(item);
                        }
                    });
                    return selectedValues.length > 0 ? (
                        <Typography>
                            {selectedItems.map((s) => s[titleKey]).join(', ')}
                        </Typography>
                    ) : (
                        <Typography className="f16 input-placeholder">
                            {placeholder}
                        </Typography>
                    );
                }}
            >
                {/* {placeholder && (
                    <MenuItem disabled key={`${name}_${placeholder}`} value="">
                        <Typography className="input-placeholder">
                            {placeholder}
                        </Typography>
                    </MenuItem>
                )} */}
                <MenuItem
                    className="black"
                    onClick={() => {
                        const notChecked = meta.value.length !== items.length;
                        if (notChecked) {
                            helpers.setValue(
                                items.map((i: any) => i[valueKey])
                            );
                        } else {
                            helpers.setValue([]);
                        }
                    }}
                >
                    <AppCheckbox
                        size={20}
                        color="#e40521"
                        borderColor="#585858"
                        checked={meta.value.length === items.length}
                        label=""
                        onChange={() => {}}
                    />
                    <Typography className="f16">Select All</Typography>
                </MenuItem>
                {items.map((item: any, index: number): any => (
                    <MenuItem
                        key={`${name}_${index}`}
                        value={item[valueKey]}
                        className="black py-3"
                    >
                        <AppCheckbox
                            size={20}
                            color="#e40521"
                            borderColor="#585858"
                            checked={meta.value.indexOf(item[valueKey]) > -1}
                            label=""
                            onChange={() => {}}
                        />
                        <Typography className="f16">
                            {item[titleKey]}
                        </Typography>
                    </MenuItem>
                ))}
            </CustomSelectInput>
            {meta.touched && meta.error && (
                <FormHelperText error>{meta.error}</FormHelperText>
            )}
        </FormControl>
    );
};

export const AppRadioBox = (props: any): ReactElement => {
    const { onChange, label, checked, disabled } = props;
    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    disabled={disabled}
                    disableRipple
                    color="primary"
                />
            }
            label={label}
            onChange={onChange}
        />
    );
};
export const IconTextField = ({
    iconStart,
    iconEnd,
    InputProps,
    ...props
}: any): ReactElement => (
    <TextField
        fullWidth
        {...props}
        variant="outlined"
        InputProps={{
            ...InputProps,
            startAdornment: iconStart ? (
                <InputAdornment position="start">{iconStart}</InputAdornment>
            ) : null,
            endAdornment: iconEnd ? (
                <InputAdornment position="end">{iconEnd}</InputAdornment>
            ) : null,
        }}
    />
);

export const DatePickerTheme = createTheme({
    typography: {
        fontFamily: 'Titillium Web',
    },
    palette: {
        primary: {
            contrastText: '#ffffff',
            main: '#e40521',
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    border: '1px solid black',
                    borderRadius: '10px',
                    boxShadow: 'none',
                    width: '100%',
                },
            },
        },
    },
});

export const AppDatePicker = (props: any): any => {
    const {
        name,
        placeholder,
        disablePast,
        label,
        minDate,
        maxDate,
        className,
        onChange,
        value,
        onClose,
        readOnly,
    } = props;
    const [open, setOpen] = useState(false);
    const [field, meta] = useField(props);
    return (
        <Box>
            {label && (
                <InputLabel className="text-secondary lato-regular f14 mb-4">
                    {label}
                </InputLabel>
            )}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <ThemeProvider theme={DatePickerTheme}>
                    <DatePicker
                        readOnly={readOnly}
                        open={open}
                        onClose={() => {
                            setOpen(false);
                            if (onClose) onClose();
                        }}
                        inputFormat="dd-MMM-yyyy"
                        disableMaskedInput
                        disablePast={disablePast}
                        label={label}
                        minDate={minDate}
                        maxDate={maxDate}
                        value={value}
                        disableOpenPicker
                        onChange={(newValue) => {
                            onChange(newValue);
                        }}
                        components={{
                            OpenPickerIcon: IconCalender,
                        }}
                        renderInput={(params) => {
                            const newParams = {
                                ...params,
                                inputProps: {
                                    ...params.inputProps,
                                    placeholder,
                                    readOnly: true,
                                },
                            };

                            return (
                                <CustomInput
                                    onClick={() => setOpen(!readOnly && true)}
                                    fullWidth
                                    {...newParams}
                                    name={name}
                                    label={meta.value ? placeholder : ''}
                                    id={uuid()}
                                    value={meta.value}
                                    error={Boolean(meta.touched && meta.error)}
                                    helperText={meta.touched && meta.error}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    className={
                                        meta.value
                                            ? `${className} has-value`
                                            : className
                                    }
                                />
                            );
                        }}
                    />
                </ThemeProvider>
            </LocalizationProvider>
        </Box>
    );
};

export const AppDateTimePicker = (props: any): any => {
    const {
        name,
        placeholder,
        disablePast,
        label,
        minDate,
        maxDate,
        className,
        onChange,
        value,
        readOnly,
    } = props;
    const [open, setOpen] = useState(false);
    const [field, meta] = useField(props);
    return (
        <Box>
            {label && (
                <InputLabel className="text-secondary lato-regular f14 mb-4">
                    {label}
                </InputLabel>
            )}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <ThemeProvider theme={DatePickerTheme}>
                    <DateTimePicker
                        open={open}
                        readOnly={readOnly}
                        onClose={() => setOpen(false)}
                        components={{
                            OpenPickerIcon: IconClock,
                        }}
                        inputFormat="MM/dd/yyyy hh:mm a"
                        disablePast={disablePast}
                        label={label}
                        minDate={minDate}
                        maxDate={maxDate}
                        value={value}
                        onChange={(newValue) => {
                            onChange(newValue);
                        }}
                        renderInput={(params) => {
                            const newParams = {
                                ...params,
                                inputProps: {
                                    ...params.inputProps,
                                    placeholder,
                                    readOnly: true,
                                },
                            };
                            return (
                                <CustomInput
                                    onClick={() => setOpen(!readOnly && true)}
                                    fullWidth
                                    {...newParams}
                                    name={name}
                                    label={meta.value ? placeholder : ''}
                                    id={uuid()}
                                    value={meta.value}
                                    error={Boolean(meta.error)}
                                    helperText={meta.error}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    className={
                                        meta.value
                                            ? `${className} has-value`
                                            : className
                                    }
                                />
                            );
                        }}
                    />
                </ThemeProvider>
            </LocalizationProvider>
        </Box>
    );
};

export const Highlighted = ({ text = '', highlight = '' }): ReactElement => {
    if (!highlight.trim()) {
        return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight} )`, 'gi');
    const parts = text.split(regex);

    return (
        <span>
            {parts
                .filter(String)
                .map((part, i) =>
                    regex.test(part) ? (
                        <mark key={i}>{part}</mark>
                    ) : (
                        <span key={i}>{part}</span>
                    )
                )}
        </span>
    );
};

export const YesNoChip = (props: any): ReactElement => {
    const { flag } = props;
    if (flag) {
        return <Chip label="Yes" color="primary" />;
    }
    return <Chip label="No" color="primary" variant="outlined" />;
};
