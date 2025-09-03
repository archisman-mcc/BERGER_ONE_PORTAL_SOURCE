import { FaList } from 'react-icons/fa6';
import { IoGrid } from 'react-icons/io5';
import { MdVerticalSplit } from 'react-icons/md';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
// import IconCaretDown from '../Icon/IconCaretDown';
import { FaCaretDown } from "react-icons/fa";
import Select from 'react-select';
import { IconX } from '@tabler/icons-react';
import Dropdown from '../Dropdown';

const listView = [
    { id: 1, icon: <FaList className="mr-1 inline-block" />, option: 'List View', code: 'ListView' },
    { id: 2, icon: <IoGrid className="mr-1 inline-block" />, option: 'Kanban View', code: 'Kanban' },
    { id: 3, icon: <MdVerticalSplit className="mr-1 inline-block" />, option: 'Split View', code: 'SplitView' },
];

const GridView = ({ onSelect, ScrumBoardGroupBy }: any) => {
    const [gridViewType, setgridViewType] = useState<any>({ id: 1, icon: <FaList />, option: 'List View', code: 'ListView' });
    const [gridViewTypeAsDraft, setgridViewTypeAsDraft] = useState({ id: 0, icon: '', option: '', code: '' });
    const [isGroupByModal, setIsGroupByModal] = useState(false);
    const [columnGroupBy, setColumnGroupBy] = useState(false);
    const [groupByIndex, setGroupByIndex] = useState(0);

    const handlegridview = (view: any) => {
        if (view.option == 'List View' || view.option == 'Split View') {
            setgridViewType(view);
            const data = {
                gridViewType: view.code,
                columnGroupBy: '',
            };
            onSelect(data);
        } else if (view.option == 'Kanban View') {
            // setgridViewTypeAsDraft(view);
            if (ScrumBoardGroupBy.page == 'LeadList') {
                setIsGroupByModal(true);
            } else {
                setgridViewType(view);
                const data = {
                    gridViewType: view.code,
                    columnGroupBy: ScrumBoardGroupBy.page == 'UserList' ? 'usp_group_code' : '',
                };
                onSelect(data);
            }
        }
    };

    const setGroupBy = (groupBy: any) => {
        onSelect({ gridViewType });
        setColumnGroupBy(groupBy);
        setgridViewType(gridViewTypeAsDraft);
        const data = {
            gridViewType: gridViewTypeAsDraft.option,
            dataGroupBy: groupBy.usp_group_code,
        };
        setIsGroupByModal(false);
        onSelect(data);
    };
    const saveGroupBy = () => { };

    const handleTypeSelect = (e: any) => {
        if (e && e.target.innerText) {
            const index = ScrumBoardGroupBy.groupBy.findIndex((element: any) => element.label == e.target.innerText);
            setGroupByIndex(index);
        }
    };

    const SelectGroupBy = (view: any) => {
        if (view && view.label) {
            const index = ScrumBoardGroupBy.groupBy.findIndex((element: any) => element.label == view.label);
            setGroupByIndex(index);
            const data = {
                gridViewType: listView[1].code,
                columnGroupBy: ScrumBoardGroupBy.groupBy[index].value,
            };

            setgridViewType(listView[1]);
            onSelect(data);
        }
    };

    const handleGroupByAndCloseModal = () => {
        setIsGroupByModal(false);
        const data = {
            gridViewType: listView[1].code,
            columnGroupBy: ScrumBoardGroupBy.groupBy[groupByIndex].value,
        };

        setgridViewType(listView[1]);
        onSelect(data);
    };

    return (
        <div className="flex">
            <div className="dropdown mr-2 flex hidden">
                {/* {gridViewType.code == 'Kanban' && ScrumBoardGroupBy.groupBy[groupByIndex].label && <div className="badge mx-2 bg-success text-sm">{ScrumBoardGroupBy.groupBy[groupByIndex].label}</div>} */}
                {ScrumBoardGroupBy.page == 'LeadList' && gridViewType.code == 'Kanban' && (
                    <Dropdown
                        offset={[0, 5]}
                        placement={'bottom-end'}
                        btnClassName="btn btn-secondary dropdown-toggle mr-2"
                        button={
                            <>
                                Group by : {ScrumBoardGroupBy.groupBy[groupByIndex].label} &nbsp; <FaCaretDown />
                            </>
                        }
                    //
                    >
                        <ul className="whitespace-nowrap">
                            {ScrumBoardGroupBy.page == 'LeadList' &&
                                ScrumBoardGroupBy.groupBy.length > 0 &&
                                ScrumBoardGroupBy.groupBy.map((view: any) => {
                                    return (
                                        <li>
                                            <button type="button" onClick={() => SelectGroupBy(view)} style={{ display: 'flex' }}>
                                                {view.label} &nbsp;
                                            </button>
                                        </li>
                                    );
                                })}
                        </ul>
                    </Dropdown>
                )}
                <Dropdown
                    offset={[0, 5]}
                    placement={'bottom-end'}
                    btnClassName="btn btn-primary dropdown-toggle"
                    button={
                        <>
                            <span>{gridViewType.icon}</span>&nbsp;
                            {gridViewType.option}
                        </>
                    }
                //
                >
                    <ul className="whitespace-nowrap">
                        {listView.map((view: any) => {
                            return (
                                <li key={view.id}>
                                    <button type="button" onClick={() => handlegridview(view)} style={{ display: 'flex' }}>
                                        {view.icon}&nbsp;{view.option}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </Dropdown>
            </div>
            {/* selecte group by */}
            <Transition appear show={isGroupByModal} as={Fragment}>
                <Dialog as="div" open={isGroupByModal} onClose={() => setIsGroupByModal(false)} className="relative z-50">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60 px-4">
                        <div className="flex min-h-screen items-center justify-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark" style={{ height: '330px' }}>
                                    <button
                                        type="button"
                                        onClick={() => setIsGroupByModal(false)}
                                        className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5 dark:bg-[#121c2c]">Group By</div>
                                    <div className="p-5">
                                        <form onSubmit={saveGroupBy}>
                                            <div className="grid gap-5">
                                                <div>
                                                    <label htmlFor="title">Select Group By</label>
                                                    <div className="dropdown">
                                                        {ScrumBoardGroupBy.page == 'UserList' && ScrumBoardGroupBy.groupBy.length > 0 && (
                                                            <Select value={ScrumBoardGroupBy.groupBy[0]} options={ScrumBoardGroupBy.groupBy} isSearchable={true} isDisabled={true} />
                                                        )}

                                                        {ScrumBoardGroupBy.page == 'LeadList' && ScrumBoardGroupBy.groupBy.length > 0 && (
                                                            <Select
                                                                value={ScrumBoardGroupBy.groupBy[groupByIndex]}
                                                                options={ScrumBoardGroupBy.groupBy}
                                                                isSearchable={true}
                                                                onChange={() => {
                                                                    handleTypeSelect(event);
                                                                }}
                                                            />
                                                        )}
                                                        {/* <Dropdown
                                                            placement="bottom-start"
                                                            btnClassName="btn btn-outline-secondary dropdown-toggle"
                                                            button={
                                                                <>
                                                                    Select
                                                                    <span>
                                                                        <IconCaretDown className="inline-block ltr:ml-1 rtl:mr-1" />
                                                                    </span>
                                                                </>
                                                            }
                                                        >
                                                            {Page.page == 'UserList' && Page.groupBy.length > 0 && (
                                                                <ul className="!min-w-[170px]">
                                                                    {Page.groupBy.map((view: any, index: any) => {
                                                                        return (
                                                                            <li key={index}>
                                                                                <button type="button" onClick={() => setGroupBy(view)}>
                                                                                    {view.usp_group_desc}
                                                                                </button>
                                                                            </li>
                                                                        );
                                                                    })}
                                                                </ul>
                                                            )}
                                                            
                                                            {Page.page == 'LeadList' && (
                                                                <ul className="!min-w-[170px]">
                                                                    {Page.groupBy.map((view: any, index: any) => {
                                                                        return (
                                                                            <li key={index}>
                                                                                <button type="button" onClick={() => setGroupBy(view)}>
                                                                                    {view.lov_value}
                                                                                </button>
                                                                            </li>
                                                                        );
                                                                    })}
                                                                </ul>
                                                            )}

                                                            
                                                        </Dropdown> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-36 flex items-center justify-center">
                                                <button type="button" className="btn btn-success w-24" onClick={() => handleGroupByAndCloseModal()}>
                                                    Next
                                                </button>{' '}
                                                &nbsp;
                                                <button type="button" className="btn btn-danger w-24" onClick={() => setIsGroupByModal(false)}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default GridView;
