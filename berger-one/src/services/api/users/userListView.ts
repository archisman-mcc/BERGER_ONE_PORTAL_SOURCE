import { HTTP_POST, HTTP_GET } from '@/src/helper/ApiCall';
import { ENDPOINTS } from '@/src/helper/EndPoints';

export function GetUserList<P, G>(data: { user_id: any; password: any; uuid: any }): Promise<G> {
    // return HTTP_GET<P, G>(data, ENDPOINTS.GetUserList) as Promise<G>;
    return HTTP_POST<P, G>(data, ENDPOINTS.GetUserList) as Promise<G>;
}

export function GetUserDetails<P, G>(data: { user_id: string; uuid: string; model: string; cordova: string; platform: string; version: string; name: string }): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetUserDetails) as Promise<G>;
}
