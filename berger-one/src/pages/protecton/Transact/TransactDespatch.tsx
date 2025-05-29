import { useEffect, useState, useMemo } from "react";
import * as despatch from '../../../services/api/protectonTransact/TransactDespatch';
import * as common from '../../../services/api/users/UserProfile';
import { UseAuthStore } from "../../../services/store/AuthStore";
import Select from 'react-select';
import * as Epca from '../../../services/api/protectonEpca/EpcaList';
import { CiSearch } from "react-icons/ci"
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';

const TransactDespatch = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>({
        regionList: [],
        depotList: [],
        selectedRegion: '',
        selectedDepot: '',
        valueInPage: 7,
        despatchData: []
    });

    const user = UseAuthStore((state: any) => state.userDetails);

    const GetRegion = async () => {
        setLoading(true);
        const data: any = {
            user_group: user.group_code,
            app_id: '15',
            user_appl_yn: 'Y'
        };
        try {
            const response: any = await common.GetProtectonRegion(data);
            setData((prevData: any) => ({
                ...prevData,
                regionList: response.data.table || [],
            }));

        } catch (error) {
            return;
        }
        setLoading(false);
    }

    const Getdepot = async (region: string) => {
        setLoading(true);
        const payload: any = {
            user_id: user.user_id,
            region: region,
            app_id: '15',
        };
        try {
            const response: any = await Epca.GetApplicableDepotList(payload);
            setData((prevData: any) => ({
                ...prevData,
                depotList: response.data || [],
                selectedRegion: region,
                selectedDepot: ''
            }));
        } catch (error) {
            return;
        }
        setLoading(false);
    }

    const GetDespatchDetails = async () => {
        setLoading(true);
        const payload: any = {
            region: data.selectedRegion,
            depot_code: data.selectedDepot,
            days: data.valueInPage,
            rep_type: 'SRC',
            pri_sec: 'PRI',
        };
        try {
            const response: any = await despatch.GetDespatchDetails(payload);
            setData((prevData: any) => ({
                ...prevData,
                despatchData: response.data.table || [],
            }));
        } catch (error) {
            return;
        }
        setLoading(false);
    }

    type DespatchType = {
        // set custom column headings
        dealer: string;
        trx_id: number;
        fnl_vol: number;
        status: string;
    };
    const columns = useMemo<MRT_ColumnDef<DespatchType>[]>(
        () => [
            {
                accessorKey: 'dealer',
                header: 'Source',
                size: 50,
            },
            {
                accessorKey: 'trx_id',
                header: 'Ship Id',
                size: 50,
            },
            {
                accessorKey: 'fnl_vol',
                header: 'Vol',
                size: 50,
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 50,
            },
        ],
        []
    );

    const table = useMantineReactTable({
        columns,
        data: data.despatchData,
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

    // New function to handle row logging
    const handleRowAction = (row: any) => {
        console.log(row);
    }

    useEffect(() => {
        GetRegion();
    }, []);

    useEffect(() => {
        console.log("Despatch Data Updated: ", data.despatchData);

    }, [data.despatchData]);

    return (
        <>
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-1">
                <h5 className="text-lg font-semibold dark:text-white-light">Transact Despatch</h5>
            </div>

            <div className="bg-white rounded-lg px-4 py-2 shadow-md mb-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    {/* Region */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Region:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            // Map to the correct properties from API
                            options={data.regionList.map((d: any) => ({
                                value: d.depot_regn,
                                label: d.regn_new,
                            }))}
                            // Display the currently selectedRegion from state
                            value={
                                data.selectedRegion
                                    ? { value: data.selectedRegion, label: data.selectedRegion }
                                    : null
                            }
                            onChange={(event) => {
                                Getdepot(event?.value);
                            }}
                        />
                    </div>

                    {/* Depot */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Depot:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            options={data.depotList.map((d: any) => ({
                                value: d.depot_code,
                                label: d.depot_name,
                            }))}
                            value={
                                data.selectedDepot
                                    ? { value: data.selectedDepot, label: data.depotList.find((d: any) => d.depot_code === data.selectedDepot)?.depot_name }
                                    : null
                            }
                            onChange={(event) => {
                                setData((pre: any) => ({ ...pre, selectedDepot: event?.value }))
                            }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Value in Page:</label>
                        <input
                            type="number"
                            min="0"
                            max="30"
                            value={data.valueInPage}
                            onKeyDown={(e) => {
                                if (["e", "E", "+", "-"].includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            onChange={(e) => {
                                let value = parseInt(e.target.value, 10);
                                if (isNaN(value) || value < 0) {
                                    value = 0;
                                } else if (value > 30) {
                                    value = 30;
                                }
                                setData((prev: any) => ({ ...prev, valueInPage: value }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* Search Button */}

                    <div className="flex items-end space-x-2">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 space-x-2 rounded hover:bg-blue-600 text-sm flex items-center"
                            onClick={(e) => {
                                e.preventDefault();
                                GetDespatchDetails();
                            }}>
                            <CiSearch /> <span>Search</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* <div className="mb-2" style={{ maxHeight: '45vh', overflowY: 'auto' }}>
                <MantineReactTable table={table} />
            </div> */}

            <div className="mb-2" style={{ maxHeight: '45vh', overflowY: 'auto' }}>
                <MantineReactTable
                    table={table}
                    renderRowActions={({ row }) => (
                        <button
                            onClick={() => handleRowAction(row.original)}
                            className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                            Log Row
                        </button>
                    )}
                />
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
};

export default TransactDespatch;
