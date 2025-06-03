import { useEffect, useState } from "react";
import { UseAuthStore } from "../../../services/store/AuthStore";
import * as common from '../../../services/api/users/UserProfile';
import * as Epca from '../../../services/api/protectonEpca/EpcaList';
import * as stock from '../../../services/api/protectonTransact/TransactStock';
import Select from 'react-select';
import { CiSearch } from "react-icons/ci";


const TransactStock = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>({
        regionList: [],
        depotList: [],
        productList: [],
        shadeList: [],
        selectedRegion: '',
        selectedDepot: '',
        selectedProduct: '',
        selectedShade: [],
        skuList: [],
    });

    // track which SKU accordion is open
    const [openSku, setOpenSku] = useState<string | null>(null);

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

        if (!region) {
            setData((prevData: any) => ({
                ...prevData,
                depotList: [],
                selectedDepot: '',
                selectedRegion: ''
            }));
            setLoading(false);
            return;
        }

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

    const GetProduct = async () => {
        setLoading(true);
        const payload: any = {
            prd_desc: '',
        };
        try {
            const response: any = await stock.GetPrdList(payload);
            setData((prevData: any) => ({
                ...prevData,
                productList: response.data.table || [],
            }));
        } catch (error) {
            return;
        }
        setLoading(false);
    }

    const GetShade = async (product: string) => {
        setLoading(true);
        const payload: any = {
            prd_code: product,
            shd_desc: '',
        };
        try {
            const response: any = await stock.GetShdList(payload);
            setData((prevData: any) => ({
                ...prevData,
                shadeList: response.data.table || [],
                selectedProduct: product,
                selectedShade: []
            }));
        } catch (error) {
            return;
        }
        setLoading(false);
    }

    const GetSkuList = async () => {
        setLoading(true);
        const payload: any = {
            app_id: '15',
            regn: data.selectedRegion,
            depot: data.selectedDepot,
            prd_code: data.selectedProduct,
            shd_code: data.selectedShade.join(','),
        };
        try {
            const response: any = await stock.GetSkuList(payload);
            // setData((prevData: any) => ({
            //     ...prevData,
            //     skuList: response.data.table || [],
            // }));

            setData((prevData: any) => {
                const groupedBySku = (response.data.table || []).reduce(
                    (acc: any, item: any) => {
                        const { sku, descr, depot, asOn, regn, sir, sit, stk } = item;

                        if (!acc[sku]) {
                            acc[sku] = {
                                sku,
                                descr,
                                depotWiseList: {} as Record<
                                    string,
                                    { depot: string; asOn: string; regn: string; sir: number; sit: number; stk: number }
                                >,
                            };
                        }

                        acc[sku].depotWiseList[depot] = {
                            depot,   // ← include depot name here
                            asOn,
                            regn,
                            sir,
                            sit,
                            stk,
                        };
                        return acc;
                    },
                    {} as Record<
                        string,
                        {
                            sku: string;
                            descr: string;
                            depotWiseList: Record<
                                string,
                                { depot: string; asOn: string; regn: string; sir: number; sit: number; stk: number }
                            >;
                        }
                    >
                );

                const skuListArray = Object.values(groupedBySku);

                return {
                    ...prevData,
                    skuList: skuListArray,
                };
            });



        } catch (error) {
            return;
        }
        setLoading(false);
    }

    useEffect(() => {
        GetRegion();
        GetProduct();
    }, []);

    useEffect(() => {
        console.log("List:", data.selectedRegion, data.selectedDepot, data.selectedProduct, data.selectedShade);
    }, [data.selectedRegion, data.selectedDepot, data.selectedProduct, data.selectedShade]);

    useEffect(() => {
        console.log("skuList:", data.skuList);
    }, [data.skuList]);

    return (
        <>
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-1">
                <h5 className="text-lg font-semibold dark:text-white-light">Transact Stock</h5>
            </div>

            <div className="bg-white rounded-lg px-4 py-2 shadow-md mb-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">

                    <div>
                        <label className="block text-sm font-semibold mb-1">Region:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            options={[
                                { value: '', label: 'ALL' }, // Add the "ALL" option at the top
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
                            }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Depot:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            options={data.depotList.map((d: any) => ({
                                value: d.depot_code,
                                label: d.depot_name,
                            }))}
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
                        <label className="block text-sm font-semibold mb-1">Product:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            options={data.productList.map((d: any) => ({
                                value: d.prd_code,
                                label: d.prd_desc,
                            }))}
                            value={
                                data.selectedProduct
                                    ? { value: data.selectedProduct, label: data.productList.find((d: any) => d.prd_code === data.selectedProduct)?.prd_desc }
                                    : null
                            }
                            onChange={(event) => {
                                GetShade(event?.value);
                            }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Shade:</label>
                        <Select
                            className="text-sm"
                            isSearchable={true}
                            isMulti={true}
                            options={[
                                { value: '', label: 'ALL' },
                                ...data.shadeList.map((d: any) => ({
                                    value: d.shd_code,
                                    label: d.shd_desc,
                                })),
                            ]}
                            value={
                                data.selectedShade && data.selectedShade.length > 0
                                    ? data.selectedShade.map((shade: string) => {
                                        const found = data.shadeList.find((d: any) => d.shd_code === shade);
                                        return { value: shade, label: found ? found.shd_desc : shade };
                                    })
                                    : null
                            }
                            onChange={(selectedOptions: any) => {
                                if (selectedOptions?.some((option: any) => option.value === '')) {
                                    // If "ALL" is selected, clear out selectedShade
                                    setData((prev: any) => ({
                                        ...prev,
                                        selectedShade: [],
                                    }));
                                } else {
                                    setData((prev: any) => ({
                                        ...prev,
                                        selectedShade: selectedOptions ? selectedOptions.map((option: any) => option.value) : [],
                                    }));
                                }
                            }}
                        />
                    </div>

                    <div className="flex items-end space-x-2">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 space-x-2 rounded hover:bg-blue-600 text-sm flex items-center"
                            onClick={(e) => {
                                e.preventDefault();
                                GetSkuList();
                            }}>
                            <CiSearch /> <span>Search</span>
                        </button>
                    </div>

                </div>
            </div>



            {/* accordion view */}
            {/* <div className="space-y-2">
                {data.skuList.map((item: any) => (
                    <div key={item.sku} className="border rounded">
                        <button
                            className="w-full flex justify-between p-2 bg-gray-100"
                            onClick={() =>
                                setOpenSku(openSku === item.sku ? null : item.sku)
                            }
                        >
                            <span>({item.descr} - ({item.sku}))</span>
                            <span>{openSku === item.sku ? '−' : '+'}</span>
                        </button>
                        {openSku === item.sku && (
                            <ul className="p-2">
                                {Object.values(item.depotWiseList).map((d: any) => (
                                    <li key={d.depot} className="flex justify-between">
                                        <span>{d.depot}</span>
                                        <span>{d.regn}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div> */}

            <div className="space-y-2">
                {data.skuList.map((item: any) => (
                    <div key={item.sku} className="border rounded">
                        <button
                            className="w-full flex justify-between p-2 bg-gray-100"
                            onClick={() =>
                                setOpenSku(openSku === item.sku ? null : item.sku)
                            }
                        >
                            <span>({item.descr} - ({item.sku}))</span>
                            <span>{openSku === item.sku ? '−' : '+'}</span>
                        </button>
                        {openSku === item.sku && (
                            <div className="p-2">
                                {/* Header */}
                                <div className="grid grid-cols-5 gap-4 font-semibold border-b pb-1 mb-1">
                                    <span>Depot</span>
                                    <span className="text-center">On Hand</span>
                                    <span className="text-center">In Transit</span>
                                    <span className="text-center">Total</span>
                                    <span className="text-center">Pending Requisition</span>
                                </div>

                                {/* Rows */}
                                <ul>
                                    {Object.values(item.depotWiseList).map((d: any) => (
                                        <li key={d.depot} className="grid grid-cols-5 gap-4 py-1">
                                            <span>{d.depot}</span>
                                            <span className="text-center">{d.stk}</span>
                                            <span className="text-center">{d.sit}</span>
                                            <span className="text-center">{d.sit + d.stk}</span>
                                            <span className="text-center">{d.sir}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Total Row */}
                                <div className="grid grid-cols-5 gap-4 font-semibold border-t pt-1">
                                    <span>Total</span>
                                    <span className="text-center">
                                        {Object.values(item.depotWiseList).reduce((acc: number, d: any) => acc + d.stk, 0)}
                                    </span>
                                    <span className="text-center">
                                        {Object.values(item.depotWiseList).reduce((acc: number, d: any) => acc + d.sit, 0)}
                                    </span>
                                    <span className="text-center">
                                        {Object.values(item.depotWiseList).reduce((acc: number, d: any) => acc + d.sit + d.stk, 0)}
                                    </span>
                                    <span className="text-center">
                                        {Object.values(item.depotWiseList).reduce((acc: number, d: any) => acc + d.sir, 0)}
                                    </span>
                                </div>

                            </div>
                        )}
                    </div>
                ))}
            </div>



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
};

export default TransactStock;