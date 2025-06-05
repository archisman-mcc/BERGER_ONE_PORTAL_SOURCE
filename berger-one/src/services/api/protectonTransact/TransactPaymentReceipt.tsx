import { HTTP_POST, HTTP_GET } from "../../../helper/ApiCall";
import { ENDPOINTS } from "../../../helper/EndPoints";

export function GetPRList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetPRList) as Promise<G>;
}