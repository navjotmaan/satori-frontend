import { useState, useRef, useEffect } from "react";
import api from "../../api/axiosInstance";
import Dialog from "../Dialog";

const Popup = ({ closePopup, quote = "", id = null }) => {
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
                const { data } = await api.post('/quotes/save', {
                    quote: text,
                });
            }
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
           
            <div className='bg-[#D9564A] text-white w-[40%] min-h-50 p-10 rounded-xl fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 shadow-2xl'>
                <textarea 
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Start writing…"
                    className='
                    min-h-50 w-full border-none outline-none resize-none
                    placeholder:text-[#f2f2f2]
                    '
                />
                <div>
                    <button className="border p-1 cursor-pointer" onClick={saveQuote}>
                        {id ? "Update" : "Save"}
                    </button>
                    <button className="border mx-5 p-1 cursor-pointer" onClick={closePopup}>Cancel</button>
                    {id ? 
                        <button onClick={() => setIsOpen(true)} className="border p-1 cursor-pointer">Delete</button>
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