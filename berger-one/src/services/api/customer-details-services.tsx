import callApi from './api-service';

export const GetCustomerList = async (data: any) => {
    try {
        const response = await callApi('Enquiry/GetCustomerList', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const AddCustomer = async (data: any) => {
    try {
        const response = await callApi('Enquiry/AddCustomer', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const UpdateCustomer = async (data: any) => {
    try {
        const response = await callApi('Enquiry/UpdateCustomer', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};