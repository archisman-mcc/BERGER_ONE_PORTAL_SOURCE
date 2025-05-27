import callApi from './api-service';

export const GetLeadSummary = async (data: any) => {
    try {
        const response = await callApi('Dashboard/LeadSummary_v1', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetLeadAgeingSummary = async (data: any) => {
    try {
        const response = await callApi('Dashboard/GetLeadAgeingSummary_V1', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetEnquirySummary = async (data: any) => {
    try {
        const response = await callApi('Dashboard/EnquirySummary_v1', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetTodayAppointmentLead = async (data: any) => {
    try {
        const response = await callApi('Dashboard/GetTodayAppointmentLead', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetTodayCallLead = async (data: any) => {
    try {
        const response = await callApi('Dashboard/GetTodayCallLead', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetTodayVisitLead = async (data: any) => {
    try {
        const response = await callApi('Dashboard/GetTodayVisitLead', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetFinYear = async () => {
    try {
        const response = await callApi('Admin/GetFinYear', 'POST', null, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetTodayPendingList = async (data: any) => {
    try {
        const response = await callApi('Enquiry/GetTodayPendingList', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetConvertedLeadSummary = async (data: any) => {
    try {
        const response = await callApi('Dashboard/GetConvertedLeadSummary_V1', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetDLCFollowUplist = async (data: any) => {
    try {
        const response = await callApi('Dashboard/GetDLCFollowUplist', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export default {
    GetLeadSummary,
    GetLeadAgeingSummary,
    GetEnquirySummary,
    GetTodayAppointmentLead,
    GetTodayCallLead,
    GetTodayVisitLead,
    GetFinYear,
    GetTodayPendingList,
    GetConvertedLeadSummary,
    GetDLCFollowUplist,
};
