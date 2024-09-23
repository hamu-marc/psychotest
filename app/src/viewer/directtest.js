import {inject} from 'aurelia-framework';
import {PsychoApi} from '../components/psychoapi';
import {useView} from 'aurelia-templating';
import {Performtest} from './performtest';

@inject(PsychoApi)
@useView('./performtest.html')
export class Directtest extends Performtest {
  constructor(pa) {
    super(pa);
  }

  activate(params, routeConfig) {
    super.activate(params, routeConfig);
    super.starttest();
  }
  attached() {
    super.attached();
    this.state = 2;
  }
}
