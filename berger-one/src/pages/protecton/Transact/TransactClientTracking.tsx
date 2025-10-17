import React, { useEffect, useMemo, useState } from 'react';
import Flatpickr from 'react-flatpickr';
// import AsyncSelectBox from './Components/AsyncSelectBox';
import { GetCTDealer, GetCTDetail } from '../../../services/api/protectonTransact/TransactClientTracking';
import AsyncMultiSelectBox from './Components/AsyncMultiSelectBox';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';

const TransactClientTracking = () => {
    const [filterData, setFilterData] = useState({ 
        dsrDate: (() => {
            const today = new Date();
            return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        })(), 
        viewBy: "MTD" 
    });
    const [loading, setLoading] = useState(false);
    const [listDataHide, setListDataHide] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [serachedData, setSerachedData] = useState('');
    const [multiselectData, setMultiselectData] = useState<any[]>([]);
    const [CTDetailData, setCTDetailData] = useState<any[]>([]);
    const [outstandingData, setOutstandingData]: any = useState([]);

    const payload = {
        app_id: 15,
        regn: "",
        depot: "",
        terr: "",
        user_group: ""
    }

    const GetCTDetailAPICALL = async () => {
        setLoading(true);
        const payload: any = {
            asondate: filterData?.dsrDate,
            repType: filterData?.viewBy,
            client: selectedItems.map(Number).join(',') + ','
        }
        try {
            const response: any = await GetCTDetail(payload);
            if (response.data) {
                const roundVal = (number: any) => Math.round(parseFloat(number))
                const tableData = response.data.table.map((t: any) => ({
                    ...t,
                    gr_val: roundVal(((t?.ty_val - t?.ly_val) / t?.ly_val) * 100) || 0,
                    gr_vol: roundVal(((t?.ty_vol - t?.ly_vol) / t?.ly_vol) * 100) || 0,
                    gr_val_other: roundVal(((t?.ty_val_other - t?.ly_val_other) / t?.ly_val_other) * 100) || 0,
                    gr_vol_other: roundVal(((t?.ty_vol_other - t?.ly_vol_other) / t?.ly_vol_other) * 100) || 0,
                    gr_val_tiger: roundVal(((t?.ty_val_tiger - t?.ly_val_tiger) / t?.ly_val_tiger) * 100) || 0,
                    gr_vol_tiger: roundVal(((t?.ty_vol_tiger - t?.ly_vol_tiger) / t?.ly_vol_tiger) * 100) || 0,
                }))
                setCTDetailData(tableData || []);
                ////////////////////////////////////
                const dataMaker = async () => {
                    const gross: any = [];
                    const net: any = [];
                    const age: any = [
                        { age: '0-30' },
                        { age: '31-60' },
                        { age: '61-90' },
                        { age: '91-120' },
                        { age: '121-150' },
                        { age: '151-180' },
                        { age: '181-360' },
                        { age: '361-720' },
                        { age: '720' },
                        { age: 'TOTAL' },
                        { age: '' },
                        { age: '>120' },
                        { age: '>180' },
                    ];
                    console.log(response.data.table1[0])
                    Object.keys(response.data.table1[0]).map((key) => key.substr(0, 1) === 'g' ? gross.push({ gross: response.data.table1[0][key] }) : key.substr(0, 1) === 'n' && net.push({ net: response.data.table1[0][key] }))

                    const merged: any = [];
                    let sData: any = {};
                    gross.map((item: any, index: string | number) => {
                        console.log(item?.gross)
                        if (index === 9) {
                            sData = {
                                ...item,
                                ...net[index],
                                ...age[index],
                                // ...{ variance: Number(net[index].net) < 0 ? 0 : (Number((net[index].net - item?.gross) / item?.gross) * 100) }
                                ...{ variance: item?.gross === 0 ? 0 : +(((net[index].net - item?.gross) / item?.gross) * 100).toFixed(2) }
                            }
                        }
                        else if (index !== 10)
                            merged.push({
                                ...item,
                                ...net[index],
                                ...age[index],
                                // ...{ variance: Number(net[index].net) < 0 ? 0 : (Number((net[index].net - item?.gross) / item?.gross) * 100) }
                                ...{ variance: item?.gross === 0 ? 0 : +(((net[index].net - item?.gross) / item?.gross) * 100).toFixed(2) }
                            })
                    });

                    return [...merged, sData]
                }
                const getFinalData = async () => {
                    const promises = response.data.table1.map(() =>
                        dataMaker().then((table2Data) => table2Data)
                    );
                    const manipulatedData = await Promise.all(promises);
                    return manipulatedData;
                };
                getFinalData().then((getData) => setOutstandingData(...getData));
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            return;
        }
    };

    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                header: 'Sales',
                columns: [
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
                            }
                        ]
                    },
                ]
            },
            {
                header: 'Tiger Product',
                columns: [
                    {
                        header: 'VALUE (IN LACS)',
                        columns: [
                            {
                                accessorKey: 'ly_val_tiger',
                                header: 'LY(MTD)',
                                size: 50,
                            },
                            {
                                accessorKey: 'ty_val_tiger',
                                header: 'TY',
                                size: 50,
                            },
                            {
                                accessorKey: 'gr_val_tiger',
                                header: 'GRW% (MTD)',
                                size: 50
                            },
                        ]
                    },
                    {
                        header: 'VOLUME (IN KL)',
                        columns: [
                            {
                                accessorKey: 'ly_vol_tiger',
                                header: 'LY(MTD)',
                                size: 50,
                            },
                            {
                                accessorKey: 'ty_vol_tiger',
                                header: 'TY',
                                size: 50,
                            },
                            {
                                accessorKey: 'gr_vol_tiger',
                                header: 'GRW% (MTD)',
                                size: 50,
                            }
                        ]
                    },
                ]
            },
            {
                header: 'Protecton Other',
                columns: [
                    {
                        header: 'VALUE (IN LACS)',
                        columns: [
                            {
                                accessorKey: 'ly_val_other',
                                header: 'LY(MTD)',
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
                                size: 50
                            },
                        ]
                    },
                    {
                        header: 'VOLUME (IN KL)',
                        columns: [
                            {
                                accessorKey: 'ly_vol_other',
                                header: 'LY(MTD)',
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
                            }
                        ]
                    },
                ]
            },
        ],
        []
    );

    const table = useMantineReactTable({
        columns,
        data: CTDetailData || [],
        enableColumnResizing: true,
        enableTopToolbar: false,
        enablePagination: false,
        enableSorting: false,
        enableColumnActions: false,
        columnResizeMode: 'onChange',
        mantineTableContainerProps: {
            style: {
                overflowX: 'hidden', // hides horizontal scrollbar
            },
        }
    });

    const outstandingTableColumns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                header: 'Outstanding',
                columns: [
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
                                <span className='text-red-600'>{cell.row.original.variance.toFixed(0)}</span>
                            )
                        }
                    }
                ]
            }

        ],
        []
    );


    useEffect(() => {
        console.log(outstandingData)
    }, [outstandingData])

    useEffect(() => {
        selectedItems.length > 0 && GetCTDetailAPICALL()
    }, [selectedItems])


    return (
        <>
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-1">
                <h5 className="text-lg font-semibold dark:text-white-light">Transact Client Tracking</h5>
            </div>

            <div className="bg-white rounded-lg px-4 py-2 shadow-md mb-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label htmlFor="dsr-date" className="block text-sm font-semibold mb-1">Tracking Date:</label>
                        <Flatpickr
                            value={filterData.dsrDate || ''}
                            onChange={(dates: Date[]) => setFilterData((pre: any) => ({ ...pre, dsrDate: dates[0] || '' }))}
                            options={{
                                dateFormat: 'd/m/Y',
                            }}
                            className="tableInput"
                        />
                    </div>
                    <div>
                        <span className="block text-sm font-semibold mb-1">View by:</span>
                        <label className="mr-4">
                            <input
                                type="radio"
                                name="viewBy"
                                value="YTD"
                                checked={filterData?.viewBy === "YTD"}
                                onChange={e => setFilterData((pre: any) => ({ ...pre, viewBy: e.target.value }))}
                                className="mr-1"
                            />
                            YTD
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="viewBy"
                                value="MTD"
                                checked={filterData?.viewBy === "MTD"}
                                onChange={e => setFilterData((pre: any) => ({ ...pre, viewBy: e.target.value }))}
                                className="mr-1"
                            />
                            MTD
                        </label>
                    </div>
                    <div>
                        <label htmlFor="dsr-date" className="block text-sm font-semibold mb-1">Search person & add to list:</label>
                        <AsyncMultiSelectBox api={GetCTDealer} payloadPrefixText="dealer" apiPayload={payload} selectedItems={selectedItems} setSelectedItems={setSelectedItems} query={serachedData} setQuery={setSerachedData} data={multiselectData} setData={setMultiselectData} listDataHide={listDataHide} setListDataHide={setListDataHide} />
                        <h6>{selectedItems.length > 0 && `${selectedItems.length} Client Selected`}</h6>
                    </div>
                </div>
            </div>

            <div className="max-h-[50vh] overflow-y-auto mb-2">
                <MantineReactTable table={table} />
            </div>

            <div className="max-h-[90vh] overflow-y-auto mb-2">
                <MantineReactTable
                    columns={outstandingTableColumns}
                    data={outstandingData}
                    enablePagination={false}
                    initialState={{ pagination: { pageIndex: 0, pageSize: 12 } }}
                    enableColumnResizing={true}
                    enableTopToolbar={false}
                    enableSorting={false}
                    enableColumnActions={false}
                    mantineTableContainerProps={{
                        style: { overflowX: 'hidden' }
                    }}
                    mantineTableBodyRowProps={({ row }) => {
                        const isLastRow = row.index === outstandingData.length - 1;
                        return {
                            style: {
                                backgroundColor: isLastRow ? 'red' : 'white',
                                fontWeight: isLastRow ? 'bold' : 'normal',
                            },
                        };
                    }}
                />
            </div>

            {/* {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
                    <div role="status" className="animate-spin">
                        <svg aria-hidden="true" className="h-8 w-8 fill-blue-600 text-gray-200" viewBox="0 0 100 101" fill="none">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only text-white">Please Wait...</span>
                    </div>
                </div>
            )} */}
        </>
    )
}

export default TransactClientTracking