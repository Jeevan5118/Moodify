import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header';
import { Playlist } from '../../models/mood.model';
import { FirebaseService } from '../../services/firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-playlists-page',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './playlists.html',
  styleUrl: './playlists.css'
})
export class PlaylistsPageComponent implements OnInit {
  playlists: Playlist[] = [];
  searchTerm = '';
  isLoading = true;
  errorMessage = '';

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    console.log('Playlists page initialized');
    this.loadPlaylists();
  }

  async loadPlaylists(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    console.log('Loading playlists...');
    
    try {
      this.firebaseService.getPlaylists().subscribe({
        next: (playlists) => {
          console.log('Raw playlists from Firebase:', playlists);
          
          // Remove duplicates and invalid entries
          const validPlaylists = (playlists || []).filter(playlist => 
            playlist && playlist.mood && playlist.songs && playlist.songs.length > 0
          );
          
          const uniquePlaylists = this.removeDuplicates(validPlaylists);
          this.playlists = uniquePlaylists.sort((a, b) => b.timestamp - a.timestamp); // Sort by newest first
          
          console.log('Processed playlists:', this.playlists.length, 'items');
          console.log('Playlist items:', this.playlists);
          
          this.isLoading = false;
          
          if (this.playlists.length === 0) {
            this.errorMessage = 'No saved playlists found. Try generating and saving some playlists first!';
          }
        },
        error: (error) => {
          console.error('Error loading playlists:', error);
          this.errorMessage = 'Failed to load playlists. Please try again.';
          this.playlists = [];
          this.isLoading = false;
        }
      });
    } catch (error) {
      console.error('Error loading playlists:', error);
      this.errorMessage = 'Failed to load playlists. Please try again.';
      this.playlists = [];
      this.isLoading = false;
    }
  }

  private removeDuplicates(playlists: Playlist[]): Playlist[] {
    const seen = new Set<string>();
    const uniquePlaylists: Playlist[] = [];
    
    playlists.forEach(playlist => {
      if (!playlist || !playlist.mood) {
        console.log('Skipping invalid playlist:', playlist);
        return;
      }
      
      // Create a unique key based on multiple factors
      const songTitles = playlist.songs?.map(s => s.title).join(',') || '';
      const key = `${playlist.mood.id}-${songTitles.length}-${playlist.timestamp}`;
      
      if (seen.has(key)) {
        console.log('Removing duplicate playlist:', playlist.mood.name, 'at', new Date(playlist.timestamp));
        return; // Skip duplicate
      }
      
      seen.add(key);
      uniquePlaylists.push(playlist); // Keep unique playlist
    });
    
    console.log('Removed duplicates, kept:', uniquePlaylists.length, 'playlists');
    return uniquePlaylists;
  }

  getFilteredPlaylists(): Playlist[] {
    if (!this.searchTerm.trim()) {
      return this.playlists;
    }
    
    const term = this.searchTerm.toLowerCase();
    return this.playlists.filter(playlist => 
      playlist.mood && (
        playlist.mood.name.toLowerCase().includes(term) ||
        playlist.mood.description.toLowerCase().includes(term) ||
        (playlist.songs && playlist.songs.some(song => 
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

  openSongLink(link: string): void {
    if (link) {
      window.open(link, '_blank');
    }
  }

  calculateTotalDuration(songs: any[]): string {
    if (!songs || songs.length === 0) return '0:00';
    
    let totalMinutes = 0;
    let totalSeconds = 0;
    
    songs.forEach(song => {
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

  refreshPlaylists(): void {
    console.log('Refreshing playlists...');
    this.loadPlaylists();
  }

  async removePlaylist(playlist: Playlist): Promise<void> {
    if (!playlist) return;
    try {
      await this.firebaseService.deletePlaylist(playlist);
      this.loadPlaylists();
    } catch (error) {
      console.error('Failed to delete playlist:', error);
      this.errorMessage = 'Failed to delete playlist. Please try again.';
    }
  }
} 