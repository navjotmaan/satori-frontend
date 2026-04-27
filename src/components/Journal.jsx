import { useState, useEffect, createContext, useContext } from "react"
import api from "../api/axiosInstance";
import { useParams, Link } from "react-router-dom";
import Dialog from "./Dialog";
import { useJournal } from "./JournalContext";

const Journal = () => {
    const { id } = useParams();
    const [note, setNote] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const { setActiveNote } = useJournal();      

    useEffect(() => {
        const getNote = async () => {
            const { data } = await api.get(`/notes/${id}`);
            setNote(data);
            setActiveNote({id: id, title: data.title, content: data.content});
        };

        getNote();
    }, []);

    return (
        <div className="px-6 py-14">

            <svg onClick={toggleDropdown} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute cursor-pointer right-10 top-5 lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>

            <main className="w-full max-w-2xl text-left m-auto leading-[1.9] tracking-[0.01em] text-[18px]">
                <h2 className="text-3xl font-bold">{note.title}</h2>
                <p className="whitespace-pre-wrap mt-10">{note.content}</p>
            </main>

            {isOpen && (
                <Dialog open={isOpen} onClose={() => setIsOpen(false)} note={true} />
            )}

            {dropdownOpen && (
                <div onClick={() => setDropdownOpen(false)} className='absolute top-8 right-15 rounded-lg px-2 flex flex-col items-center justify-center w-20 bg-[#FFF8F0] border border-[#4B2E2B] text-[#4B2E2B]'>
                    <Link to="/new">
                        <button className='rounded-lg py-1 px-3 cursor-pointer'>Edit</button>
                    </Link>
                    <button onClick={() => setIsOpen(true)} className="rounded-xl p-1 px-2 cursor-pointer">Delete</button>
                </div>
            )}
        </div>

    )
};

export default Journal;