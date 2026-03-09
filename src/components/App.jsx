import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import QuoteSection from './quotes/Sidebar';
import Popup from './quotes/Popup';

function App() {
  const [notes, setNotes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const getNotes = async () => {
      const { data } = await axios.get('/notes');
      setNotes(data);
    };

    getNotes();
  }, []);

  function getDate(date) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        });
  }

  return (
    <div className='flex h-full px-10'>
      <div className='basis-[80vw] min-h-[100vh]'>
        <header className='p-5 text-left my-5'>
            <h1 className='font-bold text-2xl text-[#D9564A]'>My Media</h1>
            <p className='text-lg mb-5 font-display'>We write to taste life twice.</p>

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

        <main className='flex flex-wrap gap-10 p-5'>
          {notes.length !== 0 ? (
            notes.map(note => (
              <Link to={`/${note.id}`} key={note.id} className='border-4 w-[300px] h-[100px] border-[#F2884B] rounded-lg p-5'>
                <p>{getDate(note.updated_at)}</p>
                <p>{note.title}</p>
              </Link>
            ))
          ) : 
            <p className='m-auto mt-10 font-handwriting'>Your journals will appear here.</p>
          }
          
        </main>
      </div>

      <aside className='border-2 border-[#F2884B] rounded-xl basis-[40vw] h-[100vh] m-10 overflow-auto custom-scrollbar'>
        <QuoteSection />
      </aside>

      {showPopup && (
          <Popup closePopup={() => setShowPopup(false)}/>
      )}
    </div>
  )
};

export default App;
