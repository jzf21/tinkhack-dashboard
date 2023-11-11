// pages/api/transcribe.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { SpeechClient } from '@google-cloud/speech';

const client = new SpeechClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const audioBytes = req.body.audio;
    console.log(req.body)
    const audio = {
      content: audioBytes.toString('base64'),
    };

    const config = {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
    };

    const request = {
      audio: audio,
      config: config,
    };

    const [response] = await client.recognize(request);
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join('\n');

    console.log('Transcription:', transcription);
    res.status(200).json({ transcription });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
