import {version} from '../../package.json';
import {bindable} from 'aurelia-templating';

export class NavBar {
  @bindable router;
  constructor() {
    this.version = version;
  }
}
