import { HTTP_POST } from "../../../helper/ApiCall";
import { ENDPOINTS } from "../../../helper/EndPoints";

export function GetePCARsmApprovalDetails<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetPcaList) as Promise<G>;
}

// export function GetApplicableDepotList<P, G>(data): Promise<G> {
//     return HTTP_POST<P, G>(data, ENDPOINTS.GetApplicableDepotList) as Promise<G>;
// }
