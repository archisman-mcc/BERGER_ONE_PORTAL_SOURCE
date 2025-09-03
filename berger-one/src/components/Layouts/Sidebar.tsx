import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import IconCaretsDown from '../../components/Icon/IconCaretsDown';
import IconMenuDashboard from '../../components/Icon/Menu/IconMenuDashboard';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconMinus from '../../components/Icon/IconMinus';
import IconMenuChat from '../../components/Icon/Menu/IconMenuChat';
import IconMenuMailbox from '../../components/Icon/Menu/IconMenuMailbox';
import IconMenuTodo from '../../components/Icon/Menu/IconMenuTodo';
import IconMenuNotes from '../../components/Icon/Menu/IconMenuNotes';
import IconMenuScrumboard from '../../components/Icon/Menu/IconMenuScrumboard';
import IconMenuContacts from '../../components/Icon/Menu/IconMenuContacts';
import IconMenuInvoice from '../../components/Icon/Menu/IconMenuInvoice';
import IconMenuCalendar from '../../components/Icon/Menu/IconMenuCalendar';
import IconMenuComponents from '../../components/Icon/Menu/IconMenuComponents';
import IconMenuElements from '../../components/Icon/Menu/IconMenuElements';
import IconMenuCharts from '../../components/Icon/Menu/IconMenuCharts';
import IconMenuWidgets from '../../components/Icon/Menu/IconMenuWidgets';
import IconMenuFontIcons from '../../components/Icon/Menu/IconMenuFontIcons';
import IconMenuDragAndDrop from '../../components/Icon/Menu/IconMenuDragAndDrop';
import IconMenuTables from '../../components/Icon/Menu/IconMenuTables';
import IconMenuDatatables from '../../components/Icon/Menu/IconMenuDatatables';
import IconMenuForms from '../../components/Icon/Menu/IconMenuForms';
import IconMenuUsers from '../../components/Icon/Menu/IconMenuUsers';
import IconMenuPages from '../../components/Icon/Menu/IconMenuPages';
import IconMenuAuthentication from '../../components/Icon/Menu/IconMenuAuthentication';
import IconMenuDocumentation from '../../components/Icon/Menu/IconMenuDocumentation';
import { UseAuthStore } from '../../services/store/AuthStore';
import FeatherIcon from 'feather-icons-react';
import { GetProdDevImgRouteBuilder } from '../../services/functions/getProdDevUrlBuilder';
const Sidebar = () => {
    const router = useRouter();
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    const [userApplicableMenu, setUserApplicableMenu] = useState<any[]>([]);
    const user = UseAuthStore((state) => state.userDetails);
    useEffect(() => {
        if (user) setUserApplicableMenu(user.userApplicableMenu);
    }, []);

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        setActiveRoute();
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [router.pathname]);

    const setActiveRoute = () => {
        let allLinks = document.querySelectorAll('.sidebar ul a.active');
        for (let i = 0; i < allLinks.length; i++) {
            const element = allLinks[i];
            element?.classList.remove('active');
        }
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        selector?.classList.add('active');
    };

    const dispatch = useDispatch();
    const { t } = useTranslation();

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="h-full bg-white dark:bg-black">
                    <div className="flex items-center justify-between px-4 py-3">
                        <Link href="/" className="main-logo flex shrink-0 items-center">
                            <img className="ml-[5px] w-8 flex-none" src={GetProdDevImgRouteBuilder('/assets/images/berger.png')} alt="logo" />
                            <span className="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline">{t('BPIL CRM')}</span>
                        </Link>

                        <button
                            type="button"
                            className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    {userApplicableMenu && userApplicableMenu.length > 0 ? (
                        <>
                            <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
                                {/* {console.log(userApplicableMenu)} */}
                                <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
                                    {userApplicableMenu.map((item: any, index) => (
                                        <li className="menu nav-item" key={index}>
                                            <button type="button" className={`${currentMenu === item.form_name ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu(item.form_name)}>
                                                <div className="w-100 flex items-center">
                                                    {item.form_link != '#' ? (
                                                        <Link href={item.form_link}>
                                                            <span className="w-100 flex justify-start text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                                                                <FeatherIcon className="mr-2" icon={item.form_icon} />
                                                                {item.form_name}
                                                            </span>
                                                        </Link>
                                                    ) : (
                                                        <span className="w-100 flex justify-start text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                                                            <FeatherIcon icon={item.form_icon} />
                                                            <span className="ml-2 px-1">{item.form_name}</span>
                                                        </span>
                                                    )}
                                                </div>

                                                {item.children && item.children.length > 0 ? (
                                                    <div className="right_arrow">
                                                        <IconCaretDown />
                                                    </div>
                                                ) : null}
                                            </button>
                                            {item.children && item.children.length > 0 ? (
                                                <AnimateHeight duration={300} height={currentMenu === item.form_name ? 'auto' : 0}>
                                                    <ul className="sub-menu text-gray-500">
                                                        {item.children.map((item: any, index: any) => (
                                                            <li key={index}>
                                                                <Link href={item.form_link}>
                                                                    <FeatherIcon className="mr-2" icon={item.form_icon} />
                                                                    {item.form_name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </AnimateHeight>
                                            ) : null}
                                        </li>
                                    ))}
                                </ul>
                            </PerfectScrollbar>
                        </>
                    ) : null}
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
