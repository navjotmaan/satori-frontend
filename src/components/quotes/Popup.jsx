import { useState, useRef, useEffect } from "react";
import api from "../../api/axiosInstance";
import Dialog from "../Dialog";

const Popup = ({ closePopup, quote = "", id = null, onRefresh = () => {} }) => {
    const [text, setText] = useState(quote || "");
    const textareaRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

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

    const saveQuote = async () => {
        try {
            if (id) {
                await api.put(`/quotes/update/${id}`, {
                    quote: text,
                });
            } else {
                await api.post('/quotes/save', {
                    quote: text,
                });
            }
            onRefresh();
            closePopup();
            
        }
        catch (error) {
            console.error("Failed to save:", error);
        }
    };

    return (
        <>
            <div 
                className="fixed inset-0 bg-black/20 z-40" 
                onClick={closePopup} 
            />
           
            <div className='bg-[#f2e9e4] w-[90%] md:w-[40%] min-h-50 p-10 rounded-xl fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 shadow-2xl'>
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
                    <button className="min-w-20 rounded bg-[#3B9CD9] text-white p-1 cursor-pointer" onClick={saveQuote}>
                        {id ? "Update" : "Save"}
                    </button>

                    <button className="border rounded min-w-20 mx-3 p-1 cursor-pointer" onClick={closePopup}>Cancel</button>

                    {id ? 
                    <button onClick={() => setIsOpen(true)} className="rounded min-w-20 bg-red-500 text-white p-1 cursor-pointer">Delete</button>
                    : ''}
                </div>
            </div>

            {isOpen && (
                <Dialog open={isOpen} onClose={() => setIsOpen(false)} note={false} quoteId={id} closePopup={closePopup} onRefresh={onRefresh} />
            )}
        </>
    )
};

export default Popup;