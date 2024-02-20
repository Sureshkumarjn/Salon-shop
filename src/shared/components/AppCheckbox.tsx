import {
    Box,
    FormControlLabel,
    Checkbox,
    Typography,
    ThemeProvider,
    createTheme,
} from '@mui/material';
import { ReactElement } from 'react';
import DoneIcon from '@mui/icons-material/Done';

export interface IAppCheckbox {
    checked: boolean;
    label: string;
    color: string;
    onChange: (chekced: boolean) => void;
    labelColor?: string;
    size?: number;
    borderColor?: string;
    title?: string;
}
const AppCheckbox = (props: IAppCheckbox): ReactElement => {
    const {
        title,
        size,
        checked,
        label,
        labelColor,
        borderColor,
        color,
        onChange,
    } = props;

    const theme = createTheme({
        typography: {
            fontFamily: 'Titillium Web',
        },
        palette: {
            primary: {
                main: color,
            },
        },
    });
    const checkboxSize = size || 24;
    return (
        <ThemeProvider theme={theme}>
            <FormControlLabel
                sx={{ margin: '0px' }}
                control={
                    <Checkbox
                        title={title}
                        sx={{ padding: '0px 10px 0px 0px' }}
                        icon={
                            <Box
                                style={{
                                    boxSizing: 'border-box',
                                    borderRadius: 7,
                                    width: checkboxSize,
                                    height: checkboxSize,
                                    border: `1px solid ${borderColor || color}`,
                                }}
                            />
                        }
                        checkedIcon={
                            <Box
                                style={{
                                    borderRadius: 5,
                                    width: checkboxSize,
                                    height: checkboxSize,
                                    backgroundColor: color,
                                }}
                            >
                                <DoneIcon
                                    style={{
                                        color: 'white',
                                        width: checkboxSize,
                                        height: checkboxSize,
                                    }}
                                />
                            </Box>
                        }
                        onChange={(e) => onChange(e.target.checked)}
                        checked={checked}
                    />
                }
                label={
                    <Typography sx={{ color: labelColor }} className="f14">
                        {label}
                    </Typography>
                }
            />
        </ThemeProvider>
    );
};

export default AppCheckbox;
