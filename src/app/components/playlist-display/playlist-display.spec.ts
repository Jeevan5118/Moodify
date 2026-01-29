import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistDisplay } from './playlist-display';

describe('PlaylistDisplay', () => {
  let component: PlaylistDisplay;
  let fixture: ComponentFixture<PlaylistDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
