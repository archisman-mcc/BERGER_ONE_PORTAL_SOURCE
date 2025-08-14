import React, { useState } from 'react';
import Select from 'react-select';
import { CiSearch } from 'react-icons/ci';
import axios, { type AxiosResponse } from 'axios';
import { getmwadetailsdatav5 } from '../../../services/api/protectonReport/protectonReport';
import { BASE_ENDPOINTS } from '../../../helper/EndPoints';

// Types for the component
interface MonthOption {
    value: string;
    label: string;
}

interface YearOption {
    value: string;
    label: string;
}

interface FormData {
    months: MonthOption[];
    selectedMonth: MonthOption | null;
    year: YearOption[];
    selectedYear: YearOption | null;
}

const MWAReportDetails: React.FC = () => {
    // Get current month and year
    const currentDate = new Date();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentYear = String(currentDate.getFullYear());

    // Define month and year options
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

    const [data, setData] = useState<FormData>({
        months: monthOptions,
        selectedMonth: monthOptions.find(m => m.value === currentMonth) || monthOptions[0],
        year: yearOptions,
        selectedYear: yearOptions.find(y => y.value === currentYear) || yearOptions[0]
    });

    const handleMonthChange = (selectedOption: MonthOption | null) => {
        setData(prev => ({ ...prev, selectedMonth: selectedOption }));
    };

    const handleYearChange = (selectedOption: YearOption | null) => {
        setData(prev => ({ ...prev, selectedYear: selectedOption }));
    };

    // const getAccessToken = () => {
    //     return localStorage.getItem("_token");
    // }
    // const downloadTemplate = () => {
    //     const url = BASE_ENDPOINTS.v1 + BASE_ENDPOINTS.ProtectonReport + 'getmwadetailsdatav5'
    //     const payloadObj = {
    //         rep_year: Number(data.selectedYear?.value),
    //         rep_month: Number(data.selectedMonth?.value),
    //     }
    //     axios({
    //         url: url,
    //         method: 'GET',
    //         data: payloadObj,
    //         responseType: 'blob',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'AuthToken': getAccessToken()
    //         },
    //     }).then((res: AxiosResponse<Blob> | any) => {
    //         if (res) {
    //             const contentDispositionHeader: string | null = res.headers.get('File-Name');
    //             if (contentDispositionHeader) {
    //                 const fileName = contentDispositionHeader;
    //                 const link = document.createElement('a');
    //                 link.href = URL.createObjectURL(res.data);
    //                 link.download = fileName;
    //                 document.body.appendChild(link);
    //                 link.click();
    //                 document.body.removeChild(link);
    //                 URL.revokeObjectURL(link.href);
    //             }
    //         }
    //     }).catch((err: any) => {
    //         console.error("Error fetching data", err);
    //     });
    // }

    const downloadTemplate = async () => {
        const payloadObj = {
            rep_year: Number(data.selectedYear?.value),
            rep_month: Number(data.selectedMonth?.value),
        }
        try {
            const response: any = await getmwadetailsdatav5(payloadObj);

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
                    Market Working Allowance Details
                </h5>
            </div>

            {/* Form Container */}
            <div className="bg-white rounded-lg px-4 py-2 shadow-md mb-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    {/* Month Selection */}
                    <div className="flex items-center space-x-2">
                        <label className="block text-sm font-semibold whitespace-nowrap">
                            Month:
                        </label>
                        <Select
                            className="text-sm flex-1"
                            isSearchable={true}
                            options={data.months}
                            value={data.selectedMonth}
                            onChange={handleMonthChange}
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
                            onChange={handleYearChange}
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
    );
};

export default MWAReportDetails;