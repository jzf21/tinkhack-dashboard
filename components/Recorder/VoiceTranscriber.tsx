// components/VoiceRecorder.tsx

import { useState, useRef } from 'react';

const VoiceRecorder: React.FC = () => {
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);

    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setAudioChunks((chunks) => [...chunks, event.data]);
      }
    };

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);

      // Display the audio player
      const audioElement = document.createElement('audio');
      audioElement.controls = true;
      audioElement.src = audioUrl;
      document.body.appendChild(audioElement);

      // Send the audio to the server for transcription
      sendAudioToServer(audioBlob);
    };

    mediaRecorder.current.start();
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
    }
  };

  const sendAudioToServer = async (audioBlob: Blob) => {
    const audioBytes = await audioBlob.arrayBuffer();
    const audioArray = new Uint8Array(audioBytes);

    const response = await fetch('/api/transcribe/transcribenew', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ audio: audioArray }),
    });

    const result = await response.json();
    displayTranscription(result.transcription);
  };

  const displayTranscription = (transcription: string) => {
    console.log('Transcription:', transcription);
  };

  return (
    <div>
      <h1>Voice Recorder</h1>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
    </div>
  );
};

export default VoiceRecorder;
