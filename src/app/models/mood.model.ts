export interface Song {
  title: string;
  artist: string;
  duration: string;
  link?: string;
  preview?: string;
}

export interface Mood {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
}

export interface Playlist {
  mood: Mood;
  songs: Song[];
  confidence: number;
  timestamp: number;
}

export interface MoodHistory {
  id: string;
  mood: Mood;
  playlist: Playlist;
  timestamp: number;
  playedSong?: Song;
} 