# Funkathon UI - Text-to-Speech Web Application

A modern Angular application for converting text to speech using external API endpoints.

## Features

- **Text-to-Speech Conversion**: Convert text to audio using configurable parameters
- **Voice Selection**: Support for multiple voices and languages
- **Audio Playback**: Built-in audio player functionality
- **Settings Management**: Persistent user preferences
- **Modern Angular**: Built with Angular 20.3.0 using standalone components

## Project Structure

```
src/
├── app/
│   ├── models/
│   │   └── text-to-speech.models.ts    # TypeScript interfaces and models
│   ├── services/
│   │   └── text-to-speech.ts          # Main TTS service
│   ├── app.ts                         # Root component
│   ├── app.config.ts                  # App configuration
│   └── app.routes.ts                  # Routing configuration
├── environments/
│   ├── environment.ts                 # Development environment config
│   └── environment.prod.ts            # Production environment config
└── styles.scss                        # Global styles
```

## Setup Instructions

1. **Configure API Endpoints**: Update the environment files with your TTS API endpoints:
   - `src/environments/environment.ts` (development)
   - `src/environments/environment.prod.ts` (production)

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm start
   ```

## API Integration

The application expects your TTS API to provide:

### Text-to-Speech Endpoint
- **URL**: `{apiUrl}/api/text-to-speech`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "text": "Hello world",
    "voice": "en-US-Standard-A",
    "speed": 1.0,
    "pitch": 1.0,
    "volume": 1.0,
    "language": "en-US",
    "format": "mp3"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "audioUrl": "https://example.com/audio.mp3",
    "audioData": "data:audio/mp3;base64,...",
    "duration": 2.5,
    "format": "mp3"
  }
  ```

### Voices Endpoint
- **URL**: `{apiUrl}/api/voices`
- **Method**: GET
- **Response**:
  ```json
  [
    {
      "id": "en-US-Standard-A",
      "name": "English (US) - Female",
      "language": "en-US",
      "gender": "female",
      "description": "Standard female voice"
    }
  ]
  ```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
