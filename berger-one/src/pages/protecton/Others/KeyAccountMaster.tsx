
import { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import { CommonLovDetails, GetRegion } from '../../../services/api/users/UserProfile';
import { UseAuthStore } from '../../../services/store/AuthStore';
import { FaPlus } from "react-icons/fa6";
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { GetKeyAccountList, SubmitKeyAccountInsertUpdate } from '../../../services/api/protectonLead/PotentialLead';
import { commonErrorToast, commonSuccessToast } from '../../../services/functions/commonToast';
import { Button } from '@mantine/core';
import { FiEye } from "react-icons/fi";
import { GrPowerReset } from "react-icons/gr";

const KeyAccountMaster = () => {
    const user = UseAuthStore((state: any) => state.userDetails);
    const [ddlData, setDdlData]: any = useState({ key_account_type_List: [], regionList: [] });
    const dataObj = { key_account_id: "", key_account_type: '', key_account_name: '', contact_name: '', contact_no: '', region: [] };
    const [data, setData]: any = useState({ ...dataObj });
    const [dgData, setDgData]: any = useState([]);

    const GetKeyAccountTypeListAPIcall = async (inputValue: any) => {
        try {
            const response: any = await CommonLovDetails(inputValue);
            setDdlData((prevData: any) => ({ ...prevData, key_account_type_List: [...response.data.table] }));
        } catch (error) {
            return;
        }
    }

    const GetRegionAPICALL = async () => {
        const data: any = {
            user_group: user.group_code,
            app_id: 0
        };
        try {
            const response: any = await GetRegion(data);
            setDdlData((prevData: any) => ({
                ...prevData,
                regionList: response.data.table || [],
            }));
        } catch (error) {
            return;
        }
    }

    const SubmitKeyAccountInsertUpdateAPICall = async () => {
        try {
            const response: any = await SubmitKeyAccountInsertUpdate({ ...data, key_account_type: data?.key_account_type?.value, region: data?.region.map((d: any) => d?.value).join(', ') });
            if (response?.statusCode !== 200) {
                commonErrorToast(response?.message || 'Error submitting data');
                return;
            } else {
                setData({ ...dataObj });
                GetKeyAccountListAPIcall({ business_line: "PROTECTON", key_account_type: '' });
                commonSuccessToast(response?.message || 'Data submitted successfully');
            }
        } catch (error) {
            return;
        }
    }

    const GetKeyAccountListAPIcall = async (inputValue: any) => {
        try {
            const response: any = await GetKeyAccountList(inputValue);
            setDgData(response.data.table || []);
        } catch (error) {
            return;
        }
    }

    type ColumnInterface = {
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

    const columns = useMemo<MRT_ColumnDef<ColumnInterface>[]>(
        () => [
            {
                accessorKey: 'business_line',
                header: 'Business Line',
                // size: 60,
            },
            {
                accessorKey: 'contact_name',
                header: 'Contact Name',
                // size: 60,
            },
            {
                accessorKey: 'contact_no',
                header: 'Contact No',
                // size: 60,
            },
            {
                accessorKey: 'key_account_name',
                header: 'Account Name',
                // size: 60,
            },
            {
                accessorKey: 'key_account_type',
                header: 'Account Type',
                // size: 60,
            },
            {
                accessorKey: 'region',
                header: 'Region',
                // size: 60,
            },
            {
                id: 'action',
                header: 'Action',
                // size: 30,
                mantineTableHeadCellProps: {
                    style: {
                        textAlign: 'center',
                    },
                },
                mantineTableBodyCellProps: {
                    style: {
                        textAlign: 'center',
                    },
                },
                Cell: ({ row }: any) => {
                    return (
                        <Button
                            variant="outline"
                            color="blue"
                            style={{ padding: 5 }}
                            leftIcon={<FiEye size={16} style={{ paddingRight: "2px" }} />}
                            onClick={(e) => {
                                e.stopPropagation();
                                const key_account_type = { value: ddlData?.key_account_type_List.find((d: any) => d.lov_code === row.original.key_account_type)?.lov_code, label: ddlData?.key_account_type_List.find((d: any) => d.lov_code === row.original.key_account_type)?.lov_value }
                                setData({
                                    ...data,
                                    key_account_id: row.original.key_account_id,
                                    key_account_type: key_account_type,
                                    key_account_name: row.original.key_account_name,
                                    contact_name: row.original.contact_name,
                                    contact_no: row.original.contact_no,
                                    region: row.original.region
                                        .split(',')
                                        .map((item: any) => item.trim())
                                        .filter(Boolean)
                                        .map((v: any) => ({ value: v, label: v })),
                                });
                            }}
                        >
                            View
                        </Button>
                    );
                },
            },
        ],
        [ddlData]
    );
    const table = useMantineReactTable({
        columns,
        data: dgData,
        enableColumnResizing: false,
        enableStickyHeader: true,
        enableTopToolbar: false,
        enableSorting: false,
        enableColumnActions: false,
        columnResizeMode: 'onChange',
        defaultColumn: {
            minSize: 0,
            size: 0,
            maxSize: 1000,
        },
        mantinePaperProps: {
            style: {
                width: '100%',
                maxWidth: '100%',
            },
        },
        mantineTableProps: {
            style: {
                tableLayout: 'fixed',
                width: '100%',
            },
        },
        mantineTableHeadCellProps: {
            style: {
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                padding: '8px',
            },
        },
        mantineTableBodyCellProps: {
            style: {
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                padding: '8px',
            },
        },
        mantineTableContainerProps: {
            style: {
                width: '100%',
                maxWidth: '100%',
                overflowX: 'hidden',
                overflowY: 'auto',
                maxHeight: '16rem',
            },
        }
    });

    const AddNewKeyAc = () => {
        SubmitKeyAccountInsertUpdateAPICall();
    }

    useEffect(() => {
        GetKeyAccountTypeListAPIcall({ lov_type: 'PT_KEY_ACCOUNT_TYPE', active: 'Y' });
        GetKeyAccountListAPIcall({ business_line: "PROTECTON", key_account_type: data?.key_account_type?.value || '' });
        GetRegionAPICALL();
    }, []);
    // useEffect(() => {
    //     console.log(data)
    // }, [data]);
    // useEffect(() => {
    //     console.log(ddlData)
    // }, [ddlData]);


    return (
        <>
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-2">
                <h5 className="text-lg font-semibold dark:text-white-light">Key Account</h5>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 px-5 py-4 shadow-sm mb-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-12 gap-4 items-end">
                    <div className="xl:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Key Account Type:<span className="text-red-500 ml-0.5">*</span>
                            </label>
                            <Select
                                className="text-sm"
                                isSearchable={true}
                                options={ddlData?.key_account_type_List.map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                                value={data.key_account_type}
                                onChange={(event: any) => {
                                    setData((pre: any) => ({ ...pre, key_account_type: event }))
                                }}
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        minHeight: '36px',
                                        height: '36px',
                                        borderColor: '#d1d5db',
                                        boxShadow: 'none',
                                        '&:hover': { borderColor: '#93c5fd' },
                                    }),
                                    valueContainer: (base) => ({
                                        ...base,
                                        padding: '0 8px',
                                        minHeight: '34px',
                                    }),
                                    input: (base) => ({
                                        ...base,
                                        margin: '0',
                                        padding: '0',
                                    }),
                                }}
                            />
                        </div>
                    <div className="xl:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Key Account Name:<span className="text-red-500 ml-0.5">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter account name"
                                className="w-full border border-gray-300 rounded-md form-input text-sm h-9 px-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                                value={data?.key_account_name}
                                onChange={(event: any) => setData((pre: any) => ({ ...pre, key_account_name: event.target.value }))}
                                autoComplete="off"
                            />
                        </div>
                    <div className="xl:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Contact Name:<span className="text-red-500 ml-0.5">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter contact name"
                                className="w-full border border-gray-300 rounded-md form-input text-sm h-9 px-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                                value={data?.contact_name}
                                onChange={(event: any) => setData((pre: any) => ({ ...pre, contact_name: event.target.value }))}
                                autoComplete="off"
                            />
                        </div>
                    <div className="xl:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Contact No.:<span className="text-red-500 ml-0.5">*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Enter contact number"
                                className="w-full border border-gray-300 rounded-md form-input text-sm h-9 px-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                                value={data?.contact_no}
                                onChange={(event: any) => setData((pre: any) => ({ ...pre, contact_no: event.target.value }))}
                                autoComplete="off"
                            />
                        </div>
                    <div className="xl:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Region:</label>
                            <Select
                                className="text-sm"
                                isMulti
                                isSearchable={true}
                                closeMenuOnSelect={false}
                                options={ddlData.regionList.map((d: any) => ({ value: d.depot_regn, label: d.regn_new }))}
                                value={data.region}
                                onChange={(event: any) =>
                                    setData((pre: any) => ({ ...pre, region: event }))
                                }
                                onMenuOpen={() => {
                                    return false;
                                }}
                                menuPlacement="auto"
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        minHeight: '36px',
                                        height: '36px',
                                    }),
                                    valueContainer: (base) => ({
                                        ...base,
                                        overflow: 'auto',
                                        flexWrap: 'nowrap',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        padding: '0 8px',
                                        minHeight: '34px',
                                        '&::-webkit-scrollbar': {
                                            width: '4px',
                                            height: '4px',
                                        },
                                        '&::-webkit-scrollbar-track': {
                                            background: 'transparent',
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                            background: '#cbd5e0',
                                            borderRadius: '2px',
                                        },
                                        '&::-webkit-scrollbar-thumb:hover': {
                                            background: '#a0aec0',
                                        },
                                    }),
                                    multiValue: (base) => ({
                                        ...base,
                                        flexShrink: 0,
                                        margin: '1px',
                                        fontSize: '9px',
                                        padding: '1px 4px',
                                        height: '18px',
                                    }),
                                    multiValueLabel: (base) => ({
                                        ...base,
                                        whiteSpace: 'nowrap',
                                        fontSize: '9px',
                                        padding: '0 2px',
                                    }),
                                    multiValueRemove: (base) => ({
                                        ...base,
                                        padding: '0 2px',
                                        height: '18px',
                                    }),
                                    input: (base) => ({
                                        ...base,
                                        margin: '0',
                                        padding: '0',
                                    }),
                                }}
                            />
                        </div>
                    <div className="xl:col-span-2 flex items-center gap-2 justify-end md:justify-start lg:justify-start xl:justify-end">
                            <button
                                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 h-9 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 text-xs"
                                onClick={() => AddNewKeyAc()}
                            >
                                {data?.key_account_id ? '' : <FaPlus />}
                                <span>{data?.key_account_id ? 'Update' : 'Add'}</span>
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-3 h-9 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 text-xs"
                                onClick={() => setData({ ...dataObj })}
                            >
                                <GrPowerReset />
                                <span>Reset</span>
                            </button>
                        </div>
                </div>
            </div>

            <div className="mb-2 w-full overflow-x-hidden">
                <MantineReactTable table={table} />
            </div>
        </>
    )
}

export default KeyAccountMaster