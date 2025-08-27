'use client';

import { VisitAddUpdate } from '../../../services/api/lead-service';
import { GetPROSPECTVisitDone, GetPROSPECTVisitNotDone, GetTSIVisitDone, GetTSIVisitNotDone, GetTsiList, GetVisitNextAction } from '../../../services/api/visit-service';
import { I_Visit_Details, Visit_Details_DTO } from '../../../services/constants/interfaces/visit.interface';
import { commonAlert } from '../../../services/functions/commonAlert';
import { commonErrorToast, commonSuccessToast } from '../../../services/functions/commonToast';
import { UseAuthStore } from '../../../services/store/AuthStore';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import Select from 'react-select';
import FeatherIcon from 'feather-icons-react';
import AnimateHeight from 'react-animate-height';
import MapView from '../Map-View/MapView';
import { GetProdDevImgRouteBuilder } from '../../../services/functions/getProdDevUrlBuilder';

export interface validationObj {
    DateTimeOfVisitCheckin: string;
    DateTimeOfVisitCheckout: string;
    VisitedBy: string;
    TSIFeedback: string;
    ProsFeedback: string;
    TSIRemarks: string;
    ProsRemarks: string;
    NextAction: string;
    DateTimeOfNextFollowup: string;
}

export const allErrorMsg: validationObj = {
    DateTimeOfVisitCheckin: '',
    DateTimeOfVisitCheckout: '',
    VisitedBy: '',
    TSIFeedback: '',
    ProsFeedback: '',
    TSIRemarks: '',
    ProsRemarks: '',
    NextAction: '',
    DateTimeOfNextFollowup: '',
};

export interface SELECTED_DROPDOWN {
    DealerTrr: number;
    SelectedTSI: number;
    TSIFeedback: number;
    PROSFeedback: number;
    TSINextAction: number;
}
const selectedDropdownInit: SELECTED_DROPDOWN = {
    DealerTrr: -1,
    SelectedTSI: -1,
    TSIFeedback: -1,
    PROSFeedback: -1,
    TSINextAction: -1,
};

