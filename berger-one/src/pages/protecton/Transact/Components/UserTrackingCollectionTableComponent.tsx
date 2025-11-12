import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';

const UserTrackingCollectionTableComponent = ({ tableData }: any) => {
    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                header: 'OUTSTANDING',
                columns: [
                    {
                        accessorKey: 'age',
                        header: 'AGE',
                        size: 50,
                    },
                    {
                        accessorKey: 'gross',
                        header: 'GROSS',
                        size: 50,
                    },
                    {
                        accessorKey: 'net',
                        header: 'NET',
                        size: 50,
                    },
                    {
                        accessorKey: 'variance',
                        header: 'VARIANCE%',
                        size: 50,
                        Cell: ({ cell }) => {
                            return (
                                <span className='text-red-600'>{cell.row.original.variance.toFixed(0)}</span>
                            )
                        }
                    },
                ]
            }
        ],
        []
    );

    const table = useMantineReactTable({
        columns,
        data: tableData,
        enableColumnResizing: true,
        enableStickyHeader: true,
        enableTopToolbar: false,
        enableSorting: false,
        enableColumnActions: false,
        columnResizeMode: 'onChange',
        mantineTableContainerProps: {
            style: {
                overflowX: 'hidden', // hides horizontal scrollbar
            },
        }
    });
    return (
        <div className="max-h-[45vh] overflow-y-auto p-pl-table-item">
            <MantineReactTable table={table} />
        </div>
    )
}

export default UserTrackingCollectionTableComponent