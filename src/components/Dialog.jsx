import { useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const Dialog = ({ open, onClose, note, quoteId = null, closePopup }) => {
    const queryClient = useQueryClient();

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

    const deleteNoteMutation = useMutation({
        mutationFn: () => api.delete(`/notes/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            queryClient.removeQueries({ queryKey: ['note', id] });
            navigate("/dashboard");
        },
    });

    const deleteQuoteMutation = useMutation({
        mutationFn: () => api.delete(`/quotes/${quoteId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quotes'] }); 
            onClose();
            closePopup();
        },
        onError: (error) => {
            console.error("Failed to delete:", error);
        },
    });

    return (
        <>
            <dialog ref={dialogRef} onClose={onClose} className="m-auto p-6 rounded-xl shadow-xl">
                <p>Do you want to delete this post?</p>
                <div className="flex justify-center gap-10 mt-5">
                    <button onClick={onClose} className="border p-1 w-20 rounded-lg cursor-pointer transform active:scale-95 transition-transform duration-100 hover:scale-105">Cancel</button>
                    <button onClick={() => {note? deleteNoteMutation.mutate() : deleteQuoteMutation.mutate()}} className="border p-1 w-20 rounded-lg cursor-pointer bg-red-500 text-white transform active:scale-95 transition-transform duration-100 hover:scale-105">Yes</button>
                </div>
            </dialog>
        </>
    )
};

export default Dialog;