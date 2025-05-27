import callApi from './api-service';

export const GetEnquiryDetails = async (data: any) => {
    try {
        const response = await callApi('Enquiry/Details', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetEnquiryStatus = async (data: any) => {
    try {
        const response = await callApi('Enquiry/GetEnquiryStatus', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetFollowupLogStatusLovList = async (data: any) => {
    try {
        const response = await callApi('Admin/GetFollowupLogStatusLovList', 'POST', data, {}, true);
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

export const GetUserApplicableDepotListByRegion = async (data: any) => {
    try {
        const response = await callApi('Admin/GetUserApplicableDepotListByRegion', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetEnquiryType = async (data: any) => {
    try {
        const response = await callApi('Enquiry/GetEnquiryType', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const UpdateEnquiryStatus = async (data: any) => {
    try {
        const response = await callApi('Enquiry/UpdateEnquiryStatus', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const UpdateEnquiryDetails = async (data: any) => {
    try {
        const response = await callApi('Enquiry/UpdateEnquiryDetails', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GSTValidation = async (data: any) => {
    try {
        const response = await callApi('Admin/GSTValidation', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetUserApplicableTerrByDepot = async (data: any) => {
    try {
        const response = await callApi('Admin/GetUserApplicableTerrByDepot', 'POST', data, {}, true);
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

export const GetNearestDealers = async (data: any) => {
    try {
        const response = await callApi('Lead/GetNearestDealers', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetDealershipType = async (data: any) => {
    try {
        const response = await callApi('Admin/GetDealershipType', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const DistributorSearch = async (data: any) => {
    try {
        const response = await callApi('Enquiry/DistributorSearch', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export default {
    DistributorSearch,
    GetDealershipType,
    GetNearestDealers,
    GetLanguage,
    GetUserApplicableTerrByDepot,
    GSTValidation,
    UpdateEnquiryDetails,
    UpdateEnquiryStatus,
    GetEnquiryType,
    GetUserApplicableDepotListByRegion,
    GetState,
    GetDepotByPinCode,
    GetDealingBergerProduct,
    GetBusinessLine,
    GetLeadSource,
    GetEnquiryStatus,
    GetEnquiryDetails,
};
