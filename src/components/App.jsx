import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

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
    <>
    <h1 className='font-semibold my-5'>My Life's Diary</h1>
    <p className='my-5'>We write to taste life twice.</p>
    <Link to='new' className='border p-1'>New</Link>

    <main className='flex items-center space-x-6 p-10'>
      {notes.map(note => (
        <Link to={`/${note.id}`} key={note.id} className='basis-64 rounded bg-[#516373] text-white p-5'>
          <p>{getDate(note.updated_at)}</p>
          <p>{note.content}</p>
        </Link>
      ))}
      
    </main>
    </>
  )
}

export default App
