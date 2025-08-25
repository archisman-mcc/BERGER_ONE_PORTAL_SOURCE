import React, { useState } from 'react';
import Select from 'react-select';
import { CiSearch } from 'react-icons/ci';
import { GetRegion_report, GetRegnWiseUserList, GetTSRMonitoringData, GetUserGroupApplicable } from '../../../services/api/protectonReport/ProtectonReport';
interface MonthOption {
    value: string;
    label: string;
}
interface YearOption {
    value: string;
    label: string;
}

const TSRMonitoringReport = () => {

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
        try {
            const response: any = await GetTSRMonitoringData(payloadObj);

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
    }

    React.useEffect(() => {
        console.log(data)
    }, [data]);

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
                        <label className="block text-sm font-semibold text-gray-700 w-20 opacity-0">
                            Submit
                        </label>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm flex items-center justify-center space-x-2 transition-colors duration-200 h-[38px] flex-1"
                            onClick={downloadTemplate}
                        >
                            <CiSearch className="text-sm" />
                            <span>Submit</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TSRMonitoringReport