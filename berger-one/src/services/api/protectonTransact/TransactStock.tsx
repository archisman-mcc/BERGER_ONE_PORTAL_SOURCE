import { HTTP_POST, HTTP_GET } from "../../../helper/ApiCall";
import { ENDPOINTS } from "../../../helper/EndPoints";

export function GetPrdList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetPrdList) as Promise<G>;
}

export function GetShdList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetShdList) as Promise<G>;
}

export function GetSkuList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetSkuList) as Promise<G>;
}