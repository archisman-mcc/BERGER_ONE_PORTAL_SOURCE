import { IoMdSave } from 'react-icons/io';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { Tab } from '@headlessui/react';
import { FiUserPlus } from "react-icons/fi";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdOutlineArrowBack } from "react-icons/md";

import { Fragment, useEffect, useState, type JSXElementConstructor, type ReactElement, type ReactNode, type ReactPortal } from "react";
import { allErrorMsg, selectedDropdownInit, UserGroupInit, UserInsertDto, type I_UserDetails, type SELECTED_DROPDOWN, type UserInsert, type validationObj } from "../../../services/constants/interfaces/user-profile.interface";
import { UserProfileStore } from "../../../services/store/UserProfileStore";
import { useNavigate } from "react-router-dom";
import { UseAuthStore } from "../../../services/store/AuthStore";
import { GetAllUserGroupList, GetApplicableAppList, GetApplicableDepotList, GetAppList, GetDeptList, GetTerrDepotWise, GetUserDetails, UserProfileInsert } from "../../../services/api/users/UserProfile";
import { commonAlert } from "../../../services/functions/commonAlert";
import moment from "moment";
import { commonErrorToast, commonSuccessToast } from "../../../services/functions/commonToast";
// import ApiLoader from "../ApiLoader";
import { GetProdDevImgRouteBuilder } from "../../../services/functions/getProdDevUrlBuilder";
import type { MultiValue, ActionMeta } from 'react-select';
// import { Tab } from "@mui/material";

