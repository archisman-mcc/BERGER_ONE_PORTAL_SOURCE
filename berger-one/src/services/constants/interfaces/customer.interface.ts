export interface I_CustomerList {
    cm_customer_id: number;
    cm_customer_mobile_no: string;
    cm_customer_name: string;
    cm_customer_email: string;
    cm_customer_alternate_contact_no: string;
    cm_customer_address: string;
    cm_customer_city: string;
    cm_customer_state: string;
    cm_customer_pincode: string;
    cm_customer_address_latitude: string;
    cm_customer_address_longitude: string;
    cm_lead_source: string;
    cm_customer_other_source: string;
    is_lock_yn: string;
}

export interface SELECTED_DROPDOWN {
    leadSource: number;
    LeadState: number;
    LanguageType: number;
}
export const selectedDropdownInit: SELECTED_DROPDOWN = {
    leadSource: -1,
    LeadState: -1,
    LanguageType: -1,
};

export interface CustomerInsert {
    customerId: number;
    mobileNo: string;
    name: string;
    email: any;
    alternateContactNo: any;
    address: string;
    city: any;
    state: any;
    pinCode: string;
    leadSource: string;
    otherSource: string;
    language: string;
}
export const CustomerInsertDto: CustomerInsert = {
    customerId: 0,
    mobileNo: '',
    name: '',
    email: '',
    alternateContactNo: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    leadSource: '',
    otherSource: '',
    language: '',
};

export interface validationObj {
    mobileNo: string;
    name: string;
    email: string;
    alternateContactNo: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
    leadSource: string;
    otherSource: string;
    language: string;
}
export const allErrorMsg: validationObj = {
    mobileNo: '',
    name: '',
    email: '',
    alternateContactNo: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    leadSource: '',
    otherSource: '',
    language: '',
};
