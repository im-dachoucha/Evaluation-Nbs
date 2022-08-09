import { LightningElement, api } from "lwc";

export default class Question extends LightningElement {
  @api question = {};
  @api length;
  options = [];
  handletoggleCheck({ detail }) {
    console.log(`detail `, JSON.parse(JSON.stringify(detail)));

    const idx = this.answers.indexOf(detail.id);
    if (idx === -1) {
      this.answers.push(detail.id);
    } else {
      this.answers.splice(idx, 1);
    }
    console.log(`answers `, this.answers);
  }
  timeout;
  answers = [];
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
      this.options = this.question.Options__r;
      this.hasRendered = true;
      this.countdown();
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
    }, this.question.Duration__c * 1000);
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
