'use client';
import { AddUpdateAppointment, CallLogInsert, GetCallFromToLovList, GetPROSPECTCallDone, GetPROSPECTCallNotDone, GetTSICallDone, GetTSICallNotDone, GetTsiList } from '../../services/api/lead-service';
import { commonAlert } from '../../services/functions/commonAlert';
import { commonErrorToast, commonSuccessToast } from '../../services/functions/commonToast';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import Flatpickr from 'react-flatpickr';
import Select from 'react-select';
import MapView from './Map-View/MapView';
import Appointment from './Appointment/Appointment';
import FeatherIcon from 'feather-icons-react';
import { GetProdDevImgRouteBuilder } from '../../services/functions/getProdDevUrlBuilder';
export interface validationObj {
    CallTo: string;
    FromDateOfCall: string;
    duration: string;
    remarks: string;
    callmade: string;
    Feedback: string;
    TSIError: string;
    saleSpeech: string;
    basicSpeech: string;
    dealerConfirm: string;
    conflictDealer: string;
    NextFollowupDate: string;
    LeadCancel: string;
    pincode: string;
}

export const allErrorMsg: validationObj = {
    FromDateOfCall: '',
    duration: '',
    remarks: '',
    CallTo: '',
    callmade: '',
    Feedback: '',
    TSIError: '',
    saleSpeech: '',
    basicSpeech: '',
    dealerConfirm: '',
    conflictDealer: '',
    NextFollowupDate: '',
    LeadCancel: '',
    pincode: '',
};

