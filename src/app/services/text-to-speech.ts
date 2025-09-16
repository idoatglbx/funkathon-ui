import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TextToSpeechRequest, TextToSpeechResponse, VoiceOption, TextToSpeechSettings } from '../models/text-to-speech.models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {
  private readonly apiEndpoint = `${environment.apiUrl}/api/text-to-speech`;
  private readonly voicesEndpoint = `${environment.apiUrl}/api/voices`;
  private settings: TextToSpeechSettings = {};

  constructor(private http: HttpClient) {
    this.loadSettings();
  }

  /**
   * Converts text to speech using the configured API endpoint
   * @param request - The text-to-speech request parameters
   * @returns Observable containing the audio response
   */
  convertTextToSpeech(request: TextToSpeechRequest): Observable<TextToSpeechResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<TextToSpeechResponse>(this.apiEndpoint, request, { headers });
  }

  /**
   * Plays audio from a URL or base64 data
   * @param audioData - Either a URL or base64 encoded audio data
   */
  playAudio(audioData: string): void {
    const audio = new Audio();
    
    if (audioData.startsWith('data:')) {
      audio.src = audioData;
    } else {
      audio.src = audioData;
    }
    
    audio.play().catch(error => {
      console.error('Error playing audio:', error);
    });
  }

  /**
   * Downloads audio file
   * @param audioData - The audio data (URL or base64)
   * @param filename - The filename for the download
   */
  downloadAudio(audioData: string, filename: string = 'speech.mp3'): void {
    const link = document.createElement('a');
    
    if (audioData.startsWith('data:')) {
      link.href = audioData;
    } else {
      link.href = audioData;
    }
    
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Gets available voices from the API
   * @returns Observable containing the list of available voices
   */
  getAvailableVoices(): Observable<VoiceOption[]> {
    return this.http.get<VoiceOption[]>(this.voicesEndpoint);
  }

  /**
   * Loads settings from localStorage
   */
  private loadSettings(): void {
    const savedSettings = localStorage.getItem('tts-settings');
    if (savedSettings) {
      this.settings = JSON.parse(savedSettings);
    }
  }

  /**
   * Saves settings to localStorage
   * @param settings - The settings to save
   */
  saveSettings(settings: TextToSpeechSettings): void {
    this.settings = { ...this.settings, ...settings };
    localStorage.setItem('tts-settings', JSON.stringify(this.settings));
  }

  /**
   * Gets current settings
   * @returns Current settings
   */
  getSettings(): TextToSpeechSettings {
    return { ...this.settings };
  }

  /**
   * Creates a request with default settings applied
   * @param text - The text to convert
   * @param overrides - Optional overrides for default settings
   * @returns TextToSpeechRequest with defaults applied
   */
  createRequest(text: string, overrides: Partial<TextToSpeechRequest> = {}): TextToSpeechRequest {
    return {
      text,
      voice: this.settings.defaultVoice,
      speed: this.settings.defaultSpeed,
      pitch: this.settings.defaultPitch,
      volume: this.settings.defaultVolume,
      language: this.settings.defaultLanguage,
      format: this.settings.defaultFormat,
      ...overrides
    };
  }
}
