import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';

const OutstandingTableComponent = forwardRef(({ tableData, settableData, setLoading, form }: any, ref) => {
    const dataRef = useRef<any>(null);

    const UserApplDlrOSDtlsAPICall = async () => {
        setLoading(true);
        const data: any = {
            asOnDate: filterData?.dsrDate,
            selectedUser: filterData?.usp_user_id
        };
        try {
            const response: any = await usertracking.GetUserCollectionList(data);
            const gross: any = [];
            const net: any = [];
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
                { age: '>120' },
                { age: '>180' },
                { age: 'TOTAL' }
            ];
            Object.keys(response.data.table1[0]).map((key) => key.substr(0, 1) === 'g' ? gross.push({ gross: response.data.table1[0][key] }) : key.substr(0, 1) === 'n' && net.push({ net: response.data.table1[0][key] }))
            const merged: any = [];
            let sData: any = {};
            gross.map((item: any, index: string | number) => {
                if (index === 9) {
                    sData = {
                        ...item,
                        ...net[index],
                        ...{ variance: ((net[index].net - item?.gross) / item?.gross) * 100 }
                    }
                }
                else if (index !== 10)
                    merged.push({
                        ...item,
                        ...net[index],
                        ...{ variance: ((net[index].net - item?.gross) / item?.gross) * 100 }
                    })
            });
            setTimeout(() => {
                console.log([...merged, sData])
                setCollectionTableData({
                    data1: response.data.table[0].coll, data2: [...merged, sData].map((item, index) => ({
                        ...item,
                        ...age[index],
                    }))
                })
            }, 4000);

        } catch (error) {
            return;
        }
        setLoading(false);
    }

    // UserApplDlrOSDtls
    useImperativeHandle(ref, () => ({
        triggerAPI: UserApplDlrOSDtlsAPICall,
    }));

    return (
        <>
            <div className="max-h-[50vh] overflow-y-auto">
                {/* <MantineReactTable table={table} /> */}
            </div>
        </>
    )
})

export default OutstandingTableComponent