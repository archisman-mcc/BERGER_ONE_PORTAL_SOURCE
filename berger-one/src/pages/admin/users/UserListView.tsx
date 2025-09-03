/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from 'react';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef, MRT_ColumnFiltersState, MRT_SortingState, MRT_PaginationState, MRT_ColumnFilterFnsState } from 'mantine-react-table';
import { Button, Menu } from '@mantine/core';
import { IconUserCircle } from '@tabler/icons-react';
import GridView from 'src/components/Layouts/GridView';
import UserScrumBoard from 'src/pages/admin/users/UserScrumBoard';
import UserSplitView from './UserSplitView';
import IconPlus from 'src/components/Icon/IconPlus';
export const usStateList = ['West Bengal', 'Odisha', 'Sikkim'];
import { UseAuthStore } from 'src/services/store/AuthStore';
import { UserProfileStore } from 'src/services/store/UserProfileStore';
import { useRouter } from 'next/navigation';

// import { GetUserList } from 'src/services/api/users/userListView';
import React from 'react';
import { GetUserGroupList } from 'src/services/api/user-profile-service';
import { parse } from 'path';
import { GetProdDevRouteBuilder } from '@/src/services/functions/getProdDevUrlBuilder';
import { GetUserList } from '@/src/services/api/users/userListView';
//import { GetUserList } from 'src/services/api/users/UserListView';
//import { GetUserList } from 'src/services/api/users/UserListView';

// type UserApiResponse = {
//     data: Array<User>;
//     meta: {
//         totalRowCount: number;
//     };
// };

type User = {
    // set custom column headings
    usp_user_id: string;
    usp_name: string;
    usp_desig: string;
    oam_app_names: string;
    usp_mobile: string;
    usp_mailid: string;
    active: string;
};

type GridViewIntr = {
    gridViewType: '';
    columnGroupBy: '';
};

const groupListView = [
    { label: 'CALL CENTER', value: 'CC' },
    { label: 'Admin', value: 'admin' },
];

export const stringOperators = ['contains', 'startsWith', 'endsWith', 'equals', 'notEqual', 'empty', 'notEmpty']; // operators for string type column

export const numberOperators = ['greaterThan', 'greaterThanOrEqualTo', 'lessThan', 'equals', 'notEqual', 'empty', 'notEmpty', 'between']; // operators for number type column

export const dateOperators = ['between', 'equals', 'notEqual']; // operators for date
const ActiveState: string[] = ['Yes', 'No'];

