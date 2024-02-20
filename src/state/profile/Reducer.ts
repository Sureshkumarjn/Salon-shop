import update from 'immutability-helper';
import { INotification, IRole, ROLES } from 'interface/Interface';
import { ProfileReduxActions } from './Action';

export interface ProfileState {
    firstName: string;
    userId: string;
    lastName: string;
    email: string;
    profileImage: string;
    role: IRole;
    notifications: INotification[];
    unreadCount: number;
    hasMoreRecord: boolean;
    name: string;
    phoneNumber: string;
}

const profileState: ProfileState = {
    firstName: '',
    lastName: '',
    email: '',
    profileImage: '',
    userId: '',
    role: {
        roleId: '',
        title: '',
        roleKey: ROLES.LEAD_PHOTOGRAPHER,
        approverLevel: 1,
        createdAt: '',
        updatedAt: '',
    },
    notifications: [],
    unreadCount: 0,
    hasMoreRecord: false,
    name: '',
    phoneNumber: '',
};

const ProfileStateReducer = (
    state = profileState,
    action: any = { type: '', payload: {} }
): ProfileState => {
    switch (action.type) {
        case ProfileReduxActions.SET_PROFILE_DATA:
            return update(state, {
                $merge: {
                    ...action.payload,
                },
            });
        case ProfileReduxActions.SET_NOTIFICATION:
            return update(state, {
                $merge: {
                    notifications: [
                        ...state.notifications,
                        ...action.payload.notifications,
                    ],
                    hasMoreRecord: action.payload.hasMoreRecord,
                },
            });
        case ProfileReduxActions.RESET_NOTIFICATION:
            return update(state, {
                $merge: {
                    notifications: [],
                    hasMoreRecord: false,
                },
            });
        case ProfileReduxActions.SET_NOTIFICATION_COUNT:
            return update(state, {
                $merge: {
                    unreadCount: action.payload,
                },
            });
        default:
            return state;
    }
};

export default ProfileStateReducer;
