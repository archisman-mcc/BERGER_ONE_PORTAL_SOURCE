'use client';
import { GetUserApplicableTerrByDepot } from '../../../services/api/fresh-dtls-services';
import { AddUpdateAppointment, GetAppointmentDayFeedbackLovList, GetAppointmentSlotLovList, GetTsiList } from '../../../services/api/lead-service';
import { commonAlert } from '../../../services/functions/commonAlert';
import { commonErrorToast, commonSuccessToast } from '../../../services/functions/commonToast';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import Select from 'react-select';
import FeatherIcon from 'feather-icons-react';
export interface SELECTED_DROPDOWN {
    DealerTrr: number;
    AcceptenceDate: number;
    SelectedFeedback: number;
    SlelectedSlot1: number;
    SlelectedSlot2: number;
}
const selectedDropdownInit: SELECTED_DROPDOWN = {
    DealerTrr: -1,
    AcceptenceDate: -1,
    SelectedFeedback: -1,
    SlelectedSlot1: -1,
    SlelectedSlot2: -1,
};
export interface validationObj {
    DateOfAppointment: string;
    appointmnettime: string;
    DateOfAlterAppointment: string;
    alrtappointmnettime: string;
    remarks: string;
    TerrCode: string;
    feedbackerr: string;
    Slot1: string;
    Slot2: string;
}

