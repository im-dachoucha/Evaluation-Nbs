import { LightningElement, api, track } from "lwc";

export default class Option extends LightningElement {
  @api option;
  @track isChecked = false;
  @track classList = "option";

  toggleIsCheck() {
    this.isChecked = !this.isChecked;
    this.classList = this.isChecked ? "option checked" : "option";
    this.dispatchEvent(
      new CustomEvent("togglecheck", {
        detail: {
          id: this.option.Id
        }
      })
    );
  }
}
