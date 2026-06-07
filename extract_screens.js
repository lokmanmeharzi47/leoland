const fs = require('fs');

const data = fs.readFileSync('C:\\Users\\mehar\\.gemini\\antigravity\\brain\\397031fc-836f-497b-b64e-832b69751ae9\\.system_generated\\logs\\transcript.jsonl', 'utf8');
const lines = data.split('\n').filter(l => l.trim() !== '');

let screens = [];

for (const line of lines) {
  try {
    const obj = JSON.parse(line);
    if (obj.content && typeof obj.content === 'string' && obj.content.includes('"screens":[')) {
      // Find the JSON part
      const match = obj.content.match(/\{"screens":\[.*\]\}/);
      if (match) {
        const payload = JSON.parse(match[0]);
        screens = payload.screens;
      }
    }
  } catch (e) {
    // ignore
  }
}

if (screens.length > 0) {
  screens.forEach(s => {
    console.log(`Title: ${s.title}`);
    if (s.htmlCode) {
      console.log(`URL: ${s.htmlCode.downloadUrl}`);
    }
  });
} else {
  console.log("No screens found in transcript.");
}
