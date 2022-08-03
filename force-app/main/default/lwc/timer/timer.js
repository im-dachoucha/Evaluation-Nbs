import { LightningElement, api } from "lwc";

export default class Timer extends LightningElement {
  _duration;
  @api get duration() {
    return this._duration;
  }
  set duration(value) {
    this._duration = value - 1;
    // this.timeLeft = value - 1;
  }
  //   @track timeLeft;

  //   renderedCallback() {
  //     if (this.timeLeft < 0) this.timeLeft = parseInt(this.duration, 10);
  //   }

  connectedCallback() {
    // this.timeLeft = parseInt(this.duration, 10);
    // ! uncomment this line
    // this.countDown();
  }

  countDown() {
    /* eslint-disable @lwc/lwc/no-async-operation */
    setInterval(() => {
      this._duration -= 1;
    }, 1000);
  }
}
