import homeImage from '../assets/HomeImage.png';
import journals from '../assets/journals.png';
import quotes from '../assets/quotes.png';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../api/AuthContext';

const Home = () => {
  const { accessToken } = useAuth();

  if (accessToken) return <Navigate to='/dashboard' replace />;

  return (
    <div className='relative font-body bg-[#FFFFFF] w-full h-full'>

      <img src={homeImage} alt="Home" className='object-contain w-full h-full' />

      <span className='absolute w-[100%] top-5 md:top-10 text-[#FDF0D5] flex justify-between px-10 items-center'>
        <h1 className='text-3xl md:text-6xl font-home tracking-[0.2em]'>Satori</h1>

        <span className='flex gap-5 md:gap-10 md:text-lg items-center'>
          <Link to="/signin">Sign in</Link>
          <Link to="/signup">
            <button className='bg-[#669bbc] py-1 px-4 rounded-xl cursor-pointer'>Sign up</button>    
          </Link>
        </span>
        
      </span>

      <div className='md:my-50 my-30 md:p-30 md:px-40 text-start bg-[#F8F9FA] md:p-20 p-10'>
        <h2 className='md:text-7xl/20 text-5xl font-home'>Give your mind a space without distractions</h2>
        <p className='text-xl text-[#6B705C] my-10 md:w-[60%]'>Digital noise shouldn't drown out your best ideas. Create a sanctuary for your thoughts, essays, and daily reflections.</p>

        <Link 
          to="/signin" 
          className="group relative inline-block px-8 py-3 overflow-hidden bg-[#003049] text-white rounded-xl md:text-lg isolation-auto"
        >
          <span className="absolute inset-0 w-full h-full bg-[#023e8a] transition-transform duration-500 -translate-x-full group-hover:translate-x-0"></span>
          
          <span className="relative z-10">Start writing</span>
        </Link>

      </div>

      <div className='flex flex-col gap-10 md:flex-row items-center justify-between px-10 md:px-40'>
        <div className='text-start text-lg md:w-[50%]'>
          <h3 className='text-4xl font-home'>Document your journey</h3>
          <p className='my-5 text-[#495057]'>Whether it’s a technical deep-dive or a personal essay, capture your learnings in a clean, markdown-friendly editor that respects your focus.</p>
          <p className='text-[#003049] font-display text-2xl'>Built for the long-form thinker</p>
        </div>
        
        <img src={journals} alt="Journal" className='object-contain w-[50%] md:w-[25%] rounded-[20px]' />
      </div>

      <div className='flex flex-col-reverse gap-10 md:flex-row items-center justify-between px-10 md:px-40 my-20'>
        <img src={quotes} alt="Quotes" className='object-contain w-[50%] md:w-[25%] rounded-[20px]' />

        <div className='text-start text-lg md:w-[50%]'>
          <h3 className='text-4xl font-home'>Capture the spark</h3>
          <p className='my-5 text-[#495057]'>Random thoughts, sudden inspirations, or favorite quotes from your latest read. Save them instantly before they vanish into the noisy world.</p>
          <p className='text-[#003049] font-display text-2xl'>Never lose a "lightbulb" moment</p>
        </div>
      </div>

      <footer className='bg-[#003049] text-white p-5 text-center'>
        <p>&copy; 2026 Satori. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;