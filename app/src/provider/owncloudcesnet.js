//import {HttpClient} from 'aurelia-fetch-client';
//import {EventAggregator} from 'aurelia-event-aggregator';
//import {Editfile, Webdavresource} from './messages';
//import {PsychoApi} from '../components/psychoapi';
//import {inject} from 'aurelia-framework';
import {Provider} from './provider';

//@inject(PsychoApi, EventAggregator, HttpClient)
export class Owncloudcesnet extends Provider {
  constructor(opts) {
    super(opts);
    this.proxyurl = 'https://psychoacoustic-proxycors.herokuapp.com/'; //no-cors proxy microservice
    this.baseurl1 = 'https://owncloud.cesnet.cz/public.php/webdav/';
    //this.baseurl1 = 'https://owncloud.cesnet.cz/public.php/webdav/';
    this.baseurl2 = 'https://owncloud.cesnet.cz/index.php/s/';
    this.baseurl = this.proxyurl + this.baseurl1;

    /*this.client.configure(x => {
      x.withHeader('Authorization', 'Basic ' + btoa(this.downloadtoken + ':null'));
      x.withHeader('X-Requested-With', 'XMLHttpRequest');
      x.withHeader('Depth', '1');
      x.withInterceptor({
        request(message) {
          message.method = 'PROPFIND';
          return message;
        },
        requestError(error) {
          throw error;
        },
        response(message) {
          return message;
        },
        responseError(error) {
          throw error;
        }
      });
    });*/
    //even aggregator to listen for webdav resource to be presented/updated in panel
    /*this.pa = opts.pa;
    this.ea = opts.ea;
    this.ea.subscribe(Webdavresource, msg =>this.setwebdav(msg.webdavurl));
    //http client to perform WEBDAV queries
    this.httpclient = opts.httpclient;
    this.httpclient.configure(config => {
      config
        .rejectErrorResponses()
        .withBaseUrl('')
        .withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        });
    });
    this.webdavpath = '';///files/XufWqKau/';
    this.auth = false;
    */
    //hold depth of directory structure if cd into them
  }

  //curl 'https://owncloud.cesnet.cz/public.php/webdav/' -X PROPFIND -H 'Authorization: Basic NE4yTjJlMnJFczRoNVdJOm51bGw=' -H 'X-Requested-With: XMLHttpRequest' -H 'Depth: 1' -H 'Content-Type: application/xml; charset=UTF-8' -H 'Accept: */*'

