// import { useDispatch, useSelector } from 'react-redux';
// import { ReactSortable } from 'react-sortablejs';
// import { useState, Fragment, useEffect } from 'react';
// import { setPageTitle } from '../../../store/themeConfigSlice';
// import IconPlus from '../../../components/Icon/IconPlus';
// import IconEdit from '../../../components/Icon/IconEdit';
// import React from 'react';
// import IconMail from '../../../components/Icon/IconMail';

import { useDispatch } from "react-redux";
import { UserProfileStore } from "../../../services/store/UserProfileStore";
import { useEffect, useState } from "react";
import type { MRT_PaginationState } from "mantine-react-table";
import { GetUserList } from "../../../services/api/users/userListView";
import { setPageTitle } from "../../../store/themeConfigSlice";
import { useNavigate } from "react-router-dom";
import ApiLoader from "../../components/ApiLoader";

// import { UseAuthStore } from '../../../services/store/AuthStore';
// import GridView from '../../../components/Layouts/GridView';
// import UserList from './userListView';
// import UserSplitView from './UserSplitView';
// import { useRouter } from 'next/navigation';
// import { UserProfileStore } from '../../../services/store/UserProfileStore';
// // import { GetUserList } from 'src/services/api/user-details-servise';
// //import { GetUserList } from 'src/services/api/users/UserListView';
// import { MRT_PaginationState } from 'mantine-react-table';
// import { commonErrorToast } from '../../../services/functions/commonToast';
// import ApiLoader from '../../../pages/components/ApiLoader';
// import { GetProdDevImgRouteBuilder, GetProdDevRouteBuilder } from '../../../services/functions/getProdDevUrlBuilder';
// import { IconDeviceMobile } from '@tabler/icons-react';
// import { GetUserList } from '@/src/services/api/users/userListView';

type UserApiResponse = {
    data: Array<User>;
    grouped_data: Array<User>;
};

type PaginationState = {
    pageIndex: 0;
    pageSize: 10;
};

type User = {
    usp_user_id: string;
    usp_name: string;
    usp_group_desc: string;
    usp_group_code: string;
    usp_mobile: string;
    usp_mailid: string;
    active: string;
};

type GridViewIntr = {
    gridViewType: '';
    columnGroupBy: '';
};

