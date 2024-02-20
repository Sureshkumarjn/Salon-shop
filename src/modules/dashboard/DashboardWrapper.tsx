import { Box } from '@mui/material';
import { ReactElement, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader, AppSidebar } from 'shared/components';
import { ApplicationContext } from './DashboardContext';
import { connect } from 'react-redux';
import { AppState } from 'state/RootReducer';
import { ProfileState } from 'state/profile/Reducer';
import { INotification } from 'interface/Interface';
import { AppConfigSerivce } from 'services';
import { ProfileActions } from 'state/profile/Action';
import { AppConfigState } from 'state/Reducer';
// import EventEmitter, { SubscribeEvents } from 'shared/helpers/EventEmitter';

const Dashboard = (props: any): ReactElement => {
    const {
        profileState,
        appConfig,
    }: // resetNotifiction,
    {
        profileState: ProfileState;
        appConfig: AppConfigState;
        resetNotifiction: (notification: INotification[]) => void;
    } = props;

    // const loadNotification = (): void => {
    //     resetNotifiction([]);
    //     ProfileService.loadNotifictionAndSave('0', 10);
    // };

    // const subscribeNotification = (): void => {
    //     EventEmitter.subscribe(SubscribeEvents.ON_NEW_NOTIFICATION, () => {
    //         loadNotification();
    //     });
    // };

    // Hooks
    useEffect(() => {
        // loadNotification();
        // subscribeNotification();
        AppConfigSerivce.loadAppConfigAndSave();
    }, []);

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <ApplicationContext.Provider value={{ profileState, appConfig }}>
            <Box className="app-container">
                <AppSidebar />
                <Box className="app-right-panel">
                    <AppHeader />
                    <Box className="app-body" id="dashboard-content">
                        <Outlet />
                    </Box>
                </Box>
            </Box>
        </ApplicationContext.Provider>
    );
};

const mapStateToProps = (state: AppState): any => ({
    profileState: state.profileState,
    appConfig: state.appConfig,
});

const mapDispatchToProps = (dispatch: any): any => ({
    resetNotifiction: (data: any) =>
        dispatch(ProfileActions.resetNotifiction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
