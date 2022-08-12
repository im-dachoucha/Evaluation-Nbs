import { LightningElement, api } from "lwc";

export default class QuestionLabel extends LightningElement {
  @api idx;

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
