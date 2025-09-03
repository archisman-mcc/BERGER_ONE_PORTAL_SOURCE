import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { GetStakeholderReport } from '../../../services/api/protectonReport/ProtectonReport';
// import { GetProductPromotionReport } from '../../../services/api/protectonReport/ProtectonReport';


const StakeholderReport: React.FC = () => {
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);

    const formatDateForInput = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const [data, setData] = useState<any>({
        fromDate: formatDateForInput(oneMonthAgo),
        toDate: formatDateForInput(currentDate)
    });

    const handleDateChange = (fld: string, value: string) => {
        setData((prev: any) => ({ ...prev, [fld]: value }));
    };

    const downloadTemplate = async () => {
        const payloadObj = {
            fromDate: data.fromDate,
            toDate: data.toDate,
        }
        try {
            const response: any = await GetStakeholderReport(payloadObj);
            const fileUrl = response.data
            const link = document.createElement("a");
            link.href = fileUrl;
            link.download = "";
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
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-1">
                <h5 className="text-lg font-semibold dark:text-white-light">
                    Stake Holder Report
                </h5>
            </div>

            <div className="bg-white rounded-lg px-4 py-2 shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex items-center">
                        <label className="block text-sm font-semibold w-24 text-right pr-2">
                            From Date:
                        </label>
                        <input
                            className="border rounded form-input text-sm w-32"
                            type="date"
                            value={data?.fromDate}
                            onChange={(e) => handleDateChange('fromDate', e.target.value)}
                            style={{ padding: "5px" }}
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="block text-sm font-semibold w-24 text-right pr-2">
                            To Date:
                        </label>
                        <input
                            className="border rounded form-input text-sm w-32"
                            type="date"
                            value={data?.toDate}
                            onChange={(e) => handleDateChange('toDate', e.target.value)}
                            style={{ padding: "5px" }}
                        />
                    </div>
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

export default StakeholderReport;