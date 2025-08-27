'use client';
import { Fragment, useEffect, useMemo, useState } from 'react';
import {
    MantineReactTable,
    // createRow,
    type MRT_ColumnDef,
    type MRT_Row,
    type MRT_TableOptions,
    useMantineReactTable,
    MRT_ColumnFilterFnsState,
    MRT_PaginationState,
    MRT_SortingState,
    MRT_ColumnFiltersState,
} from 'mantine-react-table';
import { ActionIcon, Button, Flex, Text, Tooltip } from '@mantine/core';
import { ModalsProvider, modals } from '@mantine/modals';
import { IconArrowBack, IconEdit, IconSend, IconTrash } from '@tabler/icons-react';
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { GetPROSPECTVisitDone, GetPROSPECTVisitNotDone, GetTSIVisitDone, GetTSIVisitNotDone, GetVisitHistory, GetVisitNextAction } from '../../../services/api/visit-service';
import { UseAuthStore } from '../../../services/store/AuthStore';
import { I_Visit_Details, I_Visit_History, Visit_Details_DTO } from '../../../services/constants/interfaces/visit.interface';
import moment from 'moment';
import { VisitAddUpdate } from '../../../services/api/lead-service';
import { commonErrorToast, commonSuccessToast } from '../../../services/functions/commonToast';
import { commonAlert } from '../../../services/functions/commonAlert';
import VisitEntry from './VisitEntry';
import FeatherIcon from 'feather-icons-react';
import IconX from '../../../components/Icon/IconX';
import SendMail from '../Send-Mail/SendMail';
import { GetProdDevImgRouteBuilder } from '../../../services/functions/getProdDevUrlBuilder';
import { Dialog, Transition } from '@headlessui/react';

type I_Visit = {
    dcio_id: any;
    dcio_check_in_time: any;
    dcio_check_out_time: any;
    dcio_propect_visit_made_yn: any;
    dcio_prospect_visit_feedback_value: any;
    dcio_tsi_visit_feedback: any;
    dcio_prospect_visit_feedback: any;
    dcio_prospect_visit_remarks: any;
    dcio_tsi_visit_made_yn: any;
    dcio_tsi_visit_feedback_value: any;
    dcio_tsi_visit_remarks: any;
    dcio_visit_next_action_value: any;
    dcio_visit_next_action: any;
    dcio_visit_discrepancy_yn: any;
};

