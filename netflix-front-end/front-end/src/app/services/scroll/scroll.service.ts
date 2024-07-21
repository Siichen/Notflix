import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private scrollPosition: [number, number] = [0, 0];

  saveScrollPosition(position: [number, number]): void {
    this.scrollPosition = position;
  }

  getScrollPosition(): [number, number] {
    return this.scrollPosition;
  }
}
