import { HTTP_GET, HTTP_POST } from "../../../helper/ApiCall";
import { ENDPOINTS } from "../../../helper/EndPoints";

export function GetVerticalWisBusinessLine<P, G>(data: { lov_type: any; active: any }): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetVerticalWisBusinessLine) as Promise<G>;
}
export function ProLeadInsert<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.ProLeadInsert) as Promise<G>;
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