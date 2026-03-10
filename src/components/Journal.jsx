import { useState, useEffect } from "react"
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Journal = () => {
    const { id } = useParams();
    const [note, setNote] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getNote = async () => {
        const { data } = await axios.get(`/note/${id}`);
        setNote(data);
        };

        getNote();
    }, []);

    const deleteNote = async () => {
        const { data } = await axios.post(`/delete/${id}`);
        navigate("/");
    };

    return (
        <div className="px-6 py-14">
            <button onClick={deleteNote} className="border p-1">Delete</button>
            <main className="w-full max-w-2xl text-left m-auto leading-[1.9] tracking-[0.01em] text-[18px]">
                <h2 className="text-xl font-bold mb-10">{note.title}</h2>
                <p className="whitespace-pre-wrap">{note.content}</p>
            </main>
        </div>
    )
};

export default Journal;