import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import { CiSearch } from "react-icons/ci";
import { Button } from '@mantine/core';
import { FiEye } from "react-icons/fi";

const TransactUserTracking = () => {
    const [filterData, setFilterData] = useState({ dsrDate: new Date(), viewBy: "MTD" });

    const handleSearch = (e: any) => {
        e.preventDefault();
        // GetUserApplDlrSales({ prd_grp: "PROTECTON", report_grp_level: "REGION", region: '', depot: '', terr: '' });
    };

    return (
        <>
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-1">
                <h5 className="text-lg font-semibold dark:text-white-light">User Tracking</h5>
            </div>

            <div className="bg-white rounded-lg px-4 py-2 shadow-md mb-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                        <label htmlFor="dsr-date" className="block text-sm font-semibold mb-1">Select Plan Date:</label>
                        <Flatpickr
                            value={filterData.dsrDate || ''}
                            onChange={(dates: Date[]) => setFilterData((pre: any) => ({ ...pre, dsrDate: dates[0] || '' }))}
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
        </>
    )
}

export default TransactUserTracking