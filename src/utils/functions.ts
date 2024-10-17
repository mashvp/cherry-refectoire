




function mapRange(value:number, x1:number, y1:number, x2=0, y2=1) {
  return (value - x1) * (y2 - x2) / (y1 - x1) + x2;
}

 function clamp(value:number, min:number, max:number) {
    if (min < max) {
      return Math.max(Math.min(value, max), min);
    } else {
      return Math.max(Math.min(value, min), max);
    }
 }








class Progress {
  start:number
  cur:number
  constructor() {
    this.start = 0;
    this.cur = this.start;
  }
  getProgress(delta:number) {
    this.cur += delta;
    if ( this.cur < 0) {
      this.cur = 1 + this.cur;
    }
    if ( this.cur >= 1) {
      this.cur = 0;
      return 1;
    }
    return this.cur;
  }

}


class Delta {
  start:number
  prev:number
  constructor(s:number) {
    this.start = s;
    this.prev = this.start;
  }
  getDelta(n:number) {
    let delta = n - this.prev;
    this.prev = n;
    return delta;
  }

}