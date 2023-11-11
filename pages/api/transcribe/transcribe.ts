// pages/api/transcribe.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { SpeechClient } from '@google-cloud/speech';

// Your Google Cloud project ID
const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;

// Create a Google Cloud Speech-to-Text client
const speechClient = new SpeechClient({
  projectId,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { audio } = req.body;
      console.log('audio');

      if (!audio) {
        res.status(400).json({ error: 'Audio data is missing.' });
        return;
      }

      const recognitionConfig = {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US',
      };

      const request = {
        audio: {
          content: audio,
        },
        config: recognitionConfig,
      };

      // Transcribe the audio
      const [response] = await speechClient.recognize(request);

      const transcription = response.results
        .map((result) => result.alternatives[0].transcript)
        .join('\n');

      res.status(200).json({ transcription });
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error during transcription:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
