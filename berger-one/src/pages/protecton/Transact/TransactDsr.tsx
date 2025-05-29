import { CiSearch } from "react-icons/ci";
import { useEffect, useState, useMemo } from "react";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import * as dsr from '../../../services/api/protectonTransact/TransactDsr';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';

const TransactDsr = () => {
    const [dsrDate, setDsrDate] = useState<Date | null>(null);
    const [viewBy, setViewBy] = useState("YTD");
    const [loading, setLoading] = useState(false);
    const [tableData, setData] = useState<any>([]);

    let auth = JSON.parse(localStorage.getItem('auth'));
    let user_id = auth.state.userDetails.user_id;

    const handleSearch = (e: any) => {
        e.preventDefault();
        GetUserApplDlrSales();
    };

    useEffect(() => {
        // GetUserApplDlrSales();

    }, [])


    useEffect(() => {
        console.log("State `tableData` is now:", tableData);
    }, [tableData]);

    const GetUserApplDlrSales = async () => {
        setLoading(true);
        const payload: any = {
            asOnDate: dsrDate,
            repType: viewBy,
            report_grp_level: "Summary",
            selected_user: user_id,
        };
        try {
            const response: any = await dsr.UserApplDlrSales(payload);
            if (response && response.data != null && response.data != undefined) {
                console.log("UserApplDlrSales Response:", response.data);
                setData(response.data.table);
            }
            else setData([]);
        } catch (error) {
            return;
        }
        setLoading(false);
    }

    type dsrType = {
        regn: string;
    }

    const columns = useMemo<MRT_ColumnDef<dsrType>[]>(
        () => [
            {
                accessorKey: 'regn',
                header: 'Region',
                size: 50,
            },
            {
                accessorKey: 'gr_val',
                header: 'gr_val',
                size: 50,
            },
            {
                accessorKey: 'gr_vol',
                header: 'gr_vol',
                size: 50,
            },
            {
                accessorKey: 'ly_val',
                header: 'ly_val',
                size: 50,
            },
            {
                accessorKey: 'ly_val_fm',
                header: 'ly_val_fm',
                size: 50,
            },
            {
                accessorKey: 'ly_val_other',
                header: 'ly_val_other',
                size: 50,
            },
            {
                accessorKey: 'ly_val_tiger',
                header: 'ly_val_tiger',
                size: 50,
            },
            {
                accessorKey: 'ly_vol',
                header: 'ly_vol',
                size: 50,
            },
            {
                accessorKey: 'ly_vol_fm',
                header: 'ly_vol_fm',
                size: 50,
            },
            {
                accessorKey: 'ly_vol_other',
                header: 'ly_vol_other',
                size: 50,
            },
            {
                accessorKey: 'ly_vol_tiger',
                header: 'ly_vol_tiger',
                size: 50,
            },
            {
                accessorKey: 'tg_val',
                header: 'tg_val',
                size: 50,
            },
            {
                accessorKey: 'tg_val_other',
                header: 'tg_val_other',
                size: 50,
            },
            {
                accessorKey: 'tg_val_tiger',
                header: 'tg_val_tiger',
                size: 50,
            },
            {
                accessorKey: 'tg_vol',
                header: 'tg_vol',
                size: 50,
            },
            {
                accessorKey: 'ty_val',
                header: 'ty_val',
                size: 50,
            },
            {
                accessorKey: 'ty_val_other',
                header: 'ty_val_other',
                size: 50,
            },
            {
                accessorKey: 'ty_val_tiger',
                header: 'ty_val_tiger',
                size: 50,
            },
            {
                accessorKey: 'ty_vol',
                header: 'ty_vol',
                size: 50,
            },
            {
                accessorKey: 'ty_vol_other',
                header: 'ty_vol_other',
                size: 50,
            },
            {
                accessorKey: 'ty_vol_tiger',
                header: 'ty_vol_tiger',
                size: 50,
            }
        ],
        []
    );

    const table = useMantineReactTable<dsrType>({
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

    return (
        <>
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-1">
                <h5 className="text-lg font-semibold dark:text-white-light">Transact DSR</h5>
            </div>

            <div className="bg-white rounded-lg px-4 py-2 shadow-md mb-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                        <label htmlFor="dsr-date" className="block text-sm font-semibold mb-1">DSR Date:</label>
                        <Flatpickr
                            value={dsrDate ? [dsrDate] : []}
                            onChange={(dates: Date[]) => setDsrDate(dates[0] || null)}
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
                                checked={viewBy === "YTD"}
                                onChange={e => setViewBy(e.target.value)}
                                className="mr-1"
                            />
                            YTD
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="viewBy"
                                value="MTD"
                                checked={viewBy === "MTD"}
                                onChange={e => setViewBy(e.target.value)}
                                className="mr-1"
                            />
                            MTD
                        </label>
                    </div>

                    <div className="flex items-center justify-end md:col-span-2">
                        <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm flex items-center space-x-2"
                            onClick={handleSearch}
                        >
                            <CiSearch />
                            <span>Search</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mb-2 max-h-[45vh] overflow-y-auto">
                <MantineReactTable table={table} />
            </div>

            {loading && (
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
            )}
        </>
    );
}

export default TransactDsr;