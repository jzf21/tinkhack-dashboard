// twilioClient.js

import twilio from 'twilio';

const accountSid = 'AC5518a7ccdf00157c52c608ce77950b0d';
const authToken = 'b33b2104e8674bcc17af4e1e80d9906b';

export const twilioClient = twilio(accountSid, authToken);


