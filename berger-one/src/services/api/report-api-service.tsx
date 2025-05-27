import { commonErrorToast } from '../../services/functions/commonToast';
import { GetProdDevRouteBuilder } from '../functions/getProdDevUrlBuilder';
import { useRouter } from 'next/router';

export default async function callReportApi(endpoint: any, method: string = 'GET', body: any = null, queryParams: any = {}, hasToken: boolean) {
    const url = new URL(`https://bpilweb.bergerindia.com/BPILCRMAPI/api/v1.0/${endpoint}`);
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
        let data = await response.blob();
        if (response.status !== 200) {
            // throw new Error(data.message || 'Something went wrong');

            if (response.status === 401) {
                // window.location.replace('/auth/cover-login');
                window.location.replace(GetProdDevRouteBuilder('/login/cover-login'));
            } else if (response.status === 404) {
                commonErrorToast('No Record Found');
                data = null;
            } else {
                data = null;
            }
        }
        return data;
    } catch (error) {
        throw new Error('Failed to fetch data from the server');
    }
}
