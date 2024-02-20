import { combineReducers } from 'redux';
import { CombinedState, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import AuthStateReducer, { AuthState } from './authentication/Reducer';
import ProfileStateReducer, { ProfileState } from './profile/Reducer';
import AppConfigStateReducer, { AppConfigState } from './Reducer';

export interface AppState {
    authState: AuthState;
    profileState: ProfileState;
    appConfig: AppConfigState;
}

const appReducer = combineReducers<AppState>({
    authState: AuthStateReducer,
    profileState: ProfileStateReducer,
    appConfig: AppConfigStateReducer,
});

const rootReducer = (
    state: AppState | undefined,
    action: any
): CombinedState<AppState> => {
    if (action.type === 'LOGOUT' || action.type === 'RESET_STORE') {
        storage.removeItem('persist:TKTAKH_ADMIN');
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};

const persistConfig = {
    key: 'TKTAKH_ADMIN',
    storage,
    stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer as any);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
            thunk: true,
        }),
    devTools: process.env.NODE_ENV !== 'production',
});
export const persistor = persistStore(store);
export default store;
