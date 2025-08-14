import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const AsyncMultiSelectBox = ({ api, payloadPrefixText, apiPayload, selectedItems, setSelectedItems, query, setQuery, data, setData, listDataHide, setListDataHide }: any) => {
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        if (query.length < 3) {
            return;
        }
        const payload: any = {
            [payloadPrefixText]: query,
            ...apiPayload
        }
        try {
            const response: any = await api(payload);
            if (response.data) {
                setData(response.data.table || [])
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            return;
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedItems((prev: any) =>
            prev.includes(id) ? prev.filter((i: any) => i !== id) : [...prev, id]
        );
    };

    return (
        <>
            <div className="relative w-full max-w-md">
                <input
                    type="text"
                    placeholder="Search Client..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                    onClick={() => setListDataHide(!listDataHide)}
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800 focus:outline-none"
                >
                    {listDataHide ? <FaAngleUp size={20} /> : <FaAngleDown size={20} />}
                </button>
                <button
                    onClick={handleSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800 focus:outline-none"
                >
                    <CiSearch size={20} fontWeight={500} />
                </button>
            </div>


            {loading && <p className="mt-3 text-gray-500 text-sm">Loading...</p>}

            <div className="relative w-full">
                {!listDataHide && data.length > 0 && (
                    <div className="absolute top-full mt-2 w-full max-h-64 overflow-y-auto border border-gray-300 rounded-lg bg-white shadow-lg z-50">
                        <ul className="divide-y divide-gray-200">
                            {data.map((item: any) => (
                                <li key={item.dlr_dealer_code} className="px-4 py-2 hover:bg-gray-100">
                                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-4 w-4 text-blue-600"
                                            checked={selectedItems.includes(item.dlr_dealer_code)}
                                            onChange={() => toggleSelect(item.dlr_dealer_code)}
                                        />
                                        <span>{item.dealer}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>



        </>
    );
};

export default AsyncMultiSelectBox;
