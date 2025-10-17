import { useEffect, useRef, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import { CiSearch } from "react-icons/ci";
import Select from 'react-select';
import * as user_ from '../../../services/api/users/UserProfile';
import * as usertracking from '../../../services/api/protectonTransact/TransactUserTracking';
import { UseAuthStore } from '../../../services/store/AuthStore';
import TableComponent from './Components/TableComponent';
import UserTrackingCollectionTableComponent from './Components/UserTrackingCollectionTableComponent';
import UserTrackingVisitTableComponent from './Components/UserTrackingVisitTableComponent';

const TransactUserTracking = () => {
    const childRef = useRef<any>(null);
    const user = UseAuthStore((state: any) => state.userDetails);

    const [tableData, settableData] = useState<any>([]);
    const [collectionTableData, setCollectionTableData] = useState<any>([]);
    const [visitTableData, setVisitTableData] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [filterData, setFilterData] = useState({ depot_regn: '', regn_new: '', grp_user_group_desc: '', grp_user_group_code: '', usp_user_id: '', usp_user_name: '', dsrDate: new Date(), viewBy: "MTD" });
    const [region, setRegion] = useState<any>([]);
    const [userGroup, setUserGroup] = useState<any>([]);
    const [applicableUserList, setApplicableUserList] = useState<any>([]);

    const [activeTab, setActiveTab] = useState("tab1");

    const tabs = [
        { id: "tab1", label: "DSR", content: "Content of Tab One" },
        { id: "tab2", label: "COLLECTION", content: "Content of Tab Two" },
        { id: "tab3", label: "VISIT", content: "Content of Tab Three" },
    ];

    const GetRegion = async () => {
        setLoading(true);
        const data: any = {
            user_group: user.group_code,
            app_id: '15',
            user_appl_yn: 'Y'
        };
        try {
            const response: any = await user_.GetProtectonRegion(data);
            setRegion(response.data.table || []);

        } catch (error) {
            return;
        }
        setLoading(false);
    }
    const GetUserGroup = async () => {
        setLoading(true);
        const data: any = {
            user_group: user.group_code
        };
        try {
            const response: any = await user_.GetUserGroup(data);
            setUserGroup(response.data.table || []);

        } catch (error) {
            return;
        }
        setLoading(false);
    }
    const GetApplicableUserList = async ({ grp_user_group_code }: any) => {
        setLoading(true);
        const data: any = {
            user_group: user.group_code,
            Regn: filterData.depot_regn,
            group_code: grp_user_group_code
        };
        try {
            const response: any = await user_.GetApplicableUserList(data);
            setApplicableUserList(response.data.table || []);

        } catch (error) {
            return;
        }
        setLoading(false);
    }

    const callGetUserCollectionList = async () => {
        // setLoading(true);
        const data: any = {
            asOnDate: filterData?.dsrDate,
            selectedUser: filterData?.usp_user_id
        };
        try {
            const response: any = await usertracking.GetUserCollectionList(data);
            const gross: any = [];
            const net: any = [];
            const age: any = [
                { age: '0-30' },
                { age: '31-60' },
                { age: '61-90' },
                { age: '91-120' },
                { age: '121-150' },
                { age: '151-180' },
                { age: '181-360' },
                { age: '361-720' },
                { age: '720' },
                { age: '>120' },
                { age: '>180' },
                { age: 'TOTAL' }
            ];
            Object.keys(response.data.table1[0]).map((key) => key.substr(0, 1) === 'g' ? gross.push({ gross: response.data.table1[0][key] }) : key.substr(0, 1) === 'n' && net.push({ net: response.data.table1[0][key] }))
            const merged: any = [];
            let sData: any = {};
            gross.map((item: any, index: string | number) => {
                if (index === 9) {
                    sData = {
                        ...item,
                        ...net[index],
                        ...{ variance: ((net[index].net - item?.gross) / item?.gross) * 100 }
                    }
                }
                else if (index !== 10)
                    merged.push({
                        ...item,
                        ...net[index],
                        ...{ variance: ((net[index].net - item?.gross) / item?.gross) * 100 }
                    })
            });
            setTimeout(() => {
                console.log([...merged, sData])
                setCollectionTableData({
                    data1: response.data.table[0].coll, data2: [...merged, sData].map((item, index) => ({
                        ...item,
                        ...age[index],
                    }))
                })
            }, 4000);

        } catch (error) {
            return;
        }
        // setLoading(false);
    }

    const callGetVisitHistoryUserwise = async () => {
        // setLoading(true);
        const data: any = {
            asOnDate: filterData?.dsrDate instanceof Date ? 
                `${filterData.dsrDate.getFullYear()}-${String(filterData.dsrDate.getMonth() + 1).padStart(2, '0')}-${String(filterData.dsrDate.getDate()).padStart(2, '0')}` : 
                filterData?.dsrDate,
            selectedUser: filterData?.usp_user_id
        };
        try {
            const response: any = await usertracking.GetVisitHistoryUserwise(data);
            setVisitTableData(response.data.table || []);
        } catch (error) {
            return;
        }
        // setLoading(false);
    }

    const handleSearch = (e: any) => {
        e.preventDefault();
        if (childRef.current && childRef.current.triggerAPI) {
            childRef.current.triggerAPI({ prd_grp: "PROTECTON", report_grp_level: "REGION", region: '', depot: '', terr: '' });
        }
        callGetUserCollectionList();
        callGetVisitHistoryUserwise();
    };

    useEffect(() => {
        GetRegion();
        GetUserGroup();
    }, [])

    // useEffect(() => {
    //     console.log(collectionTableData)
    // }, [collectionTableData])

    return (
        <>
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-1">
                <h5 className="text-lg font-semibold dark:text-white-light">User Tracking</h5>
            </div>

            <div className="bg-white rounded-lg px-4 py-2 shadow-md mb-2">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-5 mb-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Region: <span className='text-red-600'>*</span></label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            value={{ value: filterData?.depot_regn, label: filterData?.regn_new }}
                            options={region.map((d: any) => ({ value: d.depot_regn, label: d.regn_new }))}
                            onChange={(event) => {
                                setFilterData((pre: any) => ({ ...pre, depot_regn: event?.value, regn_new: event?.label }))
                            }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">User Group: <span className='text-red-600'>*</span></label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            value={{ value: filterData?.grp_user_group_code, label: filterData?.grp_user_group_desc }}
                            options={userGroup.map((d: any) => ({ value: d.grp_user_group_code, label: d.grp_user_group_desc }))}
                            onChange={(event) => {
                                GetApplicableUserList({ grp_user_group_code: event?.value });
                                setFilterData((pre: any) => ({ ...pre, grp_user_group_code: event?.value, grp_user_group_desc: event?.label }))
                            }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">User: <span className='text-red-600'>*</span></label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            value={{ value: filterData?.usp_user_id, label: filterData?.usp_user_name }}
                            options={applicableUserList.map((d: any) => ({ value: d.usp_user_id, label: d.usp_user_name }))}
                            onChange={(event) => {
                                setFilterData((pre: any) => ({ ...pre, usp_user_id: event?.value, usp_user_name: event?.label }))
                            }}
                        />
                    </div>

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

                    <div className="flex items-center justify-end">
                        <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm flex items-center space-x-2 mt-3"
                            onClick={handleSearch}
                            disabled={filterData.depot_regn === '' || filterData.grp_user_group_code === '' || filterData.usp_user_id === ''}
                        >
                            <CiSearch />
                            <span>Search</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg px-2 py-2 shadow-md">
                {/* Tab Buttons */}
                <div className="flex border-b border-gray-200">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`py-2 px-4 text-sm font-semibold transition-colors duration-200 ${activeTab === tab.id
                                ? "border-b-2 border-blue-500 text-blue-600"
                                : "text-gray-600 hover:text-blue-500"
                                }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="mt-2 text-gray-700">
                    {activeTab === 'tab1' ? (
                        <div className="text-base">
                            <TableComponent ref={childRef} tableData={tableData} settableData={settableData} setLoading={setLoading} filterData={filterData} form="TransactUserTracking" />
                        </div>
                    ) :
                        activeTab === 'tab2' ? (
                            <div className="text-base">
                                <h5 className="text-lg font-semibold dark:text-white-light">Collection Amount: {collectionTableData?.data1} Lacs</h5>
                                <UserTrackingCollectionTableComponent tableData={collectionTableData?.data2 || []} />
                            </div>
                        ) :
                            <div className="text-base">
                                {/* <h5 className="text-lg font-semibold dark:text-white-light">Collection Amount: {visitTableData?.data1} Lacs</h5> */}
                                <UserTrackingVisitTableComponent tableData={visitTableData || []} />
                            </div>
                    }
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

export default TransactUserTracking