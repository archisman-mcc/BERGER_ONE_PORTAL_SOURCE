import { HTTP_GET } from "../../../helper/ApiCall";
import { ENDPOINTS } from "../../../helper/EndPoints";

export function getmwadetailsdatav5<P, G>(data: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.getmwadetailsdatav5) as Promise<G>;
}
export function GetTSRMonitoringData<P, G>(data: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetTSRMonitoringData) as Promise<G>;
}
export function GetRegion_report<P, G>(data: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetRegion_report) as Promise<G>;
}
export function GetUserGroupApplicable<P, G>(_: any): Promise<G> {
    return HTTP_GET<P, G>(_, ENDPOINTS.GetUserGroupApplicable) as Promise<G>;
}
export function GetRegnWiseUserList<P, G>(data: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetRegnWiseUserList) as Promise<G>;
}
export function GetLeadGenReport<P, G>(data: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetLeadGenReport) as Promise<G>;
}
export function GetProductPromotionReport<P, G>(data: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetProductPromotionReport) as Promise<G>;
}
export function GetStakeholderReport<P, G>(data: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetStakeholderReport) as Promise<G>;
}
export function GetEpcaReport<P, G>(data: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetEpcaReport) as Promise<G>;
}
export function GetPoSchedulesReport<P, G>(data: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetPoSchedulesReport) as Promise<G>;
}
export function GetCustNotVisitedReport<P, G>(data: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetCustNotVisitedReport) as Promise<G>;
}
export function GetCompetitorActivityReport<P, G>(data: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetCompetitorActivityReport) as Promise<G>;
}
export function GetComplaintsReport<P, G>(data: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetComplaintsReport) as Promise<G>;
}
export function GetAppUsageReport<P, G>(data: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetAppUsageReport) as Promise<G>;
}