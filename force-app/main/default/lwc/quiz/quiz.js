import { LightningElement, api, track } from "lwc";

export default class Quiz extends LightningElement {
  @api questions;
  @track idx = 0;
  @track question = {};
  end = false;

  connectedCallback() {
    this.question = this.questions[this.idx];
  }

  next() {
    if (this.idx < this.questions.length - 1) {
      this.idx++;
      this.question = this.questions[this.idx];
    } else {
      console.log("that was the last question!!");
      this.end = true;
    }
  }

  handleNext() {
    this.next();
  }
}
