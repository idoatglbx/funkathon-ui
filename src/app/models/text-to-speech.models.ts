/**
 * Text-to-Speech related models and interfaces
 */

export interface TextToSpeechRequest {
  text: string;
  voice?: string;
  speed?: number;
  pitch?: number;
  volume?: number;
  language?: string;
  format?: 'mp3' | 'wav' | 'ogg';
}

export interface TextToSpeechResponse {
  audioUrl?: string;
  audioData?: string;
  success: boolean;
  message?: string;
  duration?: number;
  format?: string;
}

export interface VoiceOption {
  id: string;
  name: string;
  language: string;
  gender?: 'male' | 'female' | 'neutral';
  description?: string;
}

export interface TextToSpeechSettings {
  defaultVoice?: string;
  defaultSpeed?: number;
  defaultPitch?: number;
  defaultVolume?: number;
  defaultLanguage?: string;
  defaultFormat?: 'mp3' | 'wav' | 'ogg';
}
