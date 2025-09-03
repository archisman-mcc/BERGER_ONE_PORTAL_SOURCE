import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import FeatherIcon from 'feather-icons-react';
import { GetReviveLeadReasonLovList, UpdateNDReviveLead } from '../../services/api/lead-service';
import { commonAlert } from '../../services/functions/commonAlert';
import { commonErrorToast, commonSuccessToast } from '../../services/functions/commonToast';

export interface SELECTED_DROPDOWN {
    ReviveReason: number;
}

const selectedDropdownInit: SELECTED_DROPDOWN = {
    ReviveReason: -1,
};

export interface validationObj {
    revive_res: string;
    remarks: string;
}

export const allErrorMsg: validationObj = {
    revive_res: '',
    remarks: '',
};
const ReviveCancelLead = ({ LeadDetails, onModalButtonHandle }: any) => {
    const [ReviveReasonList, SetReviveReasonList] = useState<any>([]);
    const [selectedDropdown, setSelectedDropdown] = useState<SELECTED_DROPDOWN>(selectedDropdownInit);
    const [errMsg, setErrMsg] = useState<validationObj>(allErrorMsg);
    const [cancelRemarks, setcancelRemarks] = useState<any>('');
    const labelValueConverter = (arr: any[], propertyNameLabel: string, propertyNameValue: string) => {
        arr.forEach((element) => {
            element['value'] = element[propertyNameValue];
            element['label'] = element[propertyNameLabel];
        });
        return arr;
    };

    useEffect(() => {
        GetReviveLeadReasonLov();
    }, []);

    const GetReviveLeadReasonLov = async () => {
        let userDetails: any = JSON.parse(localStorage.getItem('auth') || '');

        const data = {
            userId: userDetails.state.userDetails.user_id,
        };

        try {
            const response = await GetReviveLeadReasonLovList(data);
            labelValueConverter(response.data, 'lov_value', 'lov_code');
            SetReviveReasonList(response.data);
        } catch (error) {
            return;
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

    const handleTypeSelect = (e: any, flag: 'revive_reason') => {
        if (flag == 'revive_reason' && e && e.target.innerText) {
            setSelectedDropdown((prev) => ({ ...prev, ReviveReason: findSelectedTypeValue(ReviveReasonList, 'value', e.target.innerText) }));
        }
    };

    const setErrorMsg = (msg: string, prop: string) => {
        setErrMsg((prev) => ({ ...prev, [`${prop}`]: msg }));
    };

    const ReviveLead = async () => {
        const data = {
            lead_id: LeadDetails.lh_id,
            reason_code: selectedDropdown.ReviveReason == -1 ? '' : ReviveReasonList[selectedDropdown.ReviveReason].lov_value,
            remarks: cancelRemarks,
        };
        let errorCount = 0;
        if (data.reason_code == null || data.reason_code == '') {
            setErrorMsg('Revive Reason Missing', 'revive_res');
            errorCount++;
        }

        if (errorCount == 0) {
            commonAlert('Are You Sure?', 'If you click confirm the record will be submitted. To cancel please press cancel button.', 'warning').then(async (result: any) => {
                try {
                    const response = await UpdateNDReviveLead(data);
                    if (response.response_message) {
                        commonSuccessToast(response.response_message);
                        onModalButtonHandle('Revive');
                    } else if (response.errorMessage) {
                        commonErrorToast(response.errorMessage);
                    }
                } catch (error) {
                    return;
                }
            });
        }
    };
    const handelChangeinInput = async (e: any) => {
        setcancelRemarks(e.target.value);
    };

    return (
        <div className=" bg-white text-[13px]">
            <form className=" space-y-5 p-3">
                <div className="grid grid-cols-3 grid-rows-1 gap-4">
                    <div className="col-span-4 sm:col-span-2 md:col-span-1">
                        <label className="formLabel">
                            Revive Reason <span className="reqired">*</span>
                        </label>
                        <Select
                            menuPlacement="top"
                            menuShouldScrollIntoView={true}
                            value={ReviveReasonList[selectedDropdown.ReviveReason]}
                            options={ReviveReasonList}
                            isSearchable={true}
                            onChange={() => {
                                handleTypeSelect(event, 'revive_reason');
                                setErrorMsg('', 'revive_res');
                            }}
                        />
                        {errMsg && errMsg.revive_res ? <div className="mt-1 text-danger">{errMsg.revive_res}</div> : ''}
                    </div>

                    <div className="col-span-4 sm:col-span-2 md:col-span-1">
                        <label>
                            Remarks
                            {/* <span className="reqired">*</span> */}
                        </label>
                        <textarea
                            name="cancelRemarks"
                            id="remarks"
                            placeholder="Enter Remarks"
                            style={{ lineHeight: '2.25rem' }}
                            className=" form-textarea"
                            value={cancelRemarks}
                            onChange={handelChangeinInput}
                            onFocus={() => {
                                setErrorMsg('', 'remarks');
                            }}
                        />
                        {errMsg && errMsg.remarks ? <div className="mt-1 text-danger">{errMsg.remarks}</div> : ''}
                    </div>
                </div>
                <div className="mt-8 flex items-center justify-center pt-2">
                    {/* <button
                            type="button"
                            className="btn btn-primary w-24 text-base ltr:ml-4 rtl:mr-4"
                            onClick={() => {
                                addCallDetails();
                            }}
                        >
                            Save
                        </button> */}
                    <button
                        type="button"
                        className="btn btn-success flex w-auto items-center justify-center text-base"
                        onClick={() => {
                            ReviveLead();
                        }}
                    >
                        <FeatherIcon className="h-5 w-5" icon="save" />
                        &nbsp;
                        {/* <span>{VisitInfo ? 'Update' : 'Submit'}</span> */}
                        <span>Submit</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReviveCancelLead;
