import { Http_Post, HTTP_POST } from "../../../helper/ApiCall";
import { ENDPOINTS } from "../../../helper/EndPoints";

export function GetAppList<G>(): Promise<G> {
    return Http_Post<G>(ENDPOINTS.GetAppList) as Promise<G>;
}

export function GetAppList_Vrn1<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetAppList_Vrn1) as Promise<G>;
}

export function GetAllParentMenu<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetAllParentMenu) as Promise<G>;
}

export function GetAllUserGroup<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetAllUserGroup) as Promise<G>;
}

export function GetUserListByGroup<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetUserListByGroup) as Promise<G>;
}

export function PasswordEncryptDecrypt<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.PasswordEncryptDecrypt) as Promise<G>;
}

export function ValidateIFSC<P, G>(data: { common_request: any; }): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.ValidateIFSC) as Promise<G>;
}

export function GetLegalStatusList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetLegalStatusList) as Promise<G>;
}
