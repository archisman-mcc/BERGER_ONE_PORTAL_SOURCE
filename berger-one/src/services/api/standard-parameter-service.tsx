import callApi from './api-service';

export const GetStdParamDetailsList = async (data: any) => {
    try {
        const response = await callApi('Admin/GetStdParamDetails', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const StdParamsInsert = async (data: any) => {
    try {
        const response = await callApi('Admin/StdParamsInsert', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};
export default { GetStdParamDetailsList, StdParamsInsert };
