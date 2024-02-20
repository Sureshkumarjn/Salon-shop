import { createTheme } from '@mui/material';
import TypographyStyle from './overrides/Typography';
import Palette from './overrides/Palette';

const theme = createTheme({
    spacing: 4,
    palette: Palette,
    typography: TypographyStyle,
    components: {
        MuiFormControl: {
            styleOverrides: {
                root: {
                    marginBottom: 20,
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                formControl: {
                    color: 'rgba(0,0,0,0.4)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    height: 49,
                    fontSize: 16,
                    lineHeight: 16,
                    fontWeight: 600,
                    borderRadius: 10,
                    fontFamily: 'Titillium Web',
                    padding: '11px 34px',
                    textTransform: 'none',
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                icon: {
                    right: 20,
                    width: 25,
                    color: 'rgba(0,0,0,0.4)',
                },
            },
        },
        MuiStep: {
            styleOverrides: {
                root: {
                    padding: 0,
                },
            },
        },
        MuiStepLabel: {
            styleOverrides: {
                iconContainer: {
                    padding: 0,
                },
            },
        },
        MuiBadge: {
            styleOverrides: {
                badge: {
                    padding: 0,
                    top: 0,
                    right: -2,
                    border: '1px solid white',
                    fontSize: 10,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    padding: '0px 0px',
                },
                deleteIcon: {
                    marginRight: 10,
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    fontWeight: 700,
                    fontSize: 14,
                    padding: '5px 20px',
                    verticalAlign: 'top',
                },
                root: {
                    padding: '5px 20px',
                    borderBottom: '1px solid #EEEEEE',
                },
            },
        },
    },
});

export const toolTipTheme = createTheme({
    typography: TypographyStyle,
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    maxWidth: 450,
                    backgroundColor: '#45413C',
                    padding: 12,
                    borderRadius: 10,
                },
                arrow: {
                    color: '#45413C',
                },
            },
        },
    },
});

export default theme;
