import { API_ENDPOINT } from './DB';
import AXIOS_HTTP from './Interceptor';

export function HTTP_POST<P, G>(formdata: any, endPoint: any): Promise<G> {
    const url = API_ENDPOINT(endPoint);
    return AXIOS_HTTP.post(url, JSON.stringify(formdata), {
        headers: {},
    });
}

export function Http_Post<G>(endPoint: any): Promise<G> {
    const url = API_ENDPOINT(endPoint);
    return AXIOS_HTTP.post(url, {
        headers: {},
    });
}

export function HTTP_GET<_, G>(formdata: any, endPoint: any): Promise<G> {
    const url = API_ENDPOINT(endPoint);
    return AXIOS_HTTP.get(url, {
        headers: {},
        params: formdata,
    });
}

export function Http_Get<G>(endPoint: any): Promise<G> {
    const url = API_ENDPOINT(endPoint);
    return AXIOS_HTTP.get(url, {
        headers: {},
    });
}
