import { useState, useRef } from 'react';
import axios from 'axios';

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    audioChunks.current = [];

    mediaRecorder.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorder.current.onstop = async () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
      await uploadAudio(audioBlob);
    };

    mediaRecorder.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();
    setRecording(false);
  };

  const uploadAudio = async (blob) => {
    setLoading(true);
    const formData = new FormData();
    
    formData.append('audio', blob, 'user_recording.mp3');

    try {
      const response = await axios.post('http://localhost:3000/api/transcribe', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setTranscript(response.data.text);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-5 text-center'>
      <h2 className='text-lg font-semibold'>Voice-to-Text</h2>
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? 'Stop & Transcribe' : 'Start Recording'}
      </button>
      
      {loading && <p>Processing audio with AssemblyAI...</p>}
      
      <div className='mt-5 border border-gray-300 p-2'>
        <strong>Transcript:</strong>
        <p>{transcript || "Your text will appear here..."}</p>
      </div>
    </div>
  );
};

export default AudioRecorder;