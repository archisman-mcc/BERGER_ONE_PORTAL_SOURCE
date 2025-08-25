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