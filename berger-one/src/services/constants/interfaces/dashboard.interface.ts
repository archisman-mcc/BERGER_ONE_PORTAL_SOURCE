export interface I_TodayVisit {
    lh_id: number;
    lh_lead_id: string;
    lh_lead_status: string;
    di_prospect: string;
    di_urgency: string;
    cm_customer_name: string;
    cm_customer_address: string;
    cm_customer_city: string;
    cm_customer_state: string;
    cm_customer_pincode: string;
    cm_customer_mobile_no: string;
    cm_customer_alternate_contact_no: null;
    cm_customer_email: string;
}

export interface I_TodayAppointment {
    lh_id: number;
    lh_lead_id: string;
    lh_lead_status: string;
    di_prospect: string;
    di_urgency: string;
    lal_preferable_appointment_dt: Date;
    lal_preferable_appointment_slot: string;
    lal_alternate_appointment_dt: Date;
    lal_alternate_appointment_slot: string;
    lal_customer_acceptance_dt: Date;
    lal_customer_acceptance_slot: string;
    cm_customer_name: string;
    cm_customer_address: string;
    cm_customer_city: string;
    cm_customer_state: string;
    cm_customer_pincode: string;
    cm_customer_mobile_no: string;
    cm_customer_alternate_contact_no: null;
    cm_customer_email: string;
}

export interface I_TodayCall {
    lh_id: number;
    lh_lead_id: string;
    lh_lead_status: string;
    di_prospect: string;
    di_urgency: string;
    cm_customer_name: string;
    cm_customer_address: string;
    cm_customer_city: string;
    cm_customer_state: string;
    cm_customer_pincode: string;
    cm_customer_mobile_no: string;
    cm_customer_alternate_contact_no: null;
    cm_customer_email: string;
}

export interface I_FinYear {
    fin_year: string;
    no_of_weeks: number;
    start_date: Date;
    end_date: Date;
    current_yn: CurrentYn;
}

export enum CurrentYn {
    N = 'N ',
    Y = 'Y ',
}

export interface I_EnquiryList {
    ef_id: string;
    ef_enq_id: string;
    ef_customer_mobile_no: string;
    ef_customer_name: string;
    ef_customer_email: string;
    ef_customer_alternate_contact_no: string;
    ef_customer_address: string;
    ef_customer_city: string;
    ef_customer_state: string;
    ef_customer_pincode: string;
    ef_lead_source: string;
    ef_other_source: null;
    ef_followup_status_code: string;
    ef_next_followup_date: null;
    ef_followup_remarks: null;
    created_user: null;
    created_date: Date;
    modifed_user: null;
    modified_date: null;
    ef_language: string;
    ef_unsubscribe_yn: string;
    aging: string;
}

export interface I_ConvertedLeadSummary {
    cb_dealer_count: number;
    cb_dealer_business_value: number;
    ncb_dealer_count: number;
    ncb_dealer_business_value: number;
    total_dealer_count: number;
    total_dealer_business_value: number;
    cb_cost_dealer: number;
    cb_sub_dealer_count: number;
    cb_sub_dealer_business_value: number;
    cb_cost_sub_dealer: number;
    ncb_sub_dealer_count: number;
    ncb_sub_dealer_business_value: number;
    total_cb_cost: number;
}

export interface I_DLCFollowupList {
    lh_id: number;
    lh_lead_id: string;
    lh_lead_status: string;
    di_prospect: string;
    di_urgency: string;
    cm_customer_name: string;
    cm_customer_address: string;
    cm_customer_city: string;
    cm_customer_state: string;
    cm_customer_pincode: string;
    cm_customer_mobile_no: string;
    cm_customer_alternate_contact_no: string;
    cm_customer_email: string;
    lcl_call_from_to_code: string;
}
