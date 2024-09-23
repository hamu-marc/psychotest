import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, doc, getDoc, setDoc } from "firebase/firestore"; 
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app'


import * as firebaseui from 'firebaseui';
import {LZString} from './lz-string';
import {ProviderFactory} from '../provider/providerfactory';
import * as localforage from 'localforage';
import {Psychoapigoogle} from './psychoapigoogle';
import {version} from '../../package.json';

//import {HttpClient} from 'aurelia-http-client';
/* Provides methods to return promise of data from REST Project api*/

function isIterable(obj) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}
@inject(HttpClient, Psychoapigoogle)
export class PsychoApi {

  constructor(httpclient,gapi) {
    this.httpclient = httpclient;
    this.googleapi = gapi;
    this.httpclient.configure(config => {
      config
        .rejectErrorResponses()
        .withBaseUrl('')
        .withDefaults({
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        });
    });
    this.apiurl = localStorage.getItem('psychotest.apiurl');
    if (this.apiurl === null) {
      if (window.location.hostname === 'localhost') this.apiurl = '/api';
      else this.apiurl = 'https://api.psychoacoustic.tk/api'; //TODO allow selection of predefined api urls
    }
    this.staticurl = localStorage.getItem('psychotest.staticurl');
    if (this.staticurl === null) this.staticurl = 'test/';
    this.projectapiurl = '/project';
    this.userinfoapiurl = '/userinfo';
    this.psychotestapiurl = '/psychotest';
    this.resulturl = '/psychotestresult';
    this.pausedtesturl = '/psychotestpaused';
    this.b2accessendpoint = '/b2access/endpoint';
    //this.gapikey = 'AIzaSyBvkssUtckXepcrn2V04PVThB-8xQJ8fLY'; //sheet api key allowing access to public google sheets

    //this.remote = [];//new Map();
    //this.remote = new Map();

    this.remotetype = new Map();
    this.remotetype.set('Pcloudpub', {type: 'Pcloudpub', title: 'Public pCloud', url: 'https://filedn.com/'});
    this.remotetype.set('Owncloudcesnet', {type: 'Owncloudcesnet', title: 'CESNET owncloud', url: 'https://owncloud.cesnet.cz/public.php/webdav/'});
    this.remotetype.set('Publicweb', {type: 'Publicweb', title: 'Public Web link.', url: 'https://psychoacoustic.hamu.cz/'});
    this.remotetype.set('B2drop', {type: 'B2drop', title: 'B2DROP', url: 'https://b2drop.eudat.eu/public.php/webdav/'});

    this.testdefinition = undefined;
    this.testid = '';
    this.testsource = '';
    this.userinfo = false;
    this.islogged = false;
    this.firebaseinitialized = false;
    this.lastResultSaved = true;
  }

  initLocalStorage() {
    if (this.remote) {let that = this; return new Promise(function(resolve, reject) { resolve(that.remote);});}
    //init local storage and stored settings
    //if logged - get local settings for user id
    let key = this.islogged ? 'psychoacoustic.remote.' + this.userinfo.uid : 'psychoacoustic.remote';

    //localforage.removeItem(key);
    //return expected promise
    return localforage.getItem(key)
      .then(data => {
        //console.log('psychoapi local data', data);
        if (data) {if (Array.isArray(data)) this.remote = new Map(data); else this.remote = new Map(Object.entries(data));} else {this.remote = new Map();}
        //console.log('psychoapi remote', this.remote);
        if (this.remote.size === 0) { // is empty, add demo test
          this.initEmptyStorage();
        }
        return this.remote;
      });
  }

  initEmptyStorage() {
    this.remote = new Map();
    this.remote.set('DEMO testy v2.0', JSON.parse(this.decompressContent('N4IgLgngDgpiBcIDyB3AdgYwDYHsCuAJhjAM5oxggA0IBO6uAhgWDgNYxoIgDqAXgAkAagE0UAJwAaADgCOAVQLyACiWog8UJi3aduIAL5A=')));
  }

  async initFireStore() {
    //TODO consider client side encrypting and decrypting
    if (this.islogged) {
      //const providersRef = collection(this.firestore,'providers');
      const providerRef = doc(this.firestore,'providers',this.userinfo.uid);
      const providerSnap = await getDoc(providerRef)
      if (providerSnap.exists()) {
        console.log('firestore data:', providerSnap.data());
        this.remote = new Map(Object.entries(providerSnap.data()));
      } else {
        console.log('firestore nodata, adding default data');
        this.initEmptyStorage();
      }
      /*return providerRef.get()
        .then(x=> {
          if (x.exists) {
            console.log('firestore data:', x.data());
            this.remote = new Map(Object.entries(x.data()));
          } else {
            console.log('firestore nodata, adding default data');
            this.initEmptyStorage();
          }
        });*/
    } else {
      //init localforage
      return this.initLocalStorage();
    }
  }

