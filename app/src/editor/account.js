
import {PsychoApi} from '../components/psychoapi';
import {inject} from 'aurelia-framework';
//import {Psychoapifirebase} from '../components/psychoapifirebase';

@inject(PsychoApi)
export class Account {
  constructor(api) {
    this.api = api;
    this.ui = false;
  }
  attached() {
    this.api.constructorFirebase();
    if (!this.ui) {
      this.ui = this.api.initializeFirebaseUI('#firebaseui-auth-container');
    }
  }

  logout() {
    this.api.logout();
  }
}
