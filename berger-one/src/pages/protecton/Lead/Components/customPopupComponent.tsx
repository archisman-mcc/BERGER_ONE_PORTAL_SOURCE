import React, { useEffect } from 'react';
import { MdOutlineClose } from "react-icons/md";
import Select from 'react-select';
import { UseAuthStore } from '../../../../services/store/AuthStore';
import { GetApplicableDepot, GetRegion, GetStateList } from '../../../../services/api/users/UserProfile';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import SiteContactTable from './SiteContactTable';
import { Button, Textarea } from '@mantine/core';
import { GetDealerSearch, GetKeyAccountList, GetStateListPotentialLead, potentialTrackingSubmit, ProLeadInsert } from '../../../../services/api/protectonLead/PotentialLead';
import AsyncSelectBox from '../../Transact/Components/AsyncSelectBox';
import PotentialTrackingcontacts from './PotentialTrackingcontacts';
import TeamMemberTable from './TeamMemberTable';
import { commonErrorToast, commonSuccessToast } from '../../../../services/functions/commonToast';
import { GetUserApplicableDealer } from '../../../../services/api/protectonEpca/EpcaList';

const CustomPopupComponent = ({ handleSearch, commonLovDetailsData, setDdlData, dataObj, ddlData, data, setData, popupOpenData, setPopupOpenData, setLoading, OtherAPIcall, Getdepot, Getterr, detailsAPIcall }: any) => {
    const user = UseAuthStore((state: any) => state.userDetails);

    const blankObj = { selectedOption: '', selectedObj: [], asyncSelectData: [] };
    const [existingBusinessContract, setexistingBusinessContract] = React.useState({ ...blankObj });
    const [isImageUploadPopupOpen, setIsImageUploadPopupOpen] = React.useState(false);
    const [selected_doc_type, setSelected_doc_type]: any = React.useState({});
    const [imagePreviewData, setImagePreviewData] = React.useState<{ isOpen: boolean; imagePath: string; fileName: string }>({ isOpen: false, imagePath: '', fileName: '' });

    useEffect(() => {
        setData((pre: any) => ({ ...pre, ptm_ref_dealer_code: existingBusinessContract?.selectedOption }))
    }, [existingBusinessContract])

    useEffect(() => {
        setexistingBusinessContract({ ...existingBusinessContract, selectedOption: data?.ptm_ref_dealer_code })
    }, [data?.ptm_ref_dealer_code])


    const GetRegionAPICALL = async () => {
        // setLoading(true);
        const data: any = {
            user_group: user.group_code,
            app_id: 0
        };
        try {
            const response: any = await GetRegion(data);
            setData((prevData: any) => ({
                ...prevData,
                regionList: response.data.table || [],
                applicableDealerList: [],
            }));
        } catch (error) {
            return;
        }
        // setLoading(false);
    }

    const GetStateListAPICALL = async () => {
        // setLoading(true);
        try {
            const response: any = await GetStateList({});
            setData((prevData: any) => ({
                ...prevData,
                stateList: response.data.table || [],
            }));
        } catch (error) {
            return;
        }
        // setLoading(false);
    }

    const GetAddressDtlsAPICALL = async (props: any) => {
        // setLoading(true);
        try {
            const response: any = await GetStateListPotentialLead({ pin_code: props });
            if (response.data.table.length) {
                setData((prevData: any) => ({
                    ...prevData,
                    selectedStateList: { value: response.data.table[0].state_code, label: response.data.table[0].state_name },
                    addr1: response.data.table[0].pm_town_villige,
                    addr2: response.data.table[0].pm_sub_district,
                    city: response.data.table[0].pm_district,
                }));
            }
        } catch (error) {
            return;
        }
        // setLoading(false);
    }

    const GetApplicableDepotAPICALL = async (props: any) => {
        // setLoading(true);
        try {
            const response: any = await GetApplicableDepot(props);
            setData((prevData: any) => ({
                ...prevData,
                applicableDepotList: response.data.table || [],
                applicableDealerList: [],
            }));
        } catch (error) {
            return;
        }
        // setLoading(false);
    }

    const GetCust = async (props: any) => {
        try {
            const response: any = await GetUserApplicableDealer(props);
            // console.log(response);
            setDdlData((prevData: any) => ({
                ...prevData,
                applicableDealerList: response?.data?.table || [],
            }));
        } catch (error) {
            return;
        }
    };

    const GetKeyAccountListAPIcall = async (inputValue: any) => {
        try {
            const response: any = await GetKeyAccountList(inputValue);
            setDdlData({ ...ddlData, key_account_List: [...response.data.table] });
        } catch (error) {
            return;
        }
    }

    // Document handling functions
    const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (Object.keys(selected_doc_type).length === 0) {
            alert("Please select Doc Type!");
            return;
        }

        if (files) {
            Array.from(files).forEach((file) => {
                const reader = new FileReader();

                reader.onload = (e) => {
                    const result = e.target?.result as string;

                    // Remove the prefix "data:...;base64," if present
                    const base64String = result.includes(",")
                        ? result.split(",")[1]
                        : result;

                    const newDocument = {
                        ptd_doc_desc: "",
                        ptd_doc_name: file.name,
                        ptd_doc_path: base64String,
                        ptd_doc_type: selected_doc_type?.value,
                    };

                    setData((prevData: any) => ({
                        ...prevData,
                        potentialTrackingDocs: [
                            ...(prevData.potentialTrackingDocs || []),
                            newDocument,
                        ],
                    }));
                };

                reader.onerror = (error) => {
                    console.error("Error reading file:", error);
                };

                reader.readAsDataURL(file);
            });

            setIsImageUploadPopupOpen(false);
            setSelected_doc_type({});
        }

        // reset input so the same file can be selected again
        event.target.value = "";
    };

    const removeDocument = (index: number) => {
        setData((prevData: any) => ({
            ...prevData,
            potentialTrackingDocs: prevData.potentialTrackingDocs.filter((_: any, i: number) => i !== index)
        }));
    };

    const handleImagePreview = (imagePath: string, fileName: string) => {
        setImagePreviewData({ isOpen: true, imagePath, fileName });
    };

    const prolinksAlertFunc = () => {
        if (data?.selectedRegionList === '') {
            alert('Please select region');
            return false;
        } else if (data?.selectedApplicableDepotList === '') {
            alert('Please select depot');
            return false;
        } else if (data?.selectedPaint_admixture === '') {
            alert('Please select paint/admixture');
            return false;
        } else if (data?.selectedGovt_pvt === '') {
            alert('Please select govt./private');
            return false;
        } else if (data?.selectedPainting === '') {
            alert('Please select new/re-paint');
            return false;
        } else if (data?.selectedLead_sector === '') {
            alert('Please select sector');
            return false;
        } else if (data?.selectedLead_sub_sector === '') {
            alert('Please select sub sector');
            return false;
        } else if (data?.projectName.trim() === '') {
            alert('Please enter project name');
            return false;
        } else if (data?.siteLocation.trim() === '') {
            alert('Please enter site location');
            return false;
        } else if (data?.addr1.trim() === '') {
            alert('Please enter address line 1');
            return false;
        } else if (data?.city.trim() === '') {
            alert('Please enter city');
            return false;
        } else if (data?.pinCode.trim() === '') {
            alert('Please enter pincode');
            return false;
        } else if (data?.selectedStateList === '') {
            alert('Please select state');
            return false;
        }
        return true;
    }

    const selfAlertFunc = () => {
        if (data?.ptm_ref_lead_yn === '') {
            commonErrorToast('Please select Referral Lead');
            return false;
        }
        else if (data.ptm_ref_lead_yn?.value === 'Y' && data?.ptm_ref_lead_type === '') {
            commonErrorToast('Please select Refer From');
            return false;
        }
        else if (data.ptm_ref_lead_type?.value === "BC1" && data?.ptm_ref_dealer_code === '') {
            commonErrorToast('Please select Existing Business Contract');
            return false;
        }
        else if (data?.ptm_customer_name === '') {
            commonErrorToast('Please enter Customer');
            return false;
        }
        else if (data?.ptm_contractor_type === '') {
            commonErrorToast('Please select Contractor Type');
            return false;
        }
        else if (data.ptm_key_account_type === '') {
            commonErrorToast('Please select Key Account Type');
            return false;
        }
        else if (data.ptm_key_account_id === '' && data.ptm_key_account_type?.value) {
            commonErrorToast('Please select Key Account');
            return false;
        }
        else if (data?.projectName === '') {
            commonErrorToast('Please enter Project Name');
            return false;
        }
        else if (data?.siteLocation === '') {
            commonErrorToast('Please enter Project Location');
            return false;
        }
        else if (data?.addr1 === '') {
            commonErrorToast('Please enter Address Line 1');
            return false;
        }
        else if (data?.ptm_region === '') {
            commonErrorToast('Please select Region');
            return false;
        }
        else if (data?.ptm_depot_code === '' && popupOpenData?.popupHeader === "SELF") {
            commonErrorToast('Please select Depot');
            return false;
        }
        else if (data?.ptm_terr_code === '' && popupOpenData?.popupHeader === "SELF") {
            commonErrorToast('Please select Territory');
            return false;
        }
        else if (data?.ptm_work_status === '') {
            commonErrorToast('Please select Work In Progress');
            return false;
        }
        // else if (data?.ptm_expected_cldate === '') {
        //     commonErrorToast('Please select Expected Closing Date For Order');
        //     return false;
        // }
        return true;
    }

    const handleSubmit = async () => {
        const isValidationPassed = (popupOpenData?.popupHeader === 'PROLINKS' && popupOpenData?.type === "NEW") ? prolinksAlertFunc() : selfAlertFunc();

        if (!isValidationPassed) {
            return;
        }
        const newProlinksPayloadData = {
            lead_gen_id: 0,
            region: data?.selectedRegionList?.value || '',
            depot: data?.selectedApplicableDepotList?.value || '',
            terr: data?.selectedTerr?.value || '',
            lead_category: data?.selectedPaint_admixture?.value || '',
            account_type: data?.selectedAc_type?.value || '',
            key_acc_name: "",
            govtPvt: data?.selectedGovt_pvt?.value || '',
            new_repainting: data?.selectedPainting?.value || '',
            lead_sector: data?.selectedLead_sector?.value || '',
            lead_sub_sector: data?.selectedLead_sub_sector?.value || '',
            inq_lead_potential: data?.selectedLead_potential?.value || '',
            potential_lead: 0,
            project_name: data?.projectName || '',
            project_desc: data?.projectDescription || '',
            site_location: data?.siteLocation || '',
            site_addr: "",
            addr1: data?.addr1 || '',
            addr2: data?.addr2 || '',
            city: data?.city || '',
            pinCode: data?.pinCode || '',
            state: data?.selectedStateList?.value || '',
            pan_no: data?.pan_no || '',
            gstin_no: data?.gstin_no || '',
            lead_stage: data?.selectedKey_lead_stage?.value || '',
            painting_starting_time: data?.selectedKey_painting_start_time?.value || '',
            intPaintableArea: data?.intPaintableArea || '',
            extPaintableArea: data?.extPaintableArea || '',
            painting_remarks: data?.painting_remarks || '',
            leadStatus: data?.leadStatus || '',
            tentativeStartDate: data?.tentativeStartDate ? new Date(data?.tentativeStartDate).toISOString() : '',
            durationInMonth: data?.durationInMonth || '',
            paint_business_potential: data?.paint_business_potential || '',
            businessPotential_cc: data?.businessPotential_cc || '',
            shareOfBusiness: data?.shareOfBusiness || '',
            proLeadContactDtls: data?.siteContactTableData || [],
            documents: data?.documents || [],
            inqRejected: "",
            lead_type: "",
            businessline: popupOpenData?.popupHeader,
        }
        const payloadData = {
            potentialTrackingMstr: [{
                ptm_id: data.ptm_id || 0,
                ptm_app_id: 15,
                ptm_ref_lead_yn: data.ptm_ref_lead_yn?.value || '',
                ptm_ref_lead_type: data.ptm_ref_lead_type?.value || '',
                ptm_ref_dealer_code: data.ptm_ref_dealer_code?.value || '',
                ptm_customer_name: data.ptm_customer_name || '',
                ptm_contractor_type: data.ptm_contractor_type?.value || '',
                ptm_key_account_type: data.ptm_key_account_type?.value || '',
                ptm_key_account_id: data.ptm_key_account_id?.value || '',
                ptm_project_name: data.projectName || '',
                ptm_project_location: data.siteLocation || '',
                ptm_project_address1: data.addr1 || '',
                ptm_project_address2: data.addr2 || '',
                ptm_project_city: data.city || '',
                ptm_project_pin: data.pinCode || '',
                ptm_project_state: data.selectedStateList?.value || '',
                ptm_potential_val: data.ptm_potential_val || '',
                ptm_potential_vol: data.ptm_potential_vol || '',
                ptm_potential_area: data.ptm_potential_area || '',
                ptm_potential_area_uom: data.ptm_potential_area_uom?.value || '',
                ptm_area: data.ptm_area || '',
                ptm_business_type: data.ptm_business_type?.value || '',
                ptm_product_category: data.ptm_product_category?.map((ppc: any) => ppc?.value).join(",") || '',
                ptm_industry_segment: data.ptm_industry_segment?.value || '',
                ptm_lead_share: data.ptm_lead_share?.value || '',
                ptm_region: data.ptm_region?.value || '',
                ptm_depot_code: data.ptm_depot_code?.value || '',
                ptm_terr_code: data.ptm_terr_code?.value || '',
                ptm_work_status: data.ptm_work_status?.value || '',
                ptm_expected_cldate: data.ptm_expected_cldate || '',
                ptm_reason_for_onhold: data.ptm_reason_for_onhold || '',
                ptm_dealer_code: data.ptm_dealer_code?.value || '',
                ptm_extra_info: data.ptm_extra_info || '',
            }],
            potentialTrackingcontacts: data?.potentialTrackingcontacts || [],
            potentialTrackingDocs: data?.potentialTrackingDocs || [],
            potentialTrackingActivityLog: [],
        }
        // console.log('Payload Data:', payloadData);
        setLoading(true);
        if (popupOpenData?.popupHeader === 'PROLINKS' && popupOpenData?.type === "NEW") {
            try {
                const response: any = await ProLeadInsert(newProlinksPayloadData);
                if (response?.statusCode !== 200) {
                    commonErrorToast(response?.message || 'Error submitting data');
                    setLoading(false);
                    return;
                } else {
                    commonSuccessToast(response?.message || 'Data submitted successfully');
                }
            } catch (error) {
                return;
            }
        } else {
            try {
                const response: any = await potentialTrackingSubmit(payloadData);
                if (response?.statusCode !== 200) {
                    commonErrorToast(response?.message || 'Error submitting data');
                    setLoading(false);
                    return;
                } else {
                    commonSuccessToast(response?.message || 'Data submitted successfully');
                }
            } catch (error) {
                return;
            }
        }
        setLoading(false);
        handleSearch();
        setPopupOpenData({ open: false, popupHeader: '' });
        setData({ ...dataObj });
    }

    React.useEffect(() => {
        // setLoading(true);
        GetStateListAPICALL();
        if (popupOpenData?.popupHeader === 'PROLINKS' && popupOpenData?.type === "NEW") {
            GetRegionAPICALL();
            OtherAPIcall({
                lov_type: "PT_LEAD_CATEGORY",
                active: "Y"
            });
            OtherAPIcall({
                lov_type: "LEAD_ACCOUNT_TYPE",
                active: "Y"
            });
            OtherAPIcall({
                lov_type: "PT_GOVT_PVT",
                active: "Y"
            });
            OtherAPIcall({
                lov_type: "PT_PAINTING",
                active: "Y"
            });
            OtherAPIcall({
                lov_type: "PT_LEAD_SECTOR",
                active: "Y"
            });
            OtherAPIcall({
                lov_type: "PT_LEAD_SUB_SECTOR",
                active: "Y"
            });
            OtherAPIcall({
                lov_type: "LEAD_POTENTIAL",
                active: "Y"
            });
            OtherAPIcall({
                lov_type: "KEY_APPL_CITY",
                active: "Y"
            });
            OtherAPIcall({
                lov_type: "PT_KEY_LEAD_STAGE",
                active: "Y"
            });
            OtherAPIcall({
                lov_type: "PT_KEY_PAINTING_START_TIME",
                active: "Y"
            });
        } else {
            // } else if (popupOpenData?.popupHeader === "SELF" || popupOpenData?.popupHeader === "OTHER PROTECTON") {
            // Initialize documents array if it doesn't exist
            // if (!data.documents) {
            //     setData((prevData: any) => ({
            //         ...prevData,
            //         documents: []
            //     }));
            // }

            OtherAPIcall({
                lov_type: "PT_BUSINESS_SEGMENT",
                active: "Y"
            });
            OtherAPIcall({
                lov_type: "PT_BUSINESS_TYPE",
                active: "Y"
            });
            OtherAPIcall({
                lov_type: "PT_INDUSTRY_SEGMENT",
                active: "Y"
            });
            OtherAPIcall({
                lov_type: "PT_PRODUCT_CATEGORY",
                active: "Y"
            });
            OtherAPIcall({
                lov_type: "PT_PROJECT_TYPE",
                active: "Y"
            });
            OtherAPIcall({
                lov_type: "PT_LEAD_SHARE",
                active: "Y"
            });
            OtherAPIcall({
                lov_type: "PT_WORK_IN_PROGRESS",
                active: "Y"
            });
            OtherAPIcall({
                lov_type: "KEY_APPL_CITY",
                active: "Y"
            });
            OtherAPIcall({
                lov_type: "PT_DOC_TYPE",
                active: "Y"
            });
            OtherAPIcall({
                lov_type: "PT_AREA_MOU",
                active: "Y"
            });
            OtherAPIcall({
                lov_type: "PT_BUSINESS_CONTACT",
                active: "Y"
            });
            OtherAPIcall({
                lov_type: "PT_CONTRACTOR_TYPE",
                active: "Y"
            });
            OtherAPIcall({
                lov_type: "PT_KEY_ACCOUNT_TYPE",
                active: "Y"
            });

            // console.log(ddlData);

            setTimeout(() => {
                // setDdlData((prevData: any) => ({ ...prevData, ...commonLovDetailsData.current }));
                // console.log({ ...ddlData, ...commonLovDetailsData.current })
                setDdlData({ ...ddlData, ...commonLovDetailsData.current });
            }, 1000);
        }
        // setTimeout(() => {
        //     setLoading(false);
        // }, 10000);
    }, []);

    // React.useEffect(() => {
    //     data.ptm_terr_code?.value && GetCust();
    // }, [data.ptm_terr_code]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-0 rounded-lg shadow-lg w-full h-full max-w-none max-h-none flex flex-col">
                {/* Fixed header */}
                <div className="sticky top-0 z-10 bg-blue-400 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
                    <p className="text-xl font-bold">{popupOpenData?.popupHeader} Lead Entry</p>
                    <span className="px-3 py-1 rounded cursor-pointer" >
                        <MdOutlineClose
                            color="white"
                            size={28}
                            onClick={() => {
                                setPopupOpenData({ open: false, popupHeader: '' });
                                setData({ ...dataObj });
                                if (commonLovDetailsData.current) {
                                    commonLovDetailsData.current = {}; // Set the input's value to an empty string
                                }
                                // console.log(commonLovDetailsData)
                            }}
                        />
                    </span>
                </div>
                {/* Scrollable content */}
                <div className="p-6 overflow-y-auto flex-1">
                    {/* ----------lead info---------- */}
                    {popupOpenData?.popupHeader === 'PROLINKS' && popupOpenData?.type === "NEW" &&
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1">Select Region:</label>
                                <Select
                                    className="text-sm"
                                    isSearchable={true}
                                    options={data.regionList.map((d: any) => ({ value: d.depot_regn, label: d.regn_new }))}
                                    value={data.selectedRegionList}
                                    onChange={(event: any) => {
                                        GetApplicableDepotAPICALL({ region: event?.label, app_id: 0, isRegionNew: 0 });
                                        setData((pre: any) => ({ ...pre, selectedRegionList: event }))
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Select Depot:</label>
                                <Select
                                    className="text-sm"
                                    isSearchable={true}
                                    options={data.applicableDepotList.map((d: any) => ({ value: d.depot_code, label: d.depot_name }))}
                                    value={data.selectedApplicableDepotList}
                                    onChange={(event: any) => {
                                        setData((pre: any) => ({ ...pre, selectedApplicableDepotList: event }))
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Select Paint/Admixture:</label>
                                <Select
                                    className="text-sm"
                                    isSearchable={true}
                                    options={ddlData.paint_admixture_List.map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                                    value={data.selectedPaint_admixture}
                                    onChange={(event: any) => {
                                        setData((pre: any) => ({ ...pre, selectedPaint_admixture: event }))
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Select Key/Non Key:</label>
                                <Select
                                    className="text-sm"
                                    isSearchable={true}
                                    options={ddlData.ac_type_List.map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                                    value={data.selectedAc_type}
                                    onChange={(event: any) => {
                                        setData((pre: any) => ({ ...pre, selectedAc_type: event }))
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Select Govt./Private:</label>
                                <Select
                                    className="text-sm"
                                    isSearchable={true}
                                    options={ddlData.govt_pvt_List.map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                                    value={data.selectedGovt_pvt}
                                    onChange={(event: any) => {
                                        setData((pre: any) => ({ ...pre, selectedGovt_pvt: event }))
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Select New/Re-Paint:</label>
                                <Select
                                    className="text-sm"
                                    isSearchable={true}
                                    options={ddlData.painting_List.map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                                    value={data.selectedPainting}
                                    onChange={(event: any) => {
                                        setData((pre: any) => ({ ...pre, selectedPainting: event }))
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Select Sector:</label>
                                <Select
                                    className="text-sm"
                                    isSearchable={true}
                                    options={ddlData.lead_sector_List.map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                                    value={data.selectedLead_sector}
                                    onChange={(event: any) => {
                                        setData((pre: any) => ({ ...pre, selectedLead_sector: event }))
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Select Sub Sector:</label>
                                <Select
                                    className="text-sm"
                                    isSearchable={true}
                                    options={ddlData.lead_sub_sector_List.map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                                    value={data.selectedLead_sub_sector}
                                    onChange={(event: any) => {
                                        setData((pre: any) => ({ ...pre, selectedLead_sub_sector: event }))
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Select Potential Lead(Opportunity):</label>
                                <Select
                                    className="text-sm"
                                    isSearchable={true}
                                    options={ddlData.lead_potential_list.map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                                    value={data.selectedLead_potential}
                                    onChange={(event: any) => {
                                        setData((pre: any) => ({ ...pre, selectedLead_potential: event }))
                                    }}
                                />
                            </div>
                        </div>
                    }

                    {(
                        (popupOpenData?.popupHeader === 'SELF' && popupOpenData?.type === "NEW") ||
                        (popupOpenData?.popupHeader === 'SELF' && popupOpenData?.type === "VIEW") ||
                        (popupOpenData?.popupHeader === "OTHER PROTECTON" && popupOpenData?.type === "NEW") ||
                        (popupOpenData?.popupHeader === "OTHER PROTECTON" && popupOpenData?.type === "VIEW") ||
                        (popupOpenData?.popupHeader === "PROLINKS" && popupOpenData?.type === "VIEW")
                    ) &&
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Referral Lead:<span style={{ color: 'red', marginLeft: '2px' }}>*</span></label>
                                    <Select
                                        className="text-sm"
                                        isDisabled={detailsAPIcall && data.ptm_work_status?.value === "WIP8" ? true : false}
                                        isSearchable={true}
                                        options={ddlData?.referralLead}
                                        value={data.ptm_ref_lead_yn}
                                        onChange={(event: any) => {
                                            setexistingBusinessContract({ ...blankObj });
                                            setData((pre: any) => ({ ...pre, ptm_ref_lead_yn: event, ptm_ref_lead_type: '', potentialTrackingcontacts: pre?.potentialTrackingcontacts.filter((ptc: any) => ptc?.ptc_contact_type !== "CONTRACTOR") }));
                                        }}
                                    />
                                </div>
                                {data.ptm_ref_lead_yn?.value === 'Y' &&
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Refer From:<span style={{ color: 'red', marginLeft: '2px' }}>*</span></label>
                                        <Select
                                            className="text-sm"
                                            isDisabled={detailsAPIcall && data.ptm_work_status?.value === "WIP8" ? true : false}
                                            isSearchable={true}
                                            options={ddlData.refer_from_List.map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                                            value={data.ptm_ref_lead_type}
                                            onChange={(event: any) => {
                                                setexistingBusinessContract({ ...blankObj });
                                                setData((pre: any) => ({ ...pre, ptm_ref_lead_type: event, potentialTrackingcontacts: pre?.potentialTrackingcontacts.filter((ptc: any) => ptc?.ptc_contact_type !== "CONTRACTOR") }))
                                            }}
                                        />
                                    </div>
                                }
                                {data.ptm_ref_lead_type?.value === "BC1" &&
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Existing Business Contract:<span style={{ color: 'red', marginLeft: '2px' }}>*</span></label>
                                        <AsyncSelectBox
                                            isDisabled={detailsAPIcall && data.ptm_work_status?.value === "WIP8" ? true : false}
                                            data={existingBusinessContract}
                                            setData={setexistingBusinessContract}
                                            label="display_name"
                                            value="dealer_code"
                                            api={GetDealerSearch}
                                            payloadPrefixText='srarchstr'
                                            // placeholder="Search for existing business contract..."
                                            apiPayload={{
                                                depot: "",
                                                terr: "",
                                                region: ""
                                            }}
                                        />
                                    </div>
                                }
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Customer:<span style={{ color: 'red', marginLeft: '2px' }}>*</span></label>
                                    <input readOnly={detailsAPIcall && data.ptm_work_status?.value === "WIP8" ? true : false} type="text" placeholder="Enter Customer" className="w-full border rounded form-input text-sm" value={data?.ptm_customer_name} onChange={(event: any) => setData((pre: any) => ({ ...pre, ptm_customer_name: event.target.value }))} autoComplete="off" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Contractor Type:<span style={{ color: 'red', marginLeft: '2px' }}>*</span></label>
                                    <Select
                                        className="text-sm"
                                        isDisabled={detailsAPIcall && data.ptm_work_status?.value === "WIP8" ? true : false}
                                        isSearchable={true}
                                        options={ddlData?.contractor_type_List.map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                                        value={data.ptm_contractor_type}
                                        onChange={(event: any) => setData((pre: any) => ({ ...pre, ptm_contractor_type: event }))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Key Account Type:<span style={{ color: 'red', marginLeft: '2px' }}>*</span></label>
                                    <Select
                                        className="text-sm"
                                        isDisabled={detailsAPIcall && data.ptm_work_status?.value === "WIP8" ? true : false}
                                        isSearchable={true}
                                        options={ddlData?.key_account_type_List.map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                                        value={data.ptm_key_account_type}
                                        onChange={(event: any) => {
                                            GetKeyAccountListAPIcall({ business_line: "PROTECTON", key_account_type: event?.value });
                                            setData((pre: any) => ({ ...pre, ptm_key_account_type: event }))
                                        }}
                                    />
                                </div>
                                {data.ptm_key_account_type?.value &&
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Key Account:<span style={{ color: 'red', marginLeft: '2px' }}>*</span></label>
                                        <Select
                                            className="text-sm"
                                            isDisabled={detailsAPIcall && data.ptm_work_status?.value === "WIP8" ? true : false}
                                            isSearchable={true}
                                            options={ddlData?.key_account_List.map((d: any) => ({ value: d.key_account_id, label: d.key_account_name }))}
                                            value={data.ptm_key_account_id}
                                            onChange={(event: any) => setData((pre: any) => ({ ...pre, ptm_key_account_id: event }))}
                                        />
                                    </div>
                                }
                            </div>
                            {data.ptm_ref_lead_type?.value === "BC2" &&
                                <>
                                    <div className="mb-1">
                                        <h2 className="text-sm font-semibold text-gray-800">Referral Source Details:</h2>
                                    </div>
                                    <div className="mb-2">
                                        <PotentialTrackingcontacts data={data} setData={setData} type="ReferralSourceDetails" />
                                    </div>
                                </>
                            }
                        </>
                    }
                    {/* -------------lead info----------- */}

                    {/* ---------Project Information--------- */}
                    <div className="border-b-2 border-blue-400 pb-2 mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Project Information</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-semibold mb-1">Project Name:<span style={{ color: 'red', marginLeft: '2px' }}>*</span></label>
                            <input readOnly={detailsAPIcall && data.ptm_work_status?.value === "WIP8" ? true : false} type="text" placeholder="Enter project name" className="w-full border rounded form-input text-sm" name="billTo" value={data?.projectName} onChange={(event: any) => setData((pre: any) => ({ ...pre, projectName: event.target.value }))} autoComplete="off" />
                        </div>
                        {popupOpenData?.popupHeader === 'PROLINKS' && popupOpenData?.type === "NEW" &&
                            <div>
                                <label className="block text-sm font-semibold mb-1">Project Description:</label>
                                <input type="text" placeholder="Enter project description" className="w-full border rounded form-input text-sm" name="billTo" value={data?.projectDescription} onChange={(event: any) => setData((pre: any) => ({ ...pre, projectDescription: event.target.value }))} autoComplete="off" />
                            </div>}
                        <div>
                            <label className="block text-sm font-semibold mb-1">Project Location:<span style={{ color: 'red', marginLeft: '2px' }}>*</span></label>
                            <input readOnly={detailsAPIcall && data.ptm_work_status?.value === "WIP8" ? true : false} type="text" placeholder="Enter project location" className="w-full border rounded form-input text-sm" name="billTo" value={data?.siteLocation} onChange={(event: any) => setData((pre: any) => ({ ...pre, siteLocation: event.target.value }))} autoComplete="off" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1">Address Line 1:<span style={{ color: 'red', marginLeft: '2px' }}>*</span></label>
                            <input readOnly={detailsAPIcall && data.ptm_work_status?.value === "WIP8" ? true : false} type="text" placeholder="Enter Address 1" className="w-full border rounded form-input text-sm" name="addr1" value={data?.addr1} onChange={(event: any) => setData((pre: any) => ({ ...pre, addr1: event.target.value }))} autoComplete="off" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1">Address Line 2:</label>
                            <input readOnly={detailsAPIcall && data.ptm_work_status?.value === "WIP8" ? true : false} type="text" placeholder="Enter Address 2" className="w-full border rounded form-input text-sm" name="addr2" value={data?.addr2} onChange={(event: any) => setData((pre: any) => ({ ...pre, addr2: event.target.value }))} autoComplete="off" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1">City:</label>
                            <input readOnly={detailsAPIcall && data.ptm_work_status?.value === "WIP8" ? true : false} type="text" placeholder="Enter City" className="w-full border rounded form-input text-sm" name="city" value={data?.city} onChange={(event: any) => setData((pre: any) => ({ ...pre, city: event.target.value }))} autoComplete="off" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1">Pincode:</label>
                            <input
                                readOnly={detailsAPIcall && data.ptm_work_status?.value === "WIP8" ? true : false}
                                type="number"
                                placeholder="Enter Pincode"
                                className="w-full border rounded form-input text-sm no-spinner text-right"
                                name="pinCode"
                                value={data?.pinCode}
                                onChange={(event: any) => {
                                    const value = event.target.value;
                                    if (value.length < 7) {
                                        setData((pre: any) => ({ ...pre, pinCode: value }));
                                    }
                                }}
                                onBlur={(event: any) => {
                                    const value = event.target.value;
                                    if (value.length < 6) {
                                        alert('Please enter valid pin');
                                        return;
                                    }
                                    GetAddressDtlsAPICALL(value);
                                }}
                                autoComplete="off"
                                min="100000"
                                max="999999"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1">Select State:</label>
                            <Select
                                className="text-sm"
                                isDisabled={detailsAPIcall && data.ptm_work_status?.value === "WIP8" ? true : false}
                                isSearchable={true}
                                options={data.stateList.map((d: any) => ({ value: d.state_code, label: d.state_name }))}
                                value={data.selectedStateList}
                                onChange={(event: any) => {
                                    setData((pre: any) => ({ ...pre, selectedStateList: event }))
                                }}
                            />
                        </div>
                    </div>
                    {/* DG */}
                    {(
                        (popupOpenData?.popupHeader === 'SELF' && popupOpenData?.type === "NEW") ||
                        (popupOpenData?.popupHeader === 'SELF' && popupOpenData?.type === "VIEW") ||
                        (popupOpenData?.popupHeader === "OTHER PROTECTON" && popupOpenData?.type === "NEW") ||
                        (popupOpenData?.popupHeader === "OTHER PROTECTON" && popupOpenData?.type === "VIEW") ||
                        (popupOpenData?.popupHeader === "PROLINKS" && popupOpenData?.type === "VIEW")
                    ) &&
                        <div className="mb-2">
                            <div className="mb-1">
                                <h2 className="text-sm font-semibold text-gray-800">Project Contact Persons:</h2>
                            </div>
                            <div className="mb-2">
                                <PotentialTrackingcontacts data={data} setData={setData} type="ProjectContactPersons" />
                            </div>
                        </div>
                    }
                    {/* ---------Project Information--------- */}

                    {/* ----------Scope Information------- */}
                    {(
                        (popupOpenData?.popupHeader === 'SELF' && popupOpenData?.type === "NEW") ||
                        (popupOpenData?.popupHeader === 'SELF' && popupOpenData?.type === "VIEW") ||
                        (popupOpenData?.popupHeader === "OTHER PROTECTON" && popupOpenData?.type === "NEW") ||
                        (popupOpenData?.popupHeader === "OTHER PROTECTON" && popupOpenData?.type === "VIEW") ||
                        (popupOpenData?.popupHeader === "PROLINKS" && popupOpenData?.type === "VIEW")
                    ) &&
                        <div className="mb-2">
                            <div className="border-b-2 border-blue-400 pb-2 mb-2">
                                <h2 className="text-xl font-semibold text-gray-800">Scope Information</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Value of paints:</label>
                                    <div className="flex">
                                        <input
                                            type="number"
                                            placeholder="Enter scope of paints"
                                            readOnly={detailsAPIcall && data.ptm_work_status?.value === "WIP8" ? true : false}
                                            className="w-full border rounded form-input text-sm no-spinner text-right"
                                            value={data?.ptm_potential_val}
                                            onChange={(event) =>
                                                setData((pre: any) => ({ ...pre, ptm_potential_val: event.target.value }))
                                            }
                                            autoComplete="off"
                                        />
                                        <span className="px-3 border border-l-0 rounded-r bg-gray-100 text-sm flex items-center">
                                            Lakhs
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Scope of paints:</label>
                                    <div className="flex">
                                        <input
                                            type="number"
                                            readOnly={detailsAPIcall && data.ptm_work_status?.value === "WIP8" ? true : false}
                                            placeholder="Enter volume"
                                            className="w-full border rounded form-input text-sm no-spinner text-right"
                                            value={data?.ptm_potential_vol}
                                            onChange={(event) =>
                                                setData((pre: any) => ({ ...pre, ptm_potential_vol: event.target.value }))
                                            }
                                            autoComplete="off"
                                        />
                                        <span className="px-3 border border-l-0 rounded-r bg-gray-100 text-sm flex items-center">
                                            KL
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Scope for paints area:</label>
                                    <input readOnly={detailsAPIcall && data.ptm_work_status?.value === "WIP8" ? true : false} type="number" placeholder="Enter area" className="w-full border rounded form-input text-sm no-spinner text-right" value={data?.ptm_potential_area} onChange={(event: any) => setData((pre: any) => ({ ...pre, ptm_potential_area: event.target.value }))} autoComplete="off" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Scope for paints area uom:</label>
                                    <Select
                                        className="text-sm"
                                        isDisabled={detailsAPIcall && data.ptm_work_status?.value === "WIP8" ? true : false}
                                        isSearchable={true}
                                        options={ddlData?.potential_area_uom_List.map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                                        value={data.ptm_potential_area_uom}
                                        onChange={(event: any) =>
                                            setData((pre: any) => ({ ...pre, ptm_potential_area_uom: event }))
                                        }
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Service area (specifically mention where paint has to be applied):</label>
                                <Textarea
                                    className="text-sm"
                                    placeholder='Enter service area'
                                    value={data.ptm_area}
                                    onChange={(event: any) =>
                                        setData((pre: any) => ({ ...pre, ptm_area: event.target.value }))
                                    }
                                />
                            </div>
                        </div>
                    }
                    {/* ----------Scope Information------- */}

                    {/* ----------Business & Other Information------- */}
                    <div className="border-b-2 border-blue-400 pb-2 mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Business & Other Information</h2>
                    </div>
                    {popupOpenData?.popupHeader === 'PROLINKS' && popupOpenData?.type === "NEW" &&
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1">PAN:</label>
                                <input type="text" placeholder="Enter PAN" className="w-full border rounded form-input text-sm" name="pan_no" value={data?.pan_no}
                                    onChange={(event: any) => {
                                        const value = event.target.value;
                                        if (value.length <= 10) {
                                            setData((pre: any) => ({ ...pre, pan_no: value }));
                                        }
                                    }}
                                    autoComplete="off" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">GSTIN:</label>
                                <input type="text" placeholder="Enter GSTIN" className="w-full border rounded form-input text-sm" name="gstin_no" value={data?.gstin_no}
                                    onChange={(event: any) => {
                                        const value = event.target.value;
                                        if (value.length <= 15) {
                                            setData((pre: any) => ({ ...pre, gstin_no: value }));
                                        }
                                    }}
                                    autoComplete="off" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Lead Stage:</label>
                                <Select
                                    className="text-sm"
                                    isSearchable={true}
                                    options={ddlData.key_lead_stage_List.map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                                    value={data.selectedKey_lead_stage}
                                    onChange={(event: any) => {
                                        setData((pre: any) => ({ ...pre, selectedKey_lead_stage: event }))
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Painting Start Time:</label>
                                <Select
                                    className="text-sm"
                                    isSearchable={true}
                                    options={ddlData.key_painting_start_time_List.map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                                    value={data.selectedKey_painting_start_time}
                                    onChange={(event: any) => {
                                        setData((pre: any) => ({ ...pre, selectedKey_painting_start_time: event }))
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Interior Paintable Area(Lac)sq.ft.:</label>
                                <div className="relative flex items-center">
                                    <input
                                        type="number"
                                        placeholder="Enter paintable area"
                                        className="w-full border rounded form-input text-sm no-spinner pr-20 text-right"
                                        name="intPaintableArea"
                                        min="100000"
                                        max="999999"
                                        value={data?.intPaintableArea}
                                        onChange={(event: any) => setData((pre: any) => ({ ...pre, intPaintableArea: event.target.value }))}
                                        autoComplete="off"
                                    />
                                    <span className="absolute right-3 text-gray-500 text-sm pointer-events-none">Lac sq. ft</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Exterior Paintable Area(Lac)sq.ft.:</label>
                                <div className="relative flex items-center">
                                    <input
                                        type="number"
                                        placeholder="Enter paintable area"
                                        className="w-full border rounded form-input text-sm no-spinner pr-20 text-right"
                                        name="extPaintableArea"
                                        min="100000"
                                        max="999999"
                                        value={data?.extPaintableArea}
                                        onChange={(event: any) => setData((pre: any) => ({ ...pre, extPaintableArea: event.target.value }))}
                                        autoComplete="off"
                                    />
                                    <span className="absolute right-3 text-gray-500 text-sm pointer-events-none">Lac sq. ft</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Painting System:</label>
                                <input type="text" placeholder="Enter painting system" className="w-full border rounded form-input text-sm" name="painting_remarks" value={data?.painting_remarks}
                                    onChange={(event: any) => {
                                        const value = event.target.value;
                                        if (value.length <= 6) {
                                            setData((pre: any) => ({ ...pre, painting_remarks: value }));
                                        }
                                    }}
                                    autoComplete="off" />
                            </div>
                            {/* ?? Project Status ?? */}
                            <div>
                                <label className="block text-sm font-semibold mb-1">Project Status:</label>
                                <input type="text" placeholder="Enter project status" className="w-full border rounded form-input text-sm" name="leadStatus" value={data?.leadStatus} readOnly={true} autoComplete="off"
                                    onChange={(event: any) => {
                                        const value = event.target.value;
                                        if (value.length <= 6) {
                                            setData((pre: any) => ({ ...pre, leadStatus: value }));
                                        }
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Tentative Work Start Date:</label>
                                <Flatpickr
                                    value={data?.tentativeStartDate || ''}
                                    onChange={(dates) => setData((pre: any) => ({ ...pre, tentativeStartDate: dates[0] }))}
                                    options={{
                                        dateFormat: 'd/m/Y',
                                    }}
                                    className="tableInput"
                                    placeholder='Select date'
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Duration in Month:</label>
                                <input
                                    type="number"
                                    placeholder="Enter Duration"
                                    className="w-full border rounded form-input text-sm no-spinner text-right"
                                    name="durationInMonth"
                                    value={data?.durationInMonth}
                                    onChange={(event: any) => {
                                        const value = event.target.value;
                                        if (value.length <= 3) {
                                            setData((pre: any) => ({ ...pre, durationInMonth: value }));
                                        }
                                    }}
                                    autoComplete="off"
                                    // min="100000"
                                    max="999"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Paint Business Potential(in Lacs):</label>
                                <input
                                    type="number"
                                    placeholder="Enter Potential"
                                    className="w-full border rounded form-input text-sm no-spinner text-right"
                                    name="paint_business_potential"
                                    value={data?.paint_business_potential}
                                    onChange={(event: any) =>
                                        setData((pre: any) => ({ ...pre, paint_business_potential: event.target.value }))}
                                    autoComplete="off"
                                // min="100000"
                                // max="999"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Water Proofing Product Potential(in Lacs):</label>
                                <input
                                    type="number"
                                    placeholder="Enter Potential"
                                    className="w-full border rounded form-input text-sm no-spinner text-right"
                                    name="businessPotential_cc"
                                    value={data?.businessPotential_cc}
                                    onChange={(event: any) =>
                                        setData((pre: any) => ({ ...pre, businessPotential_cc: event.target.value }))}
                                    autoComplete="off"
                                // min="100000"
                                // max="999"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Berger Share of Business (in %):</label>
                                <input
                                    type="number"
                                    placeholder="Enter Potential"
                                    className="w-full border rounded form-input text-sm no-spinner text-right"
                                    name="shareOfBusiness"
                                    value={data?.shareOfBusiness}
                                    onChange={(event: any) =>
                                        setData((pre: any) => ({ ...pre, shareOfBusiness: event.target.value }))}
                                    autoComplete="off"
                                // min="100000"
                                // max="999"
                                />
                            </div>
                        </div>
                    }

                    {(
                        (popupOpenData?.popupHeader === 'SELF' && popupOpenData?.type === "NEW") ||
                        (popupOpenData?.popupHeader === 'SELF' && popupOpenData?.type === "VIEW") ||
                        (popupOpenData?.popupHeader === "OTHER PROTECTON" && popupOpenData?.type === "NEW") ||
                        (popupOpenData?.popupHeader === "OTHER PROTECTON" && popupOpenData?.type === "VIEW") ||
                        (popupOpenData?.popupHeader === "PROLINKS" && popupOpenData?.type === "VIEW")
                    ) &&
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Business Type:</label>
                                    <Select
                                        isDisabled={data.ptm_work_status?.value === "WIP8" ? true : false}
                                        className="text-sm"
                                        isSearchable={true}
                                        options={ddlData?.business_type_List.map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                                        value={data.ptm_business_type}
                                        onChange={(event: any) =>
                                            setData((pre: any) => ({ ...pre, ptm_business_type: event }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Product Category:</label>
                                    <Select
                                        className="text-sm"
                                        isDisabled={data.ptm_work_status?.value === "WIP8" ? true : false}
                                        isMulti
                                        isSearchable={true}
                                        closeMenuOnSelect={false}
                                        options={ddlData?.product_category_List.map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                                        value={data.ptm_product_category}
                                        onChange={(event: any) =>
                                            setData((pre: any) => ({ ...pre, ptm_product_category: event }))
                                        }
                                        onMenuOpen={() => {
                                            return false;
                                        }}
                                        menuPlacement="auto"
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                minHeight: '32px',
                                                height: '32px',
                                            }),
                                            valueContainer: (base) => ({
                                                ...base,
                                                overflow: 'auto',
                                                flexWrap: 'nowrap',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                padding: '0 8px',
                                                minHeight: '30px',
                                                '&::-webkit-scrollbar': {
                                                    width: '4px',
                                                    height: '4px',
                                                },
                                                '&::-webkit-scrollbar-track': {
                                                    background: 'transparent',
                                                },
                                                '&::-webkit-scrollbar-thumb': {
                                                    background: '#cbd5e0',
                                                    borderRadius: '2px',
                                                },
                                                '&::-webkit-scrollbar-thumb:hover': {
                                                    background: '#a0aec0',
                                                },
                                            }),
                                            multiValue: (base) => ({
                                                ...base,
                                                flexShrink: 0,
                                                margin: '1px',
                                                fontSize: '9px',
                                                padding: '1px 4px',
                                                height: '18px',
                                            }),
                                            multiValueLabel: (base) => ({
                                                ...base,
                                                whiteSpace: 'nowrap',
                                                fontSize: '9px',
                                                padding: '0 2px',
                                            }),
                                            multiValueRemove: (base) => ({
                                                ...base,
                                                padding: '0 2px',
                                                height: '18px',
                                            }),
                                            input: (base) => ({
                                                ...base,
                                                margin: '0',
                                                padding: '0',
                                            }),
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Industry Segment:</label>
                                    <Select
                                        isDisabled={data.ptm_work_status?.value === "WIP8" ? true : false}
                                        menuPlacement="auto"
                                        className="text-sm"
                                        isSearchable={true}
                                        options={ddlData?.industry_segment_List.map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                                        value={data.ptm_industry_segment}
                                        onChange={(event: any) =>
                                            setData((pre: any) => ({ ...pre, ptm_industry_segment: event }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Lead Share:<span style={{ color: 'red', marginLeft: '2px' }}>*</span></label>
                                    <Select
                                        menuPlacement="auto"
                                        className="text-sm"
                                        isSearchable={true}
                                        options={ddlData?.lead_share_List.map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                                        value={data.ptm_lead_share}
                                        onChange={(event: any) =>
                                            setData((pre: any) => ({ ...pre, ptm_lead_share: event }))
                                        }
                                        isDisabled={popupOpenData?.popupHeader === 'SELF' || data.ptm_work_status?.value === "WIP8"}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Region:<span style={{ color: 'red', marginLeft: '2px' }}>*</span></label>
                                    <Select
                                        isDisabled={data.ptm_work_status?.value === "WIP8" ? true : false}
                                        menuPlacement="auto"
                                        className="text-sm"
                                        isSearchable={true}
                                        options={ddlData?.protecton_regionList.map((d: any) => ({ value: d.depot_regn, label: d.regn_new }))}
                                        value={data.ptm_region}
                                        onChange={(event: any) => {
                                            // console.log(event.value)
                                            Getdepot(event.value);
                                            Getterr({ region: event.value, depot: '' });
                                            setData((pre: any) => ({ ...pre, ptm_region: event, ptm_depot_code: '', ptm_terr_code: '' }))
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Depot:{popupOpenData?.popupHeader === 'SELF' && <span style={{ color: 'red', marginLeft: '2px' }}>*</span>}</label>
                                    <Select
                                        isDisabled={detailsAPIcall && data.ptm_work_status?.value === "WIP8" ? true : false}
                                        menuPlacement="auto"
                                        className="text-sm"
                                        isSearchable={true}
                                        options={ddlData.depotList.map((d: any) => ({ value: d.depot_code, label: d.depot_name }))}
                                        value={data.ptm_depot_code}
                                        onChange={(event: any) => {
                                            Getterr({ region: data.ptm_region.value, depot: event.value });
                                            setData((pre: any) => ({ ...pre, ptm_depot_code: event, ptm_terr_code: '' }))
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Territory:{popupOpenData?.popupHeader === 'SELF' && <span style={{ color: 'red', marginLeft: '2px' }}>*</span>}</label>
                                    <Select
                                        isDisabled={detailsAPIcall && data.ptm_work_status?.value === "WIP8" ? true : false}
                                        menuPlacement="auto"
                                        className="text-sm"
                                        isSearchable={true}
                                        options={ddlData.terrList.map((d: any) => ({ value: d.terr_code, label: d.terr_name }))}
                                        value={data.ptm_terr_code}
                                        onChange={(event: any) => {
                                            GetCust({ depot_regn: data.ptm_region.value, depot_code: data.ptm_depot_code.value, terr_code: event.value, app_id: "15", user_appl_yn: "N" });
                                            setData((pre: any) => ({ ...pre, ptm_terr_code: event }))
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Work In Progress:<span style={{ color: 'red', marginLeft: '2px' }}>*</span></label>
                                    <Select
                                        isDisabled={detailsAPIcall && data.ptm_work_status?.value === "WIP8" ? true : false}
                                        menuPlacement="auto"
                                        className="text-sm"
                                        isSearchable={true}
                                        options={ddlData.workStatusList.map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                                        value={data.ptm_work_status}
                                        onChange={(event: any) => {
                                            setData((pre: any) => ({ ...pre, ptm_work_status: event }))
                                        }}
                                    />
                                </div>
                                {(data.ptm_work_status?.value === "WIP5" || data.ptm_work_status?.value === "WIP6" || data.ptm_work_status?.value === "WIP7" || data.ptm_work_status?.value === "WIP8" || data.ptm_work_status?.value === "WIP11") &&
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Expected Closing Date For Order:</label>
                                        {/* <label className="block text-sm font-semibold mb-1">Expected Closing Date For Order:<span style={{ color: 'red', marginLeft: '2px' }}>*</span></label> */}
                                        <Flatpickr value={data.ptm_expected_cldate} options={{ dateFormat: 'd/m/Y', position: 'auto left' }} className="w-full border rounded form-input text-sm" onChange={(date) => setData((pre: any) => ({ ...pre, ptm_expected_cldate: date }))} />
                                    </div>
                                }
                                {(data.ptm_work_status?.value === "WIP9" || data.ptm_work_status?.value === "WIP11") && <div>
                                    <label className="block text-sm font-semibold mb-1">Reason For On Hold/No Activity:</label>
                                    <input type="text" placeholder="Enter reason for on hold/no activity" className="w-full border rounded form-input text-sm" name="ptm_reason_for_onhold" value={data?.ptm_reason_for_onhold} onChange={(event: any) => setData((pre: any) => ({ ...pre, ptm_reason_for_onhold: event.target.value }))} autoComplete="off" />
                                </div>}
                                {data.ptm_work_status?.value === "WIP8" && <div>
                                    <label className="block text-sm font-semibold mb-1">Oracle Customer:</label>
                                    <Select
                                        isDisabled={detailsAPIcall && data.ptm_work_status?.value === "WIP8" ? true : false}
                                        menuPlacement="auto"
                                        className="text-sm"
                                        isSearchable={true}
                                        options={ddlData.applicableDealerList.map((d: any) => ({ value: d.dealer_code, label: d.dealer_name }))}
                                        value={data.ptm_dealer_code}
                                        onChange={(event: any) => {
                                            setData((pre: any) => ({ ...pre, ptm_dealer_code: event }))
                                        }}
                                    />
                                </div>}
                            </div>
                            <div className='mb-4'>
                                <label className="block text-sm font-semibold mb-2">Lead Information:</label>
                                <Textarea
                                    readOnly={detailsAPIcall && data.ptm_work_status?.value === "WIP8" ? true : false}
                                    className="text-sm"
                                    placeholder='Enter Lead Information'
                                    value={data.ptm_extra_info}
                                    onChange={(event: any) =>
                                        setData((pre: any) => ({ ...pre, ptm_extra_info: event.target.value }))
                                    }
                                />
                            </div>

                            {data.ptm_business_type && data.ptm_business_type.value === 'BT1' &&
                                <>
                                    <div className="mb-2">
                                        <div className="mb-1">
                                            <h2 className="text-sm font-semibold text-gray-800">Consultant/Architect:</h2>
                                        </div>
                                        <div className="mb-2">
                                            <PotentialTrackingcontacts data={data} setData={setData} type="Consultant/Architect" />
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <div className="mb-1">
                                            <h2 className="text-sm font-semibold text-gray-800">Engineering Contractor:</h2>
                                        </div>
                                        <div className="mb-2">
                                            <PotentialTrackingcontacts data={data} setData={setData} type="EngineeringContractor" />
                                        </div>
                                    </div>
                                </>
                            }

                            <div className="mb-1">
                                <h2 className="text-sm font-semibold text-gray-800">Add a Team Member:</h2>
                            </div>
                            <div className="mb-2">
                                <TeamMemberTable data={data} setData={setData} />
                            </div>
                        </>
                    }
                    {/* ----------Business & Other Information------- */}

                    {/* -------Site Contact Information------- */}
                    {popupOpenData?.popupHeader === 'PROLINKS' && popupOpenData?.type === "NEW" &&
                        <>
                            <div className="border-b-2 border-blue-400 pb-2 mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">Site Contact Information</h2>
                            </div>
                            <div className="max-h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50">
                                <SiteContactTable data={data} setData={setData} />
                            </div>
                        </>
                    }
                    {/* -------Site Contact Information------- */}


                    {/* -------Upload Documents------- */}
                    {(
                        (popupOpenData?.popupHeader === 'SELF' && popupOpenData?.type === "NEW") ||
                        (popupOpenData?.popupHeader === 'SELF' && popupOpenData?.type === "VIEW") ||
                        (popupOpenData?.popupHeader === "OTHER PROTECTON" && popupOpenData?.type === "NEW") ||
                        (popupOpenData?.popupHeader === "OTHER PROTECTON" && popupOpenData?.type === "VIEW") ||
                        (popupOpenData?.popupHeader === "PROLINKS" && popupOpenData?.type === "VIEW")
                    ) &&
                        <>
                            <div className="border-b-2 border-blue-400 pb-2 mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">Upload Documents</h2>
                            </div>
                            <div className="mb-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <Button
                                        size="md"
                                        color="blue"
                                        onClick={() => setIsImageUploadPopupOpen(true)}
                                        className="px-6 py-2 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                                    >
                                        Add Documents
                                    </Button>
                                </div>

                                {/* Document List */}
                                {data.potentialTrackingDocs && data.potentialTrackingDocs.length > 0 && (
                                    <div className="border rounded-lg p-4 bg-gray-50">
                                        <h3 className="text-sm font-semibold text-gray-800 mb-3">Uploaded Documents:</h3>
                                        <div className="space-y-2">
                                            {data.potentialTrackingDocs.map((doc: any, index: number) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between p-3 bg-white rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                                                    onClick={() => handleImagePreview(doc.ptd_doc_path, doc.ptd_doc_name)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border">
                                                            {/* Image or Icon Display */}
                                                            <img
                                                                src={doc.ptd_doc_path}
                                                                alt={doc.ptd_doc_name}
                                                                onError={(e) => {
                                                                    const target = e.target as HTMLImageElement;
                                                                    target.style.display = 'none';
                                                                    const errorDiv = document.createElement('div');
                                                                    errorDiv.className = 'text-center text-gray-500 p-8';
                                                                    errorDiv.innerHTML = `
                                                <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                                </svg>
                                                <p class="text-lg font-medium">Unable to display image</p>
                                                <p class="text-sm">This file type may not be supported for preview</p>
                                            `;
                                                                    target.parentNode?.appendChild(errorDiv);
                                                                }}
                                                            />
                                                            {doc.ptd_doc_path && doc.ptd_doc_path.startsWith('data:image') ? (
                                                                <img
                                                                    src={doc.ptd_doc_path}
                                                                    alt={doc.ptd_doc_name}
                                                                    className="w-full h-full object-cover rounded-lg"
                                                                    onError={(e) => {
                                                                        const target = e.target as HTMLImageElement;
                                                                        target.style.display = 'none';
                                                                        // Show fallback icon when image fails to load
                                                                        const fallbackIcon = document.createElement('div');
                                                                        fallbackIcon.className = 'w-full h-full flex items-center justify-center bg-blue-100 rounded-lg';
                                                                        fallbackIcon.innerHTML = `
                                                                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                            </svg>
                                                                        `;
                                                                        target.parentNode?.appendChild(fallbackIcon);
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center bg-blue-100 rounded-lg">
                                                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 01-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-800">{doc.ptd_doc_name}</p>
                                                            <p className="text-xs text-gray-500">Document Type: {doc.ptd_doc_type}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            size="xs"
                                                            color="red"
                                                            onClick={(e) => {
                                                                e.stopPropagation(); // Prevent triggering the div click
                                                                removeDocument(index);
                                                            }}
                                                            className="px-3 py-1 text-xs"
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    }
                    {/* -------Upload Documents------- */}
                </div>

                {/* SUBMIT button */}
                {data.ptm_work_status?.value !== "WIP8" &&
                    <div className="sticky bottom-0 z-10 bg-gray-50 px-6 py-4 rounded-b-lg border-t flex justify-end">
                        <Button
                            size="md"
                            color="green"
                            onClick={() => handleSubmit()}
                            className="px-8 py-2 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                        >
                            SUBMIT
                        </Button>
                    </div>
                }

                {/* ImageUploadPopup */}
                {isImageUploadPopupOpen &&
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-300 ease-out">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-t-xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold">Upload Documents</h3>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsImageUploadPopupOpen(false);
                                        setSelected_doc_type({});
                                    }}
                                    className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-white hover:bg-opacity-30 transition-all duration-200"
                                >
                                    <MdOutlineClose size={20} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">
                                {/* Document Type Selection */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Document Type</label>
                                    <Select
                                        className="text-sm"
                                        isSearchable={true}
                                        options={ddlData.doc_type_List.map((d: any) => ({ value: d.lov_code, label: d.lov_value }))}
                                        value={selected_doc_type}
                                        onChange={(event: any) => setSelected_doc_type(event)}
                                        placeholder="Select document type..."
                                        classNamePrefix="react-select"
                                        styles={{
                                            control: (provided) => ({
                                                ...provided,
                                                borderColor: '#e5e7eb',
                                                borderRadius: '0.5rem',
                                                boxShadow: 'none',
                                                '&:hover': {
                                                    borderColor: '#3b82f6'
                                                }
                                            })
                                        }}
                                    />
                                </div>

                                {/* File Upload Section */}
                                <div className="space-y-3">
                                    <label className="block text-sm font-medium text-gray-700">Select Files</label>
                                    <input
                                        type="file"
                                        id="document-upload"
                                        multiple
                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
                                        className="hidden"
                                        onChange={(e) => handleDocumentUpload(e)}
                                    />
                                    <Button
                                        size="md"
                                        color="blue"
                                        onClick={() => document.getElementById('document-upload')?.click()}
                                        className="w-full py-3 font-semibold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        Choose Files
                                    </Button>

                                    {/* Supported Formats Info */}
                                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                        <p className="text-xs text-gray-600 text-center">
                                            <span className="font-medium">Supported formats:</span> PDF, DOC, DOCX, JPG, PNG, XLS, XLSX
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {/* Image Preview Modal */}
                {imagePreviewData.isOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-2xl max-w-4xl max-h-[90vh] w-full mx-auto transform transition-all duration-300 ease-out overflow-hidden">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold">Image Preview</h3>
                                    <span className="text-sm text-blue-100">({imagePreviewData.fileName})</span>
                                </div>
                                <button
                                    onClick={() => setImagePreviewData({ isOpen: false, imagePath: '', fileName: '' })}
                                    className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-white hover:bg-opacity-30 transition-all duration-200"
                                >
                                    <MdOutlineClose size={20} />
                                </button>
                            </div>

                            {/* Image Content */}
                            <div className="p-6 flex items-center justify-center bg-gray-50 min-h-[400px]">
                                <div className="max-w-full max-h-full overflow-auto">
                                    <img
                                        src={imagePreviewData.imagePath}
                                        alt={imagePreviewData.fileName}
                                        className="max-w-full h-auto object-contain rounded-lg shadow-lg"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            // Show error message
                                            const errorDiv = document.createElement('div');
                                            errorDiv.className = 'text-center text-gray-500 p-8';
                                            errorDiv.innerHTML = `
                                                <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                                </svg>
                                                <p class="text-lg font-medium">Unable to display image</p>
                                                <p class="text-sm">This file type may not be supported for preview</p>
                                            `;
                                            target.parentNode?.appendChild(errorDiv);
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                                <Button
                                    size="md"
                                    color="blue"
                                    onClick={() => setImagePreviewData({ isOpen: false, imagePath: '', fileName: '' })}
                                    className="px-6 py-2 font-medium bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 rounded-lg"
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    )
}
export default CustomPopupComponent