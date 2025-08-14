import { HTTP_GET, HTTP_POST } from "../../../helper/ApiCall";
import { ENDPOINTS } from "../../../helper/EndPoints";

export function UserApplDlrOSDtls<P, G>(data: { lov_type: any; active: any }): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.UserApplDlrOSDtls) as Promise<G>;
}

export function UserApplDlrOSSingle<P, G>(data: { lov_type: any; active: any }): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.UserApplDlrOSSingle) as Promise<G>;
}

export function UserApplDlrOSTrx<P, G>(data: { lov_type: any; active: any }): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.UserApplDlrOSTrx) as Promise<G>;
}