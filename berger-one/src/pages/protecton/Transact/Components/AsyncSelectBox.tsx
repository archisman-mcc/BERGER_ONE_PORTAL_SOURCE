import { useState } from "react";
import AsyncSelect from "react-select/async";

const AsyncSelectBox = ({ api, setData }: any) => {
    const [selectedOption, setSelectedOption] = useState({});
    const [asyncSelectData, setAsyncSelectData] = useState([]);

    const loadOptions = async (inputValue: string) => {
        if (inputValue.length < 3) {
            return;
        }
        const payload: any = {
            app_id: 15,
            prefixText: inputValue
        }
        try {
            const response: any = await api(payload);
            if (response.data) {
                setAsyncSelectData(response.data.table)
                return response.data.table.map((item: any) => ({
                    label: item.sku_desc,
                    value: item.sku_code,
                }));
            }
        } catch (error) {
            return;
        }
    };

    return (
        <>
            <AsyncSelect
                cacheOptions
                defaultOptions={false}
                loadOptions={loadOptions}
                placeholder="Type at least 3 letters to search..."
                value={selectedOption}
                onChange={(e: any) => {
                    setSelectedOption(e);
                    setData({ selectedOption: e, selectedObj: asyncSelectData.filter((s: any) => s?.sku_code === e?.value), asyncSelectData: asyncSelectData });
                }}
            />
        </>
    )
}

export default AsyncSelectBox