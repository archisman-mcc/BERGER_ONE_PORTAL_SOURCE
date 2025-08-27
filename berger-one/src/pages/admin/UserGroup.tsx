import { ModalsProvider } from '@mantine/modals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MRT_ColumnDef, MRT_ColumnFilterFnsState, MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState, MRT_TableOptions, MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { useEffect, useMemo, useState } from 'react';
import { GetUserDetails, GetUserGroupList } from '../../services/api//user-profile-service';
import { GetUserGroup } from '../../services/api//user-group-service';
import React from 'react';

type ApiResponse = {
    data: Array<UserGroup>;
    meta: {
        totalRowCount: number;
    };
};
type UserGroup = {
    srl: number;
    grp_user_group_code: string;
    grp_user_group_desc: string;
    grp_user_group_type: string;
    grp_approv_level: string;
    active: string;
};
export const stringOperators = ['contains', 'startsWith', 'endsWith', 'equals', 'notEqual', 'empty', 'notEmpty']; // operators for string type column

export const numberOperators = ['greaterThan', 'greaterThanOrEqualTo', 'lessThan', 'equals', 'notEqual', 'empty', 'notEmpty', 'between']; // operators for number type column

export const dateOperators = ['between', 'equals', 'notEqual']; // operators for date
const FromMenu = () => {
    //table state
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            // {
            //     accessorKey: 'Srl',
            //     header: 'Srl',
            //     enableEditing: false,
            //     enableColumnFilter: false,
            // },
            {
                accessorKey: 'grp_user_group_code',
                header: 'Group Code',
                columnFilterModeOptions: [...stringOperators],
            },
            {
                accessorKey: 'grp_user_group_desc',
                header: 'Group Desc',
                columnFilterModeOptions: [...stringOperators],
            },
            {
                accessorKey: 'grp_approv_level',
                header: 'Group Level',
                columnFilterModeOptions: [...numberOperators],
            },
            {
                accessorKey: 'grp_user_group_type',
                header: 'Group Type',
                columnFilterModeOptions: [...stringOperators],
            },
            {
                accessorKey: 'active',
                header: 'Active',
                columnFilterModeOptions: [...stringOperators],
                Cell: ({ cell }) => {
                    return (
                        <span className={cell.row.original.active && cell.row.original.active == 'Y' ? 'badge rounded-full bg-success' : 'badge rounded-full bg-danger'}>
                            {cell.row.original.active && cell.row.original.active == 'Y' ? 'Yes' : 'No'}
                        </span>
                    );
                },
            },
        ],
        []
    );

    const [columnFilterFns, setColumnFilterFns] = //filter modes
        useState<MRT_ColumnFilterFnsState>(Object.fromEntries(columns.map(({ accessorKey }) => [accessorKey, 'contains']))); //default to "contains" for all columns

    const getFromUserGroupList = async () => {
        const newFilterArr: { id: string; value: any; operator: string; dataType: any }[] = [];
        Object.keys(columnFilterFns).forEach((key) => {
            // making group with filter values and operator type
            if (columnFilters && columnFilters.length > 0) {
                columnFilters.forEach((filter) => {
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
        });

        const searchParam_Set = {
            start: `${pagination.pageIndex * pagination.pageSize}`,
            size: `${pagination.pageSize}`,
            filters: newFilterArr ?? [],
            globalFilter: globalFilter ?? '',
            sorting: sorting ?? [],
        };

        try {
            const response = await GetUserGroup(searchParam_Set);
            // Add serial numbers to the data
            if (response.data != null && response.data != undefined) {
                const newData = response.data.map((item: any, index: number) => ({
                    ...item,
                    Srl: pagination.pageIndex * pagination.pageSize + index + 1,
                }));
                setData(newData);
                setRowCount(response.meta.totalRowCount);
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
        if (!data.length) {
            setIsLoading(true);
        } else {
            setIsRefetching(true);
        }
        getFromUserGroupList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        columnFilterFns,
        columnFilters, //refetch when column filters change
        globalFilter, //refetch when global filter changes
        pagination.pageIndex, //refetch when page index changes
        pagination.pageSize, //refetch when page size changes
        sorting, //refetch when sorting changes
    ]);

    // enter new code
    const [data, setData] = useState<any[]>([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);

    const table = useMantineReactTable({
        columns,
        data,
        enableColumnActions: false,
        enableColumnFilters: true,
        enablePagination: true,
        enableSorting: true,
        enableStickyHeader: false,
        enableColumnFilterModes: true,
        enableFacetedValues: true,
        manualFiltering: false,
        manualPagination: true,
        manualSorting: true,
        enableGrouping: false,
        enablePinning: false,
        enableFullScreenToggle: false,
        enableColumnOrdering: true,
        enableHiding: false,
        createDisplayMode: 'row', // ('modal', and 'custom' are also available)
        editDisplayMode: 'row', // ('modal', 'cell', 'table', and 'custom' are also available)
        enableEditing: false,
        initialState: { showColumnFilters: false, showGlobalFilter: true },
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        enableDensityToggle: false,
        mantinePaginationProps: {
            radius: 'xl',
            size: 'lg',
        },
        rowCount,
        mantineSearchTextInputProps: {
            placeholder: 'Search Here...',
        },
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
            showAlertBanner: isError,
            // showProgressBars: isRefetching,
            columnFilters,
            globalFilter,
            isLoading,
            pagination,
            sorting,
            columnFilterFns,
        },
    });

    return <MantineReactTable table={table} />;
};
const queryClient = new QueryClient();
const UserGroup = () => (
    //Put this with your other react-query providers near root of your app
    <QueryClientProvider client={queryClient}>
        <ModalsProvider>
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-2">
                <h5 className="text-lg font-semibold dark:text-white-light">User Group</h5>
            </div>
            <FromMenu />
        </ModalsProvider>
    </QueryClientProvider>
);
export default React.memo(UserGroup);
