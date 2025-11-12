import { useMemo, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { Button } from '@mantine/core';
import { FiEye } from "react-icons/fi";

const OutstandingTableComponent = ({ tableType, tableData, modalOpen, api, api1, modalOpen_single, setSlab, setTerr_code }: any) => {
    const tableType_ = tableType === 'cat_cust_desct' ? tableType.slice(0, -1) : tableType

    const [accordianOpen, setAccordianOpen] = useState<string>('');

    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () =>
            [
                {
                    accessorKey: 'age',
                    header: 'AGE',
                    size: 50,
                },
                {
                    accessorKey: 'gross',
                    header: 'GROSS',
                    size: 50,
                },
                {
                    accessorKey: 'net',
                    header: 'NET',
                    size: 50,
                },
                {
                    accessorKey: 'variance',
                    header: 'VARIANCE%',
                    size: 50,
                    Cell: ({ cell }) => {
                        return (
                            <span className='text-red-600'>{cell.row.original?.variance.toFixed(0)}</span>
                        )
                    }
                },
                {
                    accessorKey: 'odos',
                    header: 'ODOS',
                    size: 50,
                },
                {
                    id: 'action',
                    header: 'Action',
                    size: 20,
                    Cell: ({ row }) => {
                        return (
                            <Button
                                variant="outline"
                                color="blue"
                                style={{ padding: 5 }}
                                leftIcon={<FiEye size={16} style={{ paddingRight: "2px" }} />}
                                onClick={() => {
                                    console.log(row.original)
                                    modalOpen_single(true);
                                    if (tableType_ === "regn") {
                                        setSlab(row.original.index);
                                        setTerr_code(row.original.terr_code);
                                        api1({ report_grp_level: "TERR", regn: row.original.regn, terr: "", cat: "", slab: row.original.index })
                                    } else if (tableType_ === "terr_name") {
                                        setSlab(row.original.index);
                                        setTerr_code(row.original.terr_code);
                                        api1({ report_grp_level: "CATEGORY", regn: row.original.regn, terr: row.original.terr_code, cat: "", slab: row.original.index })
                                    } else if (tableType_ === "dealer") {
                                        setSlab(row.original.index);
                                        setTerr_code(row.original.terr_code);
                                        console.log({ report_grp_level: "DLR", regn: row.original.regn, terr: row.original.terr_code, cat: row.original.cat_cust_desc, dlrcode: row.original.dlrCode, slab: row.original.index })
                                        api1({ report_grp_level: "DLR", regn: row.original.regn, terr: row.original.terr_code, cat: row.original.cat_cust_desc, dlrcode: row.original.dlrCode, slab: row.original.index })
                                    }
                                    // tableType_ === "cat_cust_desc" && api({ report_grp_level: "DLR", regn: data.regn, terr: data.terr_code, cat: data.cat_cust_desc })
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

    const summary_columns = useMemo<MRT_ColumnDef<any>[]>(() =>
        [
            {
                accessorKey: 'age',
                header: 'AGE',
                size: 50,
            },
            {
                accessorKey: 'gross',
                header: 'LM',
                size: 50,
            },
            {
                accessorKey: 'net',
                header: 'NET OS',
                size: 50,
            },
            {
                accessorKey: 'odos',
                header: 'ODOS',
                size: 50,
            },
            {
                accessorKey: 'variance',
                header: 'VARIANCE%',
                size: 50,
                Cell: ({ cell }) => {
                    return (
                        <span className='text-red-600'>{cell.row.original?.variance.toFixed(0)}</span>
                    )
                }
            }],
        []
    )

    const category_summary_columns = useMemo<MRT_ColumnDef<any>[]>(() =>
        [
            {
                accessorKey: 'age',
                header: 'AGE',
                size: 50,
            },
            {
                accessorKey: 'gross',
                header: 'LM',
                size: 50,
            },
            {
                accessorKey: 'net',
                header: 'NET OS',
                size: 50,
            },
            {
                accessorKey: 'variance',
                header: 'VARIANCE%',
                size: 50,
                Cell: ({ cell }) => {
                    return (
                        <span className='text-red-600'>{cell.row.original?.variance.toFixed(0)}</span>
                    )
                }
            },
            // {
            //     id: 'action',
            //     header: 'Action',
            //     size: 20,
            //     Cell: ({ row }) => {
            //         return (
            //             <Button
            //                 variant="outline"
            //                 color="blue"
            //                 style={{ padding: 5 }}
            //                 leftIcon={<FiEye size={16} style={{ paddingRight: "2px" }} />}
            //                 onClick={() => {
            //                     modalOpen_single(true);
            //                     if (tableType_ === "regn") {
            //                         setSlab(row.original.index);
            //                         api1({ report_grp_level: "TERR", regn: row.original.regn, terr: "", cat: "", slab: row.original.index })
            //                     }
            //                 }}
            //             >
            //                 View
            //             </Button>
            //         );
            //     },
            // }
        ],
        []
    )

    return (
        <>
            <div className="space-y-2 font-semibold">
                {/* accordian  */}
                {tableData.map((data: any, index: any) =>
                    <div key={index} className='flex'>
                        <div className='w-full'>
                            <button
                                type="button"
                                className="custAccoHead flex w-full items-center px-3 py-2 text-white-dark dark:bg-[#1b2e4b]"
                                onClick={() => setAccordianOpen(accordianOpen === data[tableType_] ? '' : data[tableType_])}
                            >
                                <div className={`ltr:ml-auto rtl:mr-auto${accordianOpen === data[tableType_] ? ' rotate-180' : ''}`}>
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M19 9L12 15L5 9"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <span className="mx-2">{data[tableType_]}</span>
                            </button>

                            <div className='p-pl-table-item'>
                                <AnimateHeight duration={300} height={accordianOpen === data[tableType_] ? 'auto' : 0}>
                                    <MantineReactTable
                                        columns={data[tableType_] === "Summary" ? summary_columns : tableType === 'cat_cust_desct' ? category_summary_columns : columns}
                                        // columns={(data[tableType_] === "Summary" || tableType === 'cat_cust_desct') ? Summary_columns : columns}
                                        data={data?.tableData}
                                        enablePagination={false}
                                        enableStickyHeader={true}
                                        initialState={{ pagination: { pageSize: 12 } }}
                                        enableColumnResizing={true}
                                        enableTopToolbar={false}
                                        enableSorting={false}
                                        enableColumnActions={false}
                                        mantineTableContainerProps={{
                                            style: { overflowX: 'hidden' }
                                        }}
                                        mantineTableBodyRowProps={({ row }) => {
                                            const isLastRow = row.index === data?.tableData.length - 1;
                                            return {
                                                style: {
                                                    backgroundColor: isLastRow ? 'red' : 'white',
                                                    fontWeight: isLastRow ? 'bold' : 'normal',
                                                },
                                            };
                                        }}
                                    />
                                </AnimateHeight>
                            </div>
                        </div>

                        {/* Details button */}
                        {tableType === "dealer" || tableType === 'cat_cust_desct' ?
                            <></>
                            :
                            <div className="ml-auto">
                                <button
                                    type="button"
                                    className='custAccoHead px-3 py-2 text-white-dark dark:bg-[#1b2e4b]'
                                    onClick={() => {
                                        modalOpen(true);
                                        (tableType_ === "regn" && data.regn === "Summary") ? api({ report_grp_level: "CAT_SMRY", regn: "", terr: "", cat: "" }) :
                                            (tableType_ === "regn" && data.regn !== "Summary") ? api({ report_grp_level: "TERR", regn: data.regn, terr: "", cat: "" }) :
                                                tableType_ === "terr_name" ? api({ report_grp_level: "CATEGORY", regn: data.regn, terr: data.terr_code, cat: "" }) :
                                                    tableType_ === "cat_cust_desc" && api({ report_grp_level: "DLR", regn: data.regn, terr: data.terr_code, cat: data.cat_cust_desc })

                                    }}>
                                    Details
                                </button>
                            </div>
                        }
                    </div >
                )}
            </div >
        </>
    )
}

export default OutstandingTableComponent