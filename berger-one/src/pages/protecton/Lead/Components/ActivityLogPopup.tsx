import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table'
import React, { useMemo } from 'react'
import { MdOutlineClose } from "react-icons/md";

const ActivityLogPopup = ({ activityLogData, onClose }: any) => {
    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'activity_datetime',
                header: 'Activity Date & Time',
                size: 60,
            },
            {
                accessorKey: 'lead_status',
                header: 'Lead Status',
                size: 60,
            },
            {
                accessorKey: 'remarks',
                header: 'Remarks',
                size: 60,
            }
        ],
        []
    );

    const table = useMantineReactTable({
        columns,
        data: activityLogData,
        enableColumnResizing: true,
        enableStickyHeader: true,
        enableTopToolbar: false,
        enableSorting: false,
        enableColumnActions: false,
        columnResizeMode: 'onChange',
        mantineTableContainerProps: {
            style: {
                overflowX: 'hidden',
            },
        }
    });
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-pl-table-item">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full relative">
                <span className="absolute top-3 right-3 px-3 py-1 rounded cursor-pointer" ><MdOutlineClose color="red" onClick={() => onClose()} /></span>
                <h2 className="text-xl font-bold pr-12">Activity Logs</h2>
                <MantineReactTable table={table} />
            </div>
        </div>
    )
}

export default ActivityLogPopup