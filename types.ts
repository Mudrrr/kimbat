export enum ViewState {
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  PROGRAMS = 'PROGRAMS',
  WORKOUT_PLAYER = 'WORKOUT_PLAYER',
  PROGRESS = 'PROGRESS',
  CHAT = 'CHAT',
  PROFILE = 'PROFILE'
}

export interface UserProfile {
  name: string;
  age: number;
  hasDiagnosis: boolean;
  goals: string[];
  streak: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface SymptomLog {
  date: string;
  discomfortLevel: number; // 1-10
  mood: number; // 1-10
  notes: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  level: string;
  durationWeeks: number;
  isPaid: boolean;
  price?: number;
  imageUrl: string;
}

export interface Lesson {
  id: string;
  title: string;
  durationMin: number;
  videoUrl: string;
  description: string;
  isCompleted: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'expert' | 'system';
  text: string;
  timestamp: Date;
}