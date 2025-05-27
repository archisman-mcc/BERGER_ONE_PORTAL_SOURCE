import { HTTP_POST } from "../../../helper/ApiCall";
import { ENDPOINTS } from "../../../helper/EndPoints";

export function GetTlvStatusList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetTlvStatusList) as Promise<G>;
}

export function GetTlvRSMApprovalList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetTlvRSMApprovalList) as Promise<G>;
}

export function GetTlvRevisionLogDetails<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetTlvRevisionLogDetails) as Promise<G>;
}

export function TlvRevisionApproval<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.TlvRevisionApproval) as Promise<G>;
}

export function TlvDetailsSubmit<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.TlvDetailsSubmit) as Promise<G>;
}

export function GetTlvDetails<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetTlvDetails) as Promise<G>;
}
