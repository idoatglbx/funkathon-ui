import { Component, OnInit, OnDestroy, signal, ElementRef } from '@angular/core';
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
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('funkathon-ui');
  
  inputText = '';
  targetAudience = 'internal';
  granulationLevel = 'highLevel';
  customerSegment = 'retailEcommerce';
  episodeLength = 3;
  isLoading = false;
  generatedAudioBlob: Blob | null = null;
  showDownloadButton = false;
  showAudioPlayer = false;
  audioUrl: string | null = null;
  isDarkMode = false;

  constructor(private audioGenerationService: AudioGenerationService, private elementRef: ElementRef) {
    this.initializeDarkMode();
  }

  ngOnInit() {
    this.applyDarkMode();
  }

  initializeDarkMode() {
    // Check localStorage for saved preference, default to system preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      this.isDarkMode = savedMode === 'true';
    } else {
      // Check system preference
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.applyDarkMode();
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }

  applyDarkMode() {
    if (this.isDarkMode) {
      this.elementRef.nativeElement.classList.add('dark-mode');
    } else {
      this.elementRef.nativeElement.classList.remove('dark-mode');
    }
  }

  generateAudio() {
    if (!this.inputText.trim()) {
      return;
    }

    this.isLoading = true;
    this.showDownloadButton = false;
    this.generatedAudioBlob = null;
    
    const request: AudioGenerationRequest = {
      text: this.inputText,
      target: this.targetAudience,
      persona: this.granulationLevel,
      segment: this.customerSegment,
      lengthMinutes: this.episodeLength
    };
    
    this.audioGenerationService.generateAudio(request).subscribe({
      next: (blob) => {
        this.isLoading = false;
        this.generatedAudioBlob = blob;
        this.showDownloadButton = true;
        
        // Create audio URL for playback
        this.audioUrl = this.audioGenerationService.createAudioUrl(blob);
        this.showAudioPlayer = true;
        console.log('Audio generated successfully');
        
        // Scroll to the generated content section after a short delay to ensure DOM is updated
        setTimeout(() => {
          this.scrollToGeneratedContent();
        }, 100);
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

  scrollToGeneratedContent() {
    const element = document.getElementById('generated-content');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  }

  ngOnDestroy() {
    // Clean up audio URL to prevent memory leaks
    if (this.audioUrl) {
      this.audioGenerationService.revokeAudioUrl(this.audioUrl);
    }
  }
}
