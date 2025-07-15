import { UseAuthStore } from '../../../services/store/AuthStore';
import React, { useEffect, useState } from 'react'
import * as TlvApi from '../../../services/api/protectonEpca/TLVRevisionRSMApproval';
import * as Epca from '../../../services/api/protectonEpca/EpcaList';
import * as EpcaDetails from '../../../services/api/protectonEpca/EpcaDetails';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from 'react-select';
import * as EPCADepotApproval from '../../../services/api/protectonEpca/EPCADepotApproval';
import { commonErrorToast, commonSuccessToast, commonWarningToast } from '../../../services/functions/commonToast';
import { FaDownload } from "react-icons/fa";
import AnimateHeight from 'react-animate-height';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import { IoMdSave } from 'react-icons/io';
import { IoReturnUpBack } from "react-icons/io5";
import { Button } from '@mantine/core';
import { commonAlert } from '../../../services/functions/commonAlert';
import moment from 'moment';
import * as Tlv from '../../../services/api/protectonEpca/TLVRevisionRSMApproval';
import * as global from '../../../services/api/commons/global';
import { useNavigate } from 'react-router-dom';

const TLVRevisionRequestDetails = () => {
    const user = UseAuthStore((state: any) => state.userDetails);
    const navigate = useNavigate();

    const [accordianOpen, setAccordianOpen] = useState<string>('');
    const [detailsData, setDetailsData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [pageType, setPageType] = useState('');
    const [depot, setDepot] = useState<any>([]);
    const [applTerr, setApplTerr] = useState<any>([]);
    const [dealer, setDealer] = useState<any>([]);
    const [billTo, setBillTo] = useState<any>([]);
    const [customerAndPaymentType, setCustomerAndPaymentType] = useState<any>([]);
    const [tlvBase64JPEG, setTlvBase64JPEG] = useState<any>('');
    const [aadharBase64JPEG, setAadharBase64JPEG] = useState<any>('');
    const [panBase64JPEG, setPanBase64JPEG] = useState<any>('');
    const [lcBase64JPEG, setLcBase64JPEG] = useState<any>('');
    const [chequeBase64JPEG, setChequeBase64JPEG] = useState<any>('');
    const [lcbgBase64JPEG, setlcbgBase64JPEG] = useState<any>('');
    const [tlvDetails, setTLVDetails] = useState<any>({
        formSubmitable: 'Y',
        status: detailsData?.table[0].status || 'PENDING_DEPOT',
        auto_id: 0,
        td_submission_type: "TLV",
        depot_code: "",
        depot_name: "",
        terr_code: "",
        terr_name: "",
        dealer_code: "",
        dealer_name: "",
        bill_to: detailsData?.table[0].billto_code || '',
        bill_to_name: "",
        aadharNo: detailsData?.table[0].aadhar_no || '',
        fullName: detailsData?.table[0].full_name || '',
        panNo: detailsData?.table[0].pan_no || '',
        holderName: '',
        frm_date: detailsData?.table[0].lcbg_opening_date || '',
        to_date: detailsData?.table[0].lcbg_expiry_date || '',
        chequeNo: detailsData?.table[0].td_blank_chq_no || '',
        ifsc: detailsData?.table[0].td_ifsc_code || '',
        bankName: '',
        branch: '',
        message: '',
        success: null,
        proposedCreditDays: detailsData?.table[0].proposed_cr_days || '',
        requestedTLV: detailsData?.table[0].proposed_tlv || '',
        billedVol: detailsData?.table[0].order_vol || '',
        billedVal: detailsData?.table[0].order_val || '',
        increaseReason: detailsData?.table[0].increase_reason || '',
        customerName: detailsData?.table[0].customer_name || '',
        collectionAmount1: detailsData?.table[0].td_os_collection_amount1 || '',
        collectionAmount2: detailsData?.table[0].td_os_collection_amount2 || '',
        collectionAmount3: detailsData?.table[0].td_os_collection_amount3 || '',
        collectionAmount4: detailsData?.table[0].td_os_collection_amount4 || '',
        collectionAmount5: detailsData?.table[0].td_os_collection_amount5 || '',
        collectionAmount6: detailsData?.table[0].td_os_collection_amount6 || '',
        collectionAmount7: detailsData?.table[0].td_os_collection_amount7 || '',
        collection1_date: detailsData?.table[0].os_collection_date1 || '',
        collection2_date: detailsData?.table[0].os_collection_date2 || '',
        collection3_date: detailsData?.table[0].os_collection_date3 || '',
        collection4_date: detailsData?.table[0].os_collection_date4 || '',
        collection5_date: detailsData?.table[0].os_collection_date5 || '',
        collection6_date: detailsData?.table[0].os_collection_date6 || '',
        collection7_date: detailsData?.table[0].os_collection_date7 || '',
        // -------
        lcBg: 'N',
        lcbgAmount: null,
        blank_chq: 'N',
    });

    const handleFormSubmit = () => {
        const entity = [{
            appName: 'PROTECTON',
            userId: user.user_id,
            autoId: tlvDetails.auto_id,
            depotCode: tlvDetails.depot_code,
            dealerCode: tlvDetails.dealer_code,
            fullName: tlvDetails.fullName,
            aadharNo: tlvDetails.aadharNo,
            aadharDoc: aadharBase64JPEG,
            panNo: tlvDetails.panNo,
            panDoc: panBase64JPEG,
            increaseReason: tlvDetails.increaseReason,
            customerName: tlvDetails.customerName,
            lcbgApplYn: tlvDetails.lcBg,
            lcbgDoc: lcbgBase64JPEG,
            chequeNo: tlvDetails.chequeNo,
            ifscCode: tlvDetails.ifsc,
            bankName: tlvDetails.bankName,
            branchName: tlvDetails.branch,
            chequeDoc: chequeBase64JPEG,
            chequeStatus: 'NA', // ??
            status: tlvDetails.status,
            remarks: '',
            // submissionType: 'Habuji',
            submissionType: tlvDetails.td_submission_type,
            fileDoc: tlvBase64JPEG,
            billtoCode: tlvDetails.bill_to,
            proposedCrDays: tlvDetails.proposedCreditDays,
            proposedTlv: tlvDetails.requestedTLV,
            orderVol: tlvDetails.billedVol,
            orderVal: tlvDetails.billedVal,
            lcbgAmount: tlvDetails.lcbgAmount,
            collectionAmount1: tlvDetails.collectionAmount1 ? Number(tlvDetails.collectionAmount1) : null,
            collectionAmount2: tlvDetails.collectionAmount2 ? Number(tlvDetails.collectionAmount2) : null,
            collectionAmount3: tlvDetails.collectionAmount3 ? Number(tlvDetails.collectionAmount3) : null,
            collectionAmount4: tlvDetails.collectionAmount4 ? Number(tlvDetails.collectionAmount4) : null,
            collectionAmount5: tlvDetails.collectionAmount5 ? Number(tlvDetails.collectionAmount5) : null,
            collectionAmount6: tlvDetails.collectionAmount6 ? Number(tlvDetails.collectionAmount6) : null,
            collectionAmount7: tlvDetails.collectionAmount7 ? Number(tlvDetails.collectionAmount7) : null,
            lcbgOpeningDate: moment(convertToDate(tlvDetails.frm_date)).format('YYYY-MM-DD') == 'Invalid date' ? null : moment(convertToDate(tlvDetails.frm_date)).format('YYYY-MM-DD'),
            lcbgExpiryDate: moment(convertToDate(tlvDetails.to_date)).format('YYYY-MM-DD') == 'Invalid date' ? null : moment(convertToDate(tlvDetails.to_date)).format('YYYY-MM-DD'),
            osCollectionDate1: moment(tlvDetails.collection1_date).format('YYYY-MM-DD') == 'Invalid date' ? null : moment(tlvDetails.collection1_date).format('YYYY-MM-DD'),
            osCollectionDate2: moment(tlvDetails.collection2_date).format('YYYY-MM-DD') == 'Invalid date' ? null : moment(tlvDetails.collection2_date).format('YYYY-MM-DD'),
            osCollectionDate3: moment(tlvDetails.collection3_date).format('YYYY-MM-DD') == 'Invalid date' ? null : moment(tlvDetails.collection3_date).format('YYYY-MM-DD'),
            osCollectionDate4: moment(tlvDetails.collection4_date).format('YYYY-MM-DD') == 'Invalid date' ? null : moment(tlvDetails.collection4_date).format('YYYY-MM-DD'),
            osCollectionDate5: moment(tlvDetails.collection5_date).format('YYYY-MM-DD') == 'Invalid date' ? null : moment(tlvDetails.collection5_date).format('YYYY-MM-DD'),
            osCollectionDate6: moment(tlvDetails.collection6_date).format('YYYY-MM-DD') == 'Invalid date' ? null : moment(tlvDetails.collection6_date).format('YYYY-MM-DD'),
            osCollectionDate7: moment(tlvDetails.collection7_date).format('YYYY-MM-DD') == 'Invalid date' ? null : moment(tlvDetails.collection7_date).format('YYYY-MM-DD'),
            outputCode: 0,
            outputMsg: '',
            file_doc: tlvBase64JPEG
        }];

        if (!entity[0].depotCode) {
            commonWarningToast(`Depot is required!`);
            return
        } else if (!entity[0].dealerCode) {
            commonWarningToast(`Customer is required!`);
            return
        } else if (entity[0].submissionType != 'TLV' && !entity[0].billtoCode) {
            commonWarningToast(`Bill to code is required!`);
            return
        }
        else if (!entity[0].aadharNo) { commonWarningToast(`Aadhar No is required!`); return }
        else if (!entity[0].fullName) { commonWarningToast(`Aadhar Name is required!`); return }
        else if (!entity[0].aadharDoc) { commonWarningToast(`Aadhar Document is required!`); return }
        else if (!entity[0].panNo) { commonWarningToast(`Aadhar Document is required!`); return }
        else if (!entity[0].panDoc) { commonWarningToast(`PAN Document is required!`); return }

        // else if (entity[0].lcbgApplYn === 'Y') {
        else if (entity[0].lcbgApplYn === 'Y' && !entity[0].lcbgOpeningDate) { commonWarningToast(`Opening date is required!`); return }
        else if (entity[0].lcbgApplYn === 'Y' && !entity[0].lcbgExpiryDate) { commonWarningToast(`Expiry date is required!`); return }
        else if (entity[0].lcbgApplYn === 'Y' && !entity[0].lcbgAmount) { commonWarningToast(`LC/BG amount is required!`); return }
        else if (entity[0].lcbgApplYn === 'Y' && entity[0].lcbgAmount <= 0) { commonWarningToast(`LC/BG amount should be greater than 0`); return }
        else if (entity[0].lcbgApplYn === 'Y' && !entity[0].lcbgDoc) { commonWarningToast(`LC/BG document is required!`); return }
        // }

        // else if (entity[0].submissionType == 'TLV') {
        else if (entity[0].submissionType == 'TLV' && !entity[0].proposedTlv) { commonWarningToast(`Requested TLV is required!`); return }
        else if (entity[0].submissionType == 'TLV' && entity[0].proposedTlv <= 0) { commonWarningToast(`Requested TLV should be greater than 0`); return }
        // }
        // else if (entity[0].submissionType == 'CREDIT_DAYS' || entity[0].submissionType == 'TLV_AND_CREDIT_DAYS') {
        else if ((entity[0].submissionType == 'CREDIT_DAYS' || entity[0].submissionType == 'TLV_AND_CREDIT_DAYS') && !entity[0].proposedCrDays) { commonWarningToast(`Proposed credit day is required!`); return }
        else if ((entity[0].submissionType == 'CREDIT_DAYS' || entity[0].submissionType == 'TLV_AND_CREDIT_DAYS') && entity[0].proposedCrDays <= 0) { commonWarningToast(`Proposed credit days should be greater than 0`); return }
        // }
        // else console.log("first");
        // console.log(entity[0].lcbgApplYn)
        else if (!entity[0].orderVol) { commonWarningToast(`Order to be Billed Volume is required!`); return }
        else if (entity[0].orderVol <= 0) { commonWarningToast(`Order to be billed volume should be 0`); return }

        else if (!entity[0].orderVal) { commonWarningToast(`Order to be Billed Value is required!`); return }
        else if (entity[0].orderVal <= 0) { commonWarningToast(`Order to be billed value 0`); return }

        else if (!entity[0].increaseReason) { commonWarningToast(`Reason for Increase is required!`); return }
        else if (!entity[0].customerName) { commonWarningToast(`End Customer Name is required!`); return }
        // else console.log(entity)
        else showSubmitAlert(entity)
    };

    async function showSubmitAlert(data: any) {
        commonAlert('Are you want to insert the TLV Revision Request Info?', '', 'warning').then(async (result: any) => {
            if (result.value) {
                const response: any = await Tlv.TlvDetailsSubmit(data[0]);
                if (response) {
                    if (response.statusCode == 200) {
                        commonSuccessToast(`TLV Revision Request ` + response.message);
                        navigate('/Protecton/TLV/TLVRevisionRequestList/');
                    } else commonErrorToast(response.message);
                } else commonErrorToast('Error occured while submitting TLV Revision!');
            }
        });
    }

    const GetTLVDetailsData = async ({ auto_id, depot_code, dlr_bill_to, dlr_dealer_code, td_submission_type }: any) => {
        const data: any = {
            auto_id: auto_id,
            depotCode: depot_code,
            billToCode: dlr_bill_to,
            dealerCode: dlr_dealer_code,
            sblCode: '4',
            submissionType: td_submission_type,
            appName: 'PROTECTON',
        };
        // console.log(data)
        try {
            const response: any = await TlvApi.GetTlvDetails(data);
            // console.log(response)
            setDetailsData(response?.data || null);
            setTLVDetails((pre: any) => ({ ...pre, lcBg: response.data.table2[0]?.lcbg_mandatory_yn, blank_chq: response.data.table2[0]?.blank_chq_mandatory_yn }))
        } catch (error) {
            console.log(error)
        }
    };

    const GetApplicableDepot = async () => {
        setLoading(true);
        const data: any = {
            user_id: user.user_id,
            region: '',
            app_id: '15',
        };
        try {
            const response: any = await Epca.GetApplicableDepotList(data);
            setDepot(response.data || []);
        } catch (error) {
            return;
        }
        setLoading(false);
    };

    const GetApplicableTerritory = async ({ depot_code }: any) => {
        setLoading(true);
        const data: any = {
            user_id: user.user_id,
            depot_code: depot_code,
            app_id: '15',
        };
        try {
            const response: any = await Epca.GetApplicableTerrList(data);
            setApplTerr(response.data || [])
        } catch (error) {
            return;
        }
        setLoading(false);
    };

    const GetDealerList = async ({ depot_code, terr_code }: any) => {
        setLoading(true);
        const data: any = {
            depot_code: depot_code,
            terr_code: terr_code,
            sbl_code: '4',
        };
        try {
            const response: any = await EpcaDetails.GetPcaDealersList(data);
            setDealer(response.data || [])
        } catch (error) {
            return;
        }
        setLoading(false);
    };

    const GetApplicableBillto = async ({ depot_code, terr_code, dealer_code }: any) => {
        setLoading(true);
        const data: any = {
            depot_code: depot_code,
            terr_code: terr_code,
            dealer_code: dealer_code,
        };
        try {
            const response: any = await EpcaDetails.GetPcaBillToList(data);
            setBillTo(response.data || [])
        } catch (error) {
            return;
        }
        setLoading(false);
    };

    const GetCustomerAndPaymentType = async ({ DepotCode, BillToCode }: any) => {
        setLoading(true);
        const data: any = {
            DepotCode: DepotCode,
            BillToCode: BillToCode,
        };
        try {
            const response: any = await EPCADepotApproval.GetBillToDetails(data);
            setCustomerAndPaymentType(response.data.table || [])
        } catch (error) {
            return;
        }
        setLoading(false);
    };

    const convertToBase64 = (value: Blob, typeName: string) => {
        if (value) {
            if (value.size > 300000) {
                commonErrorToast(`${typeName} file too large!`);
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(value);
            reader.onload = () => {
                const base64String: any = reader.result;
                const replacedString = base64String.replace(/(png)|(jpg)/, 'jpeg');
                if (typeName == 'TLV DOC') setTlvBase64JPEG(replacedString);
                if (typeName == 'AADHAR DOC') setAadharBase64JPEG(replacedString);
                if (typeName == 'PAN DOC') setPanBase64JPEG(replacedString);
                if (typeName == 'LC/BG DOC') setLcBase64JPEG(replacedString);
                if (typeName == 'CHEQUE DOC') setChequeBase64JPEG(replacedString);
                if (typeName == 'LCBG DOC') setlcbgBase64JPEG(replacedString);
            };
            reader.onerror = (error) => {
                commonErrorToast(`Error: ${error}`);
            };
        }
    };

    const imageChange = (event: any, flag: 'TLV DOC' | 'AADHAR DOC' | 'PAN DOC' | 'LC/BG DOC' | 'CHEQUE DOC' | 'LCBG DOC') => {
        convertToBase64(event.target.files[0], flag);
        // if (flag == 'TLV DOC' && event) convertToBase64(event.target.files[0], 'TLV DOC');
        // if (flag == 'AADHAR DOC') convertToBase64(event.target.files[0], 'AADHAR DOC');
        // if (flag == 'PAN DOC') convertToBase64(event.target.files[0], 'PAN DOC');
        // if (flag == 'LC/BG DOC') convertToBase64(event.target.files[0], 'LC/BG DOC');
        // if (flag == 'CHEQUE DOC') convertToBase64(event.target.files[0], 'CHEQUE DOC');
        // if (flag == 'LCBG DOC') convertToBase64(event.target.files[0], 'LCBG DOC');
    };

    const handleDownload = (event: React.MouseEvent<HTMLButtonElement>, fileUrl: string) => {
        event.preventDefault();
        const link = document.createElement('a');
        link.href = fileUrl;
        link.target = '_blank';
        link.click();
    };

    const convertToDate = (dateStr: any) => {
        if (typeof dateStr === 'string') {
            const [day, month, year] = dateStr.split('/');
            return new Date(`${year}-${month}-${day}`);
        }
        return dateStr;
    };

    const handleIFSCValidate = async () => {
        // console.log("API call")
        setLoading(true);
        const data = {
            common_request: tlvDetails.ifsc,
        };
        try {
            const response: any = await global.ValidateIFSC(data);
            if (response.statusCode === 200 && response.data != null) {
                const { bank, branch, message } = response.data;
                setTLVDetails((pre: any) => ({ ...pre, bankName: bank, branch: branch, message: message || 'Valid IFSC.', success: true }))
            } else {
                setTLVDetails((pre: any) => ({ ...pre, message: response.message || 'Invalid IFSC.', success: false }))
            }
        } catch (error) {
            setTLVDetails((pre: any) => ({ ...pre, message: 'An error occurred during validation!', success: false }))
        }
        setLoading(false);
    };

    const handleBackButton = () => {
        commonAlert('Are you sure?', '', 'warning').then(async (result: any) => {
            if (result.value) navigate('/Protecton/TLV/TLVRevisionRequestList/');
        });
    };

    useEffect(() => {
        GetApplicableDepot();
        const entryType: any = (sessionStorage.getItem('epcaTLVDtlEntryType'));
        setPageType(JSON.parse(entryType))
        if (JSON.parse(entryType) === 'View') {
            const value: any = (sessionStorage.getItem('epcaTLVDtlList'));
            const parsedValue = JSON.parse(value);
            if (parsedValue) {
                // console.log(parsedValue)
                GetTLVDetailsData({
                    auto_id: parsedValue.auto_id,
                    depot_code: parsedValue.depot_code,
                    dlr_bill_to: parsedValue.dlr_bill_to,
                    dlr_dealer_code: parsedValue.dlr_dealer_code,
                    td_submission_type: parsedValue.td_submission_type
                });
                GetApplicableTerritory({ depot_code: parsedValue.depot_code })
                GetDealerList({ depot_code: parsedValue.depot_code, terr_code: parsedValue.dlr_terr_code })
                GetApplicableBillto({ depot_code: parsedValue.depot_code, terr_code: parsedValue.dlr_terr_code, dealer_code: parsedValue.dlr_dealer_code })
                GetCustomerAndPaymentType({ DepotCode: parsedValue.depot_code, BillToCode: parsedValue.dlr_bill_to });
                setTLVDetails((pre: any) => ({
                    ...pre,
                    auto_id: parsedValue.auto_id,
                    td_submission_type: parsedValue.td_submission_type,
                    depot_code: parsedValue.depot_code,
                    depot_name: parsedValue.depot_name,
                    dealer_code: parsedValue.dlr_dealer_code,
                    dealer_name: parsedValue.dlr_dealer_name,
                    status: parsedValue.status_code,
                    formSubmitable: parsedValue.editable_yn,
                }))
            }
        }
    }, [])

    useEffect(() => {
        const entryType: any = (sessionStorage.getItem('epcaTLVDtlEntryType'));
        if (JSON.parse(entryType) === 'View') {
            const value: any = (sessionStorage.getItem('epcaTLVDtlList'));
            const parsedValue = JSON.parse(value);
            parsedValue && setTLVDetails((pre: any) => ({
                ...pre,
                terr_code: parsedValue.dlr_terr_code,
                terr_name: applTerr.find((terr: { terr_code: any; }) => terr.terr_code === parsedValue.dlr_terr_code)?.terr_name,
                bill_to: parsedValue.dlr_bill_to,
                bill_to_name: billTo.find((terr: { bill_to: any; }) => terr.bill_to === parsedValue.dlr_bill_to)?.bill_to_name,
            }))
        }
    }, [applTerr, billTo])


    useEffect(() => {
        console.log(tlvDetails)
    }, [tlvDetails])

    return (
        <>
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-2">
                <h5 className="text-lg font-semibold dark:text-white-light">TLV Details</h5>
            </div>

            <div className="panel mb-3">
                <form className="space-y-2">
                    <div className="grid grid-cols-1 gap-2">
                        <div style={{ marginLeft: 5 }}>
                            <RadioGroup
                                className="custRadioGroup"
                                row
                                value={tlvDetails.td_submission_type}
                                onChange={(event) => setTLVDetails((pre: any) => ({ ...pre, td_submission_type: event.target.value }))}
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="TLV" control={<Radio />} label="TLV Only" disabled={pageType === 'View'} />
                                <FormControlLabel value="CREDIT_DAYS" control={<Radio />} label="Credit Days Only" disabled={pageType === 'View'} />
                                <FormControlLabel value="TLV_AND_CREDIT_DAYS" control={<Radio />} label="Both" disabled={pageType === 'View'} />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
                        <div>
                            <label className="formLabelTx">Depot:</label>
                            <Select
                                isSearchable={true}
                                value={{ value: tlvDetails?.depot_code, label: tlvDetails?.depot_name }}
                                options={depot.map((d: any) => ({ value: d.depot_code, label: d.depot_name }))}
                                isDisabled={pageType === 'View'}
                                onChange={(event) => {
                                    GetApplicableTerritory({ depot_code: event?.value });
                                    setTLVDetails((pre: any) => ({
                                        ...pre,
                                        depot_code: event?.value,
                                        depot_name: event?.label,
                                        terr_code: '',
                                        terr_name: '',
                                        dealer_code: "",
                                        dealer_name: "",
                                        bill_to: null,
                                        bill_to_name: "",
                                    }))
                                }}
                            />
                            {/* {errMsg.depot && <div className="mt-1 text-danger">{errMsg.depot}</div>} */}
                        </div>

                        <div>
                            <label className="formLabelTx">Territory:</label>
                            <Select
                                isSearchable={true}
                                value={{ value: tlvDetails?.terr_code, label: tlvDetails?.terr_name }}
                                options={applTerr.map((d: any) => ({ value: d.terr_code, label: d.terr_name }))}
                                isDisabled={pageType === 'View'}
                                onChange={(event) => {
                                    GetDealerList({ depot_code: tlvDetails?.depot_code, terr_code: event?.value })
                                    setTLVDetails((pre: any) => ({ ...pre, terr_code: event?.value, terr_name: event?.label, dealer_code: '', dealer_name: '', bill_to: null, bill_to_name: "", }))
                                }}
                            />
                            {/* {errMsg.terr && <div className="mt-1 text-danger">{errMsg.terr}</div>} */}
                        </div>

                        <div>
                            <label className="formLabelTx">Customer:</label>
                            <Select
                                isSearchable={true}
                                value={{ value: tlvDetails?.dealer_code, label: tlvDetails?.dealer_name }}
                                options={dealer.map((d: any) => ({ value: d.dealer_code, label: d.dealer_name }))}
                                isDisabled={pageType === 'View'}
                                onChange={(event) => {
                                    GetApplicableBillto({ depot_code: tlvDetails?.depot_code, terr_code: tlvDetails?.terr_code, dealer_code: event?.value })
                                    setTLVDetails((pre: any) => ({ ...pre, dealer_code: event?.value, dealer_name: event?.label, bill_to: null, bill_to_name: "" }))
                                }}
                            />
                            {/* {errMsg.dealer && <div className="mt-1 text-danger">{errMsg.dealer}</div>} */}
                        </div>

                        {(tlvDetails.td_submission_type === 'CREDIT_DAYS' || tlvDetails.td_submission_type === 'TLV_AND_CREDIT_DAYS') && (
                            <div>
                                <label className="formLabelTx">Bill To:</label>
                                <Select
                                    isSearchable={true}
                                    value={{ value: tlvDetails?.bill_to, label: tlvDetails?.bill_to_name }}
                                    options={billTo.filter((b: { pd_appl_yn: any; }) => b.pd_appl_yn === tlvDetails?.pdAppl).map((d: any) => ({ value: d.bill_to, label: d.bill_to_name }))}
                                    isDisabled={pageType === 'View'}
                                    onChange={(event) => {
                                        setTLVDetails((pre: any) => ({ ...pre, bill_to: event?.value, bill_to_name: event?.label }))
                                    }}
                                />
                            </div>
                        )}

                        {(tlvDetails.td_submission_type === 'CREDIT_DAYS' || tlvDetails.td_submission_type === 'TLV_AND_CREDIT_DAYS') && (
                            <div>
                                {customerAndPaymentType.length > 0 && customerAndPaymentType.map((item: { dlr_cust_type: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; dlr_payment_term: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
                                    <div key={index}>
                                        <span className="mt-2 block">Customer Type: {item.dlr_cust_type}</span>
                                        <span className="mt-1 block">Payment Type: {item.dlr_payment_term}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div>
                            <label className="formLabelTx">Upload relevant document as proof of increase in TLV:</label>
                            <input
                                // className="fileTypeInput form-input"
                                type="file"
                                onChange={() => {
                                    imageChange(event, 'TLV DOC');
                                }}
                                accept="image/*"
                            />
                        </div>

                        {detailsData?.table && detailsData?.table[0]?.file_doc && (
                            <div className='mt-6'>
                                <button onClick={(event) => handleDownload(event, detailsData?.table[0]?.file_doc)}>
                                    <FaDownload />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* GO button */}
                    <div className="m-5 flex items-center justify-center">
                        <Button
                            className="btn btn-info w-40 rounded-full"
                            variant="filled"
                            onClick={() => {
                                GetTLVDetailsData({
                                    auto_id: tlvDetails.auto_id,
                                    depot_code: tlvDetails.depot_code,
                                    dlr_bill_to: tlvDetails.bill_to,
                                    dlr_dealer_code: tlvDetails.dealer_code,
                                    td_submission_type: tlvDetails.td_submission_type
                                });
                            }}
                        >
                            <span style={{ color: 'rgba(255,255,255,0.6)' }}>Go</span>
                        </Button>
                    </div>

                    {/* accordians */}
                    {detailsData &&
                        <div className="space-y-2 font-semibold">
                            {/* Aadhar Info accordian */}
                            <div className="rounded border border-[#d3d3d3] dar k:border-[#1b2e4b]">
                                <button type="button" className={'custAccoHead flex w-full items-center px-3 py-2 text-white-dark dark:bg-[#1b2e4b] '} onClick={() => setAccordianOpen(accordianOpen === '1' ? '' : '1')}>
                                    Aadhar Info (Optional)
                                    <div className={`${'ltr:ml-auto rtl:mr-auto'}${accordianOpen === '1' ? ' rotate-180' : ''}`}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 9L12 15L5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </div>
                                </button>
                                <div>
                                    <AnimateHeight duration={300} height={accordianOpen === '1' ? 'auto' : 0}>
                                        <div className="bg-white rounded-lg px-4 py-1 shadow-md mb-2">
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
                                                <div>
                                                    <label className="block text-sm font-semibold mb-1">Aadhar No.:</label>
                                                    <input
                                                        type="text"
                                                        autoComplete="off"
                                                        placeholder="Aadhar No."
                                                        className="w-full border rounded form-input text-sm"
                                                        name="aadharNo"
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(/[^0-9]/g, '');
                                                            if (value.length <= 12) {
                                                                setTLVDetails((pre: any) => ({ ...pre, aadharNo: value }))
                                                            }
                                                        }}
                                                        value={tlvDetails.aadharNo}
                                                    />
                                                    {/* {error && <div className="error-message">{error}</div>} */}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold mb-1">Name as in Addhar:</label>
                                                    <input
                                                        type="text"
                                                        autoComplete="off"
                                                        placeholder="Name as in Addhar"
                                                        className="w-full border rounded form-input text-sm"
                                                        name="fullName"
                                                        value={tlvDetails.fullName}
                                                        onChange={(e) => setTLVDetails((pre: any) => ({ ...pre, fullName: e.target.value }))}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold mb-1">Upload Aadhar:</label>
                                                    <input
                                                        // className="w-full border rounded form-input text-sm"
                                                        type="file"
                                                        onChange={() => {
                                                            imageChange(event, 'AADHAR DOC');
                                                        }}
                                                        accept="image/*"
                                                    />
                                                </div>
                                                {detailsData?.table && detailsData?.table[0]?.aadhar_doc && (
                                                    <div className='mt-6'>
                                                        <button onClick={(event) => handleDownload(event, detailsData?.table && detailsData?.table[0]?.aadhar_doc)}>
                                                            <FaDownload />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>

                            {/* PAN Info accordian */}
                            <div className="rounded border border-[#d3d3d3] dark:border-[#1b2e4b]">
                                <button type="button" className={`custAccoHead flex w-full items-center px-3 py-2 text-white-dark dark:bg-[#1b2e4b] `} onClick={() => setAccordianOpen(accordianOpen === '2' ? '' : '2')}>
                                    PAN Info (Optional)
                                    <div className={`${'ltr:ml-auto rtl:mr-auto'}${accordianOpen === '2' ? ' rotate-180' : ''}`}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 9L12 15L5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </div>
                                </button>
                                <div>
                                    <AnimateHeight duration={300} height={accordianOpen === '2' ? 'auto' : 0}>
                                        <div className="bg-white rounded-lg px-4 py-1 shadow-md mb-2">
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
                                                <div>
                                                    <label className="block text-sm font-semibold mb-1">PAN:</label>
                                                    <input
                                                        autoComplete="off"
                                                        type="text"
                                                        placeholder="PAN"
                                                        className="w-full border rounded form-input text-sm"
                                                        name="panNo"
                                                        value={tlvDetails.panNo}
                                                        onChange={(e) => setTLVDetails((pre: any) => ({ ...pre, panNo: e.target.value }))}
                                                        maxLength={10}
                                                        minLength={10}
                                                    />
                                                    {/* <div className="text-red-500">{errorMessage && <span className="error-message">{errorMessage}</span>}</div> */}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold mb-1">Name as in PAN:</label>
                                                    <input
                                                        type="text"
                                                        autoComplete="off"
                                                        placeholder="Name as in PAN"
                                                        className="w-full border rounded form-input text-sm"
                                                        name="holderName"
                                                        value={tlvDetails.holderName}
                                                        onChange={(e) => setTLVDetails((pre: any) => ({ ...pre, holderName: e.target.value }))}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold mb-1">Upload PAN:</label>
                                                    <input
                                                        // className="fileTypeInput form-input"
                                                        type="file"
                                                        onChange={() => {
                                                            imageChange(event, 'PAN DOC');
                                                        }}
                                                        accept="image/*"
                                                    />
                                                </div>
                                                {detailsData?.table && detailsData?.table[0]?.pan_doc && (
                                                    <div className='mt-6'>
                                                        <button onClick={(event) => handleDownload(event, detailsData?.table && detailsData?.table[0]?.pan_doc)}>
                                                            <FaDownload />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>

                            {/* LC/BG accordian */}
                            <div className="rounded border border-[#d3d3d3] dark:border-[#1b2e4b]">
                                <button type="button" className={`custAccoHead flex w-full items-center px-3 py-2 text-white-dark dark:bg-[#1b2e4b]`} onClick={() => setAccordianOpen(accordianOpen === '3' ? '' : '3')}>
                                    LC/BG ({detailsData?.table2[0]?.lcbg_mandatory_yn === 'Y' ? 'Required' : 'Optional'}) and Cheque Info ({detailsData?.table2[0]?.lcbg_mandatory_yn === 'Y' ? 'Required' : 'Optional'})
                                    <div className={`ltr:ml-auto rtl:mr-auto ${accordianOpen === '3' ? 'rotate-180' : ''}`}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    </div>
                                </button>
                                <div>
                                    <AnimateHeight duration={300} height={accordianOpen === '3' ? 'auto' : 0}>
                                        <div className="border-t border-[#d3d3d3] p-1 text-[13px] dark:border-[#1b2e4b]">
                                            <div className="mb-4 border-b border-[#d3d3d3] pb-4">
                                                <div className="flex items-center">
                                                    <label className="formLabelTx mr-2">
                                                        Enable LC/BG Fields: {detailsData?.table2[0]?.lcbg_mandatory_yn === 'Y' ? 'Required' : 'Optional'}
                                                    </label>
                                                    <select disabled={detailsData?.table2[0]?.lcbg_mandatory_yn === 'Y'} value={tlvDetails.lcBg} onChange={(e) => setTLVDetails((pre: any) => ({ ...pre, lcBg: e.target.value }))} className="yesNoTogal form-input ml-2">
                                                        <option value="Y">Yes</option>
                                                        <option value="N">No</option>
                                                    </select>
                                                </div>

                                                {tlvDetails.lcBg === 'Y' && (
                                                    <div className="bg-white rounded-lg px-4 py-1 shadow-md mb-2">
                                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
                                                            <div>
                                                                <label className="block text-sm font-semibold mb-1">
                                                                    LC/BG Opening Date:<span className="reqired">*</span>
                                                                </label>
                                                                <Flatpickr
                                                                    className="w-full border rounded form-input text-sm"
                                                                    options={{
                                                                        dateFormat: 'Y-m-d', // Actual input value format (ISO format)
                                                                        altInput: true, // Enables alternative display input
                                                                        altFormat: 'd/m/Y', // Display format for the user
                                                                    }}
                                                                    value={tlvDetails.frm_date ? convertToDate(tlvDetails.frm_date) : ''}
                                                                    onChange={(date) => setTLVDetails((pre: any) => ({ ...pre, frm_date: date[0] }))}
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="block text-sm font-semibold mb-1">
                                                                    LC/BG Expiry Date:<span className="reqired">*</span>
                                                                </label>
                                                                <Flatpickr
                                                                    className="w-full border rounded form-input text-sm"
                                                                    options={{
                                                                        dateFormat: 'd/m/Y',
                                                                        position: 'auto left',
                                                                        // disable: [(date) => isDateDisabled(date)],
                                                                    }}
                                                                    value={tlvDetails.to_date ? convertToDate(tlvDetails.to_date) : ''}
                                                                    onChange={(date) => setTLVDetails((pre: any) => ({ ...pre, to_date: date[0] }))}
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="block text-sm font-semibold mb-1">
                                                                    LC/BG Amount (Lakhs):<span className="reqired">*</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="LC/BG Amount"
                                                                    className="w-full border rounded form-input text-sm"
                                                                    name="lcbgAmount"
                                                                    // onChange={handleChange}
                                                                    // value={formsData.lcbgAmount}
                                                                    value={tlvDetails.lcbgAmount}
                                                                    onChange={(e) => setTLVDetails((pre: any) => ({ ...pre, lcbgAmount: e.target.value }))}
                                                                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                        const target = e.target as HTMLInputElement;
                                                                        target.value = target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\..*/g, '$1');
                                                                    }}
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="block text-sm font-semibold mb-1">
                                                                    LC/BG Copy:<span className="reqired">*</span>
                                                                </label>
                                                                <input
                                                                    // className="fileTypeInput form-input"
                                                                    type="file"
                                                                    onChange={() => {
                                                                        imageChange(event, 'LCBG DOC');
                                                                    }}
                                                                    accept="image/*"
                                                                />
                                                            </div>

                                                            {detailsData?.table && detailsData?.table[0]?.lcbg_doc && (
                                                                <div className='mt-6'>
                                                                    <button onClick={(event) => handleDownload(event, detailsData?.table && detailsData?.table[0]?.lcbg_doc)}>
                                                                        <FaDownload />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="">
                                                <div className="mb-2 flex items-center">
                                                    <label className="formLabelTx mr-2">
                                                        Enable Blank Cheque Fields: {detailsData?.table2[0]?.blank_chq_mandatory_yn === 'Y' ? 'Required' : 'Optional'}
                                                    </label>
                                                    <select disabled={detailsData?.table2[0]?.blank_chq_mandatory_yn === 'Y'} value={tlvDetails.blank_chq} onChange={(e) => setTLVDetails((pre: any) => ({ ...pre, blank_chq: e.target.value }))} className="yesNoTogal form-input ml-2">
                                                        <option value="Y">Yes</option>
                                                        <option value="N">No</option>
                                                    </select>
                                                </div>

                                                {tlvDetails.blank_chq === 'Y' && (
                                                    <div className="bg-white rounded-lg px-4 py-1 shadow-md mb-2">
                                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
                                                            <div>
                                                                <label className="block text-sm font-semibold mb-1">
                                                                    Cheque No.:<span className="reqired">*</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="chequeNo"
                                                                    className="w-full border rounded form-input text-sm"
                                                                    maxLength={10}
                                                                    minLength={6}
                                                                    value={tlvDetails.chequeNo}
                                                                    onChange={(e) => setTLVDetails((pre: any) => ({ ...pre, chequeNo: e.target.value }))}
                                                                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                        const target = e.target as HTMLInputElement;
                                                                        target.value = target.value.replace(/[^0-9]/g, '');
                                                                    }}
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="block text-sm font-semibold mb-1">
                                                                    IFSC:<span className="reqired">*</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    autoComplete="off"
                                                                    name="ifsc"
                                                                    value={tlvDetails.ifsc}
                                                                    onChange={(e) => setTLVDetails((pre: any) => ({ ...pre, ifsc: e.target.value }))}
                                                                    className="w-full border rounded form-input text-sm"
                                                                />
                                                                <div className={`mt-2 text-sm ${tlvDetails.success ? 'text-green-500' : 'text-red-500'}`}>
                                                                    {tlvDetails.message && <span>{tlvDetails.message}</span>}
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <label className="block text-sm font-semibold mb-1">
                                                                    Bank Name:<span className="reqired">*</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="bankName"
                                                                    value={tlvDetails.bankName}
                                                                    className="w-full border rounded form-input text-sm"
                                                                    readOnly
                                                                    style={{ cursor: 'not-allowed', backgroundColor: '#f0f0f0' }}
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="block text-sm font-semibold mb-1">
                                                                    Branch:<span className="reqired">*</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="branch"
                                                                    value={tlvDetails.branch}
                                                                    className="w-full border rounded form-input text-sm"
                                                                    readOnly
                                                                    style={{ cursor: 'not-allowed', backgroundColor: '#f0f0f0' }}
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="block text-sm font-semibold mb-1">
                                                                    Upload Blank Cheque:<span className="reqired">*</span>
                                                                </label>
                                                                <input
                                                                    // className="fileTypeInput form-input"
                                                                    type="file"
                                                                    onChange={(event) => {
                                                                        imageChange(event, 'CHEQUE DOC');
                                                                    }}
                                                                    accept="image/*"
                                                                />
                                                            </div>

                                                            {detailsData?.table && detailsData?.table[0]?.td_blank_chq_doc && (
                                                                <div className='mt-6'>
                                                                    <button onClick={(event) => handleDownload(event, detailsData?.table && detailsData?.table[0]?.td_blank_chq_doc)}>
                                                                        <FaDownload />
                                                                    </button>
                                                                </div>
                                                            )}
                                                            <div>
                                                                <Button
                                                                    className={`ml-2000 mt-4 rounded px-4 py-2 font-bold text-white ${tlvDetails.chequeNo === '' || tlvDetails.ifsc === '' ? 'bg-lightblue cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
                                                                        }`}
                                                                    onClick={() => handleIFSCValidate()}
                                                                    disabled={tlvDetails.chequeNo === '' || tlvDetails.ifsc === ''}
                                                                >
                                                                    Validate
                                                                    {/* 397788000234  Deepak  BNZPM2501F   D MANIKANDAN   1234567890    HDFC0000003 */}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>
                        </div>}
                </form>
            </div>

            {detailsData &&
                <>
                    <div>
                        <div className="bg-white rounded-lg px-4 py-1 shadow-md mb-2">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
                                {tlvDetails.td_submission_type === 'CREDIT_DAYS' || tlvDetails.td_submission_type === 'TLV_AND_CREDIT_DAYS' ? (
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Credit Days:</label>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            className="w-full border rounded form-input text-sm"
                                            name="dlr_due_days"
                                            readOnly
                                            style={{ cursor: 'not-allowed', backgroundColor: '#f0f0f0' }}
                                            value={detailsData?.table2 ? detailsData?.table2[0]?.dlr_due_days : null}
                                            // onChange={handledChange}
                                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                const target = e.target as HTMLInputElement;
                                                target.value = target.value.replace(/[^0-9.]/g, '');
                                            }}
                                        />
                                    </div>
                                ) : null}

                                <div>
                                    <label className="block text-sm font-semibold mb-1">
                                        Current TLV (Lakhs):<span className="reqired">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="0.00"
                                        className="w-full border rounded form-input text-sm"
                                        name="dlr_credit_limit"
                                        readOnly
                                        style={{ cursor: 'not-allowed', backgroundColor: '#f0f0f0' }}
                                        value={detailsData?.table2 ? detailsData?.table2[0]?.dlr_credit_limit : null}
                                        // onChange={handledChange}
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const target = e.target as HTMLInputElement;
                                            target.value = target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\..*/g, '$1');
                                        }}
                                    />
                                </div>

                                {tlvDetails.td_submission_type === 'CREDIT_DAYS' || tlvDetails.td_submission_type === 'TLV_AND_CREDIT_DAYS' ? (
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Proposed Credit Days:</label>
                                        <input
                                            type="text"
                                            placeholder="Proposed Cr Days:"
                                            className="w-full border rounded form-input text-sm"
                                            name="proposedCreditDays"
                                            value={tlvDetails.proposedCreditDays}
                                            onChange={(e) => setTLVDetails((pre: any) => ({ ...pre, proposedCreditDays: e.target.value }))}
                                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                const target = e.target as HTMLInputElement;
                                                target.value = target.value.replace(/[^0-9]/g, '');
                                            }}
                                        />
                                    </div>
                                ) : null}

                                {tlvDetails.td_submission_type === 'TLV' || tlvDetails.td_submission_type === 'TLV_AND_CREDIT_DAYS' ? (
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">
                                            Requested TLV (Lakhs):<span className="reqired">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Requested TLV (Lakhs)"
                                            className="w-full border rounded form-input text-sm"
                                            name="requestedTLV"
                                            // onChange={handledChange}
                                            // value={formedData.requestedTLV}
                                            value={tlvDetails.requestedTLV}
                                            onChange={(e) => setTLVDetails((pre: any) => ({ ...pre, requestedTLV: e.target.value }))}
                                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                const target = e.target as HTMLInputElement;
                                                target.value = target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\..*/g, '$1');
                                            }}
                                        />
                                    </div>
                                ) : null}

                                <div>
                                    <label className="block text-sm font-semibold mb-1">
                                        Order to be Billed Volume (KL):<span className="reqired">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Order to be Billed Volume (KL)"
                                        className="w-full border rounded form-input text-sm"
                                        name="billedVol"
                                        // onChange={handledChange}
                                        // value={formedData.billedVol}
                                        value={tlvDetails.billedVol}
                                        onChange={(e) => setTLVDetails((pre: any) => ({ ...pre, billedVol: e.target.value }))}
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const target = e.target as HTMLInputElement;
                                            target.value = target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\..*/g, '$1');
                                        }}
                                    // disabled={isBilledVolLocked}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-1">
                                        Order to be Billed Value (Lakhs):<span className="reqired">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Order to be Billed Value (Lakhs)"
                                        className="w-full border rounded form-input text-sm"
                                        name="billedVal"
                                        // onChange={handledChange}
                                        // value={formedData.billedVal}
                                        value={tlvDetails.billedVal}
                                        onChange={(e) => setTLVDetails((pre: any) => ({ ...pre, billedVal: e.target.value }))}
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const target = e.target as HTMLInputElement;
                                            target.value = target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\..*/g, '$1');
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-1">
                                        Reason for Increase:<span className="reqired">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Reason for Increase"
                                        className="w-full border rounded form-input text-sm"
                                        name="increaseReason"
                                        // onChange={handledChange}
                                        // value={formedData.increaseReason}
                                        value={tlvDetails.increaseReason}
                                        onChange={(e) => setTLVDetails((pre: any) => ({ ...pre, increaseReason: e.target.value }))}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-1">
                                        End Customer Name:<span className="reqired">*</span>
                                    </label>
                                    <input
                                        autoComplete="off"
                                        type="text"
                                        placeholder="End Customer Name"
                                        className="w-full border rounded form-input text-sm"
                                        name="customerName"
                                        // onChange={handledChange}
                                        // value={formedData.customerName}
                                        value={tlvDetails.customerName}
                                        onChange={(e) => setTLVDetails((pre: any) => ({ ...pre, customerName: e.target.value }))}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                            <div className="panel mb-4">
                                <table className="custTableView lg-custTableView w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th style={{ textAlign: 'center' }} colSpan={2}>
                                                Key Parameters-Account Level(Last 1Yr)
                                            </th>
                                        </tr>
                                        <tr>
                                            <th style={{ width: '70%', textAlign: 'left' }}>Parameter</th>
                                            <th style={{ width: '30%', textAlign: 'center' }}>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {detailsData?.table4 && detailsData?.table4.map((item: { trd_descr: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; trd_value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; }, itemindexCount: React.Key | null | undefined) => (
                                            <tr key={itemindexCount}>
                                                <td className="border-t px-4 py-2" style={{ width: '70%', textAlign: 'left' }}>
                                                    {item.trd_descr !== null ? item.trd_descr : '-'}
                                                </td>
                                                <td className="border-t px-4 py-2" style={{ width: '30%', textAlign: 'center' }}>
                                                    {item.trd_value !== null ? item.trd_value : '-'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="panel mb-4">
                                <div className="table-responsive">
                                    <table className="custTableView wrap w-full border-collapse">
                                        <thead>
                                            <tr>
                                                <th style={{ textAlign: 'center' }} colSpan={5}>
                                                    Outstanding Details
                                                </th>
                                            </tr>
                                            <tr>
                                                <th style={{ width: '15%', textAlign: 'center' }}>Slab</th>
                                                <th style={{ width: '15%', textAlign: 'center' }}>O/S (Lakhs)</th>
                                                <th style={{ width: '25%', textAlign: 'center' }}>OD (Over-Due Or Due Beyond Credit Days)</th>
                                                <th style={{ width: '25%', textAlign: 'center' }}>Expected Collection Date</th>
                                                <th style={{ width: '20%', textAlign: 'center' }}>Expected Collection Amount (Lakhs)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {detailsData?.table5 &&
                                                detailsData?.table5.map((item: { slab: string; od: any; os: any }, itemindexCount: number) => {
                                                    if (item.slab === 'Total' || !item.slab) return null;
                                                    const showDynamicFields = item.od !== null && item.od > 0;
                                                    const uniqueId = `${itemindexCount + 1}`;
                                                    const collection_date = `collection${uniqueId}_date`;
                                                    const collectionAmount = `collectionAmount${uniqueId}`;
                                                    return (
                                                        <tr key={uniqueId} style={{ backgroundColor: showDynamicFields ? '#ffd9d5' : '' }}>
                                                            <td className="border-t px-4 py-2" style={{ width: '15%', textAlign: 'center' }}>
                                                                {item.slab || '-'}
                                                            </td>
                                                            <td className="border-t px-4 py-2" style={{ width: '15%', textAlign: 'center' }}>
                                                                {item.os !== null ? item.os : '-'}
                                                            </td>
                                                            <td className="border-t px-4 py-2" style={{ width: '20%', textAlign: 'center' }}>
                                                                {item.od !== null ? item.od : '-'}
                                                            </td>
                                                            {showDynamicFields && (
                                                                <>
                                                                    <td style={{ width: '20%', textAlign: 'center' }}>
                                                                        <Flatpickr
                                                                            value={tlvDetails[collection_date] || ''}
                                                                            options={{ dateFormat: 'd/m/Y', position: 'auto left' }}
                                                                            className="form-input"
                                                                            placeholder="Expected Date"
                                                                            onChange={(date) => setTLVDetails((pre: any) => ({ ...pre, [collection_date]: date[0] }))}
                                                                            id={collection_date}
                                                                        />
                                                                    </td>

                                                                    <td style={{ textAlign: 'center' }}>
                                                                        <input
                                                                            type="text"
                                                                            autoComplete="off"
                                                                            placeholder="Value (in Lakhs)"
                                                                            className="form-input"
                                                                            name={collectionAmount}
                                                                            value={tlvDetails[collectionAmount] || ''}
                                                                            onChange={(e) => setTLVDetails((pre: any) => ({ ...pre, [collectionAmount]: e.target.value }))}
                                                                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                                const target = e.target as HTMLInputElement;
                                                                                target.value = target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\..*/g, '$1');
                                                                            }}
                                                                            id={collectionAmount}
                                                                        />
                                                                    </td>
                                                                </>
                                                            )}
                                                        </tr>
                                                    );
                                                })
                                                // :
                                                // <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
                                                //     <div role="status" className="animate-spin">
                                                //         <svg aria-hidden="true" className="h-8 w-8 fill-blue-600 text-gray-200" viewBox="0 0 100 101" fill="none">
                                                //             <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" />
                                                //             <path
                                                //                 d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                //                 fill="currentFill"
                                                //             />
                                                //         </svg>
                                                //         <span className="sr-only text-white">Please Wait...</span>
                                                //     </div>
                                                // </div>
                                            }
                                        </tbody>
                                        <tfoot>
                                            {detailsData?.table5 && detailsData?.table5.map((item: { slab: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; os: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; od: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; }, index: React.Key | null | undefined) =>
                                                item.slab === 'Total' && <tr key={index}>
                                                    <td className="border-t px-4 py-2" style={{ width: '15%', textAlign: 'center' }}>
                                                        {item.slab}
                                                    </td>
                                                    <td className="border-t px-4 py-2" style={{ width: '15%', textAlign: 'center' }}>
                                                        {item.os !== null ? item.os : '-'}
                                                    </td>
                                                    <td className="border-t px-4 py-2" style={{ width: '20%', textAlign: 'center' }}>
                                                        {item.od !== null ? item.od : '-'}
                                                    </td>
                                                    <td style={{ width: '20%', textAlign: 'center' }}></td>
                                                    <td style={{ textAlign: 'center' }}></td>
                                                </tr>
                                            )}
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-1 pb-3">
                        <button
                            type="button"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm flex items-center"
                            onClick={() => {
                                handleFormSubmit();
                            }}
                        >
                            <IoMdSave /> &nbsp; {tlvDetails.formSubmitable === 'Y' ? 'Update' : 'Submit'}
                        </button>
                        <button
                            type="button"
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm flex items-center"
                            onClick={() => {
                                handleBackButton();
                            }}
                        >
                            <IoReturnUpBack />  &nbsp; Back
                        </button>
                    </div>
                </>
            }
        </>
    )
}

export default TLVRevisionRequestDetails