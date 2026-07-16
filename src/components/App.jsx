import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from "../api/axiosInstance";
import { useQuery } from '@tanstack/react-query';

function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const { data } = await api.get('/notes');
      return data.notes;
    },
  });

  const notes = data ?? [];

  function getDate(date) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
    });
  }

  if (isLoading) return (
    <div className="flex flex-col gap-5 items-center justify-center mt-30">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#4B2E2B] border-t-transparent"></div>
    </div> 
  )
  if (isError) return <p>Something went wrong loading your notes.</p>;

  return (
    <div className='w-full min-h-[100vh] p-10'>

      <main className='flex flex-wrap justify-center md:justify-start gap-10'>
        {notes.length !== 0 ? (
          notes.map(note => (
            <Link to={`/${note.id}`} key={note.id} className='w-full md:w-[45%] shadow-[0_6px_4px_rgba(0,0,0,0.2)] flex flex-col rounded-[30px] p-6 transform active:scale-95 transition-transform duration-300 hover:scale-105'>
              <span className='flex pb-3 justify-between'>
                <p className='text-xl text-[#B5651D] font-semibold'>{note.title}</p>
                <p className='flex items-center bg-[#6B705C] px-5 h-5 text-white text-sm rounded-[30px]'>{getDate(note.created_at)}</p>
              </span>
              <p className='text-start'>{note.content.substring(0, 100)}...</p>
            </Link>
          ))
        ) : 
          <p className='m-auto mt-20 text-[#919191] font-handwriting'>There is no journal yet. Create one.</p>
        }
        
      </main>
  </div>
  )
};

export default App;
