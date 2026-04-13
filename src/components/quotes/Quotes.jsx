import { useState, useEffect } from "react";
import Popup from "./Popup";
import api from "../../api/axiosInstance";

const QuoteSection = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [quotes, setQuotes] = useState([]);
    const [selectedQuote, setSelectedQuote] = useState(null);

    const handleEdit = (quote) => {
        setSelectedQuote(quote);
        setShowPopup(true);
    };

    const fetchQuotes = async () => {
        try {
            const res = await api.get('/quotes');
            setQuotes([...res.data]);
        } catch (error) {
            console.error("Failed to fetch quotes:", error);
        }
    };

    useEffect(() => {
        fetchQuotes();
    }, []);

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
                    closePopup={() => setShowPopup(false)}
                    onRefresh={fetchQuotes}
                />
            )}
        </div>
    )
};

export default QuoteSection;