const fs = require('fs');
const path = require('path');

// Read files
const pdfPath = 'C:\\Users\\migue\\.openclaw\\workspace\\mr-resume\\mr_resume_strata.pdf';
const docxPath = 'C:\\Users\\migue\\.openclaw\\workspace\\mr-resume\\mr_resume_strata_beautified.docx';

const pdfData = fs.readFileSync(pdfPath);
const docxData = fs.readFileSync(docxPath);

const boundary = 'boundary_' + Date.now();
const subject = 'Application Support Engineer Resume - STRATA Trust';

const body = `Hi Miguel,

Your tailored resume for the Application Support Engineer position at STRATA Trust Company is ready.

ATS SCORES:
- Overall: 41/100
- ATS Match: 20/100
- Keyword Match: 38/100
- Impact: 34/100
- Clarity: 100/100

KEY MATCHES: application, support, engineer, sql, database, troubleshooting, 2+ years, 3+ years

The resume highlights your SQL, API integration, troubleshooting, and stakeholder communication experience. Development work is framed as 20-35% of the role (matching JD).

Files attached:
- mr_resume_strata.pdf (clean LaTeX output)
- mr_resume_strata_beautified.docx (Word version)

Apply here: https://www.indeed.com/viewjob?jk=4e71c0ac4eef8bd7

Good luck!

— Xolo`;

// Build multipart
const readFile = (data) => data.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');

const msg = [
  'From: xolo.mc7@gmail.com',
  'To: miguelcodes7@gmail.com',
  'Subject: ' + subject,
  'MIME-Version: 1.0',
  'Content-Type: multipart/mixed; boundary="' + boundary + '"',
  '',
  '--' + boundary,
  'Content-Type: text/plain; charset=utf-8',
  '',
  body,
  '',
  '--' + boundary,
  'Content-Type: application/pdf; name="mr_resume_strata.pdf"',
  'Content-Transfer-Encoding: base64',
  'Content-Disposition: attachment; filename="mr_resume_strata.pdf"',
  '',
  readFile(pdfData),
  '',
  '--' + boundary,
  'Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document; name="mr_resume_strata_beautified.docx"',
  'Content-Transfer-Encoding: base64',
  'Content-Disposition: attachment; filename="mr_resume_strata_beautified.docx"',
  '',
  readFile(docxData),
  '',
  '--' + boundary + '--'
].join('\r\n');

const json = JSON.stringify({ raw: readFile(Buffer.from(msg)) });
fs.writeFileSync('C:\\Users\\migue\\.openclaw\\workspace\\mr-resume\\email-payload.json', json);
console.log('Payload created');
