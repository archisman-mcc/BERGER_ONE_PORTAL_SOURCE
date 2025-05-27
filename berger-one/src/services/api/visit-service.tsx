import callApi from './api-service';

export const GetVisitHistory = async (data: any) => {
    try {
        const response = await callApi('Lead/VisitHistory', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetTSIVisitDone = async (data: any) => {
    try {
        const response = await callApi('Lead/GetTSIVisitDone', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetTSIVisitNotDone = async (data: any) => {
    try {
        const response = await callApi('Lead/GetTSIVisitNotDone', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetVisitNextAction = async (data: any) => {
    try {
        const response = await callApi('Lead/GetVisitNextAction', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetPROSPECTVisitDone = async (data: any) => {
    try {
        const response = await callApi('Lead/GetPROSPECTVisitDone', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetPROSPECTVisitNotDone = async (data: any) => {
    try {
        const response = await callApi('Lead/GetPROSPECTVisitNotDone', 'POST', data, {}, true);
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

export const GetTsiList = async (data: any) => {
    try {
        const response = await callApi('Admin/GetTsiList', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export default { GetTsiList, GetPROSPECTVisitNotDone, GetPROSPECTVisitDone, GetUserApplicableTerrByDepot, GetVisitNextAction, GetTSIVisitNotDone, GetTSIVisitDone, GetVisitHistory };
