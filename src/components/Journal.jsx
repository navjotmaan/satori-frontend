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
        <div>
            {note.content}
        </div>
    )
};

export default Journal;