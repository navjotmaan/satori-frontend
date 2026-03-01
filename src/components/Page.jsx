import axios from "axios";
import { useState, useRef, useEffect } from "react";

export default function Notes() {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = ta.scrollHeight + "px";
  }, [text]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const saveNote = async () => {
    const { data } = await axios.post('/save', {
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
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start writing…"
            className='
              w-full min-h-[calc(100vh-140px)]
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
