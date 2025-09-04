import React, { useState } from 'react';
import Select from 'react-select';
import { GetRegion_report, GetRegnWiseUserList, GetTSRMonitoringData, GetUserGroupApplicable } from '../../../services/api/protectonReport/ProtectonReport';
import { commonErrorToast } from '../../../services/functions/commonToast';
import { useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiFileExcel2Fill } from "react-icons/ri";

interface MonthOption {
    value: string;
    label: string;
}
interface YearOption {
    value: string;
    label: string;
}

const TSRMonitoringReport = () => {
    const [loading, setLoading] = React.useState(false);

    const navigate = useNavigate();

    const currentDate = new Date();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentYear = String(currentDate.getFullYear());

    const monthOptions: MonthOption[] = [
        { value: '00', label: 'Select' },
        { value: '01', label: 'January' },
        { value: '02', label: 'February' },
        { value: '03', label: 'March' },
        { value: '04', label: 'April' },
        { value: '05', label: 'May' },
        { value: '06', label: 'June' },
        { value: '07', label: 'July' },
        { value: '08', label: 'August' },
        { value: '09', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' }
    ];

    const yearOptions: YearOption[] = [
        { value: '', label: 'Select' },
        { value: '2020', label: '2020' },
        { value: '2021', label: '2021' },
        { value: '2022', label: '2022' },
        { value: '2023', label: '2023' },
        { value: '2024', label: '2024' },
        { value: '2025', label: '2025' }
    ];

    const GetRegion = async () => {
        try {
            const response: any = await GetRegion_report({});
            setData((prevData: any) => ({
                ...prevData,
                region: response.data.table.map((res: any) => ({ value: res?.depot_regn, label: res?.depot_regn })) || []
            }));
        } catch (error) {
            return;
        }
    }
    const GetUserGroup = async () => {
        try {
            const response: any = await GetUserGroupApplicable({});
            setData((prevData: any) => ({
                ...prevData,
                userGroup: response.data.table.map((res: any) => ({ value: res?.grp_user_group_code, label: res?.grp_user_group_desc })) || []
            }));
        } catch (error) {
            return;
        }
    }
    const GetRegnWiseUser = async () => {
        const payload: any = {
            regn: data?.selectedRegion?.value,
            group_code: data?.selectedUserGroup?.value,
        };
        try {
            const response: any = await GetRegnWiseUserList(payload);
            setData((prevData: any) => ({
                ...prevData,
                user: response.data.table.map((res: any) => ({ value: res?.usp_user_id, label: res?.usp_user_name })) || []
            }));
        } catch (error) {
            return;
        }
    }

    const [data, setData] = useState<any>({
        region: [],
        selectedRegion: null,
        userGroup: [],
        selectedUserGroup: null,
        user: [],
        selectedUser: null,
        months: monthOptions,
        selectedMonth: monthOptions.find(m => m.value === currentMonth) || monthOptions[0],
        year: yearOptions,
        selectedYear: yearOptions.find(y => y.value === currentYear) || yearOptions[0]
    });

    const handleChange = ({ keyName, value }: any) => {
        setData((prev: any) => ({ ...prev, [keyName]: value }));
    }

    const downloadTemplate = async () => {
        const payloadObj = {
            regn: data.selectedRegion?.value,
            rep_user: data.selectedUser?.value,
            user_group: data.selectedUserGroup?.value,
            rep_year: Number(data.selectedYear?.value),
            rep_month: Number(data.selectedMonth?.value),
        }
        setLoading(true);
        try {
            const response: any = await GetTSRMonitoringData(payloadObj);
            if (response?.statusCode !== 200) {
                commonErrorToast('No data found');
                setLoading(false);
                return;
            }
            // Create a hidden link element
            const fileUrl = response.data
            const link = document.createElement("a");
            link.href = fileUrl;
            link.download = ""; // Let browser decide filename or set: "myfile.pdf"
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            return;
        }
        setLoading(false);
    }

    const backToDashboard = () => {
        // window.history.back();
        navigate('/');
    }

    // React.useEffect(() => {
    //     console.log(data)
    // }, [data]);

    React.useEffect(() => {
        GetRegion();
        GetUserGroup();
    }, []);
    React.useEffect(() => {
        data?.selectedRegion && data?.selectedUserGroup && GetRegnWiseUser();
    }, [data?.selectedRegion, data?.selectedUserGroup]);

    return (
        <>
            {/* Page Header */}
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-1">
                <h5 className="text-lg font-semibold dark:text-white-light">
                    EMPLOYEE MONITOR OUTPUT
                </h5>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-md mb-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-4">
                    {/* Region Selection */}
                    <div className="flex items-center space-x-3">
                        <label className="block text-sm font-semibold text-gray-700 w-20">
                            Region:
                        </label>
                        <Select
                            className="text-sm flex-1"
                            isSearchable={true}
                            options={data.region}
                            value={data.selectedRegion}
                            onChange={(event: any) => { handleChange({ keyName: 'selectedUser', value: null }); handleChange({ keyName: 'selectedRegion', value: event }) }}
                            placeholder="Select Region"
                            isClearable
                        />
                    </div>

                    {/* User Group Selection */}
                    <div className="flex items-center space-x-3">
                        <label className="block text-sm font-semibold text-gray-700 w-20">
                            User Group:
                        </label>
                        <Select
                            className="text-sm flex-1"
                            isSearchable={true}
                            options={data.userGroup}
                            value={data.selectedUserGroup}
                            onChange={(event: any) => { handleChange({ keyName: 'selectedUser', value: null }); handleChange({ keyName: 'selectedUserGroup', value: event }); }}
                            placeholder="Select User Group"
                            isClearable
                        />
                    </div>

                    {/* User Selection */}
                    <div className="flex items-center space-x-3">
                        <label className="block text-sm font-semibold text-gray-700 w-20">
                            User:
                        </label>
                        <Select
                            className="text-sm flex-1"
                            isSearchable={true}
                            options={data.user}
                            value={data.selectedUser}
                            onChange={(event: any) => handleChange({ keyName: 'selectedUser', value: event })}
                            placeholder="Select User"
                            isClearable
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <label className="block text-sm font-semibold text-gray-700 w-20">
                            Month:
                        </label>
                        <Select
                            className="text-sm flex-1"
                            isSearchable={true}
                            options={data.months}
                            value={data.selectedMonth}
                            onChange={(event: any) => handleChange({ keyName: 'selectedMonth', value: event })}
                            placeholder="Select Month"
                            isClearable
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <label className="block text-sm font-semibold text-gray-700 w-20">
                            Year:
                        </label>
                        <Select
                            className="text-sm flex-1"
                            isSearchable={true}
                            options={data.year}
                            value={data.selectedYear}
                            onChange={(event: any) => handleChange({ keyName: 'selectedYear', value: event })}
                            placeholder="Select Year"
                            isClearable
                        />
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm flex items-center justify-center space-x-1 transition-colors duration-200 h-[38px] w-24"
                            onClick={downloadTemplate}
                        >
                            <RiFileExcel2Fill className="text-sm" />
                            <span>Export</span>
                        </button>
                        <button
                            className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600 text-sm flex items-center justify-center space-x-1 transition-colors duration-200 h-[38px] w-24"
                            onClick={backToDashboard}
                        >
                            <MdOutlineKeyboardBackspace className="text-sm" />
                            <span>Back</span>
                        </button>
                    </div>
                </div>
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

export default TSRMonitoringReport