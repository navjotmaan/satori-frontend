import { useState, useEffect } from "react"
import api from "../api/axiosInstance";
import { useParams } from "react-router-dom";
import Dialog from "./Dialog";

const Journal = () => {
    const { id } = useParams();
    const [note, setNote] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const getNote = async () => {
        const { data } = await api.get(`/notes/note/${id}`);
        setNote(data);
        };

        getNote();
    }, []);

    function getDate(date) {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
    }

    return (
        <div className="px-6 py-14">
            <button onClick={() => setIsOpen(true)} className="border fixed right-10 rounded px-2 cursor-pointer top-5 p-1">Delete</button>
            <main className="w-full max-w-2xl text-left m-auto leading-[1.9] tracking-[0.01em] text-[18px]">
                
                <span>
                    <h2 className="text-2xl font-bold">{note.title}</h2>
                    <p>{getDate(note.created_at)}</p>
                </span>
                <p className="whitespace-pre-wrap mt-10">{note.content}</p>
            </main>

            {isOpen && (
                <Dialog open={isOpen} onClose={() => setIsOpen(false)} note={true} />
            )}
        </div>
    )
};

export default Journal;