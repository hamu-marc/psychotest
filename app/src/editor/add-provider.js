import {PsychoApi} from '../components/psychoapi';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {EditRemote} from './messages';

@inject(PsychoApi, EventAggregator)
export class AddProvider {
  constructor(api, ea) {
    this.creatingRemote = false;
    this.api = api;
    this.ea = ea;
  }

  attached(){
    this.ea.subscribe(EditRemote, msg => this.startEdit(msg.item));
  }

  startEdit(remoteitem) {
    console.log('AddProvider startEdit():', remoteitem);
    this.creatingRemote = true;
    this.editingmode = true;
    this.newdownloadtoken = remoteitem.downloadtoken;
    this.newuploadtoken = remoteitem.uploadtoken;
    this.newresulttoken = remoteitem.resulttoken;
    this.newtype = remoteitem.type;
    this.newid = remoteitem.id;
    this.newindex = remoteitem.id;
  }

  startCreateRemote() {
    this.creatingRemote = true;
    this.editingmode = false;
  }

  submitCreateRemote() {
    this.creatingRemote = false;
    //console.log('submitCreateRemote newtype,dtoken,utoken', this.newtype, this.newdownloadtoken, this.newuploadtoken);

    this.api.remote.set(this.newid, {
      type: this.newtype,
      downloadtoken: this.extractToken(this.newdownloadtoken),
      uploadtoken: this.extractToken(this.newuploadtoken),
      resulttoken: this.extractToken(this.newresulttoken)
    });
    if (this.editingmode) {
      if (this.newindex !== this.newid) {
        //id changed, remove old index
        this.api.remote.delete(this.newindex);
      }
      this.editingmode = false;
    }
    this.api.saveLocal();
  }

  /* if it is URL begining with http - extracts token after last / and returns it */
  extractToken(item) {
    if (item && item.startsWith('http')) {
      let parts = item.split('/'); //split by /
      console.log('extractToken parts, item', parts, item);
      return parts[parts.length - 1];//last part after / is token
      //return item;

    }
    return item;
  }
  cancelCreateRemote() {
    this.creatingRemote = false;
  }
}

//https://psychoacoustic.hamu.cz/psychotest/index.html#/performtest/N4IgTgpgtg9gLhAlgqIBco4E8AOF0gDyA7gHYDGANjAK4Am5EAzqRHCADQh0xnUCGdODADWEUgQDqALwASANQCaxMAA0AHAEcAqnW0AFJiAC+XHPzgALAgHoDhSjc4hEdWwGYAjO4B09yp7qAPoAWuJY+hZBAGbRnj44CEzsxkA=
