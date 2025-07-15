import { HTTP_GET, HTTP_POST } from "../../../helper/ApiCall";
import { ENDPOINTS } from "../../../helper/EndPoints";

export function GetCTDealer<P, G>(data: { lov_type: any; active: any }): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetCTDealer) as Promise<G>;
}
export function GetCTDetail<P, G>(data: { lov_type: any; active: any }): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetCTDetail) as Promise<G>;
}