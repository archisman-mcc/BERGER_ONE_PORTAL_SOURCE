import { useEffect, useState } from 'react';
import { GetProdDevImgRouteBuilder } from '../../services/functions/getProdDevUrlBuilder'
import { IoMdMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
// import { ValidateLogin } from '../../services/api/login/loginSevice';
import { commonErrorToast, commonSuccessToast } from '../../services/functions/commonToast';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { UseAuthStore } from '../../services/store/AuthStore';
import { ValidateLogin } from '../../services/login/loginSevice';
// import { UseAuthStore } from '../../services/store/AuthStore';

const Login = () => {
    const { login }: any = UseAuthStore();
    const user = UseAuthStore((state: any) => state.userDetails);

    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        let postObj: { user_id: any; password: any } = { user_id: loginData.email, password: loginData.password };
        try {
            const response: any = await ValidateLogin(postObj);
            if (response && response.success && response.message && response.token) {
                const user = { userDetails: response };
                localStorage.setItem('_token', response.token);
                localStorage.setItem('_refresh_token', response.refresh_token);
                commonSuccessToast('Login Successful');
                login(user);
                Cookies.set('authToken', response.token);
                setTimeout(() => navigate('/'));
            } else {
                commonErrorToast(response.message);
            }
        } catch (error) {
            commonErrorToast('Login Failed - ' + error);
        } finally {
            setLoading(false); // Stop loading after the operation is complete
        }
    };

    useEffect(() => {
        user?.user_id && navigate('/')
    }, [user])


    return (
        // <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        //     <div className="max-w-md w-full space-y-8">
        //         <div>
        //             <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        //                 Sign in to your account
        //             </h2>
        //             <p className="mt-2 text-center text-sm text-gray-600">
        //                 Enter your credentials to access your account
        //             </p>
        //         </div>
        //         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        //             <div className="rounded-md shadow-sm -space-y-px">
        //                 <div className="relative">
        //                     <label htmlFor="email" className="sr-only">
        //                         Email address
        //                     </label>
        //                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        //                         <IoMdMail className="h-5 w-5 text-gray-400" />
        //                     </div>
        // <input
        //     id="email"
        //     name="email"
        //     type="email"
        //     required
        //     className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        //     placeholder="Email address"
        //     value={loginData.email}
        //     onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        // />
        //                 </div>
        //                 <div className="relative">
        //                     <label htmlFor="password" className="sr-only">
        //                         Password
        //                     </label>
        //                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        //                         <RiLockPasswordFill className="h-5 w-5 text-gray-400" />
        //                     </div>
        // <input
        //     id="password"
        //     name="password"
        //     type="password"
        //     required
        //     className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        //     placeholder="Password"
        //     value={loginData.password}
        //     onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        // />
        //                 </div>
        //             </div>

        //             <div>
        //                 <button
        //                     type="submit"
        //                     disabled={loading}
        //                     className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        //                 >
        //                     {loading ? 'Signing in...' : 'Sign in'}
        //                 </button>
        //             </div>
        //         </form>
        //     </div>
        // </div>
        <div>
            <div className="bgImgFixed absolute inset-0">
                <img src={GetProdDevImgRouteBuilder('/assets/images/auth/bg-gradient.png')} alt="image" className="h-full w-full object-cover" />
            </div>
            <div
                className={`bgImgFixed relative flex min-h-screen items-center justify-center bg-[url(${GetProdDevImgRouteBuilder(
                    '/assets/images/auth/map.png'
                )})] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16`}
            >
                <img src={GetProdDevImgRouteBuilder('/assets/images/auth/coming-soon-object1.png')} alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src={GetProdDevImgRouteBuilder('/assets/images/auth/coming-soon-object2.png')} alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src={GetProdDevImgRouteBuilder('/assets/images/auth/coming-soon-object3.png')} alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src={GetProdDevImgRouteBuilder('/assets/images/auth/polygon-object.svg')} alt="image" className="absolute bottom-0 end-[28%]" />

                <div className="h-100 relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:flex-row lg:gap-10 xl:gap-0">
                    <div className="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(239,18,98,1)_0%,rgba(67,97,238,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                        <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
                        <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
                            <img src={GetProdDevImgRouteBuilder('/assets/images/berger.png')} alt="Logo" className="mx-auto mt-20" />
                            <div className="hidden w-full max-w-[430px] lg:block">
                                <img src={GetProdDevImgRouteBuilder('/assets/images/auth/login.svg')} alt="Cover Image" className="w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                        <div className="w-full max-w-[440px] lg:mt-16">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl dark:text-white">Sign in</h1>
                                <p className="text-base font-bold leading-normal text-white-dark dark:text-slate-500">Enter your user Id and password to login</p>
                            </div>
                            <form className="space-y-5 dark:text-white">
                                <div>
                                    <label htmlFor="Email">User Id</label>
                                    <div className="relative text-white-dark">
                                        {/* <input id="Email" type="text" {...register('user_id')} placeholder="Enter User Id" className="form-input ps-10 placeholder:text-white-dark" /> */}
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Email address"
                                            value={loginData.email}
                                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IoMdMail />
                                        </span>
                                    </div>
                                    {/* <div className="text-danger">{errors.user_id?.message}</div> */}
                                </div>

                                <div>
                                    <label htmlFor="Password">Password</label>
                                    <div className="relative text-white-dark">
                                        {/* <input id="Password" type="password" {...register('password')} placeholder="Enter Password" className="form-input ps-10 placeholder:text-white-dark" /> */}
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Password"
                                            value={loginData.password}
                                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <RiLockPasswordFill />
                                        </span>
                                    </div>
                                    {/* <div className="text-danger">{errors.password?.message}</div> */}
                                </div>

                                {/* Submit button with loader when loading is true */}
                                <button
                                    type="submit"
                                    className="btn btn-gradient rounded-full bg-pink-500 !mt-6 flex h-[48px] w-full items-center justify-center border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)] disabled:opacity-80"
                                    onClick={(e) => handleSubmit(e)}
                                    disabled={loading} // Disable button while loading
                                >
                                    {loading ? (
                                        <div className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-white border-r-transparent" role="status">
                                            <span className="clip-rect(0,0,0,0) absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0">Loading...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <FaCheck className="mr-2 text-white" />
                                            Sign in
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                        <p className="absolute text-xs bottom-6 w-full text-center dark:text-white">© {new Date().getFullYear()}.Berger Paints All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login