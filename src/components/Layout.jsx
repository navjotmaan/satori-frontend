import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import api from "../api/axiosInstance";

const Layout = () => {
    const [userName, setUserName] = useState('');
    const [quotes, setQuotes] = useState([]);

    const fetchQuotes = async () => {
        try {
            const res = await api.get('/quotes');
            setQuotes([...res.data]);
        } catch (error) {
            console.error("Failed to fetch quotes:", error);
        }
    };

    return (
        <div className="md:flex">
            <Sidebar fetchQuotes={fetchQuotes} />
            <main className="flex-1 ">
                <header className='text-left p-10'>
                    <h1 className='font-pro text-5xl text-[#2B2D42]'>{userName}'s Media</h1>
                    <p className='text-3xl text-[#6B705C] font-display'>We write to taste life twice.</p>
                </header>
                <Outlet context={{ setUserName, quotes, fetchQuotes }} />
            </main>
        </div>
    );
};

export default Layout;