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

    const finalPlaceholder = "Type at least 3 letters to search...";

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            minHeight: '34px',
            maxHeight: '34px',
        }),
        placeholder: (provided: any) => ({
            ...provided,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
        }),
        input: (provided: any) => ({
            ...provided,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        }),
    };

    return (
        <AsyncSelect
            cacheOptions
            defaultOptions={false}
            loadOptions={loadOptions}
            placeholder={finalPlaceholder}
            value={data?.selectedOption || null}
            onChange={(e: any) =>
                setData({ selectedOption: e, selectedObj: asyncSelectData.filter((s: any) => s[value] === e?.value), asyncSelectData: asyncSelectData })
            }
            isClearable={true}
            isSearchable={true}
            className="text-sm"
            styles={customStyles}
        />
    )
}

export default AsyncSelectBox