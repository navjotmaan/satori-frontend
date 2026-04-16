import { Outlet } from "react-router-dom";
import { useState, useEffect, use } from "react";
import Sidebar from "./Sidebar";
import api from "../api/axiosInstance";
import { useAuth } from "../api/AuthContext";

const Layout = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [quotes, setQuotes] = useState([]);

    const { accessToken } = useAuth();

    const fetchQuotes = async () => {
        try {
            const res = await api.get('/quotes');
            setQuotes([...res.data]);
        } catch (error) {
            console.error("Failed to fetch quotes:", error);
        }
    };

    const parseJwt = (token) => {
        try {
            const base64Url = token.split('.')[1]; // Get the payload part
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            return JSON.parse(window.atob(base64));
        } catch (e) {
            return null;
        }
    };

    useEffect(() => {
        const userData = parseJwt(accessToken);
        setEmail(userData?.email || '');
        setUserName(userData?.name || '');
    }, [accessToken]);

    const firstName = userName.includes(" ") ? userName.slice(0, userName.indexOf(" ")) : userName;

    return (
        <div className="md:flex">
            <Sidebar fetchQuotes={fetchQuotes} />
            <main className="flex-1 ">
                <header className='text-left p-10'>
                    <h1 className='font-pro text-5xl text-[#2B2D42]'>{firstName}'s Media</h1>
                    <p className='text-3xl text-[#6B705C] font-display'>We write to taste life twice.</p>
                </header>
                <Outlet context={{ userName, email, quotes, fetchQuotes }} />
            </main>
        </div>
    );
};

export default Layout;