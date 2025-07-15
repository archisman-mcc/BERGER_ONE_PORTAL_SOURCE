import { useState } from "react";
import AsyncSelect from "react-select/async";

const AsyncSelectBox = ({ api, data, setData, apiPayload, label, value, payloadPrefixText }: any) => {
    const [asyncSelectData, setAsyncSelectData] = useState([]);

    const loadOptions = async (inputValue: string) => {
        if (inputValue.length < 3) {
            return;
        }
        const payload: any = {
            [payloadPrefixText]: inputValue,
            ...apiPayload
        }
        try {
            const response: any = await api(payload);
            if (response.data) {
                setAsyncSelectData(response.data.table)
                return response.data.table.map((item: any) => ({
                    label: item[label],
                    value: item[value],
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
                // isMulti={isMulti}
                defaultOptions={false}
                loadOptions={loadOptions}
                placeholder="Type at least 3 letters to search..."
                value={data?.selectedOption || { label: '', value: '' }}
                onChange={(e: any) =>
                    setData({ selectedOption: e, selectedObj: asyncSelectData.filter((s: any) => s[value] === e?.value), asyncSelectData: asyncSelectData })
                }
            />
        </>
    )
}

export default AsyncSelectBox