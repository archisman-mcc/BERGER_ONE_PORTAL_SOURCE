import { HTTP_POST } from "../../../helper/ApiCall";
import { ENDPOINTS } from "../../../helper/EndPoints";

export function UserApplDlrSales<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.UserApplDlrSales) as Promise<G>;
}

export function UserApplDlrSalesDtls<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.UserApplDlrSalesDtls) as Promise<G>;
}