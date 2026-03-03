import { useState, useEffect } from "react"
import axios from "axios";
import { useParams } from "react-router-dom";

const Journal = () => {
    const { id } = useParams();
    const [note, setNote] = useState([]);

    useEffect(() => {
        const getNote = async () => {
        const { data } = await axios.get(`/note/${id}`);
        setNote(data);
        };

        getNote();
    }, []);

    return (
        <div className="flex justify-center px-6 py-14">
            <main className="w-full max-w-2xl text-left leading-[1.9] tracking-[0.01em] text-[18px]">
                {note.content}
            </main>
        </div>
    )
};

export default Journal;