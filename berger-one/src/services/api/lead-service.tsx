import callApi from './api-service';

export const GetLeadList = async (data: any) => {
    try {
        const response = await callApi('Lead/GetLeadList', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetLeadDetails = async (data: any) => {
    try {
        const response = await callApi('Lead/LeadDetails', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetBusinessLine = async (data: any) => {
    try {
        const response = await callApi('Enquiry/GetBusinessLine', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetDealingBergerProduct = async (data: any) => {
    try {
        const response = await callApi('Enquiry/GetDealingBergerProduct', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetDepotByPinCode = async (data: any) => {
    try {
        const response = await callApi('Enquiry/GetDepotByPinCode', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetState = async (data: any) => {
    try {
        const response = await callApi('Admin/GetState', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetDepotWiseHierarchy = async (data: any) => {
    try {
        const response = await callApi('Lead/GetDepotWiseHierarchy', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetLanguage = async (data: any) => {
    try {
        const response = await callApi('Admin/GetLanguage', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetLeadSource = async (data: any) => {
    try {
        const response = await callApi('Enquiry/GetLeadSource', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const UpdateLeadLocation = async (data: any) => {
    try {
        const response = await callApi('Lead/UpdateLeadLocation', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const VisitAddUpdate = async (data: any) => {
    try {
        const response = await callApi('Lead/VisitAddUpdate', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const CallProspect = async (data: any) => {
    try {
        const response = await callApi('Lead/CallProspect', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const CallTSI = async (data: any) => {
    try {
        const response = await callApi('Lead/CallTSI', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const PlaceCall = async (data: any) => {
    try {
        const response = await callApi('Lead/PlaceCall', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const DealerSearch = async (data: any) => {
    try {
        const response = await callApi('Lead/DealerSearch', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetDealerLocation = async (data: any) => {
    try {
        const response = await callApi('Lead/GetDealerLocation', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const CallLogList = async (data: any) => {
    try {
        const response = await callApi('Lead/CallLogList', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetTSICallDone = async (data: any) => {
    try {
        const response = await callApi('Lead/GetTSICallDone', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetTSICallNotDone = async (data: any) => {
    try {
        const response = await callApi('Lead/GetTSICallNotDone', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetPROSPECTCallDone = async (data: any) => {
    try {
        const response = await callApi('Lead/GetPROSPECTCallDone', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetPROSPECTCallNotDone = async (data: any) => {
    try {
        const response = await callApi('Lead/GetPROSPECTCallNotDone', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const AddUpdateAppointment = async (data: any) => {
    try {
        const response = await callApi('Lead/AddUpdateAppointment', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetAppointmentHistory = async (data: any) => {
    try {
        const response = await callApi('Lead/GetAppointmentHistory', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetTsiList = async (data: any) => {
    try {
        const response = await callApi('Admin/GetTsiList', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const CallLogInsert = async (data: any) => {
    try {
        const response = await callApi('lead/CallLogInsert', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetAppointmentDayFeedbackLovList = async (data: any) => {
    try {
        const response = await callApi('lead/GetAppointmentDayFeedbackLovList', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetEscalationMail = async (data: any) => {
    try {
        const response = await callApi('lead/GetEscalationMail', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const SendEscalationMail = async (data: any) => {
    try {
        const response = await callApi('lead/SendEscalationMail', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetAppointmentSlotLovList = async (data: any) => {
    try {
        const response = await callApi('lead/GetAppointmentSlotLovList', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetCallFromToLovList = async (data: any) => {
    try {
        const response = await callApi('lead/GetCallFromToLovList', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const UpdateDepotTerritory = async (data: any) => {
    try {
        const response = await callApi('Lead/UpdateDepotTerritory', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const UpdateGstInfo = async (data: any) => {
    try {
        const response = await callApi('Lead/UpdateGstInfo', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const UpdateProspectShopAddress = async (data: any) => {
    try {
        const response = await callApi('Lead/UpdateProspectShopAddress', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetUrgencyTypeLovList = async (data: any) => {
    try {
        const response = await callApi('Lead/GetUrgencyTypeLovList', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetLeadStatus = async (data: any) => {
    try {
        const response = await callApi('Lead/GetLeadStatus', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const Getprospect = async (data: any) => {
    try {
        const response = await callApi('Lead/Getprospect', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetLeadCancellationReasonList = async (data: any) => {
    try {
        const response = await callApi('Admin/GetLeadCancellationReason', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const SaveCallCenterLeadFollowUp = async (data: any) => {
    try {
        const response = await callApi('Lead/SaveCallCenterLeadFollowUp', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetReviveLeadReasonLovList = async (data: any) => {
    try {
        const response = await callApi('Admin/GetReviveLeadReasonLovList', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const UpdateNDReviveLead = async (data: any) => {
    try {
        const response = await callApi('Lead/UpdateNDReviveLead', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export default {
    GetCallFromToLovList,
    SendEscalationMail,
    GetAppointmentSlotLovList,
    GetAppointmentDayFeedbackLovList,
    CallLogInsert,
    GetTsiList,
    GetAppointmentHistory,
    AddUpdateAppointment,
    GetPROSPECTCallNotDone,
    GetPROSPECTCallDone,
    GetTSICallNotDone,
    GetTSICallDone,
    CallLogList,
    GetDealerLocation,
    DealerSearch,
    PlaceCall,
    CallTSI,
    CallProspect,
    VisitAddUpdate,
    UpdateLeadLocation,
    GetLeadSource,
    GetLanguage,
    GetDepotWiseHierarchy,
    GetState,
    GetDepotByPinCode,
    GetDealingBergerProduct,
    GetBusinessLine,
    GetLeadDetails,
    GetLeadList,
    GetEscalationMail,
    UpdateDepotTerritory,
    UpdateGstInfo,
};
