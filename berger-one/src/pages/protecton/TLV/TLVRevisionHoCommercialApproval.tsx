import React, { type ChangeEvent, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from 'react';
import Select from 'react-select';
import { Group, Tooltip } from '@mantine/core';
import { IconDownload, IconPlus, IconCheck, IconX, IconEye, IconRotate, IconEdit } from '@tabler/icons-react';
// import IconSearch from '@/src/components/Icon/IconSearch';
import { CiSearch } from "react-icons/ci";
import { useMemo, useState, useEffect } from 'react';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import * as Tlv from '../../../services/api/protectonEpca/TLVRevisionRSMApproval';
import * as Epca from '../../../services/api/protectonEpca/EpcaList';
// import * as TlvHo from '../../../services/api/protectonEpca/TLVRevisionHOApproval';
import * as TlvHoCom from '../../../services/api/protectonEpca/TLVRevisionHoCommercialApproval';
import { EpcaCustomerStore } from '../../../services/store/Protecton/EpcaCustomerDetailsStore';
import { useNavigate } from 'react-router-dom';
// import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
// import { GetProdDevImgRouteBuilder } from '@/src/services/functions/getProdDevUrlBuilder';
import { commonAlert } from '../../../services/functions/commonAlert';
import { commonErrorToast, commonSuccessToast } from '../../../services/functions/commonToast';
import { UseAuthStore } from '../../../services/store/AuthStore';
// import { Select as MantineSelect } from '@mantine/core';

export interface SELECTED_DROPDOWN {
    Userdepot: number;
    Userterritory: number;
    Userstatus: number;
    UsersubStatus: number;
}
const selectedDropdownInit: SELECTED_DROPDOWN = {
    Userdepot: -1,
    Userterritory: 0,
    Userstatus: 0,
    UsersubStatus: -1,
};

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
    dlr_bill_to: string;
    depot_code: string;
    td_term_id: number;
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

const TLVRevisionHoCommercialApproval = () => {
    const [data, setData] = useState<TLVType[]>([]);
    const pcaParamInit = {
        acctNo: '',
        customerName: '',
        billTo: '',
        sblcode: '',
    }
    const [pcaParam, setPcaParam] = useState({ ...pcaParamInit });
    const [selectedDropdown, setSelectedDropdown] = useState<SELECTED_DROPDOWN>({...selectedDropdownInit});
    const [depot, setDepot] = useState<any>([]);
    const [applTerr, setApplTerr] = useState<any>([]);
    const [approveStatus, setApproveStatus] = useState<any>([]);
    const [mainStatus, setMainStatus] = useState([
        { label: 'Pending', value: 'PENDING' },
        { label: 'Approved', value: 'APPROVED' },
        { label: 'Rejected', value: 'REJECTED' },
    ]);
    const { setCustomerProfile } = EpcaCustomerStore((state) => state);
    const [showTlvModal, setShowTlvModal] = useState(false);
    const [tlvLogData, setTlvLogData] = useState<TlvLogInit[]>([TlvLogDto]);
    const [tlvTermdValues, setTlvTermdValues] = useState<any>({});
    const [dropdownOptions, setDropdownOptions] = useState<any>([]);
    const [selectedValue, setSelectedValue] = useState<any>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const user = UseAuthStore((state: any) => state.userDetails);
    const [loading, setLoading] = useState(false);
    // const router = useRouter();
    const navigate = useNavigate();

    // const selectedCustomer = (Lead: any) => {
    //     setLoading(true);
    //     setCustomerProfile(Lead);
    //     router.push('/Protecton/ePCA/EPCADetails/');
    //     setLoading(false);
    // };

    const setValueInSessionStorage = (key: string, value: string) => {
        const storage = sessionStorage;
        storage.setItem(key, JSON.stringify(value));
    };

    const clearAllFormFields = () => {
        // Preserve the current Sub Status value
        const currentSubStatus = selectedDropdown.UsersubStatus;
        setSelectedDropdown({
            ...selectedDropdownInit,
            UsersubStatus: currentSubStatus
        });
        setPcaParam({ ...pcaParamInit });
        setSelectedValue(null);
        setDropdownOptions([]);
    };

    const selectedCustomer = (Lead: any) => {
        setCustomerProfile(Lead);
        setValueInSessionStorage('epcaTLVDtlList', Lead);
        setValueInSessionStorage('epcaTLVDtlEntryType', 'View');
        navigate('/Protecton/TLV/TLVRevisionRequestDetails/');
    };

    const findSelectedTypeValue = (arr: any[], arrPropName: string, checkValue: string) => {
        if (arr && arr.length > 0) {
            const selectedValue = arr.findIndex((item: any) => item[arrPropName] == checkValue);
            return selectedValue == -1 ? -1 : selectedValue;
        } else {
            return -1;
        }
    };

    const handleTypeSelect = (e: any, flag: 'USER_DEPOT' | 'USER_TERR' | 'USER_STATUS' | 'USER_SUB_STATUS') => {
        if (flag == 'USER_DEPOT' && e && e.target.innerText && depot.length > 0) {
            let getIndex = findSelectedTypeValue(depot, 'label', e.target.innerText);
            setSelectedDropdown((prev) => ({ ...prev, Userdepot: getIndex }));
            GetApplicableTerritory(depot[getIndex].depot_code);
        }

        if (flag == 'USER_TERR' && e && e.target.innerText && applTerr.length > 0) {
            let getIndex = findSelectedTypeValue(applTerr, 'label', e.target.innerText);
            setSelectedDropdown((prev) => ({ ...prev, Userterritory: getIndex }));
        }

        if (flag == 'USER_STATUS' && e && e.target.innerText && mainStatus.length > 0) {
            let getIndex = findSelectedTypeValue(mainStatus, 'label', e.target.innerText);
            setSelectedDropdown((prev) => ({ ...prev, Userstatus: getIndex }));
            GetPcaStatusData(mainStatus[getIndex].value);
        }

        if (flag == 'USER_SUB_STATUS' && e && e.target.innerText && approveStatus.length > 0) {
            let getIndex = findSelectedTypeValue(approveStatus, 'label', e.target.innerText);
            setSelectedDropdown((prev) => ({ ...prev, UsersubStatus: getIndex }));
        }
    };

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setPcaParam((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditChange = (e: ChangeEvent<HTMLInputElement>, rowIndex: number, field: string) => {
        const { value } = e.target;
        setData((prevData) => prevData.map((row, index) => (index === rowIndex ? { ...row, [field]: value } : row)));
    };

    const GetApplicableDepot = async () => {
        setLoading(true);
        const data: any = {
            user_id: user.user_id,
            region: '',
            app_id: '15',
        };
        try {
            const response: any = await Epca.GetApplicableDepotList(data);
            //labelValueConverter(response.data, 'depot_name', 'depot_code');
            const updatedDepotList = [
                { label: 'Select...', value: '', depot_name: '', depot_code: '' },
                ...response.data.map((item: any) => ({
                    label: item.depot_name,
                    value: item.depot_code,
                    depot_name: item.depot_name,
                    depot_code: item.depot_code,
                })),
            ];

            setDepot(updatedDepotList);
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
            //labelValueConverter(response.data, 'terr_name', 'terr_code');
            if (response.data != null && response.data != undefined) {
                const updatedTerrList = [
                    { label: 'Select...', value: '', terr_name: '', terr_code: '' },
                    ...response.data.map((item: any) => ({
                        label: item.terr_name,
                        value: item.terr_code,
                        terr_name: item.terr_name,
                        terr_code: item.terr_code,
                    })),
                ];
                setApplTerr(updatedTerrList);
            } else {
                setApplTerr([]);
            }
        } catch (error) {
            return;
        }
        setLoading(false);
    };

    const GetPcaStatusData = async (selectedstatus: any) => {
        setLoading(true);
        const data: any = {
            status: selectedstatus,
            type: 'HOCOMMERCIAL',
        };
        try {
            const response: any = await Tlv.GetTlvStatusList(data);
            //const newStatusList = response.data;

            const updatedTerrList = [
                { label: 'Select...', value: '' },
                ...response.data.map((item: any) => ({
                    label: item.lov_value,
                    value: item.lov_code,
                    lov_value: item.lov_value,
                    lov_code: item.lov_code,
                })),
            ];

            //labelValueConverter(newStatusList, 'lov_value', 'lov_code');

            setApproveStatus(updatedTerrList);

            const currentUsersubStatusExists = updatedTerrList.some((item) => item.lov_code === selectedDropdown.UsersubStatus);

            if (!currentUsersubStatusExists) {
                setSelectedDropdown((prev) => ({
                    ...prev,
                    UsersubStatus: 0,
                }));
            }
        } catch (error) {
            return;
        }
        setLoading(false);
    };

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

    async function TlvApprove(data: { depot_regn?: string; depot_name?: string; dlr_terr_code?: string; dlr_dealer_code?: string; dlr_dealer_name?: string; current_tlv?: number; td_proposed_tlv: any; credit_days?: number; td_proposed_cr_days: any; status_value?: string; td_auto_id?: number; td_remarks: any; auto_id: any; file_doc?: string; approved_type?: any; }) {
        setLoading(true);
        commonAlert('Are you sure you want to approve this TLV?', '', 'warning').then(async (result: any) => {
            if (result.value) {
                const param: any = {
                    tlv_id: String(data.auto_id),
                    approval_status: data.approved_type != '' ? data.approved_type : '',
                    remarks: data.td_remarks != '' ? data.td_remarks : '',
                    term_id: selectedValue != '' ? selectedValue : '',
                    Proposed_tlv: String(data.td_proposed_tlv) != '' ? data.td_proposed_tlv : '',
                    proposed_credit_day: String(data.td_proposed_cr_days) != '' ? data.td_proposed_cr_days : '',
                };

                const response: any = await Tlv.TlvRevisionApproval(param);

                if (response.response_message) {
                    commonSuccessToast('TLV Revision Request Approved Successfully.');
                    // navigate('/Protecton/TLV/TLVRevisionHoCommercialApproval/');
                    GetTlcHoCommercialApprovalListData(() => clearAllFormFields());
                    // router.reload();
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
                    // navigate('/Protecton/TLV/TLVRevisionHoCommercialApproval/');
                    GetTlcHoCommercialApprovalListData(() => clearAllFormFields());
                    // router.reload();
                }
            }
        });
        setLoading(false);
    }

    async function TlvRevert(data: { depot_regn?: string; depot_name?: string; dlr_terr_code?: string; dlr_dealer_code?: string; dlr_dealer_name?: string; current_tlv?: number; td_proposed_tlv: any; credit_days?: number; td_proposed_cr_days: any; status_value?: string; td_auto_id?: number; td_remarks: any; auto_id: any; file_doc?: string; reverted_type?: any; }) {
        setLoading(true);
        commonAlert('Are you sure you want to revert this TLV?', '', 'warning').then(async (result: any) => {
            if (result.value) {
                const param: any = {
                    tlv_id: String(data.auto_id),
                    approval_status: data.reverted_type != '' ? data.reverted_type : '',
                    remarks: data.td_remarks != '' ? data.td_remarks : '',
                    term_id: '0',
                    Proposed_tlv: String(data.td_proposed_tlv) != '' ? data.td_proposed_tlv : '',
                    proposed_credit_day: String(data.td_proposed_cr_days) != '' ? data.td_proposed_cr_days : '',
                };

                const response: any = await Tlv.TlvRevisionApproval(param);

                if (response.response_message) {
                    commonSuccessToast('TLV Revision Request Reverted Successfully.');
                    // navigate('/Protecton/TLV/TLVRevisionHoCommercialApproval/');
                    GetTlcHoCommercialApprovalListData(() => clearAllFormFields());
                    // router.reload();
                }
            }
        });
        setLoading(false);
    }

    // list api 
    const GetTlcHoCommercialApprovalListData = async (onComplete?: () => void) => {
        setLoading(true);
        const data: any = {
            depotCode: selectedDropdown.Userdepot != -1 ? depot[selectedDropdown.Userdepot].depot_code : '',
            terrCode: selectedDropdown.Userterritory != 0 ? applTerr[selectedDropdown.Userterritory].terr_code : '',
            billToCode: pcaParam.billTo != '' ? pcaParam.billTo : '',
            dealerCode: pcaParam.acctNo != '' ? pcaParam.acctNo : '',
            dealerName: pcaParam.customerName != '' ? pcaParam.customerName : '',
            mainStatus: selectedDropdown.Userstatus != -1 ? mainStatus[selectedDropdown.Userstatus].value : 'PENDING',
            aprvStatus: selectedDropdown.UsersubStatus != -1 ? approveStatus[selectedDropdown.UsersubStatus].lov_code : 'PENDING_HO_COMMERCIAL',
        };
        try {
            const response: any = await TlvHoCom.GetTlvHoCommercialApprovalList(data);
            if (response && response.data != null && response.data != undefined) {
                setData(response.data.table);
            } else {
                setData([]);
            }
        } catch (error) {
            return;
        }
        setLoading(false);
        
        // Execute callback if provided
        if (onComplete) {
            onComplete();
        }
    };

    const BesicDetailTable = ({ data }: any) => {
        return (
            <table className="custTableView w-full border-collapse">
                <thead>
                    <tr>
                        <th className="w-[5%] text-center align-middle">REGION</th>
                        <th className="w-[23%] text-center align-middle">DEPOT</th>
                        <th className="w-[7%] text-center align-middle">TERRITORY</th>
                        <th className="w-[15%] text-center align-middle">ACCT. NO.</th>
                        <th className="w-[50%] text-center align-middle">DEALER NAME</th>
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
                        <th className="w-[20%] text-center">Status</th>
                        <th className="w-[25%] text-center">Remarks</th>
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
        GetApplicableDepot();
        //GetPcaStatusData('PENDING');
        GetPcaStatusData('PENDING').then(() => {
            // Set the default value after dropdown data is populated
            setSelectedDropdown((prev) => ({
                ...prev,
                UsersubStatus: 4,
            }));
            GetTlcHoCommercialApprovalListData();
        });
    }, []);

    const handleSearch = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        GetTlcHoCommercialApprovalListData();
    };

    const handleApprove = (row: TLVType) => {
        TlvApprove(row);
    };

    const handleReject = (row: TLVType) => {
        TlvReject(row);
    };

    const handleView = (row: TLVType) => {
        GetTlvRevisionLog(row.auto_id);
    };

    const handleRevert = (row: TLVType) => {
        TlvRevert(row);
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
                size: 160,
            },
            {
                accessorKey: 'dlr_terr_code',
                header: 'Territory',
                size: 70,
            },
            {
                accessorKey: 'dlr_dealer_code',
                header: 'Acct. No.',
                size: 70,
            },
            {
                accessorKey: 'dlr_dealer_name',
                header: 'Dealer Name',
                size: 100,
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
                accessorKey: 'dlr_bill_to',
                header: 'Bill To',
                size: 70,
            },
            {
                accessorKey: 'current_tlv',
                header: 'Current TLV',
                size: 70,
            },
            {
                accessorKey: 'td_proposed_tlv',
                header: 'Requested TLV',
                size: 70,

                Cell: ({ cell, row }) =>
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
                size: 140,

                Cell: ({ cell, row }) =>
                    row.original.td_proposed_cr_days !== null && row.original.td_proposed_cr_days !== undefined ? (
                        <input className="tableInput" type="text" value={row.original.td_proposed_cr_days} onChange={(e) => handleEditChange(e, row.index, 'td_proposed_cr_days')} />
                    ) : (
                        <span className="text-gray-500">N/A</span>
                    ),
            },
            {
                accessorKey: 'dropdown_field',
                header: 'Credit Term',
                size: 140,

                Cell: ({ cell, row }) => {
                    useEffect(() => {
                        //setLoading(true);
                        if (row.original.depot_code && row.original.dlr_bill_to) {
                            const fetchDropdownOptions = async () => {
                                const data: any = {
                                    DepotCode: row.original.depot_code,
                                    BillToCode: row.original.dlr_bill_to,
                                }; // Replace with actual fields needed for the API call
                                try {

                                    const response: any = await TlvHoCom.TlvGetTermDetails(data);
                                    if (response.data.table != null && response.data.table != undefined) {
                                        const updatedList = [
                                            { label: 'Select...', value: '' },
                                            ...response.data.table.map((item: any) => ({
                                                label: item.tpt_description,
                                                value: item.tpt_term_id,
                                                tpt_description: item.tpt_description,
                                                tpt_term_id: item.tpt_term_id,
                                            })),
                                        ];
                                        setDropdownOptions(updatedList);
                                        const selectedOption = updatedList.find((option) => option.value === row.original.td_term_id);
                                        setSelectedValue(selectedOption ? selectedOption.value : null);
                                    } else {
                                        setDropdownOptions([]);
                                    }
                                } catch (error) { }
                                setLoading(false);
                            };

                            fetchDropdownOptions();
                        }
                    }, [row.original.depot_code, row.original.dlr_bill_to]);

                    return row.original.td_proposed_cr_days > 0 ? (
                        // <MantineSelect
                        //     data={dropdownOptions}
                        //     value={selectedValue}
                        //     onChange={(value) => setSelectedValue(value)}
                        //     placeholder="Select an option"
                        //     clearable
                        //     nothingFound="No options"
                        // />
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            value={selectedValue}
                            options={dropdownOptions}
                            onChange={(value) => setSelectedValue(value)}
                        />
                    ) : (
                        <span className="text-gray-500">N/A</span>
                    );
                },
            },
            {
                accessorKey: 'status_value',
                header: 'Status',
                size: 70,
            },
            {
                accessorKey: 'td_remarks',
                header: 'Remarks',
                size: 140,
                Cell: ({ cell, row }) => <input className="tableInput" type="text" value={row.original.td_remarks} onChange={(e) => handleEditChange(e, row.index, 'td_remarks')} />,
            },
            {
                id: 'action',
                header: 'Action',
                size: 120,

                Cell: ({ row }) => {
                    const status = row.original.status_value;
                    const downloadLink = row.original.file_doc ? `https://bpilmobile.bergerindia.com/VIRTUAL_DOCS/PROTECTON_MOB_APP/${row.original.file_doc}` : null;

                    const shouldShowButton = !status.includes('APPROVED') && !status.includes('REJECTED');

                    const shouldEditShowButton = !status.includes('APPROVED') && !status.includes('REJECTED') && row.original.td_proposed_cr_days > 0;

                    const handleEditClick = async () => {
                        setLoading(true);
                        setIsEditMode(true);
                        const data: any = {
                            DepotCode: row.original.depot_code,
                            BillToCode: row.original.dlr_bill_to,
                        };
                        try {
                            const response: any = await TlvHoCom.TlvGetTermDetails(data);
                            if (response.data.table != null && response.data.table != undefined) {
                                const updatedList = [
                                    { label: 'Select...', value: '' },
                                    ...response.data.table.map((item: any) => ({
                                        label: item.tpt_description,
                                        value: item.tpt_term_id,
                                        tpt_description: item.tpt_description,
                                        tpt_term_id: item.tpt_term_id,
                                    })),
                                ];
                                setDropdownOptions(updatedList);
                            } else {
                                setDropdownOptions([]);
                            }
                        } catch (error) { }
                        setLoading(false);
                    };

                    return (
                        <div className="flex justify-end">
                            <Group className="tableGroupBtn">
                                <Tooltip label="View" position="top" withArrow>
                                    <IconEye
                                        size={20}
                                        className="text-blue-600 cursor-pointer hover:text-blue-800 transition-colors"
                                        onClick={() => {
                                            handleView(row.original);
                                            setShowTlvModal(true);
                                        }}
                                    />
                                </Tooltip>
                                {shouldShowButton && (
                                    <Tooltip label="Approve" position="top" withArrow>
                                        <IconCheck
                                            size={20}
                                            className="text-green-600 cursor-pointer hover:text-green-800 transition-colors"
                                            onClick={() => handleApprove(row.original)}
                                        />
                                    </Tooltip>
                                )}
                                {shouldShowButton && (
                                    <Tooltip label="Reject" position="top" withArrow>
                                        <IconX
                                            size={20}
                                            className="text-red-600 cursor-pointer hover:text-red-800 transition-colors"
                                            onClick={() => handleReject(row.original)}
                                        />
                                    </Tooltip>
                                )}
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
                                {shouldShowButton && (
                                    <Tooltip label="Revert" position="top" withArrow>
                                        <IconRotate
                                            size={20}
                                            className="text-gray-600 cursor-pointer hover:text-gray-800 transition-colors"
                                            onClick={() => handleRevert(row.original)}
                                        />
                                    </Tooltip>
                                )}
                                {/* {shouldEditShowButton && (
                                    <Tooltip label="Edit" position="top" withArrow>
                                        <IconEdit 
                                            size={20} 
                                            className="text-violet-600 cursor-pointer hover:text-violet-800 transition-colors"
                                            onClick={handleEditClick}
                                        />
                                    </Tooltip>
                                )} */}
                            </Group>
                        </div>
                    );
                },
            },
        ],
        [dropdownOptions, selectedValue]
    );

    const table = useMantineReactTable({
        columns,
        data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableColumnResizing: true,
        enableTopToolbar: false,
        enableSorting: false,
        enableColumnActions: false,
        columnResizeMode: 'onChange',
        // mantineTableContainerProps: {
        //     style: {
        //         overflowX: 'hidden', // hides horizontal scrollbar
        //     },
        // }
    });

    return (
        <>
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-2">
                <h5 className="text-lg font-semibold dark:text-white-light">TLV Revision HO Commercial Approval</h5>
            </div>
            <div className="bg-white rounded-lg px-4 py-1 shadow-md mb-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-1">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Depot:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            value={selectedDropdown.Userdepot !== -1 ? depot[selectedDropdown.Userdepot] : null}
                            options={depot}
                            onChange={() => {
                                handleTypeSelect(event, 'USER_DEPOT');
                            }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Territory:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            value={selectedDropdown.Userterritory !== 0 ? applTerr[selectedDropdown.Userterritory] : null}
                            options={applTerr}
                            onChange={() => {
                                handleTypeSelect(event, 'USER_TERR');
                            }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Acct. No.:</label>
                        <input type="text" placeholder="Acct. No." className="w-full border rounded form-input text-sm" name="acctNo" value={pcaParam.acctNo} onChange={handleChange} autoComplete="off" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Customer Name:</label>
                        <input type="text" placeholder="Customer Name" className="w-full border rounded form-input text-sm" name="customerName" value={pcaParam.customerName} onChange={handleChange} autoComplete="off" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Bill To:</label>
                        <input type="text" placeholder="Bill To" className="w-full border rounded form-input text-sm" name="billTo" value={pcaParam.billTo} onChange={handleChange} autoComplete="off" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Status:<span className="text-red-500 ml-0.5">*</span></label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            value={selectedDropdown.Userstatus !== -1 ? mainStatus[selectedDropdown.Userstatus] : null}
                            options={mainStatus}
                            onChange={() => {
                                handleTypeSelect(event, 'USER_STATUS');
                            }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Sub Status:<span className="text-red-500 ml-0.5">*</span></label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            value={selectedDropdown.UsersubStatus !== -1 ? approveStatus[selectedDropdown.UsersubStatus] : null}
                            options={approveStatus}
                            onChange={() => {
                                handleTypeSelect(event, 'USER_SUB_STATUS');
                            }}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex items-end space-x-2">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm flex items-center" onClick={handleSearch}>
                            <CiSearch /> Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="mb-2">
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
    );
};

export default TLVRevisionHoCommercialApproval;
