import { useEffect, useMemo, useState } from "react";
import { UseAuthStore } from "../../../services/store/AuthStore";
import * as common from '../../../services/api/users/UserProfile';
import * as Epca from '../../../services/api/protectonEpca/EpcaList';
import * as Inoice from '../../../services/api/protectonTransact/TransactInvoice';
import Select from 'react-select';
import { CiSearch } from "react-icons/ci";
import AnimateHeight from "react-animate-height";
import { Modal } from "@mantine/core";
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from "mantine-react-table";

const TransactInvoice = () => {

    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [data, setData] = useState<any>({
        regionList: [],
        depotList: [],
        terrList: [],
        selectedRegion: '',
        selectedDepot: '',
        selectedTerr: '',
        valueInPage: 7,
        invoiceList: [],
        invoiceDetails: []
    });

    const [openOrg, setOpenOrg] = useState<string | null>(null);
    const [openDealer, setOpenDealer] = useState<string | null>(null);

    const user = UseAuthStore((state: any) => state.userDetails);

    const GetRegion = async () => {
        setLoading(true);
        const data: any = {
            user_group: user.group_code,
            app_id: '15',
            user_appl_yn: 'Y'
        };
        try {
            const response: any = await common.GetProtectonRegion(data);
            setData((prevData: any) => ({
                ...prevData,
                regionList: response.data.table || [],
            }));

        } catch (error) {
            return;
        }
        setLoading(false);
    }

    const Getdepot = async (region: string) => {
        setLoading(true);

        const payload: any = {
            user_id: user.user_id,
            region: region,
            app_id: '15',
        };
        try {
            const response: any = await Epca.GetApplicableDepotList(payload);
            setData((prevData: any) => ({
                ...prevData,
                depotList: response.data || [],
                selectedRegion: region,
                selectedDepot: ''
            }));
        } catch (error) {
            return;
        }
        setLoading(false);
    }

    const GetTerr = async (region: string) => {
        setLoading(true);

        const payload: any = {
            region: region,
            app_id: '15',
            user_appl_yn: 'Y'
        };
        try {
            const response: any = await common.GetProtectonApplicableTerr(payload);
            setData((prevData: any) => ({
                ...prevData,
                terrList: response.data.table || [],
                selectedRegion: region,
                selectedTerr: ''
            }));
        } catch (error) {
            return;
        }
        setLoading(false);
    }

    const GetInvoice = async () => {
        setLoading(true);
        const payload: any = {
            region: data.selectedRegion,
            depot_code: data.selectedDepot,
            terr_code: data.selectedTerr,
            days: data.valueInPage,
            rep_type: 'TRX',
        };

        try {
            const response: any = await Inoice.GetInvoiceDetails(payload);
            const rawList: Array<any> = response.data.table || [];

            // 1) First pass: build a nested map { [orgName]: { org, dealers: { [dealerName]: { dealer, items: [] } } } }
            const orgMap: Record<
                string,
                { org: string; dealers: Record<string, { dealer: string; items: any[] }> }
            > = rawList.reduce((acc, invoice) => {
                const orgKey = invoice.org;
                const dealerKey = invoice.dealer;

                // If we haven't seen this org yet, initialize its entry:
                if (!acc[orgKey]) {
                    acc[orgKey] = {
                        org: orgKey,
                        dealers: {},
                    };
                }

                // If we haven't seen this dealer under that org yet, initialize it:
                if (!acc[orgKey].dealers[dealerKey]) {
                    acc[orgKey].dealers[dealerKey] = {
                        dealer: dealerKey,
                        items: [],
                    };
                }

                // Push the raw invoice object into that dealer’s item‐list
                acc[orgKey].dealers[dealerKey].items.push(invoice);
                return acc;
            }, {} as typeof orgMap);

            // 2) Convert that map into an array-of-orgs → array-of-dealers → array-of-items
            const groupedList = Object.values(orgMap).map(orgEntry => ({
                org: orgEntry.org,
                dealers: Object.values(orgEntry.dealers).map(dealerEntry => ({
                    dealer: dealerEntry.dealer,
                    items: dealerEntry.items,
                })),
            }));

            // 3) Save the grouped structure into state
            setData((prevData: any) => ({
                ...prevData,
                invoiceList: groupedList,
            }));
        } catch (error) {
            // Early return—a grouped invoiceList will remain whatever it was before
            return;
        } finally {
            setLoading(false);
        }
    }

    const GetInvoiceDetails = async (trx_id: string) => {
        setLoading(true);
        const payload: any = {
            region: data.selectedRegion,
            depot_code: data.selectedDepot,
            terr_code: data.selectedTerr,
            trx_id: trx_id,
            rep_type: 'SKU',
        };

        try {
            const response: any = await Inoice.GetInvoiceDetails(payload);
            setData((prevData: any) => ({
                ...prevData,
                invoiceDetails: response.data.table || [],
            }));
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }

    type DespatchDetailsType = {
        sku_desc: string;
        vol: number;
        val: number;
    };

    const columns = useMemo<MRT_ColumnDef<DespatchDetailsType>[]>(
        () => [
            {
                accessorKey: 'sku_desc',
                header: 'SKU Details',
                size: 50,
            },
            {
                accessorKey: 'vol',
                header: 'Vol',
                size: 50,
            },
            {
                accessorKey: 'val',
                header: 'Val',
                size: 50,
            },
        ],
        []
    );

    const tableDetails = useMantineReactTable({
        columns,
        data: data.invoiceDetails,
        enableColumnResizing: true,
        enableStickyHeader: true,
        enableTopToolbar: false,
        enableSorting: false,
        enableColumnActions: false,
        columnResizeMode: 'onChange',
        mantineTableContainerProps: {
            style: {
                overflowX: 'hidden',
            },
        },
    });


    useEffect(() => {
        GetRegion();
    }, []);

    return (
        <>
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-1">
                <h5 className="text-lg font-semibold dark:text-white-light">Transact Invoice</h5>
            </div>

            <div className="bg-white rounded-lg px-4 py-2 shadow-md mb-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">

                    <div>
                        <label className="block text-sm font-semibold mb-1">Region:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            options={[
                                ...data.regionList.map((d: any) => ({
                                    value: d.depot_regn,
                                    label: d.regn_new,
                                })),
                            ]}
                            value={
                                data.selectedRegion
                                    ? { value: data.selectedRegion, label: data.selectedRegion }
                                    : null
                            }
                            onChange={(event) => {
                                Getdepot(event?.value);
                                GetTerr(event?.value);
                            }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Depot:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            options={[
                                { value: '', label: 'ALL' },
                                ...data.depotList.map((d: any) => ({
                                    value: d.depot_code,
                                    label: d.depot_name,
                                })),
                            ]}
                            value={
                                data.selectedDepot
                                    ? { value: data.selectedDepot, label: data.depotList.find((d: any) => d.depot_code === data.selectedDepot)?.depot_name }
                                    : null
                            }
                            onChange={(event) => {
                                setData((pre: any) => ({ ...pre, selectedDepot: event?.value }))
                            }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Territory:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            options={data.terrList.map((d: any) => ({
                                value: d.terr_code,
                                label: d.terr_name,
                            }))}
                            value={
                                data.selectedTerr
                                    ? { value: data.selectedTerr, label: data.terrList.find((d: any) => d.terr_code === data.selectedTerr)?.terr_name }
                                    : null
                            }
                            onChange={(event) => {
                                setData((pre: any) => ({ ...pre, selectedTerr: event?.value }))
                            }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Value in Page:</label>
                        <input
                            type="number"
                            min="0"
                            max="30"
                            value={data.valueInPage}
                            onKeyDown={(e) => {
                                if (["e", "E", "+", "-"].includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            onChange={(e) => {
                                let value = parseInt(e.target.value, 10);
                                if (isNaN(value) || value < 0) {
                                    value = 0;
                                } else if (value > 30) {
                                    value = 30;
                                }
                                setData((prev: any) => ({ ...prev, valueInPage: value }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex items-end space-x-2">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 space-x-2 rounded hover:bg-blue-600 text-sm flex items-center"
                            onClick={(e) => {
                                e.preventDefault();
                                GetInvoice();
                            }}>
                            <CiSearch /> <span>Search</span>
                        </button>
                    </div>

                </div>
            </div>

            <div className="space-y-2">
                {data.invoiceList.map((group: any) => (
                    <div key={group.org} className="rounded border border-[#d3d3d3] dark:border-[#1b2e4b]">
                        <button
                            type="button"
                            className="flex w-full items-center px-3 py-2 text-white-dark font-semibold bg-slate-400"
                            onClick={() => setOpenOrg(openOrg === group.org ? null : group.org)}
                        >
                            <span>{group.org}</span>
                            <div className="ltr:ml-auto rtl:mr-auto">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={openOrg === group.org ? "rotate-180" : ""}
                                >
                                    <path
                                        d="M19 9L12 15L5 9"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </div>
                        </button>
                        <AnimateHeight duration={300} height={openOrg === group.org ? "auto" : 0}>
                            <div className="p-2">
                                {group.dealers.map((dealerGroup: any) => (
                                    <div key={dealerGroup.dealer} className="mb-2">
                                        <button
                                            type="button"
                                            className="custAccoHead flex w-full items-center px-3 py-2 text-white-dark"
                                            onClick={() =>
                                                setOpenDealer(
                                                    openDealer === dealerGroup.dealer ? null : dealerGroup.dealer
                                                )
                                            }
                                        >
                                            <span>{dealerGroup.dealer}</span>
                                            <div className="ltr:ml-auto rtl:mr-auto">
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className={openDealer === dealerGroup.dealer ? "rotate-180" : ""}
                                                >
                                                    <path
                                                        d="M19 9L12 15L5 9"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </button>
                                        <AnimateHeight duration={300} height={openDealer === dealerGroup.dealer ? "auto" : 0}>
                                            <div className="p-2">
                                                <div className="grid grid-cols-5 gap-4 font-semibold border-b pb-1 mb-1">
                                                    <span>Inv Dt</span>
                                                    <span>Inv No</span>
                                                    <span>Vol</span>
                                                    <span>Val</span>
                                                    <span>Action</span>
                                                </div>
                                                {dealerGroup.items.map((invoice: any, index: number) => (
                                                    <div
                                                        key={index}
                                                        className="grid grid-cols-5 gap-4 py-1 border-b last:border-0"
                                                    >
                                                        <span>{invoice.trx_date}</span>
                                                        <span>{invoice.trx_number}</span>
                                                        <span>{invoice.fnl_vol}</span>
                                                        <span>{invoice.val}</span>
                                                        <span>
                                                            <button
                                                                className="text-blue-500 px-2 rounded bg-blue-100"
                                                                onClick={() => {
                                                                    GetInvoiceDetails(invoice.trx_id)
                                                                    setModalOpen(true);
                                                                }}
                                                            >
                                                                View
                                                            </button>
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </AnimateHeight>
                                    </div>
                                ))}
                            </div>
                        </AnimateHeight>
                    </div>
                ))}
            </div>

            <Modal
                opened={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setData((prevData: any) => ({
                        ...prevData,
                        invoiceDetails: [],
                    }));
                }}
                size="80vw"
            >
                {data.invoiceDetails.length > 0 ? (

                    <div>
                        <div className="page-titlebar flex items-center justify-between bg-white px-4 py-1">
                            <h5 className="text-lg font-semibold dark:text-white-light">Invoice Details</h5>
                        </div>


                        <div className="bg-white rounded-lg px-4 py-2 shadow-md mb-2">

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Dealer:</label>
                                    <input type="text" value={data.invoiceDetails[0].dealer} readOnly className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Region:</label>
                                    <input type="text" value={data.invoiceDetails[0].regn} readOnly className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Depot:</label>
                                    <input type="text" value={data.invoiceDetails[0].org} readOnly className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Invoice Id:</label>
                                    <input type="text" value={data.invoiceDetails[0].trx_number} readOnly className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Invoice Date:</label>
                                    <input type="text" value={data.invoiceDetails[0].trx_date} readOnly className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Vehicle No:</label>
                                    <input type="text" value={data.invoiceDetails[0].vehicle_no} readOnly className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Despatch Date:</label>
                                    <input type="text" value={data.invoiceDetails[0].despatch_date} readOnly className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                            </div>

                            <div className="mb-2 overflow-y-auto p-pl-table-item">
                                <MantineReactTable table={tableDetails} />
                            </div>

                        </div>
                    </div>


                ) : (
                    <div>Invoice Details Loading</div>
                )}
            </Modal>


            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
                    <div role="status" className="animate-spin">
                        <svg aria-hidden="true" className="h-8 w-8 fill-blue-600 text-gray-200" viewBox="0 0 100 101" fill="none">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only text-white">Please Wait...</span>
                    </div>
                </div>
            )}
        </>
    );
}

export default TransactInvoice;