import { IconEdit, IconTrash } from '@tabler/icons-react';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef, type MRT_ColumnFilterFnsState, type MRT_ColumnFiltersState, type MRT_PaginationState, type MRT_SortingState, type MRT_TableOptions } from "mantine-react-table";
import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { FormMenuMasterInsert, FormMenuMasterList } from "../../../services/api/users/FromMenuMaster";
import { commonErrorToast, commonSuccessToast } from "../../../services/functions/commonToast";
import { ActionIcon, Button, Flex, Tooltip } from "@mantine/core";
import { GetAllParentMenu } from '../../../services/api/commons/global';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalsProvider } from '@mantine/modals';

type ApiResponse = {
    data: Array<FormMaster>;
    meta: {
        totalRowCount: number;
    };
};

type FormMaster = {
    fmm_id: string;
    fmm_name: string;
    fmm_link: string;
    fmm_parent_id: number;
    fmm_parent_name: string;
    fmm_sequence: string;
    fafa_icon: string;
    activedesc: string;
    active: string;
};

type ParentMemu = {
    fmm_parent_id: number;
    fmm_parent_name: string;
};

const ParentManuArr: string[] = ['Top Level Menu'];
const ActiveState: string[] = ['Yes', 'No'];
const FromMenu = () => {
    const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
    const [parentManu, setParentManu] = useState<ParentMemu[]>([]);
    const columns = useMemo<MRT_ColumnDef<FormMaster>[]>(
        () => [
            {
                accessorKey: 'fmm_id',
                header: 'Id',
                enableEditing: false,
            },
            {
                accessorKey: 'fmm_parent_name',
                header: 'Parent Form',
                editVariant: 'select',
                mantineEditSelectProps: {
                    data: ParentManuArr,
                    error: validationErrors?.fmm_parent_name,
                },
            },
            {
                accessorKey: 'fmm_name',
                header: 'Form Name',
                mantineEditTextInputProps: {
                    type: 'text',
                    required: true,
                    error: validationErrors?.fmm_name,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            fmm_name: undefined,
                        }),
                },
            },
            {
                accessorKey: 'fmm_link',
                header: 'Form Link',
                mantineEditTextInputProps: {
                    type: 'text',
                    required: true,
                    error: validationErrors?.fmm_link,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            fmm_link: undefined,
                        }),
                },
            },
            {
                accessorKey: 'fmm_sequence',
                header: 'Sequence',
                mantineEditTextInputProps: {
                    type: 'number',
                    required: true,
                    error: validationErrors?.fmm_sequence,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            fmm_sequence: undefined,
                        }),
                },
            },
            {
                accessorKey: 'fafa_icon',
                header: 'Icon',
                mantineEditTextInputProps: {
                    type: 'text',
                    required: true,
                    error: validationErrors?.fafa_icon,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            fafa_icon: undefined,
                        }),
                },
            },
            {
                accessorKey: 'active',
                header: 'Active',
                enableColumnFilter: false,
                editVariant: 'select',
                mantineEditSelectProps: {
                    data: ActiveState,
                    error: validationErrors?.active,
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
        [validationErrors]
    );

    const showAlert = async (type: number, values: any) => {
        if (type === 10) {
            Swal.fire({
                icon: 'warning',
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                showCancelButton: true,
                confirmButtonText: 'Submit',
                padding: '2em',
                customClass: { popup: 'sweet-alerts' },
            }).then(async (result) => {
                if (result.value) await addFormManuDtls(values);
            });
        }
    };

    //CREATE action
    const handleCreateManu: MRT_TableOptions<FormMaster>['onCreatingRowSave'] = async ({ values, exitCreatingMode }) => {
        const newValidationErrors = validateUser(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        if (values.fmm_parent_name != 'Top Level Menu') {
            let index = parentManu.findIndex((item) => item.fmm_parent_name == values.fmm_parent_name.trim());
            if (index >= 0) {
                values.fmm_parent_id = parentManu[index].fmm_parent_id;
                values.insert_update_flag = 'I';
                showAlert(10, values);
                exitCreatingMode();
            }
        } else {
            values.fmm_parent_id = '0';
            values.insert_update_flag = 'I';
            showAlert(10, values);
            exitCreatingMode();
        }
    };

    const addFormManuDtls = async (values: any) => {
        let userDetails: any = JSON.parse(localStorage.getItem('auth') || '');
        const formParam_Set: any = {
            fmm_id: values.insert_update_flag == 'I' ? 0 : values.fmm_id,
            fmm_name: values.fmm_name,
            fmm_link: values.fmm_link,
            fmm_parent_id: values.fmm_parent_id,
            fmm_sequence: values.fmm_sequence,
            fafa_icon: values.fafa_icon,
            created_user: userDetails.state.userDetails.user_id,
            active: values.active == 'Yes' ? 'Y' : 'N',
            insert_update_flag: values.insert_update_flag,
            page_type: 'A',
        };

        try {
            const response: any = await FormMenuMasterInsert(formParam_Set);
            if (response.response_message) {
                commonSuccessToast(response.response_message).then(async (result: any) => {
                    if (result) {
                        setIsLoading(true);
                        getFromManuMstDtlsList();
                        fetchParentMenuData();
                    }
                });
            } else {
                commonErrorToast(response.errorMessage).then(async (result: any) => {});
            }
        } catch (error) {
            commonErrorToast('').then(async (result: any) => {});
            setIsError(true);
            setIsLoading(false);
            return;
        }
        setIsError(false);
        setIsLoading(false);
        // setIsRefetching(false);
    };

    //UPDATE action
    const handleEditMenu: MRT_TableOptions<FormMaster>['onEditingRowSave'] = async ({ row, values, table }) => {
        values.fmm_id = row.original.fmm_id;
        const newValidationErrors = validateUser(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        if (values.fmm_parent_name != 'Top Level Menu') {
            let index = parentManu.findIndex((item) => item.fmm_parent_name == values.fmm_parent_name.trim());
            if (index >= 0) {
                values.fmm_parent_id = parentManu[index].fmm_parent_id;
                values.insert_update_flag = 'U';
                showAlert(10, values);
            }
        } else {
            values.fmm_parent_id = '0';
            values.insert_update_flag = 'U';
            showAlert(10, values);
        }
        table.setEditingRow(null); //exit editing mode
    };

    const [data, setData] = useState<FormMaster[]>([]);
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

    const table = useMantineReactTable({
        columns,
        data,
        enableStickyHeader: true,
        enableStickyFooter: true,
        enableColumnFilterModes: true,
        enableColumnOrdering: false,
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
        createDisplayMode: 'row', // ('modal', and 'custom' are also available)
        editDisplayMode: 'row', // ('modal', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        getRowId: (row) => row.fmm_id,
        initialState: { showColumnFilters: false, showGlobalFilter: true, columnVisibility: { fmm_id: false } },
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
        // mantineToolbarAlertBannerProps: isLoadingUsersError
        //     ? {
        //           color: 'red',
        //           children: 'Error loading data',
        //       }
        //     : undefined,
        mantineTableContainerProps: {
            sx: {
                minHeight: '65vh',
            },
        },
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: handleCreateManu,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleEditMenu,
        onEditingCellChange: () => {},
        renderRowActions: ({ row, table }) => (
            <Flex gap="md">
                <Tooltip label="Edit">
                    <ActionIcon
                        onClick={() => {
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
                className="btn-sm"
                style={{ backgroundColor: '#228be6', marginRight: 5 }}
                onClick={() => {
                    table.setCreatingRow(true); //simplest way to open the create row modal with no default values
                    //or you can pass in a row object to set default values with the `createRow` helper function
                    // table.setCreatingRow(
                    //   createRow(table, {
                    //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
                    //   }),
                    // );
                }}
            >
                Create New Menu
            </Button>
        ),
        state: {
            // isSaving: isCreatingUser || isUpdatingUser,
            columnFilters,
            globalFilter,
            isLoading,
            pagination,
            sorting,
            columnFilterFns,
            showAlertBanner: isError,
            // showProgressBars: isLoading,
        },
    });

    useEffect(() => {
        setIsLoading(true);
        getFromManuMstDtlsList();
        fetchParentMenuData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        columnFilterFns,
        columnFilters, //refetch when column filters change
        globalFilter, //refetch when global filter changes
        pagination.pageIndex, //refetch when page index changes
        pagination.pageSize, //refetch when page size changes
        sorting, //refetch when sorting changes
    ]);

    const getFromManuMstDtlsList = async () => {
        const newFilterArr: { id: string; value: any[any]; operator: string; dataType: any }[] = [];

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

        const searchParam_Set: any = {
            start: `${pagination.pageIndex * pagination.pageSize}`,
            size: `${pagination.pageSize}`,
            filters: newFilterArr ?? [],
            globalFilter: globalFilter ?? '',
            sorting: sorting ?? [],
            view_type: 'ListView',
            group_by: '',
            view_by: '',
        };

        try {
            var rowCount: number = 0;
            const response: any = await FormMenuMasterList(searchParam_Set);
            if (response.data != null && response.data != undefined) {
                response.data.map((item: any) => {
                    item.active = item.active == 'Y' ? 'Yes' : 'No';
                    rowCount = rowCount + 1;
                });
                setData(response.data);
                //setRowCount(rowCount);
                setRowCount(response.meta.totalRowCount);
            }
        } catch (error) {
            setIsError(true);
            return;
        }
        setIsError(false);
        setIsLoading(false);
    };

    const fetchParentMenuData = async () => {
        setIsLoading(true);
        let userDetails: any = JSON.parse(localStorage.getItem('auth') || '');
        const searchParam_Set = {
            userId: userDetails.state.userDetails.user_id,
            flag: 'A',
            globalFilter: '',
        };
        try {
            const response: any = await GetAllParentMenu(searchParam_Set);
            response.data.map((item: any) => {
                if (!ParentManuArr.includes(item.fmm_parent_name)) ParentManuArr.push(item.fmm_parent_name);
            });
            setParentManu(response.data);
        } catch (error) {
            setIsError(true);
            return;
        }
        setIsError(false);
        setIsLoading(false);
        // setIsRefetching(false);
    };
    return <MantineReactTable table={table} />;
};

const queryClient = new QueryClient();

const FromMenuMaster = () => (
    //Put this with your other react-query providers near root of your app
    <>
        <div className="page-titlebar flex items-center justify-between bg-white px-4 py-2">
            <h5 className="text-lg font-semibold dark:text-white-light">Form Menu Master</h5>
        </div>
        <QueryClientProvider client={queryClient}>
            <ModalsProvider>
                <FromMenu />
            </ModalsProvider>
        </QueryClientProvider>
    </>
);

export default React.memo(FromMenuMaster);

const validateRequired = (value: string) => !!value.length;

function validateUser(form: FormMaster) {
    return {
        fmm_parent_name: !validateRequired(form.fmm_parent_name) ? 'Parent Menu is Required' : '',
        fmm_name: !validateRequired(form.fmm_name) ? 'Form Name is Required' : '',
        fmm_link: !validateRequired(form.fmm_link) ? 'Form Link is Required' : '',
        fmm_sequence: !validateRequired(form.fmm_sequence) ? 'Sequence is Required' : '',
        fafa_icon: !validateRequired(form.fafa_icon) ? 'Form Icon is Required' : '',
        active: !validateRequired(form.active) ? 'Active Flag is Required' : '',
    };
}
