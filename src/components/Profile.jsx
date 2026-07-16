import { useOutletContext } from "react-router-dom";
import { useAuth } from "../api/AuthContext";

const Logout = () => {
    const { userName, email } = useOutletContext(); 
    const { logout } = useAuth(); 

    return (
        <div className="flex justify-center gap-10 md:max-w-[40%] w-[80%] m-auto mt-10 border border-[#8C5A3C] shadow-[0_6px_4px_rgba(0,0,0,0.2)] rounded-xl p-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user-round-icon lucide-circle-user-round"><path d="M17.925 20.056a6 6 0 0 0-11.851.001"/><circle cx="12" cy="11" r="4"/><circle cx="12" cy="12" r="10"/></svg>
            
            <div>
                <p className="font-bold text-xl">{userName}</p>
                <p className="text-lg text-gray-600 mt-2">{email}</p>
                <button onClick={logout} className="rounded-xl bg-red-500 px-4 py-2 text-white font-semibold mt-8 cursor-pointer transform active:scale-95 transition-transform duration-100 hover:scale-105">Sign Out</button>
            </div>
        </div>
    )
}

export default Logout;