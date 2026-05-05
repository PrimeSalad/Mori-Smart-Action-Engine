const speech = require('@google-cloud/speech');
const fs = require('fs');
const path = require('path');

class SpeechService {
  constructor() {
    // Initialize Google Speech-to-Text client
    // Note: Requires GOOGLE_APPLICATION_CREDENTIALS environment variable
    // pointing to service account JSON file
    try {
      this.client = new speech.SpeechClient();
    } catch (error) {
      console.warn('Google Speech-to-Text client not initialized:', error.message);
      this.client = null;
    }
  }

  /**
   * Transcribe audio buffer to text
   */
  async transcribeAudio(audioBuffer, mimeType = 'audio/webm') {
    if (!this.client) {
      throw new Error('Speech-to-Text service not configured. Please set GOOGLE_APPLICATION_CREDENTIALS.');
    }

    try {
      // Convert mime type to encoding
      let encoding = 'WEBM_OPUS';
      if (mimeType.includes('wav')) {
        encoding = 'LINEAR16';
      } else if (mimeType.includes('mp3')) {
        encoding = 'MP3';
      } else if (mimeType.includes('ogg')) {
        encoding = 'OGG_OPUS';
      }

      const audio = {
        content: audioBuffer.toString('base64'),
      };

      const config = {
        encoding: encoding,
        sampleRateHertz: 48000,
        languageCode: 'en-US',
        alternativeLanguageCodes: ['fil-PH', 'tl-PH'], // Filipino/Tagalog support
        enableAutomaticPunctuation: true,
      };

      const request = {
        audio: audio,
        config: config,
      };

      const [response] = await this.client.recognize(request);
      const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');

      if (!transcription) {
        throw new Error('No transcription result');
      }

      return transcription;
    } catch (error) {
      console.error('Error transcribing audio:', error);
      throw new Error('Failed to transcribe audio');
    }
  }

  /**
   * Fallback: Simple mock transcription for development
   */
  async mockTranscribe() {
    return 'This is a mock transcription. Please configure Google Speech-to-Text API for actual transcription.';
  }
}

module.exports = new SpeechService();