  //delete remote provider
  deleteremote(key) {
    this.remote.delete(key);
    //save changes to local or firestore
    this.saveLocal();
  }

  async saveLocal() {
    let key2 = this.islogged ? 'psychoacoustic.remote.' + this.userinfo.uid : 'psychoacoustic.remote';
    if (this.islogged) {
      //save into firestore
//      let providerRef = this.firestore.collection('providers').doc(this.userinfo.uid);
      const providerRef = doc(this.firestore,'providers',this.userinfo.uid);
      // convert map to object https://gist.github.com/lukehorvat/133e2293ba6ae96a35ba
      //const data = this.remote.entries().reduce((main, [key, value]) => ({...main, [key]: value,{})
      const data = Array.from(this.remote.entries()).reduce((main, [key, value]) => ({...main, [key]: value}), {});
      console.log('saving to firestore data:', data);
      await setDoc(providerRef,data);
    } else {
      //save to localstorage - or indexeddb
      const data = Array.from(this.remote.entries()).reduce((main, [key, value]) => ({...main, [key]: value}), {});
      //debug
      console.log('remote entries', this.remote.entries());
      console.log('arrayfrom', Array.from(this.remote.entries()));
      console.log('data', data);
      localforage.setItem(key2, data)
        .then(x => {
          console.log('OK2');
        })
        .catch(e => {
          console.log('saveLocal() error', e);
        });
    }
  }

  getMetadatas(id) {
    let metadataurl = this.dataurl + '/' + id + '/metadata';
    return this.httpclient.fetch(metadataurl)
      .then(response =>response.json())
      .then(data=> {return data;});
  }

  /**
   * Performs GET request to REST API and returns definition item of returned test record.
   * @returns { data.definition item }
   */
  getApiTestDefinition2(testid) {
    return this.httpclient.fetch(this.apiurl + this.psychotestapiurl + '/' + testid)
      .then(response=> {
        let testheaders = response.headers;
        //console.log('getapi test headers',testheaders.get);
        this.testetag = testheaders.get('ETag');
        return response.json();
      })
      .then(data=>{
        //        console.log('Psychoapi.getselectedtestdefinition:', data);
        return data.definition;
      });
  }
  /**
   * Performs GET request to REST API and returns definition item of returned test record.
   * @returns { data.definition item }
   */
  getApiTestDefinition(testid) {
    return this.httpclient.fetch(this.apiurl + this.psychotestapiurl + '/' + testid)
      .then(response=> {
        let testheaders = response.headers;
        //console.log('getapi test headers',testheaders.get);
        this.testetag = testheaders.get('ETag');
        return response.json();
      })
      .then(data=>{
        //        console.log('Psychoapi.getselectedtestdefinition:', data);
        return data.definition;
      });
  }

