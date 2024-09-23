import {I18N} from 'aurelia-i18n';
import {inject} from 'aurelia-framework';

@inject(I18N)
export class Switchlang {
  constructor(i18n) {
    this.i18n = i18n;
  }

  setEN() {
    this.i18n.setLocale('en');
  }

  setCZ() {
    this.i18n.setLocale('cs');
  }
}
