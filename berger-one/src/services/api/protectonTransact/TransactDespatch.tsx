import { HTTP_POST, HTTP_GET } from "../../../helper/ApiCall";
import { ENDPOINTS } from "../../../helper/EndPoints";

export function GetDespatchDetails<P, G>(data: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetDespatchDetails) as Promise<G>;
}