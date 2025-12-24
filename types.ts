
// Common types used across the application

export interface ProcessedImage {
  id: string;
  url: string;
  originalFile?: File;
}

export interface GenerationState {
  isLoading: boolean;
  error: string | null;
  resultUrls: string[]; // Changed from single URL to array
}

export type AspectRatio = '1:1' | '3:4' | '4:3' | '9:16' | '16:9';

export type ThemeMode = 'Cerah' | 'Gelap' | 'Campur';

export interface OutputConfig {
  aspectRatio: AspectRatio;
  count: number;
  theme: ThemeMode;
}
