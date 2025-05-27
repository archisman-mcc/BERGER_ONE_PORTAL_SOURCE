import { HTTP_POST, HTTP_GET } from '@/src/helper/ApiCall';
import { ENDPOINTS } from '@/src/helper/EndPoints';

export function GetUserAvailableForm<P, G>(data): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetUserAvailableForm) as Promise<G>;
}

export function GetUserApplicableForm<P, G>(data): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetUserApplicableForm) as Promise<G>;
}

export function UserFormAccessInsert<P, G>(data): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.UserFormAccessInsert) as Promise<G>;
}
