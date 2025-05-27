import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';
import { GetProdDevRouteBuilder } from '../functions/getProdDevUrlBuilder';
import { useRouter } from 'next/router';
import { commonErrorToast } from '../functions/commonToast';

export default async function callApi(endpoint: any, method: string = 'GET', body: any = null, queryParams: any = {}, hasToken: boolean) {
    const url = new URL(`https://bpilweb.bergerindia.com/BPILCRMAPI/api/v1.0/${endpoint}`);
    // const url = new URL(`https://bpilmobile.bergerindia.com/ONE_API/api/v1.0/${endpoint}`);
    // const url = new URL(`https://localhost:7058/api/v1.0/${endpoint}`);
    let userDetails: any = JSON.parse(localStorage.getItem('auth') || '');
    let authToken = userDetails && userDetails.state ? userDetails.state.authToken : '';

    // Add query parameters to the URL
    Object.keys(queryParams).forEach((key) => url.searchParams.append(key, queryParams[key]));

    let headerOptions = {
        'Content-Type': 'application/json',
        ...(authToken && hasToken && { AuthToken: authToken }),
    };
    const options = {
        method,
        headers: headerOptions,
        body,
    };

    // Add request body for non-GET requests
    if (body) {
        options.body = JSON.stringify(body);
    }
    try {
        const response: any = await fetch(url.toString(), options);
        const data = await response.json();
        if (response.status !== 200) {
            if (response.status === 401) {
                commonErrorToast(data.message);
                // jwt authentication error
                // window.location.replace('/auth/cover-login');
                window.location.replace(GetProdDevRouteBuilder('/login/cover-login'));
                deleteCookie('authToken');
            } else commonErrorToast(data.errorMessage);
        }
        return data;
    } catch (error) {
        throw new Error('Failed to fetch data from the server');
    }
}
