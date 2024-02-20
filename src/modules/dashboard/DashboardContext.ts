import { createContext } from 'react';
import { AppConfigState } from 'state/Reducer';
import { ProfileState } from 'state/profile/Reducer';

export type IApplicationProps = {
    profileState: ProfileState;
    appConfig: AppConfigState;
};

export const ApplicationContext = createContext<IApplicationProps | null>(null);
