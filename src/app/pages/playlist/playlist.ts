import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header';
import { PlaylistDisplayComponent } from '../../components/playlist-display/playlist-display';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule, HeaderComponent, PlaylistDisplayComponent],
  templateUrl: './playlist.html',
  styleUrl: './playlist.css'
})
export class PlaylistComponent {
  constructor() {}
}