export const allErrorMsg: validationObj = {
    DateOfAppointment: '',
    appointmnettime: '',
    DateOfAlterAppointment: '',
    alrtappointmnettime: '',
    remarks: '',
    TerrCode: '',
    feedbackerr: '',
    Slot1: '',
    Slot2: '',
};
const Appointment = ({ LeadDetails, onAppointmentModalButtonHandle }: any) => {
    var today: any = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var hours = today.getHours().toString().padStart(2, '0');
    var minutes = today.getMinutes().toString().padStart(2, '0');
    var formattedTime = hours + ':' + minutes;
    today = dd + '/' + mm + '/' + yyyy;
    const [DateOfAppointment, setDateOfAppointment] = useState<any>(today);
    const [AlternetDateOfAppointment, setAlternetDateOfAppointment] = useState<any>(today);
    const [FeedbackList, setFeedbackList] = useState<any>([]);
    const [AppointmentDetais, setAppointmentDetais] = useState<any>({
        autoId: null,
        leadId: '',
        preferableAppointmentDateTime: formattedTime,
        preferableAppointmentSlot: '',
        alternateAppointmentDateTime: formattedTime,
        alternateAppointmentSlot: '',
        remarks: '',
        customerAcceptanceDateTime: null,
        customerAcceptanceSlot: null,
        assignTo: '',
        lal_appointment_feedback: null,
    });

    let AcceptanceDateTime: any = [
        { label: 'Slot 1', value: 'Slot 1' },
        { label: 'Slot 2', value: 'Slot 2' },
    ];
    const [errMsg, setErrMsg] = useState<validationObj>(allErrorMsg);
    const [TrrList, setTrrList] = useState<any>([]);
    const [SlotList, setSlotList] = useState<any>([]);
    const [selectedDropdown, setSelectedDropdown] = useState<SELECTED_DROPDOWN>(selectedDropdownInit);
    const getDate = (date: any, flag: 'appointment' | 'alterappointment') => {
        if (flag == 'appointment' && date) setDateOfAppointment(moment(date[0]).format('DD/MM/YYYY'));
        if (flag == 'alterappointment' && date) setAlternetDateOfAppointment(moment(date[0]).format('DD/MM/YYYY'));
    };

    const setErrorMsg = (msg: string, prop: string) => {
        setErrMsg((prev) => ({ ...prev, [`${prop}`]: msg }));
    };

    const handelChange = (e: any) => {
        const { name, value } = e.target;
        setAppointmentDetais((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };
    useEffect(() => {
        if (LeadDetails) {
            setAppointmentDetais((prev) => ({ ...prev, leadId: LeadDetails.lh_id }));
        }
        GetTSIList(LeadDetails.lh_depot_code, LeadDetails.lh_terr_code);
        GetFeedBackist();
        GetAppointmentSlotList();
    }, []);

    const GetTSIList = async (depot, terr) => {
        const data = {
            depot: depot,
            terr: terr,
        };

        try {
            const response = await GetTsiList(data);
            if (response.data.length == 1) {
                setSelectedDropdown((prev) => ({ ...prev, DealerTrr: 0 }));
            }
            response.data.forEach((element: any) => {
                element['value'] = element['userId'];
                element['label'] = element['terrCode'] + ': ' + element['fullName'] + ' (' + element['userId'] + ') ' + element['mobile'];
            });
            setTrrList(response.data);
        } catch (error) {
            return;
        }
    };

    const GetAppointmentSlotList = async () => {
        let userDetails: any = JSON.parse(localStorage.getItem('auth') || '');

        const data = {
            userid: userDetails.state.userDetails.user_id,
        };

        try {
            const response = await GetAppointmentSlotLovList(data);
            if (response.data.length == 1) {
                setSelectedDropdown((prev) => ({ ...prev, DealerTrr: 0 }));
            }
            response.data.forEach((element: any) => {
                element['value'] = element['lov_code'];
                element['label'] = element['lov_value'];
            });
            setSlotList(response.data);
        } catch (error) {
            return;
        }
    };

    const GetFeedBackist = async () => {
        let userDetails: any = JSON.parse(localStorage.getItem('auth') || '');

        const data = {
            userid: userDetails.state.userDetails.user_id,
        };

        try {
            const response = await GetAppointmentDayFeedbackLovList(data);

            response.data.forEach((element: any) => {
                element['value'] = element['lov_code'];
                element['label'] = element['lov_value'];
            });
            setFeedbackList(response.data);
        } catch (error) {
            return;
        }
    };

    const addAppointmentDetails = async () => {
        AppointmentDetais.preferableAppointmentDateTime = await formateDateTime(DateOfAppointment);
        AppointmentDetais.preferableAppointmentSlot = selectedDropdown.SlelectedSlot1 !== -1 ? SlotList[selectedDropdown.SlelectedSlot1].value : '';
        AppointmentDetais.alternateAppointmentDateTime = await formateDateTime(AlternetDateOfAppointment);
        AppointmentDetais.alternateAppointmentSlot = selectedDropdown.SlelectedSlot2 !== -1 ? SlotList[selectedDropdown.SlelectedSlot2].value : '';
        AppointmentDetais.assignTo = selectedDropdown.DealerTrr !== -1 ? TrrList[selectedDropdown.DealerTrr].userId : '';
        // AppointmentDetais.customerAcceptanceDateTime =
        //     selectedDropdown.AcceptenceDate !== -1
        //         ? AcceptanceDateTime[selectedDropdown.AcceptenceDate].value == 'Slot 1'
        //             ? AppointmentDetais.preferableAppointmentDateTime
        //             : AppointmentDetais.alternateAppointmentDateTime
        //         : null;
        // AppointmentDetais.customerAcceptanceSlot =
        //     selectedDropdown.AcceptenceDate !== -1
        //         ? AcceptanceDateTime[selectedDropdown.AcceptenceDate].value == 'Slot 1'
        //             ? AppointmentDetais.preferableAppointmentSlot
        //             : AppointmentDetais.alternateAppointmentSlot
        //         : null;

        let errorCount = 0;

        if (AppointmentDetais.preferableAppointmentDateTime == AppointmentDetais.alternateAppointmentDateTime) {
            commonErrorToast('Appointment Date 1   & Appointment Date 2 can not be same');
            errorCount++;
        }
        if (!AppointmentDetais.preferableAppointmentSlot || AppointmentDetais.preferableAppointmentSlot == '' || AppointmentDetais.preferableAppointmentSlot == null) {
            setErrorMsg('Select Appointment 1 Slot', 'Slot1');
            errorCount++;
        }
        if (!AppointmentDetais.alternateAppointmentSlot || AppointmentDetais.alternateAppointmentSlot == '' || AppointmentDetais.alternateAppointmentSlot == null) {
            setErrorMsg('Select Appointment 2 Slot', 'Slot2');
            errorCount++;
        }
        if (AppointmentDetais.assignTo == '') {
            setErrorMsg('TSI Missing', 'TerrCode');
            errorCount++;
        }
        if (errorCount == 0) {
            commonAlert('Are You Sure?', 'If you click confirm the record will be submitted. To cancel please press cancel button.', 'warning').then(async (result: any) => {
                if (result.value && LeadDetails.Appointmentflag !== 'Call_Details') {
                    try {
                        const response = await AddUpdateAppointment(AppointmentDetais);
                        if (response.response_message) {
                            commonSuccessToast(response.response_message);
                            onAppointmentModalButtonHandle('Appointment');
                        } else {
                            commonErrorToast(response.errorMessage);
                        }
                    } catch (error) {
                        return;
                    }
                } else {
                    onAppointmentModalButtonHandle(AppointmentDetais);
                }
            });
        }
    };

    const findSelectedTypeValue = (arr: any[], arrPropName: string, checkValue: string) => {
        if (arr && arr.length > 0) {
            const selectedValue = arr.findIndex((item: any) => item[arrPropName] == checkValue);
            return selectedValue == -1 ? -1 : selectedValue;
        } else {
            return -1;
        }
    };

    const handleTypeSelect = (e: any, flag: 'Dealer_Terr' | 'acceptence_date' | 'feedback' | 'Slot1' | 'Slot2') => {
        if (flag == 'Dealer_Terr' && e && e.target.innerText) setSelectedDropdown((prev) => ({ ...prev, DealerTrr: findSelectedTypeValue(TrrList, 'label', e.target.innerText) }));
        if (flag == 'acceptence_date' && e && e.target.innerText) setSelectedDropdown((prev) => ({ ...prev, AcceptenceDate: findSelectedTypeValue(AcceptanceDateTime, 'label', e.target.innerText) }));
        if (flag == 'feedback' && e && e.target.innerText) setSelectedDropdown((prev) => ({ ...prev, SelectedFeedback: findSelectedTypeValue(FeedbackList, 'label', e.target.innerText) }));
        if (flag == 'Slot1' && e && e.target.innerText) setSelectedDropdown((prev) => ({ ...prev, SlelectedSlot1: findSelectedTypeValue(SlotList, 'label', e.target.innerText) }));
        if (flag == 'Slot2' && e && e.target.innerText) setSelectedDropdown((prev) => ({ ...prev, SlelectedSlot2: findSelectedTypeValue(SlotList, 'label', e.target.innerText) }));
    };

    const formateDateTime = async (date: any) => {
        let nextFollowupDate = moment(date, 'DD/MM/YYYY');
        const formattedDate = nextFollowupDate.format('YYYY-MM-DDTHH:mm:ss[Z]');
        // var dateParts = nextFollowupDate.split(/[\s/:\-]+/);
        // var year = parseInt(dateParts[2], 10);
        // var month = parseInt(dateParts[1], 10) - 1; // Months are 0-indexed in JavaScript
        // var day = parseInt(dateParts[0], 10);
        // var hour = parseInt(dateParts[3], 10);
        // var minute = parseInt(dateParts[4], 10);
        // var dateObject = new Date(year, month, day, hour, minute);
        // // Format the date as "YYYY-MM-DDTHH:mm:ss[Z]"
        // var formattedDate = moment(dateObject).format().replace('+05:30', 'Z');
        //dateObject.toISOString().replace(/\.\d{3}Z$/, 'Z');
        return formattedDate;
    };
    return (
        <div className="border-t border-[#d3d3d3] bg-white text-[13px] dark:border-[#1b2e4b]">
            <form className=" space-y-5 p-3">
                <div className="grid grid-cols-2 grid-rows-1 gap-4">
                    <div className="col-span-6 sm:col-span-2 md:col-span-1">
                        <label>
                            Appointment Date 1 <span className="reqired">*</span>
                        </label>
                        <Flatpickr
                            options={{
                                minDate: moment().format('yyyy-MM-DD'),
                                dateFormat: 'd/m/Y',
                                position: 'auto left',
                            }}
                            value={DateOfAppointment}
                            className="form-input"
                            onChange={(date) => {
                                getDate(date, 'appointment');
                                setErrorMsg('', 'DateOfAppointment');
                            }}
                        />
                        {errMsg && errMsg.appointmnettime ? <div className="mt-1 text-danger">{errMsg.appointmnettime}</div> : ''}
                    </div>
                    <div className="col-span-6 sm:col-span-2 md:col-span-1">
                        <label>
                            Appointment 1 Slot<span className="reqired">*</span>
                        </label>
                        <Select
                            value={SlotList[selectedDropdown.SlelectedSlot1]}
                            options={SlotList}
                            isSearchable={true}
                            onFocus={() => {}}
                            onChange={() => {
                                handleTypeSelect(event, 'Slot1');
                                setErrorMsg('', 'Slot1');
                            }}
                        />
                        {errMsg && errMsg.Slot1 ? <div className="mt-1 text-danger">{errMsg.Slot1}</div> : ''}
                    </div>
                    <div className="col-span-6 sm:col-span-2 md:col-span-1">
                        <label>
                            Appointment Date 2 <span className="reqired">*</span>
                        </label>

                        <Flatpickr
                            options={{
                                minDate: moment().format('yyyy-MM-DD'),
                                dateFormat: 'd/m/Y',
                                position: 'auto left',
                            }}
                            value={AlternetDateOfAppointment}
                            className="form-input"
                            onChange={(date) => {
                                getDate(date, 'alterappointment');
                                setErrorMsg('', 'AlternetDateOfAppointment');
                            }}
                        />
                        {errMsg && errMsg.alrtappointmnettime ? <div className="mt-1 text-danger">{errMsg.alrtappointmnettime}</div> : ''}
                    </div>
                    <div className="col-span-6 sm:col-span-2 md:col-span-1">
                        <label>
                            Appointment 2 Slot<span className="reqired">*</span>
                        </label>
                        <Select
                            value={SlotList[selectedDropdown.SlelectedSlot2]}
                            options={SlotList}
                            isSearchable={true}
                            onChange={() => {
                                handleTypeSelect(event, 'Slot2');
                                setErrorMsg('', 'Slot2');
                            }}
                        />
                        {errMsg && errMsg.Slot2 ? <div className="mt-1 text-danger">{errMsg.Slot2}</div> : ''}
                    </div>
                    <div className="col-span-6 sm:col-span-2 md:col-span-1">
                        <label>
                            TSI
                            <span className="reqired">*</span>
                        </label>
                        <Select
                            menuPlacement="top"
                            menuShouldScrollIntoView={true}
                            value={TrrList[selectedDropdown.DealerTrr]}
                            options={TrrList}
                            isSearchable={true}
                            onChange={() => {
                                handleTypeSelect(event, 'Dealer_Terr');
                                setErrorMsg('', 'TerrCode');
                            }}
                        />
                        {errMsg && errMsg.TerrCode ? <div className="mt-1 text-danger">{errMsg.TerrCode}</div> : ''}
                    </div>
                    <div className="col-span-6 hidden sm:col-span-2 md:col-span-1">
                        <label>
                            Final Appointment Date
                            {/* <span className="reqired">*</span> */}
                        </label>
                        <Select
                            menuPlacement="auto"
                            menuShouldScrollIntoView={true}
                            value={AcceptanceDateTime[selectedDropdown.AcceptenceDate]}
                            options={AcceptanceDateTime}
                            isSearchable={true}
                            onChange={() => {
                                handleTypeSelect(event, 'acceptence_date');
                                setErrorMsg('', 'TerrCode');
                            }}
                        />
                    </div>
                    <div className="col-span-6 hidden sm:col-span-2 md:col-span-1">
                        <label>
                            Feedback
                            {/* <span className="reqired">*</span> */}
                        </label>
                        <Select
                            menuPlacement="top"
                            menuShouldScrollIntoView={true}
                            value={FeedbackList[selectedDropdown.SelectedFeedback]}
                            options={FeedbackList}
                            isSearchable={true}
                            onChange={() => {
                                handleTypeSelect(event, 'feedback');
                                setErrorMsg('', 'feedbackerr');
                            }}
                        />
                        {errMsg && errMsg.feedbackerr ? <div className="mt-1 text-danger">{errMsg.feedbackerr}</div> : ''}
                    </div>
                    <div className="col-span-6 sm:col-span-2 md:col-span-1">
                        <label>Remarks</label>
                        <textarea
                            name="remarks"
                            id="remarks"
                            placeholder="Enter Remarks"
                            className=" form-textarea"
                            value={AppointmentDetais.remarks}
                            onChange={handelChange}
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
                            addAppointmentDetails();
                        }}
                    >
                        Save
                    </button> */}
                        <button
                            type="button"
                            className="btn btn-success flex w-auto items-center justify-center text-base"
                            // className="btn btn-success flex w-auto items-center justify-center text-base"
                            onClick={() => {
                                addAppointmentDetails();
                            }}
                        >
                            <FeatherIcon className="h-5 w-5" icon="save" />
                            &nbsp;
                            <span> Submit</span>
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default React.memo(Appointment);
