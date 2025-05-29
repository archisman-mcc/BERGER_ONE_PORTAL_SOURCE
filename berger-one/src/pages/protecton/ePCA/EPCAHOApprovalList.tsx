import { UseAuthStore } from '../../../services/store/AuthStore';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Select from 'react-select';
import * as Epca from '../../../services/api/protectonEpca/EpcaList';
import { Button } from '@mantine/core';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { EpcaHoApprovalDetailsStore } from '../../../services/store/Protecton/EpcaCustomerDetailsStore';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci"

const EPCAHOApprovalList = () => {
    const user = UseAuthStore((state: any) => state.userDetails);
    const navigate = useNavigate();

    const [data, setData] = useState<any>([]);
    const [customerDetails, setCustomerDetails] = useState<any>({
        depot_code: "",
        depot_name: "",
        dlr_terr_code: "",
        acctNo: "",
        customerName: "",
        billTo: "",
        main_status: 'PENDING',
        aprv_status: "PENDING_HO",
    });
    const [loading, setLoading] = useState(false);
    const [depot, setDepot] = useState<any>([]);
    const [applTerr, setApplTerr] = useState<any>([]);
    const [approveStatus, setApproveStatus] = useState<any>([]);
    const mainStatus = [
        { label: 'Pending', value: 'PENDING' },
        { label: 'Approved', value: 'APPROVED' },
        { label: 'Rejected', value: 'REJECTED' },
    ];

    const { setEpcaHoApprovalDetails } = EpcaHoApprovalDetailsStore((state) => state);

    const GetApplicableDepot = async () => {
        setLoading(true);
        const data: any = {
            user_id: user.user_id,
            region: '',
            app_id: '15',
        };
        try {
            const response: any = await Epca.GetApplicableDepotList(data);
            setDepot(response.data);
        } catch (error) {
            return;
        }
        setLoading(false);
    };

    const GetApplicableTerritory = async (cd: any) => {
        setLoading(true);
        const data: any = {
            user_id: user.user_id,
            depot_code: cd,
            app_id: '15',
        };
        try {
            const response: any = await Epca.GetApplicableTerrList(data);
            setApplTerr(response.data)
        } catch (error) {
            return;
        }
        setLoading(false);
    };

    const GetePCAListData = async () => {
        setLoading(true);
        // console.log(customerDetails)
        const data: any = {
            // app_id: 15,
            DepotCode: customerDetails.depot_code || '',
            TerritoryCode: customerDetails.dlr_terr_code || '',
            BillToCode: customerDetails.billTo || '',
            // AcctNo: customerDetails.acctNo || '',
            DealerCode: customerDetails.acctNo || '',
            DealerName: customerDetails.customerName || '',
            SblCode: customerDetails.sblcode || '4',
            ApprovedStatus: customerDetails.aprv_status || "PENDING_HO",
            MainStatus: customerDetails.main_status || 'PENDING',
        };
        try {
            const response: any = await Epca.GetePCAHoApprovalList(data);
            if (response && response.data != null && response.data != undefined) setData(response.data.table);
            else setData([]);
        } catch (error) {
            return;
        }
        setLoading(false);
        console.log("ePCA List Data:", data);
        
    };

    const GetPcaStatusData = async () => {
        setLoading(true);
        const data: any = {
            app_id: '15',
        };
        try {
            const response: any = await Epca.GetPcaStatusList(data);
            setApproveStatus(response.data);
            // setApproveStatus(response.data.filter((item: any) => item.lov_field1_value === cd))
            // setApproveStatus(response.data.filter((item: any) => item.lov_field1_value === cd && !item.lov_value.includes('HO')))
        } catch (error) {
            return;
        }
        setLoading(false);
    };

    type PcaType = {
        // set custom column headings
        depot_regn: string;
        depot_name: string;
        dlr_terr_code: string;
        dlr_dealer_code: string;
        dlr_dealer_name: string;
        dlr_bill_to: string;
        pd_appl_yn: string;
        pca_count: string;
        pca_approved: string;
        pca_pending: string;
        pca_rejected: string;
    };

    const columns = useMemo<MRT_ColumnDef<PcaType>[]>(
        () => [
            {
                accessorKey: 'depot_regn',
                header: 'Region',
                size: 50,
            },
            {
                accessorKey: 'depot_name',
                header: 'Depot',
                size: 80,
            },
            {
                accessorKey: 'dlr_terr_code',
                header: 'Territory',
                size: 50,
            },
            {
                accessorKey: 'dlr_dealer_code',
                header: 'Acct. No.',
                size: 50,
            },
            {
                accessorKey: 'dlr_dealer_name',
                header: 'Customer Name',
                size: 100,
                Cell: ({ cell }) => {
                    return (
                        <span
                            className='text-blue-600 cursor-pointer'
                            onClick={() => {
                                // selectedCustomer(cell.row.original)
                                setEpcaHoApprovalDetails(cell.row.original);
                                // setValueInSessionStorage('epcaHoDtlList', cell.row.original);
                                // const storage = sessionStorage;
                                sessionStorage.setItem('epcaHoDtlList', JSON.stringify(cell.row.original));
                                navigate('/Protecton/ePCA/EPCAHoApprovalDetails/');
                            }}
                        >
                            {cell.row.original.dlr_dealer_name}
                        </span>
                    );
                },
            },
            {
                accessorKey: 'dlr_bill_to',
                header: 'Bill To',
                size: 50,
            },
            {
                accessorKey: 'pd_appl_yn',
                header: 'PD Applicable',
                size: 50,
                Cell: ({ cell }) => (cell.getValue() === 'Y' ? 'Yes' : 'No'),
            },
            {
                accessorKey: 'pca_count',
                header: 'Total SKU',
                size: 50,
            },
            {
                accessorKey: 'pca_approved',
                header: 'Approved SKU',
                size: 50,
            },
            {
                accessorKey: 'pca_pending',
                header: 'Pending SKU',
                size: 50,
            },
            {
                accessorKey: 'pca_rejected',
                header: 'Rejected SKU',
                size: 50,
            },
        ],
        []
    );

    const table = useMantineReactTable({
        columns,
        data,
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

    useEffect(() => {
        GetApplicableDepot();
        GetPcaStatusData();
        GetePCAListData();
    }, [])

    return (
        <>
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-2">
                <h5 className="text-lg font-semibold dark:text-white-light">e-EPCA HO Approval List</h5>
            </div>

            <div className="bg-white rounded-lg px-4 py-2 shadow-md mb-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    {/* Depot */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Depot:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            value={{ value: customerDetails?.depot_code, label: customerDetails?.depot_name }}
                            options={depot.map((d: any) => ({ value: d.depot_code, label: d.depot_name }))}
                            // isDisabled={isEditMode}
                            onChange={(event) => {
                                GetApplicableTerritory(event?.value);
                                setCustomerDetails((pre: any) => ({ ...pre, depot_code: event?.value, depot_name: event?.label }))
                            }}
                        />
                    </div>

                    {/* Territory */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Territory:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            value={{ value: applTerr?.find((a: any) => a.terr_code === customerDetails?.dlr_terr_code)?.terr_code, label: applTerr.find((a: any) => a.terr_code === customerDetails?.dlr_terr_code)?.terr_name }}
                            options={applTerr.map((d: any) => ({ value: d.terr_code, label: d.terr_name }))}
                            // isDisabled={isEditMode}
                            onChange={(event) => {
                                setCustomerDetails((pre: any) => ({ ...pre, dlr_terr_code: event?.value }))
                            }}
                        />
                    </div>

                    {/* Acct. No. */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Acct. No.:</label>
                        {/* <input type="text" placeholder="Acct. No." className="w-full border rounded form-input text-sm" name="acctNo" value={pcaParam.acctNo} onChange={handleChange} autoComplete="off" /> */}
                        <input type="text" placeholder="Acct. No." autoComplete="off" className="w-full border rounded form-input text-sm" name="acctNo" value={customerDetails.acctNo} onChange={(e) => setCustomerDetails((pre: any) => ({ ...pre, acctNo: e.target.value }))} />
                    </div>

                    {/* Customer Name */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Customer Name:</label>
                        {/* <input type="text" placeholder="Customer Name" className="w-full border rounded form-input text-sm" name="customerName" value={pcaParam.customerName} onChange={handleChange} autoComplete="off" /> */}
                        <input type="text" autoComplete="off" placeholder="Customer Name" className="w-full border rounded form-input text-sm" name="customerName" value={customerDetails.customerName} onChange={(e) => setCustomerDetails((pre: any) => ({ ...pre, customerName: e.target.value }))} />
                    </div>

                    {/* Bill To */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Bill To:</label>
                        {/* <input type="text" placeholder="Bill To" className="w-full border rounded form-input text-sm" name="billTo" value={pcaParam.billTo} onChange={handleChange} autoComplete="off" /> */}
                        <input type="text" autoComplete="off" placeholder="Bill To" className="w-full border rounded form-input text-sm" name="billTo" value={customerDetails.billTo} onChange={(e) => setCustomerDetails((pre: any) => ({ ...pre, billTo: e.target.value }))} />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Status:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            value={mainStatus?.find((m) => m.value === customerDetails?.main_status)}
                            options={mainStatus}
                            onChange={(event) => {
                                setCustomerDetails((pre: any) => ({ ...pre, main_status: event?.value, aprv_status: '' }))
                            }}
                        />
                    </div>

                    {/* Sub Status */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Sub Status:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            value={{ value: approveStatus?.find((a: any) => a.lov_code === customerDetails?.aprv_status)?.lov_code, label: approveStatus?.find((a: any) => a.lov_code === customerDetails?.aprv_status)?.lov_value }}
                            options={customerDetails?.main_status ? approveStatus.filter((item: any) => item.lov_field1_value === customerDetails?.main_status).map((d: any) => ({ value: d.lov_code, label: d.lov_value })) : approveStatus.filter((item: any) => item.lov_field1_value === 'PENDING').map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                            onChange={(event) => {
                                setCustomerDetails((pre: any) => ({ ...pre, aprv_status: event?.value }))
                            }}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex items-end space-x-2">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 space-x-2 rounded hover:bg-blue-600 text-sm flex items-center"
                            onClick={(e) => {
                                e.preventDefault();
                                // GetePCAListData();
                                GetePCAListData();
                            }}>
                            <CiSearch /> <span>Search</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mb-2" style={{ maxHeight: '45vh', overflowY: 'auto' }}>
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
    )
}

export default EPCAHOApprovalList