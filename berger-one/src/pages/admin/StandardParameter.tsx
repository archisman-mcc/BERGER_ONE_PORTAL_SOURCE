import { ActionIcon, Button, Flex, TextInputProps, Tooltip } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { IconEdit, IconPlus } from '@tabler/icons-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MRT_ColumnDef, MRT_ColumnFilterFnsState, MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState, MRT_TableOptions, MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import React, { useEffect, useMemo, useState } from 'react';
import { commonAlert } from '../../services/functions/commonAlert';
import { commonErrorToast, commonSuccessToast } from '../../services/functions/commonToast';
import { TextInput } from '@mantine/core';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import moment from 'moment';
import { GetStdParamDetailsList, StdParamsInsert } from '../../services/api//standard-parameter-service';

type ApiResponse = {
    data: Array<StandardParam>;
    meta: {
        totalRowCount: number;
    };
};
type StandardParam = {
    id: string;
    param_name: string;
    param_status: string;
    param_decimal_value: string;
    param_datetime_value: string;
    param_char_value: string;
    param_time_value: string;
    param_auto_lead_me: string;
    param_false_lead_me: string;
    created_user: string;
    active: string;
    insert_update_flag: string;
};
const defaultParams = {
    id: null,
    title: '',
    start: '',
    end: '',
    description: '',
    type: 'primary',
};
const ActiveState: string[] = ['Yes', 'No'];
export const stringOperators = ['contains', 'startsWith', 'endsWith', 'equals', 'notEqual', 'empty', 'notEmpty']; // operators for string type column

export const numberOperators = ['greaterThan', 'greaterThanOrEqualTo', 'lessThan', 'equals', 'notEqual', 'empty', 'notEmpty', 'between']; // operators for number type column

export const dateOperators = ['between', 'equals', 'notEqual']; // operators for date

