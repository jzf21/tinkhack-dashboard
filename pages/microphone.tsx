import React, { useState } from 'react';
import AudioRecorder from '../components/Microphone/Microphone';
import Recorder from '../components/Recorder/Recorder';
import VoiceRecorder from '../components/Recorder/VoiceTranscriber';

const RecordAudio: React.FC = () => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [result,setResult] = useState<string>("");

// pages/RecordAudio.tsx
const handleRecordingComplete = async (audioBlob: Blob) => {
  try {
    const audioUrl = URL.createObjectURL(audioBlob);
    setAudioUrl(audioUrl);

    // Send a POST request to the transcribe API
    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.wav');  // Provide a filename for the blob

    const response = await fetch('/api/transcribe/transcribe', {
      method: 'POST',
      body: formData,
    });
    console.log('Response:', response);

    if (response.ok) {
      const result = await response.json();
      console.log('Transcription:', result.transcription);
    } else {
      console.error('Error during transcription:', response.statusText);
    }
  } catch (error) {
    console.error('Error during transcription:', error);
  }
};

  return (
    <div>
      <h1>Record Audio Page</h1>
      <VoiceRecorder/>
      {/* <AudioRecorder onRecordingComplete={handleRecordingComplete} /> */}

      {audioUrl && (
        <div>
          <h2>Recorded Audio</h2>
          <audio controls>
            <source src={audioUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      {/* <Recorder setSymptoms={setResult}/> */}
      {result}
    </div>
  );
};

export default RecordAudio;
