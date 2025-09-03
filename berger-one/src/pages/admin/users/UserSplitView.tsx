// import Dropdown from '../../../components/Dropdown';
// import IconHorizontalDots from '../../../components/Icon/IconHorizontalDots';
// import IconSearch from '../../../components/Icon/IconSearch';
// import { IRootState } from '../../../store';
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import PerfectScrollbar from 'react-perfect-scrollbar';
// import IconCaretDown from '../../../components/Icon/IconCaretDown';
// import IconPlus from '../../../components/Icon/IconPlus';
// import IconPrinter from '../../../components/Icon/IconPrinter';
// import IconArrowBackward from '../../../components/Icon/IconArrowBackward';
// import IconRefresh from '../../../components/Icon/IconRefresh';
// import IconMessage from '../../../components/Icon/IconMessage';
// import IconMenu from '../../../components/Icon/IconMenu';
// // import Childaccountinfo from '../childaccountinfo';
// import { MRT_PaginationState } from 'mantine-react-table';
// import { UseAuthStore } from '../../../services/store/AuthStore';
// import UserProfile from '../user-profile/UserProfile';
// import { UserProfileStore } from '../../../services/store/UserProfileStore';
// // import { GetUserList } from '../../../services/api/user-details-servise';
// //import { GetUserList } from 'src/services/api/users/UserListView';
// import { commonErrorToast } from '../../../services/functions/commonToast';
// import NoDataFound from '../../../pages/components/NoDataFound';
// import IconLoader from '../../../components/Icon/IconLoader';
// import { GetUserList } from '@/src/services/api/users/userListView';

type UserApiResponse = {
    data: Array<User>;
    meta: {
        totalRowCount: number;
    };
};

const contactList = [
    {
        userId: 1,
        name: 'Burlington Textiles Corp of America',
        time: 'MMond',
        preview: '(336) 222-7000',
        active: true,
    },
    {
        userId: 2,
        name: 'Express Logistics and Transport',
        time: 'MMond',
        preview: '(503) 421-7800',
        active: false,
    },
    {
        userId: 3,
        name: 'Dickenson plc',
        time: 'MMond',
        preview: '(785) 241-6200',
        active: true,
    },
];

const listView = [
    { id: 1, option: 'All Accounts' },
    { id: 2, option: 'My Accounts' },
    { id: 3, option: 'New Last Week' },
    { id: 4, option: 'New This Week' },
];

