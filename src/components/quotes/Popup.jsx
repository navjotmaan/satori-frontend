import { useState, useRef, useEffect } from "react";
import api from "../../api/axiosInstance";
import Dialog from "../Dialog";
import { useMutation, useQueryClient } from '@tanstack/react-query';

const Popup = ({ closePopup, quote = "", id = null }) => {
    const [text, setText] = useState(quote || "");
    const textareaRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const queryClient = useQueryClient();

    useEffect(() => {
        const ta = textareaRef.current;
        if (!ta) return;
        ta.style.height = "auto";
        ta.style.height = ta.scrollHeight + "px";
    }, [text]);

    useEffect(() => {
        const ta = textareaRef.current;
        if (ta) {
            ta.focus();
            const length = ta.value.length;
            ta.setSelectionRange(length, length);
        }
    }, []);

    const mutation = useMutation({
        mutationFn: () => {
            if (id) {
                return api.put(`/quotes/${id}`, {
                    quote: text,
                });
            } else {
                return api.post('/quotes', {
                    quote: text,
                });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quotes']});
            closePopup();
        },
        onError: (error) => {
            console.error("Failed to save:", error);
        },
    });

    return (
        <>
            <div 
                className="fixed inset-0 bg-black/20 z-40" 
                onClick={closePopup} 
            />
           
            <div className='bg-[#f2e9e4] w-[90%] md:w-[40%] min-h-50 p-10 rounded-xl fixed top-[50%] left-[50%] translate-x-[-50%] text-black translate-y-[-50%] z-50 shadow-2xl'>
                <textarea 
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Start writing…"
                    className='
                    min-h-50 w-full border-none outline-none resize-none
                    '
                />
                <div>
                    <button className="min-w-20 rounded-lg bg-[#6B705C] text-white p-1 cursor-pointer transform active:scale-95 transition-transform duration-100 hover:scale-105" onClick={() => mutation.mutate()}>
                        {id ? "Update" : "Save"}
                    </button>

                    <button className="border rounded-lg min-w-20 mx-3 p-1 cursor-pointer transform active:scale-95 transition-transform duration-100 hover:scale-105" onClick={closePopup}>
                        Cancel
                    </button>

                    {id ? 
                    <button onClick={() => setIsOpen(true)} className="rounded-lg min-w-20 bg-red-500 text-white p-1 cursor-pointer transform active:scale-95 transition-transform duration-100 hover:scale-105">Delete</button>
                    : ''}
                </div>
            </div>

            {isOpen && (
                <Dialog open={isOpen} onClose={() => setIsOpen(false)} note={false} quoteId={id} closePopup={closePopup} />
            )}
        </>
    )
};

export default Popup;