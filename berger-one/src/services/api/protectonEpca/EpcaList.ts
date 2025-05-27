// import { HTTP_POST, HTTP_GET } from '@/src/helper/ApiCall';
// import { ENDPOINTS } from '@/src/helper/EndPoints';

import { HTTP_POST } from "../../../helper/ApiCall";
import { ENDPOINTS } from "../../../helper/EndPoints";

export function GetPcaList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetPcaList) as Promise<G>;
}

export function GetPcaRsmList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetPcaRsmList) as Promise<G>;
}

export function GetApplicableDepotList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetApplicableDepotList) as Promise<G>;
}

export function GetApplicableTerrList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetApplicableTerrList) as Promise<G>;
}

export function GetPcaStatusList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetPcaStatusList) as Promise<G>;
}

export function GetePCADepotApprovalList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetePCADepotApprovalList) as Promise<G>;
}

export function GetePCAHoApprovalDetails<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetePCAHoApprovalDetails) as Promise<G>;
}

export function GetePCAHoApprovalList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetePCAHoApprovalList) as Promise<G>;
}

//#region TLV MODULE
export function GetTlvRevisionList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetTlvRevisionList) as Promise<G>;
}
//#endregion

export function GetEpcaGpGcRateDtls<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetEpcaGpGcRateDtls) as Promise<G>;
}
