import callApi from './api-service';

export const GetAllUserGroup = async (data: any) => {
    try {
        const response = await callApi('Admin/GetAllUserGroup', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetUserListByGroup = async (data: any) => {
    try {
        const response = await callApi('Admin/GetUserListByGroup', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetUserAvailableForm = async (data: any) => {
    try {
        const response = await callApi('Admin/GetUserAvailableForms', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetUserApplicableForm = async (data: any) => {
    try {
        const response = await callApi('Admin/GetUserApplicableForms', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const UserFormAccessInsert = async (data: any) => {
    try {
        const response = await callApi('Admin/UserFormAccessInsert', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export default { UserFormAccessInsert, GetUserApplicableForm, GetUserAvailableForm, GetUserListByGroup, GetAllUserGroup };
