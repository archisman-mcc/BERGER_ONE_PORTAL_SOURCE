import callApi from './api-service';

export const loginUser = async (data: any) => {
    try {
        const response = await callApi('Login/ValidateLogin', 'POST', data, {}, false);
        // const response = await callApi('Login/Login', 'POST', data, {}, false);
        return response;
    } catch (error) {
        throw error;
    }
};

export const PasswordEncryptDecrypt = async (data: any) => {
    try {
        const response = await callApi('Admin/PasswordEncryptDecrypt', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export default { loginUser, PasswordEncryptDecrypt };
