import React, { useState } from 'react';
import Select from 'react-select';

const TSRMonitoringReport = () => {
    const regionOptions = [
        { value: '00', label: 'Select' },
        { value: 'BNB', label: 'BNB' },
        { value: 'East', label: 'East' },
        { value: 'East-1', label: 'East-1' },
        { value: 'East-2', label: 'East-2' },
        { value: 'EXP', label: 'EXP' },
        { value: 'H.O.', label: 'H.O.' },
        { value: 'N1-Delhi-WUP', label: 'N1-Delhi-WUP' },
        { value: 'N1-DRAJ', label: 'N1-DRAJ' },
        { value: 'N2-Haryana', label: 'N2-Haryana' },
        { value: 'N2-UPUK', label: 'N2-UPUK' },
        { value: 'N3-PJHH', label: 'N3-PJHH' },
        { value: 'N3-Rajasthan', label: 'N3-Rajasthan' },
        { value: 'N4-Central UP', label: 'N4-Central UP' },
        { value: 'N5-Punjab-HP-JK', label: 'N5-Punjab-HP-JK' },
        { value: 'North-1', label: 'North-1' },
        { value: 'North-2', label: 'North-2' },
        { value: 'North-3', label: 'North-3' },
        { value: 'South-1', label: 'South-1' },
        { value: 'South-1-AP', label: 'South-1-AP' },
        { value: 'South-1-TN', label: 'South-1-TN' },
        { value: 'South-2', label: 'South-2' },
        { value: 'South-3', label: 'South-3' },
        { value: 'TIGER - H.O.', label: 'TIGER - H.O.' },
        { value: 'West-1', label: 'West-1' },
        { value: 'West-1-MB', label: 'West-1-MB' },
        { value: 'West-1-PN', label: 'West-1-PN' },
        { value: 'West-2', label: 'West-2' },
        { value: 'West-2-GJ', label: 'West-2-GJ' },
        { value: 'West-2-MP', label: 'West-2-MP' },
    ]
    const userGroupOptions = [
        {}
    ]
    const [data, setData] = useState<any>({
        region: regionOptions,
        selectedRegion: null,
        userGroup: userGroupOptions,
        selectedUserGroup: null,
    });
    const handleChange = ({ keyName, value }: any) => {
        setData((prev: any) => ({ ...prev, [keyName]: value }));
    }

    React.useEffect(() => {
        console.log(data)
    }, [data]);

    return (
        <>
            {/* Page Header */}
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-1">
                <h5 className="text-lg font-semibold dark:text-white-light">
                    EMPLOYEE MONITOR OUTPUT
                </h5>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-md mb-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    {/* Region Selection */}
                    <div className="flex items-center space-x-2">
                        <label className="block text-sm font-semibold whitespace-nowrap">
                            Region:
                        </label>
                        <Select
                            className="text-sm flex-1"
                            isSearchable={true}
                            options={data.region}
                            value={data.selectedRegion}
                            onChange={(event: any) => handleChange({ keyName: 'selectedRegion', value: event })}
                            placeholder="Select Region"
                            isClearable
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <label className="block text-sm font-semibold whitespace-nowrap">
                            User Group:
                        </label>
                        <Select
                            className="text-sm flex-1"
                            isSearchable={true}
                            options={data.userGroup}
                            value={data.selectedUserGroup}
                            onChange={(event: any) => handleChange({ keyName: 'selectedUserGroup', value: event })}
                            placeholder="Select User Group"
                            isClearable
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TSRMonitoringReport