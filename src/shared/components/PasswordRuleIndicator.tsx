import { ReactElement, useState, useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import { Box, Typography } from '@mui/material';

const PasswordRuleIndicator = (props: { password: string }): ReactElement => {
    const { password } = props;
    const [passwordRules, setPasswordRules] = useState([
        {
            regex: /^.{8,16}$/,
            rule: 'length',
            title: '8 to 16 Characters',
            valid: false,
            icon: <span />,
            textColor: '',
        },
        {
            regex: /[A-Z]+/,
            rule: 'uppercase',
            title: 'A Uppercase Character',
            valid: false,
            icon: <span />,
            textColor: '',
        },
        {
            regex: /[a-z]+/,
            rule: 'lowercase',
            title: 'A Lowercase Character',
            valid: false,
            icon: <span />,
            textColor: '',
        },
        {
            regex: /[0-9]+/,
            rule: 'number',
            title: 'A Number',
            valid: false,
            icon: <span />,
            textColor: '',
        },
        {
            regex: /[^a-zA-Z0-9]+/,
            rule: 'special',
            title: 'A Special Character',
            valid: false,
            icon: <span />,
            textColor: '',
        },
    ]);

    const validatePassword = (): void => {
        let rules = [...passwordRules];
        rules = rules.map((rule) => {
            const newState = { ...rule };
            if (rule.regex.test(password)) {
                newState.valid = true;
                newState.textColor = 'text-green';
                newState.icon = (
                    <CheckCircleIcon fontSize="small" className="text-green" />
                );
            } else {
                newState.valid = false;
                newState.textColor = 'text-error';
                newState.icon = (
                    <DoNotDisturbOnIcon
                        fontSize="small"
                        className="text-error"
                    />
                );
            }
            return { ...newState };
        });
        setPasswordRules(rules);
    };

    // Hooks
    useEffect(() => {
        if (password && password !== '') {
            validatePassword();
        }
    }, [password]);

    // UI Elements
    return (
        <Box className="w100">
            <Typography variant="body2" align="left">
                Password Must have:
            </Typography>
            <ul className="password-rules no-margin">
                {passwordRules.map((rule) => (
                    <li>
                        <Box className="rule">
                            <Typography
                                variant="body2"
                                className={rule.textColor}
                            >
                                {rule.title}
                            </Typography>
                            {rule.icon}
                        </Box>
                    </li>
                ))}
            </ul>
        </Box>
    );
};

export default PasswordRuleIndicator;
