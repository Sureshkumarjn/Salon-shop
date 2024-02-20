import { Box, IconButton, List, ListItem, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { connect } from 'react-redux';
import { AppState } from 'state/RootReducer';
import { useTranslation } from 'react-i18next';
import { AppConfigActions } from 'state/Action';
import { AppConfigState, LanguageConfig } from 'state/Reducer';
import { LANGUAGES } from 'shared/Constants';

const ChangeLanguage = (props: any): ReactElement => {
    const { t } = useTranslation();
    const {
        onClose,
        setLang,
        appConfig,
    }: {
        onClose: () => void;
        appConfig: AppConfigState;
        setLang: (data: LanguageConfig) => void;
    } = props;

    const { language } = appConfig;

    // UI Elements
    return (
        <>
            <Box className="profile-header-container px-6 pt-5">
                <Box className="profile-heading">
                    <Typography variant="h4" className="settings-style">
                        {t('Language.Title')}
                    </Typography>
                    <IconButton
                        title="Close"
                        aria-label="Close"
                        onClick={onClose}
                    >
                        <img
                            src="/images/icons/icon_close.svg"
                            width={20}
                            height={20}
                        />
                    </IconButton>
                </Box>
            </Box>
            <List className="mt-2 p-6">
                {LANGUAGES.map((lang) => (
                    <ListItem
                        disablePadding
                        className={
                            language.languageKey === lang.languageKey
                                ? 'lang-active'
                                : 'lang-inactive'
                        }
                        onClick={() => {
                            setLang(lang);
                        }}
                    >
                        <Typography className="lang-sub-title">
                            {lang.language}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </>
    );
};
const mapStateToProps = (state: AppState): any => ({
    appConfig: state.appConfig,
});
const mapDispatchToProps = (dispatch: any): any => ({
    setLang: (data: any) => dispatch(AppConfigActions.setLang(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeLanguage);
