import { MdOutlineClose } from "react-icons/md";
import TableComponent from "../../protecton/Transact/Components/TableComponent";
import { useEffect, useRef, useState } from "react";

const DsrTodReportPopup = ({ onClose }: any) => {
    const childRef = useRef<any>(null);
    const [tableData, settableData] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [filterData, setFilterData] = useState({
        dsrDate: (() => {
            const today = new Date();
            return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        })(),
        viewBy: "TOD",
        usp_user_id: ''
    });

    useEffect(() => {
        if (childRef.current && childRef.current.triggerAPI) {
            childRef.current.triggerAPI({ prd_grp: "PROTECTON", report_grp_level: "REGION", region: '', depot: '', terr: '', selected_user: '' });
        }
    }, [])

    useEffect(() => {
        console.log(tableData)
    }, [tableData])

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full relative">
                    <span className="absolute top-3 right-3 px-3 py-1 rounded cursor-pointer" ><MdOutlineClose color="red" onClick={() => onClose()} /></span>
                    <h2 className="text-xl font-bold pr-12">DSR TOD Report</h2>
                    <TableComponent ref={childRef} tableData={tableData} settableData={settableData} setLoading={setLoading} filterData={filterData} form="TransactDsr" />
                </div>
            </div>
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
                    <div role="status" className="animate-spin">
                        <svg aria-hidden="true" className="h-8 w-8 fill-blue-600 text-gray-200" viewBox="0 0 100 101" fill="none">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only text-white">Please Wait...</span>
                    </div>
                </div>
            )}
        </>
    )
}

export default DsrTodReportPopup