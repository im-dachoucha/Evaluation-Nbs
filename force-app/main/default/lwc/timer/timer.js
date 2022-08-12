import { LightningElement, api, track } from "lwc";

export default class Timer extends LightningElement {
  @api duration;
  @track timeLeft;
  @track timeLeftExpression;
  @track progressLeft;
  interval;
  variant = "base";

  connectedCallback() {
    this.timeLeft = this.duration;
    this.calculateTimeLeft();
    this.countDown();
  }

  countDown() {
    /* eslint-disable @lwc/lwc/no-async-operation */
    this.interval = setInterval(() => {
      this.timeLeft -= 1;
      this.variant =
        this.timeLeft === 0 ? "expired" : this.timeLeft <= 10 && "warning";
      this.calculateTimeLeft();
      if (this.timeLeft <= 0) clearInterval(this.interval);
    }, 1000);
  }

  calculateTimeLeft() {
    this.progressLeft = (this.timeLeft * 100) / this.duration;
    const minutes = parseInt(this.timeLeft / 60, 10);
    const seconds = parseInt(this.timeLeft % 60, 10);
    this.timeLeftExpression = `${minutes > 0 ? minutes + ":" : ""}${seconds}s`;
  }
}
