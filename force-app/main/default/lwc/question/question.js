import { LightningElement, api } from "lwc";

export default class Question extends LightningElement {
  @api question = {};
  timeout;
  answers = [1, 2, 3];

  renderedCallback() {
    this.countdown();
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
