import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mood, Playlist, Song } from '../models/mood.model';
import { MOODS, PLAYLISTS } from '../data/playlists.data';

@Injectable({
  providedIn: 'root'
})
export class MoodService {
  private selectedMoodSubject = new BehaviorSubject<Mood | null>(null);
  private currentPlaylistSubject = new BehaviorSubject<Playlist | null>(null);

  selectedMood$ = this.selectedMoodSubject.asObservable();
  currentPlaylist$ = this.currentPlaylistSubject.asObservable();

  constructor() {
    console.log('MoodService initialized');
    console.log('Available moods:', MOODS);
    console.log('Available playlists:', Object.keys(PLAYLISTS));
  }

  getMoods(): Mood[] {
    console.log('Getting moods:', MOODS);
    return MOODS;
  }

  selectMood(mood: Mood): void {
    console.log('Selecting mood:', mood);
    this.selectedMoodSubject.next(mood);
    this.generatePlaylist(mood);
  }

  private generatePlaylist(mood: Mood): void {
    console.log('Generating playlist for mood:', mood.id);
    const songs = PLAYLISTS[mood.id] || [];
    console.log('Found songs:', songs.length);
    const confidence = this.calculateConfidence();
    
    const playlist: Playlist = {
      mood,
      songs,
      confidence,
      timestamp: Date.now()
    };

    console.log('Generated playlist:', playlist);
    this.currentPlaylistSubject.next(playlist);
  }

  private calculateConfidence(): number {
    // Generate a random confidence between 75% and 98%
    return Math.floor(Math.random() * (98 - 75 + 1)) + 75;
  }

  getCurrentMood(): Mood | null {
    return this.selectedMoodSubject.value;
  }

  getCurrentPlaylist(): Playlist | null {
    return this.currentPlaylistSubject.value;
  }

  clearSelection(): void {
    this.selectedMoodSubject.next(null);
    this.currentPlaylistSubject.next(null);
  }
}
