import { CiSearch } from "react-icons/ci";
import { useState, useRef } from "react";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import TableComponent from "./Components/TableComponent";

const TransactDsr = () => {
    const childRef = useRef<any>(null);

    const [tableData, settableData] = useState<any>([]);
    const [filterData, setFilterData] = useState({ dsrDate: new Date().toISOString().split('T')[0], viewBy: "MTD", usp_user_id: '' });
    const [loading, setLoading] = useState(false);

    const handleSearch = (e: any) => {
        e.preventDefault();
        childRef.current.triggerAPI({ prd_grp: "PROTECTON", report_grp_level: "REGION", region: '', depot: '', terr: '', selected_user: '' });
    };


    // useEffect(() => {
    //     console.log(tableData)
    // }, [tableData])

    return (
        <>
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-1">
                <h5 className="text-lg font-semibold dark:text-white-light">Transact DSR</h5>
            </div>

            <div className="bg-white rounded-lg px-4 py-2 shadow-md mb-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                        <label htmlFor="dsr-date" className="block text-sm font-semibold mb-1">DSR Date:</label>
                        <Flatpickr
                            value={filterData.dsrDate || ''}
                            onChange={(dates: any) => setFilterData((pre: any) => ({ ...pre, dsrDate: dates[0].slice(0, 10) || '' }))}
                            options={{
                                dateFormat: 'd/m/Y',
                            }}
                            className="tableInput"
                        />
                    </div>
                    <div>
                        <span className="block text-sm font-semibold mb-1">View by:</span>
                        <label className="mr-4">
                            <input
                                type="radio"
                                name="viewBy"
                                value="YTD"
                                checked={filterData?.viewBy === "YTD"}
                                onChange={e => setFilterData((pre: any) => ({ ...pre, viewBy: e.target.value }))}
                                className="mr-1"
                            />
                            YTD
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="viewBy"
                                value="MTD"
                                checked={filterData?.viewBy === "MTD"}
                                onChange={e => setFilterData((pre: any) => ({ ...pre, viewBy: e.target.value }))}
                                className="mr-1"
                            />
                            MTD
                        </label>
                    </div>

                    <div className="flex items-center justify-end md:col-span-2">
                        <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm flex items-center space-x-2"
                            onClick={handleSearch}
                        >
                            <CiSearch />
                            <span>Search</span>
                        </button>
                    </div>
                </div>
            </div>

            <TableComponent ref={childRef} tableData={tableData} settableData={settableData} setLoading={setLoading} filterData={filterData} form="TransactDsr" />

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
}

export default TransactDsr;