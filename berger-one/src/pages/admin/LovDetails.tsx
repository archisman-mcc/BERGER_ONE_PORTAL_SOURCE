import {
    MRT_ColumnDef,
    MRT_ColumnFilterFnsState,
    MRT_ColumnFiltersState,
    MRT_PaginationState,
    MRT_Row,
    MRT_SortingState,
    MRT_TableOptions,
    MantineReactTable,
    useMantineReactTable,
} from 'mantine-react-table';
import React, { useEffect, useMemo, useState } from 'react';

import { ActionIcon, Button, Flex, Tooltip } from '@mantine/core';
import { IconEdit, IconPlus } from '@tabler/icons-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalsProvider } from '@mantine/modals';
import { commonAlert } from '../../services/functions/commonAlert';
import { commonErrorToast, commonSuccessToast } from '../../services/functions/commonToast';
import { GetLovDetailsList, LovDetailsInsert } from '../../services/api/lov-details-service';
declare global {
    interface Window {
        Swal: any;
    }
}
type UserApiResponse = {
    data: Array<lovDetails>;
    meta: {
        totalRowCount: number;
    };
};

type lovDetails = {
    id: string;
    lov_type: string;
    lov_code: string;
    lov_value: string;
    lov_desc: string;
    lov_shrt_desc: string;
    created_user?: string;
    Sequence?: Number;
    active: string;
    lov_seq?: Number;
};

type GridViewIntr = {
    gridViewType: '';
    columnGroupBy: '';
};
export const stringOperators = ['contains', 'startsWith', 'endsWith', 'equals', 'notEqual', 'empty', 'notEmpty']; // operators for string type column

export const numberOperators = ['greaterThan', 'greaterThanOrEqualTo', 'lessThan', 'equals', 'notEqual', 'empty', 'notEmpty', 'between']; // operators for number type column

