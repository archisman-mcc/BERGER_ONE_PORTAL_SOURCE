export interface I_SubmitObj {
    id: string;
    customerMobileNo: string;
    customerName: string;
    customerEmail: string;
    customerAlternateContactNo: string;
    customerAddress: string;
    customerCity: string;
    customerState: string;
    customerPincode: string;
    language: string;
    enquiryType: string;
    customerAddressLongitude: string;
    customerAddressLatitude: string;
    otherSource: string;
    leadSource: string;
    questionAnswerList: Question_list[];
    DepotCode: string;
    territoryCode: string;
    unsubscribeYn: string;
    DealerInfo: Dealer_info;
    UserId: string;
}

export interface Question_list {
    questionId: string;
    answerId: string;
}

export interface Dealer_info {
    di_gst_validation: boolean;
    di_business_line: string;
    di_gst_yn: string;
    di_next_follow_up_after_days: string;
    di_gst_no: string;
    di_gst_registered_name: string;
    di_gst_registered_trade_name: string;
    di_gst_registration_date: string;
    di_shop_avl_yn: string;
    di_shop_name: string;
    di_shop_address: string;
    di_shop_address2: string;
    di_shop_landmark: string;
    di_shop_city: string;
    di_shop_state: string;
    di_shop_pin: string;
    // di_shop_sale_val: number;
    // di_target_date: string;
    // sub_details: Sub_Details[];
    di_gst_applied_ref_no: string;
    di_top_3_brand_1: string;
    di_top_3_brand_2: string;
    di_top_3_brand_3: string;
    di_paint_dealer_yn: string;
    di_dealership_type: string;
    di_distributor_code: string;
}

export interface Sub_Details {
    dsd_id: string;
    dsd_segment_code: string;
    dsd_other_segment: string;
    dsd_brand: string;
    dsd_core_business_yn: string;
}