const UserListView = () => {
    const authToken = UseAuthStore((state: { authToken: any }) => state.authToken);
    const { setUserProfile } = UserProfileStore((state) => state);
    const [allUserGroup, setAllUserGroup] = useState([]);
    const [selectedGridViewType, setSelectedgridViewType] = useState({
        gridViewType: 'ListView',
        columnGroupBy: '',
    });

    const handleOnSelect = (gridViewOption: GridViewIntr) => {
        setSelectedgridViewType(gridViewOption);
    };

    const columns = useMemo<MRT_ColumnDef<User>[]>(
        () => [
            {
                accessorKey: 'usp_user_id',
                header: 'User Id',
                columnFilterModeOptions: [...stringOperators],
                // filterVariant: 'multi-select',
            },
            {
                accessorKey: 'usp_name',
                header: 'User Name',
                columnFilterModeOptions: [...stringOperators],
            },
            {
                accessorKey: 'usp_desig',
                header: 'User Desig',
                filterVariant: 'multi-select',
            },
            {
                accessorKey: 'usp_mailid',
                header: 'Mail Id.',
                columnFilterModeOptions: [...stringOperators],
            },
            {
                accessorKey: 'usp_mobile',
                header: 'Mobile No.',
                columnFilterModeOptions: [...numberOperators],
            },
            {
                accessorKey: 'active',
                header: 'Active',
                enableColumnFilter: false,
                editVariant: 'select',
                mantineEditSelectProps: {
                    data: ActiveState,
                },
                Cell: ({ cell, column, renderedCellValue, row, table }) => {
                    return (
                        <span className={cell.row.original.active && cell.row.original.active == 'Yes' ? 'badge rounded-full bg-success' : 'badge rounded-full bg-danger'}>
                            {cell.row.original.active}
                        </span>
                    );
                },
            },
        ],
        []
    );

    const [data, setData] = useState<User[]>([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);

    //table state
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const [columnFilterFns, setColumnFilterFns] = //filter modes
        useState<MRT_ColumnFilterFnsState>(Object.fromEntries(columns.map(({ accessorKey }) => [accessorKey, 'contains']))); //default to "contains" for all columns

    const fetchData = async () => {
        // const userGroupResponce = await GetUserGroupList({ userId: '' });
        // if (userGroupResponce && userGroupResponce[2] && userGroupResponce[2].data) {
        //     setAllUserGroup(userGroupResponce);
        // }
        const newFilterArr: { id: string; value: any; operator: string; dataType: any }[] = [];
        //added new code for custome dropdown
        const dropdownOptions = {};

        Object.keys(columnFilterFns).forEach((key) => {
            // making group with filter values and operator type
            if (columnFilters && columnFilters.length > 0) {
                columnFilters.filter((filter) => {
                    if (filter.id.toLowerCase() === key.toLowerCase()) {
                        let valArr: any[] = [];
                        valArr.push(filter.value);
                        newFilterArr.push({
                            id: filter.id,
                            value: typeof filter.value === 'string' ? valArr : filter.value,
                            operator: columnFilterFns[key],
                            dataType: typeof filter.id,
                        });
                    }
                });
            }
            dropdownOptions == newFilterArr;
        });

        const searchParam_Set: any = {
            // start: `${pagination.pageIndex * pagination.pageSize}`,
            start: parseInt(`${pagination.pageIndex * pagination.pageSize}`),
            size: `${pagination.pageSize}`,
            filters: newFilterArr ?? [],
            globalFilter: globalFilter ?? '',
            sorting: sorting ?? [],
            viewType: selectedGridViewType.gridViewType, //ListView, Kanban, SplitView
            groupBy: '',
            viewBy: '',
        };

        try {
            const response: any = await GetUserList(searchParam_Set);
            if (response && response.Data && response.Data.length > 0 && response.Meta.totalRowCount) {
                response.Data.map((item: any) => {
                    item.active = item.active == 'Y' ? 'Yes' : 'No';
                });
                setData(response.Data);
                setRowCount(response.Meta.totalRowCount);
            } else {
                setData([]);
                // commonErrorToast('No data found');
            }

            if (response != null) {
            }
        } catch (error) {
            setIsError(true);
            return;
        }
        setIsError(false);
        setIsLoading(false);
        setIsRefetching(false);
    };
    useEffect(() => {
        if (!data.length) setIsLoading(true);
        else setIsRefetching(true);
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        columnFilterFns,
        columnFilters, //refetch when column filters change
        globalFilter, //refetch when global filter changes
        pagination.pageIndex, //refetch when page index changes
        pagination.pageSize, //refetch when page size changes
        sorting, //refetch when sorting changes
    ]);

    const table = useMantineReactTable({
        columns,
        data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableStickyHeader: true,
        enableColumnFilterModes: true,
        enableColumnOrdering: true,
        enableFacetedValues: true,
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        enableGrouping: false,
        enablePinning: false,
        enableRowActions: true,
        enableFullScreenToggle: false,
        enableColumnActions: false,
        enableHiding: false,
        positionActionsColumn: 'last',
        // enableRowSelection: true,
        initialState: { showColumnFilters: false, showGlobalFilter: true },
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        enableDensityToggle: false,
        mantinePaginationProps: {
            radius: 'xl',
            size: 'lg',
        },
        rowCount,
        onColumnFilterFnsChange: setColumnFilterFns,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        mantineTableContainerProps: {
            sx: {
                minHeight: '65vh',
            },
        },
        state: {
            columnFilters,
            globalFilter,
            isLoading,
            pagination,
            showAlertBanner: isError,
            // showProgressBars: isRefetching,
            sorting,
            columnFilterFns,
        },
        mantineSearchTextInputProps: {
            placeholder: 'Search Here...',
        },
        renderRowActionMenuItems: (row: any) => (
            <>
                <Menu.Item icon={<IconUserCircle />} onClick={() => selectUser(row.row.original)}>
                    View Profile
                </Menu.Item>
            </>
        ),
    });

    const router = useRouter();
    const selectUser = (user: any) => {
        setUserProfile(user);
        setTimeout(() => {
            router.push('/admin/user-profile/UserProfile');
        }, 500);
    };

    const AddNewUser = () => {
        setUserProfile(null);
        router.push('/admin/user-profile/UserProfile');
    };
    const ScrumBoardGroupBy = {
        page: 'UserList',
        groupBy: groupListView,
    };
    return (
        <>
            <div className="page-titlebar mt-1 flex items-center justify-between bg-white px-4 py-2 lg:flex xl:flex ">
                <div className="flex items-center">
                    <h5 className="text-lg font-semibold dark:text-white-light">User Profile List</h5>
                </div>
                <div className="relative ml-auto inline-flex">
                    <GridView onSelect={handleOnSelect} ScrumBoardGroupBy={ScrumBoardGroupBy} />
                    <button type="button" className="btn btn-secondary flex" onClick={() => AddNewUser()}>
                        <IconPlus className="mr-1 h-5 w-5" />
                        Add Users
                    </button>
                </div>
            </div>

            {selectedGridViewType.gridViewType == 'ListView' && <MantineReactTable table={table} />}
            {selectedGridViewType.gridViewType == 'Kanban' && <UserScrumBoard gridViewType={selectedGridViewType} />}
            {selectedGridViewType.gridViewType == 'SplitView' && <UserSplitView />}
        </>
    );
};

export default React.memo(UserListView);
