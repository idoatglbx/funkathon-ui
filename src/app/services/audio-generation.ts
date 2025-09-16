import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AudioGenerationRequest {
  text: string;
  target: string;
  persona: string;
  segment: string;
  lengthMinutes: number;
}

export interface AudioGenerationResponse {
  success: boolean;
  audioUrl?: string;
  audioBlob?: Blob;
  filename?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AudioGenerationService {
  private readonly apiEndpoint = `${environment.apiUrl}${environment.audioGenerateEndpoint}`;

  constructor(private http: HttpClient) {}

  /**
   * Generates audio from text using the configured API endpoint
   * @param request - The audio generation request parameters
   * @returns Observable containing the audio response
   */
  generateAudio(request: AudioGenerationRequest): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Log the payload before sending the request
    console.log('🎵 Audio Generation Request Payload:', {
      endpoint: this.apiEndpoint,
      payload: request,
      headers: { 'Content-Type': 'application/json' }
    });

    return this.http.post(this.apiEndpoint, request, { 
      headers,
      responseType: 'blob'
    });
  }

  /**
   * Downloads audio file from blob
   * @param blob - The audio blob data
   * @param filename - The filename for the download
   */
  downloadAudio(blob: Blob, filename: string = 'generated-audio.mp3'): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  /**
   * Creates an audio URL from blob for playback
   * @param blob - The audio blob data
   * @returns URL for audio playback
   */
  createAudioUrl(blob: Blob): string {
    return window.URL.createObjectURL(blob);
  }

  /**
   * Revokes an audio URL to free memory
   * @param url - The audio URL to revoke
   */
  revokeAudioUrl(url: string): void {
    window.URL.revokeObjectURL(url);
  }
}
