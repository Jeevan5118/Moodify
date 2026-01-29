import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Playlist, Song } from '../../models/mood.model';
import { MoodService } from '../../services/mood';
import { StorageService } from '../../services/storage';
import { FirebaseService } from '../../services/firebase.service';
import { Mood } from '../../models/mood.model';

@Component({
  selector: 'app-playlist-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playlist-display.html',
  styleUrl: './playlist-display.css'
})
export class PlaylistDisplayComponent implements OnInit {
  currentPlaylist: Playlist | null = null;
  isSaving = false;
  saveMessage = '';
  isAlreadySaved = false;
  private savedPlaylists: Playlist[] = [];

  constructor(
    private moodService: MoodService,
    private storageService: StorageService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.firebaseService.getPlaylists().subscribe(playlists => {
      this.savedPlaylists = playlists;
      this.updateIsAlreadySaved();
    });
    this.moodService.currentPlaylist$.subscribe(playlist => {
      this.currentPlaylist = playlist;
      this.updateIsAlreadySaved();
    });
  }

  private updateIsAlreadySaved(): void {
    if (!this.currentPlaylist) {
      this.isAlreadySaved = false;
      return;
    }
    this.isAlreadySaved = this.savedPlaylists.some(saved =>
      saved.mood.id === this.currentPlaylist!.mood.id
    );
  }

  async savePlaylist(): Promise<void> {
    if (!this.currentPlaylist) {
      this.saveMessage = 'No playlist to save';
      return;
    }

    this.isSaving = true;
    this.saveMessage = '';

    try {
      // Save the playlist
      await this.firebaseService.savePlaylist(this.currentPlaylist);
      
      // Save the mood history
      await this.firebaseService.saveMood(this.currentPlaylist.mood, this.currentPlaylist.timestamp);
      
      this.saveMessage = 'Playlist saved successfully! 🎉';
      setTimeout(() => {
        this.saveMessage = '';
      }, 3000);
    } catch (error: any) {
      console.error('Error saving playlist:', error);
      this.saveMessage = error.message || 'Failed to save playlist';
    } finally {
      this.isSaving = false;
    }
  }

  openSongLink(link: string, song?: Song): void {
    if (link) {
      window.open(link, '_blank');
      // Save the mood and played song to history when a song is played
      if (this.currentPlaylist && song) {
        this.firebaseService.saveMood(this.currentPlaylist.mood, this.currentPlaylist.timestamp, song);
      }
    }
  }

  getConfidenceColor(confidence: number): string {
    if (confidence >= 80) return 'bg-green-500';
    if (confidence >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  formatDuration(duration: string): string {
    return duration;
  }

  calculateTotalDuration(): string {
    if (!this.currentPlaylist) return '0:00';
    
    let totalMinutes = 0;
    let totalSeconds = 0;
    
    this.currentPlaylist.songs.forEach(song => {
      const parts = song.duration.split(':');
      if (parts.length === 2) {
        totalMinutes += parseInt(parts[0]);
        totalSeconds += parseInt(parts[1]);
      }
    });
    
    totalMinutes += Math.floor(totalSeconds / 60);
    totalSeconds = totalSeconds % 60;
    
    return `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
  }
}
