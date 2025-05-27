import { HTTP_POST } from "../../../helper/ApiCall";
import { ENDPOINTS } from "../../../helper/EndPoints";

export function PcaCancellationGetList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.PcaCancellationGetList) as Promise<G>;
}

export function PcaCancellationUpdate<P, G>(data: { auto_id: any; }): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.PcaCancellationUpdate) as Promise<G>;
}