  setwebdav(webdavurl, auth) {
    //console.log('setwebdav() obtained url:' + webdavurl);
    this.webdavpath = webdavurl;
    if (!webdavurl) {this.files = []; return;}
    //query the directory content
    let headers = auth ? {'Depth': '1', 'Authorization': 'Basic ' + auth} : {'Depth': '1'};
    return this.httpclient.fetch(this.webdavpath, {
      method: 'PROPFIND',
      headers: headers
    }).then(response => response.text())
      .then(str => (new window.DOMParser()).parseFromString(str, 'text/xml'))
      .then(data => {
        //parse structure https://stackoverflow.com/questions/17604071/parse-xml-using-javascript
        this.files = [];
        let tempfiles = [];
        let tempdirs = [];
        let filesDOM = data.getElementsByTagNameNS('DAV:', 'response');
        //console.log(data);
        for (let fileitem of filesDOM) {
          //console.log(fileitem);
          let fileurl = this.getFirstElementByTagNameNS(fileitem, 'DAV:', 'href');
          let filename = this.lastContextName(fileurl);
          let filedate = this.getFirstElementByTagNameNS(fileitem, 'DAV:', 'creationdate');
          let filesize = this.getFirstElementByTagNameNS(fileitem, 'DAV:', 'getcontentlength');
          let filetype = this.getContentType(fileitem);//FirstElementByTagNameNS(fileitem, 'DAV:', 'getcontenttype');
          //let contenttype = this.getContentType(fileitem);//FirstElementByTagNameNS(fileitem, 'DAV:', 'resourcetype');
          console.log(this.webdavpath + ' x ' + filename);

          let item = {};
          item.name = filename;//.replace(this.webdavpath, ''); //replaces the prefix
          item.nicename = this.formatName(filename);//
          item.date = filedate;
          item.nicedate = this.formatDate(new Date(filedate));
          item.isdir = filetype === 'httpd/unix-directory' || filetype === 'collection';
          item.size = filetype === 'httpd/unix-directory' || filetype === 'collection' ? 'DIR' : filesize;
          //convert to 4GB or 30MB or 20kB or 100b
          if (item.isdir) {
            item.nicesize = item.size;
          } else {
            if (~~(item.size / 1000000000) > 0) {
              item.nicesize = ~~(item.size / 1000000000) + 'GB';
            } else {
              if (~~(item.size / 1000000) > 0) {
                item.nicesize = ~~(item.size / 1000000) + 'MB';
              } else {
                item.nicesize = ~~(item.size / 1000) > 0 ? ~~(item.size / 1000) + 'kB' : item.size + ' b';
              }
            }

            item.type = filetype;
            item.webdavurl = this.webdavpath + item.name;
            //directory first, files after that
          }
          //console.log('adding item');
          //console.log(item);
          //if (fileurl === this.webdavpath) item.name = '..'; //first item might be the current dir
          if (item.isdir) tempdirs.push(item);//this.files.unshift(item);
          else tempfiles.push(item);//this.files.push(item);
        }
        //adds first row with '..' to cd to parent directory
        //if (this.dirs.length > 0)
        //ignore first dir - as it is self
        tempdirs.shift();//this.files.shift(); //first is self
        //concat dirs first, files last
        //console.log('dirs and files:',tempdirs,tempfiles);
        this.files = tempdirs.concat(tempfiles);
        //add first .. to be able to cd up
        this.files.unshift({name: '..', nicename: '..', isdir: true, nicesize: 'DIR', date: ''});
        return this.files;
      }).catch(error => {
        this.files = [];
        console.log('setwebdav() error');
        console.log(error);
        throw error;
      });
  }

  getFirstElementByTagName(fileitem, tag) {
    //console.log(tag);
    let elements = fileitem.getElementsByTagName(tag);
    //console.log(elements);
    return elements.length > 0 ? elements[0].textContent : '';
  }

  getFirstElementByTagNameNS(fileitem, ns, tag) {
    //console.log(tag);
    let elements = fileitem.getElementsByTagNameNS(ns, tag);
    //console.log(elements);
    return elements.length > 0 ? elements[0].textContent : '';
  }

  getContentType(fileitem) {
    //[0].firstChild.localName
    let rt = fileitem.getElementsByTagNameNS('DAV:', 'resourcetype');
    if (rt.length > 0 && rt[0].firstChild ) return rt[0].firstChild.localName;
    return this.getFirstElementByTagNameNS(fileitem, 'DAV:', 'getcontenttype');
  }

  lastContextName(str) {
    let str2 = str.endsWith('/') ? str.slice(0, str.lastIndexOf('/')) : str;
    let sli = str2.lastIndexOf('/');
    return sli >= 0 ? str.slice(sli) : str; //keep last slash
  }

  formatName(fn) {
    let filename = fn.replace(/%20/g, ' ');

    return filename.startsWith('/') ? filename.slice(1) : filename;
  }

  selectFile(file) {
    //file.webdavurl = this.webdavpath+file.name;
    if (file.isprovider) {
      this.auth = file.auth;
      this.setwebdav(file.url, file.auth);
    } else
    if (file.isdir) {
      let newdir = '';
      if (file.name === '..') {
        if (this.dirs.length === 0) { this.root(); return; } //going from current storage
        newdir = this.dirs.pop(); //going up inside storage
      } else {
        this.dirs.push(this.webdavpath);
        newdir = this.webdavpath + file.name;
      }
      this.setwebdav(newdir, this.auth);
    } else { 
      file.auth = this.auth; 
    //  this.ea.publish(new Editfile(file)); 
    }
  }

