import { HTTP_POST } from "../../../helper/ApiCall";
import { ENDPOINTS } from "../../../helper/EndPoints";

export function GetePCADepotApprovalDetails<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetePCADepotApprovalDetails) as Promise<G>;
}

export function GetePCADetailsView<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetePCADetailsView) as Promise<G>;
}

export function PcaApprovalDetailsSubmit<P, G>(data: { pca_Request_Dtl_List: any; }): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.PcaApprovalDetailsSubmit) as Promise<G>;
}

//#endregion << PCA RSM APPROVAL >>
export function GetePCARsmApprovalDetails<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetePCARsmApprovalDetails) as Promise<G>;
}

export function PcaHoApprovalDetailsSubmit<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.PcaHoApprovalDetailsSubmit) as Promise<G>;
}


export function GetBillToDetails<P, G>(data: P): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetBillToDetails) as Promise<G>;
}
//#endregion
