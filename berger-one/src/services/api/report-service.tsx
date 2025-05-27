import callReportApi from './report-api-service';

export const GetLeadReport = async (data: any) => {
    try {
        const response = await callReportApi('Report/GetLeadReport', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetUnassignedDepotReport = async (data: any) => {
    try {
        const response = await callReportApi('Report/GetUnassignedDepotReport', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetGSTAppliedReport = async (data: any) => {
    try {
        const response = await callReportApi('Report/GetGSTAppliedReport', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetEnquiryReport = async (data: any) => {
    try {
        const response = await callReportApi('Report/GetEnquiryReport', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetDuplicateEnquiryReport = async (data: any) => {
    try {
        const response = await callReportApi('Report/GetDuplicateEnquiryReport', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetEnquiryListExportData = async (data: any) => {
    try {
        const response = await callReportApi('Report/GetEnquiryListExportData', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetLeadListExportData = async (data: any) => {
    try {
        const response = await callReportApi('Report/GetLeadListExportData', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetDlcLeadListExport = async (data: any) => {
    try {
        const response = await callReportApi('Report/GetDlcLeadListExport', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetEnquiryLeadReportExport = async (data: any) => {
    try {
        const response = await callReportApi('Report/GetEnquiryLeadReportExport', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetDlcUtilityReport = async (data: any) => {
    try {
        const response = await callReportApi('Report/GetDlcUtilityReport', 'POST', data, {}, true);
        return response;
    } catch (error) {
        throw error;
    }
};
