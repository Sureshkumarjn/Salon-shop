import { AuthenticationService } from './AuthenticationService';
import { ProfileService } from './ProfileService';
import { UserService } from './UserService';
import { AppService } from './AppService';
import { LogService } from './LogService';
import { SubscriptionService } from './SubscriptionService';
import { PointsPackagesService } from './PointsPackagesService';
import { VirtualGiftService } from './VirtualGiftService';
import { AppConfigSerivce } from './AppConfigService';
import { CommunityService } from './CommunityService';
import { WithdrawRequestService } from './WithdrawRequestService';

export interface IPagination {
    pageNo: number;
    lastOffset: number;
    pageOffset: number;
    totalRecords: number;
}

export type APICallBack = (status: boolean, response: any) => void;

export const RowsOption = [25, 50, 100];

const DefaultPagination = (pageOffset: number): IPagination => ({
    pageNo: 1,
    lastOffset: 0,
    pageOffset,
    totalRecords: 0,
});

export {
    AuthenticationService,
    ProfileService,
    UserService,
    AppService,
    LogService,
    DefaultPagination,
    SubscriptionService,
    PointsPackagesService,
    VirtualGiftService,
    AppConfigSerivce,
    CommunityService,
    WithdrawRequestService,
};
