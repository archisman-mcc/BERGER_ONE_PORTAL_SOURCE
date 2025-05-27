export interface I_LeadList {
    lh_id: number;
    lh_lead_id: string;
    lh_lead_type: string;
    lh_lead_status: string;
    cm_customer_name: string;
    cm_customer_mobile_no: string;
    lh_lead_source: string;
    created_date: Date;
    Ageing: number;
}

export interface I_LeadDetails {
    ef_id: string;
    cm_customer_id: string;
    cm_customer_mobile_no: string;
    cm_customer_name: string;
    cm_customer_email: string;
    cm_customer_address: string;
    cm_customer_city: string;
    cm_customer_state: string;
    cm_customer_pincode: string;
    lh_lead_source: string;
    ef_other_source: string;
    ef_followup_status_code: string;
    lh_latitude: string;
    lh_longitude: string;
    ef_depot_code: string;
    ef_language: string;
    ef_unsubscribe_yn: string;
    lh_lead_id: string;
    lh_lead_status: string;
    lh_total_score: string;
    lh_prospect: string;
    lh_depot_code: string;
    lh_terr_code: string;
    lh_id: string;
    regn_new: string;
    cm_customer_alternate_contact_no: string;
    followup_logs: any[];
    lead_logs: any[];
    dealership_info: I_DealershipInfo[];
    questio_answer: I_QuestioAnswer[];
    ef_enquiry_type: string;
    lh_final_status: string;
    lh_final_status_updated_by: string;
    lh_final_status_updated_on: string;
}

export interface I_DealershipInfo {
    conflict_radius: string;
    dealership_type: string;
    distributor_name: string;
    di_tsi_call_made_yn: string;
    di_tsi_call_made_by: string;
    di_tsi_call_feedback: string;
    di_tsi_call_remarks: string;
    di_propect_call_made_yn: string;
    di_propect_call_made_by: string;
    di_prospect_call_feedback: string;
    di_prospect_call_remarks: string;
    di_call_discrepancy_yn: string;
    di_call_discrepancy_by: string;
    di_call_conflict_dealer_code: string;
    di_call_cancelation_request_yn: string;
    di_call_cancelation_request_by: string;
    di_call_cancelation_request_remarks: string;
    di_tsi_call_made_on: string;
    di_propect_call_made_on: string;
    di_call_discrepancy_on: string;
    di_call_cancelation_request_on: string;
    di_call_conflict_dealer_distance: string;
    di_call_conflict_dealer_business_value: string;
    di_depot_transfer_done_yn: string;
    di_depot_transfer_by: string;
    di_depot_transfer_on: string;
    di_next_followup_date_updated_by: string;
    di_next_followup_date_updated_on: string;
    di_paper_collected_on: string;
    di_paper_collected_by: string;
    di_cheque_collected_on: string;
    di_cheque_collected_by: string;
    di_tsi_visit_made_yn: string;
    di_tsi_visit_made_on: string;
    di_tsi_visit_made_by: string;
    di_tsi_visit_feedback: string;
    di_tsi_visit_remarks: string;
    di_propect_visit_made_yn: string;
    di_propect_visit_made_on: string;
    di_propect_visit_made_by: string;
    di_prospect_visit_feedback: string;
    di_prospect_visit_remarks: string;
    di_visit_discrepancy_yn: string;
    di_visit_discrepancy_on: string;
    di_visit_discrepancy_by: string;
    di_visit_conflict_dealer_code: string;
    di_visit_conflict_dealer_distance: string;
    di_visit_conflict_dealer_business_value: string;
    di_visit_cancelation_request_yn: string;
    di_visit_cancelation_request_by: string;
    di_visit_cancelation_request_on: string;
    di_visit_cancelation_request_remarks: string;
    di_cancellation_approve_on: string;
    di_cancellation_approve_by: string;
    di_cancellation_approve_yn: string;
    di_business_line: string;
    di_gst_yn: string;
    di_shop_name: string;
    di_shop_address: string;
    di_shop_city: string;
    di_shop_state: string;
    di_shop_pin: string;
    di_gst_no: string;
    di_gst_registered_name: string;
    di_gst_registered_trade_name: string;
    di_gst_registration_date: string;
    di_shop_sale_val: string;
    di_target_date: string;
    di_shop_address2: string;
    di_shop_landmark: string;
    di_next_follow_up_after_days: string;
    di_gst_applied_ref_no: string;
    di_top_3_brand_1: string;
    di_top_3_brand_2: string;
    di_top_3_brand_3: string;
    di_distributor_code: string;
    di_dealership_type: string;
    di_paint_dealer_yn: string;
    di_depot_code: string;
    di_terr_code: string;
    di_auto_id: string;
    di_total_score: string;
    di_prospect: string;
    di_urgency: string;
    di_paper_collected_yn: string;
    di_cheque_collected_yn: string;
    di_next_followup_date: string;
    di_is_conflict_yn: any;
    terr_classification: any;
}

