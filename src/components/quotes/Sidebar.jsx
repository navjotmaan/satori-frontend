import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import Popup from "./Popup";

const QuoteSection = () => {
    const [quotes, setQuotes] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedQuote, setSelectedQuote] = useState(null);

    useEffect(() => {
        const getQuotes = async () => {
            const { data } = await api.get('/quotes');
            setQuotes(data);
        };

        getQuotes();
    }, []);

    const handleEdit = (quote) => {
        setSelectedQuote(quote);
        setShowPopup(true);
    }

    return (
        <div>
            <div className="flex flex-col gap-4 pt-2">
                {quotes.length !== 0 ? (
                    quotes.map(quote => (
                        <p key={quote.id} onClick={() => handleEdit(quote)} className="border-b border-b-[#c9ada7] px-5 py-2 cursor-pointer">
                            {quote.quote}
                        </p>
                    ))
                ) : 
                    <p className="mt-10 font-handwriting">Your notes will appear here.</p>
                }
            </div>

            {showPopup && (
                <Popup 
                    id={selectedQuote?.id}
                    quote={selectedQuote?.quote}
                    closePopup={() => setShowPopup(false)} />
            )}
        </div>
    )
};

export default QuoteSection;