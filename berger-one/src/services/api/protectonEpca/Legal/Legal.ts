import { HTTP_POST, HTTP_GET } from '@/src/helper/ApiCall';
import { ENDPOINTS } from '@/src/helper/EndPoints';

export function GetLegalOutStandingApprovalList<P, G>(data): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.GetLegalOutStandingApprovalList) as Promise<G>;
}

export function LegalCaseApprovalAsmReport<P, G>(data): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.LegalCaseApprovalAsmReport) as Promise<G>;
}
