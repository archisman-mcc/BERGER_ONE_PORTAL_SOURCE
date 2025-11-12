import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table'
import React, { useEffect, useMemo, useRef } from 'react'
import { MdOutlineClose } from "react-icons/md";
import { IoEyeSharp } from 'react-icons/io5';
import PurchaseOrderDeliveryPopup from './PurchaseOrderDeliveryPopup';
import { GetPotentialTrackingDeliverySchedule, InsertePcaDetails_Vr1, PTOrderdtlsSubmit } from '../../../../services/api/protectonLead/PotentialLead';
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Select from 'react-select';
import { GetPCASkuBillingDetails, PCADtlsBillto } from '../../../../services/api/protectonTransact/TransactPotentialLead';
import { GetSKUList } from '../../../../services/api/protectonEpca/EpcaDetails';
import Flatpickr from 'react-flatpickr';
import { commonErrorToast } from '../../../../services/functions/commonToast';
import { UseAuthStore } from '../../../../services/store/AuthStore';
import moment from 'moment';

const PurchaseOrderPopup = ({ rowData, purchaseOrderData, onClose, GetPotentialTrackingOrderDtlsAPIcall }: any) => {
    // console.log('rowData in PO popup:', rowData);
    const [isPurchaseOrderDeliveryPopupOpen, setIsPurchaseOrderDeliveryPopupOpen] = React.useState(false);
    const [purchaseOrderDeliveryData, setPurchaseOrderDeliveryData] = React.useState([]);
    const [newPurchaseOrderData, setNewPurchaseOrderData]: any = React.useState({
        bill_to: '', po_no: '', po_date: new Date().toLocaleDateString('en-GB'), sku: '', rate: null, nop: null, reqFrom: '', remarks: '', validfrom: new Date().toLocaleDateString('en-GB'), validto: new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString('en-GB'), epcaRequest: false
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

    const PTOrderdtlsSubmitAPIcall = async () => {
        const formattedDate = (dateStr: string) => {
            const [day, month, year] = dateStr.split("/");
            const formatted = `${year}-${month}-${day}`;
            return formatted;
        }

        const payload = {
            ptoh_ptm_id: rowData?.ptm_id,
            ptoh_bill_to: newPurchaseOrderData?.bill_to?.value,
            ptoh_po_no: newPurchaseOrderData?.po_no,
            ptoh_po_date: formattedDate(newPurchaseOrderData?.po_date),
            ptOrderdtls: skuDgData
        }
        try {
            const response: any = await PTOrderdtlsSubmit(payload);
            if (response?.statusCode === 200) {
                setNewPurchaseOrderData((pre: any) => ({ ...pre, sku: '', rate: null, nop: null, reqFrom: '', remarks: '', validfrom: new Date().toLocaleDateString('en-GB'), validto: new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString('en-GB') }));
                setSKU([]);
                setSkuSrchData('');
                setSkuDetails(null);
                setSkuDgData([]);
                GetPotentialTrackingOrderDtlsAPIcall({ order_id: rowData?.ptm_id });
            } else {
                commonErrorToast(response?.message || 'Something went wrong while submitting purchase order details');
            }
        } catch (error) {
            return;
        }
    }

    const user = UseAuthStore((state: any) => state.userDetails);
    const EPCAInsertAPIcall = async () => {
        const payload = {
            auto_id: 0,
            billto_code: newPurchaseOrderData?.bill_to?.value,
            sku_id: newPurchaseOrderData.sku?.value,
            factory: "000",
            rate: newPurchaseOrderData.rate,
            qty: newPurchaseOrderData.nop,
            // valid_from: newPurchaseOrderData.validfrom,
            // valid_till: newPurchaseOrderData.validto,
            valid_from: moment(newPurchaseOrderData.validfrom, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            valid_till: moment(newPurchaseOrderData.validto, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            status: "PENDING_DEPOT",
            remarks: newPurchaseOrderData.remarks,
            mrp: skuDetails?.sku_pca,
            projectid: rowData?.ptm_id,
            project_appl_yn: "Y",
            project_name: 'PROTECTON',
            user_id: user.user_id,
            app_name: '',
            end_client_name: '',
            project_type: '',
        }
        // console.log(payload);
        try {
            const response: any = await InsertePcaDetails_Vr1(payload);
            // const response: any = await EPCAInsert(payload);
            if (response?.statusCode === 200) {
                setNewPurchaseOrderData((pre: any) => ({ ...pre, sku: '', rate: null, nop: null, reqFrom: '', remarks: '', validfrom: new Date().toLocaleDateString('en-GB'), validto: new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString('en-GB') }));
                setSKU([]);
                setSkuSrchData('');
                setSkuDetails(null);
                // setSkuDgData([]);
                // GetPotentialTrackingOrderDtlsAPIcall({ order_id: rowData?.ptm_id });
            } else {
                commonErrorToast(response?.message || 'Something went wrong while submitting purchase order details');
            }
        } catch (error) {
            commonErrorToast('Something went wrong while submitting purchase order details');
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

    const table = useMantineReactTable({
        columns,
        data: purchaseOrderData,
        enableColumnResizing: true,
        enableTopToolbar: false,
        enableSorting: false,
        enableColumnActions: false,
        enableStickyHeader: true,
        columnResizeMode: 'onChange',
        mantineTableContainerProps: {
            style: {
                overflow: 'auto',
                maxHeight: '20rem',
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
        data: skuDgData,
        enableColumnResizing: true,
        enableTopToolbar: false,
        enableSorting: false,
        enableColumnActions: false,
        enableStickyHeader: true,
        columnResizeMode: 'onChange',
        mantineTableContainerProps: {
            style: {
                overflow: 'auto',
                maxHeight: '16rem',
            },
        }
    });

    const handleDeleteRow = React.useCallback((id: number) => {
        setSkuDgData((prev: any[]) => prev.filter((pur: any) => pur?.newRowId !== id));
    }, [setSkuDgData]);

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

    // useEffect(() => {
    //     console.log(skuDgData)
    // }, [skuDgData])
    // useEffect(() => {
    //     console.log(purchaseOrderDeliveryData)
    // }, [purchaseOrderDeliveryData])

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-none shadow-lg w-screen h-screen relative overflow-hidden flex flex-col">
                    <div className="flex items-start justify-between border-b pb-3">
                        <div>
                            <p className="text-xl font-bold">Purchase Orders</p>
                            <p className="text-xs text-gray-500">Create and manage purchase orders for this lead</p>
                        </div>
                        <button
                            aria-label="Close"
                            className="px-2 py-1 rounded hover:bg-gray-100"
                            onClick={() => onClose()}
                        >
                            <MdOutlineClose color="red" />
                        </button>
                    </div>
                    <div className="flex-1 min-h-0 overflow-y-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-3 text-sm">
                            <div><span className="text-gray-500">Project:</span> <span className="font-medium">{rowData?.ptm_project_name}</span></div>
                            <div><span className="text-gray-500">Region:</span> <span className="font-medium">{rowData?.region}</span></div>
                            <div><span className="text-gray-500">Created On:</span> <span className="font-medium">{rowData?.ptm_createdon}</span></div>
                            <div><span className="text-gray-500">Status:</span> <span className="font-medium">{rowData?.work_status_disp}</span></div>
                            <div><span className="text-gray-500">Depot:</span> <span className="font-medium">{rowData?.depot_code}: {rowData?.depot_name}</span></div>
                            <div><span className="text-gray-500">Dealer:</span> <span className="font-medium">{rowData?.dealer_name}</span></div>
                        </div>

                        <hr className="my-4" />

                        <div className="mt-2">
                            <p className="text-base font-semibold">Billing & Order Details</p>
                            <div className="mt-2 rounded-md border border-gray-200 bg-gray-50 p-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Bill To<span style={{ color: 'red', marginLeft: '2px' }}>*</span></label>
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
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">PO No.<span style={{ color: 'red', marginLeft: '2px' }}>*</span></label>
                                        <input
                                            type="number"
                                            placeholder="Enter PO Number"
                                            className="border rounded form-input text-sm no-spinner w-full"
                                            value={newPurchaseOrderData?.po_no}
                                            onChange={(e) => setNewPurchaseOrderData((pre: any) => ({ ...pre, po_no: Number(e.target.value) }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">PO Date<span style={{ color: 'red', marginLeft: '2px' }}>*</span></label>
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
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Search SKU<span style={{ color: 'red', marginLeft: '2px' }}>*</span></label>
                                        <Select
                                            isDisabled={newPurchaseOrderData?.bill_to === '' ? true : false}
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
                                {newPurchaseOrderData.sku &&
                                    <div className="mt-3 text-sm text-gray-700">
                                        {newPurchaseOrderData.sku && (
                                            <p className="font-medium">{`${newPurchaseOrderData.sku?.label} (${newPurchaseOrderData.sku?.value})`}</p>
                                        )}
                                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                                            {(skuDetails?.sku != null) && (
                                                <div className="text-xs"><span className="font-semibold">SKU:</span> {skuDetails?.sku}</div>
                                            )}
                                            {(skuDetails?.sku_pca != null) && (
                                                <div className="text-xs"><span className="font-semibold">Declared PCA (Rate/UOM):</span> {skuDetails?.sku_pca}</div>
                                            )}
                                            {(skuDetails?.pd_rate != null) && (
                                                <div className="text-xs"><span className="font-semibold">Special PCA (Rate/UOM):</span> {skuDetails?.pd_rate}</div>
                                            )}
                                        </div>
                                    </div>
                                }


                                <div>
                                    <div className="flex items-center h-9">
                                        <input
                                            id="epcaRequest"
                                            type="checkbox"
                                            className="form-checkbox h-4 w-4"
                                            checked={!!newPurchaseOrderData?.epcaRequest}
                                            onChange={(e) => setNewPurchaseOrderData((pre: any) => ({ ...pre, epcaRequest: e.target.checked }))}
                                        />
                                        <label htmlFor="epcaRequest" className="ml-2 text-sm">ePCA Request</label>
                                    </div>
                                </div>

                                {skuDetails &&
                                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-7 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">Rate/UOM:<span style={{ color: 'red', marginLeft: '2px' }}>*</span></label>
                                            <input
                                                type="number"
                                                placeholder="Enter Rate/UOM"
                                                className="border rounded form-input text-sm no-spinner w-full"
                                                value={newPurchaseOrderData?.rate}
                                                onChange={(e) => setNewPurchaseOrderData((pre: any) => ({ ...pre, rate: Number(e.target.value) }))}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">NOP:<span style={{ color: 'red', marginLeft: '2px' }}>*</span></label>
                                            <input
                                                type="number"
                                                placeholder="Enter NOP"
                                                className="border rounded form-input text-sm no-spinner w-full"
                                                value={newPurchaseOrderData?.nop}
                                                onChange={(e) => setNewPurchaseOrderData((pre: any) => ({ ...pre, nop: Number(e.target.value) }))}
                                            />
                                        </div>
                                        {newPurchaseOrderData?.epcaRequest && <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">Required From</label>
                                            <Select
                                                className="text-sm"
                                                isSearchable={true}
                                                options={[{ value: '', label: 'No Source' }]}
                                                value={newPurchaseOrderData.reqFrom}
                                                onChange={(event: any) => setNewPurchaseOrderData((pre: any) => ({ ...pre, reqFrom: event }))}
                                            />
                                        </div>}
                                        {newPurchaseOrderData?.epcaRequest && <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">Remarks:</label>
                                            <input
                                                type="text"
                                                placeholder="Enter Remarks"
                                                className="border rounded form-input text-sm w-full"
                                                value={newPurchaseOrderData?.remarks}
                                                onChange={(e) => setNewPurchaseOrderData((pre: any) => ({ ...pre, remarks: e.target.value }))}
                                            />
                                        </div>}
                                        {newPurchaseOrderData?.epcaRequest && <div>
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
                                        </div>}
                                        {newPurchaseOrderData?.epcaRequest && <div>
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
                                        </div>}
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">&nbsp;</label>
                                            <button
                                                type="button"
                                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-xs inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                                                id="addNewDropdownBtn"
                                                disabled={!(newPurchaseOrderData.sku && newPurchaseOrderData.rate && newPurchaseOrderData.nop)}
                                                onClick={() => {
                                                    if (!newPurchaseOrderData.sku || !newPurchaseOrderData.rate || !newPurchaseOrderData.nop) {
                                                        commonErrorToast('Please fill all mandatory fields marked with *');
                                                        return;
                                                    }
                                                    if (newPurchaseOrderData?.epcaRequest) {
                                                        EPCAInsertAPIcall();
                                                        return;
                                                    }
                                                    setSkuDgData([...skuDgData, {
                                                        sku_code: newPurchaseOrderData.sku?.value,
                                                        sku_name: `${newPurchaseOrderData.sku?.label} (${newPurchaseOrderData.sku?.value})`,
                                                        rate: newPurchaseOrderData.rate,
                                                        qty: newPurchaseOrderData.nop,
                                                        newRowId: skuDgData.length + 1,
                                                    }])
                                                    setNewPurchaseOrderData((pre: any) => ({ ...pre, sku: '', rate: null, nop: null, reqFrom: '', remarks: '', validfrom: new Date().toLocaleDateString('en-GB'), validto: new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString('en-GB') }));
                                                    setSkuDetails(null);
                                                    setSKU([]);
                                                }}
                                            >
                                                <FaPlus className="mr-2" /> <span>Add</span>
                                            </button>
                                        </div>
                                    </div>
                                }
                                <p className="mt-4 mb-2 text-sm font-semibold">Selected SKU</p>
                                <div className="mt-2 p-pl-table-item">
                                    <MantineReactTable table={skuTable} />
                                </div>
                                <div className="bg-gray-50 px-6 py-4 border-t flex justify-end mt-4">
                                    <button
                                        type="button"
                                        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 text-xs inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                                        id="addNewPurchaseOrderBtn"
                                        disabled={!(newPurchaseOrderData?.bill_to && newPurchaseOrderData?.po_no && skuDgData.length > 0)}
                                        onClick={() => {
                                            if (newPurchaseOrderData?.bill_to && newPurchaseOrderData?.po_no && skuDgData.length > 0) {
                                                PTOrderdtlsSubmitAPIcall();
                                            } else {
                                                commonErrorToast('Please fill all mandatory fields marked with *');
                                            }
                                        }}
                                    >
                                        <FaPlus className="mr-2" /> <span>Add New Purchase Order</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <hr className="my-4" />

                        <div className="mt-2 p-pl-table-item">
                            <p className="text-sm font-semibold mb-2">Existing Purchase Orders</p>
                            <MantineReactTable table={table} />
                        </div>
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