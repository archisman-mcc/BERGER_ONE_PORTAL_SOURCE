import { useState, useEffect, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { IRootState } from '../../../store';
import { GetEscalationMail, SendEscalationMail } from '../../../services/api/lead-service';
import { commonAlert } from '../../../services/functions/commonAlert';
import { commonSuccessToast } from '../../../services/functions/commonToast';
const ReactQuill = dynamic(import('react-quill'), { ssr: false });
import FeatherIcon from 'feather-icons-react';
import { Editor } from '@tinymce/tinymce-react';
const SendMail = ({ LeadDetails, onModalButtonHandle }: any) => {
    // const dispatch = useDispatch();
    const [userDetails, SetUserDetails] = useState<any>(null);
    useEffect(() => {
        let userData: any = JSON.parse(localStorage.getItem('auth') || '');
        userData.state.userDetails.fullName = userData.state.userDetails.first_name + ' ' + userData.state.userDetails.last_name;
        SetUserDetails(JSON.parse(JSON.stringify(userData)));
        GetEscalationMailDetails();
    }, []);

    const defaultParams = {
        id: null,
        from: 'vristo@mail.com',
        to: [],
        cc: '',
        title: '',
        file: null,
        description: '',
        displayDescription: '',
        code: '',
    };

    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [pager] = useState<any>({
        currentPage: 1,
        totalPages: 0,
        pageSize: 10,
        startIndex: 0,
        endIndex: 0,
    });

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const GetEscalationMailDetails = async () => {
        const data = {
            escalation_type: LeadDetails.escalation_type,
            enq_id: null,
            lead_id: LeadDetails.lh_id,
        };

        try {
            let toEmail: any = [];
            let ccEmail: any = [];
            const response: any = await GetEscalationMail(data);
            params.code = response.template_data[0].code;
            response.contact_data.depot_contact.map((item, index) => {
                if (index <= response.contact_data.depot_contact.length - 1 && item.email != '' && item.email != null && !toEmail.includes(item.email)) {
                    toEmail.push(item.email);
                }
            });
            response.contact_data.terr_contact.map((item, index) => {
                if (index <= response.contact_data.terr_contact.length - 1 && item.email != '' && item.email != null && !ccEmail.includes(item.email)) {
                    ccEmail.push(item.email);
                }
            });
            params.to = toEmail.join(', ');
            params.cc = ccEmail.join(', ');
            params.title = response.template_data[0].title;
            params.description = response.template_data[0].content;
            setParams(JSON.parse(JSON.stringify(params)));
        } catch (error) {
            return;
        }
    };

    const saveMail = () => {
        const data = {
            notification_code: params.code,
            subject: params.title,
            content: params.description,
            receipients: params.to,
            cc: params.cc,
            bcc: null,
        };

        commonAlert('Are You Sure?', 'If you click send the mail will be send to recipients. To cancel please press cancel button.', 'warning').then(async (result: any) => {
            if (result.value) {
                try {
                    // const response = SendEscalationMail(data);
                    // if (response.response_message) {
                    commonSuccessToast('Mail Send Successfully');
                    onModalButtonHandle('Mail');
                    // }
                } catch (error) {
                    return;
                }
            }
        });
    };

    const editorRef: any = useRef(null);
    const log = () => {
        if (editorRef.current) {
        }
    };

    return (
        <div>
            {params.description != '' && (
                <div className="relative flex h-full gap-5 sm:h-[calc(100vh_-_150px)]">
                    <div className="h-full flex-1 overflow-x-hidden p-0">
                        <div className="relative">
                            <div className="h-px bg-gradient-to-l from-indigo-900/20 via-black to-indigo-900/20 opacity-[0.1] dark:via-white"></div>
                            <form className="grid gap-1 p-3">
                                <div>
                                    <label className="text-md">From</label>
                                    <input
                                        id="to"
                                        type="text"
                                        className="disable form-input"
                                        placeholder="Enter To"
                                        defaultValue={userDetails.state.userDetails.fullName}
                                        onChange={(e) => {
                                            changeValue(e);
                                        }}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="text-md">To</label>
                                    <input
                                        id="to"
                                        type="text"
                                        className="form-input"
                                        placeholder="Enter To"
                                        defaultValue={params.to}
                                        onChange={(e) => {
                                            changeValue(e);
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="text-md">CC</label>
                                    <input id="cc" type="text" className="form-input" placeholder="Enter Cc" defaultValue={params.cc} onChange={(e) => changeValue(e)} />
                                </div>

                                <div>
                                    <label className="text-md">Subject</label>
                                    <input id="title" type="text" className="form-input" placeholder="Enter Subject" defaultValue={params.title} onChange={(e) => changeValue(e)} />
                                </div>

                                <div className="h-auto">
                                    {/* <ReactQuill
                                    theme="snow"
                                    value={params.description || ''}
                                    defaultValue={params.description || ''}
                                    onChange={(content, delta, source, editor) => {
                                        params.description = content;
                                        params.displayDescription = editor.getText();
                                        setParams({
                                            ...params,
                                        });
                                    }}
                                    style={{ minHeight: '200px' }}
                                /> */}
                                    <Editor
                                        apiKey="dha8yl1ga4f9keohi3hh6unzr4br8zlbudyq4dkkqygbfenh"
                                        onInit={(evt, editor) => (editorRef.current = editor)}
                                        initialValue={params.description}
                                        init={{
                                            height: 400,
                                            menubar: false,
                                            plugins: [
                                                'advlist autolink lists link image charmap print preview anchor',
                                                'searchreplace visualblocks code fullscreen',
                                                'insertdatetime media table paste code help wordcount',
                                            ],
                                            toolbar:
                                                'undo redo | formatselect | ' +
                                                'bold italic backcolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help',
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                        }}
                                    />
                                </div>
                            </form>
                            <div className="mt-8 flex items-center justify-center">
                                <button type="button" className="btn btn-danger w-24 text-base ltr:ml-4 rtl:mr-4">
                                    Cancel
                                </button>
                                {LeadDetails && !LeadDetails.IsButtonDisable && (
                                    <button type="button" className="btn btn-primary w-24 text-base ltr:ml-4 rtl:mr-4" onClick={() => saveMail()}>
                                        <FeatherIcon className="xs mr-2" icon="send" />
                                        Send
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {params.description == '' && (
                <>
                    <div className="flex items-center justify-center" style={{ height: `55vh` }}>
                        <span className="mb-10 inline-block h-12 w-12 animate-spin rounded-full border-4 border-success border-l-transparent align-middle"></span>
                        <span className="mb-8 ml-2">Loading mail details... </span>
                    </div>
                </>
            )}
        </div>
    );
};

export default SendMail;
