import { HTTP_POST, HTTP_GET } from "../../../helper/ApiCall";
import { ENDPOINTS } from "../../../helper/EndPoints";

export function ODbyDateList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.ODbyDateList) as Promise<G>;
}