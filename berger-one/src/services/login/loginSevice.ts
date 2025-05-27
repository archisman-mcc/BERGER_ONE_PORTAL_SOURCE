// import { HTTP_GET } from '@/src/helper/ApiCall';
// import { ENDPOINTS } from '@/src/helper/EndPoints';

import { HTTP_GET } from "../../helper/ApiCall";
import { ENDPOINTS } from "../../helper/EndPoints";

export function ValidateLogin<P, G>(data: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.Login) as Promise<G>;
}

export function RefreshToken<P, G>(data: { RefreshToken: string }): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.RefreshToken) as Promise<G>;
}

export function RefreshTokenV1<P, G>(data: any): Promise<G> {
    return HTTP_GET<P, G>(data, ENDPOINTS.RefreshTokenV1) as Promise<G>;
}
