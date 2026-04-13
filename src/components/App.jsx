import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from "../api/axiosInstance";
import { useAuth } from '../api/AuthContext';

function App() {
  const [notes, setNotes] = useState([]);
  const [userName, setUserName] = useState('');

  const { logout } = useAuth();

  useEffect(() => {
    const getNotes = async () => {
      const { data } = await api.get('/notes');
      const user = data[0].name;
      setUserName(user.slice(0, user.indexOf(" ")));
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
    <div className='w-full min-h-[100vh] p-10'>
      <header className='text-left pb-10'>
        <h1 className='font-pro text-5xl text-[#2B2D42]'>{userName}'s Media</h1>
        <p className='text-3xl text-[#6B705C] font-display'>We write to taste life twice.</p>
      </header>

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
          <p className='m-auto mt-10 font-handwriting'>Your journals will appear here.</p>
        }
        
      </main>
  </div>
  )
};

export default App;
