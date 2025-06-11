// import { CiSearch } from "react-icons/ci";
import { useEffect, useState, useMemo, useRef, forwardRef, useImperativeHandle } from "react";
// import Flatpickr from 'react-flatpickr';
// import 'flatpickr/dist/themes/material_green.css';
import * as dsr from '../../../../services/api/protectonTransact/TransactDsr';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { Button } from '@mantine/core';
import { FiEye } from "react-icons/fi";
import ModalComponent from "./ModalComponent";


const TableComponent = forwardRef(({ tableData, settableData, setLoading, filterData, form }: any, ref) => {

    const dataRef = useRef<any>(null);

    const [territoryModalTableData, setTerritoryModalTableData] = useState<any>([]);
    const [categoryModalTableData, setCategoryModalTableData] = useState<any>([]);
    const [contractorDealerModalTableData, setContractorDealerModalTableData] = useState<any>([]);
    const [categorywiseProductModalTableData, setCategorywiseProductModalTableData] = useState<any>([]);
    const [transactionReportModalTableData, setTransactionReportModalTableData] = useState<any>([]);

    const [isTerritoryModalOpen, setIsTerritoryModalOpen] = useState<Boolean>(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<Boolean>(false);
    const [isContractorDealerModalOpen, setIsContractorDealerModalOpen] = useState<Boolean>(false);
    const [isCategorywiseProductModalOpen, setIsCategorywiseProductModalOpen] = useState<Boolean>(false);
    const [isCategorywiseProductModalOpen_terr, setIsCategorywiseProductModalOpen_terr] = useState<Boolean>(false);
    const [isCategorywiseProductModalOpen_contractor_Dealer, setIsCategorywiseProductModalOpen_contractor_Dealer] = useState<Boolean>(false);
    const [isTransactionReportModalOpen, setIsTransactionReportModalOpen] = useState<Boolean>(false);


    const GetUserApplDlrSales = async ({ prd_grp, report_grp_level, region, depot, terr }: any) => {
        setLoading(true);
        const payload: any = {
            app_id: 15,
            prd_grp: prd_grp,
            report_grp_level: report_grp_level,
            regn: region,
            depot: depot,
            terr: terr,
            asOnDate: filterData?.dsrDate,
            repType: filterData?.viewBy,
            selected_user: filterData?.usp_user_id
        };
        try {
            const response: any = await dsr.UserApplDlrSales(payload);
            if (response.data) {
                const roundVal = (number: any) => Math.round(parseFloat(number))
                const tableData = response.data.table.map((t: any) => ({
                    ...t,
                    gr_val: roundVal(((t?.ty_val - t?.ly_val) / t?.ly_val) * 100),
                    gr_vol: roundVal(((t?.ty_vol - t?.ly_vol) / t?.ly_vol) * 100),
                    gr_val_other: roundVal(((t?.ty_val_other - t?.ly_val_other) / t?.ly_val_other) * 100),
                    gr_vol_other: roundVal(((t?.ty_vol_other - t?.ly_vol_other) / t?.ly_vol_other) * 100),
                    ach_val: ((t?.ty_val / t?.tg_val) * 100).toFixed(2),
                    ach_vol: ((t?.ty_vol / t?.tg_vol) * 100).toFixed(2),
                }))
                report_grp_level === "REGION" ? settableData(tableData) :
                    report_grp_level === "REGION_CAT" || report_grp_level === "TERR_OTHER" || report_grp_level === "CAT_OTHER" ? setCategorywiseProductModalTableData(tableData) :
                        report_grp_level === "OTHER_DTLS" ? setTransactionReportModalTableData(tableData) :
                            report_grp_level === "TERR" ? setTerritoryModalTableData(tableData) :
                                report_grp_level === "CAT" || report_grp_level === "CAT_SMRY" ? setCategoryModalTableData(tableData) :
                                    setContractorDealerModalTableData(tableData)
            }
            else settableData([]);
        } catch (error) {
            return;
        }
        setLoading(false);
    }

    const commonCloumns = [
        {
            header: 'VALUE (IN LACS)',
            columns: [
                {
                    accessorKey: 'ly_val_fm',
                    header: 'LY(ME)',
                    size: 50,
                },
                {
                    accessorKey: 'ly_val',
                    header: 'LY(MTD)',
                    size: 50,
                },
                {
                    accessorKey: 'ty_val',
                    header: 'TY',
                    size: 50,
                },
                {
                    accessorKey: 'gr_val',
                    header: 'GRW% (MTD)',
                    size: 50
                },
                {
                    accessorKey: 'tg_val',
                    header: 'BUDGET',
                    size: 50,
                },
                {
                    accessorKey: 'ach_val',
                    header: 'ACH% TO BUDGET',
                    size: 50,
                },
            ]
        },
        {
            header: 'VOLUME (IN KL)',
            columns: [
                {
                    accessorKey: 'ly_vol_fm',
                    header: 'LY(ME)',
                    size: 50,
                },
                {
                    accessorKey: 'ly_vol',
                    header: 'LY(MTD)',
                    size: 50,
                },
                {
                    accessorKey: 'ty_vol',
                    header: 'TY',
                    size: 50,
                },
                {
                    accessorKey: 'gr_vol',
                    header: 'GRW% (MTD)',
                    size: 50,
                },
                {
                    accessorKey: 'tg_vol',
                    header: 'BUDGET',
                    size: 50,
                },
                {
                    accessorKey: 'ach_vol',
                    header: 'ACH% TO BUDGET',
                    size: 50,
                },
            ]
        },
        {
            header: 'OTHER VALUE (IN LACS)',
            columns: [
                {
                    accessorKey: 'ly_val_other',
                    header: 'LY (MTD)',
                    size: 50,
                },
                {
                    accessorKey: 'ty_val_other',
                    header: 'TY',
                    size: 50,
                },
                {
                    accessorKey: 'gr_val_other',
                    header: 'GRW% (MTD)',
                    size: 50,
                },
            ]
        },
        {
            header: 'OTHER VOLUME (IN KL)',
            columns: [
                {
                    accessorKey: 'ly_vol_other',
                    header: 'LY (MTD)',
                    size: 50,
                },
                {
                    accessorKey: 'ty_vol_other',
                    header: 'TY',
                    size: 50,
                },
                {
                    accessorKey: 'gr_vol_other',
                    header: 'GRW% (MTD)',
                    size: 50,
                },
            ]
        },
    ]

    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'regn',
                header: 'Region',
                size: 50,
                Cell: ({ cell }) => {
                    return (
                        <span
                            className='text-blue-600 cursor-pointer'
                            onClick={() => {
                                cell.row.original.regn === "Summary" ? setIsCategoryModalOpen(true) : setIsTerritoryModalOpen(true);
                                GetUserApplDlrSales({
                                    prd_grp: "PROTECTON",
                                    report_grp_level: cell.row.original.regn === "Summary" ? 'CAT_SMRY' : "TERR",
                                    region: cell.row.original.regn === "Summary" ? '' : cell.row.original.regn,
                                    depot: 'abcd',
                                    terr: ''
                                });
                            }}
                        >
                            {cell.row.original.regn}
                        </span>
                    );
                },
            },
            ...commonCloumns,
            {
                id: 'action',
                header: 'Action',
                size: 50,
                Cell: ({ row }) => {
                    return (
                        <Button
                            variant="outline"
                            color="blue"
                            style={{ padding: 5 }}
                            leftIcon={<FiEye size={16} style={{ paddingRight: "2px" }} />}
                            onClick={() => {
                                setIsCategorywiseProductModalOpen(true);
                                dataRef.current = {
                                    regn: row.original.regn,
                                    terr_code: '',
                                    cat_cust_desc: ''
                                };
                                // setRegionForCategorywiseProductModal(row.original.regn);
                                GetUserApplDlrSales({
                                    prd_grp: "PROTECTON",
                                    report_grp_level: "REGION_CAT",
                                    region: row.original.regn,
                                    depot: '',
                                    terr: ''
                                });
                            }}
                        >
                            View
                        </Button>
                    );
                },
            }
        ],
        []
    );

    const table = useMantineReactTable({
        columns,
        data: tableData,
        enableColumnResizing: true,
        enableTopToolbar: false,
        enableSorting: false,
        enableColumnActions: false,
        columnResizeMode: 'onChange',
        mantineTableContainerProps: {
            style: {
                overflowX: 'hidden', // hides horizontal scrollbar
            },
        }
    });

    // territory popup //
    const territoryModalColumns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'terr_name',
                header: 'Name',
                size: 50,
                Cell: ({ cell }) => {
                    return (
                        <span
                            className='text-blue-600 cursor-pointer'
                            onClick={() => {
                                setIsCategoryModalOpen(true);
                                GetUserApplDlrSales({ prd_grp: "PROTECTON", report_grp_level: "CAT", region: cell.row.original.regn, depot: 'abcd', terr: cell.row.original.terr_code });
                            }}
                        >
                            {cell.row.original.terr_name}
                        </span>
                    );
                },
            },
            ...commonCloumns,
            {
                id: 'action',
                header: 'Action',
                size: 50,
                Cell: ({ row }) => {
                    return (
                        <Button
                            variant="outline"
                            color="blue"
                            style={{ padding: 5 }}
                            leftIcon={<FiEye size={16} style={{ paddingRight: "2px" }} />}
                            onClick={() => {
                                setIsCategorywiseProductModalOpen_terr(true);
                                dataRef.current = {
                                    regn: row.original.regn,
                                    terr_code: row.original.terr_code,
                                    cat_cust_desc: ''
                                };
                                GetUserApplDlrSales({
                                    prd_grp: "PROTECTON",
                                    report_grp_level: "TERR_OTHER",
                                    region: row.original.regn,
                                    depot: '',
                                    terr: row.original.terr_code
                                });
                            }}
                        >
                            View
                        </Button>
                    );
                },
            }
        ],
        []
    );

    const territoryModal = useMantineReactTable({
        columns: territoryModalColumns,
        data: territoryModalTableData,
        enableColumnResizing: true,
        enableTopToolbar: false,
        enableSorting: false,
        enableColumnActions: false,
        columnResizeMode: 'onChange',
        mantineTableContainerProps: {
            style: {
                overflowX: 'hidden', // hides horizontal scrollbar
            },
        }
    });

    const onCloseModal = () => {
        setIsTerritoryModalOpen(false); setTerritoryModalTableData([]);
    }

    // category popup //
    const categoryModalColumns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'cat_cust_desc',
                header: 'Name',
                size: 50,
                Cell: ({ cell }) => {
                    return (
                        <span
                            className='text-blue-600 cursor-pointer'
                            onClick={() => {
                                setIsContractorDealerModalOpen(true);
                                GetUserApplDlrSales({ prd_grp: "PROTECTON", report_grp_level: "DLR", region: cell.row.original.regn, depot: cell.row.original.cat_cust_desc, terr: cell.row.original.terr_code });
                            }}
                        >
                            {cell.row.original.cat_cust_desc}
                        </span>
                    );
                },
            },
            ...commonCloumns,
            {
                id: 'action',
                header: 'Action',
                size: 50,
                Cell: ({ row }) => {
                    return (
                        <Button
                            variant="outline"
                            color="blue"
                            style={{ padding: 5 }}
                            leftIcon={<FiEye size={16} style={{ paddingRight: "2px" }} />}
                            onClick={() => {
                                setIsCategorywiseProductModalOpen_contractor_Dealer(true);
                                dataRef.current = {
                                    regn: row.original.regn,
                                    terr_code: row.original.terr_code,
                                    cat_cust_desc: row.original.cat_cust_desc
                                };
                                GetUserApplDlrSales({
                                    prd_grp: "PROTECTON",
                                    report_grp_level: "CAT_OTHER",
                                    region: row.original.regn,
                                    depot: row.original.cat_cust_desc,
                                    terr: row.original.terr_code
                                });
                            }}
                        >
                            View
                        </Button>
                    );
                },
            }
        ],
        []
    );

    const categoryModalColumns_summary = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'cat_cust_desc',
                header: 'Name',
                size: 50,
                Cell: ({ cell }) => {
                    return (
                        <span
                            className='text-blue-600 cursor-pointer'
                            onClick={() => {
                                setIsContractorDealerModalOpen(true);
                                GetUserApplDlrSales({ prd_grp: "PROTECTON", report_grp_level: "DLR", region: cell.row.original.regn, depot: cell.row.original.cat_cust_desc, terr: cell.row.original.terr_code });
                            }}
                        >
                            {cell.row.original.cat_cust_desc}
                        </span>
                    );
                },
            },
            ...commonCloumns
        ],
        []
    );

    const categoryModal = useMantineReactTable({
        columns: categoryModalTableData[0]?.regn === "Summary" ? categoryModalColumns_summary : categoryModalColumns,
        data: categoryModalTableData,
        enableColumnResizing: true,
        enableTopToolbar: false,
        enableSorting: false,
        enableColumnActions: false,
        columnResizeMode: 'onChange',
        mantineTableContainerProps: {
            style: {
                overflowX: 'hidden', // hides horizontal scrollbar
            },
        }
    });

    const onCloseCategoryModal = () => {
        setIsCategoryModalOpen(false); setCategoryModalTableData([]);
    }

    // contractor / dealer report popup //
    const contractorDealerModalColumns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'dealer',
                header: 'Name',
                size: 50,
                Cell: ({ cell }) => {
                    return (
                        <span
                        // className='text-blue-600 cursor-pointer'
                        // onClick={() => {
                        //     setIsContractorDealerModalOpen(true);
                        //     GetUserApplDlrSales({ report_grp_level: "DLR", region: cell.row.original.regn, depot: cell.row.original.cat_cust_desc, terr: cell.row.original.terr_code });
                        // }}
                        >
                            {cell.row.original.dealer}
                        </span>
                    );
                },
            },
            ...commonCloumns
        ],
        []
    );

    const contractorDealerModal = useMantineReactTable({
        columns: contractorDealerModalColumns,
        data: contractorDealerModalTableData,
        enableColumnResizing: true,
        enableTopToolbar: false,
        enableSorting: false,
        enableColumnActions: false,
        columnResizeMode: 'onChange',
        mantineTableContainerProps: {
            style: {
                overflowX: 'hidden', // hides horizontal scrollbar
            },
        }
    });

    const onCloseContractorDealerModal = () => {
        setIsContractorDealerModalOpen(false); setContractorDealerModalTableData([]);
    }

    // category wise product modal
    const categorywiseProductModalColumns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'cat_cust_desc',
                header: 'Category',
                size: 50,
                Cell: ({ cell }) => {
                    return (
                        <span>
                            {cell.row.original.cat_cust_desc}
                        </span>
                    );
                },
            },
            {
                header: 'ALL PRODUCT VALUE (IN LACS)',
                columns: [
                    {
                        accessorKey: 'ly_val',
                        header: 'LY',
                        size: 50,
                    },
                    {
                        accessorKey: 'ty_val',
                        header: 'TY',
                        size: 50,
                    },
                    {
                        // accessorKey: 'gr_val',
                        header: 'GRW %',
                        size: 50,
                    }
                ]
            },
            {
                header: 'ALL PRODUCT VOLUME (IN KL)',
                columns: [
                    {
                        accessorKey: 'ly_vol',
                        header: 'LY',
                        size: 50,
                    },
                    {
                        accessorKey: 'ty_vol',
                        header: 'TY',
                        size: 50,
                    },
                    {
                        // accessorKey: 'tg_vol',
                        header: 'GRW %',
                        size: 50,
                    },
                ]
            },
            {
                header: 'PROTECTON OTHER VALUE (IN LACS)',
                columns: [
                    {
                        accessorKey: 'ly_val_other',
                        header: 'LY',
                        size: 50,
                    },
                    {
                        accessorKey: 'ty_val_other',
                        header: 'TY',
                        size: 50,
                    },
                    {
                        // accessorKey: 'tg_vol',
                        header: 'GRW %',
                        size: 50,
                    },
                ]
            },
            {
                header: 'PROTECTON OTHER VOLUME (IN KL)',
                columns: [
                    {
                        accessorKey: 'ly_vol_other',
                        header: 'LY',
                        size: 50,
                    },
                    {
                        accessorKey: 'ty_vol_other',
                        header: 'TY',
                        size: 50,
                    },
                    {
                        // accessorKey: 'tg_vol',
                        header: 'GRW %',
                        size: 50,
                    },
                ]
            },
            {
                header: 'TIGER PRODUCT VALUE (IN LACS)',
                columns: [
                    {
                        accessorKey: 'ly_val_tiger',
                        header: 'LY',
                        size: 50,
                    },
                    {
                        accessorKey: 'ty_val_tiger',
                        header: 'TY',
                        size: 50,
                    },
                    {
                        // accessorKey: 'tg_vol',
                        header: 'GRW %',
                        size: 50,
                    },
                ]
            },
            {
                header: 'TIGER PRODUCT VOLUME (IN KL)',
                columns: [
                    {
                        accessorKey: 'ly_vol_tiger',
                        header: 'LY',
                        size: 50,
                    },
                    {
                        accessorKey: 'ty_vol_tiger',
                        header: 'TY',
                        size: 50,
                    },
                    {
                        // accessorKey: 'tg_vol',
                        header: 'GRW %',
                        size: 50,
                    },
                ]
            },
        ],
        []
    );

    const categorywiseProductModal = useMantineReactTable({
        columns: categorywiseProductModalColumns,
        data: categorywiseProductModalTableData,
        enableColumnResizing: true,
        enableTopToolbar: false,
        enableSorting: false,
        enableColumnActions: false,
        columnResizeMode: 'onChange',
        mantineTableContainerProps: {
            style: {
                overflowX: 'hidden',
            },
        }
    });
    // -------------------------------------
    const categorywiseProductModalColumns_Terr = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'prd_cat',
                header: 'Product',
                size: 50,
                Cell: ({ cell }) => {
                    return (
                        <span>
                            {cell.row.original.prd_cat}
                        </span>
                    );
                },
            },
            {
                header: 'VALUE (IN LACS)',
                columns: [
                    {
                        accessorKey: 'ly_val_other',
                        header: 'LY',
                        size: 50,
                    },
                    {
                        accessorKey: 'ty_val_other',
                        header: 'TY',
                        size: 50,
                    },
                    {
                        // accessorKey: 'gr_val',
                        header: 'GRW %',
                        size: 50,
                    }
                ]
            },
            {
                header: 'VOLUME (MT / KL)',
                columns: [
                    {
                        accessorKey: 'ly_vol_other',
                        header: 'LY',
                        size: 50,
                    },
                    {
                        accessorKey: 'ty_vol_other',
                        header: 'TY',
                        size: 50,
                    },
                    {
                        // accessorKey: 'tg_vol',
                        header: 'GRW %',
                        size: 50,
                    },
                ]
            },
            {
                id: 'action',
                header: 'Action',
                size: 50,
                Cell: ({ row }) => {
                    return (
                        <Button
                            variant="outline"
                            color="blue"
                            style={{ padding: 5 }}
                            leftIcon={<FiEye size={16} style={{ paddingRight: "2px" }} />}
                            onClick={() => {
                                // console.log(regionForCategorywiseProductModal, territoryForCategorywiseProductModal)
                                setIsTransactionReportModalOpen(true);
                                GetUserApplDlrSales({
                                    prd_grp: row.original.prd_cat,
                                    report_grp_level: "OTHER_DTLS",
                                    region: dataRef.current.regn,
                                    depot: row.original.cat_cust_desc || '',
                                    terr: dataRef.current.terr_code
                                });
                            }}
                        >
                            View
                        </Button>
                    );
                },
            }
        ],
        []
    );

    const categorywiseProductModal_Terr = useMantineReactTable({
        columns: categorywiseProductModalColumns_Terr,
        data: categorywiseProductModalTableData,
        enableColumnResizing: true,
        enableTopToolbar: false,
        enableSorting: false,
        enableColumnActions: false,
        columnResizeMode: 'onChange',
        mantineTableContainerProps: {
            style: {
                overflowX: 'hidden',
            },
        }
    });

    const onCloseCategorywiseProductModal = () => {
        setIsCategorywiseProductModalOpen(false);
        setIsCategorywiseProductModalOpen_terr(false);
        setIsCategorywiseProductModalOpen_contractor_Dealer(false);
        setCategorywiseProductModalTableData([]);
    }

    // Transaction modal
    const transactionReportModalColumns = useMemo<MRT_ColumnDef<any>[]>(() =>
        [
            {
                // accessorKey: `${grp_prd_code}`,
                header: 'Product',
                size: 50,
                Cell: ({ cell }) => {
                    return (
                        <span>
                            {cell.row.original.grp_prd_code} - {cell.row.original.grp_level3}
                        </span>
                    );
                },
            },
            {
                header: 'VALUE (IN LACS)',
                columns: [
                    {
                        accessorKey: 'ly_val_other',
                        header: 'LY',
                        size: 50,
                    },
                    {
                        accessorKey: 'ty_val_other',
                        header: 'TY',
                        size: 50,
                    },
                    {
                        // accessorKey: 'gr_val',
                        header: 'GRW %',
                        size: 50,
                    }
                ]
            },
            {
                header: 'VOLUME (MT / KL)',
                columns: [
                    {
                        accessorKey: 'ly_vol_other',
                        header: 'LY',
                        size: 50,
                    },
                    {
                        accessorKey: 'ty_vol_other',
                        header: 'TY',
                        size: 50,
                    },
                    {
                        // accessorKey: 'tg_vol',
                        header: 'GRW %',
                        size: 50,
                    },
                ]
            },
        ], []
    )

    const transactionReportModal = useMantineReactTable({
        columns: transactionReportModalColumns,
        data: transactionReportModalTableData,
        enableColumnResizing: true,
        enableTopToolbar: false,
        enableSorting: false,
        enableColumnActions: false,
        columnResizeMode: 'onChange',
        mantineTableContainerProps: {
            style: {
                overflowX: 'hidden',
            },
        }
    });

    const onCloseTransactionReportModal = () => {
        setIsTransactionReportModalOpen(false);
        setTransactionReportModalTableData([]);
    }

    useEffect(() => {
        form === 'TransactDsr' && GetUserApplDlrSales({ prd_grp: "PROTECTON", report_grp_level: "REGION", region: '', depot: '', terr: '' });
    }, [])

    // Expose functions to parent
    useImperativeHandle(ref, () => ({
        triggerAPI: GetUserApplDlrSales,
    }));

    return (
        <>
            <div className="max-h-[50vh] overflow-y-auto">
                <MantineReactTable table={table} />
            </div>

            {/* Territory Modal */}
            {isTerritoryModalOpen && (
                <ModalComponent modalHeader={`Territory Report: ${filterData?.viewBy}`} tableName={`${territoryModalTableData[0]?.regn} >`} tableData={territoryModal} onCloseModal={onCloseModal} />
            )}

            {/* Category Modal */}
            {isCategoryModalOpen && (
                <ModalComponent modalHeader={`Category Report: ${filterData?.viewBy}`} tableName={categoryModalTableData[0]?.regn === "Summary" ? `${categoryModalTableData[0]?.regn} >` : `${categoryModalTableData[0]?.regn} > ${categoryModalTableData[0]?.terr_code} >`} tableData={categoryModal} onCloseModal={onCloseCategoryModal} />
            )}

            {/* contractor / dealer Modal */}
            {isContractorDealerModalOpen && (
                <ModalComponent modalHeader={`${contractorDealerModalTableData[0]?.cat_cust_desc} Report: ${filterData?.viewBy}`} tableName={`${contractorDealerModalTableData[0]?.regn} > ${contractorDealerModalTableData[0]?.terr_code} > ${contractorDealerModalTableData[0]?.cat_cust_desc} >`} tableData={contractorDealerModal} onCloseModal={onCloseContractorDealerModal} />
            )}

            {/* category wise product modal */}
            {isCategorywiseProductModalOpen && (
                <ModalComponent modalHeader='Category Wise Product' tableName={`${dataRef.current.regn} >`} tableData={categorywiseProductModal} onCloseModal={onCloseCategorywiseProductModal} />
            )}

            {isCategorywiseProductModalOpen_terr && (
                <ModalComponent modalHeader='Category Wise Product' tableName={`${dataRef.current.regn} > ${dataRef.current.terr_code} >`} tableData={categorywiseProductModal_Terr} onCloseModal={onCloseCategorywiseProductModal} />
            )}

            {isCategorywiseProductModalOpen_contractor_Dealer && (
                <ModalComponent modalHeader='Category Wise Product' tableName={`${dataRef.current.regn} > ${dataRef.current.terr_code} > ${dataRef.current.cat_cust_desc} >`} tableData={categorywiseProductModal_Terr} onCloseModal={onCloseCategorywiseProductModal} />
            )}

            {/* Transaction Report modal */}
            {isTransactionReportModalOpen && (
                <ModalComponent modalHeader='Transaction Report' tableName={`${dataRef.current.regn} > ${dataRef.current.terr_code} > ${dataRef.current.cat_cust_desc} >`} tableData={transactionReportModal} onCloseModal={onCloseTransactionReportModal} />
            )}
        </>
    )
})

export default TableComponent