const UserScrumBoard = ({ gridViewType }: any) => {
    const { setUserProfile } = UserProfileStore((state) => state);
    const dispatch = useDispatch();
    const [UserList, setUserList] = useState<User[]>([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [viewBy, setViewBy] = useState('DEPOT');
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [selectedGridViewType, setSelectedgridViewType] = useState({
        gridViewType: 'ListView',
        columnGroupBy: '',
    });

    const handleOnSelect = (gridViewOption: GridViewIntr) => {
        setSelectedgridViewType(gridViewOption);
    };

    const handleLoadMore = (ViewBy: any) => {
        setViewBy(ViewBy);
        const pageSizes = {
            pageIndex: pagination.pageSize + 1,
            pageSize: pagination.pageSize + 10,
        };
        setPagination(pageSizes);
        setIsLoadMore(true);
    };

    const fetchData = async () => {
        if (isLoadMore == false) setIsLoading(true);
        const searchParam_Set: any = {
            start: `${pagination.pageIndex}`,
            size: `${pagination.pageSize}`,
            filters: [],
            globalFilter: '',
            sorting: [],
            view_type: gridViewType.gridViewType, //ListView, Kanban, SplitView
            group_by: gridViewType.columnGroupBy,
            // view_by: 'DEPOT',
            view_by: viewBy,
        };

        try {
            const response: any = await GetUserList(searchParam_Set);
            if (response && response.grouped_data && response.grouped_data.length > 0) setUserList(response.grouped_data);
            else {
                // commonErrorToast('No data found');
            }
        } catch (error) {
            setIsError(true);
            return;
        }
        setIsError(false);
        setIsLoading(false);
        setIsRefetching(false);
        setIsLoadMore(false);
    };

    useEffect(() => {
        if (UserList && UserList.length == 0) {
            setIsLoading(true);
        } else {
            setIsRefetching(true);
        }
        dispatch(setPageTitle('Scrumboard'));
        fetchData();
    }, [pagination.pageSize]);

    const navigate = useNavigate();
    const selectUser = (user: any) => {
        setUserProfile(user);
        setTimeout(() => {
            navigate('/admin/user-profile/UserProfile');
            // router.push(GetProdDevRouteBuilder('/admin/user-profile/UserProfile'));
        }, 500);
    };

    return (
        <>
            {isLoading && (
                <div className="mt-40">
                    <ApiLoader />
                </div>
            )}
            {!isLoading && (
                <div className="relative pt-5">
                    {/* Users List */}
                    <div className="h-full">
                        <div className="flex flex-nowrap items-start gap-5 overflow-x-auto px-2 pb-2">
                            {UserList &&
                                UserList.length > 0 &&
                                UserList.map((user: any) => {
                                    return (
                                        <div key={user.key.text} className="panel w-80 flex-none p-0" data-group={user.key.value} style={{ padding: '0' }}>
                                            <div className="panel-header text-center">
                                                <h4 className="kanban-header text-center text-base font-semibold">{user.key.text}</h4>
                                            </div>
                                            <ReactSortable
                                                list={user.value}
                                                setList={(newState, sortable) => {
                                                    if (sortable) {
                                                        const groupId: any = sortable.el.closest('[data-group]')?.getAttribute('data-group') || 0;
                                                        const newList = UserList.map((task: any) => {
                                                            if (parseInt(task.value) === parseInt(groupId)) {
                                                                task.value = newState;
                                                            }

                                                            return task;
                                                        });
                                                        setUserList(newList);
                                                    }
                                                }}
                                                animation={200}
                                                group={{ name: 'shared', pull: false, put: false }}
                                                ghostClass="sortable-ghost"
                                                dragClass="sortable-drag"
                                                className="connect-sorting-content panel-body h-[80vh] overflow-y-auto px-3"
                                            >
                                                {user.value.map((task: any) => {
                                                    return (
                                                        <div className="sortable-list " key={user.value + '' + task.usp_user_id}>
                                                            <div className="mb-5 cursor-move space-y-3  rounded-md bg-[#f4f4f4] p-3 pb-5 shadow dark:bg-white-dark/20">
                                                                <div className="flex text-sm font-bold">
                                                                    <img
                                                                        src={GetProdDevImgRouteBuilder('/assets/images/profile-35.png')}
                                                                        className="h-8 w-8 rounded-full object-cover ltr:mr-2 rtl:ml-2"
                                                                        alt="avatar"
                                                                    />{' '}
                                                                    {task.usp_name} - ({task.usp_user_id})
                                                                    <button type="submit" className="btn btn-primary ml-auto rounded px-1 py-1" onClick={() => selectUser(task)}>
                                                                        <IconEdit />
                                                                    </button>
                                                                </div>
                                                                {task.usp_mobile != '' && (
                                                                    <div className="items-left flex text-xs font-medium hover:text-primary">
                                                                        <IconDeviceMobile className="shrink-0 ltr:mr-1 rtl:ml-3" />
                                                                        <span className="text-xs">{task.usp_mobile}</span>
                                                                    </div>
                                                                )}
                                                                {task.usp_mailid != '' && (
                                                                    <div className="items-left flex text-xs font-medium hover:text-primary">
                                                                        <IconMail className="shrink-0 ltr:mr-1 rtl:ml-3" />
                                                                        <span>{task.usp_mailid}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </ReactSortable>
                                            <div className="m-3">
                                                <button type="button" className="btn btn-primary mx-auto" onClick={() => handleLoadMore(user.key.text)}>
                                                    <IconPlus />
                                                    Load More
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default React.memo(UserScrumBoard);
