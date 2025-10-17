import React, { useEffect, useMemo, useRef } from 'react';
import Select from 'react-select';
import { GetDealerSearch, GetPotentialTrackingDtls, GetPotentialTrackingList, GetVerticalWisBusinessLine } from '../../../services/api/protectonLead/PotentialLead';
import { CommonLovDetails, GetProtectonApplicableDepot, GetProtectonApplicableTerr, GetProtectonRegion } from '../../../services/api/users/UserProfile';
import { UseAuthStore } from '../../../services/store/AuthStore';
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { IoEyeSharp } from 'react-icons/io5';
import CustomPopupComponent from './Components/customPopupComponent';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
// import axios, { type AxiosResponse } from 'axios';
// import { GetPcaList } from '../../../services/api/protectonEpca/EpcaList';
// import { BASE_ENDPOINTS } from '../../../helper/EndPoints';

const PotentialLead = () => {
    const user = UseAuthStore((state: any) => state.userDetails);

    const [loading, setLoading] = React.useState(false);
    const [potentialLeadDataList, setPotentialLeadDataList] = React.useState([]);
    const [showDropdown, setShowDropdown] = React.useState(false);
    const [popupOpenData, setPopupOpenData] = React.useState({ open: false, popupHeader: '' });

    const dataObj = {
        // for PROLINKS popup
        regionList: [],
        applicableDepotList: [],
        stateList: [],
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
        projectName: '', // Project Information
        projectDescription: '', // Project Information
        siteLocation: '', // Project Information
        addr1: '', // Project Information
        addr2: '', // Project Information
        city: '', // Project Information
        pinCode: '', // Project Information
        state: '', // Project Information
        // for SELF popup
        ptm_ref_lead_yn: '', // Referral Lead
        ptm_ref_lead_type: '', // Refer From
        ptm_ref_dealer_code: '', // Existing Business Contract
        ptm_customer_name: '', // Customer
        ptm_contractor_type: '', // Contractor Type
        ptm_potential_val: '', // Value of paints
        ptm_potential_vol: '', // Scope of paints
        ptm_potential_area: '', // Scope for paints area
        ptm_potential_area_uom: '', // Scope for paints area uom
        ptm_area: '', // service area
        ptm_business_type: '', // Business Type
        ptm_industry_segment: '', // Industry Segment
        ptm_lead_share: '', // Lead Share
        ptm_region: '', // region
        ptm_depot_code: '', // depot
        ptm_terr_code: '', // terr
        ptm_work_status: '', // Work In Progress
        ptm_extra_info: '', // Work In Progress
        ptm_product_category: '', // Product Category
        potentialTrackingcontacts: [], // Referral Source Details
        potentialTrackingDocs: [], // Upload Documents

    }
    const [data, setData] = React.useState<any>({ ...dataObj });
    const [filter_Data, setFilter_Data] = React.useState<any>({
        viewBy: "FROM",
        selectedvertical: '',
        selectedProtecton_region: '',
        selectedDepot: '',
        selectedTerr: '',
        selectedAssignStatus: '',
        selectedWorkStatus: '',
    });
    const [ddlData, setDdlData] = React.useState<any>({
        verticalData: [],
        protecton_regionList: [],
        depotList: [],
        terrList: [],
        assignStatusList: [],
        workStatusList: [],
        // for PROLINKS popup
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
        // for SELF popup
        referralLead: [{ value: 'Y', label: "YES" }, { value: 'N', label: 'NO' }], // Referral Lead DDL
        refer_from_List: [], // Refer From DDL
        contractor_type_List: [],// Contractor Type DDL
        potential_area_uom_List: [], // Scope for paints area uom DDL
        business_type_List: [], // Business Type DDL
        product_category_List: [], // Product Category
        industry_segment_List: [], // Industry Segment
        lead_share_List: [], // Lead Share
        doc_type_List: [], // Upload Documents doc_type
    });

    const VerticalWisBusinessLineAPICall = async () => {
        // setLoading(true);
        const data: any = {
            app_id: '15'
        };
        try {
            const response: any = await GetVerticalWisBusinessLine(data);
            setDdlData((prevData: any) => ({
                ...prevData,
                verticalData: response.data.table || [],
            }));

        } catch (error) {
            return;
        }
        // setLoading(false);
    }

    const GetProtectonRegionAPICALL = async () => {
        // setLoading(true);
        const data: any = {
            user_group: user.group_code,
            app_id: '15',
            user_appl_yn: 'Y'
        };
        try {
            const response: any = await GetProtectonRegion(data);
            setDdlData((prevData: any) => ({
                ...prevData,
                protecton_regionList: response.data.table || [],
            }));

        } catch (error) {
            return;
        }
        // setLoading(false);
    }

    const Getdepot = async (region: string) => {
        // setLoading(true);
        const payload: any = {
            app_id: '15',
            region: region,
            terr_code: '',
            user_appl_yn: 'Y',
        };
        try {
            const response: any = await GetProtectonApplicableDepot(payload);
            setDdlData((prevData: any) => ({
                ...prevData,
                depotList: response.data.table || []
            }));
        } catch (error) {
            return;
        }
        // setLoading(false);
    }

    const Getterr = async (props: any) => {
        // setLoading(true);
        const payload: any = {
            // user_group: user.group_code,
            app_id: '15',
            region: props?.region,
            depot_code: props?.depot,
            user_appl_yn: 'Y',
        };
        try {
            const response: any = await GetProtectonApplicableTerr(payload);
            setDdlData((prevData: any) => ({
                ...prevData,
                terrList: response?.data?.table || []
            }));
        } catch (error) {
            return;
        }
        // setLoading(false);
    }

    var rowData: any = useRef(null);

    const selectedLeadDetails = async () => {
        setLoading(true);
        const payload: any = {
            ptm_id: rowData?.current.ptm_id
        };
        try {
            const response: any = await GetPotentialTrackingDtls(payload);
            if (response?.statusCode === 200) {
                var ptm_ref_dealer_code: any = '';
                if (response?.data?.table[0]?.ptm_ref_dealer_code) {
                    try {
                        const dealerresponse: any = await GetDealerSearch({ depot: "", terr: "", region: "", srarchstr: response?.data?.table[0]?.ptm_ref_dealer_code });
                        if (dealerresponse.data) {
                            ptm_ref_dealer_code = { value: dealerresponse.data.table?.find((item: any) => item.dealer_code === response?.data?.table[0]?.ptm_ref_dealer_code).dealer_code, label: dealerresponse.data.table?.find((item: any) => item.dealer_code === response?.data?.table[0]?.ptm_ref_dealer_code).display_name }
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
                console.log("GetPotentialTrackingDtls --", response?.data);
                console.log("product_category_List --", ddlData?.product_category_List);
                const ptm_product_category = ddlData?.product_category_List.filter((item: any) => response?.data?.table[0]?.ptm_product_category.split(",").includes(item?.lov_code)).map((item: any) => ({
                    value: item.lov_code,
                    label: item.lov_value
                }));
                setData((prevData: any) => ({
                    ...prevData,
                    ...response?.data?.table[0],
                    ptm_ref_lead_yn: ddlData?.referralLead?.find((item: any) => item.value === response?.data?.table[0]?.ptm_ref_lead_yn) || '',

                    ptm_ref_lead_type: ddlData?.refer_from_List.length > 0 ? { value: ddlData?.refer_from_List?.find((item: any) => item.lov_code === response?.data?.table[0]?.ptm_ref_lead_type).lov_code, label: ddlData?.refer_from_List?.find((item: any) => item.lov_code === response?.data?.table[0]?.ptm_ref_lead_type).lov_value } : '',

                    ptm_ref_dealer_code: ptm_ref_dealer_code,

                    ptm_contractor_type: ddlData?.contractor_type_List.length > 0 ? { value: ddlData?.contractor_type_List?.find((item: any) => item.lov_code === response?.data?.table[0]?.ptm_contractor_type).lov_code, label: ddlData?.contractor_type_List?.find((item: any) => item.lov_code === response?.data?.table[0]?.ptm_contractor_type).lov_value } : '',

                    projectName: response?.data?.table[0]?.ptm_project_name || '',
                    siteLocation: response?.data?.table[0]?.ptm_project_location || '',
                    addr1: response?.data?.table[0]?.ptm_project_address1 || '',
                    addr2: response?.data?.table[0]?.ptm_project_address2 || '',
                    city: response?.data?.table[0]?.ptm_project_city || '',
                    pinCode: response?.data?.table[0]?.ptm_project_pin || '',

                    selectedStateList: data?.stateList.length > 0 ? { value: data?.stateList?.find((item: any) => item.state_code === response?.data?.table[0]?.ptm_project_state).state_code, label: data?.stateList?.find((item: any) => item.state_code === response?.data?.table[0]?.ptm_project_state).state_name } : '',

                    ptm_potential_area_uom: ddlData?.potential_area_uom_List.length > 0 ? { value: ddlData?.potential_area_uom_List?.find((item: any) => item.lov_code === response?.data?.table[0]?.ptm_potential_area_uom).lov_code, label: ddlData?.potential_area_uom_List?.find((item: any) => item.lov_code === response?.data?.table[0]?.ptm_potential_area_uom).lov_value } : '',

                    ptm_business_type: ddlData?.business_type_List.length > 0 ? { value: ddlData?.business_type_List?.find((item: any) => item.lov_code === response?.data?.table[0]?.ptm_business_type).lov_code, label: ddlData?.business_type_List?.find((item: any) => item.lov_code === response?.data?.table[0]?.ptm_business_type).lov_value } : '',

                    ptm_product_category: ptm_product_category || [],

                    ptm_industry_segment: ddlData?.industry_segment_List.length > 0 ? { value: ddlData?.industry_segment_List?.find((item: any) => item?.lov_code === response?.data?.table[0]?.ptm_industry_segment)?.lov_code, label: ddlData?.industry_segment_List?.find((item: any) => item?.lov_code === response?.data?.table[0]?.ptm_industry_segment)?.lov_value } : '',

                    ptm_lead_share: ddlData?.lead_share_List.length > 0 ? { value: ddlData?.lead_share_List?.find((item: any) => item?.lov_code === response?.data?.table[0]?.ptm_lead_share)?.lov_code, label: ddlData?.lead_share_List?.find((item: any) => item?.lov_code === response?.data?.table[0]?.ptm_lead_share)?.lov_value } : '',

                    ptm_region: ddlData?.protecton_regionList.length > 0 ? { value: ddlData?.protecton_regionList?.find((item: any) => item?.depot_regn === response?.data?.table[0]?.ptm_region)?.depot_regn, label: ddlData?.protecton_regionList?.find((item: any) => item?.depot_regn === response?.data?.table[0]?.ptm_region)?.regn_new } : '',

                    ptm_depot_code: ddlData?.depotList.length > 0 ? { value: ddlData?.depotList?.find((item: any) => item?.depot_code === response?.data?.table[0]?.ptm_depot_code)?.depot_code, label: ddlData?.depotList?.find((item: any) => item?.depot_code === response?.data?.table[0]?.ptm_depot_code)?.depot_name } : '',

                    ptm_terr_code: ddlData?.terrList.length > 0 ? { value: ddlData?.terrList?.find((item: any) => item?.terr_code === response?.data?.table[0]?.ptm_terr_code)?.terr_code, label: ddlData?.terrList?.find((item: any) => item?.terr_code === response?.data?.table[0]?.ptm_terr_code)?.terr_name } : '',

                    ptm_work_status: ddlData?.workStatusList.length > 0 ? { value: ddlData?.workStatusList?.find((item: any) => item?.lov_code === response?.data?.table[0]?.ptm_work_status)?.lov_code, label: ddlData?.workStatusList?.find((item: any) => item?.lov_code === response?.data?.table[0]?.ptm_work_status)?.lov_value } : '',

                    potentialTrackingDocs: response?.data?.table1 || [],

                    potentialTrackingcontacts: response?.data?.table2 || [],
                }));
            }
        } catch (error) {
            return;
        }
        setLoading(false);
    }
    const selectedLeadDetails1 = async () => {
        console.log("product_category_List --", ddlData?.product_category_List);
    }

    var commonLovDetailsData: any = useRef({});
    const OtherAPIcall = async (payload: any) => {
        setLoading(true);
        try {
            const response: any = await CommonLovDetails(payload);
            if (payload.lov_type === "PT_ASSIGN_STATUS") {
                commonLovDetailsData.current["assignStatusList"] = response.data.table || [];
            }
            else if (payload.lov_type === "PT_WORK_IN_PROGRESS") {
                commonLovDetailsData.current["workStatusList"] = response.data.table || [];
            }
            // -----------PROLINKS popup-----------
            else if (payload.lov_type === "PT_LEAD_CATEGORY") {
                commonLovDetailsData.current["paint_admixture_List"] = response.data.table || [];
            }
            else if (payload.lov_type === "LEAD_ACCOUNT_TYPE") {
                commonLovDetailsData.current["ac_type_List"] = response.data.table || [];
            }
            else if (payload.lov_type === "PT_GOVT_PVT") {
                commonLovDetailsData.current["govt_pvt_List"] = response.data.table || [];
            }
            else if (payload.lov_type === "PT_PAINTING") {
                commonLovDetailsData.current["painting_List"] = response.data.table || [];
            }
            else if (payload.lov_type === "PT_LEAD_SECTOR") {
                commonLovDetailsData.current["lead_sector_List"] = response.data.table || [];
            }
            else if (payload.lov_type === "PT_LEAD_SUB_SECTOR") {
                commonLovDetailsData.current["lead_sub_sector_List"] = response.data.table || [];
            }
            else if (payload.lov_type === "LEAD_POTENTIAL") {
                commonLovDetailsData.current["lead_potential_list"] = response.data.table || [];
            }
            else if (payload.lov_type === "KEY_APPL_CITY") {
                commonLovDetailsData.current["key_appl_city_List"] = response.data.table || [];
            }
            else if (payload.lov_type === "PT_KEY_LEAD_STAGE") {
                commonLovDetailsData.current["key_lead_stage_List"] = response.data.table || [];
            }
            else if (payload.lov_type === "PT_KEY_PAINTING_START_TIME") {
                commonLovDetailsData.current["key_painting_start_time_List"] = response.data.table || [];
            }
            // -----------SELF popup-----------
            else if (payload.lov_type === "PT_BUSINESS_CONTACT") {
                commonLovDetailsData.current["refer_from_List"] = response.data.table || [];
            }
            else if (payload.lov_type === "PT_CONTRACTOR_TYPE") {
                commonLovDetailsData.current["contractor_type_List"] = response.data.table || [];
            }
            else if (payload.lov_type === "PT_AREA_MOU") {
                commonLovDetailsData.current["potential_area_uom_List"] = response.data.table || [];
            }
            else if (payload.lov_type === "PT_BUSINESS_TYPE") {
                commonLovDetailsData.current["business_type_List"] = response.data.table || [];
            }
            else if (payload.lov_type === "PT_PRODUCT_CATEGORY") {
                commonLovDetailsData.current["product_category_List"] = response.data.table || [];
            }
            else if (payload.lov_type === "PT_INDUSTRY_SEGMENT") {
                commonLovDetailsData.current["industry_segment_List"] = response.data.table || [];
            }
            else if (payload.lov_type === "PT_LEAD_SHARE") {
                commonLovDetailsData.current["lead_share_List"] = response.data.table || [];
            }
            else if (payload.lov_type === "PT_DOC_TYPE") {
                commonLovDetailsData.current["doc_type_List"] = response.data.table || [];
            }
        } catch (error) {
            return;
        }
        setLoading(false);
    }

    const handleSearch = async () => {
        setLoading(true);
        const filterData = {
            app_name: "PROTECTON",
            app_id: 0,
            searchStr: "",
            businessline: filter_Data.selectedvertical.value === 1 ? "PROLINKS" : filter_Data.selectedvertical.value === 2 ? "PROTECTON" : filter_Data.selectedvertical.value === 14 ? "OTHER PROTECTON" : "",
            ptm_region: filter_Data.selectedProtecton_region.value,
            ptm_depot_code: filter_Data.selectedDepot.value,
            ptm_terr_code: filter_Data.selectedTerr.value,
            assign_stat: filter_Data.selectedAssignStatus.value,
            ptm_work_status: filter_Data.selectedWorkStatus.value
        };
        try {
            // if (filter_Data.selectedvertical.value === 2) {
            const response: any = await GetPotentialTrackingList(filterData);
            if (response?.statusCode !== 200) {
                setLoading(false);
                return;
            } else {
                setPotentialLeadDataList(response?.data?.table || []);
            }
            // }
        } catch (error) {
            return;
        }
        setLoading(false);
    }

    const handleDropdownSelect = (action: string) => {
        setShowDropdown(false);
        setPopupOpenData({ open: true, popupHeader: action })
    };

    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'lead_vertical',
                header: 'Vertical',
                size: 60,
            },
            {
                accessorKey: 'created_user',
                header: 'Created By',
                size: 60,
            },
            {
                accessorKey: 'ptm_createdon',
                header: 'Date',
                size: 60,
            },
            {
                accessorKey: 'ptm_project_name',
                header: 'Project Name',
                size: 60,
            },
            {
                accessorKey: 'ptm_customer_name',
                header: 'Customer Name',
                size: 60,
            },
            {
                accessorKey: 'work_status_disp',
                header: 'Work Status',
                size: 60,
            },
            {
                accessorKey: 'region',
                header: 'Region',
                size: 60,
            },
            {
                accessorKey: 'ptm_project_address1',
                header: 'Address',
                size: 60,
            },
            {
                accessorKey: 'ptm_project_city',
                header: 'City',
                size: 60,
            },
            {
                accessorKey: 'ptm_project_pin',
                header: 'PIN',
                size: 60,
            },
            {
                accessorKey: 'ptm_project_state_name',
                header: 'State',
                size: 60,
            },
            {
                header: 'Action',
                size: 70,
                Cell: ({ cell }) => {
                    return (
                        <>
                            <span
                                className='cursor-pointer text-primary text-xl mr-2.5'
                                title="View"
                            >
                                <div className="flex items-center justify-center">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => {
                                            handleDropdownSelect(cell.row.original?.lead_vertical.toUpperCase());
                                            rowData.current = cell.row.original;
                                            selectedLeadDetails1();
                                        }}
                                    >
                                        <IoEyeSharp />
                                    </button>
                                </div>
                            </span>
                        </>
                    );
                },
            },
        ],
        []
    );
    const table = useMantineReactTable({
        columns,
        data: potentialLeadDataList,
        enableColumnResizing: true,
        enableTopToolbar: false,
        enableSorting: false,
        enableColumnActions: false,
        columnResizeMode: 'onChange',
        mantineTableContainerProps: {
            style: {
                overflowX: 'hidden',
            },
        }
    });

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
        setTimeout(() => {
            setDdlData((prevData: any) => ({ ...prevData, ...commonLovDetailsData.current }));
        }, 2000);
        // setTimeout(() => {
        //     if (rowData.current) {
        //         selectedLeadDetails();
        //     }
        // }, 5000);
        VerticalWisBusinessLineAPICall();
    }, []);

    useEffect(() => {
        setData(((prev: any) => ({ ...prev, ptm_lead_share: popupOpenData?.popupHeader === 'SELF' ? { value: 'LS2', label: 'SELF' } : '' })));
    }, [popupOpenData?.popupHeader])

    // React.useEffect(() => {
    //     console.log(ddlData);
    //     if (rowData.current) {
    //         selectedLeadDetails();
    //     }
    // }, [ddlData]);

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
                                checked={filter_Data?.viewBy === "FROM"}
                                onChange={e => setFilter_Data((pre: any) => ({ ...pre, viewBy: e.target.value }))}
                                className="mr-1"
                            />
                            FROM
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="viewBy"
                                value="TO"
                                checked={filter_Data?.viewBy === "TO"}
                                onChange={e => setFilter_Data((pre: any) => ({ ...pre, viewBy: e.target.value }))}
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
                            options={ddlData.verticalData.map((d: any) => ({
                                value: d.bm_id,
                                label: d.bm_name,
                            }))}
                            value={filter_Data.selectedvertical}
                            onChange={(event: any) => {
                                setFilter_Data((pre: any) => ({ ...pre, selectedvertical: event }))
                            }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Select Region:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            options={ddlData.protecton_regionList.map((d: any) => ({ value: d.depot_regn, label: d.regn_new }))}
                            value={filter_Data.selectedProtecton_region}
                            onChange={(event: any) => {
                                setLoading(true);
                                Getdepot(event.value);
                                Getterr({ region: event.value, depot: '' });
                                setTimeout(() => {
                                    setLoading(false);
                                }, 2500);
                                setFilter_Data((pre: any) => ({ ...pre, selectedProtecton_region: event, selectedDepot: '', selectedTerr: '' }))
                            }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Select Depot:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            options={ddlData.depotList.map((d: any) => ({ value: d.depot_code, label: d.depot_name }))}
                            value={filter_Data.selectedDepot}
                            onChange={(event: any) => {
                                setLoading(true);
                                Getterr({ region: filter_Data.selectedProtecton_region.value, depot: event.value });
                                setTimeout(() => {
                                    setLoading(false);
                                }, 2500);
                                setFilter_Data((pre: any) => ({ ...pre, selectedDepot: event, selectedTerr: '' }))
                            }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Select Territory:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            options={ddlData.terrList.map((d: any) => ({ value: d.terr_code, label: d.terr_name }))}
                            value={filter_Data.selectedTerr}
                            onChange={(event: any) => {
                                setFilter_Data((pre: any) => ({ ...pre, selectedTerr: event }))
                            }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Assign Status:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            options={ddlData.assignStatusList.map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                            value={filter_Data.selectedAssignStatus}
                            onChange={(event: any) => {
                                setFilter_Data((pre: any) => ({ ...pre, selectedAssignStatus: event }))
                            }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Work Status:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            options={ddlData.workStatusList.map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                            value={filter_Data.selectedWorkStatus}
                            onChange={(event: any) => {
                                setFilter_Data((pre: any) => ({ ...pre, selectedWorkStatus: event }))
                            }}
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
                                            <button key={indx} className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50" onClick={() => handleDropdownSelect(vd?.bm_name)}>{vd?.bm_name}</button>
                                        )
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-2" style={{ maxHeight: '45vh', overflowY: 'auto' }}>
                <MantineReactTable table={table} />
            </div>

            {popupOpenData?.open &&
                <CustomPopupComponent handleSearch={handleSearch} commonLovDetailsData={commonLovDetailsData} setDdlData={setDdlData} dataObj={dataObj} ddlData={ddlData} data={data} setData={setData} popupOpenData={popupOpenData} setPopupOpenData={setPopupOpenData} setLoading={setLoading} OtherAPIcall={OtherAPIcall} Getdepot={Getdepot} Getterr={Getterr} />
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