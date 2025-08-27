/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IRootState } from '../../store';
import { toggleSidebar, toggleRTL } from '../../store/themeConfigSlice';
import Dropdown from '../Dropdown';
import IconMenu from '../../components/Icon/IconMenu';
import IconLogout from '../../components/Icon/IconLogout';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import { UseAuthStore } from '../../services/store/AuthStore';
import FeatherIcon from 'feather-icons-react';
import { deleteCookie } from 'cookies-next';
import { GetProdDevImgRouteBuilder, GetProdDevRouteBuilder } from '../../services/functions/getProdDevUrlBuilder';
import { FaRegUser } from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import { cookies } from 'next/headers';

const Header = () => {
    const router = useRouter();
    const [userApplicableMenu, setUserApplicableMenu] = useState<any[]>([]);
    const user = UseAuthStore((state) => state.userDetails);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
        if (selector) {
            const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove('active');
            }

            let allLinks = document.querySelectorAll('ul.horizontal-menu a.active');
            for (let i = 0; i < allLinks.length; i++) {
                const element = allLinks[i];
                element?.classList.remove('active');
            }
            selector?.classList.add('active');

            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
                if (ele) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele?.classList.add('active');
                    });
                }
            }
        }
    }, [router.pathname]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') dispatch(toggleRTL('rtl'));
        else dispatch(toggleRTL('ltr'));
    };
    const [flag, setFlag] = useState('');
    useEffect(() => {
        setLocale(localStorage.getItem('i18nextLng') || themeConfig.locale);
    }, []);
    const dispatch = useDispatch();

    const { logout } = UseAuthStore();
    const onLogout = async (data: any) => {
        logout();
        router.push('/login/cover-login');
        // router.push(GetProdDevRouteBuilder('/auth/cover-login'));
        deleteCookie('authToken');
        sessionStorage.clear();
    };

    const setValueInSeasonStorage = (key, value) => {
        const storage = sessionStorage;
        storage.setItem(key, JSON.stringify(value));
    };

    const test = (route: string) => {
        setValueInSeasonStorage('listRoute', 'Menu');
        setValueInSeasonStorage('leadListRoute', 'Menu');
        // localStorage.setItem('listRoute', 'Menu');
        // return GetProdDevRouteBuilder(route);
        router.push(route);
    };

    const dynamicProfileBg = (val: number) => {
        switch (val) {
            case 1:
                return 'bg-success';
                break;
            case 2:
                return 'bg-primary';
                break;
            case 3:
                return 'bg-info';
                break;
            default:
                return 'bg-danger';
                break;
        }
    };

    const childHideFunc = (item, id) => {
        return item.map((uam) => uam.form_id === id ? { ...uam, childVisibility: !uam.childVisibility } : { ...uam, children: childHideFunc(uam.children, id) })
    }
    const multiLevelDropdown = (props: any) => {
        return (props.map((item: any, index: any) => (
            <li style={{ marginLeft: item.form_parent_id === 0 || item.form_parent_id === 1 || item.form_parent_id === 6 || item.form_parent_id === 13 || item.form_parent_id === 86 || item.form_parent_id === 89 || item.form_parent_id === 104 ? "0px" : "15px" }} key={index}>
                {/* <button style={{ justifyContent: "space-between" }} onClick={() => { test(item.form_name === "ePCA HO Approval List" ? "/Protecton/ePCA/EPCAHOApprovalList1" : item.form_link); setUserApplicableMenu((pre) => [...childHideFunc(pre, item.form_id)]) }}> */}
                <button style={{ justifyContent: "space-between" }} onClick={() => { test(item.form_link); setUserApplicableMenu((pre) => [...childHideFunc(pre, item.form_id)]) }}>
                    <div style={{ display: "flex" }}>
                        <FeatherIcon icon={item.fafa_icon} className="mr-2" />
                        {item.form_name}
                    </div>
                    {item.children && item.children.length > 0 ? (
                        <div className="right_arrow">
                            <IconCaretDown />
                        </div>
                    ) : null}
                </button>
                {item.children && item.childVisibility && multiLevelDropdown(item.children)}
            </li>
        )))
    }

    useEffect(() => {
        setIsClient(true);
        // if (user) setUserApplicableMenu(user.userApplicableMenu);
        const menuRec = (uam) => {
            return uam.map((u) => ({ ...u, childVisibility: u.form_parent_id === 0 ? true : false, children: u.children ? menuRec(u.children) : [] }))
        }
        // console.log(menuRec(user.userApplicableMenu))
        if (user) setUserApplicableMenu(menuRec(user.userApplicableMenu));
    }, []);

    // useEffect(() => {
    //     console.log(userApplicableMenu)
    // }, [userApplicableMenu])


    return (
        <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
            <div className="shadow-sm">
                <div className="relative flex w-full items-center bg-white px-5 py-1.5 dark:bg-black">
                    <div className="horizontal-logo flex items-center justify-between ltr:mr-2 rtl:ml-2 lg:hidden">
                        <Link href="/" className="main-logo flex shrink-0 items-center">
                            <img className="inline w-12 ltr:-ml-1 rtl:-mr-1" src={GetProdDevImgRouteBuilder('/assets/images/berger.png')} alt="logo" />
                            <span className="hidden align-middle text-2xl font-semibold transition-all duration-300 ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light md:inline">BERGER ONE</span>
                        </Link>
                        <button
                            type="button"
                            className="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary ltr:ml-2 rtl:mr-2 dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconMenu className="m-auto" />
                        </button>
                    </div>
                    <div className="dropdown ml-auto flex shrink-0">
                        <Dropdown
                            offset={[0, 8]}
                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                            btnClassName="relative group block"
                            button={
                                // <img
                                //     className="h-9 w-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                                //     src={GetProdDevImgRouteBuilder('/assets/images/user_img.png')}
                                //     alt="userProfile"
                                // />

                                // <span
                                //     className={
                                //         'flex h-9 w-9 items-center justify-center rounded-full ' + dynamicProfileBg(Math.floor(Math.random() * 4) + 1) + ' object-cover text-center text-xl text-white'
                                //     }
                                //     title={'User Profile(' + (isClient && user?.first_name + ' ' + user?.last_name) + ')'}
                                // >
                                //     {isClient && (user ? user?.first_name.charAt(0) + user?.last_name.charAt(0) : <FaRegUser />)}
                                // </span>

                                // <Tippy content={'User Profile(' + (isClient && user?.first_name + ' ' + user?.last_name) + ')'} theme="info">
                                <span
                                    className={
                                        'relative flex h-10 w-10 items-center justify-center rounded-full ' +
                                        dynamicProfileBg(Math.floor(Math.random() * 4) + 1) +
                                        ' object-cover text-center text-base text-white ring-2 ring-white transition-all duration-300 hover:hover:translate-x-1 dark:ring-white-dark'
                                    }
                                >
                                    {isClient && (user ? user?.first_name.charAt(0) + user?.last_name.charAt(0) : <FaRegUser />)}
                                </span>
                                // </Tippy>
                            }
                        >
                            <ul className="w-[260px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                                <li>
                                    <div className="flex items-center px-4 py-4">
                                        <img className="radius-b h-8 w-8 rounded-md object-cover" src={GetProdDevImgRouteBuilder('/assets/images/userImg.png')} alt="userProfile" />
                                        <div className="truncate ltr:pl-4 rtl:pr-4">
                                            <h4 className="text-base">
                                                {user?.first_name + ' ' + user?.last_name}
                                                {/* <span className="rounded bg-success-light px-1 text-xs text-success ltr:ml-2 rtl:ml-2">Pro</span> */}
                                            </h4>
                                            <button type="button" className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white">
                                                {user?.group_desc}
                                            </button>
                                        </div>
                                    </div>
                                </li>

                                <li className="border-t border-white-light dark:border-white-light/10">
                                    <button onClick={onLogout} className="!py-3 font-extrabold text-danger">
                                        <IconLogout className="h-5 w-5 shrink-0 rotate-90 text-lg ltr:mr-2 rtl:ml-2" />
                                        Sign Out
                                    </button>
                                </li>
                            </ul>
                        </Dropdown>
                    </div>
                </div>

                {/* horizontal menu */}
                {userApplicableMenu && userApplicableMenu.length > 0 ? (
                    <>
                        {/* <PerfectScrollbar className="chat-conversation-box relative h-full sm:h-[calc(100vh_-_300px)]"> */}
                        <ul className="horizontal-menu hidden border-t border-[#ebedf2] bg-white px-6 py-1.5 font-semibold text-black rtl:space-x-reverse dark:border-[#191e3a] dark:bg-black dark:text-white-dark lg:space-x-1.5 xl:space-x-8">
                            {userApplicableMenu.map((item: any, index) => (
                                <li className="menu nav-item relative" key={index}>
                                    {/* {console.log(userApplicableMenu, userApplicableMenu1)} */}
                                    <button type="button" className="nav-link">
                                        {item.form_link === '#' ? (
                                            <div className="flex items-center">
                                                <FeatherIcon icon={item.fafa_icon} />
                                                <span className="ml-2 px-1">{item.form_name}</span>
                                            </div>

                                        ) : (
                                            <Link href={item?.form_link || "#"} prefetch={false}>
                                                <div className="flex items-center">
                                                    <FeatherIcon className="mr-2" icon={item.fafa_icon} />
                                                    {item.form_name}
                                                </div>
                                            </Link>
                                        )}

                                        {item.children && item.children.length > 0 ? (
                                            <div className="right_arrow">
                                                <IconCaretDown />
                                            </div>
                                        ) : null}
                                    </button>
                                    {item.children && item.children.length > 0 ? (
                                        <ul className="sub-menu">
                                            {multiLevelDropdown(item.children)}
                                            {/* {item.children.map((item: any, index: any) => (
                                                <li key={index}>
                                                    <button onClick={() => test(item.form_link)}>
                                                        <FeatherIcon icon={item.fafa_icon} className="mr-2" />
                                                        {item.form_name}
                                                    </button>
                                                </li>
                                            ))} */}
                                        </ul>
                                    ) : null}
                                </li>
                            ))}
                        </ul>

                        {/* <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
                                    <ul className="space-y-2">
                                        <li className="cursor-pointer" onClick={() => toggleMenu1('dashboard')}>
                                            <div className="flex justify-between items-center p-2 hover:bg-gray-700 rounded">
                                                <span>Dashboard</span>
                                                {openMenu === 'dashboard' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                            </div>
                                            {openMenu === 'dashboard' && (
                                                <ul className="pl-6 text-sm space-y-1">
                                                    <li className="hover:text-gray-300">Overview</li>
                                                    <li className="hover:text-gray-300">Stats</li>
                                                </ul>
                                            )}
                                        </li>

                                        <li className="cursor-pointer" onClick={() => toggleMenu1('settings')}>
                                            <div className="flex justify-between items-center p-2 hover:bg-gray-700 rounded">
                                                <span>Settings</span>
                                                {openMenu === 'settings' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                            </div>
                                            {openMenu === 'settings' && (
                                                <ul className="pl-6 text-sm space-y-1">
                                                    <li className="hover:text-gray-300">Profile</li>
                                                    <li className="hover:text-gray-300">Security</li>
                                                </ul>
                                            )}
                                        </li>
                                    </ul>
                                </div> */}
                    </>
                ) : null}
            </div>
        </header>
    );
};

export default Header;
