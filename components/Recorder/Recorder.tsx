import React, { useState, useEffect } from "react";
import { BsMicFill, BsMicMuteFill } from "react-icons/bs";
import { toast } from "react-toastify";

interface RecorderProps {
  setSymptoms: React.Dispatch<React.SetStateAction<string>>;
}

const Recorder: React.FC<RecorderProps> = ({ setSymptoms }) => {
  const [transcribedText, setTranscribedText] = useState<string>("");
  const [textAreaText, setTextAreaText] = useState<string>("");
  const [recording, setRecording] = useState<boolean>(false);

  const handleSpeechRecognitionResult = (event: SpeechRecognitionEvent) => {
    // Extract the transcribed text from the event object
    const { transcript } = event.results[0][0];
    recognition.stop();
    console.log({ transcript, transcribedText });

    setTextAreaText((prevText) => prevText + transcript + " ");
    setSymptoms((prevText) => prevText + transcript + " ");
    setTranscribedText(transcript);
  };

  useEffect(() => {
    setSymptoms(textAreaText);
  }, [textAreaText, setSymptoms]);

  const handleSpeechRecognitionEnd = () => {
    setRecording(false);
    recognition.stop();
  };

  let recognition: SpeechRecognition;
  try {
    recognition = new (window as any).webkitSpeechRecognition();
  } catch (error) {
    toast(
      "Your browser is not supported. Please use the latest version of Chrome browser!"
    );
  }

  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = "en-US";
  recognition?.addEventListener("result", handleSpeechRecognitionResult);
  recognition?.addEventListener("end", handleSpeechRecognitionEnd);

  const handleStartTranscription = () => {
    // Start the speech recognition and set the recording state to true
    setRecording(true);
    recognition.start();
  };

  const handleStopTranscription = () => {
    console.log("stopping");
    recognition.stop();
  };

  // Add event listener for keydown event on the document object
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.keyCode === 32) {
        handleStartTranscription();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className='h-32 w-full flex flex-col justify-center items-center'>
      <button
        onClick={recording ? handleStopTranscription : handleStartTranscription}
      >
        {recording ? (
          <BsMicFill className='text-4xl' />
        ) : (
          <BsMicMuteFill className='text-4xl' />
        )}
      </button>
      <p>{recording ? "Listening..." : "Stopped Listening..."}</p>
      {/* <p>{textAreaText}</p> */}
    
    </div>
  );
};

export default Recorder;
