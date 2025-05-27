import callApi from './api-service';

export const GetEnquiryList = async (data: any) => {
    try {
        const response = await callApi('Enquiry/GetEnquiryList', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetUserApplicableRegionList = async (data: any) => {
    try {
        const response = await callApi('Admin/GetUserApplicableRegionList', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export default { GetEnquiryList, GetUserApplicableRegionList };
