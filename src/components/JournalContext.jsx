import { createContext, useContext, useState } from "react";

const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
    const [activeNote, setActiveNote] = useState({ id: null, title: "", content: "" });

    return (
        <JournalContext.Provider value={{ activeNote, setActiveNote }}>
            {children}
        </JournalContext.Provider>
    );
};

export const useJournal = () => useContext(JournalContext);