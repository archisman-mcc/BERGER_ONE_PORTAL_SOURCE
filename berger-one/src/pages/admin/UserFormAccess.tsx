import { useEffect, useState } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import Select from 'react-select';
import { commonErrorToast, commonErrorToastMulty, commonSuccessToast } from '../../services/functions/commonToast';
import React from 'react';
import { commonAlert } from '../../services/functions/commonAlert';
import { GetAllUserGroup, GetAppList, GetUserListByGroup, GetAppList_Vrn1 } from '../../services/api/commons/global';
import { GetUserApplicableForm, GetUserAvailableForm, UserFormAccessInsert } from '../../services/api/users/UserFormAccess';
// import { GetAllUserGroup, GetUserListByGroup, GetAppList, GetAppList_Vrn1 } from '@/src/services/api/commons/global';
// import { GetUserApplicableForm, GetUserAvailableForm, UserFormAccessInsert } from '@/src/services/api/users/UserFormAccess';

type UserApplicableManus = {
    form_code: '';
    form_desc: '';
    selected: boolean;
};
export interface SELECTED_DROPDOWN {
    SourceTypeCode: number;
    UserGroup: number;
    User: number;
    AppCode: number;
}

const selectedDropdownInit: SELECTED_DROPDOWN = {
    SourceTypeCode: 0,
    UserGroup: 0,
    User: 0,
    AppCode: 0,
};
let selectAvlbleForms: any[] = [];
let removedApplicableForms: any[] = [];
const UserFormAccess = () => {
    const [UserAvailableForms, setUserAvailableForms] = useState<UserApplicableManus[]>([]);
    const [UserApplicableForms, setUserApplicableForms] = useState<UserApplicableManus[]>([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [selectedDropdown, setSelectedDropdown] = useState<SELECTED_DROPDOWN>(selectedDropdownInit);
    const [sourceType, setSourceType] = useState([
        { label: 'Web', value: 'WEB' },
        { label: 'App', value: 'APP' },
    ]);

    // ============ STATES ============

    const [userGroupCode, setUserGroupCode] = useState<any>([]);
    const [userIdCode, setUserIdCode] = useState<any>([]);
    const [appCode, setAppCode] = useState<any>([]);

    // =====================================

    // ============ USE EFFECTS ============

    useEffect(() => {
        GetUserGroupListBind('reset');
        // getAppList();
    }, []);

    useEffect(() => {
        if (userGroupCode[selectedDropdown.UserGroup]) GetUserIdListBind(userGroupCode[selectedDropdown.UserGroup].group_code);
    }, [userGroupCode[selectedDropdown.UserGroup]]);
    // =====================================

    // ============ FUNCTIONS / EVENTS ============

    const GetUserGroupListBind = async (_flag: string) => {
        let userDetails: any = JSON.parse(localStorage.getItem('auth') || '');
        const searchParam_Set = {
            userId: userDetails.state.userDetails.user_id,
            globalFilter: '',
        };
        try {
            if (_flag != '') {
                const response: any = await GetAllUserGroup(searchParam_Set);
                if (response.data != null && response.data != undefined) {
                    const updatedDdltList = [
                        { label: 'Select...', value: '', group_name: '', group_code: '' },
                        ...response.data.map((item: any) => ({
                            label: item.usp_group_desc,
                            value: item.usp_group_code,
                            group_name: item.usp_group_desc,
                            group_code: item.usp_group_code,
                        })),
                    ];
                    setUserGroupCode(updatedDdltList);
                } else setUserGroupCode([]);
            } else {
                const updatedDdltList = [{ label: 'Select...', value: '', group_name: '', group_code: '' }];
                setUserGroupCode(updatedDdltList);
            }

            setSelectedDropdown((prev) => ({
                ...prev,
                UserGroup: 0,
            }));
        } catch (error) {
            return;
        }
    };

    const GetUserIdListBind = async (_userGroup: string) => {
        let userDetails: any = JSON.parse(localStorage.getItem('auth') || '');
        const searchParam_Set = {
            userId: userDetails.state.userDetails.user_id,
            //userGroup: selectedDropdown.UserGroup !== -1 ? allUserGrpList[selectedDropdown.UserGroup].usp_group_code : '',
            userGroup: _userGroup,
            globalFilter: '',
        };
        try {
            if (_userGroup) {
                const response: any = await GetUserListByGroup(searchParam_Set);
                if (response.data != null && response.data != undefined) {
                    const updatedDdlList = [
                        { label: 'Select...', value: '', user_name: '', user_id: '' },
                        ...response.data.map((item: any) => ({
                            label: item.username,
                            value: item.userid,
                            user_name: item.username,
                            user_id: item.userid,
                        })),
                    ];
                    setUserIdCode(updatedDdlList);
                } else setUserIdCode([]);
            } else {
                const updatedDdlList = [{ label: 'Select...', value: '', user_name: '', user_id: '' }];
                setUserIdCode(updatedDdlList);
            }

            setSelectedDropdown((prev) => ({
                ...prev,
                User: 0,
            }));
        } catch (error) {
            return;
        }
    };

    const GetAppListBind = async (_userIdCode: string) => {
        try {
            if (_userIdCode != '') {
                const response: any = await GetAppList();
                if (response.data != null && response.data != undefined) {
                    const updatedDdlList = [
                        { label: 'Select...', value: '', app_name: '', app_id: '' },
                        ...response.data.map((item: any) => ({
                            label: item.oam_app_name,
                            value: item.oam_app_id,
                            app_name: item.oam_app_name,
                            app_id: item.oam_app_id,
                        })),
                    ];
                    setAppCode(updatedDdlList);
                } else setAppCode([]);
            } else {
                const updatedDdlList = [{ label: 'Select...', value: '', app_name: '', app_id: '' }];
                setAppCode(updatedDdlList);
            }

            setSelectedDropdown((prev) => ({
                ...prev,
                AppCode: 0,
            }));
        } catch (error) {
            return;
        }
    };

    const GetAppListBind_Vrn1 = async (_userIdCode: string) => {
        try {
            if (_userIdCode != '') {
                const params = {
                    user_id: _userIdCode,
                    user_group: selectedDropdown.UserGroup !== -1 ? userGroupCode[selectedDropdown.UserGroup].group_code : '',
                    app_id: 0,
                };
                const response: any = await GetAppList_Vrn1(params);
                if (response.data != null && response.data != undefined) {
                    const updatedDdlList = [
                        { label: 'Select...', value: '', app_name: '', app_id: '' },
                        ...response.data.map((item: any) => ({
                            label: item.oam_app_name,
                            value: item.oam_app_id,
                            app_name: item.oam_app_name,
                            app_id: item.oam_app_id,
                        })),
                    ];
                    setAppCode(updatedDdlList);
                } else setAppCode([]);
            } else {
                const updatedDdlList = [{ label: 'Select...', value: '', app_name: '', app_id: '' }];
                setAppCode(updatedDdlList);
            }

            setSelectedDropdown((prev) => ({
                ...prev,
                AppCode: 0,
            }));
        } catch (error) {
            return;
        }
    };

    const GetUserAvailableForms = async (AppCode: string) => {
        const searchParam_Set = {
            // userId: selectedDropdown.User !== -1 ? allUserList[selectedDropdown.User].userid : '',
            // userGroup: selectedDropdown.UserGroup !== -1 ? allUserGrpList[selectedDropdown.UserGroup].usp_group_code : '',

            userGroup: selectedDropdown.UserGroup !== -1 ? userGroupCode[selectedDropdown.UserGroup].group_code : '',
            userId: selectedDropdown.User !== -1 ? userIdCode[selectedDropdown.User].user_id : '',
            globalFilter: '',
            sourceType: selectedDropdown.SourceTypeCode !== -1 ? sourceType[selectedDropdown.SourceTypeCode].value : '',
            appid: AppCode,
        };
        try {
            if (AppCode != '' && AppCode != 'Select...' && AppCode != undefined) {
                const response: any = await GetUserAvailableForm(searchParam_Set);
                response.data.map((item: any) => {
                    item.selected = false;
                });
                setUserAvailableForms(response.data);
            } else setUserAvailableForms([]);
        } catch (error) {
            setIsError(true);
            return;
        }
        setIsError(false);
        setIsLoading(false);
        setIsRefetching(false);
    };

    const GetUserApplicableForms = async (AppCode: string) => {
        const searchParam_Set = {
            userGroup: selectedDropdown.UserGroup !== -1 ? userGroupCode[selectedDropdown.UserGroup].group_code : '',
            userId: selectedDropdown.User !== -1 ? userIdCode[selectedDropdown.User].user_id : '',
            appid: AppCode,
            globalFilter: '',
            sourceType: selectedDropdown.SourceTypeCode !== -1 ? sourceType[selectedDropdown.SourceTypeCode].value : '',
        };
        try {
            if (AppCode != '' && AppCode != 'Select...' && AppCode != undefined) {
                const response: any = await GetUserApplicableForm(searchParam_Set);
                response.data.map((item: any) => {
                    item.selected = false;
                });
                setUserApplicableForms(response.data);
            } else setUserApplicableForms([]);
        } catch (error) {
            setIsError(true);
            return;
        }
        setIsError(false);
        setIsLoading(false);
        setIsRefetching(false);
    };

    const findSelectedTypeValue = (arr: any[], arrPropName: string, checkValue: string) => {
        if (arr && arr.length > 0) {
            const selectedValue = arr.findIndex((item: any) => item[arrPropName].trim() == checkValue);
            return selectedValue == -1 ? -1 : selectedValue;
        } else return -1;
    };

    const handleTypeSelect = (e: any, flag: 'SOURCE_TYPE_CODE' | 'USER_GROUP' | 'USER' | 'APP_CODE') => {
        if (flag == 'SOURCE_TYPE_CODE' && e && e.target.innerText && sourceType.length > 0) {
            let getIndex = findSelectedTypeValue(sourceType, 'label', e.target.innerText);
            setSelectedDropdown((prev) => ({ ...prev, SourceTypeCode: getIndex }));
            GetUserGroupListBind('reset');
            GetUserIdListBind('');
            // GetAppListBind('');
            GetAppListBind_Vrn1('');
            GetUserAvailableForms('');
            GetUserApplicableForms('');
        }

        if (flag == 'USER_GROUP' && e && e.target.innerText && userGroupCode.length > 0) {
            let getIndex = findSelectedTypeValue(userGroupCode, 'label', e.target.innerText);
            setSelectedDropdown((prev) => ({ ...prev, UserGroup: getIndex }));
            GetUserIdListBind(userGroupCode[getIndex].group_code);
            // GetAppListBind('');
            GetAppListBind_Vrn1('');
            GetUserAvailableForms('');
            GetUserApplicableForms('');
        }

        if (flag == 'USER' && e && e.target.innerText && userIdCode.length > 0) {
            let getIndex = findSelectedTypeValue(userIdCode, 'label', e.target.innerText);
            setSelectedDropdown((prev) => ({ ...prev, User: getIndex }));
            // GetAppListBind(userIdCode[getIndex].user_id);
            GetAppListBind_Vrn1(userIdCode[getIndex].user_id);
            GetUserAvailableForms('');
            GetUserApplicableForms('');
        }

        if (flag == 'APP_CODE' && e && e.target.innerText && appCode.length > 0) {
            let getIndex = findSelectedTypeValue(appCode, 'label', e.target.innerText);
            setSelectedDropdown((prev) => ({ ...prev, AppCode: getIndex }));
            GetUserAvailableForms(appCode[getIndex].app_id);
            GetUserApplicableForms(appCode[getIndex].app_id);
        }
    };

    const handleItemClick = (item: UserApplicableManus) => {
        if (selectAvlbleForms.length > 0) {
            let indx = selectAvlbleForms.findIndex((x: { form_code: any }) => x.form_code === item.form_code);
            const updatedItems = UserAvailableForms.map((menu) => (menu.form_code === item.form_code ? { ...menu, selected: !menu.selected } : menu));
            setUserAvailableForms(updatedItems);
            if (indx >= 0) selectAvlbleForms.splice(indx, 1);
            else selectAvlbleForms.push(item);
        } else {
            const updatedItems = UserAvailableForms.map((menu) => (menu.form_code === item.form_code ? { ...menu, selected: !menu.selected } : menu));
            setUserAvailableForms(updatedItems);
            selectAvlbleForms.push(item);
        }
    };

    const deSelectForm = (form: UserApplicableManus) => {
        if (removedApplicableForms.length > 0) {
            let indx = removedApplicableForms.findIndex((x: { form_code: any }) => x.form_code === form.form_code);
            const updatedItems = UserApplicableForms.map((menu) => (menu.form_code === form.form_code ? { ...menu, selected: !menu.selected } : menu));
            setUserApplicableForms(updatedItems);
            if (indx >= 0) removedApplicableForms.splice(indx, 1);
            else removedApplicableForms.push(form);
        } else {
            const updatedItems = UserApplicableForms.map((menu) => (menu.form_code === form.form_code ? { ...menu, selected: !menu.selected } : menu));
            setUserApplicableForms(updatedItems);
            removedApplicableForms.push(form);
        }
    };

    const addForms = async () => {
        for (let i = 0; i < selectAvlbleForms.length; i++) {
            if (!UserApplicableForms.some((el: { form_code: string }) => el.form_code == selectAvlbleForms[i].form_code)) {
                UserApplicableForms.push(JSON.parse(JSON.stringify(selectAvlbleForms[i])));
                let index = UserAvailableForms.findIndex((item) => item.form_code == selectAvlbleForms[i].form_code);
                if (index >= 0) UserAvailableForms.splice(index, 1);
            } else continue;
            if (selectAvlbleForms.length - 1 == i) {
                let data = UserAvailableForms;
                setUserAvailableForms(data);
            }
        }
        selectAvlbleForms = [];
        let data: any[] = UserApplicableForms.map((item: { selected: boolean }) => {
            item.selected = false;
            return item;
        });
        setUserApplicableForms(data);
    };

    const removeForms = async () => {
        for (let i = 0; i < removedApplicableForms.length; i++) {
            let indx = UserApplicableForms.findIndex((x: { form_code: any }) => x.form_code === removedApplicableForms[i].form_code);
            // let depotArrIndex = UserAvailableForms.findIndex(
            //   (x: { form_desc: any }) =>
            //     x.form_desc === removedApplicableForms[i].form_desc
            // );
            // if (depotArrIndex >= 0) {
            removedApplicableForms[i].selected = false;
            UserAvailableForms.push(removedApplicableForms[i]);
            // let data = UserAvailableForms;
            // setUserAvailableForms(data);
            // }
            if (indx >= 0) {
                removedApplicableForms[i].selected = false;
                UserApplicableForms.splice(indx, 1);
                let aplicForm: any = JSON.parse(JSON.stringify(UserApplicableForms));
                setUserApplicableForms(aplicForm);
            }

            if (removedApplicableForms.length - 1 == i) {
                // let data = UserApplicableForms;
                // setUserApplicableForms(data);
                let availFormData: any = JSON.parse(JSON.stringify(UserAvailableForms));
                setUserAvailableForms(availFormData);
            }
        }
        removedApplicableForms = [];
    };

    const validateData = (data: any) => {
        let isValid: boolean = true;
        try {
            if (data.userGroup == '') {
                // this.common.presentToast('No User Group Found', 'error');
                return false;
            }
            if (data.form_list_access.length == 0) {
                // this.common.presentToast('No Form Found', 'error');
                return false;
            }
        } catch (error) {
            isValid = false;
        }
        return isValid;
    };

    const saveUserFormAccess = async () => {
        let formList = JSON.parse(JSON.stringify(UserApplicableForms));
        for (let j = 0; j < formList.length; j++) {
            if (formList[j].form_desc) {
                formList[j]['parent_code'] = 0;
                delete formList[j]['form_desc'];
                delete formList[j]['selected'];
            }
        }
        let userDetails: any = JSON.parse(localStorage.getItem('auth') || '');
        const data = {
            appid: selectedDropdown.AppCode !== -1 ? appCode[selectedDropdown.AppCode].app_id : null,
            userid: selectedDropdown.User !== -1 ? userIdCode[selectedDropdown.User].user_id : '',
            sourceType: selectedDropdown.SourceTypeCode !== -1 ? sourceType[selectedDropdown.SourceTypeCode].value : '',
            userGroup: selectedDropdown.UserGroup !== -1 ? userGroupCode[selectedDropdown.UserGroup].group_code : '',
            created_user: userDetails.state.userDetails.user_id,
            form_list_access: formList,
        };

        if (validateData(data)) {
            try {
                commonAlert('Are you sure?', '', 'warning').then(async (result: any) => {
                    if (result.value) {
                        const response: any = await UserFormAccessInsert(data);
                        if (response.response_message) {
                            commonSuccessToast(response.response_message).then(async (result: any) => {
                                if (result) {
                                    GetUserAvailableForms('');
                                    GetUserApplicableForms('');
                                }
                            });
                        } else commonErrorToast(response.errorMessage).then(async (result: any) => { });
                    }
                });
            } catch (error) {
                setIsError(true);
                return;
            }
            setIsError(false);
            setIsLoading(false);
            setIsRefetching(false);
        } else await commonErrorToastMulty('Applicable Forms can not blank !');
    };
    // =====================================

    return (
        <>
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-2">
                <h5 className="text-lg font-semibold dark:text-white-light">User Form Access</h5>
            </div>
            <div className="panel mb-2">
                <form className=" border-1 space-y-5">
                    <div className="grid grid-cols-4 grid-rows-1 gap-2">
                        <div className="col-span-4 sm:col-span-2 md:col-span-1">
                            <label className="formLabel">Source</label>
                            <Select
                                isSearchable={true}
                                value={sourceType[selectedDropdown.SourceTypeCode]}
                                options={sourceType}
                                onChange={() => {
                                    handleTypeSelect(event, 'SOURCE_TYPE_CODE');
                                }}
                            />
                        </div>
                        <div className="col-span-4 sm:col-span-2 md:col-span-1">
                            <label className="formLabel">User Group</label>
                            <Select
                                value={userGroupCode[selectedDropdown.UserGroup]}
                                options={userGroupCode} //groupCode
                                isSearchable={true}
                                onChange={() => {
                                    handleTypeSelect(event, 'USER_GROUP');
                                }}
                            />
                        </div>
                        <div className="col-span-4 sm:col-span-2 md:col-span-1">
                            <label className="formLabel">User Id</label>
                            <Select
                                value={userIdCode[selectedDropdown.User]}
                                options={userIdCode} //allUserList
                                isSearchable={true}
                                onChange={() => {
                                    handleTypeSelect(event, 'USER');
                                }}
                            />
                        </div>
                        <div className="col-span-4 sm:col-span-2 md:col-span-1">
                            <label className="formLabel">App Name</label>
                            <Select
                                value={appCode[selectedDropdown.AppCode]}
                                options={appCode} //appCodeList
                                isSearchable={true}
                                onChange={() => {
                                    handleTypeSelect(event, 'APP_CODE');
                                }}
                            />
                        </div>
                    </div>
                </form>

                <div className="grid grid-cols-3">
                    <div className="panel mt-5">
                        <div className="flex items-center justify-center">
                            <h5 className="text-lg font-semibold dark:text-white-light">Applicable Forms</h5>
                        </div>
                        {UserApplicableForms.length > 0 && (
                            <div className="manuList mt-3">
                                <div className="flex flex-col rounded-md border border-white-light dark:border-[#1b2e4b]">
                                    {UserApplicableForms.map((menus: UserApplicableManus) => {
                                        return (
                                            <div
                                                key={menus.form_code}
                                                onClick={() => deSelectForm(menus)}
                                                className={
                                                    menus.selected == true
                                                        ? 'border-b border-white-light bg-primary px-4 py-2.5 text-white shadow-[0_1px_15px_1px_rgba(67,97,238,0.15)] dark:border-[#1b2e4b]'
                                                        : 'border-b border-white-light px-4 py-2.5 dark:border-[#1b2e4b]'
                                                }
                                            >
                                                {menus.form_desc}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="col-start-2 row-start-1 mt-5 inline-flex justify-evenly" style={{ alignItems: 'center' }}>
                        <button type="button" className="btn btn-primary rounded-full" style={{ fontSize: '1.4rem !important' }} onClick={addForms}>
                            <FaAngleDoubleLeft />
                        </button>
                        <button type="button" className="btn btn-primary rounded-full" style={{ fontSize: '1.4rem !important' }} onClick={removeForms}>
                            <FaAngleDoubleRight />
                        </button>
                    </div>
                    <div className="col-start-3 row-start-1">
                        <div className="panel mt-5">
                            <div className="flex items-center justify-center">
                                <h5 className="text-lg font-semibold dark:text-white-light">Available Forms</h5>
                            </div>
                            {UserAvailableForms.length > 0 && (
                                <div className="manuList mt-3">
                                    <div className="flex flex-col rounded-md border border-white-light dark:border-[#1b2e4b]">
                                        {UserAvailableForms.map((menus: UserApplicableManus) => {
                                            return (
                                                <div
                                                    key={menus.form_code}
                                                    onClick={() => handleItemClick(menus)}
                                                    className={
                                                        menus.selected == true
                                                            ? 'border-b border-white-light bg-primary px-4 py-2.5 text-white shadow-[0_1px_15px_1px_rgba(67,97,238,0.15)] dark:border-[#1b2e4b]'
                                                            : 'border-b border-white-light px-4 py-2.5 dark:border-[#1b2e4b]'
                                                    }
                                                >
                                                    {menus.form_desc}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mb-2">
                    {/* inline-flex justify-center" style={{ alignItems: 'center' }} */}
                    <div className="flex items-center justify-center">
                        <button type="button" className="btn btn-primary mr-2 mt-8" onClick={saveUserFormAccess}>
                            Submit
                        </button>

                        <button type="button" className="btn btn-danger mt-8">
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(UserFormAccess);
