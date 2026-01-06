import React, { useMemo, useState } from 'react';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiFileExcel2Fill } from "react-icons/ri";
import { GetStakeholderReport } from '../../../services/api/protectonReport/ProtectonReport';
import { commonErrorToast } from '../../../services/functions/commonToast';
import { useNavigate } from 'react-router-dom';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
// import { GetProductPromotionReport } from '../../../services/api/protectonReport/ProtectonReport';


const StakeholderReport: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [exported, setExported] = React.useState(false);
    const [fileDownloaded, setFileDownloaded] = React.useState(false);
    // const [errorInFileDownload, setErrorInFileDownload] = React.useState(false);
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);

    const formatDateForInput = (date: Date) => {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    const [data, setData] = useState<any>({
        fromDate: formatDateForInput(oneMonthAgo),
        toDate: formatDateForInput(currentDate)
    });

    const handleDateChange = (fld: string, value: string) => {
        setData((prev: any) => ({ ...prev, [fld]: value }));
    };

    const downloadTemplate = async () => {
        setLoading(true);
        setExported(true);
        const payloadObj = {
            fromDate: data.fromDate,
            toDate: data.toDate,
        }
        try {
            const response: any = await GetStakeholderReport(payloadObj);
            if (response?.statusCode !== 200) {
                commonErrorToast('No data found for the selected date range');
                setLoading(false);
                // setErrorInFileDownload(true);
                setFileDownloaded(false);
                return;
            }
            const fileUrl = response.data
            const link = document.createElement("a");
            link.href = fileUrl;
            link.download = "";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setFileDownloaded(true);
            // setErrorInFileDownload(false);
        } catch (error) {
            // setErrorInFileDownload(true);
            setFileDownloaded(false);
            return;
        }
        setLoading(false);
    }

    const backToDashboard = () => {
        navigate('/');
    }

    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'employee_code',
                header: 'Employee Code',
                size: 120,
            },
            {
                accessorKey: 'region',
                header: 'Region',
                size: 120,
            },
            {
                accessorKey: 'Terr',
                header: 'Terr',
                size: 120,
            },
            {
                accessorKey: 'Function',
                header: 'Function',
                size: 120,
            },
            {
                accessorKey: 'name_of_employee',
                header: 'Name of Employee',
                size: 120,
            },
            {
                accessorKey: 'lead_reference_no',
                header: 'lead reference no.',
                size: 120,
            },
            {
                accessorKey: 'project_details',
                header: 'project details',
                size: 120,
            },
            {
                accessorKey: 'oracle_customer_name',
                header: 'Oracle Customer name',
                size: 120,
            },
            {
                accessorKey: 'product_group',
                header: 'product group',
                size: 120,
            },
            {
                accessorKey: 'stakeholder_name',
                header: 'stakeholder name',
                size: 120,
            },
            {
                accessorKey: 'no_of_entries_made_by_stakeholder_in_this_lead',
                header: 'no. of entries made by stakeholder in this lead',
                size: 120,
            }
        ],
        []
    );
    const table = useMantineReactTable({
        columns,
        data: [],
        enableColumnResizing: false,
        enableStickyHeader: false,
        enableTopToolbar: false,
        enableBottomToolbar: false,
        enablePagination: false,
        enableSorting: false,
        enableColumnActions: false,
        columnResizeMode: 'onChange',
        renderEmptyRowsFallback: () =>
            fileDownloaded ? (
                <div className="text-center text-sm text-green-500 py-4">
                    File downloaded successfully
                </div>
            ) : (
                <div className="text-center text-sm text-green-500 py-4">
                    No records to display
                </div>
            ),
        mantineTableProps: {
            style: {
                minWidth: '1560px',
                borderColor: '#111827',
                borderWidth: '1px',
                borderStyle: 'solid',
            },
            className: 'border border-collapse',
            withColumnBorders: true,
        },
        mantineTableHeadProps: {
            className: 'bg-slate-50',
        },
        mantineTableHeadCellProps: {
            style: {
                whiteSpace: 'nowrap',
                fontWeight: 600,
                borderLeft: '2px solid #111827',
                borderRight: '2px solid #111827',
                borderBottom: '1px solid #1f2937',
            },
        },
        mantineTableContainerProps: {
            style: {
                overflow: 'auto',
                maxHeight: '16rem',
            },
        }
    });


    return (
        <>
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-1">
                <h5 className="text-lg font-semibold dark:text-white-light">
                    Stake Holder Report
                </h5>
            </div>

            <div className="bg-white rounded-lg px-4 py-2 shadow-md">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
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
                    <div className="flex items-center gap-2">
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

            {!loading && exported &&
                <>
                    <div className="mb-2 p-pl-table-item">
                        <MantineReactTable table={table} />
                    </div>
                </>
            }

            {/* {errorInFileDownload &&
                <div className="mb-2 bg-white rounded-lg px-4 py-2 shadow-md">
                    <div className="text-center text-sm text-red-500 py-4">
                        No records to display
                    </div>
                </div>
            } */}

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

export default StakeholderReport;