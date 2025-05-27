import { UseAuthStore } from '../../../services/store/AuthStore';
import { useEffect, useMemo, useState } from 'react'
import * as Epca from '../../../services/api/protectonEpca/EpcaList';
import * as EpcaDetails from '../../../services/api/protectonEpca/EpcaDetails';
import Select from 'react-select';
import { GetProdDevImgRouteBuilder } from '../../../services/functions/getProdDevUrlBuilder';
import { NumberInput, TextInput } from '@mantine/core';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import moment from 'moment';
import { commonAlert } from '../../../services/functions/commonAlert';
import { commonSuccessToast } from '../../../services/functions/commonToast';
import { IoReturnUpBack } from "react-icons/io5";
import { MantineReactTable, type MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table';
import { useNavigate } from 'react-router-dom';

const EPCADetails = () => {
    const user = UseAuthStore((state: any) => state.userDetails);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [pageType, setPageType] = useState('');
    const [depot, setDepot] = useState<any>([]);
    const [applTerr, setApplTerr] = useState<any>([]);
    const [dealer, setDealer] = useState<any>([]);
    const [billTo, setBillTo] = useState<any>([]);
    const [project, setProject] = useState<any>([]);
    const [sku, setSKU] = useState<any>([]);
    const [factory, setFactory] = useState<any>([]);
    const [projectSrchData, setProjectSrchData] = useState<any>("");
    const [skuSrchData, setSkuSrchData] = useState<any>("");
    const [skuDetails, setSkuDetails] = useState<any>({
        sku_code: "",
        sku_desc: "",
        sku_uom: "",
        sku_pack_size: 0,
        sku_mrp: 0,
        rate: 0,
        nop: 0,
        validfrom: new Date().toLocaleDateString('en-GB'),
        validto: new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString('en-GB'),
        requiredForm: { org_code: '', org_name: '' },
        remarks: ""
    });
    const [ePCADetails, setePCADetails] = useState<any>({
        depot_code: "",
        depot_name: "",
        terr_code: "",
        terr_name: "",
        dealer_code: "",
        dealer_name: "",
        pdAppl: 'Y',
        bill_to: null,
        bill_to_name: "",
        projectId: null,
        projectName: "",
        sku_code: "",
        sku_desc: ""
    });
    const [data, setData] = useState<any>([]);

    const GetePCADetailsData = async (billtocode: any) => {
        //setLoading(true);
        const data: any = {
            billto_code: billtocode,
            aprv_status: '',
            main_status: '',
        };
        try {
            const response: any = await EpcaDetails.PcaDetailsGetDtl(data);
            setData(response?.data?.table || []);
        } catch (error) {
            console.log(error)
        }
        //setLoading(false);
    };

    const GetApplicableDepot = async () => {
        setLoading(true);
        const data: any = {
            user_id: user.user_id,
            region: '',
            app_id: '15',
        };
        try {
            const response: any = await Epca.GetApplicableDepotList(data);
            setDepot(response.data || []);
        } catch (error) {
            return;
        }
        setLoading(false);
    };

    const GetApplicableTerritory = async ({ depot_code }: any) => {
        setLoading(true);
        const data: any = {
            user_id: user.user_id,
            depot_code: depot_code,
            app_id: '15',
        };
        try {
            const response: any = await Epca.GetApplicableTerrList(data);
            setApplTerr(response.data || [])
        } catch (error) {
            return;
        }
        setLoading(false);
    };

    const GetDealerList = async ({ depot_code, terr_code }: any) => {
        setLoading(true);
        const data: any = {
            depot_code: depot_code,
            terr_code: terr_code,
            sbl_code: '4',
        };
        try {
            const response: any = await EpcaDetails.GetPcaDealersList(data);
            setDealer(response.data || [])
        } catch (error) {
            return;
        }
        setLoading(false);
    };

    const GetApplicableBillto = async ({ depot_code, terr_code, dealer_code }: any) => {
        setLoading(true);
        const data: any = {
            depot_code: depot_code,
            terr_code: terr_code,
            dealer_code: dealer_code,
        };
        try {
            const response: any = await EpcaDetails.GetPcaBillToList(data);
            setBillTo(response.data || [])
        } catch (error) {
            return;
        }
        setLoading(false);
    };

    const GetApplicableProjectList = async ({ billto_code, srch_str }: any) => {
        setLoading(true);
        const data: any = {
            app_id: 15,
            billto_code: billto_code,
            srch_str: srch_str
        };
        try {
            const response: any = await EpcaDetails.GetProjectList(data);
            setProject(response.data.table || [])
        } catch (error) {
            console.log(error)
        }
        setProjectSrchData('')
        setLoading(false);
    };

    const GetSkuData = async ({ PrefixText }: any) => {
        setLoading(true);
        const data: any = {
            app_id: 15,
            PrefixText: PrefixText
        };
        try {
            const response: any = await EpcaDetails.GetSKUList(data);
            setSKU(response.data.table || [])
        } catch (error) {
            console.log(error)
        }
        setSkuSrchData('')
        setLoading(false);
    };

    const GetFactorydata = async ({ sku_code }: any) => {
        setLoading(true);
        const data: any = {
            app_id: 15,
            sku_code: sku_code
        };
        try {
            const response: any = await EpcaDetails.GetFactoryListBySKU(data);
            setFactory(response.data || [])
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    };

    const convertToDate = (dateStr: any) => {
        if (typeof dateStr === 'string') {
            const [day, month, year] = dateStr.split('/');
            return new Date(`${year}-${month}-${day}`);
        }
        return dateStr;
    };

    const getMaxValidTillDate = (validFrom: any) => {
        if (!validFrom) return undefined;
        const fromDate = convertToDate(skuDetails.validfrom);
        return new Date(fromDate.setMonth(fromDate.getMonth() + 3));
    };

    // Calculate the maxDate for the "Valid Till" field based on the "Valid From" date
    const getMinValidTillDate = (validFrom: any) => {
        if (!validFrom) return undefined;
        const fromDate = convertToDate(skuDetails.validfrom);
        return new Date(fromDate.setMonth(fromDate.getMonth()));
    };

    const formatDateToString = (date: any) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const isFormValid = () => {
        if (skuDetails.validto && skuDetails.rate && skuDetails.nop) {
            if (billTo.find((p: any) => p.bill_to === ePCADetails?.bill_to)?.project_appl_yn === 'Y' && ePCADetails.projectId === null) {
                return false
            } else return true
        } else return false
    };

    const handleSubmit = async () => {
        let submitObj: any = {
            auto_id: 0,
            billto_code: ePCADetails.bill_to,
            sku_id: skuDetails.sku_code,
            factory: skuDetails.requiredForm.org_code,
            rate: parseInt(skuDetails.rate),
            qty: parseInt(skuDetails.nop),
            valid_from: moment(skuDetails.validfrom, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            valid_till: moment(skuDetails.validto, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            status: 'PENDING_DEPOT',
            remarks: skuDetails.remarks,
            app_name: 'PROTECTON',
            user_id: user.user_id,
            mrp: skuDetails.sku_mrp,
            project_appl_yn: billTo.find((p: any) => p.bill_to === ePCADetails?.bill_to)?.project_appl_yn,
            end_client_name: '',
            project_name: ePCADetails.projectName,
            projectid: ePCADetails.projectId,
            project_type: 'EXISTING',
        };

        commonAlert('Are you want to insert the PCA Info?', '', 'warning').then(async (result: any) => {
            if (result.value) {
                const response: any = await EpcaDetails.InsertePcaDetails_Vr1(submitObj);
                if (response.response_message) {
                    commonSuccessToast('PCA Details Inserted Successfully');
                    navigate('/Protecton/ePCA/EPCAList/');
                }
            }
        });

        // showSubmitAlert(submitObj);
    };

    const handleBackButton = () => {
        commonAlert('Are you sure?', '', 'warning').then(async (result: any) => {
            if (result.value) {
                navigate('/Protecton/ePCA/EPCAList/');
            }
        });
    };

    const handleDelete = (rowData: any) => {
        DeletePca(rowData.pd_auto_id);
    };

    async function DeletePca(autoId: any) {
        //setLoading(true);
        commonAlert('Are you sure you want to delete this item?', '', 'warning').then(async (result: any) => {
            if (result.value) {
                const response: any = await EpcaDetails.DeletePcaDetails({ auto_id: autoId });

                if (response.response_message) {
                    commonSuccessToast('PCA Details Deleted Successfully');
                    navigate('/Protecton/ePCA/EPCAList/');
                }
            }
        });
        // setLoading(false);
    }

    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'sku_id',
                header: 'SKU Code',
                size: 60,
            },
            {
                accessorKey: 'sku_desc',
                header: 'SKU Name',
                size: 75,
            },
            {
                accessorKey: 'sku_uom',
                header: 'UOM',
                size: 50,
            },
            {
                accessorKey: 'sku_pack_size',
                header: 'Pack Size',
                size: 50,
            },
            {
                accessorKey: 'pd_mrp',
                header: 'Declared PCA(Lt/Kg)',
                size: 50,
            },
            {
                accessorKey: 'rate',
                header: 'Rate(Lt/Kg)',
                size: 50,
            },
            {
                accessorKey: 'qty',
                header: 'NOP(Lt/Kg)',
                size: 50,
            },
            {
                accessorKey: 'valid_from',
                header: 'Valid From',
                size: 50,
            },
            {
                accessorKey: 'valid_till',
                header: 'Valid Till',
                size: 50,
            },
            {
                accessorKey: 'factory',
                header: 'Required From',
                size: 50,
            },
            {
                accessorKey: 'status_value',
                header: 'Status',
                size: 50,
            },
            {
                accessorKey: 'remarks',
                header: 'Remarks',
                size: 50,
            },
            {
                id: 'action',
                header: 'Action',
                size: 50,
                Cell: ({ row }) => {
                    // console.log(billToData[selectedDropdown.BilltoCode].project_appl_yn, projectSearchValue)
                    // var isDisabled = true;
                    // const disFunc = () => {
                    //     if (billToData[selectedDropdown.BilltoCode].project_appl_yn === "Y" && projectSearchValue === "") 

                    // }
                    const isDisabled = row.original.status_code === 'PENDING_DEPOT';
                    return (
                        isDisabled && (
                            <button
                                // disabled={billToData[selectedDropdown.BilltoCode].project_appl_yn === "Y" && projectSearchValue === "" ? true : false}
                                style={{
                                    padding: '4px 8px',
                                    backgroundColor: '#f44336',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleDelete(row.original)}
                            >
                                Delete
                            </button>
                        )
                    );
                },
            }

        ],
        []
    );
    const table = useMantineReactTable({
        columns,
        data,
        enableColumnResizing: true,
        enableTopToolbar: false,
        enableSorting: false,
        enableColumnActions: false,
        columnResizeMode: 'onChange',
        mantineTableContainerProps: {
            style: {
                overflowX: 'hidden',
            },
        },
        // defaultColumn: { minSize: 50, maxSize: 500 },
        // mantineTableHeadCellProps: {
        //     style: {
        //         whiteSpace: 'normal',       // allow wrapping
        //         overflow: 'visible',        // don't clip text
        //         textOverflow: 'initial',    // allow full text
        //     },
        // }
    });

    // useEffect(() => {
    //     console.log(skuDetails)
    // }, [skuDetails])
    // useEffect(() => {
    //     console.log(ePCADetails)
    // }, [ePCADetails])

    useEffect(() => {
        projectSrchData.length > 2 && GetApplicableProjectList({ billto_code: ePCADetails?.bill_to, srch_str: projectSrchData })
    }, [projectSrchData])

    useEffect(() => {
        skuSrchData.length > 2 && GetSkuData({ PrefixText: skuSrchData })
    }, [skuSrchData])


    useEffect(() => {
        GetApplicableDepot();
        const entryType: any = (sessionStorage.getItem('epcaDtlListEntryType'));
        setPageType(JSON.parse(entryType))
        if (JSON.parse(entryType) === 'View') {
            const value: any = (sessionStorage.getItem('epcaDtlList'));
            const parsedValue = JSON.parse(value);
            if (parsedValue) {
                // console.log(parsedValue)
                GetePCADetailsData(parsedValue.dlr_bill_to);
                GetApplicableTerritory({ depot_code: parsedValue.depot_code })
                GetDealerList({ depot_code: parsedValue.depot_code, terr_code: parsedValue.dlr_terr_code })
                GetApplicableBillto({ depot_code: parsedValue.depot_code, terr_code: parsedValue.dlr_terr_code, dealer_code: parsedValue.dlr_dealer_code })
                setePCADetails((pre: any) => ({
                    ...pre,
                    depot_code: parsedValue.depot_code,
                    depot_name: parsedValue.depot_name,
                    dealer_code: parsedValue.dlr_dealer_code,
                    dealer_name: parsedValue.dlr_dealer_name,
                    pdAppl: parsedValue.pd_appl_yn,
                }))
            }
        }
    }, [])

    useEffect(() => {
        const entryType: any = (sessionStorage.getItem('epcaDtlListEntryType'));
        if (JSON.parse(entryType) === 'View') {
            const value: any = (sessionStorage.getItem('epcaDtlList'));
            const parsedValue = JSON.parse(value);
            parsedValue && setePCADetails((pre: any) => ({
                ...pre,
                terr_code: parsedValue.dlr_terr_code,
                terr_name: applTerr.find((terr: any) => terr.terr_code === parsedValue.dlr_terr_code)?.terr_name,
                bill_to: parsedValue.dlr_bill_to,
                bill_to_name: billTo.find((terr: any) => terr.bill_to === parsedValue.dlr_bill_to)?.bill_to_name,
            }))
        }
    }, [applTerr, billTo])

    return (
        <>
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-2">
                <h5 className="text-lg font-semibold dark:text-white-light">e-PCA Details</h5>
            </div>

            <div className="panel mb-2">
                <form className=" border-1 space-y-5">
                    <div className="grid md:grid-cols-7 gap-2">
                        <div className="col-span-1">
                            <label className="formLabel">Depot:</label>
                            <Select
                                className="text-sm"
                                isSearchable={true}
                                value={{ value: ePCADetails?.depot_code, label: ePCADetails?.depot_name }}
                                options={depot.map((d: any) => ({ value: d.depot_code, label: d.depot_name }))}
                                isDisabled={pageType === 'View'}
                                onChange={(event) => {
                                    GetApplicableTerritory({ depot_code: event?.value });
                                    setePCADetails((pre: any) => ({
                                        ...pre, depot_code: event?.value,
                                        depot_name: event?.label,
                                        terr_code: '',
                                        terr_name: '',
                                        dealer_code: "",
                                        dealer_name: "",
                                        bill_to: null,
                                        bill_to_name: "",
                                    }))
                                }}
                            />
                            {/* {errMsg && errMsg.depot ? <div className="mt-1 text-danger">{errMsg.depot}</div> : ''} */}
                        </div>
                        <div className="col-span-1">
                            <label className="formLabel">Territory:</label>
                            <Select
                                className="text-sm"
                                isSearchable={true}
                                value={{ value: ePCADetails?.terr_code, label: ePCADetails?.terr_name }}
                                options={applTerr.map((d: any) => ({ value: d.terr_code, label: d.terr_name }))}
                                isDisabled={pageType === 'View'}
                                onChange={(event) => {
                                    GetDealerList({ depot_code: ePCADetails?.depot_code, terr_code: event?.value })
                                    setePCADetails((pre: any) => ({ ...pre, terr_code: event?.value, terr_name: event?.label, dealer_code: '', dealer_name: '', bill_to: null, bill_to_name: "", }))
                                }}
                            />
                            {/* {errMsg && errMsg.terr ? <div className="mt-1 text-danger">{errMsg.terr}</div> : ''} */}
                        </div>
                        <div className="col-span-1">
                            <label className="formLabel">Customer:</label>
                            <Select
                                className="text-sm"
                                isSearchable={true}
                                value={{ value: ePCADetails?.dealer_code, label: ePCADetails?.dealer_name }}
                                options={dealer.map((d: any) => ({ value: d.dealer_code, label: d.dealer_name }))}
                                isDisabled={pageType === 'View'}
                                onChange={(event) => {
                                    GetApplicableBillto({ depot_code: ePCADetails?.depot_code, terr_code: ePCADetails?.terr_code, dealer_code: event?.value })
                                    setePCADetails((pre: any) => ({ ...pre, dealer_code: event?.value, dealer_name: event?.label, bill_to: null, bill_to_name: "" }))
                                }}
                            />
                            {/* {errMsg && errMsg.dealer ? <div className="mt-1 text-danger">{errMsg.dealer}</div> : ''} */}
                        </div>
                        <div className="col-span-1">
                            <label className="formLabel">PD Applicable:</label>
                            <div className="mt-2 flex">
                                <label className="relative h-6 w-12">
                                    <input
                                        type="checkbox"
                                        className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                                        id="custom_switch_checkbox1"
                                        checked={ePCADetails.pdAppl === 'Y' ? true : false}
                                        disabled={pageType === 'View'}
                                        onChange={(event) => {
                                            setePCADetails((pre: any) => ({ ...pre, pdAppl: event?.target?.checked ? 'Y' : 'N' }))
                                        }}
                                    />
                                    <span
                                        className={`outline_checkbox bg-icon block h-full rounded-full border-2 border-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-[#ebedf2] before:bg-[url(${GetProdDevImgRouteBuilder(
                                            '/assets/images/close.svg'
                                        )})] before:bg-center before:bg-no-repeat before:transition-all before:duration-300 peer-checked:border-primary peer-checked:before:left-7 peer-checked:before:bg-primary peer-checked:before:bg-[url(${GetProdDevImgRouteBuilder(
                                            '/assets/images/checked.svg'
                                        )})] dark:border-white-dark dark:before:bg-white-dark`}
                                    ></span>
                                </label>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <label className="formLabel">Bill To:</label>
                            <Select
                                className="text-sm"
                                isSearchable={true}
                                value={{ value: ePCADetails?.bill_to, label: ePCADetails?.bill_to_name }}
                                options={billTo.filter((b: any) => b.pd_appl_yn === ePCADetails?.pdAppl).map((d: any) => ({ value: d.bill_to, label: d.bill_to_name }))}
                                isDisabled={pageType === 'View'}
                                onChange={(event) => {
                                    setePCADetails((pre: any) => ({ ...pre, bill_to: event?.value, bill_to_name: event?.label }))
                                }}
                            />
                            {/* {errMsg && errMsg.billto ? <div className="mt-1 text-danger">{errMsg.billto}</div> : ''} */}
                        </div>
                        <div className="col-span-1">
                            <label className="formLabel">
                                Project Search:
                                {billTo.find((p: any) => p.bill_to === ePCADetails?.bill_to)?.project_appl_yn === 'Y' && <span className="text-red-500"> *</span>}
                            </label>
                            <Select
                                className="text-sm"
                                // isSearchable={true}
                                value={{ value: ePCADetails?.projectId, label: ePCADetails?.projectName }}
                                options={project.map((d: any) => ({ value: d.projectId, label: d.projectName }))}
                                isDisabled={pageType === 'View'}
                                onInputChange={(inputValue) => setProjectSrchData(inputValue)}
                                onChange={(event) => {
                                    setePCADetails((pre: any) => ({ ...pre, projectId: event?.value, projectName: event?.label }))
                                }}
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="formLabel">Search SKU:</label>
                            <Select
                                className="text-sm"
                                // isSearchable={true}
                                value={{ value: ePCADetails?.sku_code, label: ePCADetails?.sku_desc }}
                                options={sku.map((d: any) => ({ value: d.sku_code, label: d.sku_desc }))}
                                isDisabled={pageType === 'View'}
                                onInputChange={(inputValue) => setSkuSrchData(inputValue)}
                                onChange={(event) => {
                                    GetFactorydata({ sku_code: event?.value })
                                    setePCADetails((pre: any) => ({ ...pre, sku_code: event?.value, sku_desc: event?.label }))
                                    setSkuDetails((pre: any) => ({ ...pre, ...sku.find((s: any) => s.sku_code === event?.value) }))
                                }}
                            />
                        </div>
                    </div>
                </form>
                {pageType == "New" &&
                    <div className="mt-5">
                        <div className="table-responsive h200">
                            <table className="custTableView w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th style={{ width: '10%', textAlign: 'left' }}>SKU Code</th>
                                        <th style={{ width: '14%', textAlign: 'left' }}>SKU Name</th>
                                        <th style={{ width: '5%', textAlign: 'center' }}>UOM</th>
                                        <th style={{ width: '5%', textAlign: 'center' }}>Pack Size</th>
                                        <th style={{ width: '8%', textAlign: 'center' }}>Declared PCA (Lt/Kg)</th>
                                        <th style={{ width: '7%', textAlign: 'center' }}>Rate (Lt/Kg)</th>
                                        <th style={{ width: '5%', textAlign: 'center' }}>NOP</th>
                                        <th style={{ width: '8%', textAlign: 'center' }}>Valid From</th>
                                        <th style={{ width: '8%', textAlign: 'center' }}>Valid Till</th>
                                        <th style={{ width: '10%', textAlign: 'center' }}>Required From</th>
                                        <th style={{ width: '14%', textAlign: 'center' }}>Remarks</th>
                                        <th style={{ width: '6%', textAlign: 'center' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ textAlign: 'left' }}>{skuDetails.sku_code}</td>
                                        <td style={{ textAlign: 'left' }}>{skuDetails.sku_desc}</td>
                                        <td style={{ textAlign: 'center' }}>{skuDetails.sku_uom}</td>
                                        <td style={{ textAlign: 'center' }}>{skuDetails.sku_pack_size}</td>
                                        <td style={{ textAlign: 'center' }}>{skuDetails.sku_mrp}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <NumberInput
                                                style={{ width: '75px' }}
                                                id="txtRate"
                                                name="rate"
                                                value={skuDetails?.rate}
                                                autoComplete="off"
                                                onChange={(e) => setSkuDetails((pre: any) => ({ ...pre, rate: e }))}
                                                placeholder="Rate"
                                            />
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <NumberInput
                                                style={{ width: '55px' }}
                                                name="nop"
                                                value={skuDetails?.nop}
                                                autoComplete="off"
                                                onChange={(e) => setSkuDetails((pre: any) => ({ ...pre, nop: e }))}
                                                placeholder="NOP"
                                            />
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <Flatpickr
                                                name="validfrom"
                                                value={convertToDate(skuDetails.validfrom)}
                                                autoComplete="off"
                                                options={{
                                                    dateFormat: 'Y-m-d', // Actual input value format (ISO format)
                                                    altInput: true, // Enables alternative display input
                                                    altFormat: 'd/m/Y', // Display format for the user
                                                }}
                                                placeholder="Valid From"
                                                disabled={true}
                                                className="tableInput" // Disable the Valid From field
                                            />
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <Flatpickr
                                                name="validto"
                                                value={convertToDate(skuDetails.validto)}
                                                // autoComplete="off"
                                                options={{
                                                    dateFormat: 'Y-m-d', // Actual input value format (ISO format)
                                                    altInput: true, // Enables alternative display input
                                                    altFormat: 'd/m/Y', // Display format for the user
                                                    minDate: getMinValidTillDate(skuDetails.validfrom),
                                                    maxDate: getMaxValidTillDate(skuDetails.validfrom),
                                                }}
                                                placeholder="Valid To"
                                                className="tableInput"
                                                onChange={(e) => setSkuDetails((pre: any) => ({ ...pre, validto: formatDateToString(e[0]) }))}
                                            />
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <Select
                                                name="requiredForm"
                                                className="innerTableSelectWt"
                                                isSearchable={true}
                                                value={{ value: skuDetails?.requiredForm?.org_code, label: skuDetails?.requiredForm?.org_name }}
                                                options={factory.map((d: any) => ({ value: d.org_code, label: d.org_name }))}
                                                onChange={(event) => {
                                                    setSkuDetails((pre: any) => ({ ...pre, requiredForm: { org_code: event?.value, org_name: event?.label } }))
                                                }}
                                            />
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <TextInput style={{ width: '100%' }} name="remarks" value={skuDetails.remarks} autoComplete="off" onChange={(e) => setSkuDetails((pre: any) => ({ ...pre, remarks: e.target.value }))} placeholder="Enter data" />
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <button
                                                className={`${isFormValid() ? 'cursor-pointer bg-blue-500 hover:bg-blue-700' : 'cursor-not-allowed bg-gray-300'
                                                    } relative rounded border border-gray-400 px-4 py-2 font-semibold text-white shadow`}
                                                disabled={!isFormValid()}
                                                onClick={() => {
                                                    handleSubmit();
                                                }}
                                            >Add</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>

            {/* {pageType == 'View' && <div className="mb-2 max-h-[45vh]">{data.length > 0 && <MantineReactTable table={table} />}</div>} */}
            {pageType == 'View' && <div className="mb-2" style={{ maxHeight: '45vh', overflowY: 'auto' }}>{data.length > 0 && <MantineReactTable table={table} />}</div>}

            <div className="flex items-center justify-center gap-1 pb-2">
                <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm flex items-center"
                    onClick={() => {
                        handleBackButton();
                    }}
                >
                    <IoReturnUpBack /> &nbsp; Back
                </button>
            </div>
        </>
    )
}

export default EPCADetails