import callApi from './api-service';

export const GetLovDetailsList = async (data: any) => {
    try {
        const response = await callApi('Admin/GetLovDetails', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const LovDetailsInsert = async (data: any) => {
    try {
        const response = await callApi('Admin/LovDetailsInsert', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export default { GetLovDetailsList, LovDetailsInsert };
