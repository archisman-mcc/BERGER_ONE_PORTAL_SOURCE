import { HTTP_GET, HTTP_POST } from "../../../helper/ApiCall";
import { ENDPOINTS } from "../../../helper/EndPoints";

export function GetVerticalWisBusinessLine<P, G>(data: { lov_type: any; active: any }): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetVerticalWisBusinessLine) as Promise<G>;
}
export function ProLeadInsert<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.ProLeadInsert) as Promise<G>;
}
export function potentialTrackingSubmit<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.potentialTrackingSubmit) as Promise<G>;
}
export function GetPotentialTrackingList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetPotentialTrackingList) as Promise<G>;
}
export function GetBusinessLineWiseLeadList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetBusinessLineWiseLeadList) as Promise<G>;
}
export function PTOrderdtlsSubmit<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.PTOrderdtlsSubmit) as Promise<G>;
}
export function InsertePcaDetails_Vr1<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.InsertePcaDetails_Vr1) as Promise<G>;
}
export function GetPotentialTrackingDtls<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetPotentialTrackingDtls) as Promise<G>;
}
export function GetPotentialTrackingActivityDtls<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetPotentialTrackingActivityDtls) as Promise<G>;
}
export function GetPotentialTrackingOrderDtls<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetPotentialTrackingOrderDtls) as Promise<G>;
}
export function GetPotentialTrackingDeliverySchedule<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetPotentialTrackingDeliverySchedule) as Promise<G>;
}
export function PTDeliveryScheduleSubmit<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.PTDeliveryScheduleSubmit) as Promise<G>;
}
export function GetDealerSearch<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetDealerSearch) as Promise<G>;
}
export function GetStakeHolderList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetStakeHolderList) as Promise<G>;
}
export function GetStateListPotentialLead<P, G>(data: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetStateListPotentialLead) as Promise<G>;
}
export function GetKeyAccountList<P, G>(data: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetKeyAccountList) as Promise<G>;
}
export function SubmitKeyAccountInsertUpdate<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.SubmitKeyAccountInsertUpdate) as Promise<G>;
}