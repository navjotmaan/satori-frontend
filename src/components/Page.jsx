import api from '../api/axiosInstance';
import { useState, useRef, useEffect } from "react";
import mic from '../assets/microphone.png';
import { useNavigate } from "react-router-dom";

export default function Notes({ recording, stopRecording, startRecording, loading, transcript }) {
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");
  const headingareaRef = useRef(null);
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (transcript) {
      setText((prev) => prev ? `${prev}\n${transcript}` : transcript);
    }
  }, [transcript]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = ta.scrollHeight + "px";
  }, [text]);

  useEffect(() => {
    const ta = headingareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
  }, [heading]);

  useEffect(() => {
    headingareaRef.current?.focus();
  }, []);

  const saveNote = async () => {
    await api.post('/notes/save', {
      title: heading,
      content: text,
    });

    navigate("/");
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className='min-h-screen bg-[#faf9f6] text-[#2c2825] transition-colors duration-300'>
      <div className='fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-3 border-b border-[#e8e3db] bg-[#faf9f6] transition-colors duration-300'>
        <span className='text-xs tracking-widest uppercase text-[#a89f96] font-mono'>
        {today}
        </span>

        <div className="flex gap-5">
          <img src={mic} className={`h-8 cursor-pointer ${recording ? 'animate-pulse opacity-50' : ''}`}
            title={recording ? 'Stop Recording' : 'Record Voice'}
            onClick={recording ? stopRecording : startRecording} />

          <button
            onClick={saveNote}
            className="border rounded px-2 cursor-pointer">
            Save
          </button>
        </div>
      </div>

      <div className="flex justify-center px-6 pt-24 pb-20">
        <main className="w-full max-w-2xl">
          <textarea 
            ref={headingareaRef}
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            placeholder="Title"
            className='
              w-full border-none resize-none
              overflow-hidden outline-none text-2xl font-semibold
              placeholder:text-[#79736f]'
          />
          
          {recording ? <p className="text-orange-500">Listening...</p> : '' } 
          {loading && <p className="text-blue-500">Transcribing voice...</p>}

          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start writing…"
            className='
              w-full min-h-[calc(100vh-140px)] text-[18px]
              overflow-hidden
              bg-transparent border-none outline-none resize-none
              leading-[1.9] tracking-[0.01em]
              placeholder:text-[#a89f96]
              transition-colors duration-300
            '
          />

        </main>
      </div>
    </div>
  );
}
