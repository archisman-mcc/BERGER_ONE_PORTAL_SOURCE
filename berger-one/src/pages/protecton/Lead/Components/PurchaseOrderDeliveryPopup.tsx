import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table'
import React, { useMemo, useRef } from 'react'
import { MdOutlineClose } from "react-icons/md";
// import { IoEyeSharp } from 'react-icons/io5';
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { PTDeliveryScheduleSubmit } from '../../../../services/api/protectonLead/PotentialLead';
import { commonErrorToast, commonSuccessToast } from '../../../../services/functions/commonToast';
import { Button } from '@mantine/core';

const PurchaseOrderDeliveryPopup = ({ onClose, rowData, purchaseOrderRowData, purchaseOrderDeliveryData, setPurchaseOrderDeliveryData }: any) => {
    // console.log(rowData, purchaseOrderRowData, purchaseOrderDeliveryData, setPurchaseOrderDeliveryData);
    var rowId: any = useRef(0);

    const currentDate = () => {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // months are 0-based
        const day = String(today.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    const [formData, setFormData]: any = React.useState({ date: currentDate(), qty: 0 });

    const [loading, setLoading] = React.useState(false);

    const handleDeleteRow = React.useCallback((id: number) => {
        setPurchaseOrderDeliveryData((prev: any[]) => prev.filter((pur: any) => pur?.newRowId !== id));
    }, [setPurchaseOrderDeliveryData]);

    const formattedDate = (input: any) => {
        const year = input.toString().slice(0, 4);
        const month = input.toString().slice(4, 6);

        const date = new Date(`${year}-${month}-01`);
        const formatted = date.toLocaleString("en-US", { month: "short", year: "numeric" });
        return formatted;
    }

    const formattedDate1 = (input: any) => {
        const date = new Date(input);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based

        const result = `${year}${month}`;
        return Number(result);
    }

    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'ptds_sdl_month',
                header: 'Month Year',
                size: 60,
                Cell: ({ cell }) => {
                    return (
                        <span>{formattedDate(cell.row.original.ptds_sdl_month)}</span>
                    )
                }
            },
            {
                accessorKey: 'ptds_qty',
                header: 'Schedule Qty',
                size: 60,
            },
            {
                accessorKey: 'actual_qty',
                header: 'Actual Qty',
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
        [handleDeleteRow]
    );

    const table = useMantineReactTable({
        columns,
        data: purchaseOrderDeliveryData,
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

    const submit = async () => {
        const payloadData =
        {
            pTDeliverySchedules: [...purchaseOrderDeliveryData]
        }
        setLoading(true);
        try {
            const response: any = await PTDeliveryScheduleSubmit(payloadData);
            if (response?.statusCode !== 200) {
                commonErrorToast(response?.message || 'Error submitting data');
                setLoading(false);
                return;
            } else {
                commonSuccessToast(response?.message || 'Data submitted successfully');
                rowId.current = 0;
                onClose();
            }
        } catch (error) {
            return;
        }
        setLoading(false);
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-none shadow-lg w-screen h-screen relative overflow-hidden flex flex-col">
                <span className="absolute top-3 right-3 px-3 py-1 rounded cursor-pointer" ><MdOutlineClose color="red" onClick={() => onClose()} /></span>
                <p className="text-xl font-bold pr-12">Purchase Order Delivery</p>
                <p className="text-sm pr-12">{rowData?.ptm_project_name}</p>
                <p className="text-sm pr-12">{rowData?.region}</p>
                <p className="text-sm pr-12">{rowData?.ptm_createdon}</p>
                <p className="text-sm pr-12">Status: {rowData?.work_status_disp}</p>
                <hr className="my-4" />
                <p className="text-sm pr-12">{purchaseOrderRowData?.po_date}</p>
                <p className="text-sm pr-12">Po No.: {purchaseOrderRowData?.po_no}</p>
                <p className="text-sm pr-12">SKU: {purchaseOrderRowData?.sku_code}</p>
                <p className="text-sm pr-12">Rate/UOM: {purchaseOrderRowData?.rate}</p>
                <p className="text-sm pr-12">NOP: {purchaseOrderRowData?.qty}</p>
                <p className="text-sm pr-12">Pending Qty: {purchaseOrderRowData?.qty - purchaseOrderDeliveryData.reduce((accumulator: any, product: any) => {
                    return accumulator + product.ptds_qty;
                }, 0)}</p>
                <hr className="my-4" />

                <div className="flex items-end gap-4">
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-semibold">Date:</label>
                        <input
                            className="border rounded form-input text-sm w-32"
                            type="date"
                            value={formData?.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            style={{ padding: "5px" }}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-semibold w-24 text-right">Quantity:</label>
                        <input
                            type="number"
                            placeholder="Enter Quantity"
                            className="border rounded form-input text-sm no-spinner text-right w-32"
                            value={formData?.qty}
                            onChange={(e) => setFormData({ ...formData, qty: Number(e.target.value) })}
                        />
                    </div>
                    <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 space-x-2 rounded hover:bg-blue-600 text-xs flex items-center"
                        id="addNewDropdownBtn"
                        onClick={() => {
                            // console.log(formData);
                            if (purchaseOrderRowData?.qty - purchaseOrderDeliveryData.reduce((accumulator: any, product: any) => {
                                return accumulator + product.ptds_qty;
                            }, 0) === 0) {
                                commonErrorToast("Can't add because of 0 Pending quantity!");
                                return;
                            }
                            if(formData?.qty <= 0){
                                commonErrorToast("Quantity should be greater than 0!");
                                return;
                            }
                            const totalScheduledQty = purchaseOrderDeliveryData.reduce((accumulator: any, product: any) => { return accumulator + product.ptds_qty; }, 0) + formData?.qty
                            if (totalScheduledQty > purchaseOrderRowData?.qty) {
                                commonErrorToast("Scheduled quantity can't be greater than order quantity!");
                                return;
                            }
                            rowId.current += 1;
                            const newId = rowId.current;
                            setPurchaseOrderDeliveryData([...purchaseOrderDeliveryData, {
                                ptds_order_id: purchaseOrderRowData?.order_id,
                                ptds_sku_code: purchaseOrderRowData?.sku_code,
                                ptds_sdl_month: formattedDate1(formData?.date),
                                ptds_qty: formData?.qty,
                                actual_qty: 0,
                                newRowId: newId
                            }]);
                            setFormData({ date: currentDate(), qty: 0 });
                        }}
                    >
                        <FaPlus /> <span>Add New</span>
                    </button>
                </div>

                <br />

                <div className="flex-1 min-h-0 overflow-auto">
                    <MantineReactTable table={table} />
                </div>

                <div className="bg-gray-50 px-6 py-4 border-t flex justify-end mt-4">
                    <Button
                        size="md"
                        color="green"
                        onClick={() => submit()}
                        className="px-8 py-2 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        SUBMIT
                    </Button>
                </div>
            </div>

            {
                loading && (
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
                )
            }
        </div >
    )
}

export default PurchaseOrderDeliveryPopup