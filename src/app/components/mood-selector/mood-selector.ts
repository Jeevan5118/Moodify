import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mood } from '../../models/mood.model';
import { MoodService } from '../../services/mood';

@Component({
  selector: 'app-mood-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mood-selector.html',
  styleUrl: './mood-selector.css'
})
export class MoodSelectorComponent implements OnInit {
  moods: Mood[] = [];
  selectedMood: Mood | null = null;

  constructor(private moodService: MoodService) {}

  ngOnInit(): void {
    this.moods = this.moodService.getMoods();
    this.moodService.selectedMood$.subscribe(mood => {
      this.selectedMood = mood;
    });
  }

  selectMood(mood: Mood): void {
    this.moodService.selectMood(mood);
  }

  isSelected(mood: Mood): boolean {
    return this.selectedMood?.id === mood.id;
  }
}
