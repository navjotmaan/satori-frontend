import { useState, useRef, useEffect } from "react";
import axios from "axios";

const Popup = ({closePopup}) => {
    const [text, setText] = useState("");
    const textareaRef = useRef(null);

    useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = ta.scrollHeight + "px";
    }, [text]);

    useEffect(() => {
    textareaRef.current?.focus();
    }, []);

    const saveQuote = async () => {
        const { data } = await axios.post('/quotes/save', {
            quote: text,
        });
        closePopup();
        console.log(data);
    };

    return (
        <div className='bg-[#4a4e69] w-[40%] min-h-50 p-10 rounded-xl fixed top-[50%] left-[50%] translate-[-50%]'>
            <textarea 
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start writing…"
                className='
                min-h-50 w-full border-none outline-none resize-none
              placeholder:text-[#a89f96]
                '
            />
            <div>
                <button className="border p-1" onClick={saveQuote}>Save</button>
                <button className="border mx-5 p-1" onClick={closePopup}>Cancel</button>
            </div>
        </div>
    )
};

export default Popup;