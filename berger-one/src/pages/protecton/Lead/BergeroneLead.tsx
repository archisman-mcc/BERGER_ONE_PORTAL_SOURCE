import React, { useEffect, useMemo, useRef } from 'react';
import Select from 'react-select';
import { UseAuthStore } from '../../../services/store/AuthStore';
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';

const BergeroneLead = () => {
    return (
        <>
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-1">
                <h5 className="text-lg font-semibold dark:text-white-light">Potential Lead</h5>
            </div>

            <div className="bg-white rounded-lg px-4 py-2 shadow-md mb-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                        <span className="block text-sm font-semibold mb-1">View by:</span>
                        <label className="mr-4">
                            <input
                                type="radio"
                                name="viewBy"
                                value="FROM"
                                // checked={filter_Data?.viewBy === "FROM"}
                                // onChange={e => setFilter_Data((pre: any) => ({ ...pre, viewBy: e.target.value }))}
                                className="mr-1"
                            />
                            FROM
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="viewBy"
                                value="TO"
                                // checked={filter_Data?.viewBy === "TO"}
                                // onChange={e => setFilter_Data((pre: any) => ({ ...pre, viewBy: e.target.value, selectedvertical: { label: "PROLINKS", value: 1 } }))}
                                className="mr-1"
                            />
                            TO
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Select Vertical:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            // options={ddlData.verticalData.map((d: any) => ({
                            //     value: d.bm_id,
                            //     label: d.bm_name,
                            // }))}
                            // value={filter_Data.selectedvertical}
                            // onChange={(event: any) => {
                            //     setFilter_Data((pre: any) => ({ ...pre, selectedvertical: event }))
                            // }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Select Region:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            // options={ddlData.protecton_regionList.map((d: any) => ({ value: d.depot_regn, label: d.regn_new }))}
                            // value={filter_Data.selectedProtecton_region}
                            // onChange={(event: any) => {
                            //     setLoading(true);
                            //     Getdepot(event.value);
                            //     Getterr({ region: event.value, depot: '' });
                            //     setTimeout(() => {
                            //         setLoading(false);
                            //     }, 2500);
                            //     setFilter_Data((pre: any) => ({ ...pre, selectedProtecton_region: event, selectedDepot: '', selectedTerr: '' }))
                            // }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Select Depot:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            // options={ddlData.depotList.map((d: any) => ({ value: d.depot_code, label: d.depot_name }))}
                            // value={filter_Data.selectedDepot}
                            // onChange={(event: any) => {
                            //     setLoading(true);
                            //     Getterr({ region: filter_Data.selectedProtecton_region.value, depot: event.value });
                            //     setTimeout(() => {
                            //         setLoading(false);
                            //     }, 2500);
                            //     setFilter_Data((pre: any) => ({ ...pre, selectedDepot: event, selectedTerr: '' }))
                            // }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Select Territory:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            // options={ddlData.terrList.map((d: any) => ({ value: d.terr_code, label: d.terr_name }))}
                            // value={filter_Data.selectedTerr}
                            // onChange={(event: any) => {
                            //     setFilter_Data((pre: any) => ({ ...pre, selectedTerr: event }))
                            // }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Assign Status:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            // options={ddlData.assignStatusList.map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                            // value={filter_Data.selectedAssignStatus}
                            // onChange={(event: any) => {
                            //     setFilter_Data((pre: any) => ({ ...pre, selectedAssignStatus: event }))
                            // }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Work Status:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            // options={ddlData.workStatusList.map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                            // value={filter_Data.selectedWorkStatus}
                            // onChange={(event: any) => {
                            //     setFilter_Data((pre: any) => ({ ...pre, selectedWorkStatus: event }))
                            // }}
                        />
                    </div>
                    {/* Dropdown Button */}
                    <div className="flex items-end space-x-2">
                        <button onClick={() => handleSearch()} className="bg-blue-500 text-white px-4 py-2 space-x-2 rounded hover:bg-blue-600 text-xs flex items-center">
                            <CiSearch />  <span>Search</span>
                        </button>
                        <div className="relative" style={{ minWidth: '110px' }}>
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-4 py-2 space-x-2 rounded hover:bg-blue-600 text-xs flex items-center"
                                onClick={() => setShowDropdown((prev: boolean) => !prev)}
                                id="addNewDropdownBtn"
                            >
                                <FaPlus /> <span>Add New</span>
                                <svg className="ml-1 w-3 h-3" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            {showDropdown && (
                                <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
                                    {ddlData?.verticalData.length &&
                                        ddlData?.verticalData.map((vd: any, indx: any) =>
                                            <button key={indx} className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50" onClick={() => handleDropdownSelect(vd?.bm_name, "NEW")}>{vd?.bm_name}</button>
                                        )
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-2 p-pl-table-item">
                <MantineReactTable table={isProlinksToAPICALL ? table_prolinks_to : table} />
            </div>
        </>
    )
}

export default BergeroneLead