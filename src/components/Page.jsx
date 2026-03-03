import axios from "axios";
import { useState, useRef, useEffect } from "react";

export default function Notes() {
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");
  const headingareaRef = useRef(null);
  const textareaRef = useRef(null);

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
    const { data } = await axios.post('/save', {
      title: heading,
      content: text,
    });
    console.log(data);
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

        <button
          onClick={saveNote}
          className="border rounded px-2">
          Save
        </button>
      </div>

      <div className="flex justify-center px-6 pt-24 pb-20">
        <div className="w-full max-w-2xl">
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
        </div>
      </div>
    </div>
  );
}
