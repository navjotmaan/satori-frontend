import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from "../api/axiosInstance";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      const { data } = await api.get('/notes');
      setNotes(data.notes);
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
    <div className='w-full min-h-[100vh] p-10'>

      <main className='flex flex-wrap justify-center md:justify-start gap-10'>
        {notes.length !== 0 ? (
          notes.map(note => (
            <Link to={`/${note.id}`} key={note.id} className='w-full md:w-[45%] h-[] border border-[#8C5A3C] shadow-[0_6px_4px_rgba(0,0,0,0.2)] flex flex-col rounded-[30px] p-6'>
              <span className='flex pb-3 justify-between'>
                <p className='text-xl text-[#B5651D] font-semibold'>{note.title}</p>
                <p className='flex items-center bg-[#6B705C] px-5 h-5 text-white text-sm rounded-[30px]'>{getDate(note.created_at)}</p>
              </span>
              <p className='text-start'>{note.content.substring(0, 100)}...</p>
            </Link>
          ))
        ) : 
          <p className='m-auto mt-20 text-[#919191] font-handwriting'>Your journals will appear here.</p>
        }
        
      </main>
  </div>
  )
};

export default App;
