import { LightningElement, api } from "lwc";

export default class Question extends LightningElement {
  _question = {};
  @api
  get question() {
    return this._question;
  }
  set question(value) {
    this._question = JSON.parse(JSON.stringify(value));
  }
  @api length;
  options = [];
  timeout;
  hasRendered = false;
  idx;

  connectedCallback() {
    // if (!this.hasRendered) {
    this.options = this._question.Options__r;
    // this.hasRendered = true;
    this.idx = this._question.idx;
    // this.countdown();
    // }
  }

  /* eslint-disable @lwc/lwc/no-async-operation */
  countdown() {
    this.timeout = setTimeout(() => {
      console.log("time's up!!");
      this.hasRendered = false;
      this.dispatchEvent(
        new CustomEvent("next", {
          detail: {
            answers: this._question.Options__r?.filter(
              (option) => option.isChecked
            )
          }
        })
      );
    }, this._question.Duration__c * 1000);
  }
  handleClick(event) {
    // if (this._question.Options__r?.filter(option => option.isChecked).length > 0) {
    clearTimeout(this.timeout);
    this.hasRendered = false;
    this.dispatchEvent(
      new CustomEvent(event.target.dataset.event, {
        detail: { res: this._question }
      })
    );
    // }
  }

  handletoggleCheck({ detail: { id } }) {
    this._question.Options__r = this._question.Options__r?.map((option) => {
      if (option.Id === id) return { ...option, isChecked: !option.isChecked };
      return option;
    });
    this._question = { ...this._question };
    // console.table(this._question.Options__r)
  }
}
