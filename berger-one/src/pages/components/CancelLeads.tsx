import { GetLeadCancellationReasonList } from '../../services/api/lead-service';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import FeatherIcon from 'feather-icons-react';
export interface SELECTED_DROPDOWN {
    CancelReason: number;
}

const selectedDropdownInit: SELECTED_DROPDOWN = {
    CancelReason: -1,
};

export interface validationObj {
    cancel_res: string;
    remarks: string;
}

export const allErrorMsg: validationObj = {
    cancel_res: '',
    remarks: '',
};

const CancelLeads = ({ LeadDetails, onModalButtonHandle }: any) => {
    const [CancellationReasonList, SetCancellationReasonList] = useState<any>([]);
    const [selectedDropdown, setSelectedDropdown] = useState<SELECTED_DROPDOWN>(selectedDropdownInit);
    const [errMsg, setErrMsg] = useState<validationObj>(allErrorMsg);
    const [cancelRemarks, setcancelRemarks] = useState<any>('');
    useEffect(() => {
        GetLeadCancellationReason();
    }, []);
    const labelValueConverter = (arr: any[], propertyNameLabel: string, propertyNameValue: string) => {
        arr.forEach((element) => {
            element['value'] = element[propertyNameValue];
            element['label'] = element[propertyNameLabel];
        });
        return arr;
    };
    const GetLeadCancellationReason = async () => {
        let userDetails: any = JSON.parse(localStorage.getItem('auth') || '');

        const data = {
            userId: userDetails.state.userDetails.user_id,
        };

        try {
            const response = await GetLeadCancellationReasonList(data);
            labelValueConverter(response.data, 'lov_value', 'lov_code');
            SetCancellationReasonList(response.data);
        } catch (error) {
            return;
        }
    };

    const handleTypeSelect = (e: any, flag: 'cancel_reason') => {
        if (flag == 'cancel_reason' && e && e.target.innerText) {
            setSelectedDropdown((prev) => ({ ...prev, Feedback: -1 }));
        }
    };

    const setErrorMsg = (msg: string, prop: string) => {
        setErrMsg((prev) => ({ ...prev, [`${prop}`]: msg }));
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
                            Cancel Reason <span className="reqired">*</span>
                        </label>
                        <Select
                            menuPlacement="top"
                            menuShouldScrollIntoView={true}
                            value={CancellationReasonList[selectedDropdown.CancelReason]}
                            options={CancellationReasonList}
                            isSearchable={true}
                            onChange={() => {
                                handleTypeSelect(event, 'cancel_reason');
                                setErrorMsg('', 'cancel_res');
                            }}
                        />
                        {errMsg && errMsg.cancel_res ? <div className="mt-1 text-danger">{errMsg.cancel_res}</div> : ''}
                    </div>

                    <div className="col-span-4 sm:col-span-2 md:col-span-1">
                        <label htmlFor="addonsRight">Dealer Code</label>
                        <div className="flex">
                            <input id="addonsRight" type="text" placeholder="" className="form-input ltr:rounded-r-none rtl:rounded-l-none" />
                            <button type="button" className="btn btn-success rounded-none ltr:border-r-0 rtl:border-l-0">
                                Validate
                            </button>
                            <button type="button" className="btn btn-danger ltr:rounded-l-none rtl:rounded-r-none">
                                Reset
                            </button>
                        </div>
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
                        <button
                            type="button"
                            className="btn btn-danger flex w-auto items-center justify-center text-base"
                            // className="btn btn-success flex w-auto items-center justify-center text-base"
                            // onClick={() => {
                            //     addCallDetails();
                            // }}
                        >
                            <FeatherIcon className="h-5 w-5" icon="save" />
                            &nbsp;
                            {/* <span>{VisitInfo ? 'Update' : 'Submit'}</span> */}
                            <span>Submit to Cancel</span>
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default CancelLeads;
