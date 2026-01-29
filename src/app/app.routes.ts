import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { PlaylistComponent } from './pages/playlist/playlist';
import { LoginComponent } from './components/auth/login/login';
import { RegisterComponent } from './components/auth/register/register';
import { HistoryPageComponent } from './pages/history/history';
import { PlaylistsPageComponent } from './pages/playlists/playlists';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'history', component: HistoryPageComponent },
  { path: 'playlists', component: PlaylistsPageComponent },
  { path: 'playlist/:id', component: PlaylistComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];
