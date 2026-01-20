import { AddUpdateAppointment, GetAppointmentDayFeedbackLovList, GetAppointmentHistory } from '../../../services/api/lead-service';
import { MRT_ColumnDef, MRT_ColumnFilterFnsState, MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState, MRT_TableOptions, MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import React, { useEffect, useMemo, useState } from 'react';
import { ActionIcon, Button, Flex, Text, Tooltip } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import moment from 'moment';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalsProvider } from '@mantine/modals';
import { commonErrorToast, commonSuccessToast } from '../../../services/functions/commonToast';
import { commonAlert } from '../../../services/functions/commonAlert';
import Select from 'react-select';
type AppointmentInterface = {
    lal_auto_id: string;
    lal_preferable_appointment_dt: string;
    lal_preferable_appointment_slot: string;
    lal_alternate_appointment_dt: string;
    lal_alternate_appointment_slot: string;
    lal_remarks: string;
    lal_customer_acceptance_dt: string;
    lal_customer_acceptance_slot: string;
    created_user: string;
    created_date: string;
    modified_user: string;
    modified_date: string;
    lal_assign_to: string;
    assign_user_full_name: string;
    appointment_feedback: string;
    lal_appointment_feedback: string;
};

const AppointmentDetails = ({ LeadDetails }: any) => {
    let AcceptanceDateTime: any = ['Slot 1', 'Slot 2'];
    let FeedbackDropdownList: any = [];
    const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
    const [FeedbackList, setFeedbackList] = useState<any>([]);
    const columns = useMemo<MRT_ColumnDef<AppointmentInterface>[]>(
        () => [
            {
                accessorKey: 'lal_auto_id',
                header: 'Id',
                enableEditing: false,
            },
            {
                accessorKey: 'lal_preferable_appointment_dt',
                header: 'Appointment Date 1',
                enableEditing: false,
            },
            {
                accessorKey: 'lal_preferable_appointment_slot',
                header: 'Appointment Slot 1',
                enableEditing: false,
            },
            {
                accessorKey: 'lal_alternate_appointment_dt',
                header: 'Appointment Date 2',
                enableEditing: false,
            },
            {
                accessorKey: 'lal_alternate_appointment_slot',
                header: 'Appointment Slot 2',
                enableEditing: false,
            },
            {
                accessorKey: 'assign_user_full_name',
                header: 'TSI',
                enableEditing: false,
            },

            {
                accessorKey: 'appointment_feedback',
                header: 'Feedback',
                editVariant: 'select',
                mantineEditSelectProps: {
                    data: FeedbackDropdownList,
                    error: validationErrors?.appointment_feedback,
                },
            },

            {
                accessorKey: 'lal_customer_acceptance_dt',
                header: 'Final Appointment Date',
                editVariant: 'select',
                mantineEditSelectProps: {
                    data: AcceptanceDateTime,
                    error: validationErrors?.lal_customer_acceptance_dt,
                },
            },
            {
                accessorKey: 'lal_remarks',
                header: 'Remarks',
                mantineEditTextInputProps: {
                    type: 'text',
                    required: true,
                    error: validationErrors?.lal_remarks,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            lal_remarks: undefined,
                        }),
                },
            },
        ],
        [validationErrors]
    );

    const handleEditMenu: MRT_TableOptions<AppointmentInterface>['onEditingRowSave'] = async ({ row, values, table }) => {
        values.lal_auto_id = row.original.lal_auto_id;
        values.lal_assign_to = row.original.lal_assign_to;
        if (values.appointment_feedback != null && values.appointment_feedback != '') {
            let index = FeedbackList.findIndex((item: any) => item.lov_value == values.appointment_feedback.trim());
            if (index >= 0) {
                values.lal_appointment_feedback = FeedbackList[index].lov_code;
            }
        }
        const newValidationErrors = validateData(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        if (values.lal_customer_acceptance_dt == 'Slot 1') {
            values.lal_customer_acceptance_dt = values.lal_preferable_appointment_dt;
            values.lal_customer_acceptance_slot = values.lal_preferable_appointment_slot;
        } else {
            values.lal_customer_acceptance_dt = values.lal_alternate_appointment_dt;
            values.lal_customer_acceptance_slot = values.lal_alternate_appointment_slot;
        }
        addAppointmentDetails(values, table);
        //exit editing mode
    };

    const addAppointmentDetails = async (values: AppointmentInterface, table: any) => {
        const data = {
            autoId: values.lal_auto_id,
            leadId: LeadDetails.lh_id,
            preferableAppointmentDateTime: await formateDateTime(values.lal_preferable_appointment_dt),
            preferableAppointmentSlot: values.lal_preferable_appointment_slot,
            alternateAppointmentDateTime: await formateDateTime(values.lal_alternate_appointment_dt),
            alternateAppointmentSlot: values.lal_alternate_appointment_slot,
            remarks: values.lal_remarks,
            customerAcceptanceDateTime: await formateDateTime(values.lal_customer_acceptance_dt),
            customerAcceptanceSlot: values.lal_customer_acceptance_slot,
            assignTo: values.lal_assign_to,
            lal_appointment_feedback: values.lal_appointment_feedback,
        };
        let errorCount = 0;

        if (data.customerAcceptanceDateTime == '') {
            commonErrorToast('Customer Acceptance Date Time is missing');
            errorCount++;
        }

        if (errorCount == 0) {
            commonAlert('Are You Sure?', 'If you click confirm the record will be submitted. To cancel please press cancel button.', 'warning').then(async (result: any) => {
                if (result.value) {
                    try {
                        const response = await AddUpdateAppointment(data);
                        if (response.response_message) {
                            commonSuccessToast(response.response_message);
                            setIsLoading(true);
                            getAppointmentDtlsList();
                            table.setEditingRow(null);
                        }
                    } catch (error) {
                        setIsError(true);
                        setIsLoading(false);
                        return;
                    }
                } else {
                    table.setEditingRow(null);
                    getAppointmentDtlsList();
                }
            });
        }
        setIsError(false);
        setIsLoading(false);
    };

    const formateDateTime = async (date: any) => {
        let nextFollowupDate = moment(date, 'DD/MM/YYYY');
        // var dateParts = nextFollowupDate.split(/[\s/:\-]+/);
        // var year = parseInt(dateParts[2], 10);
        // var month = parseInt(dateParts[1], 10) - 1; // Months are 0-indexed in JavaScript
        // var day = parseInt(dateParts[0], 10);
        // var hour = parseInt(dateParts[3], 10);
        // var minute = parseInt(dateParts[4], 10);
        // var dateObject = new Date(year, month, day, hour, minute);
        // Format the date as "YYYY-MM-DDTHH:mm:ss[Z]"
        // var formattedDate = moment(dateObject).format().replace('+05:30', 'Z');
        const formattedDate = nextFollowupDate.format('YYYY-MM-DDTHH:mm:ss[Z]');
        //dateObject.toISOString().replace(/\.\d{3}Z$/, 'Z');
        return formattedDate;
    };

    const [data, setData] = useState<AppointmentInterface[]>([]);
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
        pageSize: 1,
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
        editDisplayMode: 'row', // ('modal', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        getRowId: (row) => row.lal_auto_id,
        initialState: { showColumnFilters: false, showGlobalFilter: true, columnVisibility: { lal_auto_id: false } },
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
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleEditMenu,
        onEditingCellChange: () => {},
        renderRowActions: ({ row, table }) => (
            <Flex gap="md">
                {LeadDetails && !LeadDetails.IsButtonDisable && (
                    <Tooltip label="Edit">
                        <ActionIcon
                            onClick={() => {
                                table.setEditingRow(row);
                                GetFeedBackist();
                            }}
                        >
                            <IconEdit />
                        </ActionIcon>
                    </Tooltip>
                )}
            </Flex>
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
        getAppointmentDtlsList();
        GetFeedBackist();
        AcceptanceDateTime = [];
        AcceptanceDateTime = ['Slot 1', 'Slot 2'];
        // fetchParentMenuData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        columnFilterFns,
        columnFilters, //refetch when column filters change
        globalFilter, //refetch when global filter changes
        pagination.pageIndex, //refetch when page index changes
        pagination.pageSize, //refetch when page size changes
        sorting, //refetch when sorting changes
    ]);
    const getAppointmentDtlsList = async () => {
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

        const searchParam_Set = {
            start: 0, //`${pagination.pageIndex * pagination.pageSize}`,
            size: 1, //`${pagination.pageSize}`,
            filters: newFilterArr ?? [],
            globalFilter: globalFilter ?? '',
            sorting: sorting ?? [],
            leadAutoId: LeadDetails.lh_id,
            group_by: '',
        };

        try {
            const response = await GetAppointmentHistory(searchParam_Set);
            if (response.data != null && response.data != undefined) {
                response.data.map((item, index) => {
                    item.lal_alternate_appointment_dt = moment.utc(item.lal_alternate_appointment_dt).format('DD/MM/YYYY');
                    item.lal_preferable_appointment_dt = moment.utc(item.lal_preferable_appointment_dt).format('DD/MM/YYYY');
                    item.lal_customer_acceptance_dt = item.lal_customer_acceptance_dt == null ? '' : moment.utc(item.lal_customer_acceptance_dt).format('DD/MM/YYYY');
                    if (item.lal_customer_acceptance_dt == item.lal_preferable_appointment_dt) {
                        item.lal_customer_acceptance_dt = 'Slot 1';
                        item.lal_customer_acceptance_slot = item.lal_preferable_appointment_slot;
                    } else if (item.lal_customer_acceptance_dt == item.lal_alternate_appointment_dt) {
                        item.lal_customer_acceptance_dt = 'Slot 2';
                        item.lal_customer_acceptance_slot = item.lal_alternate_appointment_slot;
                    } else {
                        item.lal_customer_acceptance_dt = '';
                        item.lal_customer_acceptance_slot = '';
                    }
                });

                setData(response.data);
                setRowCount(response.meta.totalRowCount);
            }
        } catch (error) {
            setIsError(true);
            return;
        }
        setIsError(false);
        setIsLoading(false);
    };

    const GetFeedBackist = async () => {
        let userDetails: any = JSON.parse(localStorage.getItem('auth') || '');

        const data = {
            userid: userDetails.state.userDetails.user_id,
        };

        try {
            const response = await GetAppointmentDayFeedbackLovList(data);
            response.data.map((item) => {
                if (!FeedbackDropdownList.includes(item.lov_value)) {
                    FeedbackDropdownList.push(item.lov_value);
                }
            });
            response.data.forEach((element: any) => {
                element['value'] = element['lov_code'];
                element['label'] = element['lov_value'];
            });
            setFeedbackList(response.data);
        } catch (error) {
            return;
        }
    };
    return <MantineReactTable table={table} />;
};

const queryClient = new QueryClient();

const AppointmentList = ({ LeadDetails }: any) => (
    //Put this with your other react-query providers near root of your app
    <>
        <QueryClientProvider client={queryClient}>
            <ModalsProvider>
                <AppointmentDetails LeadDetails={LeadDetails} />
            </ModalsProvider>
        </QueryClientProvider>
    </>
);

export default React.memo(AppointmentList);

const validateRequired = (value: string) => !!value.length;

function validateData(form: AppointmentInterface) {
    return {
        // lal_remarks: !validateRequired(form.lal_remarks) ? 'Remarks is Required' : '',
        // lal_customer_acceptance_dt: !validateRequired(form.lal_customer_acceptance_dt) ? 'Customer Acceptance Date is Required' : '',
    };
}
