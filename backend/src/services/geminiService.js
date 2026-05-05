const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured in environment variables');
    }
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  /**
   * Analyze text input and generate report
   */
  async analyzeText(textInput) {
    try {
      // Use gemini-2.5-flash (available in your API)
      const model = this.genAI.getGenerativeModel({ 
        model: 'gemini-2.5-flash',
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      });

      const prompt = `You are an assistant that analyzes incident reports for a Philippine government reporting system.

Based on the input below, generate a response with:
1. A short and clear summary (2-3 sentences)
2. Suggested Philippine government agencies or departments that should be notified (use full names like "Department of Public Works and Highways", "Land Transportation Franchising and Regulatory Board", etc.)
3. A professional email template for reporting the issue

Input: "${textInput}"

IMPORTANT: You must respond with ONLY a valid JSON object, no other text before or after. Use this exact format:

{
  "summary": "your summary here",
  "agencies": ["Agency Name 1", "Agency Name 2"],
  "email": "your email template here"
}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      console.log('Raw Gemini response:', text);

      // Try to extract JSON from the response
      let jsonData;
      
      // Remove markdown code blocks if present
      let cleanedText = text.trim();
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/```\n?/g, '');
      }
      
      // Try to find JSON object in the text
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error('No JSON found in response:', text);
        throw new Error('Failed to parse JSON from Gemini response');
      }

      try {
        jsonData = JSON.parse(jsonMatch[0]);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Attempted to parse:', jsonMatch[0]);
        throw new Error('Failed to parse JSON from Gemini response');
      }

      // Validate required fields
      if (!jsonData.summary || !jsonData.agencies || !jsonData.email) {
        console.error('Missing required fields in response:', jsonData);
        throw new Error('Invalid response format from Gemini');
      }

      return jsonData;
    } catch (error) {
      console.error('Error analyzing text with Gemini:', error);
      throw new Error('Failed to analyze text input');
    }
  }

  /**
   * Analyze image and extract text/information
   */
  async analyzeImage(imageBuffer, mimeType, additionalText = '') {
    try {
      // Use gemini-2.5-flash for vision (supports multimodal)
      const model = this.genAI.getGenerativeModel({ 
        model: 'gemini-2.5-flash',
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      });

      const imagePart = {
        inlineData: {
          data: imageBuffer.toString('base64'),
          mimeType: mimeType,
        },
      };

      const prompt = `You are an assistant that analyzes incident reports from images for a Philippine government reporting system.

Analyze this image${additionalText ? ` and the following description: "${additionalText}"` : ''}.

Based on the image${additionalText ? ' and description' : ''}, generate a response with:
1. A short and clear summary of the incident or problem shown (2-3 sentences)
2. Suggested Philippine government agencies or departments that should be notified (use full names)
3. A professional email template for reporting the issue

IMPORTANT: You must respond with ONLY a valid JSON object, no other text before or after. Use this exact format:

{
  "summary": "your summary here",
  "agencies": ["Agency Name 1", "Agency Name 2"],
  "email": "your email template here"
}`;

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();

      console.log('Raw Gemini response:', text);

      // Try to extract JSON from the response
      let jsonData;
      
      // Remove markdown code blocks if present
      let cleanedText = text.trim();
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/```\n?/g, '');
      }
      
      // Try to find JSON object in the text
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error('No JSON found in response:', text);
        throw new Error('Failed to parse JSON from Gemini response');
      }

      try {
        jsonData = JSON.parse(jsonMatch[0]);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Attempted to parse:', jsonMatch[0]);
        throw new Error('Failed to parse JSON from Gemini response');
      }

      // Validate required fields
      if (!jsonData.summary || !jsonData.agencies || !jsonData.email) {
        console.error('Missing required fields in response:', jsonData);
        throw new Error('Invalid response format from Gemini');
      }

      return jsonData;
    } catch (error) {
      console.error('Error analyzing image with Gemini:', error);
      throw new Error('Failed to analyze image input');
    }
  }

  /**
   * Convert audio to text (transcription)
   */
  async transcribeAudio(audioBuffer, mimeType) {
    try {
      // Use Gemini 2.5 Flash for audio transcription
      const model = this.genAI.getGenerativeModel({ 
        model: 'gemini-2.5-flash',
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      });

      const audioPart = {
        inlineData: {
          data: audioBuffer.toString('base64'),
          mimeType: mimeType,
        },
      };

      const prompt = `You are a transcription assistant. Listen to this audio recording and transcribe exactly what is being said. Provide only the transcription text, nothing else.`;

      const result = await model.generateContent([prompt, audioPart]);
      const response = await result.response;
      const transcription = response.text();

      console.log('Audio transcription:', transcription);

      if (!transcription || transcription.trim().length === 0) {
        throw new Error('No transcription result');
      }

      return transcription.trim();
    } catch (error) {
      console.error('Error transcribing audio:', error);
      throw error;
    }
  }

  /**
   * Analyze audio directly and generate report
   */
  async analyzeAudio(audioBuffer, mimeType) {
    try {
      // Use Gemini 2.5 Flash for audio analysis
      const model = this.genAI.getGenerativeModel({ 
        model: 'gemini-2.5-flash',
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      });

      const audioPart = {
        inlineData: {
          data: audioBuffer.toString('base64'),
          mimeType: mimeType,
        },
      };

      const prompt = `You are an assistant that analyzes incident reports from audio recordings for a Philippine government reporting system.

Listen to this audio recording and analyze the incident or problem being reported.

Based on the audio content, generate a response with:
1. A short and clear summary of the incident or problem reported (2-3 sentences)
2. Suggested Philippine government agencies or departments that should be notified (use full names)
3. A professional email template for reporting the issue
4. The transcription of what was said in the audio

IMPORTANT: You must respond with ONLY a valid JSON object, no other text before or after. Use this exact format:

{
  "summary": "your summary here",
  "agencies": ["Agency Name 1", "Agency Name 2"],
  "email": "your email template here",
  "transcription": "the transcribed text from the audio"
}`;

      const result = await model.generateContent([prompt, audioPart]);
      const response = await result.response;
      const text = response.text();

      console.log('Raw Gemini audio response:', text);

      // Try to extract JSON from the response
      let jsonData;
      
      // Remove markdown code blocks if present
      let cleanedText = text.trim();
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/```\n?/g, '');
      }
      
      // Try to find JSON object in the text
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error('No JSON found in response:', text);
        throw new Error('Failed to parse JSON from Gemini response');
      }

      try {
        jsonData = JSON.parse(jsonMatch[0]);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Attempted to parse:', jsonMatch[0]);
        throw new Error('Failed to parse JSON from Gemini response');
      }

      // Validate required fields
      if (!jsonData.summary || !jsonData.agencies || !jsonData.email) {
        console.error('Missing required fields in response:', jsonData);
        throw new Error('Invalid response format from Gemini');
      }

      return jsonData;
    } catch (error) {
      console.error('Error analyzing audio with Gemini:', error);
      throw new Error('Failed to analyze audio input');
    }
  }
}

module.exports = new GeminiService();
