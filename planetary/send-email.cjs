const fs = require('fs');

const pdfPath = 'C:/Users/migue/.openclaw/workspace/mr-resume/planetary/mr_resume_planetary_v5.pdf';
const pdfData = fs.readFileSync(pdfPath);
const boundary = 'boundary_' + Date.now();

const body = 'Updated with product owner emphasis per recruiter message.';

const readFile = (data) => data.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');

const msg = [
  'From: xolo.mc7@gmail.com',
  'To: miguelcodes7@gmail.com',
  'Subject: Resume v5 Planetary attached',
  'MIME-Version: 1.0',
  'Content-Type: multipart/mixed; boundary="' + boundary + '"',
  '',
  '--' + boundary,
  'Content-Type: text/plain; charset=utf-8',
  '',
  body,
  '',
  '--' + boundary,
  'Content-Type: application/pdf; name="mr_resume_planetary_v5.pdf"',
  'Content-Transfer-Encoding: base64',
  'Content-Disposition: attachment; filename="mr_resume_planetary_v5.pdf"',
  '',
  readFile(pdfData),
  '',
  '--' + boundary + '--'
].join('\r\n');

const jsonPayload = { raw: readFile(Buffer.from(msg)) };
const json = JSON.stringify(jsonPayload);
fs.writeFileSync('C:/Users/migue/.openclaw/workspace/mr-resume/planetary/email-payload.json', json);
console.log('Payload created');