export const dateOperators = ['between', 'equals', 'notEqual']; // operators for date
const ActiveState: string[] = ['Yes', 'No'];
const FromMenu = () => {
    //table state
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

    const columns = useMemo<MRT_ColumnDef<lovDetails>[]>(
        () => [
            // {
            //     accessorKey: 'Srl',
            //     header: 'Srl',
            //     enableEditing: false,
            // },
            {
                accessorKey: 'lov_type',
                header: 'Lov Type',
                columnFilterModeOptions: [...stringOperators],
                // filterVariant: 'multi-select',
                mantineEditTextInputProps: {
                    type: 'text',
                    required: true,
                    error: validationErrors?.lov_type,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            lov_type: undefined,
                        }),
                },
            },
            {
                accessorKey: 'lov_code',
                header: 'Lov Code',
                columnFilterModeOptions: [...stringOperators],
                mantineEditTextInputProps: {
                    type: 'text',
                    required: true,
                    error: validationErrors?.lov_code,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            lov_code: undefined,
                        }),
                },
            },
            {
                accessorKey: 'lov_value',
                header: 'Lov Value',
                columnFilterModeOptions: [...stringOperators],
                mantineEditTextInputProps: {
                    type: 'text',
                    required: true,
                    error: validationErrors?.lov_value,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            lov_value: undefined,
                        }),
                },
            },
            {
                accessorKey: 'lov_desc',
                header: 'Lov Desc',
                columnFilterModeOptions: [...stringOperators],
                mantineEditTextInputProps: {
                    type: 'text',
                    required: true,
                    error: validationErrors?.lov_desc,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            lov_desc: undefined,
                        }),
                },
            },
            {
                accessorKey: 'lov_seq',
                header: 'Sequence',
                columnFilterModeOptions: [...numberOperators],
                mantineEditTextInputProps: {
                    type: 'number',
                    required: true,
                    error: validationErrors?.lov_seq,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            lov_seq: undefined,
                        }),
                },
            },
            {
                accessorFn: (originalRow: any) => {
                    return originalRow.active && originalRow.active == 'Y' ? 'Yes' : 'No';
                },
                header: 'Active',
                editVariant: 'select',
                mantineEditSelectProps: {
                    data: ActiveState,
                    error: validationErrors?.active,
                },
                Cell: ({ cell, column, renderedCellValue, row, table }) => {
                    return (
                        <span className={cell.row.original.active && cell.row.original.active == 'Y' ? 'badge rounded-full bg-success' : 'badge rounded-full bg-danger'}>
                            {cell.row.original.active && cell.row.original.active == 'Y' ? 'Yes' : 'No'}
                        </span>
                    );
                },
            },
        ],
        [validationErrors]
    );

    const [columnFilterFns, setColumnFilterFns] = //filter modes
        useState<MRT_ColumnFilterFnsState>(Object.fromEntries(columns.map(({ accessorKey }) => [accessorKey, 'contains']))); //default to "contains" for all columns
    //CREATE action
    const handleCreateLovDetails: MRT_TableOptions<lovDetails>['onCreatingRowSave'] = async ({ values, exitCreatingMode }) => {
        const newValidationErrors = validateLovDetails(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        const insertUpdateFlag = 'Add';
        // Show SweetAlert confirmation modal
        await showAlert(values, insertUpdateFlag, exitCreatingMode);
    };
    //UPDATE action
    const handleEditLovDetails: MRT_TableOptions<lovDetails>['onEditingRowSave'] = async ({ values, table }) => {
        const newValidationErrors = validateLovDetails(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        const insertUpdateFlag = 'Update';
        // Show SweetAlert confirmation modal
        await showAlert(values, insertUpdateFlag, '');
    };
    async function showAlert(values: any, insertUpdateFlag: string, exitCreatingMode: any) {
        if (insertUpdateFlag == 'Update') {
            commonAlert('Are You Sure?', 'If you click confirm the record will be submitted. To cancel please press cancel button.', 'warning').then(async (result: any) => {
                if (result.value) {
                    setValidationErrors({});
                    values.insert_update_flag = 'U';
                    await addLovDtls(values);
                    table.setEditingRow(null); //exit editing mode
                }
            });
        } else {
            commonAlert('Are You Sure?', 'If you click confirm the record will be submitted. To cancel please press cancel button.', 'warning').then(async (result: any) => {
                if (result.value) {
                    setValidationErrors({});
                    values.insert_update_flag = 'I';
                    await addLovDtls(values);
                    exitCreatingMode();
                }
            });
        }
    }
    const getFromLovDtlsList = async () => {
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
            const response = await GetLovDetailsList(searchParam_Set);
            // // Add serial numbers to the data
            // const newData = response.data.map((item: any, index: number) => ({
            //     ...item,
            //     Srl: pagination.pageIndex * pagination.pageSize + index + 1,
            // }));
            if (response.data != null && response.data != undefined) {
                setData(response.data);
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
    const addLovDtls = async (values: any) => {
        let stateDetails: any = JSON.parse(localStorage.getItem('auth') || '');
        let userDetail: any = stateDetails.state.userDetails;
        const formParam_Set = {
            lov_type: values.lov_type,
            lov_code: values.lov_code,
            lov_value: values.lov_value,
            lov_shrt_desc: values.lov_desc,
            lov_value_seq: values.lov_seq,
            created_user: userDetail.user_id,
            active: values.Active == 'Yes' ? 'Y' : 'N',
            insert_update_flag: values.insert_update_flag,
        };

        try {
            const response = await LovDetailsInsert(formParam_Set);
            if (response.response_message) {
                commonSuccessToast(response.response_message);
                getFromLovDtlsList();
            } else {
                commonErrorToast(response.errorMessage);
            }
        } catch (error) {
            commonErrorToast('Error');
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
        getFromLovDtlsList();
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
    const [data, setData] = useState<lovDetails[]>([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);

    const table = useMantineReactTable({
        columns,
        data,
        enableStickyHeader: false,
        enableColumnFilterModes: true,
        enableFacetedValues: true,
        manualFiltering: false,
        manualPagination: true,
        manualSorting: true,
        enableGrouping: false,
        enablePinning: false,
        enableRowActions: true,
        enableFullScreenToggle: false,
        enableColumnActions: false,
        enableColumnOrdering: true,
        enableHiding: false,
        positionActionsColumn: 'last',
        createDisplayMode: 'row', // ('modal', and 'custom' are also available)
        editDisplayMode: 'row', // ('modal', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        getRowId: (row) => row.id,
        initialState: { showColumnFilters: false, showGlobalFilter: true, columnVisibility: { id: false } },
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
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: handleCreateLovDetails,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleEditLovDetails,
        mantineTableContainerProps: {
            sx: {
                minHeight: '65vh',
            },
        },
        renderRowActions: ({ row, table }) => (
            <Flex gap="md">
                <Tooltip label="Edit">
                    <ActionIcon onClick={() => table.setEditingRow(row)}>
                        <IconEdit />
                    </ActionIcon>
                </Tooltip>
            </Flex>
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
                style={{
                    backgroundColor: '#4361ee',
                    font: '0.85rem !important',
                }}
                onClick={() => {
                    table.setCreatingRow(true);
                }}
            >
                <IconPlus className="mr-1 h-5 w-5" />
                Add
            </Button>
        ),
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

const LovDetails = ({ table }: any) => (
    //Put this with your other react-query providers near root of your app
    <QueryClientProvider client={queryClient}>
        <ModalsProvider>
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-2">
                <h5 className="text-lg font-semibold dark:text-white-light">Lov Details</h5>
                {/* <button type="button" className="btn btn-primary flex" onClick={() => {
                    table.setCreatingRow(true);
                }}>
                    <IconPlus className="mr-1 h-5 w-5" />
                    Add
                </button> */}
            </div>
            <FromMenu />
        </ModalsProvider>
    </QueryClientProvider>
);
export default React.memo(LovDetails);

const validateRequired = (value?: string | null) => !!value && value.length > 0;

function validateLovDetails(form: lovDetails) {
    return {
        lov_type: !validateRequired(form.lov_type) ? 'Lov Type is Required' : '',
        lov_code: !validateRequired(form.lov_code) ? 'Lov Code is Required' : '',
        lov_value: !validateRequired(form.lov_value) ? 'Lov Value is Required' : '',
        lov_seq: !validateRequired(String(form.lov_seq)) ? 'Sequence is Required' : '',
        lov_desc: !validateRequired(form.lov_desc) ? 'Lov Description is Required' : '',
    };
}
