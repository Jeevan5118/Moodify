import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header';
import { HistoryComponent } from '../../components/history/history';

@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, HistoryComponent],
  templateUrl: './history.html',
  styleUrl: './history.css'
})
export class HistoryPageComponent {
  // This is just a wrapper component for the history page
} 