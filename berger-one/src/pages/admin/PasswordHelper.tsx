import React, { useState } from 'react';
import { FaLock, FaUnlock } from 'react-icons/fa6';
// import { FaBackspace } from 'react-icons/fa';
import { commonErrorToast } from '../../services/functions/commonToast';
// import { PasswordEncryptDecrypt } from '@/src/services/api/commons/global';
import { Button } from '@mantine/core';
import { PasswordEncryptDecrypt } from '../../services/api/commons/global';
type ApiResponse = {
    data: { output_password: '' };
};
const PasswordHelper = () => {
    const [inputPassword, setInputPassword] = useState<string>('');
    const [outputPassword, setOutputPassword] = useState<string>('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handlePassword = async (pwdType: string) => {
        const data = {
            input_password: inputPassword,
            pwd_type: pwdType,
        };

        try {
            const response: any = await PasswordEncryptDecrypt(data);
            if (response.data.output_password) setOutputPassword(response.data.output_password);
            else commonErrorToast(response.errorMessage).then(async (result: any) => { });
        } catch (error) {
            setIsError(true);
            return;
        }
        setIsError(false);
        setIsLoading(false);
    };
    return (
        <>
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-2">
                <h5 className="text-lg font-semibold dark:text-white-light">Password Helper</h5>
            </div>
            <div className="panel mb-2">
                <form className=" border-1 space-y-5">
                    <div className="grid grid-cols-4 grid-rows-1 gap-2">
                        <div className="col-span-4 sm:col-span-2 md:col-span-1">
                            <label className='formLabel'>Input Password</label>
                            <input type="text" placeholder="Input Password" className="form-input" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} />
                        </div>
                        <div className="col-span-4 sm:col-span-2 md:col-span-1">
                            <label className='formLabel'>Output Password</label>
                            <input type="text" placeholder="Output Password" className="form-input" value={outputPassword} readOnly />
                        </div>
                        <div className="col-span-4 sm:col-span-2 md:col-span-1">
                            <div className="flex space-x-2 sm-justify-center">
                                <Button className="btn btn-info w-24 rounded-full mt-4" variant="filled" onClick={() => handlePassword('ENCRYPT')}>
                                    {/* <IconDownload className="h-15 w-15 shrink-0 animate-[spin_2s_linear_infinite]" /> */}
                                    <FaLock className="mr-1 h-5 w-5" />
                                    <span className='whiteTx'> Encrypt</span>
                                </Button>
                                <Button className="btn btn-info w-24 rounded-full mt-4" variant="filled" onClick={() => handlePassword('DECRYPT')}>
                                    {/* <IconDownload className="h-15 w-15 shrink-0 animate-[spin_2s_linear_infinite]" /> */}
                                    <FaUnlock className="mr-1 h-5 w-5" />
                                    <span className='whiteTx'> Decrypt</span>
                                </Button>
                            </div>
                        </div>
                        {/* <button type="button" className="btn btn-danger flex">
                            <FaBackspace className="mr-1 h-5 w-5" />
                            Back
                        </button> */}
                    </div>
                </form>
            </div>
        </>
    );
};

export default React.memo(PasswordHelper);
