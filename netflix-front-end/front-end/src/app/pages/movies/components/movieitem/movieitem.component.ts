import { Component, Input } from '@angular/core';
import { Card } from '../../../../interfaces/Movie/discoverMovie.interface';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movieitem.component.html',
  styleUrls: ['./movieitem.component.scss'],
})
export class MovieitemComponent {
  @Input() movie!: Card;
  maxNum: number = 190;

  shortView(summary: string): string {
    return summary.length >= this.maxNum
      ? summary.substring(0, this.maxNum) + '...'
      : summary;
  }
}
