import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from "../api/axiosInstance";
import { useAuth } from '../api/AuthContext';
import QuoteSection from './quotes/Sidebar';
import Popup from './quotes/Popup';
import menu from '../assets/menu.png';

function App() {
  const [notes, setNotes] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(false);

  const { logout } = useAuth();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const fetchQuotes = async () => {
    try {
      const res = await api.get('/quotes');
      setQuotes([...res.data]);
    } catch (error) {
      console.error("Failed to fetch quotes:", error);
    }
  };

  useEffect(() => {
    const getNotes = async () => {
      const { data } = await api.get('/notes');
      setNotes(data);
    };

    getNotes();
    fetchQuotes();
  }, []);

  return (
    <div className='md:flex relative h-full mx-5'>
      <div className='md:basis-[80vw] w-full min-h-[100vh]'>
        <header className='p-5 text-left my-5'>
            <div className='flex justify-between items-center'>
              <div>
                <h1 className='font-bold text-2xl text-[#D9564A]'>My Media</h1>
                <p className='text-lg mb-5 font-display'>We write to taste life twice.</p>
              </div>

              <button className='block fixed right-5 top-5 cursor-pointer md:hidden text-xl' onClick={() => setToggle(!toggle)}><img src={menu} alt="Menu" className='w-6'></img></button>
            </div>

            <div className='relative inline-block'>
              <button onClick={toggleDropdown} className='rounded-lg py-1 px-3 bg-[#3B9CD9] text-white cursor-pointer'>
                Create {isOpen ? '▲' : '▼'}
              </button>

              {isOpen && (
                <div onClick={() => setIsOpen(false)} className='absolute mt-1 rounded-lg px-2 flex flex-col items-center justify-center bg-[#f2e9e4] border'>
                  <Link to='new' className='rounded-lg py-1 px-3'>Journal</Link>
                  <button onClick={() => setShowPopup(true)} className="rounded-xl p-1 px-2 cursor-pointer">Note</button>
                </div>
              )}
            </div>

        </header>

        <main className='flex flex-wrap justify-center md:justify-start gap-10 p-5'>
          {notes.length !== 0 ? (
            notes.map(note => (
              <Link to={`/${note.id}`} key={note.id} className='border-2 w-full md:w-[340px] h-[100px] border-[#F2884B] flex flex-col justify-center rounded-lg p-2 px-3'>
                <p className='text-xl font-semibold'>{note.title}</p>
                <p>{note.content.substring(0, 50)}...</p>
              </Link>
            ))
          ) : 
            <p className='m-auto mt-10 font-handwriting'>Your journals will appear here.</p>
          }
          
        </main>
      </div>

      {toggle || window.innerWidth >= 768 ? (

        <aside className='border-2 border-[#F2884B] rounded-xl fixed inset-0 z-50 bg-[#f2e9e4] h-[100vh] m-5 mr-0 overflow-auto custom-scrollbar md:z-0 md:sticky md:h-[90vh] md:m-10 md:block md:w-[40vw]'>
        <button className='rounded-lg py-1 px-3 bg-red-500 text-white cursor-pointer' onClick={logout}>Logout
          </ button> 
          <button 
          className="md:hidden absolute cursor-pointer top-1 right-2 text-xl" 
          onClick={() => setToggle(false)}
        >
          ✕
        </button>
        <QuoteSection quotes={quotes} onRefresh={fetchQuotes} />
      </aside>
      ) : (
        <></>
      )}

      {showPopup && (
        <Popup closePopup={() => setShowPopup(false)} onRefresh={fetchQuotes}/>
      )}
    </div>
  )
};

export default App;
