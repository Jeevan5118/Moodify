import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MoodHistory, Playlist } from '../../models/mood.model';
import { StorageService } from '../../services/storage';
import { MoodService } from '../../services/mood';
import { FirebaseService } from '../../services/firebase.service';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './history.html',
  styleUrl: './history.css'
})
export class HistoryComponent implements OnInit {
  history: MoodHistory[] = [];
  searchTerm = '';
  isLoading = true;
  errorMessage = '';

  constructor(
    private storageService: StorageService,
    private moodService: MoodService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    console.log('History component initialized');
    this.loadHistory();
  }

  async loadHistory(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    console.log('Loading history...');
    
    try {
      // Get mood history from Firebase
      const moodHistory$ = this.firebaseService.getMoodHistory();

      moodHistory$.subscribe({
        next: (moodHistory) => {
          console.log('Raw mood history from Firebase:', moodHistory);
          
          // Filter out invalid entries and sort by newest first
          this.history = (moodHistory || [])
            .filter(item => item && item.mood && item.timestamp)
            .sort((a, b) => b.timestamp - a.timestamp);
          
          console.log('Processed history:', this.history.length, 'items');
          console.log('History items:', this.history);
          
          this.isLoading = false;
          
          if (this.history.length === 0) {
            this.errorMessage = 'No mood history found. Try generating some playlists first!';
          }
        },
        error: (error) => {
          console.error('Error loading history:', error);
          this.errorMessage = 'Failed to load history. Please try again.';
          this.history = [];
          this.isLoading = false;
        }
      });
    } catch (error) {
      console.error('Error loading history:', error);
      this.errorMessage = 'Failed to load history. Please try again.';
      this.history = [];
      this.isLoading = false;
    }
  }

  async clearHistory(): Promise<void> {
    try {
      await this.firebaseService.clearMoodHistory();
      await this.firebaseService.clearPlaylists();
      this.loadHistory();
    } catch (error) {
      console.error('Error clearing history:', error);
      this.errorMessage = 'Failed to clear history. Please try again.';
    }
  }

  async removeFromHistory(id: string): Promise<void> {
    try {
      await this.firebaseService.removeMoodFromHistory(id);
      this.loadHistory();
    } catch (error) {
      console.error('Error removing from history:', error);
      this.errorMessage = 'Failed to remove item from history. Please try again.';
    }
  }

  replayMood(moodHistory: MoodHistory): void {
    console.log('Replaying mood:', moodHistory.mood);
    this.moodService.selectMood(moodHistory.mood);
  }

  getFilteredHistory(): MoodHistory[] {
    if (!this.searchTerm.trim()) {
      return this.history;
    }
    
    const term = this.searchTerm.toLowerCase();
    return this.history.filter(item => 
      item.mood && (
        item.mood.name.toLowerCase().includes(term) ||
        item.mood.description.toLowerCase().includes(term) ||
        (item.playlist && item.playlist.songs && item.playlist.songs.some(song => 
          song.title.toLowerCase().includes(term) ||
          song.artist.toLowerCase().includes(term)
        ))
      )
    );
  }

  formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  getSongCount(songs: any[]): string {
    if (!songs || songs.length === 0) return '0 songs';
    return `${songs.length} song${songs.length !== 1 ? 's' : ''}`;
  }

  getConfidenceColor(confidence: number): string {
    if (confidence >= 90) return '#10b981'; // Green
    if (confidence >= 80) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  }

  refreshHistory(): void {
    console.log('Refreshing history...');
    this.loadHistory();
  }
}