export interface SELECTED_DROPDOWN {
    Call_TO: number;
    Feedback: number;
    TSISelect: number;
    // CallFromTO: number;
}
const selectedDropdownInit: SELECTED_DROPDOWN = {
    Call_TO: -1,
    Feedback: -1,
    TSISelect: -1,
    // CallFromTO: -1,
};
let call_name_yn: any = null;
const CallDetailsEntry = ({ LeadDetails, callDetails, onModalButtonHandle, setShowAppointmentModal }: any) => {
    var today: any = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var hours = today.getHours().toString().padStart(2, '0');
    var minutes = today.getMinutes().toString().padStart(2, '0');
    var formattedTime = hours + ':' + minutes;
    today = dd + '/' + mm + '/' + yyyy + ' ' + moment.utc(formattedTime, 'HH:mm').format('hh:mm A');
    const [FromDateOfCall, setFromDateOfCall] = useState<any>(today);
    const [ToDateOfCall, setToDateOfCall] = useState<any>(today);
    const [NextFollowupDate, setNextFollowupDate] = useState<any>(today);
    let CallToType: any = [
        { label: 'TSI', value: 'SO' },
        { label: 'Prospect', value: 'Prospect' },
    ];

    let TSIFeedbackCancelBtnShowStatus = ['100', '200', '300'];
    let ProspectFeedbackCancelBtnShowStatus = ['100'];
    const [canCancelLead, setcanCancelLead] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<validationObj>(allErrorMsg);
    const [selectedDropdown, setSelectedDropdown] = useState<SELECTED_DROPDOWN>(selectedDropdownInit);
    const [TSIFeedBackList, SetTSIFeedBackList] = useState<any>([]);
    const [TSIList, SetTSIList] = useState<any>([]);
    const [CallFromToList, SetCallFromToList] = useState<any>([]);
    const [CallEntryDetails, SetCallEntryDetails] = useState<any>({
        enq_Id: '',
        lead_id: '',
        call_to: null,
        to_mobile: null,
        from_mobile: null,
        call_id: '',
        call_remarks: null,
        start_time: null, //"2024-01-11T11:03:29.627Z",
        //end_time: null, //"2024-01-11T11:03:29.627Z",
        tsi_call_made_yn: null,
        tsi_call_feedback: null,
        tsi_call_remarks: null,
        propect_call_made_yn: null,
        propect_call_feedback: null,
        propect_call_remarks: null,
        durationInMinutes: '',
        lcl_call_from_to_code: '',
        lcl_basic_speech_delivered_yn: 'Y',
        lcl_reconfirm_interested_yn: 'Y',
        lcl_sale_speech_delivered_yn: 'Y',
        lcl_conflict_dealer_code: null,
        lcl_conflict_dealer_distance: null,
        lcl_conflict_dealer_business_value: null,
        di_next_followup_date: null,
        lcl_cancelation_request_yn: 'N',
        call_from_user_id: null,
        call_from_name: null,
        call_to_user_id: null,
        call_to_name: null,
        non_serviceable_pin: null,
    });
    const [pincode, setPincode] = useState<any>(null);
    const [ConflictDealer, setConflictDealer] = useState<any>([]);
    useEffect(() => {
        GetCallFromToList();
        LeadDetails.Appointmentflag = '';
        selectedDropdown.Feedback = -1;
        if (LeadDetails) {
            LeadDetails.tabFlag = 'DealerMapForConflict';
            SetCallEntryDetails((prev) => ({ ...prev, enq_Id: LeadDetails.ef_id, lead_id: LeadDetails.lh_id }));
        }
        if (callDetails != '') {
            SetCallEntryDetails((prev) => ({ ...prev, call_id: callDetails !== '' ? callDetails.lcl_id : null }));
            if (callDetails.lcl_start_time != null) {
                setFromDateOfCall(moment.utc(callDetails.lcl_start_time).format('DD/MM/YYYY HH:mm A'));
                SetCallDuration(callDetails.call_duration);
            }
            if (callDetails.lcl_next_followup_date != null) {
                setNextFollowupDate(moment(callDetails.lcl_next_followup_date).format('DD/MM/YYYY'));
            }
            callDetails.lcl_end_time != null ? setToDateOfCall(moment.utc(callDetails.lcl_end_time).format('DD/MM/YYYY')) : setToDateOfCall(today);
            if (callDetails.lcl_call_from_to_code != null) {
                if (callDetails.lcl_call_from_to_code == 'DLC_TO_TSI' || callDetails.lcl_call_from_to_code == 'TSI_TO_PROSPECT') {
                    GetTSIList();
                    setcallRemarks(callDetails.lcl_tsi_call_remarks == null ? '' : callDetails.lcl_tsi_call_remarks);
                    if (callDetails.lcl_tsi_call_made_yn == 'Y') {
                        GetTSICallMadeList(callDetails.lcl_tsi_call_feedback);
                    } else if (callDetails.lcl_tsi_call_made_yn == 'N') {
                        GetTSICallNotMadeList(callDetails.lcl_tsi_call_feedback);
                    }

                    // setConflictDealer({})
                } else if (callDetails.lcl_call_from_to_code == 'DLC_TO_PROSPECT') {
                    setcallRemarks(callDetails.lcl_prospect_call_remarks == null ? '' : callDetails.lcl_prospect_call_remarks);
                    if (callDetails.lcl_propect_call_made_yn == 'Y') {
                        GetProspectCallMadeList(callDetails.lcl_prospect_call_feedback);
                    } else if (callDetails.lcl_propect_call_made_yn == 'N') {
                        GetProspectCallNotMadeList(callDetails.lcl_prospect_call_feedback);
                    }
                }
            }
            if (callDetails.lcl_tsi_call_made_yn != null) call_name_yn = callDetails.lcl_tsi_call_made_yn;
            if (callDetails.lcl_propect_call_made_yn != null) call_name_yn = callDetails.lcl_propect_call_made_yn;
            if (callDetails.lcl_basic_speech_delivered_yn != null) CallEntryDetails.lcl_basic_speech_delivered_yn = callDetails.lcl_basic_speech_delivered_yn;
            if (callDetails.lcl_reconfirm_interested_yn != null) CallEntryDetails.lcl_reconfirm_interested_yn = callDetails.lcl_reconfirm_interested_yn;
            if (callDetails.lcl_sale_speech_delivered_yn != null) CallEntryDetails.lcl_sale_speech_delivered_yn = callDetails.lcl_sale_speech_delivered_yn;
            // if(callDetails.lcl_tsi_call_feedback)
            if (callDetails.lcl_conflict_dealer_code != null && callDetails.lcl_conflict_dealer_code != '') {
                let flag = { dealer_code: callDetails.lcl_conflict_dealer_code, dealer_name: callDetails.conflict_dealer, distance: { distance: callDetails.lcl_conflict_dealer_distance } };
                flag['value'] = flag['dealer_code'];
                flag['label'] = flag['dealer_code'] + '- ' + flag['dealer_name'];
                setErrorMsg('', 'conflictDealer');
                setConflictDealer(flag);
                // LeadDetails.dealer_code = flag['label'];
            }
            if (callDetails.non_serviceable_pin != null) CallEntryDetails.non_serviceable_pin = callDetails.non_serviceable_pin;
        }
    }, []);
    const [callRemarks, setcallRemarks] = useState<any>('');
    const [CallDuration, SetCallDuration] = useState<any>('');
    const getDate = (date: any, flag: 'FromDate' | 'ToDate' | 'nextFollowupdate') => {
        if (flag == 'FromDate' && date) setFromDateOfCall(moment(date[0]).format('DD/MM/YYYY hh:mm A'));
        if (flag == 'ToDate' && date) setToDateOfCall(moment(date[0]).format('DD/MM/YYYY'));
        if (flag == 'nextFollowupdate' && date) setNextFollowupDate(moment(date[0]).format('DD/MM/YYYY'));
    };

    const setErrorMsg = (msg: string, prop: string) => {
        setErrMsg((prev) => ({ ...prev, [`${prop}`]: msg }));
    };

    const findSelectedTypeValue = (arr: any[], arrPropName: string, checkValue: string) => {
        if (arr && arr.length > 0) {
            const selectedValue = arr.findIndex((item: any) => item[arrPropName] == checkValue);
            return selectedValue == -1 ? -1 : selectedValue;
        } else {
            return -1;
        }
    };

    const handleTypeSelect = (e: any, flag: 'Call_TO' | 'Feedback' | 'TSI') => {
        if (flag == 'Call_TO' && e && e.target.innerText) {
            setSelectedDropdown((prev) => ({ ...prev, Feedback: -1 }));
            SetTSIFeedBackList([]);
            setcallRemarks('');
            setcanCancelLead(false);
            call_name_yn = 'Y';
            if (e.target.innerText == 'Call to TSI' || e.target.innerText == 'TSI to Prospect') {
                GetTSIList();
                if (call_name_yn == 'Y') {
                    GetTSICallMadeList('');
                } else {
                    GetTSICallNotMadeList('');
                }
            } else if (e.target.innerText == 'Call to Prospect') {
                SetTSIList([]);
                setSelectedDropdown((prev) => ({ ...prev, TSISelect: -1 }));
                if (call_name_yn == 'Y') {
                    GetProspectCallMadeList('');
                } else {
                    GetProspectCallNotMadeList('');
                }
            } else {
                SetTSIList([]);
                setSelectedDropdown((prev) => ({ ...prev, TSISelect: -1 }));
            }
            setSelectedDropdown((prev) => ({ ...prev, Call_TO: findSelectedTypeValue(CallFromToList, 'label', e.target.innerText) }));
        }
        if (flag == 'Feedback' && e && e.target.innerText) {
            setConflictDealer(null);
            let FeedbackIndex = findSelectedTypeValue(TSIFeedBackList, 'lov_value', e.target.innerText);
            setSelectedDropdown((prev) => ({ ...prev, Feedback: FeedbackIndex }));

            if (e.target.innerText == 'Interested in visit and Face-to-Face Pitch' || e.target.innerText == 'Got Potential, need visit appointment') {
                LeadDetails.Appointmentflag = 'Call_Details';
            } else {
                LeadDetails.Appointmentflag = '';
            }
            if (call_name_yn == 'Y') {
                if (
                    (CallFromToList[selectedDropdown.Call_TO].value == 'TSI_TO_PROSPECT' || CallFromToList[selectedDropdown.Call_TO].value == 'DLC_TO_TSI') &&
                    FeedbackIndex !== -1 &&
                    TSIFeedbackCancelBtnShowStatus.includes(TSIFeedBackList[FeedbackIndex].value)
                ) {
                    setcanCancelLead(true);
                } else if (
                    CallFromToList[selectedDropdown.Call_TO].value == 'DLC_TO_PROSPECT' &&
                    FeedbackIndex !== -1 &&
                    ProspectFeedbackCancelBtnShowStatus.includes(TSIFeedBackList[FeedbackIndex].value)
                ) {
                    setcanCancelLead(true);
                } else {
                    setcanCancelLead(false);
                }
            } else {
                setcanCancelLead(false);
            }
        }
        if (flag == 'TSI' && e && e.target.innerText) setSelectedDropdown((prev) => ({ ...prev, TSISelect: findSelectedTypeValue(TSIList, 'label', e.target.innerText) }));
    };

    const handleInputChange = async (e: any) => {
        if (selectedDropdown.Call_TO !== -1) {
            call_name_yn = e.target.value;
            if (CallFromToList[selectedDropdown.Call_TO].value == 'DLC_TO_TSI' || CallFromToList[selectedDropdown.Call_TO].value == 'TSI_TO_PROSPECT') {
                CallEntryDetails.tsi_call_made_yn = e.target.value;
                if (e.target.value == 'Y') {
                    GetTSICallMadeList('');
                } else {
                    GetTSICallNotMadeList('');
                }
            } else {
                CallEntryDetails.propect_call_made_yn = e.target.value;
                if (e.target.value == 'Y') {
                    GetProspectCallMadeList('');
                } else {
                    GetProspectCallNotMadeList('');
                }
            }
        } else {
            commonErrorToast('Select Call To First');
        }
    };

    const handelChangeinInput = async (e: any) => {
        setcallRemarks(e.target.value);
    };

    const labelValueConverter = (arr: any[], propertyNameLabel: string, propertyNameValue: string) => {
        arr.forEach((element) => {
            element['value'] = element[propertyNameValue];
            element['label'] = element[propertyNameLabel];
        });
        return arr;
    };

    const GetTSICallMadeList = async (code: any) => {
        let userDetails: any = JSON.parse(localStorage.getItem('auth') || '');

        const data = {
            userId: userDetails.state.userDetails.user_id,
        };

        try {
            const response = await GetTSICallDone(data);
            labelValueConverter(response.data, 'lov_value', 'lov_code');
            SetTSIFeedBackList(response.data);
            if (code != '') {
                setSelectedDropdown((prev) => ({ ...prev, Feedback: findSelectedTypeValue(response.data, 'lov_code', code) }));
                if (code == '400') {
                    LeadDetails.Appointmentflag = 'Call_Details';
                } else {
                    LeadDetails.Appointmentflag = '';
                }
            } else {
                setSelectedDropdown((prev) => ({ ...prev, Feedback: -1 }));
            }
        } catch (error) {
            return;
        }
    };
    const GetTSIList = async () => {
        const data = {
            depot: LeadDetails.lh_depot_code,
            terr: LeadDetails.lh_terr_code,
        };

        try {
            const response = await GetTsiList(data);
            // if (response.data.length == 1) {
            //     setSelectedDropdown((prev) => ({ ...prev, TSISelect: 0 }));
            // }
            response.data.forEach((element: any) => {
                element['value'] = element['userId'];
                element['label'] = element['terrCode'] + ': ' + element['fullName'] + ' (' + element['userId'] + ') ' + element['mobile'];
            });
            // labelValueConverter(response.data, 'fullName', 'userId');

            if (callDetails != '' && callDetails.lcl_call_from_to_code != null && callDetails.lcl_call_from_to_code == 'DLC_TO_TSI' && callDetails.lcl_call_to_user_id) {
                setSelectedDropdown((prev) => ({ ...prev, TSISelect: findSelectedTypeValue(response.data, 'userId', callDetails.lcl_call_to_user_id) }));
            } else if (callDetails != '' && callDetails.lcl_call_from_to_code != null && callDetails.lcl_call_from_to_code == 'TSI_TO_PROSPECT' && callDetails.lcl_call_from_user_id) {
                setSelectedDropdown((prev) => ({ ...prev, TSISelect: findSelectedTypeValue(response.data, 'userId', callDetails.lcl_call_from_user_id) }));
            } else if (response.data.length == 1) {
                setSelectedDropdown((prev) => ({ ...prev, TSISelect: 0 }));
            }
            SetTSIList(response.data);
        } catch (error) {
            return;
        }
    };

    const GetCallFromToList = async () => {
        let userDetails: any = JSON.parse(localStorage.getItem('auth') || '');

        const data = {
            userId: userDetails.state.userDetails.user_id,
        };

        try {
            const response = await GetCallFromToLovList(data);
            labelValueConverter(response.data, 'lov_value', 'lov_code');
            SetCallFromToList(response.data);
            if (callDetails != '' && callDetails.lcl_call_from_to_code != null) {
                setSelectedDropdown((prev) => ({ ...prev, Call_TO: findSelectedTypeValue(response.data, 'lov_code', callDetails.lcl_call_from_to_code) }));
            } else {
                setSelectedDropdown((prev) => ({ ...prev, Call_TO: -1 }));
            }
        } catch (error) {
            return;
        }
    };
    const GetTSICallNotMadeList = async (code: any) => {
        let userDetails: any = JSON.parse(localStorage.getItem('auth') || '');

        const data = {
            userId: userDetails.state.userDetails.user_id,
        };

        try {
            const response = await GetTSICallNotDone(data);
            labelValueConverter(response.data, 'lov_value', 'lov_code');
            SetTSIFeedBackList(response.data);
            if (code != '') {
                setSelectedDropdown((prev) => ({ ...prev, Feedback: findSelectedTypeValue(response.data, 'lov_code', code) }));
            } else {
                setSelectedDropdown((prev) => ({ ...prev, Feedback: -1 }));
            }
        } catch (error) {
            return;
        }
    };

    const GetProspectCallMadeList = async (code: any) => {
        let userDetails: any = JSON.parse(localStorage.getItem('auth') || '');

        const data = {
            userId: userDetails.state.userDetails.user_id,
        };

        try {
            const response = await GetPROSPECTCallDone(data);
            labelValueConverter(response.data, 'lov_value', 'lov_code');
            SetTSIFeedBackList(response.data);
            if (code != '') {
                setSelectedDropdown((prev) => ({ ...prev, Feedback: findSelectedTypeValue(response.data, 'lov_code', code) }));

                if (code == '300') {
                    LeadDetails.Appointmentflag = 'Call_Details';
                } else {
                    LeadDetails.Appointmentflag = '';
                }
            } else {
                setSelectedDropdown((prev) => ({ ...prev, Feedback: -1 }));
            }
        } catch (error) {
            return;
        }
    };

    const GetProspectCallNotMadeList = async (code: any) => {
        let userDetails: any = JSON.parse(localStorage.getItem('auth') || '');

        const data = {
            userId: userDetails.state.userDetails.user_id,
        };

        try {
            const response = await GetPROSPECTCallNotDone(data);
            labelValueConverter(response.data, 'lov_value', 'lov_code');
            SetTSIFeedBackList(response.data);
            if (code != '') {
                setSelectedDropdown((prev) => ({ ...prev, Feedback: findSelectedTypeValue(response.data, 'lov_code', code) }));
            } else {
                setSelectedDropdown((prev) => ({ ...prev, Feedback: -1 }));
            }
        } catch (error) {
            return;
        }
    };

    const addCallDetails = async () => {
        let userDetails: any = JSON.parse(localStorage.getItem('auth') || '');
        CallEntryDetails.start_time = call_name_yn == 'Y' ? await formateDateTime(FromDateOfCall) : null;
        CallEntryDetails.durationInMinutes = call_name_yn == 'Y' ? CallDuration : null;
        CallEntryDetails.call_to =
            CallFromToList[selectedDropdown.Call_TO].value == 'DLC_TO_TSI'
                ? 'SO'
                : CallFromToList[selectedDropdown.Call_TO].value == 'DLC_TO_PROSPECT' || CallFromToList[selectedDropdown.Call_TO].value == 'TSI_TO_PROSPECT'
                ? 'Prospect'
                : null; //selectedDropdown.Call_TO !== -1 ? CallFromToList[selectedDropdown.Call_TO].value : null;
        // CallEntryDetails.end_time = call_name_yn == 'Y' ? await formateDateTime(ToDateOfCall) : null;
        // CallEntryDetails.created_user = userDetails.state.userDetails.user_id;
        CallEntryDetails.lcl_call_from_to_code = selectedDropdown.Call_TO !== -1 ? CallFromToList[selectedDropdown.Call_TO].value : null;
        // CallEntryDetails.to_mobile = selectedDropdown.Call_TO !== -1 ? CallFromToList[selectedDropdown.Call_TO].mobile : null;
        if (selectedDropdown.Call_TO !== -1 && (CallFromToList[selectedDropdown.Call_TO].value == 'DLC_TO_TSI' || CallFromToList[selectedDropdown.Call_TO].value == 'TSI_TO_PROSPECT')) {
            CallEntryDetails.tsi_call_feedback = selectedDropdown.Feedback !== -1 ? TSIFeedBackList[selectedDropdown.Feedback].lov_code : '';
            CallEntryDetails.tsi_call_remarks = callRemarks;
            CallEntryDetails.tsi_call_made_yn = call_name_yn;
            CallEntryDetails.lcl_sale_speech_delivered_yn = call_name_yn == 'Y' ? CallEntryDetails.lcl_sale_speech_delivered_yn : null;
            CallEntryDetails.lcl_basic_speech_delivered_yn = null;
            CallEntryDetails.lcl_reconfirm_interested_yn = null;
            if (call_name_yn == 'Y' && selectedDropdown.Feedback !== -1 && TSIFeedBackList[selectedDropdown.Feedback].value == '100') {
                CallEntryDetails.lcl_conflict_dealer_code = ConflictDealer != null ? ConflictDealer.dealer_code : null;
                CallEntryDetails.lcl_conflict_dealer_distance = ConflictDealer != null ? ConflictDealer.distance.distance : null;
                CallEntryDetails.lcl_conflict_dealer_business_value = ConflictDealer != null ? ConflictDealer.sales_value : null;
                CallEntryDetails.lcl_cancelation_request_yn = 'Y';
            }
            if (CallFromToList[selectedDropdown.Call_TO].value == 'DLC_TO_TSI') {
                CallEntryDetails.call_from_user_id = userDetails.state.userDetails.user_id;
                CallEntryDetails.call_from_name = userDetails.state.userDetails.first_name + ' ' + userDetails.state.userDetails.last_name;
                CallEntryDetails.from_mobile = userDetails.state.userDetails.mobile;
                CallEntryDetails.to_mobile = selectedDropdown.TSISelect !== -1 ? TSIList[selectedDropdown.TSISelect].mobile : '';
                CallEntryDetails.call_to_user_id = selectedDropdown.TSISelect !== -1 ? TSIList[selectedDropdown.TSISelect].userId : '';
                CallEntryDetails.call_to_name = selectedDropdown.TSISelect !== -1 ? TSIList[selectedDropdown.TSISelect].fullName : '';
            }
            if (CallFromToList[selectedDropdown.Call_TO].value == 'TSI_TO_PROSPECT') {
                CallEntryDetails.call_from_user_id = selectedDropdown.TSISelect !== -1 ? TSIList[selectedDropdown.TSISelect].userId : '';
                CallEntryDetails.call_from_name = selectedDropdown.TSISelect !== -1 ? TSIList[selectedDropdown.TSISelect].fullName : '';
                CallEntryDetails.from_mobile = selectedDropdown.TSISelect !== -1 ? TSIList[selectedDropdown.TSISelect].mobile : '';
                CallEntryDetails.to_mobile = LeadDetails.cm_customer_mobile_no;
                CallEntryDetails.call_to_user_id = null;
                CallEntryDetails.call_to_name = LeadDetails.cm_customer_name;
            }
            // non_serviceable_pin section start
            if (call_name_yn == 'Y' && selectedDropdown.Feedback !== -1 && TSIFeedBackList[selectedDropdown.Feedback].value == '200') {
                CallEntryDetails.non_serviceable_pin = pincode ? pincode : null;
            } else {
                CallEntryDetails.non_serviceable_pin = null;
            }
            // non_serviceable_pin section end
        } else if (selectedDropdown.Call_TO !== -1 && CallFromToList[selectedDropdown.Call_TO].value == 'DLC_TO_PROSPECT') {
            CallEntryDetails.propect_call_made_yn = call_name_yn;
            CallEntryDetails.lcl_basic_speech_delivered_yn = call_name_yn == 'Y' ? CallEntryDetails.lcl_basic_speech_delivered_yn : null;
            CallEntryDetails.lcl_reconfirm_interested_yn = call_name_yn == 'Y' ? CallEntryDetails.lcl_reconfirm_interested_yn : null;
            CallEntryDetails.lcl_sale_speech_delivered_yn = null;
            CallEntryDetails.propect_call_feedback = selectedDropdown.Feedback !== -1 ? TSIFeedBackList[selectedDropdown.Feedback].lov_code : '';
            CallEntryDetails.propect_call_remarks = callRemarks;
            if (call_name_yn == 'Y' && selectedDropdown.Feedback !== -1 && TSIFeedBackList[selectedDropdown.Feedback].value == '200') {
                CallEntryDetails.di_next_followup_date = moment(NextFollowupDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
            }
            CallEntryDetails.call_from_user_id = userDetails.state.userDetails.user_id;
            CallEntryDetails.call_from_name = userDetails.state.userDetails.first_name + ' ' + userDetails.state.userDetails.last_name;
            CallEntryDetails.from_mobile = userDetails.state.userDetails.mobile;
            CallEntryDetails.to_mobile = LeadDetails.cm_customer_mobile_no;
            CallEntryDetails.call_to_user_id = null;
            CallEntryDetails.call_to_name = LeadDetails.cm_customer_name;
            CallEntryDetails.non_serviceable_pin = null;
        }
        let errorCount = 0;
        if (CallEntryDetails.lcl_call_from_to_code == null || CallEntryDetails.lcl_call_from_to_code == '') {
            setErrorMsg('Call To Missing', 'CallTo');
            errorCount++;
        }
        if (call_name_yn == null) {
            setErrorMsg('Call Made Missing', 'callmade');
            errorCount++;
        }
        if (call_name_yn == 'Y' && (CallEntryDetails.start_time == '' || CallEntryDetails.start_time == null)) {
            setErrorMsg('From Date Time Missing', 'FromDateOfCall');
            errorCount++;
        }
        if (call_name_yn == 'Y' && (CallEntryDetails.durationInMinutes == '' || CallEntryDetails.durationInMinutes == null)) {
            setErrorMsg('Duration Missing', 'duration');
            errorCount++;
        }
        if (
            selectedDropdown.Call_TO !== -1 &&
            (CallFromToList[selectedDropdown.Call_TO].value == 'DLC_TO_TSI' || CallFromToList[selectedDropdown.Call_TO].Value == 'TSI_TO_PROSPECT') &&
            CallEntryDetails.tsi_call_feedback == ''
        ) {
            setErrorMsg('Feedback Missing', 'Feedback');
            errorCount++;
        }
        if (
            selectedDropdown.Call_TO !== -1 &&
            (CallFromToList[selectedDropdown.Call_TO].value == 'DLC_TO_TSI' || CallFromToList[selectedDropdown.Call_TO].Value == 'TSI_TO_PROSPECT') &&
            CallEntryDetails.tsi_call_feedback == ''
        ) {
            setErrorMsg('Feedback Missing', 'Feedback');
            errorCount++;
        }
        if (
            selectedDropdown.Call_TO !== -1 &&
            (CallFromToList[selectedDropdown.Call_TO].value == 'DLC_TO_TSI' || CallFromToList[selectedDropdown.Call_TO].Value == 'TSI_TO_PROSPECT') &&
            CallEntryDetails.call_to == ''
        ) {
            setErrorMsg('TSI Missing', 'TSIError');
            errorCount++;
        }
        // if (
        //     selectedDropdown.Call_TO !== -1 &&
        //     (CallFromToList[selectedDropdown.Call_TO].value == 'DLC_TO_TSI' || CallFromToList[selectedDropdown.Call_TO].Value == 'TSI_TO_PROSPECT' || CallFromToList[selectedDropdown.Call_TO].value == 'DLC_TO_PROSPECT') &&
        //     CallEntryDetails.tsi_call_remarks == ''
        // ) {
        //     setErrorMsg('Remarks Missing', 'remarks');
        //     errorCount++;
        // }
        if (selectedDropdown.Call_TO !== -1 && CallFromToList[selectedDropdown.Call_TO].value == 'DLC_TO_PROSPECT' && CallEntryDetails.propect_call_feedback == '') {
            setErrorMsg('Feedback Missing', 'Feedback');
            errorCount++;
        }
        if (
            selectedDropdown.Feedback !== -1 &&
            TSIFeedBackList[selectedDropdown.Feedback].label == 'Not Interested after Telephonic Pitch' &&
            (CallEntryDetails.lcl_basic_speech_delivered_yn == 'N' || CallEntryDetails.lcl_basic_speech_delivered_yn == null)
        ) {
            setErrorMsg('Telephonic Speech Missing', 'basicSpeech');
            errorCount++;
        }

        if (
            selectedDropdown.Feedback !== -1 &&
            TSIFeedBackList[selectedDropdown.Feedback].label == 'Lead lost – Conflict in the area' &&
            (CallEntryDetails.lcl_conflict_dealer_code == '' || CallEntryDetails.lcl_conflict_dealer_code == null)
        ) {
            setErrorMsg('Conflict Dealer is missing', 'conflictDealer');
            errorCount++;
        }
        if (
            selectedDropdown.Feedback !== -1 &&
            TSIFeedBackList[selectedDropdown.Feedback].label == 'Need Follow-up at Later Date' &&
            (CallEntryDetails.di_next_followup_date == null || CallEntryDetails.di_next_followup_date == '')
        ) {
            setErrorMsg('Next Followup date is missing', 'NextFollowupDate');
            errorCount++;
        }

        // non_serviceable_pin section start
        if (
            selectedDropdown.Call_TO !== -1 &&
            (CallFromToList[selectedDropdown.Call_TO].value == 'DLC_TO_TSI' || CallFromToList[selectedDropdown.Call_TO].value == 'TSI_TO_PROSPECT') &&
            call_name_yn == 'Y' &&
            selectedDropdown.Feedback !== -1 &&
            TSIFeedBackList[selectedDropdown.Feedback].value == '200' &&
            (CallEntryDetails.non_serviceable_pin == null || CallEntryDetails.non_serviceable_pin == '')
        ) {
            setErrorMsg('Pincode Missing', 'pincode');
            errorCount++;
        }
        // non_serviceable_pin section end
        if (errorCount == 0) {
            if (LeadDetails.Appointmentflag !== 'Call_Details') {
                commonAlert('Are You Sure?', 'If you click confirm the record will be submitted. To cancel please press cancel button.', 'warning').then(async (result: any) => {
                    if (result.value) {
                        try {
                            const response = await CallLogInsert(CallEntryDetails);
                            if (response.response_message) {
                                commonSuccessToast(response.response_message);
                                onModalButtonHandle('Call');
                            } else {
                                commonErrorToast(response.errorMessage);
                            }
                        } catch (error) {
                            return;
                        }
                    }
                });
            } else {
                try {
                    const response = await CallLogInsert(CallEntryDetails);
                    if (response.response_message) {
                        commonSuccessToast(response.response_message);
                        onModalButtonHandle('Call');
                    }
                } catch (error) {
                    return;
                }
            }
        }
    };

    const handleOnSubmit = async (AppointmentDetais: any) => {
        try {
            const response = await AddUpdateAppointment(AppointmentDetais);
            if (response.response_message) {
                commonSuccessToast(response.response_message);
                addCallDetails();
            }
        } catch (error) {
            return;
        }
    };

    const formateDateTime = async (date: any) => {
        let nextFormatedDate = date; //moment(date).format('DD/MM/YYYY HH:mm A');
        let nextFollowupDate = moment(date, 'DD/MM/YYYY HH:mm A');
        const formattedDate = nextFollowupDate.format('YYYY-MM-DDTHH:mm:ss[Z]');
        // var dateParts = nextFormatedDate.split(/[\s/:\-]+/);
        // var year = parseInt(dateParts[2], 10);
        // var month = parseInt(dateParts[1], 10) - 1; // Months are 0-indexed in JavaScript
        // var day = parseInt(dateParts[0], 10);
        // var hour = parseInt(dateParts[3], 10);
        // var minute = parseInt(dateParts[4], 10);
        // var dateObject = new Date(year, month, day, hour, minute);
        // Format the date as "YYYY-MM-DDTHH:mm:ss[Z]"
        // var formattedDate = moment(dateObject).format().replace('+05:30', 'Z');
        // let nextFollowupDate = moment(date, 'DD/MM/YYYY');
        // const formattedDate = nextFollowupDate.format('YYYY-MM-DDTHH:mm:ss[Z]');
        //dateObject.toISOString().replace(/\.\d{3}Z$/, 'Z');
        return formattedDate;
    };

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
        setErrorMsg('', 'conflictDealer');
        setConflictDealer(flag);
    };

    return (
        <>
            <div className=" bg-white text-[13px]">
                <form className=" space-y-5 p-3">
                    <div className="grid grid-cols-3 grid-rows-1 gap-4">
                        <div className="col-span-4 sm:col-span-2 md:col-span-1">
                            <label className="formLabel">
                                Call To <span className="reqired">*</span>
                            </label>
                            <Select
                                value={CallFromToList[selectedDropdown.Call_TO]}
                                options={CallFromToList}
                                isSearchable={true}
                                isDisabled={callDetails != ''}
                                onChange={() => {
                                    handleTypeSelect(event, 'Call_TO');
                                    setErrorMsg('', 'call_tp');
                                }}
                            />
                            {errMsg && errMsg.CallTo ? <div className="mt-1 text-danger">{errMsg.CallTo}</div> : ''}
                        </div>

                        <div className="col-span-4 sm:col-span-2 md:col-span-1">
                            <label>
                                Call Made? <span className="reqired">*</span>
                            </label>
                            <label className="inline-flex">
                                <input
                                    type="radio"
                                    name="default_radio"
                                    value="Y"
                                    className="form-radio mx-2"
                                    checked={call_name_yn == 'Y'}
                                    onChange={() => {
                                        handleInputChange(event);
                                        setErrorMsg('', 'callmade');
                                    }}
                                />
                                <span className="mx-2">Yes</span>

                                <input
                                    type="radio"
                                    name="default_radio"
                                    value="N"
                                    className="form-radio"
                                    checked={call_name_yn == 'N'}
                                    onChange={() => {
                                        handleInputChange(event);
                                        setErrorMsg('', 'callmade');
                                    }}
                                />
                                <span>No</span>
                            </label>
                            {errMsg && errMsg.callmade ? <div className="mt-1 text-danger">{errMsg.callmade}</div> : ''}
                        </div>

                        {selectedDropdown.Call_TO != -1 && CallFromToList[selectedDropdown.Call_TO].value == 'DLC_TO_PROSPECT' && call_name_yn == 'Y' && (
                            <>
                                <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                    <label>
                                        Telephonic Speech Delivered<span className="reqired">*</span>
                                    </label>
                                    {/* <input
                                        defaultChecked={CallEntryDetails.lcl_basic_speech_delivered_yn === 'Y'}
                                        type="checkbox"
                                        className="form-checkbox"
                                        onChange={(e) => {
                                            CallEntryDetails.lcl_basic_speech_delivered_yn = e.target.checked ? 'Y' : 'N';
                                            setErrorMsg('', 'basicSpeech');
                                        }}
                                    /> */}

                                    <input
                                        type="radio"
                                        name="lcl_basic_speech_delivered_yn"
                                        value="Y"
                                        className="form-radio mx-2"
                                        checked={CallEntryDetails.lcl_basic_speech_delivered_yn == 'Y'}
                                        onChange={(e) => {
                                            SetCallEntryDetails((prev) => ({ ...prev, lcl_basic_speech_delivered_yn: e.target.value }));
                                            setErrorMsg('', 'basicSpeech');
                                        }}
                                    />
                                    <span className="mx-2">Yes</span>

                                    <input
                                        type="radio"
                                        name="lcl_basic_speech_delivered_yn"
                                        value="N"
                                        className="form-radio"
                                        checked={CallEntryDetails.lcl_basic_speech_delivered_yn == 'N'}
                                        onChange={(e) => {
                                            SetCallEntryDetails((prev) => ({ ...prev, lcl_basic_speech_delivered_yn: e.target.value }));
                                            setErrorMsg('', 'basicSpeech');
                                        }}
                                    />
                                    <span>No</span>
                                    {errMsg && errMsg.basicSpeech ? <div className="mt-1 text-danger">{errMsg.basicSpeech}</div> : ''}
                                </div>
                                <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                    <label>
                                        Reconfirmation Dealership<span className="reqired">*</span>
                                    </label>
                                    {/* <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        defaultChecked={CallEntryDetails.lcl_reconfirm_interested_yn === 'Y'}
                                        onChange={(e) => {
                                            CallEntryDetails.lcl_reconfirm_interested_yn = e.target.checked ? 'Y' : 'N';
                                            setErrorMsg('', 'dealerConfirm');
                                        }}
                                    /> */}
                                    <input
                                        type="radio"
                                        name="lcl_reconfirm_interested_yn"
                                        value="Y"
                                        className="form-radio mx-2"
                                        checked={CallEntryDetails.lcl_reconfirm_interested_yn == 'Y'}
                                        onChange={(e) => {
                                            SetCallEntryDetails((prev) => ({ ...prev, lcl_reconfirm_interested_yn: e.target.value }));
                                            setErrorMsg('', 'dealerConfirm');
                                        }}
                                    />
                                    <span className="mx-2">Yes</span>

                                    <input
                                        type="radio"
                                        name="lcl_reconfirm_interested_yn"
                                        value="N"
                                        className="form-radio"
                                        checked={CallEntryDetails.lcl_reconfirm_interested_yn == 'N'}
                                        onChange={(e) => {
                                            SetCallEntryDetails((prev) => ({ ...prev, lcl_reconfirm_interested_yn: e.target.value }));
                                            setErrorMsg('', 'dealerConfirm');
                                        }}
                                    />
                                    <span>No</span>
                                    {errMsg && errMsg.dealerConfirm ? <div className="mt-1 text-danger">{errMsg.dealerConfirm}</div> : ''}
                                </div>
                            </>
                        )}
                        {selectedDropdown.Call_TO != -1 &&
                            (CallFromToList[selectedDropdown.Call_TO].value == 'TSI_TO_PROSPECT' || CallFromToList[selectedDropdown.Call_TO].value == 'DLC_TO_TSI') &&
                            call_name_yn == 'Y' && (
                                <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                    <label>
                                        Sales Speech Delivered<span className="reqired">*</span>
                                    </label>
                                    {/* <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        defaultChecked={CallEntryDetails.lcl_sale_speech_delivered_yn === 'Y'}
                                        onChange={(e) => {
                                            CallEntryDetails.lcl_sale_speech_delivered_yn = e.target.checked ? 'Y' : 'N';
                                            setErrorMsg('', 'saleSpeech');
                                        }}
                                    /> */}

                                    <input
                                        type="radio"
                                        name="lcl_sale_speech_delivered_yn"
                                        value="Y"
                                        className="form-radio mx-2"
                                        checked={CallEntryDetails.lcl_sale_speech_delivered_yn == 'Y'}
                                        onChange={(e) => {
                                            SetCallEntryDetails((prev) => ({ ...prev, lcl_sale_speech_delivered_yn: e.target.value }));
                                            setErrorMsg('', 'saleSpeech');
                                        }}
                                    />
                                    <span className="mx-2">Yes</span>

                                    <input
                                        type="radio"
                                        name="lcl_sale_speech_delivered_yn"
                                        value="N"
                                        className="form-radio"
                                        checked={CallEntryDetails.lcl_sale_speech_delivered_yn == 'N'}
                                        onChange={(e) => {
                                            SetCallEntryDetails((prev) => ({ ...prev, lcl_sale_speech_delivered_yn: e.target.value }));
                                            setErrorMsg('', 'saleSpeech');
                                        }}
                                    />
                                    <span>No</span>
                                    {errMsg && errMsg.saleSpeech ? <div className="mt-1 text-danger">{errMsg.saleSpeech}</div> : ''}
                                </div>
                            )}
                        {selectedDropdown.Call_TO != -1 && (CallFromToList[selectedDropdown.Call_TO].value == 'DLC_TO_TSI' || CallFromToList[selectedDropdown.Call_TO].value == 'TSI_TO_PROSPECT') && (
                            <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                <label className="formLabel">
                                    TSI<span className="reqired">*</span>
                                </label>
                                <Select
                                    value={selectedDropdown.TSISelect !== -1 ? TSIList[selectedDropdown.TSISelect] : null}
                                    options={TSIList}
                                    isSearchable={true}
                                    onChange={() => {
                                        handleTypeSelect(event, 'TSI');
                                        setErrorMsg('', 'TSIError');
                                    }}
                                />
                                {errMsg && errMsg.TSIError ? <div className="mt-1 text-danger">{errMsg.TSIError}</div> : ''}
                            </div>
                        )}
                        {call_name_yn == 'Y' && (
                            <>
                                <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                    <label>
                                        Call Made On <span className="reqired">*</span>
                                    </label>
                                    <Flatpickr
                                        options={{
                                            // maxDate: today,
                                            dateFormat: 'd/m/Y h:i K',
                                            position: 'auto left',
                                            enableTime: true,
                                        }}
                                        disabled={call_name_yn == 'N'}
                                        value={FromDateOfCall}
                                        className={call_name_yn == 'N' ? 'disable form-input' : 'form-input'}
                                        onChange={(date) => {
                                            getDate(date, 'FromDate');
                                            setErrorMsg('', 'DateOfAppointment');
                                        }}
                                    />
                                    {errMsg && errMsg.FromDateOfCall ? <div className="mt-1 text-danger">{errMsg.FromDateOfCall}</div> : ''}
                                </div>
                                <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                    <label>
                                        Duration <span className="reqired">*</span>
                                    </label>
                                    <input
                                        name="CallDuration"
                                        id="CallDuration"
                                        type="text"
                                        className="form-input"
                                        placeholder="Enter Duration in minutes"
                                        value={CallDuration}
                                        onChange={(e) => {
                                            SetCallDuration(e.target.value);
                                            setErrorMsg('', 'duration');
                                        }}
                                    />
                                    {errMsg && errMsg.duration ? <div className="mt-1 text-danger">{errMsg.duration}</div> : ''}
                                </div>
                                <div className="col-span-4 hidden sm:col-span-2 md:col-span-1">
                                    <label>
                                        To Date Time <span className="reqired">*</span>
                                    </label>
                                    <Flatpickr
                                        options={{
                                            maxDate: moment().format('yyyy-MM-DD'),
                                            dateFormat: 'd/m/Y',
                                            position: 'auto left',
                                        }}
                                        disabled={call_name_yn == 'N'}
                                        value={ToDateOfCall}
                                        className={call_name_yn == 'N' ? 'disable form-input' : 'form-input'}
                                        onChange={(date) => {
                                            getDate(date, 'ToDate');
                                            setErrorMsg('', 'AlternetDateOfAppointment');
                                        }}
                                    />
                                    {/* {errMsg && errMsg.ToDateOfCall ? <div className="mt-1 text-danger">{errMsg.ToDateOfCall}</div> : ''} */}
                                </div>
                            </>
                        )}
                        {selectedDropdown.Feedback !== -1 && TSIFeedBackList[selectedDropdown.Feedback].label == 'Lead lost – Conflict in the area' && (
                            <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                <label className="formLabel">
                                    Dealer <span className="reqired">*</span>
                                </label>
                                <Select
                                    value={ConflictDealer}
                                    options={ConflictDealer}
                                    isSearchable={true}
                                    isDisabled={true}
                                    // onChange={() => {
                                    //     handleTypeSelect(event, 'Call_TO');
                                    //     setErrorMsg('', 'conflictDealer');
                                    // }}
                                />
                                {errMsg && errMsg.conflictDealer ? <div className="mt-1 text-danger">{errMsg.conflictDealer}</div> : ''}
                            </div>
                        )}
                        {/* {selectedDropdown.Feedback !== -1 && TSIFeedBackList[selectedDropdown.Feedback].label == 'Lead lost – Conflict in the area' && (
                            <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                <label className='formLabel'>
                                    Pincode <span className="reqired">*</span>
                                </label>
                                <input
                                        name="Pincode"
                                        id="Pincode"
                                        type="text"
                                        className="form-input"
                                        placeholder="Enter Duration in minutes"
                                        value={Pincode}
                                        onChange={(e) => {
                                            SetCallDuration(e.target.value);
                                            setErrorMsg('', 'duration');
                                        }}
                                    />
                                {errMsg && errMsg.conflictDealer ? <div className="mt-1 text-danger">{errMsg.conflictDealer}</div> : ''}
                            </div>
                        )} */}
                        <div className="col-span-4 sm:col-span-2 md:col-span-1">
                            <label className="formLabel">
                                Feedback<span className="reqired">*</span>
                            </label>
                            <Select
                                menuPlacement="top"
                                menuShouldScrollIntoView={true}
                                value={selectedDropdown.Feedback !== -1 ? TSIFeedBackList[selectedDropdown.Feedback] : null}
                                options={TSIFeedBackList}
                                isSearchable={true}
                                onChange={() => {
                                    handleTypeSelect(event, 'Feedback');
                                    setErrorMsg('', 'Feedback');
                                }}
                            />
                            {errMsg && errMsg.Feedback ? <div className="mt-1 text-danger">{errMsg.Feedback}</div> : ''}
                        </div>
                        {selectedDropdown.Feedback !== -1 && TSIFeedBackList[selectedDropdown.Feedback].label == 'Need Follow-up at Later Date' && (
                            <div className="col-span-6 sm:col-span-2 md:col-span-1">
                                <label>
                                    Next Follow up Date <span className="reqired">*</span>
                                </label>

                                <Flatpickr
                                    options={{
                                        minDate: moment().format('yyyy-MM-DD'),
                                        dateFormat: 'd/m/Y',
                                        position: 'auto left',
                                    }}
                                    value={NextFollowupDate}
                                    className="form-input"
                                    onChange={(date) => {
                                        getDate(date, 'nextFollowupdate');
                                        setErrorMsg('', 'NextFollowupDate');
                                    }}
                                />
                                {errMsg && errMsg.NextFollowupDate ? <div className="mt-1 text-danger">{errMsg.NextFollowupDate}</div> : ''}
                            </div>
                        )}
                        {/* non_serviceable_pin section start */}
                        {call_name_yn == 'Y' &&
                            selectedDropdown.Call_TO != -1 &&
                            (CallFromToList[selectedDropdown.Call_TO].value == 'DLC_TO_TSI' || CallFromToList[selectedDropdown.Call_TO].value == 'TSI_TO_PROSPECT') &&
                            selectedDropdown.Feedback !== -1 &&
                            TSIFeedBackList[selectedDropdown.Feedback].value == '200' && (
                                <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                    <label htmlFor="gridZip">
                                        Pincode<span className="reqired">*</span>
                                    </label>
                                    <input
                                        name="non_serviceable_pin"
                                        id="non_serviceable_pin"
                                        type="number"
                                        defaultValue={pincode}
                                        onChange={(e) => {
                                            setPincode(e.target.value);
                                            setErrorMsg('', 'pincode');
                                        }}
                                        placeholder="Enter Pincode"
                                        className="form-input placeholder:text-white-dark"
                                    />
                                    {errMsg && errMsg.pincode ? <div className="mt-1 text-danger">{errMsg.pincode}</div> : ''}
                                </div>
                            )}
                        {/* non_serviceable_pin section end */}
                        <div className="col-span-4 sm:col-span-2 md:col-span-1">
                            <label>
                                Remarks
                                {/* <span className="reqired">*</span> */}
                            </label>
                            <textarea
                                name="callRemarks"
                                id="remarks"
                                placeholder="Enter Remarks"
                                className=" form-textarea"
                                value={callRemarks}
                                onChange={handelChangeinInput}
                                onFocus={() => {
                                    setErrorMsg('', 'remarks');
                                }}
                            />
                            {errMsg && errMsg.remarks ? <div className="mt-1 text-danger">{errMsg.remarks}</div> : ''}
                        </div>
                    </div>
                    {LeadDetails && !LeadDetails.IsButtonDisable && (
                        <div className="mt-8 flex items-center justify-center">
                            {/* <button
                            type="button"
                            className="btn btn-primary w-24 text-base ltr:ml-4 rtl:mr-4"
                            onClick={() => {
                                addCallDetails();
                            }}
                        >
                            Save
                        </button> */}
                            {LeadDetails.Appointmentflag !== 'Call_Details' && (
                                <button
                                    type="button"
                                    className={`btn flex w-auto items-center justify-center text-base ${canCancelLead ? 'btn-danger' : 'btn-success'}`}
                                    // className="btn btn-success flex w-auto items-center justify-center text-base"
                                    onClick={() => {
                                        addCallDetails();
                                    }}
                                >
                                    <FeatherIcon className="h-5 w-5" icon="save" />
                                    &nbsp;
                                    {/* <span>{VisitInfo ? 'Update' : 'Submit'}</span> */}
                                    <span>{canCancelLead ? 'Submit to Cancel' : callDetails ? 'Update' : 'Submit'}</span>
                                </button>
                            )}
                        </div>
                    )}
                </form>
            </div>
            {call_name_yn == 'Y' && selectedDropdown.Feedback !== -1 && TSIFeedBackList[selectedDropdown.Feedback].label == 'Lead lost – Conflict in the area' && (
                <div className="mb-5">
                    <div className="space-y-2 font-semibold">
                        <div className="rounded border border-[#d3d3d3] dark:border-[#1b2e4b]">
                            <button type="button" className={`flex w-full items-center p-2 !text-primary text-white-dark dark:bg-[#1b2e4b]`} onClick={() => togglePara2('1')}>
                                <img className="mr-2 h-8 w-auto" src={GetProdDevImgRouteBuilder('/assets/images/search.png')} alt="" />
                                Conflict Management
                                {/* <div className={`rotate-180 ltr:ml-auto rtl:mr-auto`}>
                                <svg>...</svg>
                            </div> */}
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

            {selectedDropdown.Feedback !== -1 &&
                (TSIFeedBackList[selectedDropdown.Feedback].label == 'Interested in visit and Face-to-Face Pitch' ||
                    TSIFeedBackList[selectedDropdown.Feedback].label == 'Got Potential, need visit appointment') && (
                    <div className="mb-5">
                        <div className="space-y-2 font-semibold">
                            <div className="rounded border border-[#d3d3d3] dark:border-[#1b2e4b]">
                                <button type="button" className={`flex w-full items-center p-2 !text-primary text-white-dark dark:bg-[#1b2e4b]`} onClick={() => togglePara2('1')}>
                                    <img className="mr-2 h-8 w-auto" src={GetProdDevImgRouteBuilder('/assets/images/meeting.png')} alt="" />
                                    Schedule Appointment
                                    {/* <div className={`rotate-180 ltr:ml-auto rtl:mr-auto`}>
                                <svg>...</svg>
                            </div> */}
                                </button>
                                <div>
                                    <AnimateHeight duration={300} height={active2 === '1' ? 'auto' : 0}>
                                        <div className="space-y-2 border-t border-[#d3d3d3] p-4 text-[13px] text-white-dark dark:border-[#1b2e4b]">
                                            <Appointment LeadDetails={LeadDetails} onAppointmentModalButtonHandle={handleOnSubmit} />
                                        </div>
                                    </AnimateHeight>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            {/* {LeadDetails.Appointmentflag === 'Call_Details' && (
                <button
                    type="button"
                    className={`btn flex w-auto items-center justify-center text-base ${
                        call_name_yn == 'Y' && selectedDropdown.Feedback !== -1 && TSIFeedBackList[selectedDropdown.Feedback].value == '100' ? 'btn-danger' : 'btn-success'
                    }`}
                    // className="btn btn-success flex w-auto items-center justify-center text-base"
                    onClick={() => {
                        addCallDetails();
                    }}
                >
                    <FeatherIcon className="h-5 w-5" icon="save" />
                    &nbsp;
                    <span>
                        {call_name_yn == 'Y' && selectedDropdown.Feedback !== -1 && TSIFeedBackList[selectedDropdown.Feedback].value == '100' ? 'Submit to Cancel' : callDetails ? 'Update' : 'Submit'}
                    </span>
                </button>
            )} */}
        </>
    );
};

export default CallDetailsEntry;
