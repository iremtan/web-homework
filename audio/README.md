Place team audio recordings and transcripts here.

Files created by the assistant as placeholders:
- aylin-intro.mp3 (placeholder file — replace with real MP3)
- deniz-intro.mp3 (placeholder file — replace with real MP3)
- selin-intro.mp3 (placeholder file — replace with real MP3)
- aylin-transcript.txt (English transcript)
- deniz-transcript.txt (English transcript)
- selin-transcript.txt (English transcript)

How to add real audio files:
- Recommended format: MP3 (44.1 kHz, 128-192 kbps), 10–30 seconds per intro.
- Use a recording app or online TTS service. Example command with `ffmpeg` to convert WAV to MP3:

```
ffmpeg -i aylin-intro.wav -ar 44100 -ac 1 -b:a 128k aylin-intro.mp3
```

Quick TTS options:
- Online: https://ttsmp3.com, https://play.ht (export MP3)
- Local (macOS): `say -o aylin.aiff "Hello..."` then convert with `ffmpeg` to MP3.

After placing real MP3 files with the same names, the audio players on the About page will play them automatically when the user clicks play.

Generate MP3 files locally using Python (optional)
-----------------------------------------------
If you'd like the assistant to synthesize English MP3 intros automatically on your machine, run the included script.

1. Ensure Python 3.8+ is installed.
2. Create and activate a virtual environment, then install dependencies:

```powershell
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
```

3. Run the generator script from the repository root:

```powershell
python scripts/generate_team_tts.py
```

This will read `*.txt` transcripts in the `audio/` folder and write corresponding `*-intro.mp3` files (English, via Google TTS). The script requires internet access.
