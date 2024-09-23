import refentext from 'raw-loader!./quickreference.en.md';
import refcstext from 'raw-loader!./quickreference.cs.md';
import {Converter} from 'showdown';
import {I18N} from 'aurelia-i18n';
import {inject} from 'aurelia-framework';

@inject(I18N)
export class Quickreference {
  constructor(i18n) {
    this.i18n = i18n;
  }
  attached() {
    this.converter = new Converter();
    this.text = (this.i18n.getLocale() === 'cs') ? refcstext : refentext;
    this.html = this.converter.makeHtml(this.text);
    //console.log('quickreference text,html',this.text,this.html);
  }
}
