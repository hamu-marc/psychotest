//import {HttpClient} from 'aurelia-http-client';

export class Provider {
  constructor(opts) {
    this.name = opts.name;
    this.typeid = opts.typeid;
    this.downloadtoken = opts.downloadtoken;
    this.uploadtoken = opts.uploadtoken;
    this.resulttoken = opts.resulttoken;
    this.downloadtokenenc = opts.downloadtokenenc;
    this.uploadtokenenc = opts.uploadtokenenc;
    this.downloadtokendec =  opts.downloadtokendec;
    this.uploadtokendec = opts.uploadtokendec;
    this.baseurl1 = '/';
    this.baseurl = this.baseurl1; //might be used to add proxy
    this.proxyurl = '';
    this.separatord = this.downloadtoken.endsWith('/') ? '' : '/';
  }

  getBaseUrl(resource) {
    //console.log('getBaseUrl resource', resource);
    return this.baseurl + (this.downloadtoken + (typeof resource === 'undefined' ? '' : this.separatord + resource)).replace(/\/\//g, '/');
  }

  getBaseOpts(url) {
    let headers = new Headers({
      'Accept': 'application/json',
      'X-Requested-With': 'Fetch'
    });
    return {
      method: 'GET',
      headers: headers,
      credentials: 'omit'
    };
  }

  putBaseOpts(url, content) {
    let headers = new Headers({
      'Accept': 'application/json',
      'X-Requested-With': 'Fetch'
    });
    return {
      method: 'PUT',
      headers: headers,
      body: content
    };
  }

  putResultBaseOpts(url, content) {
    return this.putBaseOpts(url, content);
  }
  mkcolBaseOpts(url) {
    let headers = new Headers({
      'Accept': 'application/json',
      'X-Requested-With': 'Fetch'
    });
    return {
      method: 'MKCOL',
      headers: headers
    };
  }


  getBaseUrlWithoutProxy(resource) {
    //console.log('getBaseUrl resource', resource);
    return this.baseurl1 + (this.downloadtoken + (typeof resource === 'undefined' ? '' : this.separatord + resource)).replace(/\/\//g, '/');
  }

  getStimuliBaseUrl(resource) {
    return this.getBaseUrlWithoutProxy(resource);
  }

  getStimuliBaseUrlWithProxy(resource) {
    return this.getStimuliBaseUrl(resource);
    //TODO fix #12 - peaks request cors
    //return this.proxyurl + this.getStimuliBaseUrl(resource);
    //return this.baseurl + (this.downloadtoken + (typeof resource === 'undefined' ? '' : this.separatord + resource)).replace(/\/\//g, '/');
  }

  getHeaders() {
    return headers;
  }

  listTests2(client) {
    //return client.get(this.getBaseUrl('test/'), {headers: this.getHeaders(), credentials: 'omit'})
    return client.get(this.getBaseUrl('test/'))
      .then(response=> {if (typeof response.text === 'function') return response.text(); return response.response;})
      .then(text=> {
        //console.log('listFiles text 1', text);
        return this.parseText(text);
      });
  }

  //performs fetch on text/index.json and index.json and if not success tries list files in /test/ and /
  listTests(client) {
    //let headers = this.getHeaders();
    //console.log('listTests calling getbaseurl');
    //let baseurl = this.getBaseUrl('test/index.json');
    //console.log('listTests baseurl1', baseurl);
    
    /*return client.fetch(this.getBaseUrl('test/index.json'), this.getBaseOpts())
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        //console.log('listTests error, url', error);
        //second attempt to fetch index.json
        return this.client.fetch(this.getBaseUrl('index.json'), this.getBaseOpts())
          .then(response => response.json())
          .then(data => {
            return data;
          })
          .catch(error2 => {
            //console.log('listTests error2', error);
            //third attempt to list files in provider dir
            return this.listFiles(client);
          });
      });*/
      //omit index.json and list files directly
      return this.listFiles(client);
  }

  //performs fetch on test/ and on / to see whether list of files is returned
  listFiles(client) {
    //let headers = this.getHeaders();
    return client.fetch(this.getBaseUrl('test/'), this.getBaseOpts('test/'))
      .then(response=> {if (typeof response.text === 'function') return response.text(); return response.response;})
      .then(text=> {
        //console.log('listFiles text 1', text);
        return this.parseText(text, 'test/');
      })
      .catch(error =>{
        //console.log('listFiles error', error);
        //fourth attempt to list files in provider root dir
        return client.fetch(this.getBaseUrl(''), this.getBaseOpts(''))
          .then(response=> {if (typeof response.text === 'function') return response.text(); return response.response;})
          .then(text=>{
            //console.log('listFiles text 2', text);
            return this.parseText(text, '');
          })
          .catch(errpr =>{
            console.log('listFiles error2', error);
            return [];
          });
      });
  }

  listTestsInPath(client, path) {
    return this.listFilesInPath(client, path);
    /* ommit index.json and get data directly
    return client.fetch(this.getBaseUrl(path + 'index.json'), this.getBaseOpts(path + 'index.json'))
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        return this.listFilesInPath(client, path);
      });
      */
  }

  listFilesInPath(client, path2) {
    //add ending '/' to the url path - it is recognized by subsequent getbaseurl or getbaseopts
    let path = ((path2.length === 0) || path2.endsWith('/')) ? path2 : path2 + '/';
    return client.fetch(this.getBaseUrl(path), this.getBaseOpts(path))
      .then(response=> {if (typeof response.text === 'function') return response.text(); return response.response;})
      .then(text=>{
        //console.log('listFiles text 2', text);
        return this.parseText(text, '');
      })
      .catch(error =>{
        console.log('listFiles error2', error);
        return [];
      });
  }
  parseText(txt, resource) {
    //TODO do convert <ul> <li> to data structure
    return [];
  }
  getFileContent(client, path2, id) {
    let path = path2.endsWith('/') ? path2 : path2 + '/';
    return client.fetch(this.getBaseUrl(path + id), this.getBaseOpts(path + id))
      .then(response=> {if (typeof response.text === 'function') return response.text(); return response;})
      .catch(error=>{
        if (typeof error.text === 'function') {
          error.text().then(etxt =>{
          window.alert('error retrieving test file:'+etxt);  
          console.log('error:',etxt);
        })} else {
          window.alert('error retrieving test file:'+error);
          console.log('error:',error);
        }
      })
    //.then(text =>{return text;});
  }

  getFileContentArrayBuffer(client, path2, id) {
    let path = path2.endsWith('/') ? path2 : path2 + '/';
    return client.fetch(this.getBaseUrl(path + id), this.getBaseOpts(path + id))
      .then(response=> {if (typeof response.arrayBuffer === 'function') return response.arrayBuffer(); return response;});
    //.then(text =>{return text;});
  }

  putFileContent(client, path2, id, content) {
    let path = path2.endsWith('/') ? path2 : path2 + '/';
    return client.fetch(this.getBaseUrl(path + id), this.putBaseOpts(path + id, content))
      .then(response=> {if (typeof response.text === 'function') return response.text(); return response.response;})
      .then(text =>{return text;});
  }

  putResultFileContent(client, path2, id, content) {
    let path = path2.endsWith('/') ? path2 : path2 + '/';
    return client.fetch(this.getBaseUrl(path + id), this.putResultBaseOpts(path + id, content))
      .then(response=> { return response;});
  }

  createFolder(client, path2, id) {
    let path = path2.endsWith('/') ? path2 : path2 + '/';
    return client.fetch(this.getBaseUrl(path + id), this.mkcolBaseOpts(path + id))
      .then(response=> {if (typeof response.text === 'function') return response.text(); return response.response;})
      .then(text =>{return text;});
  }
}

