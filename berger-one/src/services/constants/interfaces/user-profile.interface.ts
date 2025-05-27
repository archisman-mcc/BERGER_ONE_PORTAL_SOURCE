export interface I_UserDetails {
    usp_user_id: string;
    usp_first_name: string;
    usp_last_name: string;
    usp_employee_id: string;
    usp_dept: string;
    usp_email_id: string;
    usp_mobile_no: string;
    usp_doj: string;
    usp_depot: string;
    usp_active: string;
}

export interface UserGroup {
    label: any;
    usp_group_code: any;
    usp_group_desc: any;
    value: any;
}

export const UserGroupInit: UserGroup = {
    label: '',
    usp_group_code: '',
    usp_group_desc: '',
    value: '',
};

export interface SELECTED_DROPDOWN {
    userDepartment: number;
    userDepot: number;
    userAppSelectedOptions: any;
}
export const selectedDropdownInit: SELECTED_DROPDOWN = {
    userDepartment: -1,
    userDepot: -1,
    userAppSelectedOptions: -1,
};

export interface UserInsert {
    userId: string;
    firstName: string;
    lastName: string;
    employeeId: any;
    department: any;
    emailId: string;
    mobileNo: any;
    dateOfJoining: any;
    depot: string;
    applicableApp: any;
    designation: any;
    active: any;
    appWiseData: any;
}
export const UserInsertDto: UserInsert = {
    userId: '',
    firstName: '',
    lastName: '',
    employeeId: '',
    department: '',
    emailId: '',
    mobileNo: '',
    dateOfJoining: '',
    depot: '',
    applicableApp: '',
    designation: '',
    active: '',
    appWiseData: '',
};

export interface validationObj {
    userId: string;
    firstName: string;
    lastName: string;
    employeeId: any;
    department: any;
    emailId: string;
    mobileNo: any;
    dateOfJoining: any;
    depot: string;
    applicableApp: any;
    active: any;
    terr: any;
    usergrp: any;
    depotcheckbox: any;
    designation: any;
}
export const allErrorMsg: validationObj = {
    userId: '',
    firstName: '',
    lastName: '',
    employeeId: '',
    department: '',
    emailId: '',
    mobileNo: '',
    dateOfJoining: '',
    depot: '',
    applicableApp: [],
    active: '',
    terr: '',
    usergrp: '',
    depotcheckbox: '',
    designation: '',
};

export interface Usergrp {
    label: string;
    value: string;
}

export interface FormValues {
    label: string;
    userGroup: Usergrp | null;
}
