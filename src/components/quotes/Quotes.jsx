import { useState, useEffect } from "react";
import Popup from "./Popup";
import { useOutletContext } from "react-router-dom";

const QuoteSection = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedQuote, setSelectedQuote] = useState(null);

    const { quotes, fetchQuotes } = useOutletContext();

    const handleEdit = (quote) => {
        setSelectedQuote(quote);
        setShowPopup(true);
    };

    useEffect(() => {
        fetchQuotes();
    }, []);

    return (
        <div>
            <div className="flex flex-col items-center gap-2 pb-10">
                {quotes.length !== 0 ? (
                    quotes.map(quote => (
                        <div key={quote.id} onClick={() => handleEdit(quote)} className="w-[80%] md:w-[60%] mt-5 shadow-[0_6px_4px_rgba(0,0,0,0.2)] rounded-[30px] p-6 cursor-pointer transform hover:scale-105 transition-transform duration-300">
                            <p>{quote.created_at}</p>
                            <p className="text-start">{quote.quote}</p>
                        </div>
                    ))
                ) : 
                    <p className="m-auto mt-40 text-[#919191] font-handwriting">Your notes will appear here.</p>
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