export const DelershipInfo_DTO: I_DealershipInfo = {
    conflict_radius: '',
    dealership_type: '',
    distributor_name: '',
    di_tsi_call_made_yn: '',
    di_tsi_call_made_by: '',
    di_tsi_call_feedback: '',
    di_tsi_call_remarks: '',
    di_propect_call_made_yn: '',
    di_propect_call_made_by: '',
    di_prospect_call_feedback: '',
    di_prospect_call_remarks: '',
    di_call_discrepancy_yn: '',
    di_call_discrepancy_by: '',
    di_call_conflict_dealer_code: '',
    di_call_cancelation_request_yn: '',
    di_call_cancelation_request_by: '',
    di_call_cancelation_request_remarks: '',
    di_tsi_call_made_on: '',
    di_propect_call_made_on: '',
    di_call_discrepancy_on: '',
    di_call_cancelation_request_on: '',
    di_call_conflict_dealer_distance: '',
    di_call_conflict_dealer_business_value: '',
    di_depot_transfer_done_yn: '',
    di_depot_transfer_by: '',
    di_depot_transfer_on: '',
    di_next_followup_date_updated_by: '',
    di_next_followup_date_updated_on: '',
    di_paper_collected_on: '',
    di_paper_collected_by: '',
    di_cheque_collected_on: '',
    di_cheque_collected_by: '',
    di_tsi_visit_made_yn: '',
    di_tsi_visit_made_on: '',
    di_tsi_visit_made_by: '',
    di_tsi_visit_feedback: '',
    di_tsi_visit_remarks: '',
    di_propect_visit_made_yn: '',
    di_propect_visit_made_on: '',
    di_propect_visit_made_by: '',
    di_prospect_visit_feedback: '',
    di_prospect_visit_remarks: '',
    di_visit_discrepancy_yn: '',
    di_visit_discrepancy_on: '',
    di_visit_discrepancy_by: '',
    di_visit_conflict_dealer_code: '',
    di_visit_conflict_dealer_distance: '',
    di_visit_conflict_dealer_business_value: '',
    di_visit_cancelation_request_yn: '',
    di_visit_cancelation_request_by: '',
    di_visit_cancelation_request_on: '',
    di_visit_cancelation_request_remarks: '',
    di_cancellation_approve_on: '',
    di_cancellation_approve_by: '',
    di_cancellation_approve_yn: '',
    di_business_line: '',
    di_gst_yn: '',
    di_shop_name: '',
    di_shop_address: '',
    di_shop_city: '',
    di_shop_state: '',
    di_shop_pin: '',
    di_gst_no: '',
    di_gst_registered_name: '',
    di_gst_registered_trade_name: '',
    di_gst_registration_date: '',
    di_shop_sale_val: '',
    di_target_date: '',
    di_shop_address2: '',
    di_shop_landmark: '',
    di_next_follow_up_after_days: '',
    di_gst_applied_ref_no: '',
    di_top_3_brand_1: '',
    di_top_3_brand_2: '',
    di_top_3_brand_3: '',
    di_distributor_code: '',
    di_dealership_type: '',
    di_paint_dealer_yn: '',
    di_depot_code: '',
    di_terr_code: '',
    di_auto_id: '',
    di_total_score: '',
    di_prospect: '',
    di_urgency: '',
    di_paper_collected_yn: '',
    di_cheque_collected_yn: '',
    di_next_followup_date: '',
    di_is_conflict_yn: '',
    terr_classification: '',
};
export interface I_FollowupLog {
    efli_id: string;
    efli_type: string;
    efli_followup_status_code: string;
    efli_followup_remarks: null | string;
    efli_followup_next_schedule_on: Date | null;
    efli_system_note: null;
    action_teken_by: string;
    action_teken_on: Date;
    efli_action_taken_after_hours: string;
}

export interface I_QuestioAnswer {
    eqm_question_id: string;
    eqm_question_desctiption: string;
    answer_options: I_AnswerOption[];
}

export interface I_AnswerOption {
    eqam_answer_id: EqamAnswerID;
    eqam_answer_description: string;
    checked: boolean;
    eqam_question_id: string;
}

export enum EqamAnswerID {
    A01 = 'A01',
    A02 = 'A02',
    A03 = 'A03',
    A04 = 'A04',
}

export interface I_FollowupLogs {
    efli_id: string;
    efli_type: string;
    efli_followup_status_code: string;
    efli_followup_remarks: string;
    efli_followup_next_schedule_on: null;
    efli_system_note: null;
    action_teken_by: string;
    action_teken_on: Date;
    efli_action_taken_after_hours: number;
}
export interface I_LeadLogs {
    efli_id: string;
    efli_type: string;
    efli_followup_status_code: string;
    efli_followup_remarks: string;
    efli_followup_next_schedule_on: null;
    efli_system_note: null;
    action_teken_by: string;
    action_teken_on: Date;
    efli_action_taken_after_hours: number;
}

export interface I_DepotWiseHierarchy {
    region_dtl: RegionDtl[];
    depot_dtl: DepotDtl[];
}

export interface DepotDtl {
    depot: string;
    terr_dtl: TerrDtl[];
}

export interface TerrDtl {
    terr: string;
}

export interface RegionDtl {
    region: string;
}

export interface I_depot_region_api_response {
    region: I_depot_region_treeview[];
    depot: I_depot_region_treeview[];
}
export interface I_depot_region_treeview {
    name: string;
    person: string[];
    terr?: I_depot_region_treeview[];
}
