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
  options = [];

  connectedCallback() {
    this.options = this._question.Options__r;
  }
  // renderedCallback() {
  //   console.log(this._question);
  // }

  handleClick(event) {
    if (
      this._question.Options__r?.filter((option) => option.isChecked).length ===
      parseInt(this._question.Answer__c, 10)
    ) {
      this._question = { ...this._question, isAnswered: true };
      this.dispatchEvent(
        new CustomEvent(event.target.dataset.event, {
          detail: { res: this._question }
        })
      );
    }
  }

  handletoggleCheck({ detail: { id } }) {
    this._question.Options__r = this._question.Options__r?.map((option) => {
      if (option.Id === id) return { ...option, isChecked: !option.isChecked };
      return option;
    });
    this._question = { ...this._question };
    // this.dispatchEvent(
    //   new CustomEvent("syncoptions", {
    //     detail: { res: this._question }
    //   })
    // );
  }
}
