import {
    Avatar,
    Box,
    Chip,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import { ReactElement, useState } from 'react';
import CommentModal from './CommentModal';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import SpotLightVideoModal from './SpotLightVideoModal';
import { SpotLightService } from 'services/SpotLightServices';
import { DefaultPagination, RowsOption } from 'services';
import { Utils } from 'shared/helpers';
import moment from 'moment';
import AppTablePagination from 'shared/components/AppTablePagination';
import { EmptyList } from 'shared/components';
import { useDebouncedEffect } from 'shared/hooks/useDebounce';
import { AppSelect } from 'shared/components/AppComponents';
import CommentIcon from '@mui/icons-material/Comment';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

interface IPost {
    postId: string;
    title: string;
    soundTitle: string;
    thumbnailUrl: string;
    universalLink: string;
    mediaUrl: string;
    m3u8MediaUrl: string;
    mediaType: string;
    visibility: string;
    isDeleted: number;
    dimension: string;
    duration: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    canLike: number;
    numberOfViews: number;
    numberOfLikes: number;
    numberOfShares: number;
    numberOfComments: number;
    userId: string;
    name: string;
    username: string;
    phoneNumber: string;
    userUniversalLink: string;
    email: any;
    profileImage: string;
}
const SpotLightVideoList = (): ReactElement => {
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [showReportVideoModal, setShowReportVideoModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [pagination, setPagination] = useState({
        ...DefaultPagination(25),
    });
    const [loader, setLoader] = useState(true);
    const [spotLightList, setSpotLightList] = useState<IPost[]>([]);
    const [activePostID, setActivePostID] = useState('');
    const [activeSpotLightMedia, setActiveSpotLightMedia] = useState<IPost>();
    const [searchValue, setSearchValue] = useState('');
    const [selectedValue, setSelectedValue] = useState('all');

    const Status = [
        { titleKey: 'Blocked', valueKey: 'blocked' },
        { titleKey: 'Active', valueKey: 'active' },
        { titleKey: 'All', valueKey: 'all' },
    ];

    const handleClick = (event: any): any => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (): any => {
        setAnchorEl(null);
    };

    // API Calls

    const loadSpotLightList = (
        searchValue: string,
        selectedValue: string
    ): void => {
        setLoader(true);
        SpotLightService.spotLight(
            pagination.pageNo,
            pagination.pageOffset,
            searchValue,
            selectedValue
        )
            .then((response: any) => {
                const { results, pagination } = response.data.data;
                if (results) {
                    const validSpotLightList: any = [];
                    results.map((a: any) => {
                        if (a.status !== 'draft') {
                            validSpotLightList.push(a);
                        }
                        return validSpotLightList;
                    });
                    setSpotLightList(validSpotLightList);
                    setPagination(pagination);
                }
                setLoader(false);
            })
            .catch((error: any) => {
                setLoader(false);
                Utils.handleErrorResponse(error);
            });
    };
    // block Post
    const actionOnBlockPost = (id: any): any => {
        SpotLightService.blockPost({
            postId: id,
        })
            .then((response) => Utils.handleSuccessResponse(response))
            .catch((error: any) => {
                Utils.handleErrorResponse(error);
            })
            .finally(() => {
                handleClose();
                loadSpotLightList(searchValue, selectedValue);
            });
    };

    const actionHandleLimitChange = (pageNumber: number): void => {
        pagination.pageOffset = pageNumber;
        pagination.pageNo = 1;
        loadSpotLightList(searchValue, selectedValue);
    };

    const actionHandlePageChange = (newPage: number): void => {
        pagination.pageNo = newPage;
        loadSpotLightList(searchValue, selectedValue);
    };

    const onMemberSearch = (e: any): any => {
        const searchTerm = e.target.value;
        setSearchValue(searchTerm);
    };
    const actionOnClearSearch = (): any => {
        if (searchValue !== '') {
            setSearchValue('');
        }
    };

    // Hooks
    useDebouncedEffect(
        () => {
            loadSpotLightList(searchValue, selectedValue);
        },
        [searchValue, selectedValue],
        1000
    );

    return (
        <Box className="app-card">
            <Box className="card-header">
                <Typography className="title fw-6">SpotLight Videos</Typography>
            </Box>

            <Box className="comment-box px-5 mt-3">
                <TextField
                    className="search-box "
                    variant="outlined"
                    size="small"
                    placeholder="Search"
                    value={searchValue}
                    onChange={(e) => onMemberSearch(e)}
                    InputProps={{
                        startAdornment: <SearchIcon className="mr-2" />,
                        endAdornment: (
                            <IconButton
                                type="button"
                                onClick={actionOnClearSearch}
                            >
                                <ClearIcon
                                    className={searchValue ? 'grey' : 'white'}
                                />
                            </IconButton>
                        ),
                    }}
                />
                <Box className="select-box-style">
                    <AppSelect
                        label="Status "
                        placeholder="Select Status"
                        name="country"
                        items={Status}
                        value={selectedValue}
                        valueKey="valueKey"
                        titleKey="titleKey"
                        outerLabel
                        onChange={(e: any) => {
                            setSelectedValue(e.target.value);
                        }}
                    />
                </Box>
            </Box>

            <Box className=" pt-2 px-3 py-5">
                {/** New  */}

                <Grid container>
                    {spotLightList.map((spotLight: IPost) => (
                        <Grid spacing={5} item lg={6} md={12} sm={12} xs={12}>
                            <Box className="spotlight-container">
                                <Box className="left-panel">
                                    <Box>
                                        <Box className="justify-space-between">
                                            <Chip
                                                color="primary"
                                                label={spotLight.status.toUpperCase()}
                                            />
                                            <Typography className="text-gray">
                                                {moment(
                                                    spotLight.createdAt
                                                ).format('DD MMM YYYY HH:mm A')}
                                            </Typography>
                                        </Box>
                                        <Typography className="my-1">
                                            <b>{spotLight.title}</b>
                                        </Typography>
                                        <Typography>
                                            {spotLight.soundTitle}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex',
                                            }}
                                        >
                                            <Avatar sizes="small">
                                                {Utils.getInitial(
                                                    spotLight.name
                                                )}
                                            </Avatar>

                                            <Typography mx={2}>
                                                {`${spotLight.name}`}
                                                <br />
                                                {`${spotLight.username}`}
                                            </Typography>
                                        </Box>

                                        <Box className="justify-space-between">
                                            <IconButton onClick={handleClick}>
                                                <MoreHorizIcon
                                                    className="footer-icon"
                                                    id="demo-positioned-button"
                                                />
                                            </IconButton>
                                            <Menu
                                                id="demo-positioned-menu"
                                                aria-labelledby="demo-positioned-button"
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={handleClose}
                                                PaperProps={{
                                                    style: {
                                                        boxShadow:
                                                            ' rgba(227, 227, 228, 0.2) 0px 5px 5px',
                                                    },
                                                }}
                                            >
                                                <MenuItem
                                                    onClick={() => {
                                                        actionOnBlockPost(
                                                            spotLight.postId
                                                        );
                                                    }}
                                                >
                                                    {spotLight.status ===
                                                    'active'
                                                        ? 'Block'
                                                        : 'UnBlock'}
                                                </MenuItem>
                                            </Menu>

                                            <Box className="flex">
                                                <Box className="align-center">
                                                    <IconButton
                                                        onClick={() => {
                                                            setActivePostID(
                                                                spotLight.postId
                                                            );
                                                            setShowCommentModal(
                                                                true
                                                            );
                                                        }}
                                                        className="align-center"
                                                    >
                                                        <CommentIcon className="footer-icon" />
                                                    </IconButton>
                                                    <Typography className="footer-text pr-3">
                                                        {
                                                            spotLight.numberOfComments
                                                        }
                                                    </Typography>
                                                </Box>

                                                <Box className="align-center">
                                                    <VisibilityIcon className="footer-icon" />
                                                    <Typography className="footer-text ml-2 mr-3 ">
                                                        {
                                                            spotLight.numberOfViews
                                                        }
                                                    </Typography>
                                                </Box>
                                                <Box className="align-center">
                                                    <ShareIcon className="footer-icon" />
                                                    <Typography className="footer-text ml-2 ">
                                                        {
                                                            spotLight.numberOfShares
                                                        }
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box className="right-panel">
                                    <img src={spotLight.thumbnailUrl} />
                                    <Box className="play-overlay">
                                        <IconButton
                                            onClick={() => {
                                                setActiveSpotLightMedia(
                                                    spotLight
                                                );
                                                setShowReportVideoModal(true);
                                            }}
                                        >
                                            <PlayCircleIcon
                                                className="play-btn"
                                                fontSize="large"
                                            />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {spotLightList.length === 0 && (
                <EmptyList
                    showEmpty={spotLightList.length === 0}
                    showLoader={loader}
                    title="No records found"
                    subTitle=""
                />
            )}
            <AppTablePagination
                totalRecords={pagination.totalRecords}
                onPageChange={actionHandlePageChange}
                onRowsPerPageChange={actionHandleLimitChange}
                rowsPerPageOptions={RowsOption}
                page={pagination.pageNo}
            />

            {showCommentModal && activePostID !== '' && (
                <CommentModal
                    open={showCommentModal}
                    onClose={() => setShowCommentModal(false)}
                    activePostID={activePostID}
                />
            )}
            {showReportVideoModal && activeSpotLightMedia && (
                <SpotLightVideoModal
                    open={showReportVideoModal}
                    onClose={() => setShowReportVideoModal(false)}
                    activeSpotLightMedia={activeSpotLightMedia}
                />
            )}
        </Box>
    );
};

export default SpotLightVideoList;
