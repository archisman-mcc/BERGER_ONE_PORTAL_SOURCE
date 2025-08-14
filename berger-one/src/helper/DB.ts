import { BASE_URL } from './EndPoints';

// url parameters for get methods
export function QUERY_SEARCH_PARAMS<Q>(endPoint: string, queryParams: any): URL {
    const url = new URL(endPoint, BASE_URL);
    if (queryParams && Object.keys(queryParams).length > 0) {
        const data = new URLSearchParams();
        Object.keys(queryParams).forEach((key) => data.append(key, queryParams[key as keyof Q]));
        (url as any).search = new URLSearchParams(data);
    }
    return url;
}

// endpoint make
export function API_ENDPOINT<_>(endPoint: string): string {
    const url = BASE_URL + endPoint;
    return url;
}

// object to formdata request
export function CREATE_FORMDATA<_>(formData: any) {
    const formDataObject = new FormData();
    if (formData && Object.keys(formData).length > 0) {
        for (let key in formData) {
            formDataObject.append(key, (formData as any)[key]);
        }
    }
    return formDataObject;
}
