import { HTTP_GET } from "../../../helper/ApiCall";
import { ENDPOINTS } from "../../../helper/EndPoints";

export function getmwadetailsdatav5<P, G>(data: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.getmwadetailsdatav5) as Promise<G>;
}