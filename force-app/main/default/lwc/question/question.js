import { LightningElement, api } from "lwc";

export default class Question extends LightningElement {
  @api question = {};
  @api idx;
  @api length;
  options = [];
  timeout;
  answers = [1, 2, 3];

  renderedCallback() {
    this.options = this.question.options;
    // ! uncomment this line
    // this.countdown();
  }

  /* eslint-disable @lwc/lwc/no-async-operation */
  countdown() {
    this.timeout = setTimeout(() => {
      console.log("time's up!!");
      this.dispatchEvent(
        new CustomEvent("next", {
          detail: { answers: [], data: "data" }
        })
      );
    }, this.question.duration * 1000);
  }
  handleClick() {
    if (this.answers.length > 0) {
      clearTimeout(this.timeout);
      this.dispatchEvent(
        new CustomEvent("next", {
          detail: { answers: this.answers, data: "data" }
        })
      );
    }
  }
}
