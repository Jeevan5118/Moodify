import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header';
import { MoodSelectorComponent } from '../../components/mood-selector/mood-selector';
import { PlaylistDisplayComponent } from '../../components/playlist-display/playlist-display';
import { FirebaseService } from '../../services/firebase.service';
import { MoodService } from '../../services/mood';
import { Playlist, MoodHistory } from '../../models/mood.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject, combineLatest } from 'rxjs';
import { MOODS, PLAYLISTS } from '../../data/playlists.data';

interface SearchResult {
  mood: any;
  type: string;
  timestamp: number;
  playlist?: Playlist;
  song?: any;
  songIndex?: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, MoodSelectorComponent, PlaylistDisplayComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  user$;
  searchTerm = '';
  searchResults: SearchResult[] = [];
  private searchSubject = new Subject<string>();

  constructor(
    private firebaseService: FirebaseService,
    private moodService: MoodService,
    private router: Router
  ) {
    this.user$ = this.firebaseService.user$;
  }

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.performSearch(term))
    ).subscribe(results => {
      this.searchResults = results;
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  onSearch(): void {
    this.searchSubject.next(this.searchTerm);
  }

  private async performSearch(term: string): Promise<SearchResult[]> {
    if (!term.trim()) {
      return [];
    }
    try {
      const moodHistory$ = this.firebaseService.getMoodHistory();
      const playlists$ = this.firebaseService.getPlaylists();
      return new Promise((resolve) => {
        combineLatest([moodHistory$, playlists$]).subscribe({
          next: ([moodHistory, playlists]) => {
            const results: SearchResult[] = [];
            const searchTerm = term.toLowerCase();
            
            // Search in predefined moods and playlists
            MOODS.forEach(mood => {
              const moodPlaylist = PLAYLISTS[mood.id];
              
              // Check if mood name/description matches
              if (mood.name.toLowerCase().includes(searchTerm) ||
                  mood.description.toLowerCase().includes(searchTerm)) {
                results.push({
                  mood: mood,
                  type: 'Available Mood',
                  timestamp: Date.now()
                });
              }
              
              // Check if any songs in this mood's playlist match
              if (moodPlaylist) {
                moodPlaylist.forEach((song, index) => {
                  if (song.title.toLowerCase().includes(searchTerm) ||
                      song.artist.toLowerCase().includes(searchTerm)) {
                    results.push({
                      mood: mood,
                      type: 'Song in Playlist',
                      timestamp: Date.now(),
                      song: song,
                      songIndex: index
                    });
                  }
                });
              }
            });
            
            // Search in user's saved mood history
            if (moodHistory && moodHistory.length > 0) {
              moodHistory.forEach(moodItem => {
                if (moodItem.mood && (
                  moodItem.mood.name.toLowerCase().includes(searchTerm) ||
                  moodItem.mood.description.toLowerCase().includes(searchTerm)
                )) {
                  results.push({
                    mood: moodItem.mood,
                    type: 'Your Mood History',
                    timestamp: moodItem.timestamp
                  });
                }
              });
            }
            
            // Search in user's saved playlists
            if (playlists && playlists.length > 0) {
              playlists.forEach(playlist => {
                if (playlist.mood && (
                  playlist.mood.name.toLowerCase().includes(searchTerm) ||
                  playlist.mood.description.toLowerCase().includes(searchTerm) ||
                  playlist.songs.some(song => 
                    song.title.toLowerCase().includes(searchTerm) ||
                    song.artist.toLowerCase().includes(searchTerm)
                  )
                )) {
                  results.push({
                    mood: playlist.mood,
                    type: 'Your Saved Playlist',
                    timestamp: playlist.timestamp,
                    playlist: playlist
                  });
                }
              });
            }
            
            // Remove duplicates and sort by relevance
            const uniqueResults = results.filter((result, index, self) => {
              if (result.song) {
                // For songs, check mood + song combination
                return index === self.findIndex(r => 
                  r.mood.id === result.mood.id && 
                  r.song && r.song.title === result.song.title
                );
              } else {
                // For moods, check mood + type combination
                return index === self.findIndex(r => 
                  r.mood.id === result.mood.id && 
                  r.type === result.type
                );
              }
            }).sort((a, b) => {
              // Sort by type priority: Available Mood > Song in Playlist > Your Mood History > Your Saved Playlist
              const typePriority = {
                'Available Mood': 4,
                'Song in Playlist': 3,
                'Your Mood History': 2,
                'Your Saved Playlist': 1
              };
              return (typePriority[b.type as keyof typeof typePriority] || 0) - 
                     (typePriority[a.type as keyof typeof typePriority] || 0);
            });
            
            resolve(uniqueResults.slice(0, 15)); // Show more results
          },
          error: (error) => {
            console.error('Error performing search:', error);
            resolve([]);
          }
        });
      });
    } catch (error) {
      console.error('Error performing search:', error);
      return [];
    }
  }

  selectSearchResult(result: SearchResult): void {
    this.searchTerm = '';
    this.searchResults = [];
    
    if (result.type === 'Available Mood' || result.type === 'Song in Playlist') {
      // Select the mood and generate playlist
      this.moodService.selectMood(result.mood);
    } else if (result.type === 'Your Saved Playlist') {
      this.router.navigate(['/playlists']);
    } else if (result.type === 'Your Mood History') {
      this.router.navigate(['/history']);
      this.moodService.selectMood(result.mood);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.w-full')) {
      this.searchResults = [];
    }
  }
}
