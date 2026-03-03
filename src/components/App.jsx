import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import QuoteSection from './quotes/Sidebar';

function App() {
  const [notes, setNotes] = useState([]);

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
      <div className='basis-[70vw] min-h-[100vh]'>
        <header className='p-5 text-left my-5'>
            <h1 className='font-bold text-2xl text-[#D9564A]'>My Media</h1>
            <p className='text-lg mb-5'>We write to taste life twice.</p>
          <Link to='new' className='rounded-lg py-1 px-3 bg-[#3B9CD9] text-white'>Create</Link>
        </header>

        <main className='flex flex-wrap gap-10 p-5'>
          {notes.map(note => (
            <Link to={`/${note.id}`} key={note.id} className='border-4 w-[300px] border-[#F2884B] rounded-lg p-5'>
              <p>{getDate(note.updated_at)}</p>
              <p>{note.title}</p>
            </Link>
          ))}
          
        </main>
      </div>

      <aside>
        <QuoteSection />
      </aside>
    </div>
  )
}

export default App
