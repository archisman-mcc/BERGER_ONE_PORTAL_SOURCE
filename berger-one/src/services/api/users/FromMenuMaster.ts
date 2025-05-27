import { HTTP_POST, HTTP_GET } from '@/src/helper/ApiCall';
import { ENDPOINTS } from '@/src/helper/EndPoints';

export function FormMenuMasterList<P, G>(data): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.FormMenuMasterList) as Promise<G>;
}

export function FormMenuMasterInsert<P, G>(data: {
    fmm_id: string;
    fmm_name: string;
    fmm_link: string;
    fmm_parent_id: string;
    fmm_sequence: string;
    fmm_app_id: string;
    fafa_icon: string;
    active: string;
    insert_update_flag: string;
}): Promise<G> {
    return HTTP_POST<P, G>(data, ENDPOINTS.FormMenuMasterInsert) as Promise<G>;
}
