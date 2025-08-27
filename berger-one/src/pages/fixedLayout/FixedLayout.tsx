import { Link, useNavigate } from 'react-router-dom';
import { GetProdDevImgRouteBuilder } from '../../services/functions/getProdDevUrlBuilder';
import { IoLogIn } from "react-icons/io5";
// import { UseAuthStore } from '../../services/store/AuthStore';
import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { CiViewList } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa";
import { UseAuthStore } from '../../services/store/AuthStore';
import { Outlet } from 'react-router-dom';

const FixedLayout = () => {
    const navigate = useNavigate();

    const dropdownRef = useRef<HTMLDivElement>(null);
    const menuDropdownRef = useRef<HTMLLIElement>(null);

    const user = UseAuthStore((state: any) => state.userDetails);
    const { logout }: any = UseAuthStore();

    const [showDropdown, setShowDropdown] = useState(false);
    const [userApplicableMenu, setUserApplicableMenu] = useState<any[]>([]);
    const [openMenuDropdown, setOpenMenuDropdown] = useState<number | null>(null);

    const handleMenuDropdownToggle = (index: number) => {
        setOpenMenuDropdown(prev => (prev === index ? null : index));
    };

    const onLogout = async () => {
        logout();
        navigate('/login/cover-login');
        Cookies.remove('authToken');
        sessionStorage.clear();
    };

    const setValueInSeasonStorage = (key: string, value: string) => {
        const storage = sessionStorage;
        storage.setItem(key, JSON.stringify(value));
    };

    const test = (route: string) => {
        console.log("route", route);
        setValueInSeasonStorage('listRoute', 'Menu');
        setValueInSeasonStorage('leadListRoute', 'Menu');
        navigate(route);
    };

    const childHideFunc = (item: any, id: any) => {
        return item.map((uam: any) => uam.form_id === id ? { ...uam, childVisibility: !uam.childVisibility } : { ...uam, children: childHideFunc(uam.children, id) })
    }

    const multiLevelDropdown = (items: any[]) => {
        return items.map((item: any, index: number) => (
            <li
                key={index}
                className={`relative`}
                style={{
                    marginLeft: [0, 1, 6, 13, 86, 89, 104].includes(item.form_parent_id) ? '0px' : '10px',
                }}
            >
                <button
                    className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-left text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 rounded-md"
                    onClick={() => {
                        console.log(item)
                        test(item.form_link);
                        setUserApplicableMenu(prev => [...childHideFunc(prev, item.form_id)]);
                    }}
                >
                    <div className="flex items-center gap-2">
                        <CiViewList />
                        {item.form_name}
                    </div>
                    {item.children && item.children.length > 0 && <FaAngleDown />}
                </button>

                {item.children && item.childVisibility && (
                    <ul className="ml-3 mt-1 space-y-1">
                        {multiLevelDropdown(item.children)}
                    </ul>
                )}
            </li>
        ));
    };

    useEffect(() => {
        const menuRec = (uam: any) => {
            return uam.map((u: any) => ({ ...u, childVisibility: u.form_parent_id === 0 ? true : false, children: u.children ? menuRec(u.children) : [] }))
        }
        if (user) setUserApplicableMenu(menuRec(user.userApplicableMenu));

        // Close dropdown when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
            if (menuDropdownRef.current && !menuDropdownRef.current.contains(event.target as Node)) {
                setOpenMenuDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen w-full overflow-auto">
            <header className="z-40">
                <div className="shadow-sm">
                    <div className="relative flex w-full items-center justify-between bg-white px-5 py-1.5 dark:bg-black">
                        {/* Logo Left */}
                        <Link to="/" className="main-logo flex shrink-0 items-center">
                            <img
                                className="inline w-12 ltr:-ml-1 rtl:-mr-1"
                                src={GetProdDevImgRouteBuilder('/assets/images/berger.png')}
                                alt="logo"
                            />
                            <span className="hidden align-middle text-2xl font-semibold transition-all duration-300 ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light md:inline">
                                BERGER ONE
                            </span>
                        </Link>

                        {/* Icon Right */}
                        <div className="relative">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="collapse-icon flex items-center justify-center rounded-full bg-white-light/40 p-2 text-2xl hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary"
                            >
                                <IoLogIn />
                            </button>

                            {showDropdown && (
                                <div
                                    ref={dropdownRef}
                                    className="absolute right-0 mt-2 w-48 rounded-md bg-white p-4 shadow-lg dark:bg-dark dark:text-white"
                                >
                                    <p className="mb-2 font-medium">👤 {user?.first_name || 'User'}</p>
                                    <button
                                        onClick={onLogout}
                                        className="w-full rounded bg-red-500 px-3 py-1 text-sm font-semibold text-white hover:bg-red-600"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* horizontal menu */}
                    <ul className="horizontal-menu border-t border-[#ebedf2] bg-white px-6 py-0 font-semibold text-black rtl:space-x-reverse dark:border-[#191e3a] dark:bg-black dark:text-white-dark flex flex-wrap gap-4">
                        {userApplicableMenu.map((item: any, index: number) => (
                            <li className="relative" key={index} ref={menuDropdownRef}>
                                <div className="flex items-center cursor-pointer">
                                    {item.form_link === '#' ? (
                                        <div
                                            onClick={() => handleMenuDropdownToggle(index)}
                                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                                        >
                                            <CiViewList />
                                            <span>{item.form_name}</span>
                                            {item.children && item.children.length > 0 && <FaAngleDown />}
                                        </div>
                                    ) : (
                                        <Link
                                            to={item?.form_link || "#"}
                                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                                        >
                                            <CiViewList />
                                            <span>{item.form_name}</span>
                                            {item.children && item.children.length > 0 && <FaAngleDown />}
                                        </Link>
                                    )}
                                </div>

                                {item.children && item.children.length > 0 && openMenuDropdown === index && (
                                    <ul className="absolute left-0 mt-2 w-[300px] rounded-md bg-white p-2 shadow-lg dark:bg-[#1f2937] space-y-1 z-50">
                                        {multiLevelDropdown(item.children)}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>

                    <div className='p-2'>
                        <Outlet />
                    </div>
                </div>
            </header>
        </div>
    )
}

export default FixedLayout