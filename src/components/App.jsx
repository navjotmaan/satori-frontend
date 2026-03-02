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
    <div className='flex h-full'>
      <div className='basis-[70vw] min-h-[100vh]'>
        <header className='p-5 flex justify-between items-center'>
          <div className='text-left my-5'>
            <h1 className='font-bold text-2xl text-[#D9564A]'>My Media</h1>
            <p className='text-lg'>We write to taste life twice.</p>
          </div>
          <Link to='new' className='rounded-xl p-1 px-2 bg-[#3B9CD9]'>Create</Link>
        </header>

        <main className='flex items-center space-x-6 p-10'>
          {notes.map(note => (
            <Link to={`/${note.id}`} key={note.id} className='basis-64 rounded bg-[#F2884B] text-white p-5'>
              <p>{getDate(note.updated_at)}</p>
              <p>{note.content}</p>
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
