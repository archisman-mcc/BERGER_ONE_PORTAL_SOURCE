import callApi from './api-service';

export const FormMenuMasterList = async (data: any) => {
    try {
        const response = await callApi('Admin/FormMenuMasterList', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetAllParentMenu = async (data: any) => {
    try {
        const response = await callApi('Admin/GetAllParentMenu', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const FormMenuMasterInsert = async (data: any) => {
    try {
        const response = await callApi('Admin/FormMenuMasterInsert', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export default { GetAllParentMenu, FormMenuMasterList, FormMenuMasterInsert };