const VisitList = ({ LeadDetails }) => {
    const UserDetails = UseAuthStore((state) => state.userDetails);
    const [TSIVisitFeedbackListY, setTSIVisitFeedbackListY] = useState<any[]>([]);
    const [ProsVisitFeedbackListY, setProsVisitFeedbackListY] = useState<any[]>([]);
    const [TSIVisitFeedbackListN, setTSIVisitFeedbackListN] = useState<any[]>([]);
    const [ProsVisitFeedbackListN, setProsVisitFeedbackListN] = useState<any[]>([]);
    const [VisitNextAction, setVisitNextAction] = useState<any[]>([]);
    const [detectChangesOnCellDropdown, setDetectChangesOnCellDropdown] = useState<number>(0);
    const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
    // All Dropdown Arrays....
    let TSIVisitDone: any[] = ['Yes', 'No'];
    let ProspectVisitDone: any[] = ['Yes', 'No'];
    const [IsEditMode, setIsEditMode] = useState<boolean>(false);
    const [VisitInfo, setVisitInfo] = useState<I_Visit_Details>(Visit_Details_DTO);
    const [ShowEscalateModal, setShowEscalateModal] = useState(false);

    const CommonGetLov = (arr: any) => {
        let data = arr.map((item) => item.lov_value);
        return data;
    };
    const columns = useMemo<MRT_ColumnDef<I_Visit>[]>(
        () => [
            {
                accessorKey: 'dcio_id',
                header: 'Id',
                enableEditing: false,
                size: 10,
                Cell: ({ cell, column, renderedCellValue, row, table }) => {
                    return <span>{cell.row.index + 1}</span>;
                },
            },
            {
                accessorKey: 'dcio_check_in_time',
                header: 'Visit Start Date & Time',
                enableEditing: false,
                size: 100,
                Cell: ({ cell, column, renderedCellValue, row, table }) => {
                    return <span>{cell.row.original.dcio_check_in_time ? cell.row.original.dcio_check_in_time : '-'}</span>;
                },
            },
            {
                accessorKey: 'dcio_check_out_time',
                header: 'Visit End Date & Time',
                enableEditing: false,
                size: 100,
                Cell: ({ cell, column, renderedCellValue, row, table }) => {
                    return <span>{cell.row.original.dcio_check_out_time ? cell.row.original.dcio_check_out_time : '-'}</span>;
                },
            },
            {
                accessorKey: 'dcio_propect_visit_made_yn',
                header: 'Prospect Confirm Visit Done',
                editVariant: 'select',
                size: 100,
                mantineEditSelectProps: ({ cell, column, row, table }) => ({
                    data: ProspectVisitDone,
                    onChange: (value: any) => {
                        cell.row.original.dcio_propect_visit_made_yn = value;
                        setDetectChangesOnCellDropdown((prev) => prev + 1);
                        cell.row.original.dcio_prospect_visit_feedback_value = null;
                    },
                }),

                Cell: ({ cell, column, renderedCellValue, row, table }) => {
                    return (
                        <span
                            className={
                                cell.row.original.dcio_propect_visit_made_yn && cell.row.original.dcio_propect_visit_made_yn == 'Yes' ? 'badge rounded-full bg-success' : 'badge rounded-full bg-danger'
                            }
                        >
                            {cell.row.original.dcio_propect_visit_made_yn}
                        </span>
                    );
                },
            },
            {
                accessorKey: 'dcio_prospect_visit_feedback_value',
                header: 'Prospect Feedback',
                editVariant: 'select',
                // size: 100,
                mantineEditSelectProps: ({ cell, column, row, table }) => ({
                    data: cell.row.original.dcio_propect_visit_made_yn == 'Yes' ? CommonGetLov(ProsVisitFeedbackListY) : CommonGetLov(ProsVisitFeedbackListN),
                    // error: validationErrors?.dcio_prospect_visit_feedback_value,
                }),
            },
            {
                accessorKey: 'dcio_prospect_visit_remarks',
                header: 'Prospect Remarks',
                mantineEditTextInputProps: {
                    type: 'text',
                    required: true,
                    // error: validationErrors?.dcio_prospect_visit_remarks,
                    // // //remove any previous validation errors when user focuses on the input
                    // onFocus: () =>
                    //     setValidationErrors({
                    //         ...validationErrors,
                    //         dcio_prospect_visit_remarks: undefined,
                    //     }),
                },
                size: 100,
            },
            {
                accessorKey: 'dcio_tsi_visit_made_yn',
                header: 'TSI Confirm Visit Done',
                editVariant: 'select',
                size: 100,
                mantineEditSelectProps: ({ cell, column, row, table }) => ({
                    data: TSIVisitDone,
                    onChange: (value: any) => {
                        cell.row.original.dcio_tsi_visit_made_yn = value;
                        setDetectChangesOnCellDropdown((prev) => prev + 1);
                    },
                }),

                Cell: ({ cell, column, renderedCellValue, row, table }) => {
                    return (
                        <span
                            className={cell.row.original.dcio_tsi_visit_made_yn && cell.row.original.dcio_tsi_visit_made_yn == 'Yes' ? 'badge rounded-full bg-success' : 'badge rounded-full bg-danger'}
                        >
                            {cell.row.original.dcio_tsi_visit_made_yn}
                        </span>
                    );
                },
            },
            {
                accessorKey: 'dcio_tsi_visit_feedback_value',
                header: 'TSI Feedback',
                editVariant: 'select',
                mantineEditSelectProps: ({ cell, column, row, table }) => ({
                    data: cell.row.original.dcio_tsi_visit_made_yn == 'Yes' ? CommonGetLov(TSIVisitFeedbackListY) : CommonGetLov(TSIVisitFeedbackListN),
                    // error: validationErrors?.dcio_tsi_visit_feedback_value,
                }),

                // size: 100,
            },
            {
                accessorKey: 'dcio_tsi_visit_remarks',
                header: 'TSI Remarks',
                mantineEditTextInputProps: {
                    type: 'text',
                    required: true,
                    // error: validationErrors?.dcio_tsi_visit_remarks,
                    // //remove any previous validation errors when user focuses on the input
                    // onFocus: () =>
                    //     setValidationErrors({
                    //         ...validationErrors,
                    //         dcio_tsi_visit_remarks: undefined,
                    //     }),
                },
                size: 100,
            },
            {
                accessorKey: 'dcio_visit_next_action_value',
                header: 'Visit Next Action',
                editVariant: 'select',
                // mantineEditSelectProps: {
                //     data: VisitNextActionList,
                //     // error: validationErrors?.fmm_parent_name,
                // },
                mantineEditSelectProps: ({ cell, column, row, table }) => ({
                    data: cell.row.original.dcio_tsi_visit_made_yn == 'Yes' ? CommonGetLov(VisitNextAction) : [],
                    // error: validationErrors?.dcio_visit_next_action_value,
                    disabled: cell.row.original.dcio_tsi_visit_made_yn == 'No',
                }),
                size: 100,
            },
        ],
        [validationErrors, TSIVisitFeedbackListY, TSIVisitFeedbackListN, VisitNextAction, detectChangesOnCellDropdown]
    );

    // All Dropdown api call start
    const getTSIVisitDone = async () => {
        try {
            const response = await GetTSIVisitDone({ userid: UserDetails.user_id });
            if (response && response.data && response.data.length > 0) {
                setTSIVisitFeedbackListY(response.data);
                // TSIFeedbackListY = response.data.map((item: any) => item.lov_value);
            }
        } catch (error) {
            return;
        }
    };

    const getProspectVisitDone = async () => {
        try {
            const response = await GetPROSPECTVisitDone({ userid: UserDetails.user_id });
            if (response && response.data && response.data.length > 0) {
                setProsVisitFeedbackListY(response.data);
                // ProspectFeedbackListY = response.data.map((item: any) => item.lov_value);
            }
        } catch (error) {
            return;
        }
    };

    const getTSIVisitNotDone = async () => {
        try {
            const response = await GetTSIVisitNotDone({ userid: UserDetails.user_id });
            if (response && response.data && response.data.length > 0) {
                setTSIVisitFeedbackListN(response.data);
                // TSIFeedbackListN = response.data.map((item: any) => item.lov_value);
            }
        } catch (error) {
            return;
        }
    };

    const getProspectVisitNotDone = async () => {
        try {
            const response = await GetPROSPECTVisitNotDone({ userid: UserDetails.user_id });
            if (response && response.data && response.data.length > 0) {
                setProsVisitFeedbackListN(response.data);
                // ProspectFeedbackListN = response.data.map((item: any) => item.lov_value);
            }
        } catch (error) {
            return;
        }
    };

    const getVisitNextAction = async () => {
        try {
            const response = await GetVisitNextAction({ userid: UserDetails.user_id });
            if (response && response.data && response.data.length > 0) {
                setVisitNextAction(response.data);
                // VisitNextActionList = response.data.map((item: any) => item.lov_value);
            }
        } catch (error) {
            return;
        }
    };
    // All Dropdown api call end

    //UPDATE action
    const handleEditMenu: MRT_TableOptions<I_Visit>['onEditingRowSave'] = async ({ row, values, table }) => {
        values.dcio_id = row.original.dcio_id;

        // Condition based on dcio_tsi_visit_made_yn...
        if (row.original.dcio_tsi_visit_made_yn == 'Yes') {
            let index = TSIVisitFeedbackListY.findIndex((item) => item.lov_value == values.dcio_tsi_visit_feedback_value);
            if (index >= 0) values.dcio_tsi_visit_feedback = TSIVisitFeedbackListY[index].lov_code;

            let index1 = VisitNextAction.findIndex((item) => item.lov_value == values.dcio_visit_next_action_value);
            if (index1 >= 0) values.dcio_visit_next_action = VisitNextAction[index1].lov_code;
        } else {
            values.dcio_visit_next_action = null;
            let index = TSIVisitFeedbackListN.findIndex((item) => item.lov_value == values.dcio_tsi_visit_feedback_value);
            if (index >= 0) values.dcio_tsi_visit_feedback = TSIVisitFeedbackListN[index].lov_code;
        }

        // Condition based on dcio_propect_visit_made_yn...
        if (row.original.dcio_propect_visit_made_yn == 'Yes') {
            let index = ProsVisitFeedbackListY.findIndex((item) => item.lov_value == values.dcio_prospect_visit_feedback_value);
            if (index >= 0) values.dcio_prospect_visit_feedback = ProsVisitFeedbackListY[index].lov_code;
        } else {
            let index = ProsVisitFeedbackListN.findIndex((item) => item.lov_value == values.dcio_prospect_visit_feedback_value);
            if (index >= 0) values.dcio_prospect_visit_feedback = ProsVisitFeedbackListN[index].lov_code;
        }
    };

    const formatDateTime = async (date: any) => {
        let nextFollowupDate = date;
        var dateParts = nextFollowupDate.split(/[\s/:\-]+/);
        var year = parseInt(dateParts[2], 10);
        var month = parseInt(dateParts[1], 10) - 1; // Months are 0-indexed in JavaScript
        var day = parseInt(dateParts[0], 10);
        var hour = parseInt(dateParts[3], 10);
        var minute = parseInt(dateParts[4], 10);
        var dateObject = new Date(year, month, day, hour, minute);
        // Format the date as "YYYY-MM-DDTHH:mm:ss[Z]"
        var formattedDate = moment(dateObject).format().replace('+05:30', 'Z');
        //dateObject.toISOString().replace(/\.\d{3}Z$/, 'Z');
        return formattedDate;
    };

    const [data, setData] = useState<I_Visit[]>([]);
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
        useState<MRT_ColumnFilterFnsState>(Object.fromEntries(columns?.map(({ accessorKey }) => [accessorKey, 'contains']))); //default to "contains" for all columns

    const table = useMantineReactTable({
        columns,
        data,
        enableGlobalFilter: false,
        enablePagination: false,
        enableGlobalFilterModes: false,
        enableSorting: false,
        enableTopToolbar: false,
        enableBottomToolbar: false,
        enableColumnFilters: false,
        enableStickyHeader: true,
        enableStickyFooter: true,
        enableColumnFilterModes: false,
        enableColumnOrdering: false,
        enableFacetedValues: true,
        manualFiltering: false,
        manualPagination: false,
        manualSorting: false,
        enableGrouping: false,
        enablePinning: false,
        enableRowActions: true,
        enableFullScreenToggle: false,
        enableColumnActions: false,
        enableHiding: false,
        positionActionsColumn: 'last',
        createDisplayMode: 'row', // ('modal', and 'custom' are also available)
        editDisplayMode: 'row', // ('modal', 'cell', 'table', and 'custom' are also available)
        enableEditing: false,
        getRowId: (row) => row.dcio_id,
        initialState: { showColumnFilters: false, showGlobalFilter: false },
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

        // onEditingRowCancel: () => getVisitList(),
        // onEditingRowSave: handleEditMenu,
        // onEditingCellChange: ({ row, table, cell }: any) => {
        // },
        renderRowActions: ({ row, table, cell }) => (
            <Flex gap="md">
                {(row.original.dcio_propect_visit_made_yn != 'No' || row.original.dcio_tsi_visit_made_yn != 'No') && (
                    <Tooltip label="Edit">
                        <ActionIcon
                            onClick={() => {
                                // setVisitInfo(row.original)
                                UpdateVisitDetails(row.original);
                                // table.setEditingRow(row);
                                setIsEditMode(true);
                            }}
                        >
                            <IconEdit />
                        </ActionIcon>
                    </Tooltip>
                )}
                {row.original.dcio_visit_discrepancy_yn == 'Y' && (
                    <Tooltip label="Escalate">
                        <ActionIcon
                            onClick={() => {
                                setShowEscalateModal(true);
                                handleEscalateMOdalOpen();
                            }}
                        >
                            <IconSend />
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

    const handleOnUpdate = () => {
        getVisitList();
        setIsEditMode(false);
    };

    const handleOnSelect = () => {
        setShowEscalateModal(false);
    };

    const UpdateVisitDetails = (VisitInfo: any) => {
        if (VisitInfo) {
            let visit_data: I_Visit_Details = {
                dcio_id: VisitInfo.dcio_id,
                dcio_depot_code: VisitInfo.dcio_depot_code,
                leadId: LeadDetails.lh_id,
                dcio_check_in_time: VisitInfo.dcio_check_in_time,
                dcio_check_out_time: VisitInfo.dcio_check_out_time,
                dcio_activity_others: VisitInfo.dcio_activity_others,
                dcio_activity_type: VisitInfo.dcio_activity_type,
                dcio_tsi_visit_made_yn: VisitInfo.dcio_tsi_visit_made_yn == 'Yes' ? 'Y' : 'N',
                dcio_tsi_visit_feedback: VisitInfo.dcio_tsi_visit_feedback,
                dcio_tsi_visit_remarks: VisitInfo.dcio_tsi_visit_remarks,
                dcio_propect_visit_made_yn: VisitInfo.dcio_propect_visit_made_yn == 'Yes' ? 'Y' : 'N',
                dcio_prospect_visit_feedback: VisitInfo.dcio_prospect_visit_feedback,
                dcio_prospect_visit_remarks: VisitInfo.dcio_tsi_visit_remarks,
                dcio_geo_tag_not_done_reason: VisitInfo.dcio_geo_tag_not_done_reason,
                dcio_visit_next_action: VisitInfo.dcio_visit_next_action,
                dcio_visit_by: VisitInfo.dcio_visit_by ? VisitInfo.dcio_visit_by : null,
                dcio_conflict_dealer_code: VisitInfo.dcio_conflict_dealer_code ? VisitInfo.dcio_conflict_dealer_code : null,
                dcio_conflict_dealer_distance: VisitInfo.dcio_conflict_dealer_distance ? VisitInfo.dcio_conflict_dealer_distance : null,
                dcio_conflict_dealer_business_value: VisitInfo.dcio_conflict_dealer_business_value ? VisitInfo.dcio_conflict_dealer_business_value : null,
                dcio_cancelation_request_yn: VisitInfo.dcio_cancelation_request_yn ? VisitInfo.dcio_cancelation_request_yn : null,
                dcio_cancelation_request_remarks: VisitInfo.dcio_cancelation_request_remarks ? VisitInfo.dcio_cancelation_request_remarks : null,
                dcio_next_followup_date: VisitInfo.dcio_next_followup_date ? VisitInfo.dcio_next_followup_date : null,
                nonServiceablePin: null,
            };
            setVisitInfo(visit_data);
        }
    };

    const handleEscalateMOdalOpen = () => {
        (LeadDetails.lh_id = LeadDetails?.lh_id), (LeadDetails.ef_id = LeadDetails?.ef_id), (LeadDetails.escalation_type = 'VISIT');
    };

    useEffect(() => {
        setIsLoading(true);
        getVisitList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        columnFilterFns,
        columnFilters, //refetch when column filters change
        globalFilter, //refetch when global filter changes
        pagination.pageIndex, //refetch when page index changes
        pagination.pageSize, //refetch when page size changes
        sorting, //refetch when sorting changes
    ]);

    const getVisitList = async () => {
        const newFilterArr: { id: string; value: any[any]; operator: string; dataType: any }[] = [];

        Object.keys(columnFilterFns).forEach((key) => {
            // making group with filter VisitInfo and operator type
            if (columnFilters && columnFilters.length > 0) {
                columnFilters.forEach((filter) => {
                    if (filter && filter.id && key && filter.id.toLowerCase() === key.toLowerCase()) {
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
            leadId: LeadDetails.lh_id,
            start: `${pagination.pageIndex * pagination.pageSize}`,
            size: `${pagination.pageSize}`,
            filters: newFilterArr ?? [],
            globalFilter: globalFilter ?? '',
            sorting: sorting ?? [],
        };

        try {
            const response = await GetVisitHistory(searchParam_Set);

            if (response && response.data && response.data.length > 0) {
                response.data.map((item: I_Visit_History) => {
                    item.dcio_propect_visit_made_yn = item.dcio_propect_visit_made_yn == 'Y' ? 'Yes' : 'No';
                    item.dcio_tsi_visit_made_yn = item.dcio_tsi_visit_made_yn == 'Y' ? 'Yes' : 'No';

                    if (item.dcio_check_in_time != null) {
                        item.dcio_check_in_time = moment.utc(item.dcio_check_in_time).format('DD/MM/YYYY h:mm A');
                    }
                    if (item.dcio_check_out_time != null) {
                        item.dcio_check_out_time = moment.utc(item.dcio_check_out_time).format('DD/MM/YYYY h:mm A');
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

    useEffect(() => {
        getProspectVisitDone();
        getProspectVisitNotDone();
        getTSIVisitDone();
        getTSIVisitNotDone();
        getVisitNextAction();
    }, []);

    return (
        <>
            {!IsEditMode && (
                <>
                    <div>
                        <MantineReactTable table={table} />
                    </div>
                    <div>
                        <Transition appear show={ShowEscalateModal} as={Fragment}>
                            <Dialog as="div" open={ShowEscalateModal} onClose={() => setShowEscalateModal(false)}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0" />
                                </Transition.Child>
                                <div id="slideIn_down_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                                    <div className="flex min-h-screen items-start justify-center px-4">
                                        <Dialog.Panel className="panel my-8 w-full max-w-7xl overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                            <div className="grid-cols-12 items-center justify-between bg-secondary-light px-5 py-3 dark:bg-[#121c2c] xs:pb-0 sm:pb-0 md:flex">
                                                <div className="flex items-center justify-between bg-secondary-light px-2" style={{ width: `100%` }}>
                                                    <div className="flex">
                                                        <img className="mb-1 mr-2 h-8 w-auto" src={GetProdDevImgRouteBuilder('/assets/images/send.png')} alt="" />
                                                        <h5 className="text-lg font-bold">Send Mail</h5>
                                                    </div>
                                                    <button onClick={() => setShowEscalateModal(false)} type="button" className="justify-end text-white-dark hover:text-dark">
                                                        <IconX />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="xs:pt-0 sm:pt-0 md:p-2 lg:p-2">
                                                <SendMail LeadDetails={LeadDetails} onModalButtonHandle={handleOnSelect} />

                                                <div className="mb-5 px-2 py-1"></div>
                                            </div>
                                        </Dialog.Panel>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    </div>
                </>
            )}
            {IsEditMode && (
                <div className="mt-2">
                    <div className="mb-2">
                        <button
                            type="button"
                            className="btn btn-primary text-md flex w-16 items-center justify-center"
                            onClick={() => {
                                setIsEditMode(false);
                            }}
                        >
                            <FeatherIcon className="h-4 w-4" icon="arrow-left" />
                            {/* <IconArrowBack className="h-6 w-6"></IconArrowBack> */}
                            &nbsp;
                            <span>Back</span>
                        </button>
                    </div>
                    <legend className="mb-1 text-lg font-bold">Update Visit Details</legend>

                    <VisitEntry LeadDetails={LeadDetails} VisitInfo={VisitInfo} handleOnUpdate={handleOnUpdate} />
                </div>
            )}
        </>
    );
};

const queryClient = new QueryClient();

const AllVisit = (props: any) => (
    //Put this with your other react-query providers near root of your app
    <>
        <QueryClientProvider client={queryClient}>
            <ModalsProvider>
                <VisitList {...props} />
            </ModalsProvider>
        </QueryClientProvider>
    </>
);

export default React.memo(AllVisit);
