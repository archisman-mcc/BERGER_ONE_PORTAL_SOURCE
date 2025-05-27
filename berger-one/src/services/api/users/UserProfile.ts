import { HTTP_POST, HTTP_GET } from '@/src/helper/ApiCall';
import { ENDPOINTS } from '@/src/helper/EndPoints';

export function GetReportingUser<P, G>(data: { userId: any; globalFilter: any }): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetReportingUser) as Promise<G>;
}

export function GetDeptList<P, G>(data: { lov_type: any; active: any }): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetDeptList) as Promise<G>;
}

export function GetApplicableDepotList<P, G>(data: { user_id: any; region: any; app_id: any }): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetApplicableDepotList) as Promise<G>;
}

export function GetAppList<P, G>(data: {}): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetAppList) as Promise<G>;
}

export function GetUserDetails<P, G>(data: { userId: any }): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetUserDetails) as Promise<G>;
}

export function GetApplicableAppList<P, G>(data: { user_id: any }): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetApplicableAppList) as Promise<G>;
}

export function GetAllUserGroupList<P, G>(data: { user_id: any }): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetAllUserGroupList) as Promise<G>;
}

export function GetTerrDepotWise<P, G>(data: { depot_code: any }): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetTerrDepotWise) as Promise<G>;
}

export function UserProfileInsert<P, G>(data): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.UserProfileInsert) as Promise<G>;
}