const UserProfileForm = () => {
    var regmobile = /^[6789][0-9]{9}$/;
    var today: any = new Date();
    let currentUserDetails: I_UserDetails = UserProfileStore((state) => state.selectedUserProfile);
    const [IsLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState<validationObj>(allErrorMsg);
    const [UserInfoData, setUserInfoData] = useState<UserInsert>(UserInsertDto);
    const [DepartmentList, setDepartmentList] = useState<any>([]);
    const [selectedDropdown, setSelectedDropdown] = useState<SELECTED_DROPDOWN>(selectedDropdownInit);
    const [dateOfJoin, setDateOfJoin] = useState<any>(today);
    const [depot, setDepot] = useState<any>([]);
    // const [reportingManager, setreportingManager] = useState<any>([]);
    const [activeStatus, setActiveStatus] = useState<any>('Y');
    const [isMounted, setIsMounted] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [AppselectedOptions, setAppSelectedOptions] = useState<any>([]);
    const [UserAppSelect, setUserAppSelect] = useState<any>([]);
    //const [UserAppDepot, setUserAppDepot] = useState<any>([]);
    const [UserGrp, setUserGrp] = useState<any>([]);
    const [hasTerritories, setHasTerritories] = useState(false);
    const [fetchedTransformedData, setFetchedTransformedData] = useState<any>([]);

    const [UserAppDepotTabWise, setUserAppDepotTabWise] = useState<{ [key: number]: any[] }>({});


    const [tabValues, setTabValues] = useState<any>({});
    // const router = useRouter();
    const navigate = useNavigate();
    const user = UseAuthStore((state: any) => state.userDetails);

    useEffect(() => {
        const initialFormValues: { [key: number]: any } = { ...tabValues };
        UserAppSelect.forEach((app: { value: any; label: any; }, index: number) => {
            const appExists = Object.values(tabValues).some((tab: any) => tab.value === app.value);
            if (!appExists) {
                initialFormValues[index] = {
                    label: app.label,
                    value: app.value,
                    userGroup: UserGroupInit,
                    selectedDepots: [],
                    territories: [],
                    selectedTerritories: [],
                };
            }
        });
        setTabValues(initialFormValues);
        setIsMounted(true);
    }, [UserAppSelect]);

    useEffect(() => {
        console.log('tabValues ==>', tabValues)
    }, [tabValues]);

    const hasValuesInArrays = (obj: any): boolean => {
        for (const key in obj) {
            if (Array.isArray(obj[key].selectedDepots) && obj[key].selectedDepots.length > 0) {
                return true;
            }
            if (Array.isArray(obj[key].selectedTerritories) && obj[key].selectedTerritories.length > 0) {
                return true;
            }
        }
        return false;
    };

    const handleTabChange = (index: any) => {
        setActiveTab(index);
    };

    const setErrorMsg = (msg: string, prop: string) => {
        // setErrMsg((prev) => ({ ...prev, errMsg[msgProperty]: msg }));
        setErrMsg((prev) => ({ ...prev, [`${prop}`]: msg }));
    };

    const getDate = (date: any) => {
        // if (date) setDateOfJoin(moment(date[0]).format('YYYY-MM-DD'));
        if (date) setDateOfJoin(date[0]);
    };

    const handelChange = async (e: any) => {
        const { name, value } = e.target;
        // if (name == 'ef_customer_pincode' && value.length == 6) GetDepotListByPinCode(value);

        setUserInfoData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const findSelectedTypeValue = (arr: any[], arrPropName: string, checkValue: string) => {
        if (arr && arr.length > 0) {
            const selectedValue = arr.findIndex((item: any) => item[arrPropName].trim() == checkValue);
            return selectedValue == -1 ? -1 : selectedValue;
        } else {
            return -1;
        }
    };

    // const handleAppChange = (selectedOptions) => {
    //     debugger
    //     setUserAppSelect(selectedOptions);
    //     setErrorMsg('', 'applicableApp');

    //     selectedOptions.forEach((app, index) => {
    //         fetchDepotForTab(index, app.value);

    //         setTabValues((prev) => ({
    //             ...prev,
    //             [index]: {
    //                 ...prev[index],
    //                 territories: [],
    //                 selectedTerritories: [],
    //             },
    //         }));
    //     });



    //     setTabValues((prevTabValues) => {
    //         const updatedTabValues = { ...prevTabValues };

    //         // Get the app values from selectedOptions
    //         const selectedAppValues = selectedOptions.map((option) => option.value);

    //         // Remove apps from tabValues that are not in selectedAppValues
    //         for (const key in updatedTabValues) {
    //             if (!selectedAppValues.includes(updatedTabValues[key].value)) {
    //                 delete updatedTabValues[key];
    //             }
    //         }

    //         return updatedTabValues;
    //     });
    // };


    const handleAppChange = (selectedOptions: MultiValue<any>, _actionMeta: ActionMeta<any>) => {
        // Convert readonly MultiValue to mutable array
        const mutableOptions = Array.isArray(selectedOptions) ? [...selectedOptions] : [];
        setUserAppSelect(mutableOptions);
        setErrorMsg('', 'applicableApp');

        setTabValues((prev: any) => {
            const updated = { ...prev };
            const selectedAppValues = mutableOptions.map((opt) => opt.value);

            mutableOptions.forEach((app, index) => {
                if (!Object.values(updated).some((t: any) => t.value === app.value)) {
                    updated[index] = {
                        label: app.label,
                        value: app.value,
                        userGroup: UserGroupInit,
                        selectedDepots: [],
                        territories: [],
                        selectedTerritories: [],
                    };

                    fetchDepotForTab(index, app.value);
                }
            });

            Object.keys(updated).forEach((key) => {
                if (!selectedAppValues.includes(updated[key].value)) {
                    delete updated[key];
                }
            });

            return updated;
        });
    };

    const handleTypeSelect = (e: any, flag: 'user_department' | 'user_depot' | 'user_app') => {
        if (flag == 'user_department' && e && e.target.innerText) setSelectedDropdown((prev) => ({ ...prev, userDepartment: findSelectedTypeValue(DepartmentList, 'value', e.target.innerText) }));
        if (flag == 'user_depot' && e && e.target.innerText) setSelectedDropdown((prev) => ({ ...prev, userDepot: findSelectedTypeValue(depot, 'label', e.target.innerText) }));
        if (flag == 'user_app' && e && e.target.innerText) setSelectedDropdown((prev) => ({ ...prev, userAppSelectedOptions: findSelectedTypeValue(AppselectedOptions, 'label', e.target.innerText) }));
    };

    const labelValueConverter = (arr: any[], propertyNameLabel: string, propertyNameValue: string) => {
        if (!Array.isArray(arr)) return [];
        arr.forEach((element) => {
            element['value'] = element[propertyNameValue];
            element['label'] = element[propertyNameLabel];
        });
        return arr;
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;
        if (!/\d/.test(String(value)) || String(value).length > 10) {
            event.preventDefault();
        }
    };

    function validMobile(MobileNum: any) {
        if (!regmobile.test(MobileNum) && MobileNum != '') {
            setErrorMsg('Enter a Valid 10 digit Mobile Number', 'mobileNo');
            return false;
        } else {
            setErrorMsg('', 'mobileNo');
            return true;
        }
    }

    const handleActiveCheck = (event: any) => {
        if (event.target.checked) {
            setActiveStatus('Y');
        } else {
            setActiveStatus('N');
        }
        setUserInfoData((prevData: any) => ({
            ...prevData,
            active: activeStatus,
        }));
    };

    const GetDeptListData = async () => {
        const data = {
            lov_type: 'DEPT_TYPE',
            active: 'Y',
        };
        try {
            const response: any = await GetDeptList(data);
            labelValueConverter(response.data, 'lov_value', 'lov_code');
            setDepartmentList(response.data);
            if (currentUserDetails?.usp_dept != '' && currentUserDetails?.usp_dept != null) {
                setSelectedDropdown((prev) => ({ ...prev, userDepartment: findSelectedTypeValue(response.data, 'lov_code', currentUserDetails?.usp_dept) }));
            }
        } catch (error) {
            return;
        }
    };

    const GetApplicableDepot = async () => {
        const data: any = {
            user_id: user.user_id,
            region: '',
            app_id: '10',
        };
        try {
            const response: any = await GetApplicableDepotList(data);
            labelValueConverter(response.data, 'depot_name', 'depot_code');
            setDepot(response.data);
            //setUserAppDepot(response.data);
            if (currentUserDetails?.usp_depot != '' && currentUserDetails?.usp_depot != null) {
                setSelectedDropdown((prev) => ({ ...prev, userDepot: findSelectedTypeValue(response.data, 'depot_code', currentUserDetails?.usp_depot) }));
            }
        } catch (error) {
            return;
        }
    };

    const fetchDepotForTab = async (tabIndex: number, appId: string) => {
        const data: any = {
            user_id: user.user_id,
            region: '',
            app_id: appId,
        };

        try {
            const response: any = await GetApplicableDepotList(data);

            if (response && Array.isArray(response.data)) {
                const depots = labelValueConverter(response.data, 'depot_name', 'depot_code');
                setUserAppDepotTabWise((prev) => ({
                    ...prev,
                    [tabIndex]: depots,
                }));
            } else {
                console.warn(`No depot data received for tab ${tabIndex}`);
                setUserAppDepotTabWise((prev) => ({
                    ...prev,
                    [tabIndex]: [],
                }));
            }
        } catch (error) {
            console.error('Failed to fetch depot for tab', error);
            setUserAppDepotTabWise((prev) => ({
                ...prev,
                [tabIndex]: [],
            }));
        }
    };

    const fetchTerritoriesForTab = async (tabIndex: number, selectedDepots: any[]) => {
        debugger
        if (!selectedDepots || selectedDepots.length === 0) {
            // Clear if no depots selected
            setTabValues((prev: any[]) => ({
                ...prev,
                [tabIndex]: {
                    ...prev[tabIndex],
                    territories: [],
                    selectedTerritories: [],
                },
            }));
            return;
        }

        const depotCodes = selectedDepots.map((d) => d.value).join(',');
        const data: any = {
            depot_code: depotCodes,
        };

        try {
            const response: any = await GetTerrDepotWise(data);
            if (response && Array.isArray(response.data)) {
                const territoryList = labelValueConverter(response.data, 'terr', 'terr_code');

                setTabValues((prev: any[]) => {
                    const prevSelected = prev[tabIndex]?.selectedTerritories || [];

                    // Make sure we only keep ones that still exist in the new territory list
                    const validSelected = prevSelected.filter((sel: { value: any; }) =>
                        territoryList.some((terr) => terr.value === sel.value)
                    );

                    console.log("validSelected -->>", validSelected)

                    return {
                        ...prev,
                        [tabIndex]: {
                            ...prev[tabIndex],
                            territories: territoryList,
                            selectedTerritories: validSelected, // ✅ Preserve matching selections
                        },
                    };
                });

                setHasTerritories(territoryList.length > 0);
            } else {
                setTabValues((prev: any[]) => ({
                    ...prev,
                    [tabIndex]: {
                        ...prev[tabIndex],
                        territories: [],
                        selectedTerritories: [],
                    },
                }));
            }
        } catch (error) {
            console.error(`Error fetching territories for tab ${tabIndex}`, error);
        }
    };

    const GetAppData = async () => {
        const data: any = {};
        try {
            const response: any = await GetAppList(data);
            labelValueConverter(response.data, 'oam_app_name', 'oam_app_id');
            setAppSelectedOptions(response.data);
            // if (currentCustomerDetails?.cm_customer_state != '' && currentCustomerDetails?.cm_customer_state != null) {
            //     setSelectedDropdown((prev) => ({ ...prev, LeadState: findSelectedTypeValue(response.data, 'state_code', currentCustomerDetails?.cm_customer_state) }));
            // }
        } catch (error) {
            return;
        }
    };

    const GetUserApplApp = async () => {
        let currentUserId = '';
        if (currentUserDetails?.usp_user_id != '' && currentUserDetails?.usp_user_id != null) {
            currentUserId = currentUserDetails?.usp_user_id;
        }

        const data: any = {
            user_id: currentUserId,
        };
        try {
            const response: any = await GetApplicableAppList(data);
            if (response && response.data != null && response.data != undefined) {
                labelValueConverter(response.data, 'user_app_name', 'user_app_id');
                setUserAppSelect(response.data);
            }
        } catch (error) {
            return;
        }
    };

    const GetAllUserGroup = async () => {
        const data: any = {
            user_id: '',
        };
        try {
            const response: any = await GetAllUserGroupList(data);
            if (response && response.data != null && response.data != undefined) {
                const convertedData = labelValueConverter(response.data, 'usp_group_desc', 'usp_group_code');

                const dropdownOptions = [{ label: 'Select...', value: '', usp_group_desc: 'Select...', usp_group_code: '' }, ...convertedData];
                setUserGrp(dropdownOptions);
            }
        } catch (error) {
            return;
        }
    };

    const fetchTerritoriesByDepots = async (selectedDepots: any[]) => {
        const depotCodes = selectedDepots.map((d) => d.value).join(',');

        const data: any = {
            depot_code: depotCodes,
        };
        try {
            const response: any = await GetTerrDepotWise(data);
            if (response && response.data != null && response.data != undefined) {
                labelValueConverter(response.data, 'terr', 'terr_code');
                const responseData = await response.data;
                return responseData;
            }
        } catch (error) {
            return;
        }
    };

    const AllDepot = ({ tabindex }: { tabindex: number }) => {
        const selectedDepots = tabValues[tabindex]?.selectedDepots || [];
        const depotList = UserAppDepotTabWise[tabindex] || [];

        return (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-4">
                {depotList.map((item: any, index: any) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            checked={selectedDepots.some((d: { value: any; }) => d.value === item.value)}
                            onChange={(e) => handleDepotChange(tabindex, item, e.target.checked)}
                            className="peer form-checkbox outline-primary"
                        />
                        <span>{item.depot_name}</span>
                    </div>
                ))}
            </div>
        );
    };


    // const AllDepot = (prop) => {
    //     const selectedDepots = tabValues[prop.tabindex]?.selectedDepots || [];
    //     return (
    //         <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-4">
    //             {UserAppDepot &&
    //                 UserAppDepot.length > 0 &&
    //                 UserAppDepot.map((item: any, index: any) => {
    //                     return (
    //                         <div key={index}>
    //                             <input
    //                                 key={index}
    //                                 name={item.label}
    //                                 //value={item.isChecked}
    //                                 type="checkbox"
    //                                 className="peer form-checkbox outline-primary"
    //                                 //defaultChecked={item.isChecked}
    //                                 // checked={selectedDepots.some((d) => d.value === item.value)}
    //                                 checked={selectedDepots.some((d) => d.value === item.value)}
    //                                 onChange={(e) => {
    //                                     handleDepotChange(prop.tabindex, item, e.target.checked);
    //                                 }}
    //                             />
    //                             <span>{item.depot_name}</span>
    //                         </div>
    //                     );
    //                 })}
    //         </div>
    //     );
    // };

    const TerritoryCheckboxList = (prop: { tabIndex: number; }) => {
        const territories = tabValues[prop.tabIndex]?.territories || [];
        const selectedTerritories = tabValues[prop.tabIndex]?.selectedTerritories || [];
        return (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-4">
                {territories &&
                    territories.length > 0 &&
                    territories.map((item: any, index: any) => {
                        return (
                            <div key={index}>
                                <input
                                    key={index}
                                    name={item.label}
                                    //value={item.isChecked}
                                    type="checkbox"
                                    className="peer form-checkbox outline-primary"
                                    //defaultChecked={item.isChecked}
                                    // checked={selectedTerritories.some((d) => d.value === item.value)}
                                    checked={selectedTerritories.some((d: { value: any; }) => d.value === item.value)}
                                    onChange={(e) => {
                                        handleTerritoryChange(prop.tabIndex, item, e.target.checked);
                                    }}
                                />
                                <span>{item.terr}</span>
                            </div>
                        );
                    })}
            </div>
        );
    };

    const transformData = (response: any) => {
        // Create a map of app_id to app data
        const appMap = response.userApps.reduce((acc: any, app: any) => {
            acc[app.app_id] = {
                label: app.app_name,
                value: app.app_id,
                userGroup: [],
                selectedDepots: [],
                territories: [],
                selectedTerritories: [],
            };
            return acc;
        }, {});

        // Add usergroup to the app map
        response.userGroup.forEach((group: any) => {
            if (appMap[group.app_id]) {
                appMap[group.app_id].userGroup.push({
                    usp_group_code: group.usp_group_code,
                    usp_group_desc: group.usp_group_desc,
                    value: group.usp_group_code,
                    label: group.usp_group_desc,
                });
            }
        });

        // Add depots to the app map
        response.userDepot.forEach((depot: any) => {
            if (appMap[depot.app_id]) {
                appMap[depot.app_id].selectedDepots.push({
                    depot_code: depot.depot_code,
                    depot_name: depot.depot_name,
                    value: depot.depot_code,
                    label: depot.depot_name,
                });
            }
        });

        // Add territory to the app map

        response.allTerr.forEach((terr: any) => {
            if (appMap[terr.app_id]) {
                appMap[terr.app_id].territories.push({
                    terr_code: terr.terr_code,
                    terr: terr.terr,
                    value: terr.terr_code,
                    label: terr.terr,
                });
            }
        });

        response.userTerr.forEach((userterr: any) => {
            if (appMap[userterr.app_id]) {
                appMap[userterr.app_id].selectedTerritories.push({
                    terr_code: userterr.terr_code,
                    terr: userterr.terr,
                    value: userterr.terr_code,
                    label: userterr.terr,
                });
            }
        });
        return Object.values(appMap);
    };

    useEffect(() => {
        if (fetchedTransformedData.length > 0 && UserAppSelect.length > 0) {
            fetchedTransformedData.forEach((tabData: { value: string; selectedDepots: string | any[]; }) => {
                const index = UserAppSelect.findIndex((app: { value: any; }) => app.value === tabData.value);
                if (index !== -1) {
                    fetchDepotForTab(index, tabData.value);

                    if (Array.isArray(tabData.selectedDepots) && tabData.selectedDepots.length > 0) {
                        fetchTerritoriesForTab(index, tabData.selectedDepots);
                    }
                }
            });
        }


    }, [fetchedTransformedData, UserAppSelect]);


    const GetSelectedUserDetails = async () => {
        const data: any = {
            userId: currentUserDetails.usp_user_id,
        };
        try {
            const response: any = await GetUserDetails(data);

            if (response.data !== null && response.data.userDetails.length > 0) {
                let userdoj = response.data.userDetails[0]?.usp_doj == null ? '' : response.data.userDetails[0].usp_doj;

                let userobj: UserInsert = {
                    userId: response.data.userDetails[0]?.usp_user_id == null ? '' : response.data.userDetails[0].usp_user_id,
                    firstName: response.data.userDetails[0]?.usp_first_name == null ? '' : response.data.userDetails[0].usp_first_name,
                    lastName: response.data.userDetails[0]?.usp_last_name == null ? '' : response.data.userDetails[0].usp_last_name,
                    employeeId: response.data.userDetails[0]?.usp_employee_id == null ? '' : response.data.userDetails[0].usp_employee_id,
                    department: response.data.userDetails[0]?.usp_dept == null ? '' : response.data.userDetails[0]?.usp_dept,
                    emailId: response.data.userDetails[0]?.usp_mailid == null ? '' : response.data.userDetails[0].usp_mailid,
                    mobileNo: response.data.userDetails[0]?.usp_mobile == null ? '' : response.data.userDetails[0].usp_mobile,
                    dateOfJoining: '',
                    depot: response.data.userDetails[0]?.usp_depot == null ? '' : response.data.userDetails[0].usp_depot,
                    active: response.data.userDetails[0]?.active == null ? '' : response.data.userDetails[0].active,
                    designation: response.data.userDetails[0]?.usp_desig == null ? '' : response.data.userDetails[0].usp_desig,
                    applicableApp: [],
                    appWiseData: [],
                };
                const transformedData = transformData(response.data);



                setDateOfJoin(userdoj);
                setUserInfoData(JSON.parse(JSON.stringify(userobj)));
                setActiveStatus(userobj.active);
                GetDeptListData();
                GetApplicableDepot();
                GetAppData();
                GetUserApplApp();
                GetAllUserGroup();
                //setTabValues(transformedData);

                setFetchedTransformedData(transformedData);

            }
        } catch (error) {
            return;
        }
    };

    useEffect(() => {
        if (fetchedTransformedData.length > 0 && !hasValuesInArrays(tabValues)) {
            setTabValues(fetchedTransformedData);
            setHasTerritories(true);
        }
    }, [fetchedTransformedData, tabValues]);

    const handleBackButton = () => {
        commonAlert('Are you sure?', '', 'warning').then(async (result: any) => {
            if (result.value) {
                navigate('/admin/users/userListView');
            }
        });
    };

    useEffect(() => {
        if (currentUserDetails ?? '') {
            GetSelectedUserDetails();
        } else {
            setIsLoading(true);
            GetDeptListData();
            GetApplicableDepot();
            GetAppData();
            GetAllUserGroup();
            setIsLoading(false);
        }
    }, [currentUserDetails]);

    const extractAppWiseNeededValues = (tabValue: any) => {
        return tabValue.map((tab: { userGroup: any[]; label: any; value: any; selectedDepots: any[]; selectedTerritories: any[]; }) => {
            const userGroup = Array.isArray(tab.userGroup) ? tab.userGroup[0] : tab.userGroup;

            return {
                label: tab.label || '',
                value: tab.value || '',
                userGroup: userGroup ? userGroup.value : '',
                selectedDepots: tab.selectedDepots?.length > 0 ? tab.selectedDepots.map((d: { value: any; }) => d.value).join(',') : '',
                selectedTerritories: tab.selectedTerritories?.length > 0 ? tab.selectedTerritories.map((d: { value: any; }) => d.value).join(',') : '',
            };
        });
    };

    const handleFormSubmit = async (flag: 'submit' | 'update') => {
        const simplifiedTabValues = extractAppWiseNeededValues(Object.values(tabValues));
        debugger
        let submitObj: UserInsert = {
            userId: UserInfoData.userId,
            firstName: UserInfoData.firstName,
            lastName: UserInfoData.lastName,
            employeeId: UserInfoData.employeeId,
            department: selectedDropdown.userDepartment !== -1 ? DepartmentList[selectedDropdown.userDepartment].lov_code : '',
            emailId: UserInfoData.emailId,
            mobileNo: UserInfoData.mobileNo,
            dateOfJoining: moment(dateOfJoin, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            depot: selectedDropdown.userDepot !== -1 ? depot[selectedDropdown.userDepot].depot_code : '',
            applicableApp: '',
            active: activeStatus,
            designation: UserInfoData.designation,
            appWiseData: simplifiedTabValues,
        };
        let errorCount = 0;

        if (!submitObj.userId) {
            setErrorMsg('UserId Id Missing', 'userId');
            commonErrorToast('UserId Id Missing');
            errorCount++;
        }

        if (!submitObj.firstName) {
            setErrorMsg('First Name Is Missing', 'firstName');
            commonErrorToast('First Name Is Missing');
            errorCount++;
        }

        if (!submitObj.employeeId) {
            setErrorMsg('Employee Id Missing', 'employeeId');
            commonErrorToast('Employee Id Missing');
            errorCount++;
        }
        if (!submitObj.department) {
            setErrorMsg('Department is  Missing', 'department');
            commonErrorToast('Department is  Missing');
            errorCount++;
        }

        if (!submitObj.mobileNo) {
            setErrorMsg('Mobile No Is Missing', 'mobileNo');
            commonErrorToast('Mobile No Is Missing');
            errorCount++;
        }

        if (!submitObj.dateOfJoining) {
            setErrorMsg('Date Of Joing Is Missing', 'dateOfJoining');
            commonErrorToast('Date Of Joing Is Missing');
            errorCount++;
        }

        if (!submitObj.depot) {
            setErrorMsg('depot Is Missing', 'depot');
            commonErrorToast('depot Is Missing');
            errorCount++;
        }

        simplifiedTabValues.forEach((tab: any, index: number) => {
            debugger
            if (tab.userGroup == '') {
                setErrorMsg(`User Group is missing`, `tab_${index}_userGroup`);
                commonErrorToast(`User Group missing in tab ${tab.label}`);
                errorCount++;
            }

            if (tab.selectedDepots === '') {
                setErrorMsg(`Depots missing in tab ${tab.label}`, `tab_${index}_depots`);
                commonErrorToast(`Depots missing in tab ${tab.label}`);
                errorCount++;
            }
            if (tab.selectedTerritories === '') {
                setErrorMsg(`Territories missing in tab ${tab.label}`, `tab_${index}_territories`);
                commonErrorToast(`Territories missing in tab ${tab.label}`);
                errorCount++;
            }
        });

        if (errorCount > 0) {
            return;
        } else {
            debugger
            if (flag == 'submit') {
                await showSubmitAlert(submitObj);
            } else {
                await showUpdateAlert(submitObj);
            }
        }
    };

    async function showSubmitAlert(data: any) {
        commonAlert('Are you want to insert the User Info?', '', 'warning').then(async (result: any) => {
            if (result.value) {
                const response: any = await UserProfileInsert(data);
                if (response.response_message) {
                    commonSuccessToast('User Details Inserted Successfully');
                    navigate('/admin/users/userListView');
                }
            }
        });
    }

    async function showUpdateAlert(data: any) {
        commonAlert('Are you want to update the User Info?', '', 'warning').then(async (result: any) => {
            if (result.value) {
                debugger
                const response: any = await UserProfileInsert(data);
                if (response.response_message) {
                    commonSuccessToast('User Details Updated Successfully');
                    navigate('/admin/users/userListView');
                }
            }
        });
    }

    /// dynamic tabs ///
    const handleInputChange = (index: string | number, field: string, value: any) => {
        setTabValues((prevValues: { [x: string]: any; }) => ({
            ...prevValues,
            [index]: {
                ...prevValues[index],
                [field]: value,
            },
        }));
    };

    const handleUserGrpChange = (index: any, selectedOption: any) => {
        handleInputChange(index, 'userGroup', selectedOption);
    };

    const handleDepotChange = async (index: number, depot: any, isChecked: boolean) => {
        // Get current state
        const prevDepots = tabValues[index]?.selectedDepots || [];
        const prevSelectedTerritories = tabValues[index]?.selectedTerritories || [];

        // Compute new depots
        const updatedDepots = isChecked
            ? [...prevDepots.filter((d: { value: any; }) => d.value !== depot.value), depot]
            : prevDepots.filter((d: { value: any; }) => d.value !== depot.value);

        // Immediately set new depots (without touching territories yet)
        setTabValues((prev: any[]) => ({
            ...prev,
            [index]: {
                ...prev[index],
                selectedDepots: updatedDepots
            },
        }));

        // Now fetch new territory list based on updated depots
        const depotCodes = updatedDepots.map((d: { value: any; }) => d.value).join(',');
        const data = { depot_code: depotCodes };

        try {
            const response: any = await GetTerrDepotWise(data);
            if (response && Array.isArray(response.data)) {
                const territoryList = labelValueConverter(response.data, 'terr', 'terr_code');

                // Preserve previously selected territories that still exist
                const validSelected = prevSelectedTerritories.filter((sel: { value: any; }) =>
                    territoryList.some((terr) => terr.value === sel.value)
                );

                setTabValues((prev: any[]) => ({
                    ...prev,
                    [index]: {
                        ...prev[index],
                        territories: territoryList,
                        selectedTerritories: validSelected
                    }
                }));

                setHasTerritories(territoryList.length > 0);
            } else {
                // No territories found
                setTabValues((prev: any[]) => ({
                    ...prev,
                    [index]: {
                        ...prev[index],
                        territories: [],
                        selectedTerritories: [],
                    },
                }));
            }
        } catch (error) {
            console.error(`Error fetching territories for tab ${index}`, error);
        }
    };

    const handleTerritoryChange = (index: number, territory: any, isChecked: boolean) => {
        const prevSelected = tabValues[index]?.selectedTerritories || [];
        const updated = isChecked
            ? [...prevSelected.filter((t: { value: any; }) => t.value !== territory.value), territory]
            : prevSelected.filter((t: { value: any; }) => t.value !== territory.value);

        setTabValues((prev: any[]) => ({
            ...prev,
            [index]: {
                ...prev[index],
                selectedTerritories: updated,
            },
        }));
    };



    //---- commented code ------//
    // const handleDepotChange = async (index: number, depot: any, isChecked: boolean) => {
    //     const updatedDepots = isChecked ? [...(tabValues[index]?.selectedDepots || []), depot] : (tabValues[index]?.selectedDepots || []).filter((d) => d.value !== depot.value);

    //     let territories = [];

    //     if (updatedDepots != null && updatedDepots != undefined) {
    //         territories = await fetchTerritoriesByDepots(updatedDepots);
    //     }

    //     if (territories != null && territories != undefined) {
    //         setTabValues((prevValues) => {
    //             return {
    //                 ...prevValues,
    //                 [index]: {
    //                     ...prevValues[index],
    //                     selectedDepots: updatedDepots,
    //                     territories: territories,
    //                     selectedTerritories: [],
    //                 },
    //             };
    //         });

    //         setHasTerritories(true);
    //     } else {
    //         setTabValues((prevValues) => {
    //             return {
    //                 ...prevValues,
    //                 [index]: {
    //                     ...prevValues[index],
    //                     selectedDepots: updatedDepots,
    //                     territories: [],
    //                     selectedTerritories: [],
    //                 },
    //             };
    //         });
    //         setHasTerritories(false);
    //     }
    // };

    // const handleTerritoryChange = (index: number, territory: any, isChecked: boolean) => {
    //     setTabValues((prev) => {
    //         const updatedTerritories = isChecked ? [...(prev[index]?.selectedTerritories || []), territory] : (prev[index]?.selectedTerritories || []).filter((t) => t.value !== territory.value);

    //         return {
    //             ...prev,
    //             [index]: {
    //                 ...prev[index],
    //                 selectedTerritories: updatedTerritories,
    //             },
    //         };
    //     });
    // };

    // Handle select all checkbox
    // const handleSelectAllChange = (index: number, isChecked: boolean) => {
    //     setTabValues((prevValues) => ({
    //         ...prevValues,
    //         [index]: {
    //             ...prevValues[index],
    //             selectedDepots: isChecked ? UserAppDepot : [],
    //         },
    //     }));
    // };

    const handleSelectAllChange = (index: number, isChecked: boolean) => {
        const depotList = UserAppDepotTabWise[index] || [];

        setTabValues((prevValues: any[]) => ({
            ...prevValues,
            [index]: {
                ...prevValues[index],
                selectedDepots: isChecked ? depotList : [],
            },
        }));
    };


    const handleSelectAllTerrChange = (index: number, isChecked: boolean) => {
        let terrTabValues = tabValues[index]?.territories || [];

        setTabValues((prevValues: any[]) => ({
            ...prevValues,
            [index]: {
                ...prevValues[index],
                selectedTerritories: isChecked ? terrTabValues : [],
            },
        }));
    };

    /// ----/////
    return (
        <>
            {/* {IsLoading && (
                <div className="mt-40">
                    <ApiLoader />
                </div>
            )} */}
            {!IsLoading && (
                <div className="table-responsive bg-white" id="pnlStickyHeader">
                    <div className="items-center bg-secondary-light px-2 py-2 md:flex">
                        <div className="flex items-center ">
                            <img className="mr-2 w-10" src={GetProdDevImgRouteBuilder('/assets/images/famous.png')} alt="" />
                            <h5 className="text-lg font-semibold dark:text-white-light">User Profile</h5>
                        </div>
                    </div>
                    <div></div>
                    <div className="grid grid-cols-12 grid-rows-1 gap-2">
                        <div className="panel col-span-12" id="icon">
                            <div>
                                {isMounted && (
                                    <Tab.Group selectedIndex={activeTab} onChange={handleTabChange}>
                                        <Tab.List className="mr-3 mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                                            <Tab as={Fragment}>
                                                {({ selected }) => (
                                                    <button
                                                        className={`${selected ? '!border-white-light !border-b-white font-bold text-primary !outline-none dark:!border-[#4361ee] dark:!border-b-black' : ''
                                                            }
                                                -mb-[1px] flex items-center border border-transparent p-3.5 py-2 hover:text-primary dark:hover:border-b-black`}
                                                    >
                                                        {/* <FeatherIcon className="mr-2" icon="user-plus" /> */}
                                                        <FiUserPlus className="mr-2" />

                                                        User Info
                                                    </button>
                                                )}
                                            </Tab>
                                            {UserAppSelect.map((app: { label: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: any) => (
                                                <Tab as={Fragment} key={index}>
                                                    {({ selected }) => (
                                                        <button
                                                            className={`${selected ? '!border-white-light !border-b-white font-bold text-primary !outline-none dark:!border-[#4361ee] dark:!border-b-black' : ''
                                                                }
                                                -mb-[1px] flex items-center border border-transparent p-3.5 py-2 hover:text-primary dark:hover:border-b-black`}
                                                        >
                                                            {/* <FeatherIcon className="mr-2" icon="check-circle" /> */}
                                                            <IoCheckmarkCircleOutline className="mr-2" />
                                                            {app.label}
                                                        </button>
                                                    )}
                                                </Tab>
                                            ))}
                                        </Tab.List>
                                        <Tab.Panels>
                                            <Tab.Panel>
                                                <div className="active pt-5">
                                                    <div>
                                                        <div className="bg-white p-0">
                                                            <fieldset className="">
                                                                <legend className="text-lg font-bold">Basic Info</legend>
                                                                <form className=" border-1 space-y-5">
                                                                    <div className="grid grid-cols-3 grid-rows-1 gap-4">
                                                                        <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                                                            <label className="formLabel">
                                                                                User Id: <span className="reqired">*</span>
                                                                            </label>
                                                                            <input
                                                                                name="userId"
                                                                                id="userId"
                                                                                type="text"
                                                                                placeholder="Enter User Id"
                                                                                className="form-input"
                                                                                value={UserInfoData.userId}
                                                                                onChange={handelChange}
                                                                                onFocus={() => {
                                                                                    setErrorMsg('', 'userId');
                                                                                }}
                                                                                disabled={currentUserDetails !== null}
                                                                            />
                                                                            {errMsg && errMsg.userId ? <div className="mt-1 text-danger">{errMsg.userId}</div> : ''}
                                                                        </div>
                                                                        <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                                                            <label className="formLabel">
                                                                                First Name: <span className="reqired">*</span>
                                                                            </label>
                                                                            <input
                                                                                name="firstName"
                                                                                id="firstName"
                                                                                type="text"
                                                                                placeholder="Enter First Name"
                                                                                className="form-input"
                                                                                value={UserInfoData.firstName}
                                                                                onChange={handelChange}
                                                                                onFocus={() => {
                                                                                    setErrorMsg('', 'name');
                                                                                }}
                                                                            />
                                                                            {errMsg && errMsg.firstName ? <div className="mt-1 text-danger">{errMsg.firstName}</div> : ''}
                                                                        </div>
                                                                        <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                                                            <label className="formLabel">Last Name:</label>
                                                                            <input
                                                                                name="lastName"
                                                                                id="lastName"
                                                                                type="text"
                                                                                placeholder="Enter Last Name"
                                                                                className="form-input"
                                                                                value={UserInfoData.lastName}
                                                                                onChange={handelChange}
                                                                                onFocus={() => {
                                                                                    setErrorMsg('', 'lastName');
                                                                                }}
                                                                            />
                                                                            {errMsg && errMsg.lastName ? <div className="mt-1 text-danger">{errMsg.lastName}</div> : ''}
                                                                        </div>
                                                                        <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                                                            <label className="formLabel">
                                                                                Employee Id: <span className="reqired">*</span>
                                                                            </label>
                                                                            <input
                                                                                name="employeeId"
                                                                                id="employeeId"
                                                                                type="text"
                                                                                placeholder="Enter Employee Id"
                                                                                className="form-input"
                                                                                value={UserInfoData.employeeId}
                                                                                onChange={handelChange}
                                                                                onFocus={() => {
                                                                                    setErrorMsg('', 'employeeId');
                                                                                }}
                                                                                disabled={currentUserDetails !== null}
                                                                            />
                                                                            {errMsg && errMsg.employeeId ? <div className="mt-1 text-danger">{errMsg.employeeId}</div> : ''}
                                                                        </div>
                                                                        <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                                                            <label className="formLabel">
                                                                                Department: <span className="reqired">*</span>
                                                                            </label>
                                                                            <Select
                                                                                value={DepartmentList[selectedDropdown.userDepartment]}
                                                                                options={DepartmentList}
                                                                                isSearchable={true}
                                                                                onChange={() => {
                                                                                    handleTypeSelect(event, 'user_department');
                                                                                    setErrorMsg('', 'department');
                                                                                }}
                                                                            />
                                                                            {errMsg && errMsg.department ? <div className="mt-1 text-danger">{errMsg.department}</div> : ''}
                                                                        </div>
                                                                        <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                                                            <label className="formLabel">Email Id:</label>
                                                                            <input
                                                                                name="emailId"
                                                                                id="emailId"
                                                                                type="email"
                                                                                placeholder="Enter Email Id"
                                                                                className="form-input"
                                                                                value={UserInfoData.emailId}
                                                                                onChange={handelChange}
                                                                                onFocus={() => {
                                                                                    setErrorMsg('', 'emailId');
                                                                                }}
                                                                            />
                                                                            {errMsg && errMsg.emailId ? <div className="mt-1 text-danger">{errMsg.emailId}</div> : ''}
                                                                        </div>
                                                                        <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                                                            <label className="formLabel">
                                                                                Mobile No.: <span className="reqired">*</span>
                                                                            </label>
                                                                            <input
                                                                                name="mobileNo"
                                                                                id="mobileNo"
                                                                                type="number"
                                                                                placeholder="Enter Mobile No"
                                                                                className="form-input"
                                                                                value={UserInfoData.mobileNo}
                                                                                onChange={handelChange}
                                                                                onKeyUp={handleKeyPress}
                                                                                onBlur={(e) => {
                                                                                    validMobile(e.target.value);
                                                                                }}
                                                                                onFocus={() => {
                                                                                    setErrorMsg('', 'mobileNo');
                                                                                }}
                                                                            />
                                                                            {errMsg && errMsg.mobileNo ? <div className="mt-1 text-danger">{errMsg.mobileNo}</div> : ''}
                                                                        </div>
                                                                        <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                                                            <label className="formLabel">
                                                                                Designation: <span className="reqired">*</span>
                                                                            </label>
                                                                            <input
                                                                                name="designation"
                                                                                id="designation"
                                                                                type="text"
                                                                                placeholder="Enter Designation"
                                                                                className="form-input"
                                                                                value={UserInfoData.designation}
                                                                                onChange={handelChange}
                                                                                onFocus={() => {
                                                                                    setErrorMsg('', 'designation');
                                                                                }}
                                                                            />
                                                                            {errMsg && errMsg.designation ? <div className="mt-1 text-danger">{errMsg.designation}</div> : ''}
                                                                        </div>
                                                                        <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                                                            <label className="formLabel">
                                                                                Date of Joining: <span className="reqired">*</span>
                                                                            </label>
                                                                            <Flatpickr
                                                                                value={dateOfJoin}
                                                                                options={{ dateFormat: 'd/m/Y', position: 'auto left' }}
                                                                                className="form-input"
                                                                                onChange={(date: any) => getDate(date)}
                                                                            />
                                                                            {errMsg && errMsg.dateOfJoining ? <div className="mt-1 text-danger">{errMsg.dateOfJoining}</div> : ''}
                                                                        </div>
                                                                        <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                                                            <label className="formLabel">
                                                                                Depot: <span className="reqired">*</span>
                                                                            </label>
                                                                            <Select
                                                                                menuPlacement="bottom"
                                                                                menuShouldScrollIntoView={true}
                                                                                value={depot[selectedDropdown.userDepot]}
                                                                                options={depot}
                                                                                isSearchable={true}
                                                                                onChange={() => {
                                                                                    handleTypeSelect(event, 'user_depot');
                                                                                    setErrorMsg('', 'depotlist');
                                                                                }}
                                                                            />
                                                                            {errMsg && errMsg.depot ? <div className="mt-1 text-danger">{errMsg.depot}</div> : ''}
                                                                        </div>
                                                                        <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                                                            <label className="formLabel">
                                                                                Applicable App: <span className="reqired">*</span>
                                                                            </label>
                                                                            <Select
                                                                                isMulti
                                                                                //name="applicableApp"
                                                                                options={AppselectedOptions}
                                                                                value={UserAppSelect}
                                                                                onChange={handleAppChange}
                                                                                className="basic-multi-select"
                                                                                classNamePrefix="select"
                                                                            />
                                                                            {errMsg && errMsg.applicableApp ? <div className="mt-1 text-danger">{errMsg.applicableApp}</div> : ''}
                                                                        </div>
                                                                        <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                                                            <label className="formLabel">Active</label>
                                                                            <div className="mt-2 flex">
                                                                                <label className="relative h-6 w-12">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        defaultChecked={activeStatus === 'Y'}
                                                                                        className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                                                                                        id="custom_switch_checkbox1"
                                                                                        checked={activeStatus === 'Y'}
                                                                                        onChange={() => {
                                                                                            handleActiveCheck(event);
                                                                                        }}
                                                                                    />
                                                                                    <span
                                                                                        className={`outline_checkbox bg-icon block h-full rounded-full border-2 border-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-[#ebedf2] before:bg-[url(${GetProdDevImgRouteBuilder(
                                                                                            '/assets/images/close.svg'
                                                                                        )})] before:bg-center before:bg-no-repeat before:transition-all before:duration-300 peer-checked:border-primary peer-checked:before:left-7 peer-checked:before:bg-primary peer-checked:before:bg-[url(${GetProdDevImgRouteBuilder(
                                                                                            '/assets/images/checked.svg'
                                                                                        )})] dark:border-white-dark dark:before:bg-white-dark`}
                                                                                    ></span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </fieldset>
                                                        </div>
                                                        {/* </AnimateHeight> */}
                                                    </div>
                                                </div>
                                            </Tab.Panel>
                                            {UserAppSelect.map((app: { label: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: number) => (
                                                <Tab.Panel key={String(index)}>
                                                    <div className="active pt-5">
                                                        <div>
                                                            <div className="bg-white p-0">
                                                                <fieldset className="">
                                                                    <legend className="text-lg font-bold">{app.label}</legend>
                                                                    <form className=" border-1 space-y-5">
                                                                        <div className="grid grid-cols-3 grid-rows-1 gap-4">
                                                                            <div className="col-span-4 sm:col-span-2 md:col-span-1">
                                                                                <label className="formLabel">
                                                                                    User Group: <span className="reqired">*</span>
                                                                                </label>
                                                                                <Select
                                                                                    value={tabValues[index]?.userGroup || null}
                                                                                    options={UserGrp}
                                                                                    isSearchable={true}
                                                                                    onChange={(e: any) => {
                                                                                        handleUserGrpChange(index, e);
                                                                                        setErrorMsg('', 'userGroup');
                                                                                    }}
                                                                                />
                                                                                {errMsg && (errMsg as any)[`tab_${index}_userGroup`] ? (<div className="mt-1 text-danger">{(errMsg as any)[`tab_${index}_userGroup`]}</div>) : null}

                                                                            </div>
                                                                        </div>
                                                                        <div className="flex">
                                                                            <label htmlFor="" className="mb-4">
                                                                                <b className="text-base">
                                                                                    Applicable Depot:
                                                                                    <span className="text-red-500">
                                                                                        <span className="text-lg">* </span>
                                                                                        {errMsg && errMsg.depotcheckbox ? <span className="mt-1 text-sm text-danger">{errMsg.depot}</span> : ''}
                                                                                    </span>
                                                                                </b>
                                                                            </label>
                                                                            <div className="ml-auto">
                                                                                <label className="inline-flex">
                                                                                    <span className="text-sm">Select All Depot</span> &nbsp;
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        name="Select_All_Depot"
                                                                                        className="form-checkbox text-success"
                                                                                        onChange={(e) => handleSelectAllChange(index, e.target.checked)}
                                                                                    />
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        {/* <PerfectScrollbar className="chat-conversation-box relative h-60 sm:h-[calc(100vh_-_300px)]"> */}
                                                                        <AllDepot tabindex={index} />
                                                                        {/* </PerfectScrollbar> */}

                                                                        {hasTerritories && (
                                                                            <>
                                                                                <div className="flex">
                                                                                    <label htmlFor="" className="mb-4">
                                                                                        <b className="text-base">
                                                                                            Applicable Territory:
                                                                                            <span className="text-red-500">
                                                                                                <span className="text-lg">* </span>
                                                                                                {errMsg && errMsg.terr ? <span className="mt-1 text-sm text-danger">{errMsg.terr}</span> : ''}
                                                                                            </span>
                                                                                        </b>
                                                                                    </label>
                                                                                    <div className="ml-auto">
                                                                                        <label className="inline-flex">
                                                                                            <span className="text-sm">Select All Territory</span> &nbsp;
                                                                                            <input
                                                                                                type="checkbox"
                                                                                                name="Select_All_terr"
                                                                                                className="form-checkbox text-success"
                                                                                                onChange={(e) => handleSelectAllTerrChange(index, e.target.checked)}
                                                                                            />
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                                {/* <PerfectScrollbar className="chat-conversation-box relative h-60 sm:h-[calc(100vh_-_300px)]"> */}
                                                                                <TerritoryCheckboxList tabIndex={index} />
                                                                                {/* </PerfectScrollbar> */}
                                                                            </>
                                                                        )}
                                                                    </form>
                                                                </fieldset>
                                                            </div>
                                                            {/* </AnimateHeight> */}
                                                        </div>
                                                    </div>
                                                </Tab.Panel>
                                            ))}
                                        </Tab.Panels>
                                    </Tab.Group>
                                )}
                                <div className="mt-5 flex items-center justify-center gap-1 pb-3">
                                    {currentUserDetails == null && (
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => {
                                                //handleCustomerDetailsSubmit('submit');
                                                handleFormSubmit('update');
                                            }}
                                        >
                                            {' '}
                                            <IoMdSave /> &nbsp; Submit
                                        </button>
                                    )}
                                    {currentUserDetails != null && (
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={() => {
                                                //handleCustomerDetailsSubmit('update');
                                                handleFormSubmit('submit');
                                            }}
                                        >
                                            {' '}
                                            <IoMdSave /> &nbsp; Update
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => {
                                            handleBackButton();
                                        }}
                                    >
                                        <MdOutlineArrowBack /> &nbsp; Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserProfileForm;
