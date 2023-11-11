import { NextApiRequest, NextApiResponse } from "next";
import { twilioClient } from "../twilio";
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const { to } = req.body;

  try {
    const call = await twilioClient.calls.create({
      to: '+919562431225',
      from: '+18566723246',
      url: 'http://demo.twilio.com/docs/voice.xml', // replace with your TwiML URL
      record: true,
    });

    res.status(200).json({ message: 'Call initiated successfully', callSid: call.sid });
  } catch (error) {
    console.error('Error making call:', error);
    res.status(500).json({ error: 'Failed to initiate call' });
  }
}