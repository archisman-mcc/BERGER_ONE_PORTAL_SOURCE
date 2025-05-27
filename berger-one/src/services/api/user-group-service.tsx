import callApi from './api-service';

export const GetUserGroup = async (data: any) => {
    try {
        const response = await callApi('Admin/GetUserGroupList', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export default { GetUserGroup };
