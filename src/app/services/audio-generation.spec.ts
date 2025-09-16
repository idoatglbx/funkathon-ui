import { TestBed } from '@angular/core/testing';

import { AudioGeneration } from './audio-generation';

describe('AudioGeneration', () => {
  let service: AudioGeneration;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioGeneration);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
