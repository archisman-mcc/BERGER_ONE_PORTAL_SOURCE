import { HTTP_POST, HTTP_GET } from "../../../helper/ApiCall";
import { ENDPOINTS } from "../../../helper/EndPoints";

export function GetInvoiceDetails<P, G>(data: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.GetInvoiceDetails) as Promise<G>;
}