const FormMenu = () => {
    //table state
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const [selectedDatetime, setSelectedDatetime] = useState<any>('');

    const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
    const columns = useMemo<MRT_ColumnDef<StandardParam>[]>(
        () => [
            // {
            //     accessorKey: 'Srl',
            //     header: 'Srl',
            //     enableEditing: false,
            //     enableColumnFilter: false,
            // },
            {
                accessorKey: 'param_name',
                header: 'Param name',
                columnFilterModeOptions: [...stringOperators],
                mantineEditTextInputProps: {
                    type: 'text',
                    required: true,
                    error: validationErrors?.param_name,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            param_name: undefined,
                        }),
                },
            },
            {
                accessorKey: 'param_status',
                header: 'Status',
                columnFilterModeOptions: [...stringOperators],
            },
            {
                accessorKey: 'param_decimal_value',
                header: 'Decimal Value',
                columnFilterModeOptions: [...numberOperators],
                mantineEditTextInputProps: {
                    type: 'number',
                },
            },
            {
                accessorKey: 'param_char_value',
                header: 'Char Value',
                columnFilterModeOptions: [...stringOperators],
            },
            {
                accessorKey: 'param_datetime_value',
                // accessorFn: (originalRow: any) => {
                //     return originalRow.param_datetime_value ? moment(originalRow.param_datetime_value, "YYYY-MM-DDTHH:mm:ss[Z]").format('DD/MM/yyyy HH:mm') : "-"
                // },
                header: 'Date',
                columnFilterModeOptions: [...dateOperators],
                enableEditing: true,
                Edit: ({ cell, column, table }) => {
                    return (
                        <Flatpickr
                            data-enable-time
                            options={{
                                enableTime: true,
                                allowInput: true,
                                dateFormat: 'DD/MM/yyyy HH:mm',
                                position: 'auto left',
                                parseDate: (datestr, format) => {
                                    return moment(datestr, format, true).toDate();
                                },
                                formatDate: (date, format, locale) => {
                                    return moment(date).format(format);
                                },
                                onChange: function (selectedDates, dateStr, instance) {
                                    setSelectedDatetime(selectedDates[0]);
                                },
                            }}
                            value={moment(cell.row.original.param_datetime_value, 'YYYY-MM-DDTHH:mm:ss[Z]').format('DD/MM/yyyy HH:mm')}
                            className="form-input"
                        />
                    );
                },
                accessorFn: (originalRow: any) => {
                    return originalRow.param_datetime_value ? moment(originalRow.param_datetime_value, 'YYYY-MM-DDTHH:mm:ss[Z]').format('DD/MM/yyyy HH:mm') : '-';
                },
            },
            {
                accessorFn: (originalRow: any) => {
                    return originalRow.active && originalRow.active == 'Y' ? 'Yes' : 'No';
                },
                header: 'Active',
                editVariant: 'select',
                columnFilterModeOptions: [...stringOperators],
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
    const handleCreateStandardParam: MRT_TableOptions<StandardParam>['onCreatingRowSave'] = async ({ values, exitCreatingMode }) => {
        const newValidationErrors = validateStandardParam(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        const insertUpdateFlag = 'Add';
        // Show SweetAlert confirmation modal
        await showAlert(values, insertUpdateFlag, exitCreatingMode);
    };
    //UPDATE action
    const handleEditStandardParam: MRT_TableOptions<StandardParam>['onEditingRowSave'] = async ({ row, table, values }) => {
        const newValidationErrors = validateStandardParam(values);
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
                    await addStandardParam(values);
                    table.setEditingRow(null); //exit editing mode
                }
            });
        } else {
            commonAlert('Are You Sure?', 'If you click confirm the record will be submitted. To cancel please press cancel button.', 'warning').then(async (result: any) => {
                if (result.value) {
                    setValidationErrors({});
                    values.insert_update_flag = 'I';
                    await addStandardParam(values);
                    exitCreatingMode();
                }
            });
        }
    }
    const getFromStandardParamList = async () => {
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
            const response = await GetStdParamDetailsList(searchParam_Set);
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
    const addStandardParam = async (values: any) => {
        let stateDetails: any = JSON.parse(localStorage.getItem('auth') || '');
        let userDetail: any = stateDetails.state.userDetails;
        const formParam_Set = {
            param_name: values.param_name,
            param_status: values.param_status,
            param_decimal_value: values.param_decimal_value,
            param_datetime_value:
                selectedDatetime && selectedDatetime != ''
                    ? moment(selectedDatetime).format()
                    : values.param_time_value && values.insert_update_flag == 'U'
                    ? moment(values.param_time_value).format()
                    : null,
            // param_datetime_value: datetimeValue,
            param_char_value: values.param_char_value,
            param_time_value: values.param_time_value,
            param_auto_lead_me: values.param_auto_lead_me,
            param_false_lead_me: values.param_false_lead_me,
            created_user: userDetail.user_id,
            active: values.Active == 'Yes' ? 'Y' : 'N',
            insert_update_flag: values.insert_update_flag,
        };

        try {
            const response = await StdParamsInsert(formParam_Set);
            if (response.response_message) {
                commonSuccessToast(response.response_message).then(async (result: any) => {
                    if (result) {
                        getFromStandardParamList();
                    }
                });
            } else {
                commonErrorToast(response.errorMessage).then(async (result: any) => {});
            }
        } catch (error) {
            commonErrorToast('Error').then(async (result: any) => {});
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
        getFromStandardParamList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        columnFilterFns,
        columnFilters, //refetch when column filters change
        globalFilter, //refetch when global filter changes
        pagination.pageIndex, //refetch when page index changes
        pagination.pageSize, //refetch when page size changes
        sorting, //refetch when sorting changes
    ]);
    const [data, setData] = useState<StandardParam[]>([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    const table = useMantineReactTable({
        columns,
        data,
        enableStickyHeader: true,
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
        enableColumnFilters: true,
        enablePagination: true,
        enableHiding: false,
        enableSorting: true,
        enableColumnOrdering: true,
        positionActionsColumn: 'last',
        createDisplayMode: 'row', // ('modal', and 'custom' are also available)
        editDisplayMode: 'row', // ('modal', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        getRowId: (row) => row.id,
        initialState: { showColumnFilters: false, showGlobalFilter: true, columnVisibility: {} },
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
        mantineTableContainerProps: {
            sx: {
                minHeight: '65vh',
            },
        },
        onColumnFilterFnsChange: setColumnFilterFns,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: handleCreateStandardParam,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleEditStandardParam,

        renderRowActions: ({ row, table }) => (
            <Flex gap="md">
                <Tooltip label="Edit">
                    <ActionIcon
                        onClick={() => {
                            // row.original.param_datetime_value = moment(row.original.param_datetime_value)
                            //     .local()
                            //     .format("DD-MM-YYYY hh:mm")
                            table.setEditingRow(row);
                        }}
                    >
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
            // isSaving: isCreatingUser || isUpdatingUser,
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

const StandardParameter = () => (
    //Put this with your other react-query providers near root of your app
    <QueryClientProvider client={queryClient}>
        <ModalsProvider>
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-2">
                <h5 className="text-lg font-semibold dark:text-white-light">Standard Parameter</h5>
            </div>
            <FormMenu />
        </ModalsProvider>
    </QueryClientProvider>
);
export default React.memo(StandardParameter);
const validateRequired = (value?: any | null) => !!value && value.length > 0;

function validateStandardParam(form: StandardParam) {
    return {
        param_name: !validateRequired(form.param_name) ? 'Param Name is Required' : '',
    };
}
