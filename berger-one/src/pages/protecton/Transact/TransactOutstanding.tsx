import React, { useEffect, useRef, useState } from 'react'
import Select from 'react-select';
import OutstandingTableComponent from './Components/OutstandingTableComponent';
// import { GetSkuList } from '../../../services/api/protectonTransact/TransactStock';
import AsyncSelect from "react-select/async";
import { GetSKUList } from '../../../services/api/protectonEpca/EpcaDetails';
import AsyncSelectBox from './Components/AsyncSelectBox';
// import * as stock from '../../../services/api/protectonEpca/EpcaDetails';

const TransactOutstanding = () => {
    // const childRef = useRef<any>(null);
    const [asyncSelectBoxData, setAsyncSelectBoxData] = useState<any>({});
    // const [loading, setLoading] = useState(false);
    // const [selectedOption, setSelectedOption] = useState({});
    // const [selectedObj, setSelectedObj] = useState({});
    // const [asyncSelectData, setAsyncSelectData] = useState([]);

    // const loadOptions = async (inputValue: string) => {
    //     if (inputValue.length < 3) {
    //         return;
    //     }
    //     const payload: any = {
    //         app_id: 15,
    //         prefixText: inputValue
    //     }
    //     try {
    //         const response: any = await GetSKUList(payload);
    //         if (response.data) {
    //             setAsyncSelectData(response.data.table)
    //             return response.data.table.map((item: any) => ({
    //                 label: item.sku_desc,
    //                 value: item.sku_code,
    //             }));
    //         }
    //     } catch (error) {
    //         return;
    //     }
    // };



    useEffect(() => {
        console.log(asyncSelectBoxData)
    }, [asyncSelectBoxData])


    return (
        <>
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-1">
                <h5 className="text-lg font-semibold dark:text-white-light">Outstanding</h5>
            </div>

            <div className="bg-white rounded-lg px-4 py-2 shadow-md mb-2">
                <AsyncSelectBox setData={setAsyncSelectBoxData} api={GetSKUList} />
                {/* <AsyncSelect
                    cacheOptions
                    defaultOptions={false}
                    loadOptions={loadOptions}
                    placeholder="Type at least 3 letters to search..."
                    value={selectedOption}
                    onChange={(e: any) => {
                        setSelectedOption(e);
                        setSelectedObj(asyncSelectData.filter((s: any) => s?.sku_code === e?.value))
                    }}
                /> */}
                {/* <OutstandingTableComponent ref={childRef} tableData={tableData} settableData={settableData} setLoading={setLoading} /> */}
            </div>
        </>
    )
}

export default TransactOutstanding