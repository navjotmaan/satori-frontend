import { useState, useRef } from 'react';
import Notes from '../Page';
import api from '../../api/axiosInstance';

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
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
    } catch (err) {
      console.error("Microphone access denied", err);
    }
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
      const response = await api.post('/api/transcribe', formData, {
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
    <Notes
      recording={recording}
      stopRecording={stopRecording}
      startRecording={startRecording}
      loading={loading}
      transcript={transcript} 
    />
  )

};

export default AudioRecorder;