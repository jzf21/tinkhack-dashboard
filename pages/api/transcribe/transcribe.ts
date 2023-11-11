// pages/api/transcribe.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const recognition = new (window as any).webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  const handleSpeechRecognitionResult = (event: any) => {
    const { transcript } = event.results[0][0];
    recognition.stop();
    res.status(200).json({ transcript });
  };

  const handleSpeechRecognitionEnd = () => {
    recognition.stop();
  };

  recognition.addEventListener('result', handleSpeechRecognitionResult);
  recognition.addEventListener('end', handleSpeechRecognitionEnd);

  if (req.method === 'POST') {
    recognition.start();
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
