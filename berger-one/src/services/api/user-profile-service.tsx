import callApi from './api-service';

export const GetUserDetails = async (data: any) => {
    try {
        const response = await callApi('Admin/GetUserDetails', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetUserGroupList = async (data: any) => {
    try {
        const response = await callApi('Admin/GetAllUserGroup', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetUserApplicableDepotList = async (data: any) => {
    try {
        const response = await callApi('Admin/GetUserApplicableDepotListByRegion', 'POST', data, {}, true);
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

export const GetReportingUser = async (data: any) => {
    try {
        const response = await callApi('Admin/GetReportingUser', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetDept = async (data: any) => {
    try {
        const response = await callApi('Admin/GetDept', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const InsertUpdateUserProfile = async (data: any) => {
    try {
        const response = await callApi('Admin/UserProfileInsert', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export default { InsertUpdateUserProfile, GetDept, GetReportingUser, GetUserApplicableTerrByDepot, GetUserApplicableDepotList, GetUserGroupList, GetUserDetails };