type User = {
    // set custom column headings
    usp_user_id: string;
    usp_name: string;
    usp_group_desc: string;
    usp_group_code: string;
    usp_mobile: string;
    usp_mailid: string;
    active: string;
};
const UserSplitView = () => {
    const { setUserProfile } = UserProfileStore((state) => state);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const [isShowChatMenu, setIsShowChatMenu] = useState(false);
    const [searchUser, setSearchUser] = useState('');
    const [IsShowUser, setIsShowUser] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [textMessage, setTextMessage] = useState('');
    const [filteredItems, setFilteredItems] = useState<User[] | any>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [data, setData] = useState<User[]>([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const FetchUserList = async () => {
        setLoading(true);
        const searchParam_Set: any = {
            start: `${pagination.pageIndex}`,
            size: `${pagination.pageSize}`,
            filters: [],
            globalFilter: globalFilter,
            sorting: [],
            view_type: 'SplitView', //ListView, Kanban, SplitView
            group_by: '',
            view_by: '',
        };

        try {
            const response: any = await GetUserList(searchParam_Set);
            if (response && response.Data && response.Data.length > 0 && response.Meta.totalRowCount) {
                let newUserList = filteredItems.concat(response.Data);
                setFilteredItems(newUserList);
                setRowCount(response.Meta.totalRowCount);
                selectUser(newUserList[0]);
            } else {
                setFilteredItems(null);
                selectUser(null);
                setUserProfile(null);
                // commonErrorToast('No data found');
            }
        } catch (error) {
            setIsError(true);
            return;
        }
        setIsError(false);
        setIsLoading(false);
        setIsRefetching(false);
        setLoading(false);
    };
    useEffect(() => {
        if (!data.length) {
            setIsLoading(true);
        } else {
            setIsRefetching(true);
        }
        FetchUserList();
    }, [globalFilter, pagination.pageSize]);

    useEffect(() => {
        setUserProfile(null);
    }, []);

    const handleSearchUser = () => {
        setGlobalFilter(searchUser);
    };

    const handleLoadMore = () => {
        const pageSizes = {
            pageIndex: pagination.pageSize + 1,
            pageSize: pagination.pageSize + 10,
        };
        setPagination(pageSizes);
    };

    const scrollToTop = () => {
        if (IsShowUser) {
            setTimeout(() => {
                const element: any = document.querySelector('.user-box');
                element.behavior = 'smooth';
                element.scrollTop = 0;
            });
        }
    };
    const selectUser = (user: any) => {
        setSelectedUser(user);
        setIsShowUser(true);
        scrollToTop();
        setIsShowChatMenu(false);
        setUserProfile(user);
    };

    return (
        <div>
            {' '}
            <div className={`relative flex h-full gap-5 sm:h-[calc(100vh_-_150px)] sm:min-h-0 ${isShowChatMenu ? 'min-h-[999px]' : ''}`}>
                <div className={`panel absolute z-10 hidden w-full max-w-xs flex-none space-y-4 overflow-hidden p-4 xl:relative xl:block xl:h-full ${isShowChatMenu ? '!block' : ''}`}>
                    <div className="relative">
                        <input type="text" className="peer form-input ltr:pr-9 rtl:pl-9" placeholder="Searching..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} />
                        <div className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-2 rtl:left-2" onClick={handleSearchUser}>
                            <IconSearch />
                        </div>
                    </div>
                    <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>

                    <div className="!mt-0">
                        <PerfectScrollbar className="chat-users relative h-full min-h-[100px] space-y-0.5 ltr:-mr-3.5 ltr:pr-3.5 rtl:-ml-3.5 rtl:pl-3.5 sm:h-[calc(100vh_-_357px)]">
                            {loading && (
                                <p className="flex items-center justify-center pt-2">
                                    <IconLoader className="shrink-0 animate-[spin_2s_linear_infinite]" />
                                </p>
                            )}
                            {!loading &&
                                filteredItems &&
                                filteredItems.length > 0 &&
                                filteredItems.map((person: any) => {
                                    return (
                                        <div key={person.usp_user_id}>
                                            <button
                                                type="button"
                                                className={`flex w-full items-center justify-between rounded-md p-2 hover:bg-gray-100 hover:text-primary dark:hover:bg-[#050b14] dark:hover:text-primary ${selectedUser && selectedUser.usp_user_id === person.usp_user_id ? 'bg-gray-100 text-primary dark:bg-[#050b14] dark:text-primary' : ''
                                                    }`}
                                                onClick={() => selectUser(person)}
                                            >
                                                <div className="flex-1">
                                                    <div className="flex items-center">
                                                        <div className="mx-3 ltr:text-left rtl:text-right">
                                                            <p className="mb-1 font-semibold">
                                                                {person.usp_name}-{person.usp_user_id}
                                                            </p>
                                                            <p className="max-w-[185px] truncate text-xs text-white-dark">{person.usp_mobile}</p>
                                                            <p className="max-w-[185px] truncate text-xs text-white-dark">{person.usp_mailid}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="whitespace-nowrap text-xs font-semibold">
                                                    <div className="flex w-1/2 items-center justify-center">
                                                        <span className="badge rounded-full bg-primary">{person.usp_group_desc}</span>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    );
                                })}
                            {!loading && !filteredItems && <p className="pt-4 text-center">No data found</p>}
                        </PerfectScrollbar>
                        {filteredItems && filteredItems.length > 0 && filteredItems.length < rowCount && (
                            <div className="pt-3">
                                <button type="button" className="btn btn-primary mx-auto" onClick={handleLoadMore}>
                                    <IconPlus className="mr-1 h-5 w-5" />
                                    Load More
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className={`absolute z-[5] hidden h-full w-full rounded-md bg-black/60 ${isShowChatMenu ? '!block xl:!hidden' : ''}`} onClick={() => setIsShowChatMenu(!isShowChatMenu)}></div>
                <div className="panel flex-1 p-0">
                    {!IsShowUser && (
                        <div className="relative flex h-full items-center justify-center">
                            <NoDataFound />
                        </div>
                    )}
                    {IsShowUser && (
                        <PerfectScrollbar className="user-box relative h-full sm:h-[calc(100vh_-_150px)]">
                            <UserProfile />
                        </PerfectScrollbar>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserSplitView;
