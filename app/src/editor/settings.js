import {PsychoApi} from '../components/psychoapi';
import {I18N} from 'aurelia-i18n';
import {inject} from 'aurelia-framework';
//import {localforage} from 'localforage';
import {EventAggregator} from 'aurelia-event-aggregator';
import {EditRemote} from './messages';

@inject(I18N, PsychoApi, EventAggregator)

export class Settings {
  constructor(i18n, api,ea) {
    this.i18n = i18n;
    this.api = api;
    this.editing1 =  false;
    this.showpassword = false;
    this.ea = ea;
  }
  attached() {
    this.remoteitems = this.api.remote;
    //for (let key in this.api.remote) this.remoteitems.push(this.api.remote[key]);
    this.locale = this.i18n.getLocale();
    this.staticurl = this.api.staticurl;
    this.apiurl = this.api.apiurl;
    //this.endpoints = Array.from(this.api.remote.keys(), x =>{let a = x.slice(0); let y = {}; y.url = a; y.username = this.api.remote.get(x).username; y.password = this.api.remote.get(x).password; return y; });
    this.endpoints = [];
  }

  setEnglish() {
    this.i18n.setLocale('en');
    this.locale = this.i18n.getLocale();
  }
  setCzech() {
    this.i18n.setLocale('cs');
    this.locale = this.i18n.getLocale();
  }

  //store in local storage
  submit() {
    this.api.save(this.staticurl, this.apiurl);
  }

  //just cancel current changes
  cancel() {
    this.locale = this.i18n.getLocale();
    [this.staticurl, this.apiurl] = this.api.load();
  }
  //reset the localstorage
  reset() {
    [this.staticurl, this.apiurl] = this.api.reset();
  }

  delete(remoteitem) {
    //let index = this.api.remote.indexOf(remoteitem);
    //this.api.remote.splice(index, 1);
    this.api.deleteremote(remoteitem);
  }

  toggleshowpassword() {
    this.showpassword = !this.showpassword;
  }

  saveLocal() {
    this.api.saveLocal();
  }

  startEdit(key) {
    /*this.editing1 = true;
    let remoteitem = this.api.remote.get(key);
    this.editingitem = {
      index: key,
      id: key,
      type: remoteitem.type,
      downloadtoken: remoteitem.downloadtoken,
      uploadtoken: remoteitem.uploadtoken
    };
     */
    let remoteitem = this.api.remote.get(key);
    let editingitem = {
      index: key,
      id: key,
      type: remoteitem.type,
      downloadtoken: remoteitem.downloadtoken,
      uploadtoken: remoteitem.uploadtoken,
      resulttoken: remoteitem.resulttoken
    };
    //send message with editing remote to listening component
    this.ea.publish(new EditRemote(editingitem));
    //console.log('startedit', this.editing1, editingitem);
  }

  cancelEdit() {
    this.editing1 = false;
  }

}
