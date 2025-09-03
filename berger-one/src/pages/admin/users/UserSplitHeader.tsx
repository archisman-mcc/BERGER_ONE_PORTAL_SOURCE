import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { IRootState } from '../../../store';
import Dropdown from '../../../components/Dropdown';

const columns = [
    {
        key: 'usp_user_id',
        label: 'User Id',
    },
    {
        key: 'usp_name',
        label: 'User Name',
    },
    {
        key: 'usp_group_desc',
        label: 'Group',
    },
    {
        key: 'usp_mobile',
        label: 'Mobile No',
    },
    {
        key: 'usp_mailid',
        label: 'Mailid',
    },
];

const dropDownValues = [
    {
        id: 1,
        title: 'New Opportunity',
    },
    {
        id: 2,
        title: 'Change Owner',
    },
    {
        id: 3,
        title: 'Check For New Data',
    },
    {
        id: 4,
        title: 'Submit For Approval',
    },
    {
        id: 5,
        title: 'Edit',
    },
    {
        id: 6,
        title: 'Delete',
    },

    {
        id: 7,
        title: 'Sharing',
    },
];
const UserSplitHeader = ({ UserData }: any) => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    return (
        <div>
            <div className="grid grid-cols-2 gap-4">
                <span>
                    <div className="text-2xl font-semibold uppercase">Account</div>
                    <div className="text-2xl font-semibold uppercase">Burlington Textiles Corp of America</div>
                </span>

                <div className="flex w-full flex-wrap justify-around gap-7">
                    <div className="flex items-center justify-center">
                        <div className="relative inline-flex align-middle">
                            <button type="button" className="btn btn-outline-secondary ltr:rounded-r-none ltr:border-r-0 rtl:rounded-l-none rtl:border-l-0">
                                New Contact
                            </button>
                            <button type="button" className="btn btn-outline-secondary rounded-none ltr:border-r-0 rtl:border-l-0">
                                New Case
                            </button>
                            <button type="button" className="btn btn-outline-secondary rounded-none ltr:border-r-0 rtl:border-l-0">
                                New Note
                            </button>
                            <div className="dropdown">
                                <Dropdown
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="btn btn-outline-primary ltr:rounded-l-none rtl:rounded-r-none dropdown-toggle before:border-[5px] before:border-l-transparent before:border-r-transparent before:border-t-inherit before:border-b-0 before:inline-block hover:before:border-t-white-light h-full"
                                    button={<span className="sr-only">Toggle dropdown</span>}
                                >
                                    <PerfectScrollbar className="chat-users relative h-full min-h-[80px] space-y-0.5 ltr:-mr-3.5 ltr:pr-3.5 rtl:-ml-3.5 rtl:pl-3.5 sm:h-[calc(80vh_-_357px)]">
                                        {dropDownValues.map((view: any) => {
                                            return (
                                                <ul key={view.id} className="!min-w-[170px]">
                                                    <li>
                                                        <button type="button">{view.title}</button>
                                                    </li>
                                                </ul>
                                            );
                                        })}
                                    </PerfectScrollbar>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="table-responsive mt-6">
                <table className="table-striped">
                    <thead>
                        <tr>
                            {columns.map((column) => {
                                return <th key={column.key}>{column.label}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={UserData && UserData.usp_user_id}>
                            <td>{UserData && UserData.usp_user_id}</td>
                            <td>{UserData && UserData.usp_name}</td>
                            <td>{UserData && UserData.usp_group_desc}</td>
                            <td>{UserData && UserData.usp_mobile}</td>
                            <td>{UserData && UserData.usp_mailid}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserSplitHeader;
