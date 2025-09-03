import React from 'react';
import Select from 'react-select';
import { GetVerticalWisBusinessLine } from '../../../services/api/protectonLead/PotentialLead';
import { CommonLovDetails, GetProtectonApplicableDepot, GetProtectonApplicableTerr, GetProtectonRegion } from '../../../services/api/users/UserProfile';
import { UseAuthStore } from '../../../services/store/AuthStore';
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import CustomPopupComponent from './Components/customPopupComponent';
// import axios, { type AxiosResponse } from 'axios';
// import { GetPcaList } from '../../../services/api/protectonEpca/EpcaList';
// import { BASE_ENDPOINTS } from '../../../helper/EndPoints';

const PotentialLead = () => {
    const user = UseAuthStore((state: any) => state.userDetails);

    const [loading, setLoading] = React.useState(false);
    const dataObj = {
        viewBy: "FROM",
        // verticalData: [],
        // protecton_regionList: [],
        // depotList: [],
        // terrList: [],
        // assignStatusList: [],
        // workStatusList: [],
        selectedvertical: '',
        selectedProtecton_region: '',
        selectedDepot: '',
        selectedTerr: '',
        selectedAssignStatus: '',
        selectedWorkStatus: '',
        // for PROLINKS popup
        regionList: [],
        applicableDepotList: [],
        stateList: [],
        paint_admixture_List: [],
        ac_type_List: [],
        govt_pvt_List: [],
        painting_List: [],
        lead_sector_List: [],
        lead_sub_sector_List: [],
        lead_potential_list: [],
        key_appl_city_List: [],
        key_lead_stage_List: [],
        key_painting_start_time_List: [],
        selectedRegionList: '',
        selectedApplicableDepotList: '',
        selectedStateList: '',
        selectedPaint_admixture: '',
        selectedAc_type: '',
        selectedGovt_pvt: '',
        selectedPainting: '',
        selectedLead_sector: '',
        selectedLead_sub_sector: '',
        selectedLead_potential: '',
        // selectedKey_appl_city: '', //
        selectedKey_lead_stage: '',
        selectedKey_painting_start_time: '',
        projectName: '', // Project Information
        projectDescription: '', // Project Information
        siteLocation: '', // Project Information
        addr1: '', // Project Information
        addr2: '', // Project Information
        city: '', // Project Information
        pinCode: '', // Project Information
        state: '', // Project Information
        pan_no: '',
        gstin_no: '',
        intPaintableArea: '',
        extPaintableArea: '',
        painting_remarks: '',
        leadStatus: 'NEW',
        tentativeStartDate: '',
        durationInMonth: '',
        paint_business_potential: '',
        businessPotential_cc: '',
        shareOfBusiness: '',
        siteContactTableData: [],
        // for SELF popup
        ptm_ref_lead_yn: '', // Referral Lead
        ptm_ref_lead_type: '', // Refer From
        ptm_ref_dealer_code: '', // Existing Business Contract
        potentialTrackingcontacts: [], // Referral Source Details
        potentialTrackingDocs: [], // Upload Documents
        ptm_customer_name: '', // Customer
        ptm_contractor_type: '', // Contractor Type
        ptm_potential_val: '', // Value of paints
        ptm_potential_vol: '', // Scope of paints
        ptm_potential_area: '', // Scope for paints area
        ptm_potential_area_uom: '', // Scope for paints area uom
        ptm_area: '', // service area
        ptm_business_type: '', // Business Type
        ptm_product_category: '', // Product Category
        ptm_industry_segment: '', // Industry Segment
        ptm_lead_share: '', // Lead Share
        ptm_region: '', // region
        ptm_depot_code: '', // depot
        ptm_terr_code: '', // terr
        ptm_work_status: '', // Work In Progress
        ptm_extra_info: '', // Work In Progress
        referralLead: [{ value: 'Y', label: "YES" }, { value: 'N', label: 'NO' }], // Referral Lead DDL
        refer_from_List: [], // Refer From DDL
        contractor_type_List: [],// Contractor Type DDL
        potential_area_uom_List: [], // Scope for paints area uom DDL
        business_type_List: [], // Business Type DDL
        product_category_List: [], // Product Category
        industry_segment_List: [], // Industry Segment
        lead_share_List: [], // Lead Share
        doc_type_List: [], // Upload Documents doc_type
    }
    const [data, setData] = React.useState<any>({ ...dataObj });
    const [filterdata, setFilterData] = React.useState<any>({
        verticalData: [],
        protecton_regionList: [],
        depotList: [],
        terrList: [],
        assignStatusList: [],
        workStatusList: [],
    });

    const [showDropdown, setShowDropdown] = React.useState(false);
    const [popupOpenData, setPopupOpenData] = React.useState({ open: false, popupHeader: '' });

    const VerticalWisBusinessLineAPICall = async () => {
        setLoading(true);
        const data: any = {
            app_id: '15'
        };
        try {
            const response: any = await GetVerticalWisBusinessLine(data);
            setFilterData((prevData: any) => ({
                ...prevData,
                verticalData: response.data.table || [],
            }));

        } catch (error) {
            return;
        }
        setLoading(false);
    }

    const GetProtectonRegionAPICALL = async () => {
        setLoading(true);
        const data: any = {
            user_group: user.group_code,
            app_id: '15',
            user_appl_yn: 'Y'
        };
        try {
            const response: any = await GetProtectonRegion(data);
            setFilterData((prevData: any) => ({
                ...prevData,
                protecton_regionList: response.data.table || [],
            }));

        } catch (error) {
            return;
        }
        setLoading(false);
    }

    const Getdepot = async (region: string) => {
        setLoading(true);
        const payload: any = {
            app_id: '15',
            region: region,
            terr_code: '',
            user_appl_yn: 'Y',
        };
        try {
            const response: any = await GetProtectonApplicableDepot(payload);
            setFilterData((prevData: any) => ({
                ...prevData,
                depotList: response.data.table || []
            }));
        } catch (error) {
            return;
        }
        setLoading(false);
    }

    const Getterr = async (props: any) => {
        setLoading(true);
        const payload: any = {
            // user_group: user.group_code,
            app_id: '15',
            region: props?.region,
            depot_code: props?.depot,
            user_appl_yn: 'Y',
        };
        try {
            const response: any = await GetProtectonApplicableTerr(payload);
            setFilterData((prevData: any) => ({
                ...prevData,
                terrList: response?.data?.table || []
            }));
        } catch (error) {
            return;
        }
        setLoading(false);
    }

    const OtherAPIcall = async (payload: any) => {
        setLoading(true);
        try {
            const response: any = await CommonLovDetails(payload);
            if (payload.lov_type === "PT_ASSIGN_STATUS") {
                setFilterData((prevData: any) => ({
                    ...prevData,
                    assignStatusList: response.data.table || []
                }));
            }
            else if (payload.lov_type === "PT_WORK_IN_PROGRESS") {
                setFilterData((prevData: any) => ({
                    ...prevData,
                    workStatusList: response.data.table || []
                }));
            }
            // -----------PROLINKS popup-----------
            else if (payload.lov_type === "PT_LEAD_CATEGORY") {
                setData((prevData: any) => ({
                    ...prevData,
                    paint_admixture_List: response.data.table || []
                }));
            }
            else if (payload.lov_type === "LEAD_ACCOUNT_TYPE") {
                setData((prevData: any) => ({
                    ...prevData,
                    ac_type_List: response.data.table || []
                }));
            }
            else if (payload.lov_type === "PT_GOVT_PVT") {
                setData((prevData: any) => ({
                    ...prevData,
                    govt_pvt_List: response.data.table || []
                }));
            }
            else if (payload.lov_type === "PT_PAINTING") {
                setData((prevData: any) => ({
                    ...prevData,
                    painting_List: response.data.table || []
                }));
            }
            else if (payload.lov_type === "PT_LEAD_SECTOR") {
                setData((prevData: any) => ({
                    ...prevData,
                    lead_sector_List: response.data.table || []
                }));
            }
            else if (payload.lov_type === "PT_LEAD_SUB_SECTOR") {
                setData((prevData: any) => ({
                    ...prevData,
                    lead_sub_sector_List: response.data.table || []
                }));
            }
            else if (payload.lov_type === "LEAD_POTENTIAL") {
                setData((prevData: any) => ({
                    ...prevData,
                    lead_potential_list: response.data.table || []
                }));
            }
            else if (payload.lov_type === "KEY_APPL_CITY") {
                setData((prevData: any) => ({
                    ...prevData,
                    key_appl_city_List: response.data.table || []
                }));
            }
            else if (payload.lov_type === "PT_KEY_LEAD_STAGE") {
                setData((prevData: any) => ({
                    ...prevData,
                    key_lead_stage_List: response.data.table || []
                }));
            }
            else if (payload.lov_type === "PT_KEY_PAINTING_START_TIME") {
                setData((prevData: any) => ({
                    ...prevData,
                    key_painting_start_time_List: response.data.table || []
                }));
            }
            // -----------SELF popup-----------
            else if (payload.lov_type === "PT_BUSINESS_CONTACT") {
                setData((prevData: any) => ({
                    ...prevData,
                    refer_from_List: response.data.table || []
                }));
            }
            else if (payload.lov_type === "PT_CONTRACTOR_TYPE") {
                setData((prevData: any) => ({
                    ...prevData,
                    contractor_type_List: response.data.table || []
                }));
            }
            else if (payload.lov_type === "PT_AREA_MOU") {
                setData((prevData: any) => ({
                    ...prevData,
                    potential_area_uom_List: response.data.table || []
                }));
            }
            else if (payload.lov_type === "PT_BUSINESS_TYPE") {
                setData((prevData: any) => ({
                    ...prevData,
                    business_type_List: response.data.table || []
                }));
            }
            else if (payload.lov_type === "PT_PRODUCT_CATEGORY") {
                setData((prevData: any) => ({
                    ...prevData,
                    product_category_List: response.data.table || []
                }));
            }
            else if (payload.lov_type === "PT_INDUSTRY_SEGMENT") {
                setData((prevData: any) => ({
                    ...prevData,
                    industry_segment_List: response.data.table || []
                }));
            }
            else if (payload.lov_type === "PT_LEAD_SHARE") {
                setData((prevData: any) => ({
                    ...prevData,
                    lead_share_List: response.data.table || []
                }));
            }
            else if (payload.lov_type === "PT_DOC_TYPE") {
                setData((prevData: any) => ({
                    ...prevData,
                    doc_type_List: response.data.table || []
                }));
            }
        } catch (error) {
            return;
        }
        setLoading(false);
    }

    const handleSearch = () => {
        const filterData = {
            vertical: data.selectedvertical,
            viewBy: data.viewBy,
            region: data.selectedRegion,
            depot: data.selectedDepot,
            terr: data.selectedTerr,
            assignStatus: data.selectedAssignStatus,
            workStatus: data.selectedWorkStatus
        };
        console.log(filterData);
        // Add your search logic here
    }

    const handleDropdownSelect = (action: string) => {
        setShowDropdown(false);
        setPopupOpenData({ open: true, popupHeader: action })
    };

    React.useEffect(() => {
        GetProtectonRegionAPICALL();
        OtherAPIcall({
            lov_type: "PT_ASSIGN_STATUS",
            active: "Y"
        });
        OtherAPIcall({
            lov_type: "PT_WORK_IN_PROGRESS",
            active: "Y"
        });
        VerticalWisBusinessLineAPICall();
    }, []);

    React.useEffect(() => {
        console.log(data)
    }, [data]);

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
                                checked={data?.viewBy === "FROM"}
                                onChange={e => setData((pre: any) => ({ ...pre, viewBy: e.target.value }))}
                                className="mr-1"
                            />
                            FROM
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="viewBy"
                                value="TO"
                                checked={data?.viewBy === "TO"}
                                onChange={e => setData((pre: any) => ({ ...pre, viewBy: e.target.value }))}
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
                            options={filterdata.verticalData.map((d: any) => ({
                                value: d.bm_id,
                                label: d.bm_name,
                            }))}
                            value={data.selectedvertical}
                            onChange={(event: any) => {
                                setData((pre: any) => ({ ...pre, selectedvertical: event }))
                            }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Select Region:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            options={filterdata.protecton_regionList.map((d: any) => ({ value: d.depot_regn, label: d.regn_new }))}
                            value={data.selectedProtecton_region}
                            onChange={(event: any) => {
                                Getdepot(event.value);
                                Getterr({ region: event.value, depot: '' });
                                setData((pre: any) => ({ ...pre, selectedProtecton_region: event, selectedDepot: '', selectedTerr: '' }))
                            }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Select Depot:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            options={filterdata.depotList.map((d: any) => ({ value: d.depot_code, label: d.depot_name }))}
                            value={data.selectedDepot}
                            onChange={(event: any) => {
                                Getterr({ region: data.selectedProtecton_region.value, depot: event.value });
                                setData((pre: any) => ({ ...pre, selectedDepot: event, selectedTerr: '' }))
                            }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Select Territory:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            options={filterdata.terrList.map((d: any) => ({ value: d.terr_code, label: d.terr_name }))}
                            value={data.selectedTerr}
                            onChange={(event: any) => {
                                setData((pre: any) => ({ ...pre, selectedTerr: event }))
                            }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Assign Status:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            options={filterdata.assignStatusList.map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                            value={data.selectedAssignStatus}
                            onChange={(event: any) => {
                                setData((pre: any) => ({ ...pre, selectedAssignStatus: event }))
                            }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Work Status:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            options={filterdata.workStatusList.map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                            value={data.selectedWorkStatus}
                            onChange={(event: any) => {
                                setData((pre: any) => ({ ...pre, selectedWorkStatus: event }))
                            }}
                        />
                    </div>
                    {/* Dropdown Button */}
                    <div className="flex items-end space-x-2">
                        <button className="bg-blue-500 text-white px-4 py-2 space-x-2 rounded hover:bg-blue-600 text-xs flex items-center" onClick={handleSearch}>
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
                                    {filterdata?.verticalData.length &&
                                        filterdata?.verticalData.map((vd: any, indx: any) =>
                                            <button key={indx} className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50" onClick={() => handleDropdownSelect(vd?.bm_name)}>{vd?.bm_name}</button>
                                        )
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {popupOpenData?.open &&
                <CustomPopupComponent dataObj={dataObj} data={data} setData={setData} popupOpenData={popupOpenData} setPopupOpenData={setPopupOpenData} setLoading={setLoading} OtherAPIcall={OtherAPIcall} Getdepot={Getdepot} Getterr={Getterr} />
            }

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

export default PotentialLead