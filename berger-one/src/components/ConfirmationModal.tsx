// components/ConfirmationModal.js
import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded shadow-md">
                <h3 className="text-lg font-semibold">Are you sure you want to sign out?</h3>
                <div className="mt-4 flex justify-end">
                    <button
                        className="mr-2 px-4 py-2 bg-red-500 text-white rounded"
                        onClick={onConfirm}
                    >
                        Sign Out
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
