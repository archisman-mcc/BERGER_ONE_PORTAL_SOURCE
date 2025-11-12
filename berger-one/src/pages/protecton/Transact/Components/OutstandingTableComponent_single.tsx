import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { useMemo, useState } from 'react';
import { Button } from '@mantine/core';
import { FiEye } from "react-icons/fi";

const OutstandingTableComponent_single = ({ tableType, tableData, modalOpen, api, slab, terr_code, setdtrng, setTerr_code }: any) => {
    // console.log(terr_code)

    const columns = useMemo<MRT_ColumnDef<any>[]>(() =>
        [
            {
                accessorKey: tableType,
                header: tableType === "terr_name" ? 'Territory' : tableType === "cat_cust_desc" ? 'Category' : 'Contractor',
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
                        <span className='text-green-600'>{cell.row.original?.variance.toFixed(0)}</span>
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
                                setTerr_code(row.original?.terr_code || '');
                                setdtrng(row.original?.dtrange || '');
                                modalOpen(true);
                                if (tableType === "terr_name") {
                                    api({ report_grp_level: "CATEGORY", regn: row.original.regn, terr: row.original?.terr_code, cat: "", slab: slab })
                                } else if (tableType === "cat_cust_desc") {
                                    api({ report_grp_level: "DLR", regn: row.original.regn, terr: terr_code, cat: row.original.cat_cust_desc, slab: slab })
                                } else api({ dlrcode: row.original.dlr_dealer_code, regn: row.original.regn, terr: terr_code, cat: row.original.cat_cust_desc, slab: slab })
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

    const columns_invoice = useMemo<MRT_ColumnDef<any>[]>(() =>
        [
            {
                accessorKey: 'os_trx_no',
                header: 'TRX NO',
                size: 50,
            },
            {
                accessorKey: 'os_trx_date',
                header: 'DATE',
                size: 50,
            },
            {
                accessorKey: 'os_amount',
                header: 'O/S AMT',
                size: 50,
            },
            {
                accessorKey: 'os_age',
                header: 'AGE',
                size: 50,
            }
        ],
        []
    );

    return (
        <div className='p-pl-table-item'>
            <MantineReactTable
                columns={tableType === "invoice" ? columns_invoice : columns}
                data={tableData}
                enableStickyHeader={true}
                enablePagination={false}
                initialState={{ pagination: { pageSize: 12 } }}
                enableColumnResizing={true}
                enableTopToolbar={false}
                enableSorting={false}
                enableColumnActions={false}
                mantineTableContainerProps={{
                    style: { overflowX: 'hidden' }
                }}
            // mantineTableBodyRowProps={({ row }) => {
            //     const isLastRow = row.index === tableData.length - 1;
            //     return {
            //         style: {
            //             backgroundColor: isLastRow ? 'red' : 'white',
            //             fontWeight: isLastRow ? 'bold' : 'normal',
            //         },
            //     };
            // }}
            />
        </div>
    )
}

export default OutstandingTableComponent_single