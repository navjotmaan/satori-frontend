import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './App.css'

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      const { data } = await axios.get('/notes');
      setNotes(data);
      console.log(data);
    }

    getNotes();
  }, []);

  return (
    <>
    <h1 className='font-semibold'>My Life's Diary</h1>
    <p>We write to taste life twice.</p>
    <Link to='new' className='border p-1'>New</Link>

    <main>
      {notes.map(note => (
        <div key={note.id}>
          <p>{note.content}</p>
        </div>
      ))}
      
    </main>
    </>
  )
}

export default App
