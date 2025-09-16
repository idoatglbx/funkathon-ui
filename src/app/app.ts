import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AudioGenerationService, AudioGenerationRequest } from './services/audio-generation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('funkathon-ui');
  
  inputText = '';
  targetAudience = 'internal';
  granulationLevel = 'highLevel';
  customerSegment = 'retailEcommerce';
  episodeLength = 3;
  isLoading = false;
  generatedAudioBlob: Blob | null = null;
  showDownloadButton = false;

  constructor(private audioGenerationService: AudioGenerationService) {}

  generateAudio() {
    if (!this.inputText.trim()) {
      return;
    }

    this.isLoading = true;
    this.showDownloadButton = false;
    this.generatedAudioBlob = null;
    
    const request: AudioGenerationRequest = {
      text: this.inputText,
      audienceType: this.targetAudience,
      persona: this.granulationLevel,
      segment: this.customerSegment,
      length: this.episodeLength
    };
    
    this.audioGenerationService.generateAudio(request).subscribe({
      next: (blob) => {
        this.isLoading = false;
        this.generatedAudioBlob = blob;
        this.showDownloadButton = true;
        console.log('Audio generated successfully');
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Audio Generation Error:', error);
        alert('Error generating audio: ' + error.message);
      }
    });
  }

  downloadAudio() {
    if (this.generatedAudioBlob) {
      const filename = `audio-${this.targetAudience}-${this.granulationLevel}-${Date.now()}.mp3`;
      this.audioGenerationService.downloadAudio(this.generatedAudioBlob, filename);
    }
  }
}
