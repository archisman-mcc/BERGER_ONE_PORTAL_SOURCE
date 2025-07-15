import React, { useEffect, useRef, useState } from 'react';
import OutstandingTableComponent from './Components/OutstandingTableComponent';
import { UserApplDlrOSDtls, UserApplDlrOSSingle, UserApplDlrOSTrx } from '../../../services/api/protectonTransact/TransactOutstanding';
import ModalComponent from './Components/ModalComponent';
import OutstandingTableComponent_single from './Components/OutstandingTableComponent_single';

const TransactOutstanding = () => {
    const [loading, setLoading] = useState(false);

    const [tableData, settableData] = useState<any>([]);

    const [slab, setSlab] = useState<any>(null);
    const [terr_code, setTerr_code] = useState<any>(null);
    const [dtrng, setdtrng] = useState<any>(null);

    const [territoryModalTableData, setTerritoryModalTableData] = useState<any>([]);
    const [categoryModalTableData, setCategoryModalTableData] = useState<any>([]);
    const [contractorDealerModalTableData, setContractorDealerModalTableData] = useState<any>([]);

    const [isTerritoryModalOpen, setIsTerritoryModalOpen] = useState<Boolean>(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<Boolean>(false);
    const [isContractorDealerModalOpen, setIsContractorDealerModalOpen] = useState<Boolean>(false);

    const [territoryModalTableData_single, setTerritoryModalTableData_single] = useState<any>([]);
    const [categoryModalTableData_single, setCategoryModalTableData_single] = useState<any>([]);
    const [contractorDealerModalTableData_single, setContractorDealerModalTableData_single] = useState<any>([]);
    const [invoiceModalTableData_trx, setInvoiceModalTableData_trx] = useState<any>([]);

    const [isTerritoryModalOpen_single, setIsTerritoryModalOpen_single] = useState<Boolean>(false);
    const [isCategoryModalOpen_single, setIsCategoryModalOpen_single] = useState<Boolean>(false);
    const [isContractorDealerModalOpen_single, setIsContractorDealerModalOpen_single] = useState<Boolean>(false);
    const [isInvoiceModalOpen_trx, setIsInvoiceModalOpen_trx] = useState<Boolean>(false);

    const getUserApplDlrOSDtls = async (props: any) => {
        setLoading(true);
        const data: any = {
            app_id: 15,
            ...props
        };
        try {
            const response: any = await UserApplDlrOSDtls(data);
            const dataMaker = async (index: any, region: any, terr: any, dlr: any) => {
                // console.log(terr)
                const gross: any = [];
                const net: any = [];
                const odos: any = [];
                const age: any = [
                    { age: '0-30' },
                    { age: '31-60' },
                    { age: '61-90' },
                    { age: '91-120' },
                    { age: '121-150' },
                    { age: '151-180' },
                    { age: '181-360' },
                    { age: '361-720' },
                    { age: '720' },
                    { age: 'TOTAL' },
                    { age: '' },
                    { age: '>120' },
                    { age: '>180' },
                ];

                Object.keys(response.data.table[index]).map((key) => key.substr(0, 1) === 'g' ? gross.push({ gross: response.data.table[index][key] }) : key.substr(0, 1) === 'n' ? net.push({ net: response.data.table[index][key] }) : key.substr(0, 1) === 'o' && odos.push({ odos: response.data.table[index][key] }))

                const merged: any = [];
                let sData: any = {};
                gross.map((item: any, index: any) => {
                    if (index === 9) {
                        sData = {
                            ...item,
                            ...net[index],
                            ...odos[index],
                            ...age[index],
                            // ...{ variance: ((net[index].net - item?.gross) / item?.gross) * 100 },
                            ...{ variance: item?.gross === 0 ? 0 : +(((net[index].net - item?.gross) / item?.gross) * 100).toFixed(2) },
                            ...{ regn: region },
                            ...{ index: index + 1 },
                            ...{ terr_code: terr },
                            ...{ dlrCode: dlr }
                        }
                    }
                    else if (index !== 10)
                        merged.push({
                            ...item,
                            ...net[index],
                            ...odos[index],
                            ...age[index],
                            // ...{ variance: ((net[index].net - item?.gross) / item?.gross) * 100 },
                            ...{ variance: item?.gross === 0 ? 0 : +(((net[index].net - item?.gross) / item?.gross) * 100).toFixed(2) },
                            ...{ regn: region },
                            ...{ index: index + 1 },
                            ...{ terr_code: terr },
                            ...{ dlrCode: dlr }
                        })
                });

                return [...merged, sData]
            }
            const getFinalData = async () => {
                const promises = response.data.table.map((res: any, index: any) =>
                    dataMaker(index, res.regn, res.terr_code, res?.dlr_dealer_code).then((tableData) => (
                        props?.report_grp_level === "REGION" ? { date: res?.asOn, regn: res.regn, tableData } :
                            props?.report_grp_level === "TERR" ? { date: res?.asOn, regn: res.regn, terr_code: res.terr_code, terr_name: res.terr_name, tableData } :
                                props?.report_grp_level === "CAT_SMRY" ? { date: res?.asOn, cat_cust_desc: res.cat_cust_desc, tableData } :
                                    props?.report_grp_level === "CATEGORY" ? { date: res?.asOn, regn: res.regn, terr_code: res.terr_code, terr_name: res.terr_name, cat_cust_desc: res.cat_cust_desc, tableData } :
                                        props?.report_grp_level === "DLR" && { date: res?.asOn, regn: res.regn, terr_code: res.terr_code, terr_name: res.terr_name, cat_cust_desc: res.cat_cust_desc, dealer: res.dealer, tableData }
                    ))
                );
                const manipulatedData = await Promise.all(promises);
                return manipulatedData;
            };
            getFinalData().then((getData) => {
                props?.report_grp_level === "REGION" ? settableData(getData) :
                    props?.report_grp_level === "TERR" ? setTerritoryModalTableData(getData) :
                        props?.report_grp_level === "CAT_SMRY" ? setTerritoryModalTableData(getData) :
                            props?.report_grp_level === "CATEGORY" ? setCategoryModalTableData(getData) :
                                props?.report_grp_level === "DLR" && setContractorDealerModalTableData(getData)
            });
        } catch (error) {
            return;
        }
        setLoading(false);
    }

    const getUserApplDlrOSSingle = async (props: any) => {
        setLoading(true);
        const data: any = {
            app_id: 15,
            ...props
        };
        try {
            const response: any = await UserApplDlrOSSingle(data);
            // ...{ variance: item?.gross === 0 ? 0 : +(((net[index].net - item?.gross) / item?.gross) * 100).toFixed(2)},
            if (response.data) {
                const resData = response.data.table.map((t: any) => ({ ...t, terr_code: t?.terr_code, variance: t?.gross === 0 ? 0 : +(((t?.net - t?.gross) / t?.gross) * 100).toFixed(2) }));
                if (props?.report_grp_level === "TERR") {
                    setTerritoryModalTableData_single([...resData])
                } else if (props?.report_grp_level === "CAT_SMRY") {
                    setTerritoryModalTableData_single([...resData])
                } else if (props?.report_grp_level === "CATEGORY") {
                    setCategoryModalTableData_single([...resData])
                } else if (props?.report_grp_level === "DLR") {
                    setContractorDealerModalTableData_single([...resData])
                }
            }
        } catch (error) {
            return;
        }
        setLoading(false);
    }

    const getUserApplDlrOSTrx = async (props: any) => {
        setLoading(true);
        const data: any = {
            app_id: 15,
            ...props
        };
        try {
            const response: any = await UserApplDlrOSTrx(data);
            if (response.data) {
                const resData = response.data.table.map((t: any) => ({ ...t, variance: ((t?.net - t?.gross) / t?.gross) * 100 }));
                setInvoiceModalTableData_trx([...resData])
            }
        } catch (error) {
            return;
        }
        setLoading(false);
    }

    const onCloseTerritoryModal = () => setIsTerritoryModalOpen(false)
    const onCloseCategoryModal = () => setIsCategoryModalOpen(false)
    const onCloseContractorModal = () => setIsContractorDealerModalOpen(false)

    const onCloseTerritoryModal_single = () => setIsTerritoryModalOpen_single(false)
    const onCloseCategoryModal_single = () => setIsCategoryModalOpen_single(false)
    const onCloseContractorDealerModal_single = () => setIsContractorDealerModalOpen_single(false)
    const onCloseInvoiceModal_trx = () => setIsInvoiceModalOpen_trx(false)

    useEffect(() => {
        getUserApplDlrOSDtls({
            report_grp_level: "REGION",
            regn: "",
            terr: "",
            cat: ""
        })
    }, [])

    useEffect(() => {
        console.log(categoryModalTableData_single)
    }, [categoryModalTableData_single])
    // useEffect(() => {
    //     console.log(tableData)
    // }, [tableData])
    useEffect(() => {
        console.log(terr_code)
    }, [terr_code])

    return (
        <>
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-1">
                <h5 className="text-lg font-semibold dark:text-white-light">Outstanding</h5>
            </div>

            <div className="bg-white rounded-lg px-4 py-2 shadow-md mb-2">
                <OutstandingTableComponent tableType="regn" tableData={tableData} modalOpen={setIsTerritoryModalOpen} api={getUserApplDlrOSDtls} api1={getUserApplDlrOSSingle} modalOpen_single={setIsTerritoryModalOpen_single} setSlab={setSlab} setTerr_code={setTerr_code} />
            </div>

            {/* Territory Modal */}
            {isTerritoryModalOpen && (
                <ModalComponent modalHeader={territoryModalTableData[0]?.cat_cust_desc ? 'Category Summary' : 'Territory Level'} date={`As On Date: ${territoryModalTableData[0]?.date}`} tableName={territoryModalTableData[0]?.regn ? `Selected Region: ${territoryModalTableData[0]?.regn || "-"}` : ''} onCloseModal={onCloseTerritoryModal} >
                    <OutstandingTableComponent tableType={territoryModalTableData[0]?.cat_cust_desc ? 'cat_cust_desct' : "terr_name"} tableData={territoryModalTableData} modalOpen={setIsCategoryModalOpen} api={getUserApplDlrOSDtls} api1={getUserApplDlrOSSingle} modalOpen_single={setIsCategoryModalOpen_single} setSlab={setSlab} setTerr_code={setTerr_code} />
                </ModalComponent>
            )}

            {/* Territory Modal _single */}
            {isTerritoryModalOpen_single && (
                <ModalComponent modalHeader='Territory Level' date={`As On Date: ${territoryModalTableData_single[0]?.asOn}`} tableName={`Age: ${territoryModalTableData_single[0]?.dtrange || "-"}`} onCloseModal={onCloseTerritoryModal_single} >
                    <OutstandingTableComponent_single tableType="terr_name" tableData={territoryModalTableData_single} modalOpen={setIsCategoryModalOpen_single} api={getUserApplDlrOSSingle} slab={slab} terr_code={terr_code} setSlab={setSlab} setTerr_code={setTerr_code} setdtrng={setdtrng} />
                </ModalComponent>
            )}

            {/* Category Modal */}
            {isCategoryModalOpen && (
                <ModalComponent modalHeader='Category Level' date={`As On Date: ${categoryModalTableData[0]?.date}`} tableName={`${categoryModalTableData[0]?.regn || "-"} > ${categoryModalTableData[0]?.terr_name || "-"}`} onCloseModal={onCloseCategoryModal} >
                    <OutstandingTableComponent tableType="cat_cust_desc" tableData={categoryModalTableData} modalOpen={setIsContractorDealerModalOpen} api={getUserApplDlrOSDtls} api1={getUserApplDlrOSSingle} modalOpen_single={setIsContractorDealerModalOpen_single} setSlab={setSlab} setTerr_code={setTerr_code} />
                </ModalComponent>
            )}

            {/* Category Modal _single */}
            {isCategoryModalOpen_single && (
                <ModalComponent modalHeader='Category Level' date={`As On Date: ${categoryModalTableData_single[0]?.asOn}`} tableName={`Age: ${categoryModalTableData_single[0]?.dtrange || "-"}`} onCloseModal={onCloseCategoryModal_single} >
                    <OutstandingTableComponent_single tableType="cat_cust_desc" tableData={categoryModalTableData_single} modalOpen={setIsContractorDealerModalOpen_single} api={getUserApplDlrOSSingle} slab={slab} terr_code={terr_code} setSlab={setSlab} setTerr_code={setTerr_code} setdtrng={setdtrng} />
                </ModalComponent>
            )}

            {/* dealer Modal */}
            {isContractorDealerModalOpen && (
                <ModalComponent modalHeader='Contractor Level' date={`As On Date: ${contractorDealerModalTableData[0]?.date}`} tableName={`${contractorDealerModalTableData[0]?.regn || "-"} > ${contractorDealerModalTableData[0]?.terr_name || "-"} >  ${contractorDealerModalTableData[0]?.cat_cust_desc || "-"}`} onCloseModal={onCloseContractorModal} >
                    <OutstandingTableComponent tableType="dealer" tableData={contractorDealerModalTableData} modalOpen={null} api={null} api1={getUserApplDlrOSTrx} modalOpen_single={setIsInvoiceModalOpen_trx} setSlab={setSlab} setTerr_code={setTerr_code} />
                </ModalComponent>
            )}

            {/* Contractor-dealer Modal _single */}
            {isContractorDealerModalOpen_single && (
                <ModalComponent modalHeader='Contractor Level' date={`As On Date: ${contractorDealerModalTableData_single[0]?.asOn}`} tableName={`Age: ${contractorDealerModalTableData_single[0]?.dtrange || "-"}`} onCloseModal={onCloseContractorDealerModal_single} >
                    <OutstandingTableComponent_single tableType="dealer" tableData={contractorDealerModalTableData_single} modalOpen={setIsInvoiceModalOpen_trx} api={getUserApplDlrOSTrx} slab={slab} terr_code={terr_code} setSlab={setSlab} setTerr_code={setTerr_code} setdtrng={setdtrng}  />
                </ModalComponent>
            )}

            {/* Invoice Modal _single */}
            {isInvoiceModalOpen_trx && (
                <ModalComponent modalHeader='Invoice Level' date={`As On Date: ${invoiceModalTableData_trx[0]?.asOn}`} tableName={`Age: ${dtrng || "-"}`} onCloseModal={onCloseInvoiceModal_trx} >
                    <OutstandingTableComponent_single tableType="invoice" tableData={invoiceModalTableData_trx} modalOpen={null} api={null} slab={slab} terr_code={terr_code} />
                </ModalComponent>
            )}

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
    )
}

export default TransactOutstanding