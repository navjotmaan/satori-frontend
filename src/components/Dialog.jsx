import { useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Dialog = ({ open, onClose, note, quoteId = null, closePopup }) => {
    
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
        const { data } = await axios.post(`/delete/${id}`);
        navigate("/");
    };

    const deleteQuote = async () => {
        try {
            await axios.post(`/quotes/delete/${quoteId}`);
            onClose();
            closePopup();
        } catch (error) {
            console.error("Failed to delete:", error);
        }
    }

    
    return (
        <>
            <dialog ref={dialogRef} onClose={onClose} className="p-6 rounded-lg shadow-xl">
                <p>Are you sure you want to delete this note?</p>
                <div>
                    <button onClick={onClose} className="border p-1">Cancel</button>
                    <button onClick={note? deleteNote : deleteQuote} className="border p-1">Yes</button>
                </div>
            </dialog>
        </>
    )
};

export default Dialog;