import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
@inject(HttpClient)
export class Psychoapigoogle {
//  static inject = [HttpClient];
  constructor(httpclient) {
    this.httpclient = httpclient;
    this.gapikey = 'AIzaSyBvkssUtckXepcrn2V04PVThB-8xQJ8fLY'; //sheet api key allowing access to public google sheets
  }

  getGSheetApi(rawurlfilename) {
    const urlel = rawurlfilename.split('/');
    const spreadSheetId = urlel[5];  
    const gsheeturl = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadSheetId + '/values/A1:E1000?key=' + this.gapikey;
    //url to not contain Sheet1 - get values from first visible sheet
    return this.httpclient.get(gsheeturl)
      .then(response => JSON.parse(response.response))
      .catch(error => {
        console.warn('some error')
      })
  }
}
