import { Injectable } from '@angular/core';
import { MoodHistory, Playlist } from '../models/mood.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly HISTORY_KEY = 'moodboard_history';
  private readonly MAX_HISTORY = 10;

  constructor() {}

  savePlaylist(playlist: Playlist): void {
    const history = this.getHistory();
    
    const moodHistory: MoodHistory = {
      id: this.generateId(),
      mood: playlist.mood,
      playlist,
      timestamp: Date.now()
    };

    // Add to beginning of array
    history.unshift(moodHistory);

    // Keep only the last MAX_HISTORY items
    if (history.length > this.MAX_HISTORY) {
      history.splice(this.MAX_HISTORY);
    }

    localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history));
  }

  getHistory(): MoodHistory[] {
    try {
      const history = localStorage.getItem(this.HISTORY_KEY);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error reading history from localStorage:', error);
      return [];
    }
  }

  clearHistory(): void {
    localStorage.removeItem(this.HISTORY_KEY);
  }

  removeFromHistory(id: string): void {
    const history = this.getHistory();
    const filteredHistory = history.filter(item => item.id !== id);
    localStorage.setItem(this.HISTORY_KEY, JSON.stringify(filteredHistory));
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  getRecentMoods(count: number = 5): MoodHistory[] {
    const history = this.getHistory();
    return history.slice(0, count);
  }
}
