import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-moviedialog',
  templateUrl: './moviedialog.component.html',
  styleUrls: ['./moviedialog.component.scss'],
})
export class MoviedialogComponent implements OnInit {
  videoId!: string;
  videoKeys: Array<string> = [];
  currentIndex: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { videoKeys: Array<string> }
  ) {}

  ngOnInit(): void {
    this.videoKeys = this.data.videoKeys;
    this.videoId = this.videoKeys[this.currentIndex];
  }

  nextVideo() {
    if (this.currentIndex < this.videoKeys.length - 1) {
      this.currentIndex++;
      this.videoId = this.videoKeys[this.currentIndex];
    } else {
      alert('You are on the last trailer.');
    }
  }

  previousVideo() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.videoId = this.videoKeys[this.currentIndex];
    } else {
      alert('You are on trailer one.');
    }
  }
}
