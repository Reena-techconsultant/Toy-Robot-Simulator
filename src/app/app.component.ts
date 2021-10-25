import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'robot';
  directions: any = { 1: 'North', 2: 'West', 3: 'South', 4: 'East' };
  now = 1;
  onSubmitNow = 1;
  axis = { x: 0, y: 0 };
  onSubmitAxis = { x: 0, y: 0 };
  gridLimit: number = 7;
  rows: any = [];
  //  [4, 3, 2, 1, 0];
  columns: any = [];
  //  [0, 1, 2, 3, 4];
  path: any = "";

  ngOnInit(): void {
    for (let index = 0; index < this.gridLimit; index++) {
      this.columns.push(index);
      this.rows.push(this.gridLimit - 1 - index);
    }
  }

  ngAfterViewInit() {
    this.getElementById(this.axis.x, this.axis.y);
  }

  changeDirection(direction: string) {
    if (direction == 'left') {
      if (this.now == 4) {
        this.now = 1;
        this.changeImgDirection();
        return;
      }
      this.now += 1;
      this.changeImgDirection();
      return;
    } else if (direction == 'right') {
      if (this.now == 1) {
        this.now = 4;
        this.changeImgDirection();
        return;
      }
      this.now -= 1;
      this.changeImgDirection();
      return;
    }
  }

  move() {
    var doc: any = document.getElementById(this.axis.x + '' + this.axis.y);
    doc.innerHTML = '';
    if (
      this.directions[this.now] == 'North' &&
      this.axis.y != this.rows.length - 1
    ) {
      this.axis.y += 1;
    } else if (
      this.directions[this.now] == 'East' &&
      this.axis.x != this.rows.length - 1
    ) {
      this.axis.x += 1;
    } else if (this.directions[this.now] == 'West' && this.axis.x != 0) {
      this.axis.x -= 1;
    } else if (this.directions[this.now] == 'South' && this.axis.y != 0) {
      this.axis.y -= 1;
    }
    this.getElementById(this.axis.x, this.axis.y);
  }

  setImagePath() {
    this.path =
      '<img style="width: 30px" src=' +
      'assets/images/' +
      this.directions[this.now] +
      '-arrow.png' +
      '/>';
  }

  changeImgDirection() {
    this.getElementById(this.axis.x, this.axis.y);
  }

  getElementById(x: any, y: any) {
    this.setImagePath();
    var doc: any = document.getElementById(x + '' + y);
    doc.innerHTML = this.path;
  }

  submit() {
    if (
      this.onSubmitAxis.x <= this.rows.length - 1 &&
      this.onSubmitAxis.x >= 0 &&
      this.onSubmitAxis.y <= this.columns.length - 1 &&
      this.onSubmitAxis.y >= 0
    ) {
      var doc: any = document.getElementById(this.axis.x + '' + this.axis.y);
      doc.innerHTML = '';
      this.axis.x = this.onSubmitAxis.x;
      this.axis.y = this.onSubmitAxis.y;
      this.now = this.onSubmitNow;

      this.getElementById(this.onSubmitAxis.x, this.onSubmitAxis.y);
    } else {
      console.log('Exceeded Limit ');
    }
  }
}
