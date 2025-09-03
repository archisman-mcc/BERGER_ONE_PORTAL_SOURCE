import { HTTP_POST } from "../../../helper/ApiCall";
import { ENDPOINTS } from "../../../helper/EndPoints";


export function GetUserAvailableForm<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetUserAvailableForm) as Promise<G>;
}

export function GetUserApplicableForm<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetUserApplicableForm) as Promise<G>;
}

export function UserFormAccessInsert<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.UserFormAccessInsert) as Promise<G>;
}
