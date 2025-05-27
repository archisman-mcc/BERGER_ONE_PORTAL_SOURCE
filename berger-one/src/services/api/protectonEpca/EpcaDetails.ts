import { HTTP_POST } from "../../../helper/ApiCall";
import { ENDPOINTS } from "../../../helper/EndPoints";

export function GetPcaDealersList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetPcaDealersList) as Promise<G>;
}

export function GetPcaProjectListByDepotTerr<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetPcaProjectListByDepotTerr) as Promise<G>;
}

export function GetProjectList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetProjectList) as Promise<G>;
}

export function GetSKUList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetSKUList) as Promise<G>;
}

export function GetPcaBillToList<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetPcaBillToList) as Promise<G>;
}

export function GetFactoryListBySKU<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetFactoryListBySKU) as Promise<G>;
}

export function GetPcaMinRateBySku_Vr1<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetPcaMinRateBySku_Vr1) as Promise<G>;
}

export function InsertePcaDetails_Vr1<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.InsertePcaDetails_Vr1) as Promise<G>;
}

export function PcaDetailsGetStatus<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.PcaDetailsGetStatus) as Promise<G>;
}

export function PcaDetailsGetDtl<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.PcaDetailsGetDtl) as Promise<G>;
}

export function DeletePcaDetails<P, G>(data: { auto_id: any; }): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.DeletePcaDetails) as Promise<G>;
}

export function GetCalculatedGC<P, G>(data: any): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetCalculatedGC) as Promise<G>;
}