  formatDate(date) {
    let diff = new Date() - date; // the difference in milliseconds

    if (diff < 1000) { // less than 1 second
      return 'right now';
    }

    let sec = Math.floor(diff / 1000); // convert diff to seconds

    if (sec < 60) {
      return sec + ' sec. ago';
    }

    let min = Math.floor(diff / 60000); // convert diff to minutes
    if (min < 60) {
      return min + ' min. ago';
    }

    // format the date
    // add leading zeroes to single-digit day/month/hours/minutes
    let d = date;
    d = [
      '0' + d.getDate(),
      '0' + (d.getMonth() + 1),
      '' + d.getFullYear(),
      '0' + d.getHours(),
      '0' + d.getMinutes()
    ].map(component => component.slice(-2)); // take last 2 digits of every component

    // join the components into date
    return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
  }

  viewMetadata(file) {
    //not implemented in backend
  }

  getBaseUrl(resource) {
    //return super.getBaseUrl(resource);
    //owncloud seems to require token in 'Authorization' header
    if (resource.startsWith('/')) return this.baseurl + resource.slice(1);
    return this.baseurl + resource;
    //return this.baseurl1 + resource;
  }

  getStimuliBaseUrl(resource) {
    //https://owncloud.cesnet.cz/index.php/s/[token]/download?path=[path]&files=[file]
    //console.log('getstimulibaseurl() resource:', resource);
    if (typeof resource === 'undefined') {
      return this.baseurl2 + this.downloadtoken;
    }
    //split resource by path '/' and file
    let path = resource.substr(0, resource.lastIndexOf('/'));
    let file = resource.substr(resource.lastIndexOf('/') + 1, resource.length);
    return this.baseurl2 + (this.downloadtoken + this.separatord + '/download?path=' + path + '&files=' + file).replace(/\/\//g, '/');
  }

  getBaseOpts(url) {
    let method = ((url.length === 0) || url.endsWith('/')) ? 'PROPFIND' : 'GET'; //if listing directory/folder then webdav PROPFIND is invoked
    //otherwise GET
    let headers = new Headers({
      'Accept': '*/*',
      'X-Requested-With': 'XMLHttpRequest', //fix issue #29 cesnet-owncloud is case sensitive to this header value
      'Authorization': 'Basic ' + btoa(this.downloadtoken + ':null'), //it is expected that no password is required - null
      'Depth': '1'
    });
    return {
      method: method,
      headers: headers,
      credentials: 'omit'
    };
  }
  putBaseOpts(url, content) {
    let method = 'PUT';//((url.length === 0) || url.endsWith('/')) ? 'PROPFIND' : 'GET'; //if listing directory/folder then webdav PROPFIND is invoked
    //otherwise GET
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest', //fix issue #29 cesnet-owncloud is case sensitive to this header value
      'Authorization': 'Basic ' + btoa(this.uploadtoken + ':'), //it is expected that no password is required - null
      'Content-type': 'application/octet-stream'
    });
    return {
      method: method,
      headers: headers,
      credentials: 'omit', //fix browser error CORS policy - cannot send credentials to different host
      body: content
    };
  }

  putResultBaseOpts(url, content) {
    let method = 'PUT';//((url.length === 0) || url.endsWith('/')) ? 'PROPFIND' : 'GET'; //if listing directory/folder then webdav PROPFIND is invoked
    //otherwise GET
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest', //fix issue #29 cesnet-owncloud is case sensitive to this header value
      'Authorization': 'Basic ' + btoa(this.resulttoken + ':'), //it is expected that no password is required - null
      'Content-type': 'application/octet-stream'
    });
    return {
      method: method,
      headers: headers,
      credentials: 'omit', //fix browser error CORS policy - cannot send credentials to different host
      body: content
    };
  }

  mkcolBaseOpts(url) {
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest', //fix issue #29 cesnet-owncloud is case sensitive to this header value
      'Authorization': 'Basic ' + btoa(this.uploadtoken + ':'), //it is expected that no password is required - null
      'Content-type': 'application/octet-stream'
    });
    return {
      method: 'MKCOL',
      headers: headers,
      credentials: 'omit'
    };
  }


  parseText(txt, resource) {
    //console.log('Provider parseText() called');
    let data = (new window.DOMParser()).parseFromString(txt, 'text/xml');
    //parse structure https://stackoverflow.com/questions/17604071/parse-xml-using-javascript
    this.files = [];
    let tempfiles = [];
    let tempdirs = [];
    let filesDOM = data.getElementsByTagNameNS('DAV:', 'response');
    //console.log(data);
    for (let fileitem of filesDOM) {
      //console.log(fileitem);
      let fileurl = this.getFirstElementByTagNameNS(fileitem, 'DAV:', 'href');
      let filename = this.lastContextName(fileurl);
      //returned by b2drop
      let filedate = this.getFirstElementByTagNameNS(fileitem, 'DAV:', 'creationdate');
      //returned by owncloud
      let lastmodified = this.getFirstElementByTagNameNS(fileitem, 'DAV:', 'getlastmodified');
      let filesize = this.getFirstElementByTagNameNS(fileitem, 'DAV:', 'getcontentlength');
      let filetype = this.getContentType(fileitem);//FirstElementByTagNameNS(fileitem, 'DAV:', 'getcontenttype');
      //let contenttype = this.getContentType(fileitem);//FirstElementByTagNameNS(fileitem, 'DAV:', 'resourcetype');
      //console.log(this.webdavpath + ' x ' + filename);

      let item = {};
      item.name = filename;//.replace(this.webdavpath, ''); //replaces the prefix
      item.nicename = this.formatName(filename);//
      item.date = filedate;
      item.nicedate = lastmodified;//this.formatDate(new Date(filedate));
      item.isdir = filetype === 'httpd/unix-directory' || filetype === 'collection';
      item.size = filetype === 'httpd/unix-directory' || filetype === 'collection' ? 'DIR' : filesize;
      //convert to 4GB or 30MB or 20kB or 100b
      if (item.isdir) {
        item.nicesize = item.size;
      } else {
        if (~~(item.size / 1000000000) > 0) {
          item.nicesize = ~~(item.size / 1000000000) + 'GB';
        } else {
          if (~~(item.size / 1000000) > 0) {
            item.nicesize = ~~(item.size / 1000000) + 'MB';
          } else {
            item.nicesize = ~~(item.size / 1000) > 0 ? ~~(item.size / 1000) + 'kB' : item.size + ' b';
          }
        }

        item.type = filetype;
        item.webdavurl = this.webdavpath + item.name;
        //directory first, files after that
      }
      //console.log('adding item');
      //console.log(item);
      //if (fileurl === this.webdavpath) item.name = '..'; //first item might be the current dir
      if (item.isdir) tempdirs.push(item);//this.files.unshift(item);
      else tempfiles.push(item);//this.files.push(item);
    }
    //adds first row with '..' to cd to parent directory
    //if (this.dirs.length > 0)
    //ignore first dir - as it is self
    tempdirs.shift();//this.files.shift(); //first is self
    //concat dirs first, files last
    //console.log('dirs and files:',tempdirs,tempfiles);
    this.files = tempdirs.concat(tempfiles);
    //add first .. to be able to cd up
    //this.files.unshift({name: '..', nicename: '..', isdir: true, nicesize: 'DIR', date: ''});
    let mydata = [];
    let baseurlnoproxy = this.getBaseUrlWithoutProxy(resource);
    //convert pcloud structure to what is expected by dashboard
    for (let file of this.files) {
      mydata.push({
        isdir: file.isdir,
        name: file.nicename,
        snippet: '',
        _id: file.name,
        _updated: file.nicedate,
        size: file.nicesize,
        source: baseurlnoproxy
      });
    }
    //console.log('pcloudpub parseText() mydata', mydata);
    return mydata;
  }
}
