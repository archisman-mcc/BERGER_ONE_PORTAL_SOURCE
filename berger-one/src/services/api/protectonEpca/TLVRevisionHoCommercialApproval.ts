import { HTTP_POST } from "../../../helper/ApiCall";
import { ENDPOINTS } from "../../../helper/EndPoints";

export function TlvGetTermDetails<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.TlvGetTermDetails) as Promise<G>;
}

export function GetTlvHoCommercialApprovalList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetTlvHoCommercialApprovalList) as Promise<G>;
}
