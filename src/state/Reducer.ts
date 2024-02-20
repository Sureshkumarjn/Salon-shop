import update from 'immutability-helper';
import { AppConfigReduxActions } from './Action';

export interface AppConfig {
    versionId: string;
    androidCurrentVersion: string;
    androidMinimumVersion: string;
    androidUpdateMessage: string;
    iosCurrentVersion: string;
    iosMinimumVersion: string;
    iosUpdateMessage: string;
    isDeleted: number;
    standardCommission: number;
    coinWithdrawCommission: number;
    diamondWithdrawCommission: number;
    sarDiamondValue: number;
    sarCoinValue: number;
}

export interface LanguageConfig {
    language: string;
    direction: string;
    languageKey: string;
}

export interface AppConfigState {
    language: LanguageConfig;
    config: AppConfig;
}

const appState: AppConfigState = {
    language: {
        language: 'English',
        languageKey: 'en',
        direction: 'ltr',
    },
    config: {
        versionId: '1',
        androidCurrentVersion: '1.0.0',
        androidMinimumVersion: '1.0.0',
        androidUpdateMessage: 'New version available in play store',
        iosCurrentVersion: '1.0.1',
        iosMinimumVersion: '1.0.1',
        iosUpdateMessage: 'New version is availabe in app store',
        isDeleted: 0,
        standardCommission: 0,
        coinWithdrawCommission: 0,
        diamondWithdrawCommission: 0,
        sarDiamondValue: 0,
        sarCoinValue: 0,
    },
};

const AppConfigStateReducer = (
    state = appState,
    action: any = { type: '', payload: {} }
): AppConfigState => {
    switch (action.type) {
        case AppConfigReduxActions.SET_LANG:
            return update(state, {
                $merge: {
                    language: action.payload,
                },
            });
        case AppConfigReduxActions.SET_APPCONFIG:
            return update(state, {
                $merge: {
                    config: action.payload,
                },
            });

        default:
            return state;
    }
};

export default AppConfigStateReducer;
