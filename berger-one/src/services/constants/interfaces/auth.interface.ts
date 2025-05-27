interface IFormValues {
    user_id: string;
    password: string;
}

interface ILoginDetails {
    user_id: string;
    first_name: string;
    last_name: string;
    group_code: string;
    group_desc: string;
    dept: string;
    real_dept: string;
    email: string;
    mobile: string;
    active: string;
    current_fin_year: string;
    current_fin_year_range: string;
    date_diff: null;
    attemt_count: null;
    is_locked: null;
    fin_year: null;
    userApplicableMenu: IUserApplicableMenu[];
}

interface IUserApplicableMenu {
    form_id: number;
    form_name: string;
    form_link: string;
    form_icon: string;
    form_parent_id: number;
    form_seq: number;
    children: IUserApplicableMenu[] | null;
}

export default {
    IUserApplicableMenu: {} as IUserApplicableMenu,
    ILoginDetails: {} as ILoginDetails,
    IFormValues: {} as IFormValues,
};
