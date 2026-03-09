import { useState, useRef, useEffect } from "react";
import axios from "axios";

const Popup = ({ closePopup, quote = "", id = null }) => {
    const [text, setText] = useState(quote || "");
    const textareaRef = useRef(null);

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
                await axios.put(`/quotes/update/${id}`, {
                    quote: text,
                });
            } else {
                const { data } = await axios.post('/quotes/save', {
                    quote: text,
                });
            }
            closePopup();
        }
        catch (error) {
            console.error("Failed to save:", error);
        }
    };

    const deleteQuote = async () => {
        try {
            await axios.post(`/quotes/delete/${id}`);
            closePopup();
        } catch (error) {
            console.error("Failed to delete:", error);
        }
    }

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
                        <button onClick={deleteQuote} className="border p-1 cursor-pointer">Delete</button>
                    : ''}
                </div>
            </div>
        </>
    )
};

export default Popup;