import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, doc, setDoc, getDocs, query, where, orderBy, CollectionReference, collectionData, deleteDoc, onSnapshot } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User, UserCredential } from '@angular/fire/auth';
import { from, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Mood, Playlist, MoodHistory } from '../models/mood.model';
import { Song } from '../models/mood.model';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  // User observable for reactive state management
  user$ = new Observable<User | null>((subscriber) => {
    return onAuthStateChanged(this.auth, subscriber);
  });

  // --- AUTH ---
  signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut(): Promise<void> {
    return signOut(this.auth);
  }

  getCurrentUser(): Observable<User | null> {
    return new Observable((subscriber) => {
      return onAuthStateChanged(this.auth, subscriber);
    });
  }

  // --- FIRESTORE ---
  private getUserId(): string | null {
    return this.auth.currentUser?.uid || null;
  }

  async saveMood(mood: Mood, timestamp: number, playedSong?: Song): Promise<void> {
    const userId = this.getUserId();
    if (!userId) {
      console.warn('User not authenticated, cannot save mood');
      return;
    }
    try {
      const moodRef = doc(this.firestore, `users/${userId}/moodHistory/${timestamp}`);
      await setDoc(moodRef, { 
        mood: mood, 
        timestamp: timestamp,
        createdAt: new Date().toISOString(),
        ...(playedSong ? { playedSong } : {})
      });
      console.log('Mood saved successfully:', mood.name);
    } catch (error) {
      console.error('Error saving mood:', error);
      throw error;
    }
  }

  async savePlaylist(playlist: Playlist): Promise<void> {
    const userId = this.getUserId();
    if (!userId) {
      console.warn('User not authenticated, cannot save playlist');
      return;
    }
    try {
      // Check for existing playlist with same mood and timestamp to avoid duplicates
      const playlistsCol = collection(this.firestore, `users/${userId}/playlists`);
      const querySnapshot = await getDocs(playlistsCol);
      
      // Check if a playlist with the same mood ID and timestamp already exists
      const existingPlaylist = querySnapshot.docs.find(doc => {
        const data = doc.data();
        return data['mood'] && data['mood']['id'] === playlist.mood.id && 
               data['timestamp'] === playlist.timestamp;
      });

      if (existingPlaylist) {
        console.log('Playlist already exists, skipping save');
        return;
      }

      const playlistRef = doc(this.firestore, `users/${userId}/playlists/${playlist.timestamp}`);
      await setDoc(playlistRef, {
        ...playlist,
        createdAt: new Date().toISOString()
      });
      console.log('Playlist saved successfully:', playlist.mood.name);
    } catch (error) {
      console.error('Error saving playlist:', error);
      throw error;
    }
  }

  getMoodHistory(): Observable<MoodHistory[]> {
    const userId = this.getUserId();
    if (!userId) {
      console.warn('User not authenticated, returning empty mood history');
      return of([]);
    }
    try {
      const moodsCol = collection(this.firestore, `users/${userId}/moodHistory`);
      return new Observable<MoodHistory[]>((subscriber) => {
        const unsubscribe = onSnapshot(moodsCol, (snapshot) => {
          const moodHistory: MoodHistory[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            console.log('Mood history doc data:', data);
            if (data['mood']) {
              moodHistory.push({
                id: doc.id,
                mood: data['mood'],
                playlist: data['playlist'] || null,
                timestamp: data['timestamp'],
                playedSong: data['playedSong'] || null
              });
            }
          });
          console.log('Total mood history items:', moodHistory.length);
          subscriber.next(moodHistory);
        }, (error) => {
          console.error('Error fetching mood history:', error);
          subscriber.next([]);
        });
        
        return unsubscribe;
      });
    } catch (error) {
      console.error('Error setting up mood history query:', error);
      return of([]);
    }
  }

  getPlaylists(): Observable<Playlist[]> {
    const userId = this.getUserId();
    if (!userId) {
      console.warn('User not authenticated, returning empty playlists');
      return of([]);
    }
    try {
      const playlistsCol = collection(this.firestore, `users/${userId}/playlists`);
      return new Observable<Playlist[]>((subscriber) => {
        const unsubscribe = onSnapshot(playlistsCol, (snapshot) => {
          const playlists: Playlist[] = [];
          const seen = new Set<string>();
          
          snapshot.forEach((doc) => {
            const data = doc.data();
            console.log('Playlist doc data:', data);
            if (data['mood'] && data['songs']) {
              // Create a unique key for deduplication
              const songTitles = data['songs'].map((s: any) => s.title).join(',');
              const key = `${data['mood']['id']}-${data['songs'].length}-${data['timestamp']}`;
              
              if (!seen.has(key)) {
                seen.add(key);
                playlists.push({
                  mood: data['mood'],
                  songs: data['songs'],
                  confidence: data['confidence'] || 0,
                  timestamp: data['timestamp']
                });
              } else {
                console.log('Skipping duplicate playlist:', data['mood']['name']);
              }
            }
          });
          console.log('Total unique playlists:', playlists.length);
          subscriber.next(playlists);
        }, (error) => {
          console.error('Error fetching playlists:', error);
          subscriber.next([]);
        });
        
        return unsubscribe;
      });
    } catch (error) {
      console.error('Error setting up playlists query:', error);
      return of([]);
    }
  }

  async clearMoodHistory(): Promise<void> {
    const userId = this.getUserId();
    if (!userId) {
      console.warn('User not authenticated, cannot clear mood history');
      return;
    }
    try {
      const moodsCol = collection(this.firestore, `users/${userId}/moodHistory`);
      const querySnapshot = await getDocs(moodsCol);
      const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
    } catch (error) {
      console.error('Error clearing mood history:', error);
      throw error;
    }
  }

  async clearPlaylists(): Promise<void> {
    const userId = this.getUserId();
    if (!userId) {
      console.warn('User not authenticated, cannot clear playlists');
      return;
    }
    try {
      const playlistsCol = collection(this.firestore, `users/${userId}/playlists`);
      const querySnapshot = await getDocs(playlistsCol);
      const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
    } catch (error) {
      console.error('Error clearing playlists:', error);
      throw error;
    }
  }

  async removeMoodFromHistory(id: string): Promise<void> {
    const userId = this.getUserId();
    if (!userId) {
      console.warn('User not authenticated, cannot remove mood from history');
      return;
    }
    try {
      const moodRef = doc(this.firestore, `users/${userId}/moodHistory/${id}`);
      await deleteDoc(moodRef);
    } catch (error) {
      console.error('Error removing mood from history:', error);
      throw error;
    }
  }

  async cleanupDuplicatePlaylists(): Promise<void> {
    const userId = this.getUserId();
    if (!userId) {
      console.warn('User not authenticated, cannot cleanup playlists');
      return;
    }
    try {
      const playlistsCol = collection(this.firestore, `users/${userId}/playlists`);
      const querySnapshot = await getDocs(playlistsCol);
      
      // Find duplicates
      const seen = new Set<string>();
      const duplicates: string[] = [];
      
      querySnapshot.docs.forEach(doc => {
        const playlist = doc.data() as Playlist;
        if (!playlist.mood) return;
        const songTitles = playlist.songs?.map(s => s.title).join(',') || '';
        const key = `${playlist.mood.id}-${songTitles.length}-${playlist.timestamp}`;
        
        if (seen.has(key)) {
          duplicates.push(doc.id);
        } else {
          seen.add(key);
        }
      });
      
      // Remove duplicates
      const deletePromises = duplicates.map(id => {
        const playlistRef = doc(this.firestore, `users/${userId}/playlists/${id}`);
        return deleteDoc(playlistRef);
      });
      
      await Promise.all(deletePromises);
      console.log(`Cleaned up ${duplicates.length} duplicate playlists`);
    } catch (error) {
      console.error('Error cleaning up duplicate playlists:', error);
      throw error;
    }
  }

  async deletePlaylist(playlist: Playlist): Promise<void> {
    const userId = this.getUserId();
    if (!userId) {
      console.warn('User not authenticated, cannot delete playlist');
      return;
    }
    try {
      const playlistRef = doc(this.firestore, `users/${userId}/playlists/${playlist.timestamp}`);
      await deleteDoc(playlistRef);
      console.log('Playlist deleted successfully:', playlist.mood.name);
    } catch (error) {
      console.error('Error deleting playlist:', error);
      throw error;
    }
  }
} 