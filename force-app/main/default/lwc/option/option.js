import { LightningElement, api, track } from "lwc";

export default class Option extends LightningElement {
  _option;
  @api
  get option() {
    return this._option;
  }
  set option(value) {
    this._option = JSON.parse(JSON.stringify(value));
  }
  @track classList = "option";

  renderedCallback() {
    this.classList = this._option.isChecked ? "option checked" : "option";
  }

  toggleIsCheck() {
    this.dispatchEvent(
      new CustomEvent("togglecheck", {
        detail: {
          id: this.option.Id
        }
      })
    );
  }
}
