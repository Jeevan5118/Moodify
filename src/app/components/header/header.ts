import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { MoodService } from '../../services/mood';
import { Playlist, MoodHistory } from '../../models/mood.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject, combineLatest } from 'rxjs';

interface SearchResult {
  mood: any;
  type: string;
  timestamp: number;
  playlist?: Playlist;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent implements OnInit {
  isDarkMode = false;
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
    // Set up search with debouncing
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.performSearch(term))
    ).subscribe(results => {
      this.searchResults = results;
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.search-container')) {
      this.searchResults = [];
    }
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  }

  async signOut(): Promise<void> {
    try {
      await this.firebaseService.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error signing out:', error);
    }
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
      // Get both mood history and playlists
      const moodHistory$ = this.firebaseService.getMoodHistory();
      const playlists$ = this.firebaseService.getPlaylists();

      return new Promise((resolve) => {
        combineLatest([moodHistory$, playlists$]).subscribe(([moodHistory, playlists]) => {
          const results: SearchResult[] = [];
          const searchTerm = term.toLowerCase();

          // Search in mood history
          moodHistory.forEach(moodItem => {
            if (moodItem.mood.name.toLowerCase().includes(searchTerm) ||
                moodItem.mood.description.toLowerCase().includes(searchTerm)) {
              results.push({
                mood: moodItem.mood,
                type: 'Mood History',
                timestamp: moodItem.timestamp
              });
            }
          });

          // Search in playlists
          playlists.forEach(playlist => {
            if (playlist.mood.name.toLowerCase().includes(searchTerm) ||
                playlist.mood.description.toLowerCase().includes(searchTerm) ||
                playlist.songs.some(song => 
                  song.title.toLowerCase().includes(searchTerm) ||
                  song.artist.toLowerCase().includes(searchTerm)
                )) {
              results.push({
                mood: playlist.mood,
                type: 'Saved Playlist',
                timestamp: playlist.timestamp,
                playlist: playlist
              });
            }
          });

          // Remove duplicates and sort by timestamp (newest first)
          const uniqueResults = results.filter((result, index, self) => 
            index === self.findIndex(r => r.mood.id === result.mood.id && r.type === result.type)
          ).sort((a, b) => b.timestamp - a.timestamp);

          resolve(uniqueResults.slice(0, 10)); // Limit to 10 results
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
    
    if (result.type === 'Saved Playlist') {
      // Navigate to playlists page
      this.router.navigate(['/playlists']);
    } else {
      // Navigate to history page and select the mood
      this.router.navigate(['/history']);
      // You could also trigger the mood selection here
      this.moodService.selectMood(result.mood);
    }
  }
}