const VisitEntry = ({ LeadDetails, onModalButtonHandle, VisitInfo, handleOnUpdate }: any) => {
    const UserDetails = UseAuthStore((state) => state.userDetails);
    // Get current date and time
    var currentDate = new Date();
    // Format the date and time
    // var currentDateTime = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate
    //     .getHours()
    //     .toString()
    //     .padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;
    var currentTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;
    var currentDateTime =
        currentDate.getDate().toString().padStart(2, '0') +
        '/' +
        (currentDate.getMonth() + 1).toString().padStart(2, '0') +
        '/' +
        currentDate.getFullYear() +
        ' ' +
        moment.utc(currentTime, 'HH:mm').format('hh:mm A');
    var todayDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    const [DateTimeOfVisitCheckin, setDateTimeOfVisitCheckin] = useState<any>(currentDateTime);
    const [DateTimeOfVisitCheckout, setDateTimeOfVisitCheckout] = useState<any>(currentDateTime);
    const [DateTimeOfNextFollowup, setDateTimeOfNextFollowup] = useState<any>(todayDate);
    const [VisitDetails, setVisitDetails] = useState<I_Visit_Details>(Visit_Details_DTO);
    const [errMsg, setErrMsg] = useState<validationObj>(allErrorMsg);
    const [TSIVisitFeedbackList, setTSIVisitFeedbackList] = useState<any[]>([]);
    const [ProsVisitFeedbackList, setProsVisitFeedbackList] = useState<any[]>([]);
    const [VisitNextAction, setVisitNextAction] = useState<any[]>([]);
    const [TSIVisitDone, setTSIVisitDone] = useState('Y');
    const [PROSVisitDone, setPROSVisitDone] = useState('Y');
    const [TSIList, setTSIList] = useState<any[]>([]);
    const [selectedDropdown, setSelectedDropdown] = useState<SELECTED_DROPDOWN>(selectedDropdownInit);
    const [ConflictDealer, setConflictDealer] = useState<any>([]);
    const [inputValue, setInputValue] = useState('');
    let TSIFeedbackCancelBtnShowStatus = ['100', '200', '300'];
    let ProspectFeedbackCancelBtnShowStatus = ['100'];
    const [canCancelLead, setcanCancelLead] = useState<boolean>(false);
    useEffect(() => {
        if (LeadDetails) {
            LeadDetails.tabFlag = 'DealerMapForConflict';
        }
        if (VisitInfo) {
            // setVisitDetails((prev) => ({ ...prev, ...VisitInfo }));
            FetchVisitDetails(VisitInfo);
        }
        getTsiList();
    }, [VisitInfo]);

    // *****GETTING VISIT INFO FROM VISIT LIST START***** //
    const FetchVisitDetails = async (VisitInfo: I_Visit_Details) => {
        if (VisitInfo.dcio_check_in_time) {
            // setDateTimeOfVisitCheckin(moment(VisitInfo.dcio_check_in_time, 'DD/MM/YYYY hh:mm A').format('YYYY-MM-DD hh:mm A'));
            setDateTimeOfVisitCheckin(VisitInfo.dcio_check_in_time);
        }
        if (VisitInfo.dcio_check_out_time) {
            setDateTimeOfVisitCheckout(VisitInfo.dcio_check_out_time);
            // setDateTimeOfVisitCheckout(moment(VisitInfo.dcio_check_out_time, 'DD/MM/YYYY hh:mm A').format('YYYY-MM-DD hh:mm A'));
        }
        if (VisitInfo.dcio_next_followup_date) setDateTimeOfNextFollowup(VisitInfo.dcio_next_followup_date);
        setTSIVisitDone(VisitInfo.dcio_tsi_visit_made_yn);
        setPROSVisitDone(VisitInfo.dcio_propect_visit_made_yn);
        VisitDetails.dcio_tsi_visit_made_yn = VisitInfo.dcio_tsi_visit_made_yn;
        VisitDetails.dcio_propect_visit_made_yn = VisitInfo.dcio_propect_visit_made_yn;
        VisitDetails.dcio_prospect_visit_remarks = VisitInfo.dcio_prospect_visit_remarks;
        VisitDetails.dcio_tsi_visit_remarks = VisitInfo.dcio_tsi_visit_remarks;
        VisitDetails.dcio_id = VisitInfo.dcio_id ? VisitInfo.dcio_id : null;
        VisitDetails.dcio_activity_others = VisitInfo.dcio_activity_others;
        VisitDetails.dcio_activity_type = VisitInfo.dcio_activity_type;
        VisitDetails.dcio_geo_tag_not_done_reason = VisitInfo.dcio_geo_tag_not_done_reason;
        VisitDetails.dcio_cancelation_request_yn = VisitInfo.dcio_cancelation_request_yn;
        VisitDetails.dcio_cancelation_request_remarks = VisitInfo.dcio_cancelation_request_remarks;
    };
    // *****GETTING VISIT INFO FROM VISIT LIST END***** //

    // *****ADD/UPDATE VISIT DETAILS START***** //
    const VisitAddUpdateDetails = async () => {
        VisitDetails.leadId = LeadDetails.lh_id;
        VisitDetails.dcio_check_in_time = await formatDateTime(DateTimeOfVisitCheckin);
        VisitDetails.dcio_check_out_time = await formatDateTime(DateTimeOfVisitCheckout);
        VisitDetails.dcio_depot_code = LeadDetails.lh_depot_code;
        VisitDetails.dcio_prospect_visit_feedback = selectedDropdown.PROSFeedback !== -1 ? ProsVisitFeedbackList[selectedDropdown.PROSFeedback].lov_code : null;
        VisitDetails.dcio_tsi_visit_feedback = selectedDropdown.TSIFeedback !== -1 ? TSIVisitFeedbackList[selectedDropdown.TSIFeedback].lov_code : null;
        VisitDetails.dcio_visit_next_action = selectedDropdown.TSINextAction !== -1 ? VisitNextAction[selectedDropdown.TSINextAction].lov_code : null;
        VisitDetails.dcio_visit_by = selectedDropdown.SelectedTSI !== -1 ? TSIList[selectedDropdown.SelectedTSI].userId : null;
        if (VisitDetails.dcio_propect_visit_made_yn == 'N' && VisitDetails.dcio_tsi_visit_made_yn == 'N') {
            VisitDetails.dcio_check_in_time = null;
            VisitDetails.dcio_check_out_time = null;
            VisitDetails.dcio_visit_next_action = null;
        }

        if (TSIVisitDone == 'Y' && selectedDropdown.TSIFeedback !== -1 && TSIVisitFeedbackList[selectedDropdown.TSIFeedback].value == '100') {
            VisitDetails.dcio_conflict_dealer_code = ConflictDealer != null ? ConflictDealer.dealer_code : null;
            VisitDetails.dcio_conflict_dealer_distance = ConflictDealer != null ? ConflictDealer.distance.distance : null;
            VisitDetails.dcio_conflict_dealer_business_value = ConflictDealer != null ? ConflictDealer.sales_value : null;
            VisitDetails.dcio_cancelation_request_remarks = VisitDetails.dcio_tsi_visit_remarks;
            VisitDetails.dcio_cancelation_request_yn = 'Y';
        }

        if (TSIVisitDone == 'Y' && selectedDropdown.TSIFeedback !== -1 && TSIVisitFeedbackList[selectedDropdown.TSIFeedback].value == '600') {
            VisitDetails.dcio_next_followup_date = DateTimeOfNextFollowup;
        }
        if (TSIVisitDone == 'Y' && selectedDropdown.TSIFeedback !== -1 && TSIVisitFeedbackList[selectedDropdown.TSIFeedback].value != '200') {
            VisitDetails.nonServiceablePin = null;
        }

        let errorCount = 0;
        if ((VisitDetails.dcio_propect_visit_made_yn == 'Y' || VisitDetails.dcio_tsi_visit_made_yn == 'Y') && VisitDetails.dcio_check_in_time == VisitDetails.dcio_check_out_time) {
            commonErrorToast('Visit start Date Time & Visit end Date Time can not be same');
            errorCount++;
        }
        if (
            TSIVisitDone == 'Y' &&
            selectedDropdown.TSIFeedback !== -1 &&
            TSIVisitFeedbackList[selectedDropdown.TSIFeedback].value == '100' &&
            (VisitDetails.dcio_conflict_dealer_code == '' || VisitDetails.dcio_conflict_dealer_code == null)
        ) {
            // setErrorMsg('Conflict dealer is missing', 'conflitDealer');
            commonErrorToast('Conflict dealer is missing');
            errorCount++;
        }

        if (
            TSIVisitDone == 'Y' &&
            selectedDropdown.TSIFeedback !== -1 &&
            TSIVisitFeedbackList[selectedDropdown.TSIFeedback].value == '100' &&
            (VisitDetails.dcio_tsi_visit_remarks == '' || VisitDetails.dcio_tsi_visit_remarks == null)
        ) {
            commonErrorToast('TSI remarks is required');
            errorCount++;
        }
        if (
            TSIVisitDone == 'Y' &&
            selectedDropdown.TSIFeedback !== -1 &&
            TSIVisitFeedbackList[selectedDropdown.TSIFeedback].value == '600' &&
            (VisitDetails.dcio_next_followup_date == '' || VisitDetails.dcio_next_followup_date == null)
        ) {
            commonErrorToast('Visit next followup date is required');
            errorCount++;
        }

        if (
            TSIVisitDone == 'Y' &&
            selectedDropdown.TSIFeedback !== -1 &&
            TSIVisitFeedbackList[selectedDropdown.TSIFeedback].value == '200' &&
            (VisitDetails.nonServiceablePin == '' || VisitDetails.nonServiceablePin == null)
        ) {
            commonErrorToast('Pincode is required');
            errorCount++;
        }

        if (TSIVisitDone == 'Y' && (VisitDetails.dcio_visit_by == '' || VisitDetails.dcio_visit_by == null)) {
            commonErrorToast('TSI name is required');
            errorCount++;
        }

        // return;

        if (errorCount == 0) {
            commonAlert('Are You Sure?', 'If you click confirm the record will be submitted. To cancel please press cancel button.', 'warning').then(async (result: any) => {
                if (result.value) {
                    try {
                        const response = await VisitAddUpdate(VisitDetails);
                        if (response.response_message) {
                            commonSuccessToast(response.response_message);
                            VisitInfo ? handleOnUpdate() : onModalButtonHandle('Visit');
                        } else {
                            commonErrorToast(response.errorMessage);
                        }
                    } catch (error) {
                        return;
                    }
                }
            });
        }
    };
    // *****ADD/UPDATE VISIT DETAILS END***** //

    // *****CONFLICT MANAGEMENT START***** //
    const [active2, setActive2] = useState<string>('0');
    const togglePara2 = (value: string) => {
        setActive2((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };
    const onSelect = (flag: any) => {
        if (flag != null) {
            flag['value'] = flag['dealer_code'];
            flag['label'] = flag['dealer_code'] + '- ' + flag['dealer_name'];
        }
        setErrorMsg('', 'conflitDealer');
        setConflictDealer(flag);
    };
    // *****CONFLICT MANAGEMENT END***** //

    // *****ALL FETCH API CALL START***** //
    const getTSIVisitDone = async () => {
        try {
            const response = await GetTSIVisitDone({ userid: UserDetails.user_id });
            if (response && response.data && response.data.length > 0) {
                labelValueConverter(response.data, 'lov_value', 'lov_code');
                setTSIVisitFeedbackList(response.data);
                if (VisitInfo && VisitInfo.dcio_tsi_visit_made_yn == 'Y' && VisitInfo.dcio_tsi_visit_feedback != '')
                    setSelectedDropdown((prev) => ({ ...prev, TSIFeedback: findSelectedTypeValue(response.data, 'value', VisitInfo.dcio_tsi_visit_feedback) }));
            }
        } catch (error) {
            return;
        }
    };

    const getProspectVisitDone = async () => {
        try {
            const response = await GetPROSPECTVisitDone({ userid: UserDetails.user_id });
            if (response && response.data && response.data.length > 0) {
                labelValueConverter(response.data, 'lov_value', 'lov_code');
                setProsVisitFeedbackList(response.data);
                if (VisitInfo && VisitInfo.dcio_propect_visit_made_yn == 'Y' && VisitInfo.dcio_prospect_visit_feedback != '')
                    setSelectedDropdown((prev) => ({ ...prev, PROSFeedback: findSelectedTypeValue(response.data, 'value', VisitInfo.dcio_prospect_visit_feedback) }));
            }
        } catch (error) {
            return;
        }
    };

    const getTSIVisitNotDone = async () => {
        try {
            const response = await GetTSIVisitNotDone({ userid: UserDetails.user_id });
            if (response && response.data && response.data.length > 0) {
                labelValueConverter(response.data, 'lov_value', 'lov_code');
                setTSIVisitFeedbackList(response.data);
                if (VisitInfo && VisitInfo.dcio_tsi_visit_made_yn == 'N' && VisitInfo.dcio_tsi_visit_feedback != '')
                    setSelectedDropdown((prev) => ({ ...prev, TSIFeedback: findSelectedTypeValue(response.data, 'value', VisitInfo.dcio_tsi_visit_feedback) }));
            }
        } catch (error) {
            return;
        }
    };

    const getProspectVisitNotDone = async () => {
        try {
            const response = await GetPROSPECTVisitNotDone({ userid: UserDetails.user_id });
            if (response && response.data && response.data.length > 0) {
                labelValueConverter(response.data, 'lov_value', 'lov_code');
                setProsVisitFeedbackList(response.data);
                if (VisitInfo && VisitInfo.dcio_propect_visit_made_yn == 'N' && VisitInfo.dcio_prospect_visit_feedback != '')
                    setSelectedDropdown((prev) => ({ ...prev, PROSFeedback: findSelectedTypeValue(response.data, 'value', VisitInfo.dcio_prospect_visit_feedback) }));
            }
        } catch (error) {
            return;
        }
    };

    const getVisitNextAction = async () => {
        try {
            const response = await GetVisitNextAction({ userid: UserDetails.user_id });
            if (response && response.data && response.data.length > 0) {
                labelValueConverter(response.data, 'lov_value', 'lov_code');
                setVisitNextAction(response.data);
                if (VisitInfo && VisitInfo.dcio_tsi_visit_made_yn == 'Y' && VisitInfo.dcio_visit_next_action != '')
                    setSelectedDropdown((prev) => ({ ...prev, TSINextAction: findSelectedTypeValue(response.data, 'value', VisitInfo.dcio_visit_next_action) }));
            }
        } catch (error) {
            return;
        }
    };

    const getTsiList = async () => {
        try {
            const response = await GetTsiList({ depot: LeadDetails.lh_depot_code, terr: LeadDetails.lh_terr_code });
            if (response && response.data && response.data.length > 0) {
                // labelValueConverter(response.data, 'fullName', 'userId');
                response.data.forEach((element: any) => {
                    element['value'] = element['userId'];
                    element['label'] = element['terrCode'] + ': ' + element['fullName'] + ' (' + element['userId'] + ') ' + element['mobile'];
                });
                setTSIList(response.data);
                // if (response.data) setSelectedDropdown((prev) => ({ ...prev, SelectedTSI: findSelectedTypeValue(response.data, 'userId', LeadDetails.lh_terr_code) }));
                if (VisitInfo && VisitDetails.dcio_tsi_visit_made_yn == 'Y' && VisitDetails.dcio_visit_by != '')
                    setSelectedDropdown((prev) => ({ ...prev, SelectedTSI: findSelectedTypeValue(response.data, 'userId', VisitInfo.dcio_visit_by) }));
            } else {
                selectedDropdown.SelectedTSI = -1;
                setSelectedDropdown((prev) => ({ ...prev, SelectedTSI: -1 }));
                // commonErrorToast('No TSI Found');
            }
        } catch (error) {
            return;
        }
    };
    // *****ALL FETCH API CALL END***** //

    // *****ALL COMMON FUNCTION START***** //
    const findSelectedTypeValue = (arr: any[], arrPropName: string, checkValue: string) => {
        if (arr && arr.length > 0) {
            const selectedValue = arr.findIndex((item: any) => item[arrPropName] == checkValue);
            return selectedValue == -1 ? -1 : selectedValue;
        } else {
            return -1;
        }
    };

    const labelValueConverter = (arr: any[], propertyNameLabel: string, propertyNameValue: string) => {
        arr.forEach((element) => {
            element['value'] = element[propertyNameValue];
            element['label'] = element[propertyNameLabel];
        });
        return arr;
    };

    const handleTypeSelect = (e: any, flag: 'TSI_FEED' | 'PROS_FEED' | 'Visit_Next_Action' | 'Visited_By') => {
        if (flag == 'TSI_FEED' && e && e.target.innerText) {
            // const index = TSIVisitFeedbackList.findIndex((element) => element.label == e.target.innerText);
            // setTSIVisitFeedbackIndex(index);
            setConflictDealer(null);
            let FeedbackIndex = findSelectedTypeValue(TSIVisitFeedbackList, 'label', e.target.innerText);
            setSelectedDropdown((prev) => ({ ...prev, TSIFeedback: FeedbackIndex }));

            if (TSIVisitDone == 'Y') {
                if (
                    (FeedbackIndex !== -1 && TSIFeedbackCancelBtnShowStatus.includes(TSIVisitFeedbackList[FeedbackIndex].value)) ||
                    (selectedDropdown.PROSFeedback != -1 && ProspectFeedbackCancelBtnShowStatus.includes(ProsVisitFeedbackList[selectedDropdown.PROSFeedback].value))
                ) {
                    setcanCancelLead(true);
                } else {
                    setcanCancelLead(false);
                }
            } else {
                setcanCancelLead(false);
            }
        }

        if (flag == 'PROS_FEED' && e && e.target.innerText) {
            let FeedbackIndex = findSelectedTypeValue(ProsVisitFeedbackList, 'label', e.target.innerText);
            setSelectedDropdown((prev) => ({ ...prev, PROSFeedback: FeedbackIndex }));
            if (TSIVisitDone == 'Y') {
                if (
                    (FeedbackIndex !== -1 && ProspectFeedbackCancelBtnShowStatus.includes(ProsVisitFeedbackList[FeedbackIndex].value)) ||
                    (selectedDropdown.TSIFeedback != -1 && TSIFeedbackCancelBtnShowStatus.includes(TSIVisitFeedbackList[selectedDropdown.TSIFeedback].value))
                ) {
                    setcanCancelLead(true);
                } else {
                    setcanCancelLead(false);
                }
            } else {
                setcanCancelLead(false);
            }
        }

        if (flag == 'Visit_Next_Action' && e && e.target.innerText) {
            setSelectedDropdown((prev) => ({ ...prev, TSINextAction: findSelectedTypeValue(VisitNextAction, 'label', e.target.innerText) }));
        }

        if (flag == 'Visited_By' && e && e.target.innerText) {
            // const index = TSIList.findIndex((element) => element.label == e.target.innerText);
            // setTSIIndex(index);
            setSelectedDropdown((prev) => ({ ...prev, SelectedTSI: findSelectedTypeValue(TSIList, 'label', e.target.innerText) }));
        }
    };

    const handleInputChange = async (e: any, flag: 'TSI_VISIT_DONE' | 'PROS_VISIT_DONE') => {
        if (e.target.value && flag == 'TSI_VISIT_DONE') {
            setSelectedDropdown((prev) => ({ ...prev, TSIFeedback: -1 }));
            setSelectedDropdown((prev) => ({ ...prev, TSINextAction: -1 }));
            setSelectedDropdown((prev) => ({ ...prev, SelectedTSI: -1 }));
            setTSIVisitFeedbackList([]);
            setVisitNextAction([]);
            setTSIVisitDone(e.target.value);
            VisitDetails.dcio_tsi_visit_made_yn = e.target.value;
            if (VisitDetails.dcio_tsi_visit_made_yn == 'Y') {
                getTSIVisitDone();
            } else {
                getTSIVisitNotDone();
            }
        }
        if (e.target.value && flag == 'PROS_VISIT_DONE') {
            setSelectedDropdown((prev) => ({ ...prev, PROSFeedback: -1 }));
            setProsVisitFeedbackList([]);
            setPROSVisitDone(e.target.value);
            VisitDetails.dcio_propect_visit_made_yn = e.target.value;
            if (VisitDetails.dcio_propect_visit_made_yn == 'Y') {
                getProspectVisitDone();
            } else {
                getProspectVisitNotDone();
            }
        }
    };

    const handleChange = (e: any, flag: 'TSI' | 'PROS' | 'PIN') => {
        if (e && flag == 'TSI') {
            const { name, value } = e.target;
            setVisitDetails((prevData: any) => ({
                ...prevData,
                [name]: value,
            }));
        }

        if (e && flag == 'PROS') {
            const { name, value } = e.target;
            setVisitDetails((prevData: any) => ({
                ...prevData,
                [name]: value,
            }));
        }

        if (e && flag == 'PIN') {
            const { name, value } = e.target;
            setVisitDetails((prevData: any) => ({
                ...prevData,
                [name]: value,
            }));
            // VisitDetails.nonServiceablePin = e.target.value;
        }
    };

    const formatDateTime = async (dateTime: any) => {
        let DateTime = moment(dateTime, 'DD/MM/YYYY h:mm A');
        const formattedDate = DateTime.format('YYYY-MM-DDTHH:mm:ss[Z]');
        return formattedDate;
    };

    const getDateTime = async (dateTime: any, flag: 'DateTimeOfVisitCheckin' | 'DateTimeOfVisitCheckout' | 'DateTimeOfNextFollowup') => {
        if (flag == 'DateTimeOfVisitCheckin' && dateTime) {
            // VisitDetails.dcio_check_in_time = await formatDateTime(dateTime);
            setDateTimeOfVisitCheckin(moment(dateTime[0]).format('DD/MM/YYYY hh:mm A'));
        }
        if (flag == 'DateTimeOfVisitCheckout' && dateTime) {
            // VisitDetails.dcio_check_out_time = await formatDateTime(dateTime);
            // setDateTimeOfVisitCheckout(dateTime);
            setDateTimeOfVisitCheckout(moment(dateTime[0]).format('DD/MM/YYYY hh:mm A'));
        }
        if (flag == 'DateTimeOfNextFollowup' && dateTime) {
            // moment(VisitInfo.dcio_check_out_time, 'DD/MM/YYYY hh:mm A').format('YYYY-MM-DD hh:mm A')
            setDateTimeOfNextFollowup(moment(dateTime[0]).format('YYYY-MM-DD'));
            // VisitDetails.dcio_check_out_time = await formatDateTime(dateTime);
        }
    };

    const setErrorMsg = (msg: string, prop: string) => {
        setErrMsg((prev) => ({ ...prev, [`${prop}`]: msg }));
    };
    // *****ALL COMMON FUNCTION END***** //

    useEffect(() => {
        if (TSIVisitDone == 'Y') {
            getTSIVisitDone();
            getVisitNextAction();
        } else {
            getTSIVisitNotDone();
        }

        if (PROSVisitDone == 'Y') {
            getProspectVisitDone();
        } else {
            getProspectVisitNotDone();
        }
    }, [TSIVisitDone, PROSVisitDone]);

    return (
        <fieldset className="border p-2">
            <div className="bg-white text-[13px]">
                <form className="space-y-2 p-2">
                    <div className="grid grid-cols-4 grid-rows-1 gap-4">
                        <div className="col-span-6 text-sm sm:col-span-2 md:col-span-1">
                            <label htmlFor="gridZip">
                                Visit Start Date & Time <span className="reqired">*</span>
                            </label>
                            <Flatpickr
                                value={DateTimeOfVisitCheckin}
                                options={{ enableTime: true, dateFormat: 'd/m/Y h:i K', position: 'auto left' }}
                                className="form-input"
                                onChange={(date) => {
                                    getDateTime(date, 'DateTimeOfVisitCheckin');
                                    setErrorMsg('', 'DateTimeOfVisitCheckin');
                                }}
                                disabled={VisitDetails.dcio_tsi_visit_made_yn == 'N' && VisitDetails.dcio_propect_visit_made_yn == 'N'}
                            />
                            {/* {errMsg && errMsg.DateTimeOfVisitCheckin ? <div className="mt-1 text-danger">{errMsg.DateTimeOfVisitCheckin}</div> : ''} */}
                        </div>

                        <div className="col-span-6 text-sm sm:col-span-2 md:col-span-1">
                            <label htmlFor="gridZip">
                                Visit End Date & Time <span className="reqired">*</span>
                            </label>
                            <Flatpickr
                                value={DateTimeOfVisitCheckout}
                                // minDate: !VisitInfo ? moment().format('yyyy/MM/DD HH:mm A') : ''
                                options={{ enableTime: true, dateFormat: 'd/m/Y h:i K', position: 'auto left' }}
                                className="form-input"
                                onChange={(date) => {
                                    getDateTime(date, 'DateTimeOfVisitCheckout');
                                    setErrorMsg('', 'DateTimeOfVisitCheckout');
                                }}
                                disabled={VisitDetails.dcio_tsi_visit_made_yn == 'N' && VisitDetails.dcio_propect_visit_made_yn == 'N'}
                            />
                            {/* {errMsg && errMsg.DateTimeOfVisitCheckout ? <div className="mt-1 text-danger">{errMsg.DateTimeOfVisitCheckout}</div> : ''} */}
                        </div>

                        <div className="col-span-6 text-sm sm:col-span-2 md:col-span-1">
                            <label className="formLabel">Visited By {TSIVisitDone == 'Y' && <span className="reqired">*</span>}</label>
                            <Select
                                menuPlacement="auto"
                                menuShouldScrollIntoView={true}
                                // value={TSIList[selectedDropdown.SelectedTSI]}
                                value={selectedDropdown.SelectedTSI !== -1 ? TSIList[selectedDropdown.SelectedTSI] : null}
                                options={TSIList}
                                isSearchable={true}
                                onChange={() => {
                                    handleTypeSelect(event, 'Visited_By');
                                    setErrorMsg('', 'VisitedBy');
                                }}
                                isDisabled={VisitDetails.dcio_tsi_visit_made_yn == 'N' && VisitDetails.dcio_propect_visit_made_yn == 'N'}
                            />
                            {errMsg && errMsg.VisitedBy ? <div className="mt-1 text-danger">{errMsg.VisitedBy}</div> : ''}
                        </div>

                        {TSIVisitDone == 'Y' && selectedDropdown.TSIFeedback !== -1 && TSIVisitFeedbackList[selectedDropdown.TSIFeedback].value == '100' && (
                            <div className="col-span-6 sm:col-span-2 md:col-span-1">
                                <label className="formLabel">
                                    Dealer<span className="reqired">*</span>
                                </label>
                                <Select
                                    value={ConflictDealer}
                                    options={ConflictDealer}
                                    isSearchable={true}
                                    isDisabled={true}
                                    // onChange={() => {
                                    //     handleTypeSelect(event, 'Call_TO');
                                    //     setErrorMsg('', 'conflitDealer');
                                    // }}
                                />
                                {/* {errMsg && errMsg.conflitDealer ? <div className="mt-1 text-danger">{errMsg.conflitDealer}</div> : ''} */}
                            </div>
                        )}
                    </div>
                    <fieldset className="border p-2">
                        <legend className="text-md mb-1 font-bold">TSI Feedback</legend>
                        <div className="grid grid-cols-5 grid-rows-1 gap-2 text-sm">
                            <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                <label>
                                    TSI confirm visit done?<span className="reqired">*</span>
                                </label>
                                <label className="mt-2 inline-flex">
                                    <input
                                        type="radio"
                                        name="default_radio1"
                                        value="Y"
                                        className="form-radio"
                                        checked={TSIVisitDone == 'Y'}
                                        onChange={() => {
                                            handleInputChange(event, 'TSI_VISIT_DONE');
                                            // setErrorMsg('', 'di_gst_yn');
                                        }}
                                    />
                                    <span className="mx-2">Yes</span>

                                    <input
                                        type="radio"
                                        name="default_radio1"
                                        value="N"
                                        className="form-radio"
                                        checked={TSIVisitDone == 'N'}
                                        onChange={() => {
                                            handleInputChange(event, 'TSI_VISIT_DONE');
                                            // setErrorMsg('', 'di_gst_yn');
                                        }}
                                    />
                                    <span>No</span>
                                </label>
                            </div>
                            <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                <label className="formLabel">TSI Visit Feedback</label>

                                <Select
                                    menuPlacement="auto"
                                    menuShouldScrollIntoView={true}
                                    value={selectedDropdown.TSIFeedback !== -1 ? TSIVisitFeedbackList[selectedDropdown.TSIFeedback] : null}
                                    // value={TSIVisitFeedbackList[selectedDropdown.TSIFeedback]}
                                    options={TSIVisitFeedbackList}
                                    isSearchable={true}
                                    onChange={() => {
                                        handleTypeSelect(event, 'TSI_FEED');
                                        setErrorMsg('', 'TSIFeedback');
                                    }}
                                />
                                {errMsg && errMsg.TSIFeedback ? <div className="mt-1 text-danger">{errMsg.TSIFeedback}</div> : ''}
                            </div>
                            <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                <label>
                                    TSI Visit Remarks
                                    {TSIVisitDone == 'Y' && selectedDropdown.TSIFeedback !== -1 && TSIVisitFeedbackList[selectedDropdown.TSIFeedback].value == '100' && (
                                        <span className="reqired">*</span>
                                    )}
                                </label>
                                <textarea
                                    name="dcio_tsi_visit_remarks"
                                    id="dcio_tsi_visit_remarks"
                                    placeholder="Enter TSI Remarks"
                                    className="form-textarea h-10"
                                    value={VisitDetails.dcio_tsi_visit_remarks}
                                    onChange={() => handleChange(event, 'TSI')}
                                    onFocus={() => {
                                        setErrorMsg('', 'TSIRemarks');
                                    }}
                                />
                                {errMsg && errMsg.TSIRemarks ? <div className="text-danger">{errMsg.TSIRemarks}</div> : ''}
                            </div>
                            <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                <label className="formLabel">Next action on lead visited once</label>
                                <Select
                                    menuPlacement="auto"
                                    menuShouldScrollIntoView={true}
                                    // value={VisitNextActionIndex !== -1 ? VisitNextAction[VisitNextActionIndex] : null}
                                    value={selectedDropdown.TSINextAction !== -1 ? VisitNextAction[selectedDropdown.TSINextAction] : null}
                                    options={VisitNextAction}
                                    isSearchable={true}
                                    isDisabled={VisitDetails.dcio_tsi_visit_made_yn == 'N'}
                                    onChange={() => {
                                        handleTypeSelect(event, 'Visit_Next_Action');
                                        setErrorMsg('', 'NextAction');
                                    }}
                                />
                                {errMsg && errMsg.NextAction ? <div className="mt-1 text-danger">{errMsg.NextAction}</div> : ''}
                            </div>
                            {TSIVisitDone == 'Y' && selectedDropdown.TSIFeedback !== -1 && TSIVisitFeedbackList[selectedDropdown.TSIFeedback].value == '600' && (
                                <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                    <label htmlFor="gridZip">
                                        Visit Next Followup Date<span className="reqired">*</span>
                                    </label>
                                    <Flatpickr
                                        value={DateTimeOfNextFollowup}
                                        options={{ dateFormat: 'Y/m/d', minDate: moment().format('yyyy-MM-DD'), position: 'above right' }}
                                        className="form-input"
                                        onChange={(date) => {
                                            getDateTime(date, 'DateTimeOfNextFollowup');
                                            setErrorMsg('', 'DateTimeOfNextFollowup');
                                        }}
                                        disabled={VisitDetails.dcio_tsi_visit_made_yn == 'N' && VisitDetails.dcio_propect_visit_made_yn == 'N'}
                                    />
                                    {errMsg && errMsg.DateTimeOfNextFollowup ? <div className="mt-1 text-danger">{errMsg.DateTimeOfNextFollowup}</div> : ''}
                                </div>
                            )}
                            {TSIVisitDone == 'Y' && selectedDropdown.TSIFeedback !== -1 && TSIVisitFeedbackList[selectedDropdown.TSIFeedback].value == '200' && (
                                <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                    <label htmlFor="gridZip">
                                        Pincode<span className="reqired">*</span>
                                    </label>
                                    <input
                                        name="nonServiceablePin"
                                        id="nonServiceablePin"
                                        type="number"
                                        defaultValue={VisitDetails.nonServiceablePin}
                                        onChange={() => handleChange(event, 'PIN')}
                                        placeholder="Enter Pincode"
                                        className="form-input placeholder:text-white-dark"
                                    />
                                </div>
                            )}
                        </div>
                    </fieldset>

                    <fieldset className="border p-2">
                        <legend className="text-md mb-1 font-bold">Prospect Feedback</legend>
                        <div className="grid grid-cols-5 grid-rows-1 gap-2 text-sm">
                            <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                <label>
                                    Prospect confirm visit done?<span className="reqired">*</span>
                                </label>
                                <label className="mt-2 inline-flex">
                                    <input
                                        type="radio"
                                        name="default_radio2"
                                        value="Y"
                                        className="form-radio"
                                        checked={PROSVisitDone == 'Y'}
                                        onChange={() => {
                                            handleInputChange(event, 'PROS_VISIT_DONE');
                                            // setErrorMsg('', 'di_gst_yn');
                                        }}
                                    />
                                    <span className="mx-2">Yes</span>

                                    <input
                                        type="radio"
                                        name="default_radio2"
                                        value="N"
                                        className="form-radio"
                                        checked={PROSVisitDone == 'N'}
                                        onChange={() => {
                                            handleInputChange(event, 'PROS_VISIT_DONE');
                                            // setErrorMsg('', 'di_gst_yn');
                                        }}
                                    />
                                    <span>No</span>
                                </label>
                            </div>
                            <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                <label className="formLabel">Prospect Visit Feedback</label>
                                <Select
                                    menuPlacement="top"
                                    menuShouldScrollIntoView={true}
                                    // value={ProsVisitFeedbackIndex !== -1 ? ProsVisitFeedbackList[ProsVisitFeedbackIndex] : null}
                                    value={selectedDropdown.PROSFeedback !== -1 ? ProsVisitFeedbackList[selectedDropdown.PROSFeedback] : null}
                                    options={ProsVisitFeedbackList}
                                    isSearchable={true}
                                    onChange={() => {
                                        handleTypeSelect(event, 'PROS_FEED');
                                        setErrorMsg('', 'ProsFeedback');
                                    }}
                                />
                                {/* {errMsg && errMsg.ProsFeedback ? <div className="mt-1 text-danger">{errMsg.ProsFeedback}</div> : ''} */}
                            </div>
                            <div className="col-span-6 sm:col-span-2 md:col-span-1">
                                <label>Prospect Visit Remarks</label>
                                <textarea
                                    name="dcio_prospect_visit_remarks"
                                    id="dcio_prospect_visit_remarks"
                                    placeholder="Enter Prospect Remarks"
                                    className="form-textarea h-10"
                                    value={VisitDetails.dcio_prospect_visit_remarks}
                                    onChange={() => handleChange(event, 'PROS')}
                                    onFocus={() => {
                                        setErrorMsg('', 'ProsRemarks');
                                    }}
                                />
                                {/* {errMsg && errMsg.ProsRemarks ? <div className="text-danger">{errMsg.ProsRemarks}</div> : ''} */}
                            </div>
                        </div>
                    </fieldset>
                    {LeadDetails && !LeadDetails.IsButtonDisable && (
                        <div className="!my-4 flex items-center justify-center">
                            <button
                                type="button"
                                // className={`btn flex w-auto items-center justify-center text-base ${
                                //     TSIVisitDone == 'Y' && selectedDropdown.TSIFeedback !== -1 && TSIVisitFeedbackList[selectedDropdown.TSIFeedback].value == '100' ? 'btn-danger' : 'btn-success'
                                // }`}
                                className={`btn flex w-auto items-center justify-center text-base ${canCancelLead ? 'btn-danger' : 'btn-success'}`}
                                // className="btn btn-success flex w-auto items-center justify-center text-base"
                                onClick={() => {
                                    VisitAddUpdateDetails();
                                }}
                            >
                                <FeatherIcon className="h-5 w-5" icon="save" />
                                &nbsp;
                                {/* <span>{VisitInfo ? 'Update' : 'Submit'}</span> */}
                                <span>
                                    {/* {TSIVisitDone == 'Y' && selectedDropdown.TSIFeedback !== -1 && TSIVisitFeedbackList[selectedDropdown.TSIFeedback].value == '100'
                                        ? 'Submit For Cancellation'
                                        : VisitInfo
                                        ? 'Update'
                                        : 'Submit'} */}
                                    {canCancelLead ? 'Submit For Cancellation' : VisitInfo ? 'Update' : 'Submit'}
                                </span>
                            </button>
                        </div>
                    )}
                </form>
                {TSIVisitDone == 'Y' && selectedDropdown.TSIFeedback !== -1 && TSIVisitFeedbackList[selectedDropdown.TSIFeedback].value == '100' && (
                    <div className="mb-5">
                        <div className="space-y-2 font-semibold">
                            <div className="rounded border border-[#d3d3d3] dark:border-[#1b2e4b]">
                                <button type="button" className={`flex w-full items-center p-2 !text-primary text-white-dark dark:bg-[#1b2e4b]`} onClick={() => togglePara2('1')}>
                                    <img className="mr-2 h-8 w-auto" src={GetProdDevImgRouteBuilder('/assets/images/search.png')} alt="" />
                                    Conflict Managment
                                    <div className={`ltr:ml-auto rtl:mr-auto ${active2 === '1' ? 'rotate-180' : ''}`}>
                                        <FeatherIcon className="ml-auto h-6 w-6" icon="arrow-down-circle" />
                                    </div>
                                </button>
                                <div>
                                    <AnimateHeight duration={300} height={active2 === '1' ? 'auto' : 0}>
                                        <div className="space-y-2 border-t border-[#d3d3d3] p-4 text-[13px] text-white-dark dark:border-[#1b2e4b]">
                                            <MapView LeadDetails={LeadDetails} onModalButtonHandle={onSelect} />
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </fieldset>
    );
};

export default React.memo(VisitEntry);
