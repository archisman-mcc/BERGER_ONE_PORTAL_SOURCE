import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table'
import React, { useEffect, useMemo, useRef } from 'react'
import { MdOutlineClose } from "react-icons/md";
import { IoEyeSharp } from 'react-icons/io5';
import PurchaseOrderDeliveryPopup from './PurchaseOrderDeliveryPopup';
import { GetPotentialTrackingDeliverySchedule } from '../../../../services/api/protectonLead/PotentialLead';
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Select from 'react-select';
import { GetPCASkuBillingDetails, PCADtlsBillto } from '../../../../services/api/protectonTransact/TransactPotentialLead';
import { GetSKUList } from '../../../../services/api/protectonEpca/EpcaDetails';
import Flatpickr from 'react-flatpickr';

const PurchaseOrderPopup = ({ rowData, purchaseOrderData, onClose }: any) => {
    // console.log('rowData in PO popup:', rowData);
    const [isPurchaseOrderDeliveryPopupOpen, setIsPurchaseOrderDeliveryPopupOpen] = React.useState(false);
    const [purchaseOrderDeliveryData, setPurchaseOrderDeliveryData] = React.useState([]);
    const [newPurchaseOrderData, setNewPurchaseOrderData]: any = React.useState({
        bill_to: '', po_no: '', po_date: new Date().toLocaleDateString('en-GB'), sku: '', rate: null, nop: null, reqFrom: '', remarks: '', validfrom: new Date().toLocaleDateString('en-GB'),
        validto: new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString('en-GB'),
    });
    const [billToData, setBillToData] = React.useState([]);
    const [sku, setSKU] = React.useState<any>([]);
    const [skuSrchData, setSkuSrchData] = React.useState<any>("");
    const [skuDetails, setSkuDetails] = React.useState<any>(null);
    const [skuDgData, setSkuDgData] = React.useState<any>([]);

    var purchaseOrderRowData: any = useRef(null);

    const GetPotentialTrackingDeliveryScheduleAPIcall = async (payload: any) => {
        try {
            const response: any = await GetPotentialTrackingDeliverySchedule(payload);
            if (response?.statusCode === 200) {
                setPurchaseOrderDeliveryData(response?.data?.table.map((res: any) => ({ ...res, newRowId: 0 })) || []);
            }
        } catch (error) {
            return;
        }
    }

    const BillToListAPICALL = async () => {
        const payload = {
            depot_code: rowData?.depot_code,
            dealer_code: rowData?.dealer_code,
            pd_appl_yn: ""
        }
        try {
            const response: any = await PCADtlsBillto(payload);
            if (response?.statusCode === 200) {
                setBillToData(response?.data?.table || []);
            }
        } catch (error) {
            return;
        }
    }

    const GetSkuData = async ({ PrefixText }: any) => {
        const data: any = {
            app_id: 15,
            PrefixText: PrefixText
        };
        try {
            const response: any = await GetSKUList(data);
            setSKU(response.data.table || [])
        } catch (error) {
            console.log(error)
        }
        setSkuSrchData('');
    };

    const GetPCASkuBillingDetailsAPICALL = async (payload: any) => {
        try {
            const response: any = await GetPCASkuBillingDetails(payload);
            if (response?.statusCode === 200) {
                // const skuData = response?.data?.table[0];
                setSkuDetails(response?.data?.table[0]);
            }
        } catch (error) {
            return;
        }
    }

    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'po_no',
                header: 'PO Number',
                size: 60,
            },
            {
                accessorKey: 'po_date',
                header: 'PO Date',
                size: 60,
            },
            {
                accessorKey: 'sku_code',
                header: 'SKU Code',
                size: 60,
            },
            {
                accessorKey: 'rate',
                header: 'Rate/UOM',
                size: 60,
            },
            {
                accessorKey: 'qty',
                header: 'NOP',
                size: 60,
            },
            {
                header: 'Action',
                size: 20,
                Cell: ({ cell }) => {
                    return (
                        <>
                            <span
                                className='cursor-pointer text-primary text-xl mr-2'
                                title="View"
                            >
                                <div className="flex items-center justify-center">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={() => {
                                            purchaseOrderRowData.current = cell.row.original;
                                            GetPotentialTrackingDeliveryScheduleAPIcall({ order_id: cell.row.original.order_id, sku_code: cell.row.original.sku_code });
                                            setIsPurchaseOrderDeliveryPopupOpen(true);
                                        }}
                                    >
                                        <IoEyeSharp />
                                    </button>
                                </div>
                            </span>
                        </>
                    );
                },
            },
        ],
        []
    );

    const handleDeleteRow = React.useCallback((id: number) => {
        setSkuDgData((prev: any[]) => prev.filter((pur: any) => pur?.newRowId !== id));
    }, [setSkuDgData]);

    const table = useMantineReactTable({
        columns,
        data: purchaseOrderData,
        enableColumnResizing: true,
        enableTopToolbar: false,
        enableSorting: false,
        enableColumnActions: false,
        columnResizeMode: 'onChange',
        mantineTableContainerProps: {
            style: {
                overflow: 'auto',
                maxHeight: '100%',
            },
        }
    });

    const skuColumns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'sku_name',
                header: 'SKU',
                size: 60,
            },
            {
                accessorKey: 'rate',
                header: 'Rate/UOM',
                size: 60,
            },
            {
                accessorKey: 'qty',
                header: 'NOP',
                size: 60,
            },
            {
                header: 'Action',
                size: 20,
                Cell: ({ cell }) => {
                    return (
                        <>
                            <div
                                className='cursor-pointer text-primary text-xl mr-2 h-full'
                                title="View"
                            >
                                {cell.row.original.newRowId > 0 &&
                                    <div className="w-full h-full flex items-center justify-center">
                                        <MdDelete
                                            color='red'
                                            onClick={() => {
                                                handleDeleteRow(cell.row.original.newRowId)
                                            }} />
                                    </div>
                                }
                            </div>
                        </>
                    );
                },
            },
        ],
        []
    );

    const skuTable = useMantineReactTable({
        columns: skuColumns,
        data: skuDgData.map((item: any, index: number) => ({ ...item, newRowId: index + 1 })),
        enableColumnResizing: true,
        enableTopToolbar: false,
        enableSorting: false,
        enableColumnActions: false,
        columnResizeMode: 'onChange',
        mantineTableContainerProps: {
            style: {
                overflow: 'auto',
                maxHeight: '100%',
            },
        }
    });

    const convertToDate = (dateStr: any) => {
        if (typeof dateStr === 'string') {
            const [day, month, year] = dateStr.split('/');
            return new Date(`${year}-${month}-${day}`);
        }
        return dateStr;
    };

    const getMaxValidTillDate = (validFrom: any) => {
        if (!validFrom) return undefined;
        const fromDate = convertToDate(newPurchaseOrderData.validfrom);
        return new Date(fromDate.setMonth(fromDate.getMonth() + 3));
    };

    // Calculate the maxDate for the "Valid Till" field based on the "Valid From" date
    const getMinValidTillDate = (validFrom: any) => {
        if (!validFrom) return undefined;
        const fromDate = convertToDate(newPurchaseOrderData.validfrom);
        return new Date(fromDate.setMonth(fromDate.getMonth()));
    };

    const formatDateToString = (date: any) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };


    useEffect(() => {
        BillToListAPICALL();
    }, [])

    useEffect(() => {
        skuSrchData.length > 2 && GetSkuData({ PrefixText: skuSrchData })
    }, [skuSrchData])

    useEffect(() => {
        console.log(newPurchaseOrderData)
    }, [newPurchaseOrderData])
    // useEffect(() => {
    //     console.log(purchaseOrderDeliveryData)
    // }, [purchaseOrderDeliveryData])

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-none shadow-lg w-screen h-screen relative overflow-hidden flex flex-col">
                    <span className="absolute top-3 right-3 px-3 py-1 rounded cursor-pointer" ><MdOutlineClose color="red" onClick={() => onClose()} /></span>
                    <p className="text-xl font-bold pr-12">Purchase Order List</p>
                    <p className="text-sm pr-12">{rowData?.ptm_project_name}</p>
                    <p className="text-sm pr-12">{rowData?.region}</p>
                    <p className="text-sm pr-12">{rowData?.ptm_createdon}</p>
                    <p className="text-sm pr-12">Status: {rowData?.work_status_disp}</p>
                    <p className="text-sm pr-12">Depot: {rowData?.depot_code}: {rowData?.depot_name}</p>
                    <p className="text-sm pr-12">Dealer: {rowData?.dealer_name}</p>

                    <hr className="my-4" />
                    <div className="mt-2">
                        <p className="text-base font-semibold">Billing Information</p>
                        <div className="mt-2 rounded-md border border-gray-200 bg-gray-50 p-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Bill To</label>
                                    <Select
                                        className="text-sm"
                                        isSearchable={true}
                                        options={billToData.map((d: any) => ({
                                            value: d.bill_to,
                                            label: d.bill_to_name,
                                        }))}
                                        value={newPurchaseOrderData.bill_to}
                                        onChange={(event: any) => setNewPurchaseOrderData((pre: any) => ({ ...pre, bill_to: event }))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">PO No.</label>
                                    <input
                                        type="number"
                                        placeholder="Enter PO Number"
                                        className="border rounded form-input text-sm no-spinner w-full"
                                        value={newPurchaseOrderData?.po_no}
                                        onChange={(e) => setNewPurchaseOrderData((pre: any) => ({ ...pre, po_no: Number(e.target.value) }))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">PO Date</label>
                                    <Flatpickr
                                        name="po_date"
                                        value={convertToDate(newPurchaseOrderData.po_date)}
                                        autoComplete="off"
                                        options={{
                                            dateFormat: 'Y-m-d', // Actual input value format (ISO format)
                                            altInput: true, // Enables alternative display input
                                            altFormat: 'd/m/Y', // Display format for the user
                                        }}
                                        placeholder="PO Date"
                                        className="tableInput" // Disable the Valid From field
                                        onChange={(e) => setNewPurchaseOrderData((pre: any) => ({ ...pre, po_date: formatDateToString(e[0]) }))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Search SKU</label>
                                    <Select
                                        className="text-sm"
                                        value={newPurchaseOrderData.sku}
                                        options={sku.map((d: any) => ({ value: d.sku_code, label: d.sku_desc }))}
                                        onInputChange={(inputValue) => setSkuSrchData(inputValue)}
                                        onChange={(event: any) => {
                                            setNewPurchaseOrderData((pre: any) => ({ ...pre, sku: event }))
                                            GetPCASkuBillingDetailsAPICALL({ billto_code: newPurchaseOrderData?.bill_to?.value, depot_code: rowData?.depot_code, sku_code: event?.value });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="mt-3 text-sm text-gray-700">
                                {newPurchaseOrderData.sku && (
                                    <p className="font-medium">{`${newPurchaseOrderData.sku?.label} - ${newPurchaseOrderData.sku?.value}`}</p>
                                )}
                                <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    {skuDetails?.sku && (
                                        <div className="text-xs"><span className="font-semibold">SKU:</span> {skuDetails?.sku}</div>
                                    )}
                                    {skuDetails?.min_rate && (
                                        <div className="text-xs"><span className="font-semibold">Declared PCA (Rate/UOM):</span> {skuDetails?.min_rate}</div>
                                    )}
                                    {skuDetails?.pd_rate && (
                                        <div className="text-xs"><span className="font-semibold">PD Rate/UOM:</span> {skuDetails?.pd_rate}</div>
                                    )}
                                </div>
                            </div>
                            {/* {skuDetails && */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-7 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Rate/UOM:</label>
                                    <input
                                        type="number"
                                        placeholder="Enter Rate/UOM"
                                        className="border rounded form-input text-sm no-spinner w-full"
                                        value={newPurchaseOrderData?.rate}
                                        onChange={(e) => setNewPurchaseOrderData((pre: any) => ({ ...pre, rate: Number(e.target.value) }))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">NOP:</label>
                                    <input
                                        type="number"
                                        placeholder="Enter NOP"
                                        className="border rounded form-input text-sm no-spinner w-full"
                                        value={newPurchaseOrderData?.nop}
                                        onChange={(e) => setNewPurchaseOrderData((pre: any) => ({ ...pre, nop: Number(e.target.value) }))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Required From</label>
                                    <Select
                                        className="text-sm"
                                        isSearchable={true}
                                        options={[{ value: '', label: 'No Source' }]}
                                        value={newPurchaseOrderData.reqFrom}
                                        onChange={(event: any) => setNewPurchaseOrderData((pre: any) => ({ ...pre, reqFrom: event }))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Remarks:</label>
                                    <input
                                        type="number"
                                        placeholder="Enter Remarks"
                                        className="border rounded form-input text-sm no-spinner w-full"
                                        value={newPurchaseOrderData?.remarks}
                                        onChange={(e) => setNewPurchaseOrderData((pre: any) => ({ ...pre, remarks: Number(e.target.value) }))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Valid From:</label>
                                    <Flatpickr
                                        name="validfrom"
                                        value={convertToDate(newPurchaseOrderData.validfrom)}
                                        autoComplete="off"
                                        options={{
                                            dateFormat: 'Y-m-d', // Actual input value format (ISO format)
                                            altInput: true, // Enables alternative display input
                                            altFormat: 'd/m/Y', // Display format for the user
                                        }}
                                        placeholder="Valid From"
                                        disabled={true}
                                        className="tableInput" // Disable the Valid From field
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Valid To:</label>
                                    <Flatpickr
                                        name="validto"
                                        value={convertToDate(newPurchaseOrderData.validto)}
                                        // autoComplete="off"
                                        options={{
                                            dateFormat: 'Y-m-d', // Actual input value format (ISO format)
                                            altInput: true, // Enables alternative display input
                                            altFormat: 'd/m/Y', // Display format for the user
                                            minDate: getMinValidTillDate(newPurchaseOrderData.validfrom),
                                            maxDate: getMaxValidTillDate(newPurchaseOrderData.validfrom),
                                        }}
                                        placeholder="Valid To"
                                        className="tableInput"
                                        onChange={(e) => setNewPurchaseOrderData((pre: any) => ({ ...pre, validto: formatDateToString(e[0]) }))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">.</label>
                                    <button
                                        type="button"
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs inline-flex items-center"
                                        id="addNewDropdownBtn"
                                        onClick={() => {
                                            setSkuDgData((pre: any) => [...pre,
                                            {
                                                sku_code: newPurchaseOrderData.sku?.value,
                                                sku_name: `${newPurchaseOrderData.sku?.label} (${newPurchaseOrderData.sku?.value})`,
                                                rate: newPurchaseOrderData.rate,
                                                qty: newPurchaseOrderData.nop,
                                            }
                                            ])
                                        }}
                                    >
                                        <FaPlus className="mr-2" /> <span>Add</span>
                                    </button>
                                </div>
                            </div>
                            <p>Selected SKU</p>
                            <div className="flex-1 min-h-0 overflow-auto">
                                <MantineReactTable table={skuTable} />
                            </div>
                            {/* } */}
                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs inline-flex items-center"
                                    id="addNewDropdownBtn"
                                    onClick={() => { }}
                                >
                                    <FaPlus className="mr-2" /> <span>Add New Purchase Order</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <hr className="my-4" />

                    <div className="flex-1 min-h-0 overflow-auto">
                        <MantineReactTable table={table} />
                    </div>
                </div>
            </div >
            {isPurchaseOrderDeliveryPopupOpen &&
                <PurchaseOrderDeliveryPopup onClose={() => { setIsPurchaseOrderDeliveryPopupOpen(false); setPurchaseOrderDeliveryData([]); }} rowData={rowData} purchaseOrderRowData={purchaseOrderRowData?.current} purchaseOrderDeliveryData={purchaseOrderDeliveryData} setPurchaseOrderDeliveryData={setPurchaseOrderDeliveryData} />
            }
        </>
    )
}

export default PurchaseOrderPopup