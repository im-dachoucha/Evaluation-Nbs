import { LightningElement, api } from "lwc";

export default class QuestionLabel extends LightningElement {
  @api idx;

  className = "label-item";

  _isAnswered;
  @api set isanswered(value) {
    this._isAnswered = value;
    this.className = this._isAnswered ? "label-item isAnswered" : "label-item";
  }
  get isanswered() {
    return this._isAnswered;
  }

  // renderedCallback() {
  // console.log("here");
  // this.className = this._isAnswered ? "label-item isAnswered" : "label-item";
  // console.log(this._isAnswered);
  // }

  handleClick = () => {
    this.dispatchEvent(
      new CustomEvent("jumptoquestion", {
        detail: {
          index: this.idx - 1
        }
      })
    );
  };
}
