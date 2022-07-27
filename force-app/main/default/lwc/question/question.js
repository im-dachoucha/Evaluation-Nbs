import { LightningElement, api } from "lwc";

export default class Question extends LightningElement {
  @api question = {};
  timeout;

  renderedCallback() {
    this.countdown();
  }

  /* eslint-disable @lwc/lwc/no-async-operation */
  countdown() {
    this.timeout = setTimeout(() => {
      console.log("time's up!!");
      this.dispatchEvent(new CustomEvent("next"));
    }, this.question.duration * 1000);
  }
  handleClick() {
    clearTimeout(this.timeout);
    this.dispatchEvent(new CustomEvent("next"));
  }
}
