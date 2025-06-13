import { MantineReactTable } from 'mantine-react-table';

const ModalComponent = ({modalHeader, tableName, tableData, onCloseModal }: any) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            {/* Modal Content */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                <h2 className="text-xl font-bold mb-4">{modalHeader}</h2>
                <h5 className="text-xl mb-4">{tableName}</h5>
                <div className="mb-2 max-h-[58vh] overflow-y-auto">
                    <MantineReactTable table={tableData} />
                </div>
                <div className="flex justify-end">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => onCloseModal()}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalComponent