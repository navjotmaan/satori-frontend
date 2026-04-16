import { useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from './quotes/Popup';

const Sidebar = ({ fetchQuotes }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="relative bg-[#4B2E2B] flex md:flex-col items-center justify-around mt-5 m-auto md:w-20 md:h-80 w-100 rounded-[40px] text-[#FFF8F0] md:m-50 md:mx-10 py-5 shadow-[2px_4px_4px_rgba(0,0,0,0.2)]">

            <Link to='/'>
            <svg className="hover:stroke-[#B5651D] lucide lucide-notebook-pen-icon lucide-notebook-pen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/></svg>
            </Link>
            
            <Link to='/nuggets'>
            <svg className="hover:stroke-[#B5651D] lucide lucide-quote-icon lucide-quote" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg>
            </Link>
            
            <svg onClick={toggleDropdown} className="hover:stroke-[#B5651D] lucide lucide-circle-plus-icon lucide-circle-plus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>

            <svg className="hover:stroke-[#B5651D] lucide lucide-user-icon lucide-user" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>

            {isOpen && (
                <div onClick={() => setIsOpen(false)} className='absolute bottom-22 left-15 rounded-lg px-2 flex flex-col items-center justify-center m-auto z-50 bg-[#FFF8F0] border border-[#4B2E2B] text-[#4B2E2B]'>
                    <Link to='new' className='rounded-lg py-1 px-3'>Journal</Link>
                    <button onClick={() => setShowPopup(true)} className="rounded-xl p-1 px-2 cursor-pointer">Note</button>
                </div>
            )}

            {showPopup && (
                <Popup closePopup={() => setShowPopup(false)} onRefresh={fetchQuotes} />
            )}
        </div>

    )
}

export default Sidebar;