  patchApiTestDefinition(testid, testdef) {
    let body = {definition: testdef, owner: this.userinfo.id ? this.userinfo.id : ''};
    let headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'Fetch'
      //'If-Match': this.testetag
    });
    console.log('saving test', testid);
    return this.httpclient.fetch(this.apiurl + this.psychotestapiurl + '/' + testid, {method: 'PATCH', body: json(body), headers: headers})
      .then(response=> {
        let testheaders = response.headers;
        //console.log('getapi test headers',testheaders.get);
        this.testetag = testheaders.get('ETag');
        return response.json();
      })
      .then(data=>{
        //        console.log('Psychoapi.getselectedtestdefinition:', data);
        return data.definition;
      });
  }
  putApiTestDefinition(testid, testdef) {
    let body = {definition: testdef, owner: this.userinfo.id ? this.userinfo.id : ''};
    let headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'Fetch',
      'If-Match': this.testetag
    });
    console.log('saving test', testid);
    return this.httpclient.fetch(this.apiurl + this.psychotestapiurl + '/' + testid, {method: 'PUT', body: json(body), headers: headers})
      .then(response=> {
        let testheaders = response.headers;
        //console.log('getapi test headers',testheaders.get);
        this.testetag = testheaders.get('ETag');
        return response.json();
      })
      .then(data=>{
        //        console.log('Psychoapi.getselectedtestdefinition:', data);
        return data.definition;
      });
  }

  postApiTestDefinition(testdef, name) {
    //put owner information, if no owner -TODO reject posting
    let body = {definition: testdef, name: name, snippet: testdef.slice( 0, 80), owner: this.userinfo.id ? this.userinfo.id : ''};
    let headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'Fetch'
    });
    return this.httpclient.fetch(this.apiurl + this.psychotestapiurl, {method: 'POST', body: json(body), headers: headers})
      .then(response=> {
        let testheaders = response.headers;
        //console.log('getapi test headers',testheaders.get);
        this.testetag = testheaders.get('ETag');
        return response.json();
      });
  }

  delete(testid, testsource) {
    if (!testsource) {
      return this.httpclient.fetch(this.apiurl + this.psychotestapiurl + '/' + testid, {method: 'DELETE'});
    }
  }

  /**
   * performs GET request to REST API with projection to snippet, name, owner
   * @returns { _items returned in response - array of tests }
   */
  getApiTests() {
    return this.httpclient.fetch(this.apiurl + this.psychotestapiurl + '?where={"owner":"' + (this.userinfo.id ? this.userinfo.id : '') + '"}&projection={"snippet":1,"name":1,"owner":1,"_updated":1,"_created":1}')
      .then(response => response.json())
      .then(data => {
        //console.log('Pssychoapi.gettests:', data);
        return data._items;
      });
  }

  retrieveProjects() {
    return this.httpclient.fetch(this.apiurl + this.projectapiurl)
      .then(response => response.json())
      .then(data => { console.log('Psychoapi.getprojects:', data); return data;})
      .catch(error => {console.log('error when obtaining project list', error);});
  }


  getRemoteTestDefinition(id, testid) {
    let provider = new ProviderFactory(this.remote[id].type, this.remote[id]); //instantiate and returns provider implementation
    return this.httpclient.fetch(provider.getBaseUrl(testid), {headers: provider.getHeaders(testid)})
      .then(response=> response.text())
      .then(data=>{ return data;});
  }


  putRemoteTestDefinition(source, testid, testdef) {
    let headers = new Headers({
      'Accept': 'application/json',
      'X-Requested-With': 'Fetch'
    });
    console.log('saving test', source, testid);
    if (this.remote.has(source)) {
      headers.append('Authorization', 'Basic ' + btoa(this.remote.get(source).username + ':' + this.remote.get(source).password));
    }
    let body = testdef;
    return this.httpclient.fetch(source + testid, {method: 'PUT', headers: headers, body: body})
      .then(response=> response.text())
      .then(data=>{ return data;});
  }

  getStaticTests() {
    return this.getRemoteTests(this.staticurl);
  }

  getRemoteTests(source) {
    let headers = new Headers({
      'Accept': 'application/json',
      'X-Requested-With': 'Fetch'
    });
    if (this.remote.has(source)) {
      headers.append('Authorization', 'Basic ' + btoa(this.remote.get(source).username + ':' + this.remote.get(source).password));
    }
    /*return this.httpclient.fetch(source + 'index.json', {headers: headers})
      .then(response => response.json())
      .then(data => {  return data.map(x=>{x.source = source; return x; });}); //adds source item to every element
      */
  }

  getTestDefinitionold(id, source, path) {
    this.testid = id;
    this.testsource = source;
    if (this.testsource) {
      return this.getRemoteTestDefinition(this.testsource, this.testid)
        .then(data=>{
          //console.log('data');
          return data;
        });
    } else if (this.testid) {
      return this.getApiTestDefinition(this.testid)
        .then(data => {
          //console.log('data');
          return data;
          //this.editor.setValue(data);
        });
    } return new Promise(resolve => {});
  }


  saveTest(td, name) {
    //console.log('saving test:', td);
    this.testdefinition = td;
    if (this.testsource) {
      return this.putRemoteTestDefinition(this.testsource, this.testid, this.testdefinition)
        .catch(error =>{ alert('Error when saving the test:', error.message);});
    } else if (this.testid) {
      return this.patchApiTestDefinition(this.testid, this.testdefinition)
        .catch(error => {
          alert('Error when saving the test:', error.message);
        });
    }
    //create new
    return this.postApiTestDefinition(this.testdefinition, name)
      .then(x => {
        this.testid = x._id;
        this.testetag = x._etag;
      });
  }

  getUserInfo() {
    // returns userinfo data
    /*
    if (this.userinfo) return new Promise((resolve, reject) =>{resolve(this.userinfo);});

    return this.httpclient.fetch(this.apiurl + this.userinfoapiurl)
      .then(response => response.json())
      .then(data => { this.userinfo = data; return data;});
     */
    console.log('DEPRECATED call psychoapi.getUserInfo()');
  }

  save(surl, aurl) {
    localStorage.setItem('psychotest.apiurl', aurl);
    localStorage.setItem('psychtoest.staticurl', surl);
    this.apiurl = localStorage.getItem('psychotest.apiurl');
    this.staticurl = localStorage.getItem('psychotest.staticurl');
  }
  load() {
    this.apiurl = localStorage.getItem('psychotest.apiurl');
    if (this.apiurl === null) this.apiurl = '/api';
    this.staticurl = localStorage.getItem('psychotest.staticurl');
    if (this.staticurl === null) this.staticurl = 'test/';
    return [this.staticurl, this.apiurl];
  }
  reset() {
    this.apiurl = '/api'; //can be http://localhost:8080 or other
    this.staticurl = 'test/';
    localStorage.clear();
    return [this.staticurl, this.apiurl];
  }

  formatDate() {
    let date = new Date();
    /*
    let hours = date.getHours();
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let seconds = date.getSeconds();
    let milis = date.getMilliseconds();
    let strDate =  (date.getMonth() + 1) + date.getDate() + date.getFullYear() + '-' + hours + minutes + seconds + '-' + Math.floor(Math.random() * 100);
     */
    return date.toISOString().replace(/:/g, '-');
  }

  getLastResult() {
    return this.lastresult;
  }
  //TODO reimplement for data storage
  postResults(testResult, encid) {
    this.uploading = true;
    this.lastresult = json(testResult);
    //let body = {definition: testdef, name: name, snippet: testdef.slice( 0, 80), owner: this.userinfo.id ? this.userinfo.id : ''};
    //this.testsource = source;
    //this.testpath = path;
    let testconfstr = this.decompressContent(encid);
    //console.log('getEncTestDefinition testconfstr', testconfstr);
    let testconf = JSON.parse(testconfstr);
    //test if answer on first task is there, then add it to the name of the test
    let testfirsttask = 'X';
    if (testResult
      && testResult.resultItems
      && testResult.resultItems.length > 0
      && testResult.resultItems[0].task
      && testResult.resultItems[0].answer
      && (typeof testResult.resultItems[0].answer.replace === 'function')) {
      testfirsttask = testResult.resultItems[0].task.replace(/[^a-zA-Z0-9]/g, '') + '-' + testResult.resultItems[0].answer.replace(/[^a-zA-Z0-9]/g, '_');
    }
    let id = testconf.id + '.' + testfirsttask + '.' + this.formatDate() + '.v'+version+'.presult';
    let idcsv = testconf.id + '.' + testfirsttask + '.' + this.formatDate() + '.v'+version+'.csv';
    //console.log('getEncTestDefinition testconf', testconf);
    //let remoteitem = testconf.remoteitem
    /*localforage.getItem('psychotest-result-index')
      .then(data1=>{
        let data;
        if (data1) data = data1; else data = 0;
        data = data + 1;
        localforage.setItem('result-' + data, json(testResult));
        localforage.setItem('psychotest-result-index', data);
        if (data > 10) localforage.removeItem('result-' + (data - 10));
      });
*/
    if (testconf.remoteitem) {
      let provider = new ProviderFactory(testconf.remoteitem.type, testconf.remoteitem);
      //UPDATE - CSV wont be put to remote storage
      // first try to put CSV
      /*let csvcontent = this.generateCSV(testResult);
      provider.putResultFileContent(this.httpclient, testconf.path, idcsv, csvcontent)
        .catch(err => {console.log('put csv cause error:', err);});
       */
      //second save presult file - this promise will be returned
      return provider.putResultFileContent(this.httpclient, testconf.path, id, json(testResult)).finally(()=>{this.uploading = false;});
    }
    this.uploading = false;
    console.log('Error provider not found', testconf, path);
    console.log('result:', testResult);
    return '';
    /*
    let headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'Fetch'
    });
    return this.httpclient.fetch(this.apiurl + this.resulturl, {method: 'POST', body: json(testResult), headers: headers})
      .then(response=> {
        //let testheaders = response.headers;
        //console.log('getapi test headers',testheaders.get);
        //this.testetag = testheaders.get('ETag');
        return response.json();
      });
 */
  }

  deletePausedTest(id) {
    return this.httpclient.fetch(this.apiurl + this.pausedtesturl + '/' + id, {method: 'DELETE'});
  }

  releasePausedTest() {
    if (this.resumeid && this.resumeid > 0) {
      this.deletePausedTest(this.resumeid)
        .then(data2 => {
          if (data2.ok) {
            this.resumeid = 0;
          }
        });
    }
  }

  postPausedTest(testres) {
    let headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'Fetch'
    });
    return this.httpclient.fetch(this.apiurl + this.pausedtesturl, {method: 'POST', body: json(testres), headers: headers})
      .then(response => response.json())
      .then(data => {return data;});
  }

  putPausedTest(resumeid, testres) {
    let headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'Fetch'
    });
    return this.httpclient.fetch(this.apiurl + this.pausedtesturl + '/' + resumeid, {method: 'PUT', body: json(testres), headers: headers})
      .then(response => response.json())
      .then(data => {return data;});
  }

  getPausedTest(resumeid) {
    return this.httpclient.fetch(this.apiurl + this.pausedtesturl + '/' + resumeid)
      .then(response => response.json())
      .then(data => {return data;});
  }

  getB2AccessEndpoint() {
    return this.httpclient.fetch(this.apiurl + this.b2accessendpoint)
      .then(response => response.text())
      .then(data => {return data;});
  }

  /**
   * New authentication via firebase
   */
  constructorFirebase() {
    if (!this.firebaseinitialized) {
      this.firebaseConfig = {
        apiKey: 'AIzaSyArmFKZq8_OPM3FCBemMibVULgCXmN8_Dg',
        authDomain: 'psychoacoustic-eb37f.firebaseapp.com',
        databaseURL: 'https://psychoacoustic-eb37f.firebaseio.com',
        projectId: 'psychoacoustic-eb37f',
        storageBucket: 'psychoacoustic-eb37f.appspot.com',
        messagingSenderId: '101126416760',
        appId: '1:101126416760:web:28a5a0446d65fe4220808d',
        measurementId: 'G-2ZNBYLRN33'
      };
      // Initialize Firebase
      //firebase.initializeApp(this.firebaseConfig);
      const app = initializeApp(this.firebaseConfig);
      //firebase.analytics();
      //this.firebase = firebase;
      this.firestore = getFirestore(app);
      this.firebaseinitialized = true;
      this.auth = getAuth();
      this.ui = new firebaseui.auth.AuthUI(this.auth);
    }
  }

  initializeFirebaseUI(elid) {
    window.accountinst = this;
    //console.log('psychoapi this:', this);
    let uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          console.log('login success', authResult);
          window.accountinst.token = authResult.credential ? authResult.credential.accessToken : '';
          // The signed-in user info.
          window.accountinst.userinfo = authResult.user;
          //console.log('firebase logged with authResult', authResult);
          //console.log('firebase logged with token: and user:', window.accountinst.token, window.accountinst.user);
          window.accountinst.islogged = true;
          window.accountinst.loginActions.bind(window.accountinst);
          return true;
        },
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          //document.getElementById('loader').style.display = 'none';
        }
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      signInSuccessUrl: '#/account',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
        /*{
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
          // Allow the user the ability to complete sign-in cross device,
          // including the mobile apps specified in the ActionCodeSettings
          // object below.
          forceSameDevice: false,
          emailLinkSignIn: function() {
            window.accountinst.islogged = true;
            window.accountinst.loginActions();
            return {
              // Additional state showPromo=1234 can be retrieved from URL on
              // sign-in completion in signInSuccess callback by checking
              // window.location.href.
              url: 'https://www.example.com/completeSignIn?showPromo=1234',
              // Custom FDL domain.
              dynamicLinkDomain: 'example.page.link',
              // Always true for email link sign-in.
              handleCodeInApp: true,
              // Whether to handle link in iOS app if installed.
              iOS: {
                bundleId: 'com.example.ios'
              },
              // Whether to handle link in Android app if opened in an Android
              // device.
              android: {
                packageName: 'com.example.android',
                installApp: true,
                minimumVersion: '12'
              }
            };
          }
        }*/
      ],
      // Terms of service url.
      tosUrl: '/termsandcondition.html',
      // Privacy policy url.
      privacyPolicyUrl: '/datapolicy.html'
    };
    this.ui.start(elid, uiConfig);
  }

  //do login actions - after logged in
  loginActions() {
    console.log('login actions, this object:', this)
    this.initFireStore();
  }

  logout() {
    return this.auth.signOut()
      .then(x => {
        this.userinfo = false;
        this.islogged = false;
        this.initFireStore();
      })
      .catch(x => {
        // An error happened
        console.log('logout error:', error);
      });
  }

  compressContent(str) {
    return LZString.compressToBase64(str);
  }
  decompressContent(base64str) {
    return LZString.decompressFromBase64(base64str);
  }

  /**
   * new implementation provider
   *
   */
  getTests2(remoteitem) {
    let provider = new ProviderFactory(remoteitem.type, remoteitem); //instantiate and returns provider implementation
    //first attempt to fetch test/index.json
    return provider.listTests(this.httpclient);
  }

  getRemote(providername) {
    return this.remote.get(providername);
  }

  getTests(providername, path) {
    let remoteitem = this.getRemote(providername);
    if (remoteitem) {
      let provider = new ProviderFactory(remoteitem.type, remoteitem);
      return provider.listTestsInPath(this.httpclient, path);
    }
    console.log('Error provider not found', providername, path);
    return [];
  }

  getTestDefinition(id, source, path) {
    this.testid = id;
    this.testsource = source;
    this.testpath = path;

    let remoteitem = this.getRemote(this.testsource);
    if (remoteitem) {
      let provider = new ProviderFactory(remoteitem.type, remoteitem);
      return provider.getFileContent(this.httpclient, path, id);
    }
    console.log('Error provider not found', this.testsource, path);
    return '';
  }

  getBaseUrl(id, source, path) {
    let remoteitem = this.getRemote(source);
    if (remoteitem) {
      let provider = new ProviderFactory(remoteitem.type, remoteitem);
      //return provider.getFileContent(this.httpclient, path, id);
      return provider.getBaseUrlWithoutProxy(path);
    }
    console.log('Error provider not found', source, path);
    return '';
  }

  getStimuliBaseUrl(id, source, path) {
    let remoteitem = this.getRemote(source);
    if (remoteitem) {
      let provider = new ProviderFactory(remoteitem.type, remoteitem);
      //return provider.getFileContent(this.httpclient, path, id);
      return provider.getStimuliBaseUrl(path);
    }
    console.log('Error provider not found', source, path);
    return '';
  }

  getEncTestDefinition(encid) {
    this.lastencid = encid;
    let testconfstr = this.decompressContent(encid);
    console.log('getEncTestDefinition testconfstr', testconfstr);
    let testconf = JSON.parse(testconfstr);
    //console.log('getEncTestDefinition testconf', testconf);
    //let remoteitem = testconf.remoteitem
    if (testconf.remoteitem) {
      let provider = new ProviderFactory(testconf.remoteitem.type, testconf.remoteitem);
      return provider.getFileContent(this.httpclient, testconf.path, testconf.id);
    }
    console.log('Error provider not found', testconf, path);
    return '';
  }

  getFileContentFromLastEnc(path) {
    let testconfstr = this.decompressContent(this.lastencid);
    console.log('getEncTestDefinition testconfstr', testconfstr);
    let testconf = JSON.parse(testconfstr);
    //console.log('getEncTestDefinition testconf', testconf);
    //let remoteitem = testconf.remoteitem
    if (testconf.remoteitem) {
      let provider = new ProviderFactory(testconf.remoteitem.type, testconf.remoteitem);
      return provider.getFileContentArrayBuffer(this.httpclient, testconf.path, path);
    }
    console.log('Error provider not found', testconf, path);
    //TODO return promise - reject
    return '';
  }

  getJsonContentFromLastEnc(path) {
    let testconfstr = this.decompressContent(this.lastencid);
    console.log('getEncTestDefinition testconfstr', testconfstr);
    let testconf = JSON.parse(testconfstr);
    //console.log('getEncTestDefinition testconf', testconf);
    //let remoteitem = testconf.remoteitem
    if (testconf.remoteitem) {
      let provider = new ProviderFactory(testconf.remoteitem.type, testconf.remoteitem);
      return provider.getFileContent(this.httpclient, testconf.path, path);
    }
    console.log('Error provider not found', testconf, path);
    //TODO return promise - reject
    return '';
  }

  //returns base url encoded in encid
  getEncBaseUrl(encid) {
    let testconfstr = this.decompressContent(encid);
    //console.log('getEncTestDefinition testconfstr', testconfstr);
    let testconf = JSON.parse(testconfstr);
    console.log('getEncTestDefinition testconf', testconf);
    if (testconf.remoteitem) {
      let provider = new ProviderFactory(testconf.remoteitem.type, testconf.remoteitem);
      //with or without proxy?Withoutproxy and with stimuli url
      let base1 = provider.getBaseUrl(testconf.path);
      let base2 = provider.getBaseUrlWithoutProxy(testconf.path);
      let base = provider.getStimuliBaseUrl(testconf.path);
      let baseproxy = provider.getStimuliBaseUrlWithProxy(testconf.path);
      console.log('psychoapi.getencbaseurl() baseurl,withoutproxy,stimulibaseurl,simuliproxy:', base1, base2, base, baseproxy);
      return {base, baseproxy};
    }
    console.log('warning: no base url for id', id);
    return '';
  }


  getTestEncId(id, source, path) {
    let myremoteitem = {...this.getRemote(source)}; //shallow clone ES6
    delete myremoteitem.uploadtoken; //remove uploadtoken
    let testconf = {remoteitem: myremoteitem, path: path, id: id};
    let enctestconf = this.compressContent(JSON.stringify(testconf));
    let enctestconf2 = this.compressContent(btoa(JSON.stringify(testconf)));
    return enctestconf;
  }

  putTestDefinition(id, source, path, content) {
    this.testid = id;
    this.testsource = source;
    this.testpath = path;

    let remoteitem = this.getRemote(this.testsource);
    if (remoteitem) {
      let provider = new ProviderFactory(remoteitem.type, remoteitem);
      return provider.putFileContent(this.httpclient, path, id, content);
    }
    console.log('Error provider not found', this.testsource, path);
    return '';
  }


  createFolder(id, source, path) {
    this.testsource = source;
    this.testpath = path;
    let remoteitem = this.getRemote(this.testsource);
    if (remoteitem) {
      let provider = new ProviderFactory(remoteitem.type, remoteitem);
      return provider.createFolder(this.httpclient, path, id);
    }
    console.log('Error provider not found', this.testsource, path);
    return '';
  }

  /**
   * Helper method to save myresult as CSV
   * @param myresult
   */
  saveAsCSV(myresult) {
    let filename = prompt('Zadejte jméno souboru (*.csv):', 'vysledektestu.csv');
    if (filename) {
      let csvcontent = this.generateCSV(myresult);
      //adds csv as extension
      if (!filename.endsWith('.csv')) filename = filename.concat('.csv');
      //labels first row
      //let content = this.data.join(',');//'Time,' + this.labels + '\n';
      //transpose each row = variable in specific time
      //let content = this.csvcontent();
      let blob = new Blob([csvcontent], {type: 'text/csv;charset=utf-8;'});
      saveAs(blob, filename);
    }
  }

  /**
   * Generates CSV from result data
   * @param data
   * @returns {string}
   */
  generateCSV(data) {
    //parses structure
    let arraydata = this.parseResultData(data);
    let content = '"sep=|"\n';
    //console.log('generateCSV arraydata', arraydata);
    for (let row of arraydata) {
      //all columns data wrapped by " and joined by pipe, every " is replaced in data by '
      let rowstr = row.map(x => '"' + ((typeof(x) === 'string') ? x.replace(/"/g, "'") : x) + '"').join('|');
      content += rowstr + '\n';
    }
    return content;
  }
  /**
   * Generates CSV from result data
   * @param data
   * @returns {string}
   */
  generateCSV2(data) {
    //do not parse structure - array is already presented
    let arraydata = this.parseResultData2(data);
    let content = '"sep=|"\n';
    //console.log('generateCSV arraydata', arraydata);
    for (let row of arraydata) {
      //all columns data wrapped by " and joined by pipe, every " is replaced in data by '
      let rowstr = row.map(x => '"' + ((typeof(x) === 'string') ? x.replace(/"/g, "'") : x) + '"').join('|');
      content += rowstr + '\n';
    }
    return content;
  }

  /** helper method to parse result of a test and generates array of rows with result items
   * creates columns testname, testuser, case,task,question, options, answer, date, other
   * other may contain other structured data for answer - JSON string and flattened structure
   * @param data
   * @returns {string[][]}
   */
  parseResultData(jsondata) {
    //console.log('Psychoapi paresresultdata()', jsondata);
    //let jsondata = JSON.parse(data);
    //console.log('results.openresult() jsondata', jsondata);
    let arraydata = [['testname', 'testuser', 'case', 'task', 'answer', 'date', 'options',  'other']]; //removed question
    arraydata.push([jsondata.name, jsondata.user]);
    this.parseResultDataArray(jsondata.resultItems, arraydata);
    return arraydata;
  }

  /** clone of helper method - but jsondata are direct no resultitems or etc.
   * @param data
   * @returns {string[][]}
   */
  parseResultData2(jsondata) {
    //console.log('Psychoapi paresresultdata()', jsondata);
    //let jsondata = JSON.parse(data);
    //console.log('results.openresult() jsondata', jsondata);
    //let arraydata = [['testname', 'testuser', 'case', 'task', 'answer', 'date', 'options',  'other']]; //removed question
    //FIX data changed format
    //arraydata.push([jsondata.name, jsondata.user]);
    //this.parseResultDataArray(jsondata, arraydata);
    return jsondata;//arraydata;
  }

  parseResultDataArray(jsondata, arraydata) {
    for (let ri of jsondata) {//jsondata.resultItems FIX data changed format
      let answer;
      let notes = [];
      if (typeof ri.answer === 'undefined') answer = '';
      else if (typeof ri.answer === 'number') answer = ri.answer.toString();
      //else if (!ri.answer) answer = '';
      else if (typeof ri.answer === 'string') answer = ri.answer;
      else {
        let answer2 = JSON.stringify(ri.answer);
        //replace quotes by single quotes
        let answer1 = answer2.replace(/"/g, "'");
        //answer = answer1.replace(/,/g, ';');
        //replace newline by space
        answer = answer1.replace(/\n/g, ' ');
        //console.log('results openresult() ri.answer', ri.answer);

        if (isIterable(ri.answer)) {
          for (let aitem of ri.answer) {
            for (let key in aitem) {
              notes.push(key);
              notes.push(aitem[key]);
            }
          }
        }
      }
      let row = ['', '', ri.case, ri.task, answer, ri.date, ri.options, ri.note ? ri.note : '']; //removed ri.question
      row.push([...notes]);
      arraydata.push(row);
    }
  }

  /***
   * Loads json with dashboard test definition
   */
  getDashboardTests() {
    return this.httpclient.fetch('resources/dashboard.json')
      .then(response =>response.json())
      .then(data=> {return data;});
  }

  getEduResults(filename) {
    //get edu results from google sheet
    if (filename.startsWith('https://docs.google.com')) {
      return this.googleapi.getGSheetApi(filename)
        .then(response => {
          return this.sheetToArray(response);
        });
    }
    //get edu results from provider
    return this.getJsonContentFromLastEnc(filename)
      .then(response => {
        //console.log('response', response);
        if (filename.endsWith('.csv')) {
          //parse CSV
          let raweduresults = this.csvToArray(response, ';');
          return raweduresults;
        }
        //probably JSON - presult
        let raweduresults = JSON.parse(response);
        return raweduresults.resultItems;
      });
  }

  csvToArray(str, delimiter = ',') {
    // slice from start of text to the first \n index
    //newline, detect whether windows delimiter \r\n or only linux delimiter \n
    let newline = '\n';
    if (str.indexOf('\r\n') > -1); newline = '\r\n';
    const firstrow = str.slice(0, str.indexOf(newline));
    let i = 0;
    if (firstrow.startsWith('sep=')) { //force delimiter to be as specified in the file
      delimiter = firstrow[4]; //char at position 4 - after sep=
      i = 1; //headers and other rows are row after
    }
    // use split to create an array from string by delimiter
    const headers = str.slice(i, str.indexOf(newline)).split(delimiter);

    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf(newline) + i + 1).split('\n');

    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map(function(row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function(object, header, index) {
        object[header] = values[index] ? values[index].trim() : values[index]; //trim \r or \n or other whitespace char
        if ((header === 'answer') && (/\d\,\d/.test(object[header]))) {  //convert localized values number '1,5' to '1.5' ???
          //replace , by .
          object[header] = object[header].replace(',','.');
        }
        return object;
      }, {});
      return el;
    });

    // return the array
    return arr;
  }

  sheetToArray(jsonrawarray) {
    const headers = jsonrawarray.values[0];
    const rows = jsonrawarray.values.slice(1);
    const arr = rows.map(function(values) {
      const el = headers.reduce(function(object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });
    return arr;
  }

  getGjsHtml(){
    if (this.gjs) {
      return '<style>'+this.gjs.getCss()+'</style>'+this.gjs.getHtml()
    } else return "";
  }

  setGjsHtml(content){
    if (this.gjs) {
      //separate <style>...</style> from the rest
      // Extract CSS
      const cssMatch = content.match(/<style>([\s\S]*?)<\/style>/);
      const mycss = cssMatch ? cssMatch[1] : '';

      function removeSpecificRules(css, selectors) {
        // Create a regular expression to match the specific selectors and their rules
        const regex = new RegExp(`\\s*${selectors.join('\\s*\\{[^}]*\\}\\s*|\\s*')}\\s*\\{[^}]*\\}`, 'g');
        // Replace the matched rules with an empty string
        return css.replace(regex, '').trim();
      }
      
      
      // Remove rules for '*' and 'body'
      const cleanedCss = removeSpecificRules(mycss, ['\\*', 'body']);
      
      // Output the cleaned CSS
      //console.log(cleanedCss);
      
      // Set the cleaned CSS back to GrapesJS
//      editor.setStyle(cleanedCss);
      

      // Extract HTML
      const myhtml = content.replace(/<style>[\s\S]*?<\/style>/, '');
      this.gjs.setComponents(myhtml);
      this.gjs.setStyle(cleanedCss);
    }
  }

  encodeGjs(){
    if (this.gjs) {
      const ghtml = this.getGjsHtml();
      const enchtml = this.compressContent(ghtml);
      return enchtml;
    }
  }

  decodeGjs(enccontent) {
    const dechtml = this.decompressContent(enccontent);
    if (this.gjs) {
      this.setGjsHtml(dechtml);
    }
    return dechtml;      
  }

// Import localForage if you're using modules
// import localForage from 'localforage';

// Function to add an item to the FIFO array
async localStore(newItem) {
  // Retrieve the existing array from localForage
  let fifoArray = await localforage.getItem('testResult') || [];

  // Add the new item
  fifoArray.push(newItem);

  // Ensure the array doesn't exceed 20 items
  if (fifoArray.length > 20) {
      fifoArray.shift(); // Remove the oldest item
  }

  // Save the updated array back to localForage
  await localForage.setItem('testResult', fifoArray);
}

async localGet() {
  let fifoArray = await localforage.getItem('testResult') || [];
  //now append older results for compatibility
  let data1 = await localforage.getItem('psychotest-result-index')
  let data;
  if (data1) { 
    data = data1;
    let lowindex=data-9;
    if (data<10) lowindex = 0;
    for (let i =lowindex;i<=data;i++) {
      let oldresult = await localforage.getItem('result-'+i);
      let oldresultcontent = JSON.parse(oldresult);
      let oldname = oldresultcontent.name;
      let olddate = oldresultcontent.resultItems?oldresultcontent.resultItems[0].date:'';
      fifoArray.push({'name':'old-'+oldname,'date':olddate,'result':oldresult})
    }
  }
  return fifoArray;
}

// Example usage
/*addToFifoArray({ someProperty: 'someValue' }).then(() => {
  console.log('Item added to FIFO array in localForage');
});*/  

}
