import React, { useState } from 'react';
import Select from 'react-select';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiFileExcel2Fill } from "react-icons/ri";
import { getmwadetailsdatav5 } from '../../../services/api/protectonReport/ProtectonReport';
import { commonErrorToast } from '../../../services/functions/commonToast';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
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

    const downloadTemplate = async () => {
        setLoading(true);
        const payloadObj = {
            rep_year: Number(data.selectedYear?.value),
            rep_month: Number(data.selectedMonth?.value),
        }
        try {
            const response: any = await getmwadetailsdatav5(payloadObj);
            if (!response?.data) {
                commonErrorToast('No data found for the selected date range');
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
            <div className="bg-white rounded-lg px-4 py-2 shadow-md">
                <div className="flex flex-wrap items-center gap-4">
                    {/* Month Selection */}
                    <div className="flex items-center gap-2">
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
                    <div className="flex items-center gap-2">
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
                    <div className="flex items-center space-x-2">
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
    );
};

export default MWAReportDetails;