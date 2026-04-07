import { useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

const Dialog = ({ open, onClose, note, quoteId = null, closePopup, onRefresh = () => {} }) => {
    
    const { id } = useParams();
    const dialogRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const dialog = dialogRef.current;
        if (open) {
            dialog?.showModal();
        } else {
            dialog?.close();
        }
    }, [open]);

    const deleteNote = async () => {
        await api.post(`/notes/delete/${id}`);
        navigate("/");
    };

    const deleteQuote = async () => {
        try {
            await api.post(`/quotes/delete/${quoteId}`);
            onClose();
            closePopup();
            onRefresh();
        } catch (error) {
            console.error("Failed to delete:", error);
        }
    }

    
    return (
        <>
            <dialog ref={dialogRef} onClose={onClose} className="m-auto p-6 rounded-xl shadow-xl">
                <p>Do you want to delete this post?</p>
                <div className="flex justify-center gap-10 mt-5">
                    <button onClick={onClose} className="border p-1 w-20 rounded-lg cursor-pointer">Cancel</button>
                    <button onClick={note? deleteNote : deleteQuote} className="border p-1 w-20 rounded-lg cursor-pointer bg-red-500 text-white">Yes</button>
                </div>
            </dialog>
        </>
    )
};

export default Dialog;