export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: string;
  category: "hieu_minh" | "chua_lanh" | "toa_sang" | "nhan_tam" | "moi_quan_he" | "goc_nhin_cuoc_song" | "chung";
  aiReply?: string;
  createdAt: number;
}

export interface CompanionMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: string;
}

export interface DailyCard {
  id: string;
  title: string;
  quote: string;
  category: string;
  advice: string;
}

export type JourneyStepId = "hieu_minh" | "chua_lanh" | "toa_sang";

export interface JourneyStep {
  id: JourneyStepId;
  title: string;
  subtitle: string;
  content: string;
  color: string;
  textColor: string;
  bgClass: string;
  borderClass: string;
  accentClass: string;
  promptList: string[];
}
