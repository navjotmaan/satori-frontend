import { useEffect, useState } from "react";
import Popup from "./Popup";
import axios from "axios";

const QuoteSection = () => {
    const [quotes, setQuotes] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const getQuotes = async () => {
            const { data } = await axios.get('/quotes');
            setQuotes(data);
        };

        getQuotes();
    }, []);

    console.log(quotes)

    return (
        <div className='bg-[#012611] text-white basis-[30vw] h-full'>
            <button onClick={() => setShowPopup(true)} className="rounded-xl p-1 px-2 bg-[#3B9CD9]">Add</button>

            <div className="flex flex-col gap-4 mt-10">
                {quotes.map(quote => (
                    <p key={quote.id} className="border-b border-b-[#c9ada7] px-5 py-2">{quote.quote}</p>
                ))}
            </div>

        {showPopup && (
            <Popup closePopup={() => setShowPopup(false)}/>
        )}
        </div>

    )
};

export default QuoteSection;