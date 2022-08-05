import { LightningElement, api } from "lwc";

export default class Question extends LightningElement {
  @api question = {};
  @api length;
  options = [];
  timeout;
  answers = [1, 2, 3];
  hasRendered = false;
  _idx;
  @api
  get idx() {
    return this._idx;
  }
  set idx(value) {
    this._idx = value + 1;
  }

  renderedCallback() {
    if (!this.hasRendered) {
      this.options = this.question.options;
      this.hasRendered = true;
      // this.countdown();
    }
  }

  /* eslint-disable @lwc/lwc/no-async-operation */
  countdown() {
    this.timeout = setTimeout(() => {
      console.log("time's up!!");
      this.hasRendered = false;
      this.dispatchEvent(
        new CustomEvent("next", {
          detail: { answers: [], data: "data" }
        })
      );
    }, this.question.duration * 1000);
  }
  handleClick() {
    clearTimeout(this.timeout);
    if (this.answers.length > 0) {
      this.hasRendered = false;
      this.dispatchEvent(
        new CustomEvent("next", {
          detail: { answers: this.answers, data: "data" }
        })
      );
    }
  }
}
