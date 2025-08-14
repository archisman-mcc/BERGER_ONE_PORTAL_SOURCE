import { MdOutlineClose } from "react-icons/md";

const ModalComponent = ({ modalHeader, tableName, onCloseModal, date, children }: any) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full relative">
                <span className="absolute top-3 right-3 px-3 py-1 rounded cursor-pointer" ><MdOutlineClose color="red" onClick={() => onCloseModal()} /></span>
                <h2 className="text-xl font-bold pr-12">{modalHeader}</h2>
                <h5 className="">{tableName}</h5>
                <h5 className="">{date}</h5>
                <div className="mb-2 max-h-[58vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>

    )
}

export default ModalComponent