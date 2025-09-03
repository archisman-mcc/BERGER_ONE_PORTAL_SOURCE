import { Fragment, useEffect, useMemo, useState, type ChangeEvent, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from "react";
import * as Tlv from '../../../services/api/protectonEpca/TLVRevisionDepotApproval';
import * as Epca from '../../../services/api/protectonEpca/EpcaList';
import { UseAuthStore } from "../../../services/store/AuthStore";
import CommonFilterComponent from "./CommonFilterComponent";
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { useNavigate } from "react-router-dom";
import { EpcaCustomerStore } from "../../../services/store/Protecton/EpcaCustomerDetailsStore";
import { Group, Tooltip } from '@mantine/core';
import { IconDownload, IconCheck, IconX, IconEye } from '@tabler/icons-react';
import { commonAlert } from "../../../services/functions/commonAlert";
import { commonSuccessToast } from "../../../services/functions/commonToast";
import { Dialog, Transition } from '@headlessui/react';


type TLVType = {
    // set custom column headings
    depot_regn: string;
    depot_name: string;
    dlr_terr_code: string;
    dlr_dealer_code: string;
    dlr_dealer_name: string;
    current_tlv: number;
    td_proposed_tlv: number;
    credit_days: number;
    td_proposed_cr_days: number;
    status_value: string;
    td_auto_id: number;
    td_remarks: string;
    auto_id: string;
    file_doc: string;
};

interface TlvLogInit {
    depot_regn: any;
    depot_code: any;
    depot_name: any;
    terr_code: any;
    bill_to: any;
    dealer_code: any;
    dealer_name: any;
    auto_id: any;
    created_date: any;
    current_tlv: any;
    credit_days: any;
    proposed_tlv: any;
    proposed_cr_days: any;
    status_value: any;
    remarks: any;
    td_submission_type: any;
}

const TlvLogDto: TlvLogInit = {
    depot_regn: '',
    depot_code: '',
    depot_name: '',
    terr_code: '',
    bill_to: '',
    dealer_code: '',
    dealer_name: '',
    auto_id: '',
    created_date: '',
    current_tlv: '',
    credit_days: '',
    proposed_tlv: '',
    proposed_cr_days: '',
    status_value: '',
    remarks: '',
    td_submission_type: '',
};

const TLVRevisionDepotApproval1 = () => {
    const [loading, setLoading]: any = useState(false);
    const [dgData, setDgData]: any = useState([]);
    const [selectBoxData, setSelectBoxData]: any = useState({
        depot: [],
        terr: [],
        mainStatus: [
            { label: 'Pending', value: 'PENDING' },
            { label: 'Approved', value: 'APPROVED' },
            { label: 'Rejected', value: 'REJECTED' },
        ],
        aprvStatus: []
    });
    const [filterData, setFilterData]: any = useState({ depotCode: '', terrCode: '', billToCode: '', dealerCode: '', dealerName: '', mainStatus: 'PENDING', aprvStatus: 'PENDING_DEPOT' });
    const [tlvLogData, setTlvLogData] = useState<TlvLogInit[]>([TlvLogDto]);
    const [showTlvModal, setShowTlvModal] = useState(false);

    useEffect(() => {
        console.log('Filter Data Changed:', filterData);
    }, [filterData])
    useEffect(() => {
        console.log('selectBoxData:', selectBoxData);
    }, [selectBoxData])


    const user = UseAuthStore((state: any) => state.userDetails);

    const GetApplicableDepot = async () => {
        setLoading(true);
        const data: any = {
            user_id: user.user_id,
            region: '',
            app_id: '15',
        };
        try {
            const response: any = await Epca.GetApplicableDepotList(data);
            const updatedDepotList = [
                { label: 'Select...', value: '' },
                ...response.data.map((item: any) => ({
                    label: item.depot_name,
                    value: item.depot_code
                })),
            ];
            setSelectBoxData((prevState: any) => ({ ...prevState, depot: updatedDepotList }));
        } catch (error) {
            return;
        }
        setLoading(false);
    };

    const GetApplicableTerritory = async (depotCode: any) => {
        setLoading(true);
        const data: any = {
            user_id: user.user_id,
            depot_code: depotCode,
            app_id: '15',
        };
        try {
            const response: any = await Epca.GetApplicableTerrList(data);
            const updatedList = [
                { label: 'Select...', value: '' },
                ...response.data.map((item: any) => ({
                    label: item.terr_name,
                    value: item.terr_code
                })),
            ];
            setSelectBoxData((prevState: any) => ({ ...prevState, terr: updatedList }));
        } catch (error) {
            return;
        }
        setLoading(false);
    };

    const GetPcaStatusData = async () => {
        setLoading(true);
        const data: any = {
            status: filterData.mainStatus,
            type: 'Depot',
        };
        try {
            const response: any = await Tlv.GetTlvStatusList(data);
            const updatedList = [
                { label: 'Select...', value: '' },
                ...response.data.map((item: any) => ({
                    label: item.lov_value,
                    value: item.lov_code
                })),
            ];
            setSelectBoxData((prevState: any) => ({ ...prevState, aprvStatus: updatedList }));
        } catch (error) {
            return;
        }
        setLoading(false);
    };

    const GetTlvDepotApprovalListData = async () => {
        setLoading(true);
        const data: any = {
            depotCode: filterData?.depotCode,
            terrCode: filterData?.terrCode,
            billToCode: filterData?.billToCode,
            dealerCode: filterData?.dealerCode,
            dealerName: filterData?.dealerName,
            mainStatus: filterData?.mainStatus,
            aprvStatus: filterData?.aprvStatus,
        };
        try {
            const response: any = await Tlv.GetTlvDepotApprovalList(data);
            if (response.data) {
                setDgData(response.data.table);
            } else {
                setDgData([]);
            }
        } catch (error) {
            return;
        }
        setLoading(false);
    };

    const handleSearch = () => { GetTlvDepotApprovalListData(); };

    const navigate = useNavigate();

    const { setCustomerProfile } = EpcaCustomerStore((state) => state);

    const setValueInSessionStorage = (key: string, value: string) => {
        const storage = sessionStorage;
        storage.setItem(key, JSON.stringify(value));
    };

    const selectedCustomer = (Lead: any) => {
        setCustomerProfile(Lead);
        setValueInSessionStorage('epcaTLVDtlList', Lead);
        setValueInSessionStorage('epcaTLVDtlEntryType', 'View');
        navigate('/Protecton/TLV/TLVRevisionRequestDetails/');
    };

    async function TlvApprove(data: { depot_regn?: string; depot_name?: string; dlr_terr_code?: string; dlr_dealer_code?: string; dlr_dealer_name?: string; current_tlv?: number; td_proposed_tlv: any; credit_days?: number; td_proposed_cr_days: any; status_value?: string; td_auto_id?: number; td_remarks: any; auto_id: any; file_doc?: string; approved_type?: any; }) {
        setLoading(true);
        commonAlert('Are you sure you want to approve this TLV?', '', 'warning').then(async (result: any) => {
            if (result.value) {
                const param: any = {
                    tlv_id: String(data.auto_id),
                    approval_status: data.approved_type != '' ? data.approved_type : '',
                    remarks: data.td_remarks != '' ? data.td_remarks : '',
                    term_id: '0',
                    Proposed_tlv: String(data.td_proposed_tlv) != '' ? data.td_proposed_tlv : '',
                    proposed_credit_day: String(data.td_proposed_cr_days) != '' ? data.td_proposed_cr_days : '',
                };
                const response: any = await Tlv.TlvRevisionApproval(param);

                if (response.response_message) {
                    commonSuccessToast('TLV Revision Request Approved Successfully.');
                    GetTlvDepotApprovalListData();
                    setFilterData((prevState: any) => ({ ...prevState, depotCode: '', terrCode: '', billToCode: '', dealerCode: '', dealerName: '' }));
                }
            }
        });
        setLoading(false);
    }

    async function TlvReject(data: { depot_regn?: string; depot_name?: string; dlr_terr_code?: string; dlr_dealer_code?: string; dlr_dealer_name?: string; current_tlv?: number; td_proposed_tlv: any; credit_days?: number; td_proposed_cr_days: any; status_value?: string; td_auto_id?: number; td_remarks: any; auto_id: any; file_doc?: string; rejected_type?: any; }) {
        setLoading(true);
        commonAlert('Are you sure you want to reject this TLV?', '', 'warning').then(async (result: any) => {
            if (result.value) {
                const param: any = {
                    tlv_id: String(data.auto_id),
                    approval_status: data.rejected_type != '' ? data.rejected_type : '',
                    remarks: data.td_remarks != '' ? data.td_remarks : '',
                    term_id: '0',
                    Proposed_tlv: String(data.td_proposed_tlv) != '' ? data.td_proposed_tlv : '',
                    proposed_credit_day: String(data.td_proposed_cr_days) != '' ? data.td_proposed_cr_days : '',
                };

                const response: any = await Tlv.TlvRevisionApproval(param);

                if (response.response_message) {
                    commonSuccessToast('TLV Revision Request Rejected Successfully.');
                    GetTlvDepotApprovalListData();
                    setFilterData((prevState: any) => ({ ...prevState, depotCode: '', terrCode: '', billToCode: '', dealerCode: '', dealerName: '' }));
                }
            }
        });
        setLoading(false);
    }

    const GetTlvRevisionLog = async (autoid: string) => {
        setLoading(true);
        const data: any = {
            auto_id: autoid,
        };
        try {
            const response: any = await Tlv.GetTlvRevisionLogDetails(data);
            setTlvLogData(response.data.table);
        } catch (error) {
            return;
        }
        setLoading(false);
    };

    const handleEditChange = (e: ChangeEvent<HTMLInputElement>, rowIndex: number, field: string) => {
        const { value } = e.target;
        setDgData((prevData: any[]) => prevData.map((row, index) => (index === rowIndex ? { ...row, [field]: value } : row)));
    };

    const columns = useMemo<MRT_ColumnDef<TLVType>[]>(
        () => [
            {
                accessorKey: 'depot_regn',
                header: 'Region',
                size: 50,
            },
            {
                accessorKey: 'depot_name',
                header: 'Depot',
                size: 50,
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
                header: 'Dealer Name',
                size: 80,

                Cell: ({ cell }) => {
                    return (
                        <span
                            className='text-blue-600 cursor-pointer'
                            onClick={() => selectedCustomer(cell.row.original)}
                        >
                            {cell.row.original.dlr_dealer_name}
                        </span>
                    );
                },
            },
            {
                accessorKey: 'current_tlv',
                header: 'Current TLV',
                size: 50,
            },
            {
                accessorKey: 'td_proposed_tlv',
                header: 'Requested TLV',
                size: 50,
                Cell: ({ row }) =>
                    row.original.td_proposed_tlv !== null && row.original.td_proposed_tlv !== undefined ? (
                        <input className="tableInput" type="number" value={row.original.td_proposed_tlv} onChange={(e) => handleEditChange(e, row.index, 'td_proposed_tlv')} />
                    ) : null,
            },
            {
                accessorKey: 'credit_days',
                header: 'Credit Days',
                size: 50,
            },
            {
                accessorKey: 'td_proposed_cr_days',
                header: 'Proposed Credit Days',
                size: 50,
                Cell: ({ row }) =>
                    row.original.td_proposed_cr_days !== null && row.original.td_proposed_cr_days !== undefined ? (
                        <input type="text" className="tableInput" value={row.original.td_proposed_cr_days} onChange={(e) => handleEditChange(e, row.index, 'td_proposed_cr_days')} />
                    ) : null,
            },
            {
                accessorKey: 'status_value',
                header: 'Status',
                size: 60,
            },
            {
                accessorKey: 'td_remarks',
                header: 'Remarks',
                size: 60,
                Cell: ({ row }) => <input className="tableInput" type="text" value={row.original.td_remarks} onChange={(e) => handleEditChange(e, row.index, 'td_remarks')} />,
            },
            {
                id: 'action',
                header: 'Action',
                size: 100,
                Cell: ({ row }) => {
                    const status = row.original.status_value;
                    const downloadLink = row.original.file_doc ? `https://bpilmobile.bergerindia.com/VIRTUAL_DOCS/PROTECTON_MOB_APP/${row.original.file_doc}` : null;

                    const shouldShowButton = !status.includes('APPROVED') && !status.includes('REJECTED');
                    return (
                        <div className="flex justify-end">
                            <Group className="tableGroupBtn">
                                {shouldShowButton && (
                                    <Tooltip label="Approve" position="top" withArrow>
                                        <IconCheck
                                            size={20}
                                            className="text-green-600 cursor-pointer hover:text-green-800 transition-colors"
                                            onClick={() => TlvApprove(row.original)}
                                        />
                                    </Tooltip>
                                )}
                                {shouldShowButton && (
                                    <Tooltip label="Reject" position="top" withArrow>
                                        <IconX
                                            size={20}
                                            className="text-red-600 cursor-pointer hover:text-red-800 transition-colors"
                                            onClick={() => TlvReject(row.original)}
                                        />
                                    </Tooltip>
                                )}
                                <Tooltip label="View" position="top" withArrow>
                                    <IconEye
                                        size={20}
                                        className="text-blue-600 cursor-pointer hover:text-blue-800 transition-colors"
                                        onClick={() => {
                                            GetTlvRevisionLog(row.original.auto_id);
                                            setShowTlvModal(true);
                                        }}
                                    />
                                </Tooltip>
                                {downloadLink && (
                                    <Tooltip label="Download" position="top" withArrow>
                                        <a href={downloadLink} target="_blank" rel="noopener noreferrer">
                                            <IconDownload
                                                size={20}
                                                className="text-yellow-600 cursor-pointer hover:text-yellow-800 transition-colors"
                                            />
                                        </a>
                                    </Tooltip>
                                )}
                            </Group>
                        </div>
                    );
                },
            },
        ],
        []
    );

    const table = useMantineReactTable<TLVType>({
        columns,
        data: dgData,
        enableColumnResizing: true,
        enableTopToolbar: false,
        enableSorting: false,
        enableColumnActions: false,
        columnResizeMode: 'onChange'
    });

    const BesicDetailTable = ({ data }: any) => {
        return (
            <table className="custTableView w-full border-collapse">
                <thead>
                    <tr>
                        <th className="w-1/5 text-center align-middle">Region</th>
                        <th className="w-1/5 text-center align-middle">Depot</th>
                        <th className="w-1/5 text-center align-middle">Territory</th>
                        <th className="w-1/5 text-center align-middle">Acct. No.</th>
                        <th className="w-1/5 text-center align-middle">Dealer Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center align-middle">{data[0].depot_regn}</td>
                        <td className="text-center align-middle">{data[0].depot_name}</td>
                        <td className="text-center align-middle">{data[0].terr_code}</td>
                        <td className="text-center align-middle">{data[0].dealer_code}</td>
                        <td className="text-center align-middle">{data[0].dealer_name}</td>
                    </tr>
                </tbody>
            </table>
        );
    };

    const TLVDetailsGrid = ({ data }: any) => {
        return (
            <table className="custTableView w-full border-collapse">
                <thead>
                    <tr>
                        <th className="w-[15%] text-center">Date</th>
                        <th className="w-[10%] text-center">Current TLV</th>
                        <th className="w-[10%] text-center">Requested TLV</th>
                        <th className="w-[10%] text-center">Credit Days</th>
                        <th className="w-[10%] text-center">Proposed Credit Days</th>
                        <th className="w-[15%] text-center">Status</th>
                        <th className="w-[30%] text-center">Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((row: { created_date: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; current_tlv: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; proposed_tlv: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; credit_days: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; proposed_cr_days: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; status_value: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; remarks: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
                            <tr key={index}>
                                <td className="text-center align-middle">{row.created_date}</td>
                                <td className="text-center align-middle">{row.current_tlv}</td>
                                <td className="text-center align-middle">{row.proposed_tlv}</td>
                                <td className="text-center align-middle">{row.credit_days}</td>
                                <td className="text-center align-middle">{row.proposed_cr_days}</td>
                                <td className="text-center align-middle">{row.status_value}</td>
                                <td className="text-center align-middle">{row.remarks}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="text-center align-middle">
                                No record(s) found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    };

    useEffect(() => {
        filterData?.depotCode && GetApplicableTerritory(filterData?.depotCode);
    }, [filterData?.depotCode]);

    useEffect(() => {
        GetApplicableDepot();
        GetPcaStatusData();
        filterData?.mainStatus && filterData?.aprvStatus && GetTlvDepotApprovalListData();
    }, []);

    return (
        <>
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-1">
                <h5 className="text-lg font-semibold dark:text-white-light">TLV Revision Depot Approval</h5>
            </div>

            <div className="bg-white rounded-lg px-4 py-1 shadow-md mb-2">
                <CommonFilterComponent selectBoxData={selectBoxData} filterData={filterData} setFilterData={setFilterData} handleSearch={handleSearch} />
            </div>

            <div className="mb-2 max-h-[50vh] overflow-y-auto">
                <MantineReactTable table={table} />
            </div>

            {/* Modal PopUp */}
            <div>
                <Transition appear show={showTlvModal} as={Fragment}>
                    <Dialog as="div" open={showTlvModal} onClose={() => setShowTlvModal(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 "
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>
                        <div id="slideIn_down_modal" className="fixed inset-0 z-[200] overflow-y-auto bg-[black]/60">
                            <div className="flex min-h-screen items-start justify-center px-4">
                                <Dialog.Panel className="panel animate__animated animate__slideInDown my-8 w-full max-w-7xl overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <div className="grid-cols-12 items-center justify-between bg-secondary-light px-2 py-1 dark:bg-[#121c2c] md:flex">
                                        <div className="flex items-center justify-between bg-secondary-light px-2 w-full">
                                            <div className="flex">
                                                {/* <img className="mr-2 h-8 w-auto" src={GetProdDevImgRouteBuilder('/assets/images/meeting.png')} alt="" /> */}
                                                <h5 className="text-lg font-bold">View</h5>
                                            </div>
                                            <button onClick={() => setShowTlvModal(false)} type="button" className="justify-end text-white-dark hover:text-dark">
                                                <IconX />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="px-3 pt-2">
                                        <div className="table-responsive pb-2">
                                            <BesicDetailTable data={tlvLogData} />
                                        </div>
                                        <div className="table-responsive">
                                            <TLVDetailsGrid data={tlvLogData} />
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
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

export default TLVRevisionDepotApproval1