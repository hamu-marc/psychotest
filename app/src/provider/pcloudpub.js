import {Provider} from './provider';
import {filetype} from '../components/filetype';

export class Pcloudpub extends Provider {
  constructor(opts) {
    super(opts);
    this.proxyurl = 'https://psychoacoustic-proxycors.herokuapp.com/'; //no-cors proxy microservice
    this.baseurl1 = 'https://filedn.com/';
    this.baseurl = this.proxyurl + this.baseurl1;
  }

  /*getBaseUrl(resource) {
    return super.getBaseUrl(resource);
  }*/

  /*getHeaders() {
    return super.getHeaders();
  }*/

  //parses response from HTML request
  parseText(txt, resource) {
    //console.log('Provider parseText() called');
    let parser = new DOMParser();
    let htmlDoc = parser.parseFromString(txt, 'text/html');
    //console.log('parseText() htmldoc', htmlDoc);
    let scripts = htmlDoc.getElementsByTagName('script');
    //console.log('parseText() scripts', scripts);
    let lastscript = scripts[scripts.length - 1];
    //console.log('parseText() lastscript', lastscript);
    let scriptcontent = lastscript.innerHTML;
    //console.log('parseText() lastscript', scriptcontent);
    //pcloud specific
    let resultjson = scriptcontent.slice(scriptcontent.indexOf('{'), scriptcontent.lastIndexOf('}') + 1);
    //console.log('parseText() resultjson', resultjson);

    let pcloudjson = JSON.parse(resultjson);
    let mydata = [];
    let baseurlnoproxy = this.getBaseUrlWithoutProxy(resource);
    //convert pcloud structure to what is expected by dashboard
    for (let file of pcloudjson.content) {
      mydata.push({
        isdir: file.icon === 20,
        name: file.name,
        snippet: '',
        _id: file.name,
        _updated: file.modified,
        source: baseurlnoproxy
      });
    }
    //console.log('pcloudpub parseText() mydata', mydata);
    return mydata;
  }
}
