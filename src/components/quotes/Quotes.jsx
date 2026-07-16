import { useState, useEffect } from "react";
import Popup from "./Popup";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axiosInstance";

const QuoteSection = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedQuote, setSelectedQuote] = useState(null);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['quotes'],
        queryFn: async () => {
            const { data } = await api.get('/quotes');
            return data;
        }
    });

    const quotes = data ?? [];

    const handleEdit = (quote) => {
        setSelectedQuote(quote);
        setShowPopup(true);
    };

    if (isLoading) return (
        <div className="flex flex-col gap-5 items-center justify-center mt-30">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#4B2E2B] border-t-transparent"></div>
        </div> 
    )
  if (isError) return <p>Something went wrong loading your quotes.</p>;

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
                    <p className="m-auto mt-40 text-[#919191] font-handwriting">There is no note yet. Create one.</p>
                }
            </div>

            {showPopup && (
                <Popup 
                    id={selectedQuote?.id}
                    quote={selectedQuote?.quote}
                    closePopup={() => setShowPopup(false)}
                />
            )}
        </div>
    )
};

export default QuoteSection;