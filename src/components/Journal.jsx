import { useState, useEffect } from "react"
import axios from "axios";
import { useParams } from "react-router-dom";
import Dialog from "./Dialog";

const Journal = () => {
    const { id } = useParams();
    const [note, setNote] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const getNote = async () => {
        const { data } = await axios.get(`/notes/note/${id}`);
        setNote(data);
        };

        getNote();
    }, []);

    return (
        <div className="px-6 py-14">
            <button onClick={() => setIsOpen(true)} className="border p-1">Delete</button>
            <main className="w-full max-w-2xl text-left m-auto leading-[1.9] tracking-[0.01em] text-[18px]">
                <h2 className="text-xl font-bold mb-10">{note.title}</h2>
                <p className="whitespace-pre-wrap">{note.content}</p>
            </main>

            {isOpen && (
                <Dialog open={isOpen} onClose={() => setIsOpen(false)} note={true} />
            )}
        </div>
    )
};

export default Journal;