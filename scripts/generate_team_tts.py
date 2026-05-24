"""
Generate MP3 intros from plain-text transcripts using gTTS (Google Text-to-Speech).

Usage:
1. Create a virtualenv (recommended) and install dependencies:
   python -m venv .venv
   .\.venv\Scripts\activate
   pip install -r requirements.txt

2. Run the script from the repository root:
   python scripts/generate_team_tts.py

The script looks for transcript files in `audio/` named like `<name>-transcript.txt`
and writes `<name>-intro.mp3` next to them (e.g. `aylin-transcript.txt` -> `aylin-intro.mp3`).

Notes:
- Requires internet access for gTTS.
- gTTS uses Google's TTS; respect terms of service.
"""

import os
from gtts import gTTS

ROOT = os.path.dirname(os.path.dirname(__file__))
AUDIO_DIR = os.path.join(ROOT, 'audio')

if not os.path.isdir(AUDIO_DIR):
    print('Audio directory not found:', AUDIO_DIR)
    raise SystemExit(1)

files = [f for f in os.listdir(AUDIO_DIR) if f.endswith('-transcript.txt')]
if not files:
    print('No transcript files found in', AUDIO_DIR)
    raise SystemExit(0)

for txt in files:
    txt_path = os.path.join(AUDIO_DIR, txt)
    name = txt.replace('-transcript.txt', '')
    out_mp3 = os.path.join(AUDIO_DIR, f'{name}-intro.mp3')

    with open(txt_path, 'r', encoding='utf-8') as fh:
        text = fh.read().strip()
    if not text:
        print('Skipping empty transcript:', txt)
        continue

    try:
        tts = gTTS(text=text, lang='en')
        tts.save(out_mp3)
        print('Created', out_mp3)
    except Exception as e:
        print('Failed to create', out_mp3, '->', e)
