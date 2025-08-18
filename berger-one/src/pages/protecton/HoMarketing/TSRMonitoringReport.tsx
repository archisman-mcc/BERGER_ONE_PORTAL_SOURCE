import React, { useState } from 'react';
import Select from 'react-select';
import { CiSearch } from 'react-icons/ci';
import { GetTSRMonitoringData } from '../../../services/api/protectonReport/protectonReport';
interface MonthOption {
    value: string;
    label: string;
}
interface YearOption {
    value: string;
    label: string;
}

const TSRMonitoringReport = () => {
    const regionOptions = [
        { value: '', label: 'Select' },
        { value: 'BNB', label: 'BNB' },
        { value: 'East', label: 'East' },
        { value: 'East-1', label: 'East-1' },
        { value: 'East-2', label: 'East-2' },
        { value: 'EXP', label: 'EXP' },
        { value: 'H.O.', label: 'H.O.' },
        { value: 'N1-Delhi-WUP', label: 'N1-Delhi-WUP' },
        { value: 'N1-DRAJ', label: 'N1-DRAJ' },
        { value: 'N2-Haryana', label: 'N2-Haryana' },
        { value: 'N2-UPUK', label: 'N2-UPUK' },
        { value: 'N3-PJHH', label: 'N3-PJHH' },
        { value: 'N3-Rajasthan', label: 'N3-Rajasthan' },
        { value: 'N4-Central UP', label: 'N4-Central UP' },
        { value: 'N5-Punjab-HP-JK', label: 'N5-Punjab-HP-JK' },
        { value: 'North-1', label: 'North-1' },
        { value: 'North-2', label: 'North-2' },
        { value: 'North-3', label: 'North-3' },
        { value: 'South-1', label: 'South-1' },
        { value: 'South-1-AP', label: 'South-1-AP' },
        { value: 'South-1-TN', label: 'South-1-TN' },
        { value: 'South-2', label: 'South-2' },
        { value: 'South-3', label: 'South-3' },
        { value: 'TIGER - H.O.', label: 'TIGER - H.O.' },
        { value: 'West-1', label: 'West-1' },
        { value: 'West-1-MB', label: 'West-1-MB' },
        { value: 'West-1-PN', label: 'West-1-PN' },
        { value: 'West-2', label: 'West-2' },
        { value: 'West-2-GJ', label: 'West-2-GJ' },
        { value: 'West-2-MP', label: 'West-2-MP' },
    ]
    const userGroupOptions = [
        { value: '', label: 'Select' },
        { value: 'Administrator', label: 'Administrator' },
        { value: 'Coating Service', label: 'Coating Service' },
        { value: 'CTO', label: 'CTO' },
        { value: 'Development Officer', label: 'Development Officer' },
        { value: 'DSM/BDM', label: 'DSM/BDM' },
        { value: 'FC in-charge', label: 'FC in-charge' },
        { value: 'HO Commercial', label: 'HO Commercial' },
        { value: 'HO Manager', label: 'HO Manager' },
        { value: 'HO support', label: 'HO support' },
        { value: 'KAM', label: 'KAM' },
        { value: 'OEM in-charge', label: 'OEM in-charge' },
        { value: 'Regional Head', label: 'Regional Head' },
        { value: 'RM in-charge', label: 'RM in-charge' },
        { value: 'Sales (Mutltiple Terr)', label: 'Sales (Mutltiple Terr)' },
        { value: 'Sales (Single Terr)', label: 'Sales (Single Terr)' },
        { value: 'Sales Manager (ASM)', label: 'Sales Manager (ASM)' },
        { value: 'Site Supervisor (OFF-ROLE)', label: 'Site Supervisor (OFF-ROLE)' },
    ]
    const userOptions = [
        { value: '', label: 'Select' },
        // { value: 'User1', label: 'User1' },
        // { value: 'User2', label: 'User2' },
        // { value: 'User3', label: 'User3' },
    ];
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

    const [data, setData] = useState<any>({
        region: regionOptions,
        selectedRegion: null,
        userGroup: userGroupOptions,
        selectedUserGroup: null,
        user: userOptions,
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

    return (
        <>
            {/* Page Header */}
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-1">
                <h5 className="text-lg font-semibold dark:text-white-light">
                    EMPLOYEE MONITOR OUTPUT
                </h5>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-md mb-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    {/* Region Selection */}
                    <div className="flex items-center space-x-2">
                        <label className="block text-sm font-semibold whitespace-nowrap">
                            Region:
                        </label>
                        <Select
                            className="text-sm flex-1"
                            isSearchable={true}
                            options={data.region}
                            value={data.selectedRegion}
                            onChange={(event: any) => handleChange({ keyName: 'selectedRegion', value: event })}
                            placeholder="Select Region"
                            isClearable
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <label className="block text-sm font-semibold whitespace-nowrap">
                            User Group:
                        </label>
                        <Select
                            className="text-sm flex-1"
                            isSearchable={true}
                            options={data.userGroup}
                            value={data.selectedUserGroup}
                            onChange={(event: any) => handleChange({ keyName: 'selectedUserGroup', value: event })}
                            placeholder="Select User Group"
                            isClearable
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <label className="block text-sm font-semibold whitespace-nowrap">
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
                    <div className="flex items-center space-x-2">
                        <label className="block text-sm font-semibold whitespace-nowrap">
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

                    {/* Year Selection */}
                    <div className="flex items-center space-x-2">
                        <label className="block text-sm font-semibold whitespace-nowrap">
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

                    {/* Submit Button */}
                    <button
                        className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-xs flex items-center space-x-2 transition-colors duration-200 w-fit"
                        onClick={downloadTemplate}
                    >
                        <CiSearch className="text-sm" />
                        <span>Submit</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default TSRMonitoringReport