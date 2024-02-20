/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import update from 'immutability-helper';
import { AuthReduxActions } from './Action';

export const language = [
    {
        title: 'EN',
        value: 'en',
    },
    {
        title: 'AR',
        value: 'ar',
    },
];

export interface AuthState {
    isUserLoggedIn: boolean;
    accessToken: string;
    refreshToken: string;
    lang: string;
}

const authState: AuthState = {
    isUserLoggedIn: false,
    accessToken: '',
    refreshToken: '',
    lang: '',
};

const AuthStateReducer = (
    state = authState,
    action: any = { type: '', payload: {} }
): AuthState => {
    switch (action.type) {
        case AuthReduxActions.AUTH_SET_LOGIN_STATUS:
            return update(state, {
                $merge: {
                    ...action.payload,
                },
            });
        case AuthReduxActions.LOGOUT:
            return update(state, {
                $merge: {
                    ...authState,
                },
            });
        case AuthReduxActions.SET_LANG:
            return update(state, {
                $merge: {
                    lang: action.payload.lang,
                },
            });

        default:
            return state;
    }
};

export default AuthStateReducer;

// Git Demo
