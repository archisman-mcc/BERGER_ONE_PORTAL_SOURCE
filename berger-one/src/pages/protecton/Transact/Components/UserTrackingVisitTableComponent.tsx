import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';

const UserTrackingVisitTableComponent = ({ tableData }: any) => {
    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'dlr_dealer_name',
                header: 'DEALER NAME',
                size: 50,
            },
            {
                accessorKey: 'dcio_dealer_code',
                header: 'DEALER CODE',
                size: 50,
            },
            {
                accessorKey: 'dcio_depot_code',
                header: 'DEPOT',
                size: 50,
            },
            {
                accessorKey: 'visit_type',
                header: 'VISIT TYPE',
                size: 50,
            },
            {
                accessorKey: 'dlr_type',
                header: 'DLR TYPE',
                size: 50,
            },
            {
                accessorKey: 'dcio_spent_min',
                header: 'TOTAL DURATION',
                size: 50,
            },
            {
                accessorKey: 'activity',
                header: 'ACTIVITY',
                size: 50,
            },
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

export default UserTrackingVisitTableComponent